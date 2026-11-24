// Consent decision rules (docs/assets/js/consent.js) – pure functions, no DOM.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const loadScript = (f) => { const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(__dirname, '..', f), 'utf8'))(m, m.exports); return m.exports; };
const C = loadScript('src/static/assets/js/consent.js');

const EU_YES = { gdprApplies: true, eventStatus: 'useractioncomplete', tcString: 'CPx', purpose: { consents: { 1: true } }, vendor: { consents: { 755: true } } };
const CM_ALL = { adStoragePurposeConsentStatus: 1, adUserDataPurposeConsentStatus: 1, adPersonalizationPurposeConsentStatus: 1, analyticsStoragePurposeConsentStatus: 1 };

test('nothing known → everything denied', () => {
  assert.deepEqual(C.decide(null, null, null), C.ALL_DENIED);
  assert.deepEqual(C.decide(undefined, CM_ALL, 1), C.ALL_DENIED);
  assert.deepEqual(C.decide(EU_YES, null, 1), C.ALL_DENIED);
});
test('EU consent with purpose 1 + Google + Consent Mode granted → granted per purpose', () => {
  assert.deepEqual(C.decide(EU_YES, CM_ALL, null), { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'denied' }, 'analytics is never granted by the ad CMP');
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
  assert.deepEqual(C.decide(out, na, C.US_DOES_NOT_APPLY), { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'denied' });
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
test('cmpShowing', () => {
  assert.equal(C.cmpShowing(null), false);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown', displayStatus: 'hidden' }), false);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown', displayStatus: 'disabled' }), false);
  assert.equal(C.cmpShowing({ eventStatus: 'cmpuishown' }), true);
  assert.equal(C.cmpShowing({ displayStatus: 'visible' }), true);
  assert.equal(C.cmpShowing({ eventStatus: 'useractioncomplete' }), false);
});

// analytics choice: the record format of the privacy policy (tw-analytics-consent-v1, at most 180 days)
test('analyticsRecord: valid, invalid, future, expired after 180 days', () => {
  const now = Date.UTC(2026, 10, 24), day = 86400000;
  assert.equal(C.ANALYTICS.KEY, 'tw-analytics-consent-v1');
  assert.deepEqual(C.analyticsRecord(JSON.stringify({ version: 1, time: now - 1000, granted: true, ageConfirmed: null }), now), { granted: true, time: now - 1000 });
  assert.deepEqual(C.analyticsRecord({ version: 1, time: now - day, granted: false }, now), { granted: false, time: now - day });
  assert.equal(C.analyticsRecord('{bad json', now), null);
  assert.equal(C.analyticsRecord(null, now), null);
  assert.equal(C.analyticsRecord({ version: 2, time: now - 1, granted: true }, now), null, 'wrong version');
  assert.equal(C.analyticsRecord({ version: 1, time: now - 1, granted: 'yes' }, now), null, 'granted must be boolean');
  assert.equal(C.analyticsRecord({ version: 1, time: now + 60000, granted: true }, now), null, 'future');
  assert.equal(C.analyticsRecord({ version: 1, time: now - 180 * day, granted: true }, now), null, '180 days is the limit');
  assert.ok(C.analyticsRecord({ version: 1, time: now - 179 * day, granted: true }, now));
  assert.deepEqual(C.analyticsEntry(true, now), { version: 1, time: now, granted: true, ageConfirmed: null });
});
test('analyticsBlocked: GPC, Do Not Track, U.S. opt-out', () => {
  assert.equal(C.analyticsBlocked(false, null, null), false);
  assert.equal(C.analyticsBlocked(true, null, null), true);
  assert.equal(C.analyticsBlocked(false, '1', null), true);
  assert.equal(C.analyticsBlocked(false, '0', null), false);
  assert.equal(C.analyticsBlocked(false, null, C.US_OPTED_OUT), true);
  assert.equal(C.analyticsBlocked(false, null, C.US_NOT_OPTED_OUT), false);
});
test('analyticsAllowed: only content page + not blocked + stored "granted"', () => {
  const g = { granted: true, time: 1 }, d = { granted: false, time: 1 };
  assert.equal(C.analyticsAllowed(false, false, g), true);
  assert.equal(C.analyticsAllowed(true, false, g), false, 'no measurement on legal pages');
  assert.equal(C.analyticsAllowed(false, true, g), false, 'GPC / DNT / U.S. opt-out');
  assert.equal(C.analyticsAllowed(false, false, d), false);
  assert.equal(C.analyticsAllowed(false, false, null), false, 'no choice is no consent');
});
test('cookie helpers and clean addresses', () => {
  assert.deepEqual(C.gaCookieNames('twga_ga=GA1.1.1; twga_ga_T00HRG2YVF=GS1; _ga=x; sih=x; _gat=1; twgax=1'), ['twga_ga', 'twga_ga_T00HRG2YVF', '_ga']);
  assert.deepEqual(C.gaCookieNames(''), []);
  assert.deepEqual(C.cookieDomains('www.salzburginharmony.com'), ['', 'www.salzburginharmony.com', '.www.salzburginharmony.com', 'salzburginharmony.com', '.salzburginharmony.com']);
  assert.deepEqual(C.cookieDomains('localhost'), ['']);
  assert.equal(C.cleanLocation('https://www.salzburginharmony.com', '/tours/hellbrunn/'), 'https://www.salzburginharmony.com/tours/hellbrunn/');
  assert.equal(C.cleanReferrer('https://www.google.com/search?q=salzburg#x'), 'https://www.google.com/');
  assert.equal(C.cleanReferrer(''), '');
  assert.equal(C.cleanReferrer('android-app://x'), '');
});
