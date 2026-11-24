/*
 * Salzburg in Harmony – page runtime.
 *  1. Ads: the single box below the content (.ad[data-slot="bottom"]) gets an AdSense <ins> only when an ad-unit ID
 *     exists; label and frame appear only once Google reports data-ad-status "filled"/"unfill-optimized".
 *     The <ins> is never hidden.
 *  2. Advertising consent: Google's CMP (Funding Choices, loaded with the AdSense script in the head of ad pages)
 *     decides ad_storage / ad_user_data / ad_personalization. Consent Mode defaults are "denied" (inline in the head,
 *     before any Google script). "Ad privacy choices (Google)" in the footer opens Google's revocation or U.S. dialog;
 *     on pages without ads (html[data-google="off"]) it loads Google's consent script only on that click.
 *  3. Analytics: separate from advertising, as the privacy policy says. Google Analytics 4 (G-T00HRG2YVF) loads only
 *     after "Allow analytics" in the site's own window (stored 180 days under tw-analytics-consent-v1, cookies with
 *     prefix twga, host-only, 180 days), never on legal pages, never with GPC / Do Not Track / U.S. opt-out.
 *     Page address without query and fragment, referrer as origin only, no Google signals, no ad personalisation.
 *  4. Tour mode: station by station with the chosen host (Anton/Dora), progress in localStorage "sih-tour-<slug>".
 *  5. Day planner: localStorage "sih-plan" via SIHPlanner; export as text, print.
 */
(function () {
  'use strict';
  var C = window.SIHConsent, P = window.SIHPlanner;
  var CLIENT = 'ca-pub-7811071715414905', GA_ID = 'G-T00HRG2YVF', GA_OFF = 'ga-disable-' + GA_ID;
  // AdSense ad-unit ID for the box below the content: empty until a unit exists (an empty ID renders nothing)
  var SLOTS = { bottom: '' };
  var html = document.documentElement;
  var adsOn = html.getAttribute('data-ads') === 'yes';
  var googleOff = html.getAttribute('data-google') === 'off';
  var lang = html.getAttribute('lang') || 'en';
  var UI = {};
  try { var uiEl = document.getElementById('sih-ui'); if (uiEl) UI = JSON.parse(uiEl.textContent) || {}; } catch (e) { UI = {}; }
  function t(key, fallback) { return typeof UI[key] === 'string' ? UI[key] : fallback; }
  var gpc = false, dnt = null;
  try { gpc = navigator.globalPrivacyControl === true; } catch (e) { gpc = false; }
  try { dnt = navigator.doNotTrack || window.doNotTrack || null; } catch (e) { dnt = null; }
  function store(key, value) { try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); return true; } catch (e) { return false; } }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* ---------------- ads ---------------- */
  function hasSelectorHas() { try { return !!(window.CSS && CSS.supports && CSS.supports('selector(:has(a))')); } catch (e) { return false; } }
  function mirrorStatus(box, ins) {
    if (hasSelectorHas()) return;   // CSS :has() handles label and frame
    function mirror() { box.classList.toggle('ad-live', ['filled', 'unfill-optimized'].indexOf(ins.getAttribute('data-ad-status')) !== -1); }
    mirror();
    if (window.MutationObserver) new MutationObserver(mirror).observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });
  }
  function placeAds() {
    if (!adsOn) return;
    document.querySelectorAll('.ad[data-slot]').forEach(function (box) {
      var id = SLOTS[box.getAttribute('data-slot')];
      if (!id) return;
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', CLIENT);
      ins.setAttribute('data-ad-slot', id);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      box.appendChild(ins);
      box.hidden = false;
      mirrorStatus(box, ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* blocked: box stays empty */ }
    });
  }

  /* ---------------- consent: advertising (Google CMP) + analytics (own choice) ---------------- */
  var gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };
  var state = { tc: null, lastTc: null, cmReady: false, us: null, lastSent: '', gaLoaded: false, timer: null, pending: false };
  function blocked() { return C.analyticsBlocked(gpc, dnt, state.us); }
  function record() { return C.analyticsRecord(load(C.ANALYTICS.KEY), Date.now()); }
  function analyticsOn() { return C.analyticsAllowed(googleOff, blocked(), record()); }
  function loadGA() {
    if (state.gaLoaded) return; state.gaLoaded = true;
    var page = C.cleanLocation(location.origin, location.pathname), ref = C.cleanReferrer(document.referrer);
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_domain: 'none', cookie_prefix: C.ANALYTICS.COOKIE_PREFIX, cookie_expires: C.ANALYTICS.DAYS * 86400, cookie_update: false,
      page_location: page, page_referrer: ref, page_title: document.title });
    gtag('event', 'page_view', { send_to: GA_ID, page_location: page, page_referrer: ref, page_title: document.title });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  // general actions only (print / export requests), never the content of a plan
  function track(name, params) { if (state.gaLoaded && window[GA_OFF] === false) gtag('event', name, params || {}); }
  function consentModeValues() {
    try { var fc = window.googlefc; return fc && typeof fc.getGoogleConsentModeValues === 'function' ? (fc.getGoogleConsentModeValues() || null) : null; } catch (e) { return null; }
  }
  function eraseGaCookies() {
    var host = ''; try { host = location.hostname; } catch (e) { host = ''; }
    C.gaCookieNames(document.cookie).forEach(function (n) {
      C.cookieDomains(host).forEach(function (d) {
        try { document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/' + (d ? '; domain=' + d : ''); } catch (e) { /* ignore */ }
      });
    });
  }
  function send(update) {
    var key = JSON.stringify(update);
    if (key === state.lastSent) return;
    state.lastSent = key;
    gtag('consent', 'update', update);
  }
  function apply() {
    var cm = state.cmReady && C.gdprSignal(state.tc) !== 'no' ? consentModeValues() : null;
    var d = C.decide(state.tc, cm, state.us);
    var on = analyticsOn();
    d.analytics_storage = on ? 'granted' : 'denied';
    window[GA_OFF] = !on;
    send(d);
    if (on) loadGA();
    else { var r = record(); if (blocked() || (r && !r.granted)) eraseGaCookies(); }
  }
  function watchCmp() {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: function () {
        if (typeof window.__tcfapi !== 'function') return;
        window.__tcfapi('addEventListener', 2, function (tc, ok) {
          state.tc = ok ? tc : null;
          if (ok && tc) state.lastTc = tc;
          if (ok && tc && tc.eventStatus === 'useractioncomplete' && window.googlefc && typeof window.googlefc.getGoogleConsentModeValues === 'function') state.cmReady = true;
          apply();
          // our analytics window waits while Google's message is on screen, and asks afterwards
          if (ok && tc && state.pending && !C.cmpShowing(tc)) { state.pending = false; askAnalytics(); }
          if (ok && tc && C.cmpShowing(tc) && win && !win.hidden && !opener) { closeWindow(false); state.pending = true; }
        });
      },
      CONSENT_MODE_DATA_READY: function () { state.cmReady = true; apply(); },
      INITIAL_US_STATES_OPT_OUT_DATA_READY: function () {
        try { var u = window.googlefc.usstatesoptout; state.us = u && typeof u.getInitialUsStatesOptOutStatus === 'function' ? u.getInitialUsStatesOptOutStatus() : null; } catch (e) { state.us = null; }
        apply();
      }
    });
    apply();
  }
  // "Ad privacy choices (Google)": Google's revocation message (EU) or U.S. opt-out dialog
  function loadConsentScriptOnly() {
    if (document.querySelector('script[src*="fundingchoicesmessages.google.com"]') || document.querySelector('script[src*="adsbygoogle.js"]')) return;
    try {
      if (!(window.frames && window.frames.googlefcPresent)) {
        var f = document.createElement('iframe'); f.style.cssText = 'width:0;height:0;border:none;display:none'; f.name = 'googlefcPresent'; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1; document.body.appendChild(f);
      }
    } catch (e) { /* ignore */ }
    var s = document.createElement('script'); s.async = true; s.src = 'https://fundingchoicesmessages.google.com/i/pub-7811071715414905?ers=1'; document.head.appendChild(s);
  }
  function openGoogleChoices() {
    var before = { tc: state.tc, cmReady: state.cmReady };
    state.tc = null; state.cmReady = false; apply();   // ad consent withdrawn at once until the CMP reports anew
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push(function () {
      try {
        var fc = window.googlefc, u = fc.usstatesoptout, tc = state.lastTc || before.tc, gdpr = !!(tc && tc.gdprApplies === true);
        if (u && typeof u.getInitialUsStatesOptOutStatus === 'function' && typeof u.openConfirmationDialog === 'function') {
          var us = u.getInitialUsStatesOptOutStatus();
          if ((us === C.US_NOT_OPTED_OUT || us === C.US_OPTED_OUT) && !gdpr) {
            u.openConfirmationDialog(function (optedOut) {
              if (optedOut) state.us = C.US_OPTED_OUT;
              else { try { state.us = u.getInitialUsStatesOptOutStatus(); } catch (e) { state.us = null; } if (state.tc === null && !state.cmReady) { state.tc = before.tc; state.cmReady = before.cmReady; } }
              apply();
            });
            return;
          }
        }
        fc.showRevocationMessage();
      } catch (e) { /* CMP not available */ }
    });
    if (googleOff) watchCmp();
    loadConsentScriptOnly();
  }

  /* ---------------- the analytics window ---------------- */
  var win = null, live = null, opener = null;
  function announce(text) {
    if (!live) { live = document.createElement('p'); live.className = 'statlive'; live.setAttribute('role', 'status'); document.body.appendChild(live); }
    live.textContent = ''; setTimeout(function () { live.textContent = text; }, 120);
  }
  function buildWindow() {
    var el = document.createElement('section');
    el.className = 'statwin'; el.id = 'sih-analytics'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'false'); el.setAttribute('aria-labelledby', 'sih-a-h'); el.setAttribute('aria-describedby', 'sih-a-p');
    el.innerHTML = '<button type="button" class="x" data-w="close" aria-label="' + t('a_close', 'Close without choosing') + '">×</button>' +
      '<h2 id="sih-a-h" tabindex="-1">' + t('a_title', 'Help us improve this website?') + '</h2><p id="sih-a-p"></p>' +
      '<p><a href="' + t('privacy_url', '/privacy/') + '#google-analytics">' + t('a_privacy', 'Privacy details') + '</a></p><p class="now" role="status" data-now></p>' +
      '<div class="picks" data-picks><button type="button" class="btn" data-w="yes">' + t('a_yes', 'Allow analytics') + '</button><button type="button" class="btn ghost" data-w="no">' + t('a_no', 'Without analytics') + '</button></div>' +
      '<div class="picks" data-ok hidden><button type="button" class="btn ghost" data-w="close">' + t('close', 'Close') + '</button></div>';
    el.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-w]') : null; if (!b) return;
      var w = b.getAttribute('data-w');
      if (w === 'yes' || w === 'no') {
        store(C.ANALYTICS.KEY, JSON.stringify(C.analyticsEntry(w === 'yes', Date.now())));
        apply();
        announce(w === 'yes' ? t('a_saved_yes', 'Analytics allowed.') : t('a_saved_no', 'Analytics switched off.'));
        closeWindow(true);
      } else closeWindow(true);
    });
    el.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); closeWindow(true); } });
    document.body.appendChild(el);
    win = el;
  }
  function fillWindow() {
    var p = win.querySelector('#sih-a-p'), now = win.querySelector('[data-now]'), r = record(), b = blocked();
    p.textContent = t('a_text', '');
    now.textContent = b ? t('a_blocked', '') : googleOff ? t('a_legal', '') : r ? (r.granted ? t('a_on', '') : t('a_off', '')) : (opener ? t('a_none', '') : '');
    now.hidden = !now.textContent;
    win.querySelector('[data-picks]').hidden = b;
    win.querySelector('[data-ok]').hidden = !b;
  }
  function openWindow(by) {
    if (!document.body) return;
    if (!win) buildWindow();
    opener = by || null;
    fillWindow();
    win.hidden = false;
    document.body.style.paddingBottom = Math.ceil(win.getBoundingClientRect().height) + 20 + 'px';
    if (opener) win.querySelector('#sih-a-h').focus({ preventScroll: true });
  }
  function closeWindow(byUser) {
    if (!win || win.hidden) return;
    win.hidden = true; document.body.style.paddingBottom = '';
    if (byUser && opener && opener.focus) { try { opener.focus(); } catch (e) { /* ignore */ } }
    opener = null;
  }
  // ask by itself only on content pages, without a stored choice, without a blocking signal, and not while
  // Google's own consent message is on screen
  function askAnalytics() {
    if (googleOff || record() || blocked()) return;
    if (state.tc && C.cmpShowing(state.tc)) { state.pending = true; return; }
    openWindow(null);
  }
  function settingsButtons() {
    document.querySelectorAll('[data-analytics-settings]').forEach(function (b) { b.addEventListener('click', function () { openWindow(b); }); });
    document.querySelectorAll('[data-privacy-settings]').forEach(function (b) { b.addEventListener('click', function () { openGoogleChoices(); }); });
    function fromHash() { if (location.hash === '#analytics-settings') openWindow(document.querySelector('[data-analytics-settings]')); }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------------- host choice ---------------- */
  var HOST_KEY = 'sih-host';
  function currentHost() { var h = load(HOST_KEY); return h === 'dora' ? 'dora' : 'anton'; }
  function setHost(h) { store(HOST_KEY, h === 'dora' ? 'dora' : 'anton'); document.querySelectorAll('input[name="host"]').forEach(function (r) { r.checked = r.value === h; }); }

  /* ---------------- tour mode ---------------- */
  function tourMode() {
    var dataEl = document.getElementById('tour-data'); if (!dataEl) return;
    var tour; try { tour = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var KEY = 'sih-tour-' + tour.slug;
    var panel = document.getElementById('tourmode'), startBtn = document.getElementById('tour-start');
    if (!panel || !startBtn) return;
    var stations = tour.stations, idx = 0, on = false, host = currentHost();
    var saved = null; try { saved = JSON.parse(load(KEY)); } catch (e) { saved = null; }
    if (saved && typeof saved.i === 'number' && saved.i >= 0 && saved.i < stations.length) { idx = saved.i; }
    if (saved && typeof saved.i === 'number') startBtn.textContent = saved.done ? t('restart', 'Start the walk again') : t('resume', 'Continue the walk at stop ') + (idx + 1);
    document.querySelectorAll('input[name="host"]').forEach(function (r) { r.checked = r.value === host; r.addEventListener('change', function () { host = r.value; setHost(host); if (on) render(); }); });
    function save(done) { store(KEY, JSON.stringify({ i: idx, done: !!done, at: Date.now() })); }
    function markList() {
      document.querySelectorAll('.station').forEach(function (s, k) { s.classList.toggle('current', on && k === idx); s.classList.toggle('visited', on && k < idx); });
      document.querySelectorAll('.s-dot').forEach(function (d, k) { d.classList.toggle('now', on && k === idx); d.classList.toggle('done', on && k < idx); });
    }
    function render(done) {
      var s = stations[idx], pct = Math.round(((done ? stations.length : idx) / stations.length) * 100);
      var hostName = host === 'dora' ? 'Dora' : 'Anton';
      var h = '<div class="tm"><p class="step">' + tour.title + ' · ' + t('stop', 'Stop') + ' ' + (idx + 1) + ' / ' + stations.length + '</p>' +
        '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>';
      if (done) {
        h += '<h2>' + t('done_title', 'You have finished this walk.') + '</h2><p class="done-msg">' + t('done_text', 'Thank you for walking with us. Your progress is saved in this browser only.') + '</p>' +
          '<div class="row"><button type="button" class="btn" data-tm="restart">' + t('restart', 'Start the walk again') + '</button><a class="btn ghost" href="' + t('planner_url', '/planner/') + '">' + t('to_planner', 'Open the day planner') + '</a><button type="button" class="btn ghost" data-tm="print">' + t('print', 'Print this walk') + '</button><button type="button" class="btn ghost" data-tm="close">' + t('leave', 'Leave walk mode') + '</button></div></div>';
      } else {
        h += '<h2>' + s.title + '</h2><p class="where">' + s.where + '</p>' +
          '<div class="say ' + host + '"><img src="/assets/img/' + host + '.png" alt="" width="56" height="56"><div><b>' + hostName + ' ' + t('says', 'says') + '</b><p>' + s[host] + '</p></div></div>' +
          '<div class="body">' + s.body + '</div>' +
          '<div class="task"><b>' + t('look', 'Look closer') + '</b><p>' + s.task + '</p></div>' +
          '<div class="row">' + (idx > 0 ? '<button type="button" class="btn ghost" data-tm="prev">' + t('back', 'Back') + '</button>' : '') +
          '<button type="button" class="btn" data-tm="next">' + (idx === stations.length - 1 ? t('finish', 'Finish the walk') : t('next', 'Next stop')) + '</button>' +
          '<button type="button" class="btn ghost" data-tm="close">' + t('leave', 'Leave walk mode') + '</button></div></div>';
      }
      panel.innerHTML = h;
      markList();
      // the panel holds the whole stop; it is not sticky, so nothing floats over the page or the ad below
      try { panel.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) { panel.scrollIntoView(); }
      panel.querySelector('h2').focus({ preventScroll: true });
    }
    panel.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-tm]') : null; if (!b) return;
      var w = b.getAttribute('data-tm');
      if (w === 'next') { if (idx < stations.length - 1) { idx++; save(false); render(); } else { save(true); render(true); } }
      else if (w === 'prev') { if (idx > 0) { idx--; save(false); render(); } }
      else if (w === 'restart') { idx = 0; save(false); render(); }
      else if (w === 'print') { track('print_request', { context: 'walk' }); try { window.print(); } catch (e2) { /* ignore */ } }
      else if (w === 'close') { on = false; panel.classList.remove('on'); panel.innerHTML = ''; markList(); startBtn.textContent = t('resume', 'Continue the walk at stop ') + (idx + 1); startBtn.focus(); }
    });
    startBtn.addEventListener('click', function () {
      on = true; panel.classList.add('on');
      if (saved && saved.done) idx = 0;
      saved = null;
      save(false); render();
    });
    // "Add this walk to my day plan": every station with its default minutes
    var addBtn = document.getElementById('tour-plan-add');
    if (addBtn && P) addBtn.addEventListener('click', function () {
      var catalog = {}; stations.forEach(function (s) { catalog[s.id] = { minutes: s.minutes, title: s.title, tour: tour.title }; });
      var plan = P.readPlan(load(P.PLAN.KEY), null);
      stations.forEach(function (s) { if (!plan.items.some(function (it) { return it.id === s.id; })) plan.items.push({ id: s.id, minutes: P.clampMinutes(s.minutes, 30) }); });
      store(P.PLAN.KEY, JSON.stringify(plan));
      addBtn.textContent = t('added', 'Added – open the day planner');
      addBtn.setAttribute('href', t('planner_url', '/planner/'));
      announce(t('added', 'Added – open the day planner'));
    });
  }

  /* ---------------- day planner ---------------- */
  function planner() {
    var dataEl = document.getElementById('planner-data'), root = document.getElementById('planner'); if (!dataEl || !root || !P) return;
    var data; try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var catalog = {}; data.tours.forEach(function (tr) { tr.stations.forEach(function (s) { catalog[s.id] = { minutes: s.minutes, title: s.title, tour: tr.title }; }); });
    var plan = P.readPlan(load(P.PLAN.KEY), catalog);
    var list = root.querySelector('[data-plan-list]'), out = root.querySelector('[data-plan-out]'), bufferIn = root.querySelector('[data-buffer]'), startIn = root.querySelector('[data-start]');
    var labels = { title: t('plan_title', 'My Salzburg day'), empty: t('plan_empty', '(no stops chosen)'), min: t('min', 'min'), buffer: t('buffer', 'Buffer'), total: t('plan_total', 'Time at the stops incl. buffer'), end: t('ends', 'ends about'), note: t('plan_note', 'Walking, transport, queues and opening hours are not included. Check them before you go.') };
    function persist() { store(P.PLAN.KEY, JSON.stringify(plan)); }
    function chosen(id) { return plan.items.some(function (it) { return it.id === id; }); }
    function renderList() {
      var h = '';
      data.tours.forEach(function (tr) {
        h += '<li><input type="checkbox" id="t-' + tr.slug + '" data-tour="' + tr.slug + '"' + (tr.stations.every(function (s) { return chosen(s.id); }) ? ' checked' : '') + '><label for="t-' + tr.slug + '"><b>' + tr.title + '</b> <span class="muted small">(' + tr.stations.length + ' ' + t('stops', 'stops') + ')</span></label><a class="small" href="' + tr.url + '">' + t('open', 'open') + '</a></li>';
        tr.stations.forEach(function (s) {
          var on = chosen(s.id), it = plan.items.filter(function (x) { return x.id === s.id; })[0];
          h += '<li class="sub"><input type="checkbox" id="s-' + s.id + '" data-station="' + s.id + '"' + (on ? ' checked' : '') + '><label for="s-' + s.id + '">' + s.title + '</label>' +
            (on ? '<label class="small"><span class="statlive">' + t('minutes_at', 'Minutes at') + ' ' + s.title + '</span><input class="min" type="number" min="5" max="240" step="5" value="' + it.minutes + '" data-min="' + s.id + '"> ' + t('min', 'min') + '</label>' : '<span></span>') + '</li>';
        });
      });
      list.innerHTML = h;
    }
    function renderOut() {
      var s = P.schedule(plan, catalog), h = '<h2>' + labels.title + '</h2>';
      if (!s.rows.length) h += '<p class="muted">' + t('plan_hint', 'Tick the stops you want on the left. Your plan stays in this browser.') + '</p>';
      else {
        h += '<ol>';
        s.rows.forEach(function (r, i) {
          h += '<li>' + (r.at ? '<b>' + r.at + '</b> ' : '') + r.title + ' <span class="muted small">' + r.tour + ' · ' + r.minutes + ' ' + labels.min + '</span> ' +
            '<span class="noprint"><button type="button" class="linklike small" data-move="-1" data-id="' + r.id + '" aria-label="' + t('up', 'move up') + ' ' + r.title + '"' + (i === 0 ? ' disabled' : '') + '>↑</button> <button type="button" class="linklike small" data-move="1" data-id="' + r.id + '" aria-label="' + t('down', 'move down') + ' ' + r.title + '"' + (i === s.rows.length - 1 ? ' disabled' : '') + '>↓</button></span></li>';
        });
        h += '</ol><p class="total">' + s.total + ' ' + labels.min + (s.end ? ' · ' + labels.end + ' ' + s.end : '') + '</p><p class="small muted">' + labels.note + '</p>';
      }
      out.innerHTML = h;
    }
    function render() { renderList(); renderOut(); }
    list.addEventListener('change', function (e) {
      var el = e.target;
      if (el.hasAttribute('data-station')) { plan = P.toggle(plan, el.getAttribute('data-station'), catalog); }
      else if (el.hasAttribute('data-tour')) {
        var tr = data.tours.filter(function (x) { return x.slug === el.getAttribute('data-tour'); })[0];
        tr.stations.forEach(function (s) { if (chosen(s.id) !== el.checked) plan = P.toggle(plan, s.id, catalog); });
      } else if (el.hasAttribute('data-min')) { plan = P.setMinutes(plan, el.getAttribute('data-min'), el.value); }
      persist(); render();
    });
    out.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-move]') : null; if (!b) return;
      plan = P.move(plan, b.getAttribute('data-id'), parseInt(b.getAttribute('data-move'), 10)); persist(); renderOut();
    });
    if (bufferIn) { bufferIn.value = plan.buffer; bufferIn.addEventListener('change', function () { plan.buffer = P.clampBuffer(bufferIn.value); bufferIn.value = plan.buffer; persist(); renderOut(); }); }
    if (startIn) { startIn.value = plan.start; startIn.addEventListener('change', function () { plan.start = /^\d{2}:\d{2}$/.test(startIn.value) ? startIn.value : ''; persist(); renderOut(); }); }
    var copyBtn = root.querySelector('[data-plan-copy]'), dlBtn = root.querySelector('[data-plan-download]'), printBtn = root.querySelector('[data-plan-print]'), clearBtn = root.querySelector('[data-plan-clear]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      track('plan_export', { method: 'copy' });
      var txt = P.asText(plan, catalog, labels);
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { announce(t('copied', 'Plan copied.')); copyBtn.textContent = t('copied', 'Plan copied.'); }, function () { window.prompt(t('copy_manual', 'Copy your plan:'), txt); });
      else window.prompt(t('copy_manual', 'Copy your plan:'), txt);
    });
    if (dlBtn) dlBtn.addEventListener('click', function () {
      track('plan_export', { method: 'download' });
      var blob = new Blob([P.asText(plan, catalog, labels)], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'salzburg-day-plan.txt'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    if (printBtn) printBtn.addEventListener('click', function () { track('print_request', { context: 'planner' }); try { window.print(); } catch (e) { /* ignore */ } });
    if (clearBtn) clearBtn.addEventListener('click', function () { plan = P.readPlan(null, catalog); persist(); render(); announce(t('cleared', 'Plan cleared.')); });
    render();
  }

  /* ---------------- start ---------------- */
  function start() {
    placeAds();
    settingsButtons();
    if (!googleOff) { watchCmp(); state.timer = setTimeout(askAnalytics, C.ANALYTICS.WAIT_MS); }
    else apply();
    document.querySelectorAll('[data-print]').forEach(function (b) { b.addEventListener('click', function () { track('print_request', { context: 'walk' }); try { window.print(); } catch (e) { /* ignore */ } }); });
    tourMode();
    planner();
    var y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
