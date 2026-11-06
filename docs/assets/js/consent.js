/*
 * Salzburg in Harmony – consent decision rules without DOM (tested in tests/consent.test.js).
 *
 * Who may switch what on:
 *  - Google's certified CMP (Privacy & messaging / Funding Choices) is the authority. A purpose becomes
 *    "granted" only when the TCF data says GDPR consent exists (purpose 1 + Google vendor 755, TC data loaded)
 *    AND Google's Consent Mode value for that purpose is GRANTED (1). Outside the GDPR (gdprApplies === false)
 *    GRANTED or NOT_APPLICABLE (3) counts, provided the U.S. state status is DOES_NOT_APPLY (1) or NOT_OPTED_OUT (2).
 *  - Everything missing, unknown, denied or failing stays "denied".
 *  - The site's own statistics window (Google Analytics only) may only speak while Google's CMP has not spoken.
 *    Its stored record is valid for 12 months, needs a sane time stamp and the right version.
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

  // the four Consent Mode purposes from TCF data, Consent Mode values and the initial U.S. status
  function decide(tc, consentModeValues, usStatus) {
    var sig = gdprSignal(tc);
    if (sig === 'no' || !consentModeValues || typeof consentModeValues !== 'object') return denied();
    if (sig === 'outside' && usStatus !== US_DOES_NOT_APPLY && usStatus !== US_NOT_OPTED_OUT) return denied();
    var okValue = function (v) { return sig === 'yes' ? v === GRANTED : (v === GRANTED || v === NOT_APPLICABLE); };
    return {
      ad_storage: okValue(consentModeValues.adStoragePurposeConsentStatus) ? 'granted' : 'denied',
      ad_user_data: okValue(consentModeValues.adUserDataPurposeConsentStatus) ? 'granted' : 'denied',
      ad_personalization: okValue(consentModeValues.adPersonalizationPurposeConsentStatus) ? 'granted' : 'denied',
      analytics_storage: okValue(consentModeValues.analyticsStoragePurposeConsentStatus) ? 'granted' : 'denied'
    };
  }

  /* --- statistics window: when may the site ask itself? --- */
  var STATS = { KEY: 'sih-stats', VERSION: 1, WAIT_MS: 3000, MONTHS: 12 };
  // Google recorded a real decision (user acted, or a stored non-empty TC string was loaded)
  function cmpDecided(tc) {
    if (!tc) return false;
    if (tc.eventStatus === 'useractioncomplete') return true;
    return tc.eventStatus === 'tcloaded' && typeof tc.tcString === 'string' && tc.tcString.length > 0;
  }
  // Google's message is actually on screen (a "cmpuishown" with displayStatus hidden/disabled is not)
  function cmpShowing(tc) {
    if (!tc) return false;
    if (tc.displayStatus === 'visible') return true;
    return tc.eventStatus === 'cmpuishown' && tc.displayStatus !== 'hidden' && tc.displayStatus !== 'disabled';
  }
  // from here on only Google counts
  function cmpSpoke(tc) { return !!tc && (tc.gdprApplies === false || cmpDecided(tc) || cmpShowing(tc)); }
  // Google clearly said no to analytics (purpose 1 / vendor missing after a decision, or Consent Mode analytics DENIED = 2)
  function googleDeclinedAnalytics(tc, analyticsValue) {
    if (!tc) return false;
    if (tc.gdprApplies === false) return analyticsValue === 2;
    if (!cmpDecided(tc)) return false;
    var purpose1 = !!(tc.purpose && tc.purpose.consents && tc.purpose.consents[1] === true);
    var google = !!(tc.vendor && tc.vendor.consents && tc.vendor.consents[GOOGLE_VENDOR] === true);
    return !purpose1 || !google || analyticsValue === 2;
  }
  // stored record (string or object) → {v, choice, at} or null when invalid, future-dated or older than 12 months
  function statsRecord(raw, now) {
    var rec = raw;
    if (typeof raw === 'string') { try { rec = JSON.parse(raw); } catch (e) { return null; } }
    if (!rec || typeof rec !== 'object' || rec.v !== STATS.VERSION) return null;
    if (rec.choice !== 'granted' && rec.choice !== 'denied') return null;
    if (typeof rec.at !== 'number' || !isFinite(rec.at) || rec.at > now) return null;
    var until = new Date(rec.at); until.setMonth(until.getMonth() + STATS.MONTHS);
    return now < until.getTime() ? { v: rec.v, choice: rec.choice, at: rec.at } : null;
  }
  // statistics may run: window active, not blocked (GPC / U.S. opt-out), and the stored choice is "granted"
  function statsAllowed(phase, blocked, record) {
    return phase === 'active' && !blocked && !!record && record.choice === 'granted';
  }
  // _ga and _ga_<id> cookie names in a cookie string
  function gaCookieNames(jar) {
    return String(jar || '').split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return /^_ga(_[A-Za-z0-9]+)?$/.test(n); });
  }
  // every domain attribute a cookie for this host may carry
  function cookieDomains(host) {
    var parts = String(host || '').split('.').filter(Boolean), out = [''];
    for (var i = 0; i < parts.length - 1; i++) { var d = parts.slice(i).join('.'); out.push(d, '.' + d); }
    return out;
  }

  var api = { GRANTED: GRANTED, NOT_APPLICABLE: NOT_APPLICABLE, US_DOES_NOT_APPLY: US_DOES_NOT_APPLY, US_NOT_OPTED_OUT: US_NOT_OPTED_OUT,
    US_OPTED_OUT: US_OPTED_OUT, ALL_DENIED: ALL_DENIED, denied: denied, gdprSignal: gdprSignal, decide: decide, STATS: STATS,
    cmpDecided: cmpDecided, cmpShowing: cmpShowing, cmpSpoke: cmpSpoke, googleDeclinedAnalytics: googleDeclinedAnalytics,
    statsRecord: statsRecord, statsAllowed: statsAllowed, gaCookieNames: gaCookieNames, cookieDomains: cookieDomains };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SIHConsent = api;
})(this);
