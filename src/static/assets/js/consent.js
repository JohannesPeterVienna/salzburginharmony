/*
 * Salzburg in Harmony – consent decision rules without DOM (tested in tests/consent.test.cjs).
 *
 * Advertising (Google AdSense): Google's certified CMP (Privacy & messaging / Funding Choices) is the authority.
 *  An ad purpose becomes "granted" only when the TCF data says GDPR consent exists (purpose 1 + Google vendor 755,
 *  TC data loaded) AND Google's Consent Mode value for that purpose is GRANTED (1). Outside the GDPR
 *  (gdprApplies === false) GRANTED or NOT_APPLICABLE (3) counts, provided the U.S. state status is DOES_NOT_APPLY (1)
 *  or NOT_OPTED_OUT (2). Everything missing, unknown, denied or failing stays "denied".
 * Analytics (Google Analytics 4): decided only by the site's own analytics choice, as the privacy policy says
 *  ("separate from advertising consent"): stored under tw-analytics-consent-v1 for at most 180 days, never on legal
 *  pages, never with Global Privacy Control, Do Not Track or a U.S. state opt-out.
 * Enum values: developers.google.com/funding-choices/fc-api-docs
 */
(function (root) {
  'use strict';
  var GRANTED = 1, NOT_APPLICABLE = 3, US_DOES_NOT_APPLY = 1, US_NOT_OPTED_OUT = 2, US_OPTED_OUT = 3, GOOGLE_VENDOR = 755;
  var ALL_DENIED = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
  function denied() { return { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }; }

  // TCF data → 'yes' (GDPR consent for purpose 1 and Google exists), 'outside' (GDPR does not apply), 'no'
  function gdprSignal(tc) {
    if (!tc || typeof tc !== 'object') return 'no';
    if (tc.gdprApplies === false) return 'outside';
    var loaded = tc.eventStatus === 'tcloaded' || tc.eventStatus === 'useractioncomplete';
    var purpose1 = !!(tc.purpose && tc.purpose.consents && tc.purpose.consents[1] === true);
    var google = !!(tc.vendor && tc.vendor.consents && tc.vendor.consents[GOOGLE_VENDOR] === true);
    return loaded && purpose1 && google ? 'yes' : 'no';
  }

  // the three advertising purposes from TCF data, Consent Mode values and the initial U.S. status;
  // analytics_storage is always "denied" here – the analytics choice is set separately (analyticsAllowed)
  function decide(tc, consentModeValues, usStatus) {
    var sig = gdprSignal(tc);
    if (sig === 'no' || !consentModeValues || typeof consentModeValues !== 'object') return denied();
    if (sig === 'outside' && usStatus !== US_DOES_NOT_APPLY && usStatus !== US_NOT_OPTED_OUT) return denied();
    var okValue = function (v) { return sig === 'yes' ? v === GRANTED : (v === GRANTED || v === NOT_APPLICABLE); };
    return {
      ad_storage: okValue(consentModeValues.adStoragePurposeConsentStatus) ? 'granted' : 'denied',
      ad_user_data: okValue(consentModeValues.adUserDataPurposeConsentStatus) ? 'granted' : 'denied',
      ad_personalization: okValue(consentModeValues.adPersonalizationPurposeConsentStatus) ? 'granted' : 'denied',
      analytics_storage: 'denied'
    };
  }

  // Google's message is actually on screen (a "cmpuishown" with displayStatus hidden/disabled is not)
  function cmpShowing(tc) {
    if (!tc) return false;
    if (tc.displayStatus === 'visible') return true;
    return tc.eventStatus === 'cmpuishown' && tc.displayStatus !== 'hidden' && tc.displayStatus !== 'disabled';
  }

  /* --- analytics choice --- */
  var ANALYTICS = { KEY: 'tw-analytics-consent-v1', VERSION: 1, DAYS: 180, WAIT_MS: 3000, COOKIE_PREFIX: 'twga' };
  // stored record (string or object) → {granted, time} or null when invalid, future-dated or older than 180 days
  function analyticsRecord(raw, now) {
    var rec = raw;
    if (typeof raw === 'string') { try { rec = JSON.parse(raw); } catch (e) { return null; } }
    if (!rec || typeof rec !== 'object' || rec.version !== ANALYTICS.VERSION || typeof rec.granted !== 'boolean') return null;
    if (typeof rec.time !== 'number' || !isFinite(rec.time) || rec.time > now) return null;
    return now - rec.time < ANALYTICS.DAYS * 86400000 ? { granted: rec.granted, time: rec.time } : null;
  }
  function analyticsEntry(granted, now) { return { version: ANALYTICS.VERSION, time: now, granted: !!granted, ageConfirmed: null }; }
  // browser signals that keep analytics off: Global Privacy Control, Do Not Track, U.S. state opt-out
  function analyticsBlocked(gpc, dnt, usStatus) { return gpc === true || dnt === '1' || dnt === 'yes' || usStatus === US_OPTED_OUT; }
  // analytics may run: not a legal page, not blocked, and the stored choice says granted
  function analyticsAllowed(legalPage, blocked, record) { return !legalPage && !blocked && !!record && record.granted === true; }
  // analytics cookies of this integration (twga…) and older default GA cookies (_ga, _ga_<id>) in a cookie string
  function gaCookieNames(jar) {
    return String(jar || '').split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return /^twga(?:_|$)/.test(n) || /^_ga(_[A-Za-z0-9]+)?$/.test(n); });
  }
  // every domain attribute a cookie for this host may carry
  function cookieDomains(host) {
    var parts = String(host || '').split('.').filter(Boolean), out = [''];
    for (var i = 0; i < parts.length - 1; i++) { var d = parts.slice(i).join('.'); out.push(d, '.' + d); }
    return out;
  }
  // page address for analytics without query string and fragment; referrer reduced to its origin
  function cleanLocation(origin, pathname) { return String(origin || '') + String(pathname || '/'); }
  function cleanReferrer(ref) { var m = /^(https?:\/\/[^/?#]+)/i.exec(String(ref || '')); return m ? m[1] + '/' : ''; }

  var api = { GRANTED: GRANTED, NOT_APPLICABLE: NOT_APPLICABLE, US_DOES_NOT_APPLY: US_DOES_NOT_APPLY, US_NOT_OPTED_OUT: US_NOT_OPTED_OUT,
    US_OPTED_OUT: US_OPTED_OUT, ALL_DENIED: ALL_DENIED, denied: denied, gdprSignal: gdprSignal, decide: decide, cmpShowing: cmpShowing,
    ANALYTICS: ANALYTICS, analyticsRecord: analyticsRecord, analyticsEntry: analyticsEntry, analyticsBlocked: analyticsBlocked,
    analyticsAllowed: analyticsAllowed, gaCookieNames: gaCookieNames, cookieDomains: cookieDomains, cleanLocation: cleanLocation, cleanReferrer: cleanReferrer };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SIHConsent = api;
})(this);
