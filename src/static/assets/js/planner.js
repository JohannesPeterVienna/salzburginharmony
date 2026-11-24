/*
 * Salzburg in Harmony – day planner rules without DOM (tested in tests/planner.test.js).
 * A plan is a list of chosen stations with minutes each, plus a buffer. Everything stays in the visitor's browser.
 * The planner adds up time at the stops only: walking, waiting, transport and entry queues are not calculated.
 */
(function (root) {
  'use strict';
  var PLAN = { KEY: 'sih-plan', VERSION: 1, MIN_MINUTES: 5, MAX_MINUTES: 240, MAX_BUFFER: 240, DEFAULT_BUFFER: 30 };

  function clampMinutes(v, fallback) {
    var n = typeof v === 'string' ? parseInt(v, 10) : v;
    if (typeof n !== 'number' || !isFinite(n)) return fallback;
    n = Math.round(n);
    if (n < PLAN.MIN_MINUTES) return PLAN.MIN_MINUTES;
    if (n > PLAN.MAX_MINUTES) return PLAN.MAX_MINUTES;
    return n;
  }
  function clampBuffer(v) {
    var n = typeof v === 'string' ? parseInt(v, 10) : v;
    if (typeof n !== 'number' || !isFinite(n) || n < 0) return 0;
    return Math.min(Math.round(n), PLAN.MAX_BUFFER);
  }

  function validClock(s) { return typeof s === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(s); }
  // stored JSON → valid plan or an empty plan. Unknown station ids (not in catalog) are dropped.
  function readPlan(raw, catalog) {
    var empty = { v: PLAN.VERSION, items: [], buffer: PLAN.DEFAULT_BUFFER, start: '' };
    var p = raw;
    if (typeof raw === 'string') { try { p = JSON.parse(raw); } catch (e) { return empty; } }
    if (!p || typeof p !== 'object' || p.v !== PLAN.VERSION || !Array.isArray(p.items)) return empty;
    var seen = {}, items = [];
    for (var i = 0; i < p.items.length; i++) {
      var it = p.items[i];
      if (!it || typeof it.id !== 'string' || seen[it.id]) continue;
      if (catalog && !catalog[it.id]) continue;
      seen[it.id] = true;
      items.push({ id: it.id, minutes: clampMinutes(it.minutes, catalog && catalog[it.id] ? catalog[it.id].minutes : 30) });
    }
    return { v: PLAN.VERSION, items: items, buffer: clampBuffer(p.buffer), start: validClock(p.start) ? p.start : '' };
  }

  function toggle(plan, id, catalog) {
    var items = plan.items.filter(function (it) { return it.id !== id; });
    if (items.length === plan.items.length) {   // not in plan yet → add with the catalog default
      if (!catalog || !catalog[id]) return plan;
      items.push({ id: id, minutes: clampMinutes(catalog[id].minutes, 30) });
    }
    return { v: PLAN.VERSION, items: items, buffer: plan.buffer, start: plan.start };
  }
  function setMinutes(plan, id, minutes) {
    return { v: PLAN.VERSION, start: plan.start, buffer: plan.buffer, items: plan.items.map(function (it) {
      return it.id === id ? { id: it.id, minutes: clampMinutes(minutes, it.minutes) } : it;
    }) };
  }
  function move(plan, id, dir) {
    var i = -1;
    for (var k = 0; k < plan.items.length; k++) if (plan.items[k].id === id) i = k;
    var j = i + (dir < 0 ? -1 : 1);
    if (i < 0 || j < 0 || j >= plan.items.length) return plan;
    var items = plan.items.slice();
    var tmp = items[i]; items[i] = items[j]; items[j] = tmp;
    return { v: PLAN.VERSION, items: items, buffer: plan.buffer, start: plan.start };
  }
  // total minutes at the stops + buffer
  function total(plan) {
    var sum = 0;
    for (var i = 0; i < plan.items.length; i++) sum += plan.items[i].minutes;
    return sum + clampBuffer(plan.buffer);
  }
  // 'HH:MM' + minutes → 'HH:MM' (wraps past midnight); '' when no start
  function addToClock(start, minutes) {
    if (!validClock(start)) return '';
    var h = parseInt(start.slice(0, 2), 10), m = parseInt(start.slice(3), 10);
    var t = ((h * 60 + m + Math.round(minutes)) % 1440 + 1440) % 1440;
    var hh = Math.floor(t / 60), mm = t % 60;
    return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
  }
  // plan → rows for display/print: each stop with its running clock time (when a start is set)
  function schedule(plan, catalog) {
    var rows = [], clock = plan.start, elapsed = 0;
    for (var i = 0; i < plan.items.length; i++) {
      var it = plan.items[i], c = catalog && catalog[it.id] ? catalog[it.id] : { title: it.id, tour: '' };
      rows.push({ id: it.id, title: c.title, tour: c.tour, minutes: it.minutes, at: clock ? addToClock(clock, elapsed) : '' });
      elapsed += it.minutes;
    }
    return { rows: rows, total: total(plan), end: clock ? addToClock(clock, total(plan)) : '' };
  }
  // the plan as plain text for the clipboard or a .txt download
  function asText(plan, catalog, labels) {
    var L = labels || {};
    var s = schedule(plan, catalog), lines = [L.title || 'My Salzburg day'];
    if (!s.rows.length) { lines.push(L.empty || '(no stops chosen)'); return lines.join('\n'); }
    for (var i = 0; i < s.rows.length; i++) {
      var r = s.rows[i];
      lines.push((i + 1) + '. ' + (r.at ? r.at + '  ' : '') + r.title + (r.tour ? ' (' + r.tour + ')' : '') + ' – ' + r.minutes + ' ' + (L.min || 'min'));
    }
    lines.push('');
    lines.push((L.buffer || 'Buffer') + ': ' + clampBuffer(plan.buffer) + ' ' + (L.min || 'min'));
    lines.push((L.total || 'Time at the stops incl. buffer') + ': ' + s.total + ' ' + (L.min || 'min') + (s.end ? ' – ' + (L.end || 'ends about') + ' ' + s.end : ''));
    lines.push(L.note || 'Walking, transport, queues and opening hours are not included. Check them before you go.');
    return lines.join('\n');
  }

  var api = { PLAN: PLAN, clampMinutes: clampMinutes, clampBuffer: clampBuffer, readPlan: readPlan, toggle: toggle, setMinutes: setMinutes,
    move: move, total: total, addToClock: addToClock, schedule: schedule, asText: asText, validClock: validClock };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SIHPlanner = api;
})(this);
