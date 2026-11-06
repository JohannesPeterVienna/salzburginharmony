// Day planner rules (docs/assets/js/planner.js) – pure functions, no DOM.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const loadScript = (f) => { const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(__dirname, '..', f), 'utf8'))(m, m.exports); return m.exports; };
const P = loadScript('docs/assets/js/planner.js');

const CAT = { a: { title: 'Mirabell Palace', tour: 'Mirabell to the Fortress', minutes: 25 }, b: { title: 'Gardens', tour: 'Mirabell to the Fortress', minutes: 35 }, c: { title: 'Fortress', tour: 'Mirabell to the Fortress', minutes: 90 } };

test('readPlan: empty, bad json, wrong version, unknown ids dropped, duplicates removed, minutes clamped', () => {
  assert.deepEqual(P.readPlan(null, CAT), { v: 1, items: [], buffer: 30, start: '' });
  assert.deepEqual(P.readPlan('{oops', CAT).items, []);
  assert.deepEqual(P.readPlan({ v: 9, items: [{ id: 'a', minutes: 10 }] }, CAT).items, []);
  const p = P.readPlan(JSON.stringify({ v: 1, items: [{ id: 'a', minutes: 1 }, { id: 'zz', minutes: 10 }, { id: 'a', minutes: 50 }, { id: 'b', minutes: 9999 }, { id: 'c', minutes: 'x' }], buffer: -5, start: '25:99' }), CAT);
  assert.deepEqual(p.items, [{ id: 'a', minutes: 5 }, { id: 'b', minutes: 240 }, { id: 'c', minutes: 90 }]);
  assert.equal(p.buffer, 0);
  assert.equal(p.start, '');
  assert.equal(P.readPlan({ v: 1, items: [], buffer: 1000, start: '09:30' }, CAT).buffer, 240);
  assert.equal(P.readPlan({ v: 1, items: [], start: '09:30' }, CAT).start, '09:30');
});
test('toggle adds with catalog default, removes when present, ignores unknown ids, keeps input unchanged', () => {
  const p0 = P.readPlan(null, CAT);
  const p1 = P.toggle(p0, 'a', CAT);
  assert.deepEqual(p1.items, [{ id: 'a', minutes: 25 }]);
  assert.deepEqual(p0.items, [], 'immutable');
  const p2 = P.toggle(p1, 'c', CAT);
  assert.deepEqual(p2.items.map((i) => i.id), ['a', 'c']);
  assert.deepEqual(P.toggle(p2, 'a', CAT).items.map((i) => i.id), ['c']);
  assert.equal(P.toggle(p2, 'nope', CAT), p2);
});
test('setMinutes clamps and move swaps neighbours only', () => {
  let p = P.toggle(P.toggle(P.toggle(P.readPlan(null, CAT), 'a', CAT), 'b', CAT), 'c', CAT);
  p = P.setMinutes(p, 'b', 3);
  assert.equal(p.items[1].minutes, 5);
  p = P.setMinutes(p, 'b', '400');
  assert.equal(p.items[1].minutes, 240);
  p = P.setMinutes(p, 'b', 'abc');
  assert.equal(p.items[1].minutes, 240, 'invalid keeps the previous value');
  assert.deepEqual(P.move(p, 'c', -1).items.map((i) => i.id), ['a', 'c', 'b']);
  assert.deepEqual(P.move(p, 'a', -1).items.map((i) => i.id), ['a', 'b', 'c'], 'first cannot move up');
  assert.deepEqual(P.move(p, 'c', 1).items.map((i) => i.id), ['a', 'b', 'c'], 'last cannot move down');
  assert.equal(P.move(p, 'zz', 1), p);
});
test('total and clock arithmetic', () => {
  let p = P.toggle(P.toggle(P.readPlan(null, CAT), 'a', CAT), 'c', CAT);   // 25 + 90
  assert.equal(P.total(p), 145);
  p.buffer = 45;
  assert.equal(P.total(p), 160);
  assert.equal(P.addToClock('09:30', 90), '11:00');
  assert.equal(P.addToClock('23:50', 20), '00:10', 'wraps past midnight');
  assert.equal(P.addToClock('', 20), '');
  assert.equal(P.addToClock('9:30', 20), '', 'needs HH:MM');
});
test('schedule rows carry running clock times; asText is complete and honest', () => {
  let p = P.toggle(P.toggle(P.toggle(P.readPlan(null, CAT), 'a', CAT), 'b', CAT), 'c', CAT);
  p.start = '09:00'; p.buffer = 30;
  const s = P.schedule(p, CAT);
  assert.deepEqual(s.rows.map((r) => [r.title, r.at]), [['Mirabell Palace', '09:00'], ['Gardens', '09:25'], ['Fortress', '10:00']]);
  assert.equal(s.total, 180);
  assert.equal(s.end, '12:00');
  const txt = P.asText(p, CAT);
  assert.match(txt, /^My Salzburg day\n1\. 09:00  Mirabell Palace \(Mirabell to the Fortress\) – 25 min/);
  assert.match(txt, /Buffer: 30 min/);
  assert.match(txt, /180 min – ends about 12:00/);
  assert.match(txt, /not included/);
  assert.match(P.asText(P.readPlan(null, CAT), CAT), /no stops chosen/);
  const de = P.asText(p, CAT, { title: 'Mein Tag', min: 'Min.', buffer: 'Puffer', total: 'Gesamt', end: 'endet etwa', note: 'Wege nicht enthalten.' });
  assert.match(de, /^Mein Tag\n/);
  assert.match(de, /Puffer: 30 Min\./);
});
