// Consent decision rules (docs/assets/js/consent.js) – pure functions, no DOM.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const loadScript = (f) => { const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(__dirname, '..', f), 'utf8'))(m, m.exports); return m.exports; };
const C = loadScript('docs/assets/js/consent.js');

const EU_YES = { gdprApplies: true, eventStatus: 'useractioncomplete', tcString: 'CPx', purpose: { consents: { 1: true } }, vendor: { consents: { 755: true } } };
const CM_ALL = { adStoragePurposeConsentStatus: 1, adUserDataPurposeConsentStatus: 1, adPersonalizationPurposeConsentStatus: 1, analyticsStoragePurposeConsentStatus: 1 };

test('nothing known → everything denied', () => {
  assert.deepEqual(C.decide(null, null, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(undefined, CM_ALL, 1), C.ALL_DENIED);
  assert.deepEqual(C.decide(EU_YES, null, 1), C.ALL_DENIED);
});
test('EU consent with purpose 1 + Google + Consent Mode granted → granted per purpose', () => {
  assert.deepEqual(C.decide(EU_YES, CM_ALL, null), { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  const partial = Object.assign({}, CM_ALL, { adPersonalizationPurposeConsentStatus: 2, analyticsStoragePurposeConsentStatus: 2 });
  assert.deepEqual(C.decide(EU_YES, partial, null), { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied', analytics_storage: 'denied' });
});
test('EU: NOT_APPLICABLE (3) does not count as granted; missing purpose 1 or vendor 755 → denied', () => {
  const na = { adStoragePurposeConsentStatus: 3, adUserDataPurposeConsentStatus: 3, adPersonalizationPurposeConsentStatus: 3, analyticsStoragePurposeConsentStatus: 3 };
  assert.deepEqual(C.decide(EU_YES, na, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(Object.assign({}, EU_YES, { purpose: { consents: { 1: false } } }), CM_ALL, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(Object.assign({}, EU_YES, { vendor: { consents: {} } }), CM_ALL, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(Object.assign({}, EU_YES, { eventStatus: 'cmpuishown' }), CM_ALL, null), C.ALL_DENIED);
});
test('outside GDPR: granted or not applicable counts, but only with a clear U.S. status', () => {
  const out = { gdprApplies: false };
  const na = { adStoragePurposeConsentStatus: 3, adUserDataPurposeConsentStatus: 1, adPersonalizationPurposeConsentStatus: 3, analyticsStoragePurposeConsentStatus: 3 };
  assert.deepEqual(C.decide(out, na, C.US_DOES_NOT_APPLY), { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  assert.deepEqual(C.decide(out, na, C.US_NOT_OPTED_OUT).ad_storage, 'granted');
  assert.deepEqual(C.decide(out, na, C.US_OPTED_OUT), C.ALL_DENIED);
  assert.deepEqual(C.decide(out, na, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(out, na, 0), C.ALL_DENIED);
});
test('decide never returns a shared object', () => {
  const a = C.decide(null, null, null); a.ad_storage = 'granted';
  assert.equal(C.decide(null, null, null).ad_storage, 'denied');
  assert.equal(C.ALL_DENIED.ad_storage, 'denied');
});

test('cmpDecided / cmpShowing / cmpSpoke', () => {
  assert.equal(C.cmpDecided(null), false);
  assert.equal(C.cmpDecided({ eventStatus: 'tcloaded', tcString: '' }), false);
  assert.equal(C.cmpDecided({ eventStatus: 'tcloaded', tcString: 'abc' }), true);
  assert.equal(C.cmpDecided({ eventStatus: 'useractioncomplete' }), true);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown', displayStatus: 'hidden' }), false);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown', displayStatus: 'disabled' }), false);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown' }), true);
  assert.equal(C.cmpShowing({ displayStatus: 'visible' }), true);
  assert.equal(C.cmpSpoke({ gdprApplies: false }), true);
  assert.equal(C.cmpSpoke({ eventStatus: 'cmpuishown', displayStatus: 'hidden', gdprApplies: true }), false);
});
test('googleDeclinedAnalytics', () => {
  assert.equal(C.googleDeclinedAnalytics(null, 2), false);
  assert.equal(C.googleDeclinedAnalytics({ gdprApplies: false }, 2), true);
  assert.equal(C.googleDeclinedAnalytics({ gdprApplies: false }, 1), false);
  assert.equal(C.googleDeclinedAnalytics(EU_YES, 1), false);
  assert.equal(C.googleDeclinedAnalytics(EU_YES, 2), true);
  assert.equal(C.googleDeclinedAnalytics(Object.assign({}, EU_YES, { purpose: { consents: {} } }), 1), true);
  assert.equal(C.googleDeclinedAnalytics(Object.assign({}, EU_YES, { eventStatus: 'cmpuishown' }), 2), false, 'no decision yet → not a clear no');
});

test('statsRecord: valid, invalid, future, expired', () => {
  const now = Date.UTC(2026, 10, 6);
  assert.deepEqual(C.statsRecord(JSON.stringify({ v: 1, choice: 'granted', at: now - 1000 }), now), { v: 1, choice: 'granted', at: now - 1000 });
  assert.equal(C.statsRecord('{bad json', now), null);
  assert.equal(C.statsRecord(null, now), null);
  assert.equal(C.statsRecord({ v: 2, choice: 'granted', at: now - 1 }, now), null, 'wrong version');
  assert.equal(C.statsRecord({ v: 1, choice: 'maybe', at: now - 1 }, now), null, 'wrong choice');
  assert.equal(C.statsRecord({ v: 1, choice: 'denied', at: now + 60000 }, now), null, 'future');
  const old = new Date(now); old.setMonth(old.getMonth() - 13);
  assert.equal(C.statsRecord({ v: 1, choice: 'granted', at: old.getTime() }, now), null, 'older than 12 months');
  const fresh = new Date(now); fresh.setMonth(fresh.getMonth() - 11);
  assert.ok(C.statsRecord({ v: 1, choice: 'denied', at: fresh.getTime() }, now));
});
test('statsAllowed: only active + not blocked + granted', () => {
  const g = { v: 1, choice: 'granted', at: 1 }, d = { v: 1, choice: 'denied', at: 1 };
  assert.equal(C.statsAllowed('active', false, g), true);
  assert.equal(C.statsAllowed('active', true, g), false, 'GPC / U.S. opt-out');
  assert.equal(C.statsAllowed('active', false, d), false);
  assert.equal(C.statsAllowed('active', false, null), false, 'no choice is no consent');
  assert.equal(C.statsAllowed('waiting', false, g), false);
  assert.equal(C.statsAllowed('retired', false, g), false, 'Google decides');
  assert.equal(C.statsAllowed('settings', false, g), false, 'no measurement on legal pages');
});
test('cookie helpers', () => {
  assert.deepEqual(C.gaCookieNames('_ga=GA1.1.1; _ga_T00HRG2YVF=GS1; sih=x; _gat=1'), ['_ga', '_ga_T00HRG2YVF']);
  assert.deepEqual(C.gaCookieNames(''), []);
  assert.deepEqual(C.cookieDomains('www.salzburginharmony.com'), ['', 'www.salzburginharmony.com', '.www.salzburginharmony.com', 'salzburginharmony.com', '.salzburginharmony.com']);
  assert.deepEqual(C.cookieDomains('localhost'), ['']);
});
