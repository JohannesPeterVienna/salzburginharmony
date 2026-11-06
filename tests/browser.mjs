// Browser checks with Playwright on every page (sitemap + hidden pages) at 390 and 1366 px:
// no JS errors, no horizontal overflow, no local 404s, walk mode and planner work, and every ad box –
// forced visible as if filled – is at least 150 px from any button, input, select, textarea or summary.
// Usage: node tests/browser.mjs   (PLAYWRIGHT=/path/to/playwright to point at a module outside the repo)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
let pw = process.env.PLAYWRIGHT || 'playwright';
try { require.resolve(pw); } catch (e) { pw = path.join(execSync('npm root -g').toString().trim(), 'playwright'); }
const { chromium } = require(pw);
const DOCS = path.resolve('docs');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };
const srv = http.createServer((q, s) => {
  let p = decodeURIComponent(q.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(DOCS, p);
  if (!f.startsWith(DOCS) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404, { 'content-type': 'text/html' }); s.end(fs.readFileSync(path.join(DOCS, '404.html'))); return; }
  s.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); s.end(fs.readFileSync(f));
}).listen(0);
const base = `http://127.0.0.1:${srv.address().port}`;
const urls = [...fs.readFileSync('docs/sitemap.xml', 'utf8').matchAll(/<loc>https:\/\/www\.salzburginharmony\.com([^<]*)<\/loc>/g)].map((m) => m[1]).concat(['/shop/', '/hi/', '/hi/tours/mirabell-to-fortress/', '/404.html']);
const browser = await chromium.launch();
let fails = 0;
const bad = (u, w, m) => { fails++; console.log(`FAIL ${u} @${w}: ${m}`); };
for (const width of [390, 1366]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());   // no external requests in tests
  for (const u of urls) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('response', (res) => { if (res.status() === 404 && res.url().startsWith(base) && !u.endsWith('404.html')) errs.push('local 404: ' + res.url().slice(base.length)); });
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/net::ERR_FAILED|Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
    await page.goto(base + u, { waitUntil: 'load' });
    await page.waitForTimeout(3500);   // past the statistics window delay
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      statwin: !!document.querySelector('#sih-stats:not([hidden])'),
      googleOff: document.documentElement.getAttribute('data-google') === 'off',
      gaLoaded: !!document.querySelector('script[src*="googletagmanager"]'),
      // no ad box may show label/frame while nothing is filled
      liveAds: [...document.querySelectorAll('.ad')].filter((a) => (a.querySelector('.ad-label') || {}).offsetHeight > 0 || parseFloat(getComputedStyle(a).borderTopWidth) > 0).length,
      hiddenIns: !![...document.querySelectorAll('ins.adsbygoogle')].find((i) => getComputedStyle(i).display === 'none')
    }));
    if (info.overflow > 0) bad(u, width, `horizontal overflow ${info.overflow}px`);
    if (info.liveAds) bad(u, width, `${info.liveAds} ad box(es) show label/frame without a filled ad`);
    if (info.hiddenIns) bad(u, width, 'an <ins> is hidden');
    if (info.gaLoaded) bad(u, width, 'GA loaded without a click');
    if (info.googleOff && info.statwin) bad(u, width, 'statistics window opened by itself on a page without Google code');
    if (!info.googleOff && !info.statwin) bad(u, width, 'statistics window did not appear after 3 s (no CMP in tests)');
    // the window: × stores nothing; Decline stores denied; Allow loads GA once; withdrawal removes it again
    if (!info.googleOff) {
      await page.click('#sih-stats [data-w="close"]');
      let st = await page.evaluate(() => ({ stored: localStorage.getItem('sih-stats'), open: !!document.querySelector('#sih-stats:not([hidden])') }));
      if (st.stored !== null || st.open) bad(u, width, '× must close without storing');
      await page.click('footer [data-privacy-settings]');
      await page.click('#sih-stats [data-w="denied"]');
      st = await page.evaluate(() => JSON.parse(localStorage.getItem('sih-stats') || 'null'));
      if (!st || st.choice !== 'denied') bad(u, width, 'Decline not stored');
      if (u === '/') {   // once: Allow loads GA; withdrawal via the footer removes consent again
        await page.click('footer [data-privacy-settings]');
        await page.click('#sih-stats [data-w="granted"]');
        const ga = await page.evaluate(() => ({ ga: !!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-T00HRG2YVF"]'), off: window['ga-disable-G-T00HRG2YVF'], last: (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'update').pop() }));
        if (!ga.ga || ga.off !== false || !ga.last || ga.last[2].analytics_storage !== 'granted' || ga.last[2].ad_storage !== undefined) bad(u, width, 'Allow must load GA with analytics_storage granted only: ' + JSON.stringify(ga));
        await page.click('footer [data-privacy-settings]');
        await page.click('#sih-stats [data-w="denied"]');
        const after = await page.evaluate(() => ({ off: window['ga-disable-G-T00HRG2YVF'], last: (window.dataLayer || []).filter((a) => a[0] === 'consent' && a[1] === 'update').pop() }));
        if (after.off !== true || after.last[2].analytics_storage !== 'denied') bad(u, width, 'withdrawal must disable GA');
      }
      await page.evaluate(() => localStorage.clear());
    }
    // walk mode on tour pages: start, next ×2, reload keeps progress
    if (/\/tours\/.+/.test(u)) {
      await page.click('#tour-start');
      const s1 = await page.evaluate(() => (document.querySelector('#tourmode .step') || {}).textContent);
      if (!/ 1 \/ \d/.test(s1 || '')) bad(u, width, 'walk mode did not start: ' + s1);
      await page.click('#tourmode [data-tm="next"]'); await page.click('#tourmode [data-tm="next"]');
      await page.reload({ waitUntil: 'load' });
      const btn = await page.evaluate(() => document.getElementById('tour-start').textContent);
      if (!/3/.test(btn)) bad(u, width, 'progress not remembered: ' + btn);
      await page.evaluate(() => localStorage.clear());
    }
    // planner: tick a station, total appears, reload keeps it
    if (/\/(planner|planer)\/$/.test(u)) {
      await page.click('.plan-list input[data-station]');
      await page.fill('[data-start]', '09:00');
      await page.dispatchEvent('[data-start]', 'change');
      await page.reload({ waitUntil: 'load' });
      const out = await page.evaluate(() => document.querySelector('[data-plan-out]').textContent);
      if (!/09:00/.test(out) || !/min/i.test(out)) bad(u, width, 'planner did not keep the plan: ' + out.slice(0, 80));
      await page.evaluate(() => localStorage.clear());
    }
    // ad boxes forced visible (as if filled): ≥150 px to every control; and the page keeps no overflow
    const near = await page.evaluate(() => {
      const ads = [...document.querySelectorAll('.ad')];
      for (const a of ads) {
        a.hidden = false; a.style.minHeight = '250px';
        let ins = a.querySelector('ins.adsbygoogle');
        if (!ins) { ins = document.createElement('ins'); ins.className = 'adsbygoogle'; ins.style.display = 'block'; ins.style.height = '250px'; a.appendChild(ins); }
        ins.setAttribute('data-ad-status', 'filled');
      }
      const ctl = [...document.querySelectorAll('button, input, select, textarea, summary, a.btn, [role="button"]')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden' && !e.closest('.statwin'); });
      const out = [];
      for (const a of ads) {
        const r = a.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        for (const c of ctl) {
          const q = c.getBoundingClientRect();
          const d = Math.hypot(Math.max(0, q.left - r.right, r.left - q.right), Math.max(0, q.top - r.bottom, r.top - q.bottom));
          if (d < 150) out.push(`${a.dataset.slot} ad ${Math.round(d)} px from ${c.tagName.toLowerCase()} "${(c.textContent || c.name || '').trim().slice(0, 30)}"`);
        }
      }
      return { out, overflow: document.documentElement.scrollWidth - window.innerWidth, labels: ads.filter((a) => a.getBoundingClientRect().width && (a.querySelector('.ad-label') || {}).offsetHeight === 0).length };
    });
    for (const m of near.out) bad(u, width, m);
    if (near.overflow > 0) bad(u, width, `overflow with ads ${near.overflow}px`);
    if (near.labels) bad(u, width, `${near.labels} filled ad box(es) without a visible label`);
    for (const e of errs) bad(u, width, e);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
srv.close();
console.log(fails ? `${fails} failure(s)` : `${urls.length} pages × 2 widths OK`);
process.exit(fails ? 1 : 0);
