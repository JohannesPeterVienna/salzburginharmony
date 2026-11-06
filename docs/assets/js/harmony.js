/*
 * Salzburg in Harmony – page runtime.
 *  1. Ads: fixed boxes (.ad[data-slot]) get an AdSense <ins> only when a slot ID exists; label and frame appear
 *     only once Google reports data-ad-status "filled"/"unfill-optimized". The <ins> is never hidden.
 *  2. Consent: Google's CMP (Funding Choices, loaded with the AdSense script in the head) decides. Consent Mode
 *     defaults are "denied" (inline in the head, before any Google script). Google Analytics (G-T00HRG2YVF) loads
 *     only after a granted analytics signal – from Google's CMP or, while Google's message is not shown, from the
 *     site's own statistics window ("Allow"/"Decline" equal, "×"/Escape = no choice, 12 months, withdrawal in the footer).
 *     Google's CMP has priority: once it shows its message or reports a decision, the window closes and its stored
 *     choice is deleted. Pages marked html[data-google="off"] (imprint, privacy, contact, shop, 404) load no Google code;
 *     there "Privacy settings" opens the window only to view or change the choice.
 *  3. Tour mode: station by station with the chosen host (Alois/Theresa), progress in localStorage "sih-tour-<slug>".
 *  4. Day planner: localStorage "sih-plan" via SIHPlanner; export as text, print.
 */
(function () {
  'use strict';
  var C = window.SIHConsent, P = window.SIHPlanner;
  var CLIENT = 'ca-pub-7811071715414905', GA_ID = 'G-T00HRG2YVF', GA_OFF = 'ga-disable-' + GA_ID;
  // AdSense ad-unit IDs: empty until the site is approved and units exist (an empty ID renders nothing, reserves no space)
  var SLOTS = { top: '', inline: '', side: '', bottom: '' };
  var html = document.documentElement;
  var adsOn = html.getAttribute('data-ads') === 'yes';
  var googleOff = html.getAttribute('data-google') === 'off';
  var lang = html.getAttribute('lang') || 'en';
  var UI = {};
  try { var uiEl = document.getElementById('sih-ui'); if (uiEl) UI = JSON.parse(uiEl.textContent) || {}; } catch (e) { UI = {}; }
  function t(key, fallback) { return typeof UI[key] === 'string' ? UI[key] : fallback; }
  var gpc = false;
  try { gpc = navigator.globalPrivacyControl === true; } catch (e) { gpc = false; }
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
    var wide = window.matchMedia('(min-width: 1200px)').matches;
    document.querySelectorAll('.ad[data-slot]').forEach(function (box) {
      var name = box.getAttribute('data-slot'), id = SLOTS[name];
      if (!id) return;
      if (name === 'side' && !wide) return;
      var ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', CLIENT);
      ins.setAttribute('data-ad-slot', id);
      if (name === 'side') { ins.setAttribute('data-ad-format', 'auto'); } else { ins.setAttribute('data-ad-format', 'auto'); ins.setAttribute('data-full-width-responsive', 'true'); }
      box.appendChild(ins);
      box.hidden = false;
      mirrorStatus(box, ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* blocked: box stays empty */ }
    });
  }

  /* ---------------- consent + analytics ---------------- */
  var gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };
  var state = { tc: null, cmReady: false, us: null, lastSent: '', gaLoaded: false, erased: false };
  var stats = { phase: googleOff ? 'settings' : 'waiting', record: null, memo: undefined, timer: null };
  function loadGA() {
    if (state.gaLoaded) return; state.gaLoaded = true;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  }
  function consentModeValues() {
    try { var fc = window.googlefc; return fc && typeof fc.getGoogleConsentModeValues === 'function' ? (fc.getGoogleConsentModeValues() || null) : null; } catch (e) { return null; }
  }
  function statsBlocked() { return gpc || state.us === C.US_OPTED_OUT; }
  function eraseGaCookies() {
    if (state.erased) return; state.erased = true;
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
    if (stats.phase === 'active' || stats.phase === 'settings') {   // the site's window decides analytics only
      var ok = C.statsAllowed(stats.phase, statsBlocked(), stats.record);
      window[GA_OFF] = !ok;
      send({ analytics_storage: ok ? 'granted' : 'denied' });
      if (ok) { loadGA(); state.erased = false; } else if (stats.record && stats.record.choice === 'denied') eraseGaCookies();
      if (statsBlocked()) eraseGaCookies();
      return;
    }
    var cm = state.cmReady && C.gdprSignal(state.tc) !== 'no' ? consentModeValues() : null;
    var d = C.decide(state.tc, cm, state.us);
    if (gpc || googleOff) d.analytics_storage = 'denied';
    window[GA_OFF] = d.analytics_storage !== 'granted';
    send(d);
    if (d.analytics_storage === 'granted') { loadGA(); state.erased = false; }
    else if (statsBlocked() || C.googleDeclinedAnalytics(state.tc, cm ? cm.analyticsStoragePurposeConsentStatus : undefined)) eraseGaCookies();
  }
  function statsRead() {
    var raw = stats.memo === undefined ? load(C.STATS.KEY) : stats.memo;
    return C.statsRecord(raw, Date.now());
  }
  function statsSave(choice) {
    var rec = { v: C.STATS.VERSION, choice: choice, at: Date.now() };
    stats.memo = JSON.stringify(rec); store(C.STATS.KEY, stats.memo);
    stats.record = rec;
  }
  function statsForget() { stats.memo = null; stats.record = null; store(C.STATS.KEY, null); }
  // Google's CMP has priority over the window
  function seeTc(tc) {
    if (!tc || (stats.phase === 'settings' && !state.googleAsked)) return;
    if (tc.gdprApplies === false || C.cmpDecided(tc)) statsForget();
    if (C.cmpSpoke(tc) && stats.phase !== 'retired') { stats.phase = 'retired'; stats.record = null; state.lastSent = ''; closeWindow(false); }
  }
  function startStats(byButton) {
    if (stats.timer !== null) { clearTimeout(stats.timer); stats.timer = null; }
    if (stats.phase !== 'waiting') return;
    if (C.cmpSpoke(state.tc)) { seeTc(state.tc); apply(); return; }
    stats.phase = 'active';
    stats.record = statsRead();
    state.lastSent = '';
    apply();
    if (!byButton && !stats.record && !statsBlocked()) openWindow(null);
  }
  function watchCmp() {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: function () {
        if (typeof window.__tcfapi !== 'function') return;
        window.__tcfapi('addEventListener', 2, function (tc, ok) {
          state.tc = ok ? tc : null;
          if (ok && tc) { state.lastTc = tc; seeTc(tc); }
          if (ok && tc && tc.eventStatus === 'useractioncomplete' && window.googlefc && typeof window.googlefc.getGoogleConsentModeValues === 'function') state.cmReady = true;
          apply();
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
  // "Privacy settings": the window while it is in charge, otherwise Google's own message (EU) or U.S. dialog
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
    state.tc = null; state.cmReady = false; apply();   // withdrawn at once until the CMP reports anew
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
    if (googleOff) state.googleAsked = true;
    loadConsentScriptOnly();
  }
  function privacyButtons() {
    document.querySelectorAll('[data-privacy-settings]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (stats.phase === 'waiting') startStats(true);
        if (stats.phase === 'active' || stats.phase === 'settings') { openWindow(b); return; }
        openGoogleChoices();
      });
    });
  }

  /* ---------------- the statistics window ---------------- */
  var win = null, live = null, opener = null;
  function announce(text) {
    if (!live) { live = document.createElement('p'); live.className = 'statlive'; live.setAttribute('role', 'status'); document.body.appendChild(live); }
    live.textContent = ''; setTimeout(function () { live.textContent = text; }, 120);
  }
  function fmtDate(ms) { try { return new Date(ms).toLocaleDateString(lang === 'de' ? 'de-AT' : lang === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { return new Date(ms).toISOString().slice(0, 10); } }
  function buildWindow() {
    var el = document.createElement('section');
    el.className = 'statwin'; el.id = 'sih-stats'; el.hidden = true;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'false'); el.setAttribute('aria-labelledby', 'sih-stats-h'); el.setAttribute('aria-describedby', 'sih-stats-p');
    el.innerHTML = '<button type="button" class="x" data-w="close" aria-label="' + t('close_no_choice', 'Close without choosing') + '">×</button>' +
      '<p class="kicker">' + t('stats_kicker', 'Statistics only') + '</p><h2 id="sih-stats-h" tabindex="-1"></h2><div id="sih-stats-p"></div><p class="now" data-now></p>' +
      '<div class="picks" data-picks><button type="button" class="btn" data-w="granted">' + t('allow', 'Allow') + '</button><button type="button" class="btn ghost" data-w="denied">' + t('decline', 'Decline') + '</button></div>' +
      '<div class="picks" data-ok hidden><button type="button" class="btn ghost" data-w="close">' + t('close', 'Close') + '</button></div>' +
      '<p class="small" data-google hidden><button type="button" class="linklike" data-w="google">' + t('google_choices', 'Open Google’s ad and U.S. privacy choices') + '</button></p>';
    el.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-w]') : null; if (!b) return;
      var w = b.getAttribute('data-w');
      if (w === 'granted' || w === 'denied') { statsSave(w); state.lastSent = ''; apply(); announce(w === 'granted' ? t('saved_allow', 'Statistics allowed.') : t('saved_decline', 'Statistics declined.')); closeWindow(true); }
      else if (w === 'google') { var o = opener; closeWindow(false); openGoogleChoices(); if (o && o.focus) o.focus(); }
      else closeWindow(true);
    });
    el.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); closeWindow(true); } });
    document.body.appendChild(el);
    win = el;
  }
  function fillWindow() {
    var h = win.querySelector('#sih-stats-h'), p = win.querySelector('#sih-stats-p'), now = win.querySelector('[data-now]');
    var blocked = statsBlocked(), rec = statsRead();
    var link = ' <a href="' + t('privacy_url', '/privacy/') + '#statistics">' + t('privacy', 'Privacy policy') + '</a>';
    if (blocked) {
      h.textContent = t('stats_off_title', 'Statistics stay off');
      p.innerHTML = '<p>' + (gpc ? t('gpc_text', 'Your browser sends a Global Privacy Control signal, so Google Analytics stays off on this site and we do not ask.') : t('us_optout_text', 'You have opted out under a U.S. state privacy law, so Google Analytics stays off on this site.')) + link + '</p>';
      now.textContent = '';
    } else {
      h.textContent = t('stats_title', 'Allow visitor statistics?');
      p.innerHTML = '<p>' + t('stats_text', 'If you allow it, Google Analytics (Google Ireland Ltd.) counts page views and which walks are used, and sets cookies on your device; data may be processed in the USA. Statistics only – this is not consent to advertising. No choice means no statistics. Saved in this browser for 12 months; change it any time under “Privacy settings”.') + link + '</p>';
      var line = rec ? t('current_choice', 'Your current choice:') + ' ' + (rec.choice === 'granted' ? t('allowed', 'allowed') : t('declined', 'declined')) + ' (' + fmtDate(rec.at) + ')' : (opener ? t('no_choice_yet', 'No choice saved in this browser yet.') : '');
      if (stats.phase === 'settings') line += (line ? ' ' : '') + t('settings_note', 'Nothing is measured on this page. To withdraw consent to ads or to opt out under U.S. state law, use the link below; it loads Google’s consent script only then.');
      now.textContent = line;
    }
    now.hidden = !now.textContent;
    win.querySelector('[data-picks]').hidden = blocked;
    win.querySelector('[data-ok]').hidden = !blocked;
    win.querySelector('[data-google]').hidden = !opener;
  }
  function openWindow(by) {
    if (!document.body) return;
    if (!win) buildWindow();
    opener = by || null;
    fillWindow();
    win.hidden = false;
    document.body.style.paddingBottom = Math.ceil(win.getBoundingClientRect().height) + 20 + 'px';
    if (opener) win.querySelector('#sih-stats-h').focus({ preventScroll: true });
  }
  function closeWindow(byUser) {
    if (!win || win.hidden) return;
    win.hidden = true; document.body.style.paddingBottom = '';
    if (byUser && opener && opener.focus) { try { opener.focus(); } catch (e) { /* ignore */ } }
    opener = null;
  }

  /* ---------------- host choice ---------------- */
  var HOST_KEY = 'sih-host';
  function currentHost() { var h = load(HOST_KEY); return h === 'theresa' ? 'theresa' : 'alois'; }
  function setHost(h) { store(HOST_KEY, h === 'theresa' ? 'theresa' : 'alois'); document.querySelectorAll('input[name="host"]').forEach(function (r) { r.checked = r.value === h; }); }

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
      var hostName = host === 'theresa' ? 'Theresa' : 'Alois';
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
      var el = document.getElementById('station-' + (idx + 1));
      if (el && !done) { try { el.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) { el.scrollIntoView(); } }
      panel.querySelector('h2').focus({ preventScroll: true });
    }
    panel.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-tm]') : null; if (!b) return;
      var w = b.getAttribute('data-tm');
      if (w === 'next') { if (idx < stations.length - 1) { idx++; save(false); render(); } else { save(true); render(true); } }
      else if (w === 'prev') { if (idx > 0) { idx--; save(false); render(); } }
      else if (w === 'restart') { idx = 0; save(false); render(); }
      else if (w === 'print') { try { window.print(); } catch (e2) { /* ignore */ } }
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
    root.querAll = null;
    var copyBtn = root.querySelector('[data-plan-copy]'), dlBtn = root.querySelector('[data-plan-download]'), printBtn = root.querySelector('[data-plan-print]'), clearBtn = root.querySelector('[data-plan-clear]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var txt = P.asText(plan, catalog, labels);
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { announce(t('copied', 'Plan copied.')); copyBtn.textContent = t('copied', 'Plan copied.'); }, function () { window.prompt(t('copy_manual', 'Copy your plan:'), txt); });
      else window.prompt(t('copy_manual', 'Copy your plan:'), txt);
    });
    if (dlBtn) dlBtn.addEventListener('click', function () {
      var blob = new Blob([P.asText(plan, catalog, labels)], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'salzburg-day-plan.txt'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });
    if (printBtn) printBtn.addEventListener('click', function () { try { window.print(); } catch (e) { /* ignore */ } });
    if (clearBtn) clearBtn.addEventListener('click', function () { plan = P.readPlan(null, catalog); persist(); render(); announce(t('cleared', 'Plan cleared.')); });
    render();
  }

  /* ---------------- start ---------------- */
  function start() {
    placeAds();
    privacyButtons();
    if (!googleOff) { watchCmp(); stats.timer = setTimeout(function () { startStats(false); }, C.STATS.WAIT_MS); }
    else apply();
    tourMode();
    planner();
    var y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
