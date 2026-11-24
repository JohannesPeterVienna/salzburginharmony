// Static checks on docs/ and the repository: sitemap vs files, canonical, meta, headings, loader order, ads only
// below the content and only where allowed, legal texts as published live, contact form as live, internal links,
// word counts, no placeholders or announcements, the naming rule (no family, film, song or role names anywhere –
// pages, scripts, metadata, alt texts, file names, repository files), hreflang pairs, upload package rules.
import fs from 'node:fs';
import path from 'node:path';
import { LIVE } from '../src/content/legal-live.mjs';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(ROOT, 'docs');
const SITE = 'https://www.salzburginharmony.com';
const problems = [];
const p = (u, m) => problems.push(`${u}: ${m}`);
const read = (rel) => fs.readFileSync(path.join(DOCS, rel.endsWith('/') ? rel + 'index.html' : rel), 'utf8');
const exists = (u) => { const c = decodeURI(u.split('#')[0].split('?')[0]); return fs.existsSync(path.join(DOCS, c.endsWith('/') ? c + 'index.html' : c)); };
const textOf = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// ---------- the naming rule ----------
// Patterns are stored base64-encoded so that this test file itself does not contain the words it forbids.
const FORBIDDEN = ['dHJhcHA=', 'c291bmRccypvZlxzKm11c2lj', 'ZWRlbHdlaSg/OnNzfMOffHNlfHNlbik=', 'ZG9bXHPigJEtXSpyZVtcc+KAkS1dKm1p', 'ZG9lLD9ccyphXHMqZGVlcg==', 'anVsaWVccyphbmRyZXdz', 'Y2hyaXN0b3BoZXJccypwbHVtbWVy', 'aGFtbWVyc3RlaW4=', 'cm9kZ2Vyc1xzKyg/OiZ8YW5kKQ==', 'ZmF2b3U/cml0ZVxzK3RoaW5ncw==', 'c2l4dGVlblxzK2dvaW5n', 'Y2xpbWJccytldg==', 'bG9uZWx5XHMrZ29hdGhlcmQ=', 'c29ccytsb25nLD9ccytmYXJld2VsbA==', 'aVxzK2hhdmVccytjb25maWRlbmNl', 'aGlsbHNccythcmVccythbGl2ZQ==', 'XGJtYXJpYVxi', 'XGJsaWVzbFxi', 'XGJncmV0bFxi', 'XGJicmlnaXR0YVxi', 'ZGV0d2VpbGVy', 'c2NocmFlZGVy', 'bW90aGVyXHMrYWJiZXNz', 'Y2FwdGFpblxzK3Zvbg==', 'bWVpbmVccytsaWVkZXI=', 'ZmlsbVxzKmxvY2F0aW9u', 'bW92aWVccypsb2NhdGlvbg==', 'ZmlsbWluZ1xzK2xvY2F0aW9u', 'ZHJlaG9ydA==', 'ZmlsbWt1bGlzc2U=', 'aG9sbHl3b29k', 'XGJtdXNpY2FsXGI=', 'Z292ZXJuZXNz', '4KSf4KWN4KSw4KWI4KSq', '54m55ouJ5pmu'].map((b) => new RegExp(Buffer.from(b, 'base64').toString('utf8'), 'iu'));
const TEXT_EXT = /\.(html|js|mjs|cjs|css|json|txt|xml|md|svg|htaccess)$/;
const SKIP_DIRS = new Set(['.git', 'node_modules', '.shots']);
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const f = path.join(dir, e.name), rel = path.relative(ROOT, f);
    for (const re of FORBIDDEN) if (re.test(e.name)) problems.push(`naming rule: file name ${rel} matches ${re}`);
    if (e.isDirectory()) { scan(f); continue; }
    if (!TEXT_EXT.test(e.name) && e.name !== '.gitignore') continue;
    const s = fs.readFileSync(f, 'utf8');
    for (const re of FORBIDDEN) { const m = s.match(re); if (m) problems.push(`naming rule: ${rel} contains "${m[0]}" (${re})`); }
  }
})(ROOT);

// ---------- pages ----------
const files = [];
(function walk(d, rel = '') { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'assets') continue; const r = rel + '/' + e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else if (e.name.endsWith('.html')) files.push(r.replace(/\/index\.html$/, '/')); } })(DOCS);
const sitemapXml = fs.readFileSync(path.join(DOCS, 'sitemap.xml'), 'utf8');
const sitemap = [...sitemapXml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const loc of sitemap) if (!loc.startsWith(SITE + '/')) problems.push('sitemap loc not on site: ' + loc);
const inSitemap = new Set(sitemap.map((l) => l.slice(SITE.length)));
for (const u of inSitemap) if (!files.includes(u)) problems.push('sitemap entry without file: ' + u);

const PLACEHOLDER = [/class="ph"/, /photo to follow/i, /foto folgt/i, /image coming/i, /coming soon/i, /in development/i, /in preparation/i, /in vorbereitung/i, /\bplanned\b/i, /geplant/i, /demnächst/i, /advertising space/i, /werbefläche/i, /mediadaten/i, /werbung\.html/i, /\/shop\//, /lemon squeezy/i, /hreflang="(hi|zh)/, /lang="(hi|zh)/];
const titles = new Map(), descs = new Map();
for (const u of files) {
  const h = read(u);
  const noindex = /<meta name="robots" content="noindex/.test(h);
  const legal = /^\/(de\/)?(imprint|impressum|privacy|datenschutz|contact|kontakt)\/$/.test(u) || u === '/404.html';
  if (inSitemap.has(u) && noindex) p(u, 'noindex page in sitemap');
  if (!inSitemap.has(u) && !noindex) p(u, 'indexable page missing from sitemap');
  if (u === '/404.html' && !noindex) p(u, '404 must be noindex');
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (t.length < 20 || t.length > 75) p(u, `title length ${t.length}`);
  if (d.length < 100 || d.length > 175) p(u, `description length ${d.length}`);
  if (titles.has(t)) p(u, 'duplicate title with ' + titles.get(t)); titles.set(t, u);
  if (descs.has(d)) p(u, 'duplicate description with ' + descs.get(d)); descs.set(d, u);
  if ((h.match(/<h1[ >]/g) || []).length !== 1) p(u, 'needs exactly one h1');
  const canon = u === '/404.html' ? SITE + '/404.html' : SITE + u;
  if (!h.includes(`<link rel="canonical" href="${canon}">`)) p(u, 'canonical missing or wrong');
  if (!h.includes('<meta name="google-adsense-account" content="ca-pub-7811071715414905">')) p(u, 'adsense account meta missing');
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(h)) p(u, 'viewport');
  if (!/<html lang="(en|de)"/.test(h)) p(u, 'language must be en or de');
  // loader order: consent default → AdSense loader (only on ad pages)
  const ads = /<html lang="\w+" data-ads="yes"/.test(h);
  const loaders = (h.match(/<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-7811071715414905" crossorigin="anonymous"><\/script>/g) || []).length;
  const googleOff = h.includes('data-google="off"');
  if (legal && (ads || loaders || !googleOff)) p(u, 'legal/contact/404 page must have no ads, no loader and data-google="off"');
  if (!legal && (!ads || loaders !== 1)) p(u, `content page needs data-ads="yes" and exactly one loader (has ${loaders})`);
  if (loaders) {
    const def = h.indexOf("gtag('consent','default'"), ld = h.indexOf('adsbygoogle.js'), head = h.indexOf('</head>');
    if (!(def > 0 && def < ld && ld < head)) p(u, 'AdSense loader must be in head after the consent default');
    if (!/ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'/.test(h)) p(u, 'consent default not all denied');
  }
  if (h.includes('googletagmanager.com/gtag/js')) p(u, 'GA script must never be static');
  if (h.includes('fundingchoicesmessages.google.com')) p(u, 'CMP script must not be static (comes with the AdSense loader / explicit click)');
  if (!/<footer[\s\S]*data-privacy-settings>/.test(h)) p(u, 'footer without the ad privacy button');
  if (!/<footer[\s\S]*data-analytics-settings>/.test(h)) p(u, 'footer without the analytics settings button');
  if (!/<footer[\s\S]*<div id="imprint">/.test(h)) p(u, 'footer without the id="imprint" block (target of /en.html#imprint and /de.html#imprint)');
  // ads: one box, below the content, hidden by default, with label; never inside the content
  const boxes = (h.match(/<div class="ad" data-slot="[a-z]+" hidden>/g) || []).length;
  if (!ads && boxes) p(u, 'ad box on a non-ad page');
  if (ads && boxes !== 1) p(u, `ad page needs exactly one ad box (has ${boxes})`);
  if (ads) { const c = h.indexOf('<div class="content">'), z = h.indexOf('<div class="ad-zone">'), f = h.indexOf('<footer'); const inner = h.slice(c, z); if (!(c > 0 && z > c && z < f) || /class="ad"/.test(inner)) p(u, 'the ad box must follow the whole content'); }
  if (/<ins class="adsbygoogle"/.test(h)) p(u, 'static <ins> is not allowed; the runtime adds it');
  // links and assets
  for (const m of h.matchAll(/href="(\/[^"]*)"/g)) if (!exists(m[1])) p(u, 'broken internal link ' + m[1]);
  for (const m of h.matchAll(/src="(\/[^"]*)"/g)) if (!fs.existsSync(path.join(DOCS, m[1].split('?')[0]))) p(u, 'missing asset ' + m[1]);
  for (const m of h.matchAll(/href="([^"/#][^":]*)"/g)) if (!/^(mailto|tel|https?):/.test(m[1])) p(u, 'relative link (must work from the domain root): ' + m[1]);
  // no placeholders, announcements, ad mock-ups, shop or removed languages
  const txt = textOf(h);
  for (const re of PLACEHOLDER) if (re.test(re.source.startsWith('class') || re.source.includes('hreflang') || re.source.includes('lang=') || re.source.includes('shop') ? h : txt)) p(u, 'placeholder/announcement/removed feature: ' + re);
  // thin pages
  const main = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  const words = textOf(main).split(' ').filter((w) => /\p{L}/u.test(w)).length;
  if (/^\/tours\/.+/.test(u) && words < 1500) p(u, `only ${words} words`);
  if (!legal && words < 250) p(u, `thin page: ${words} words`);
  // hreflang: each alternate must exist and point back
  for (const m of h.matchAll(/<link rel="alternate" hreflang="([\w-]+)" href="https:\/\/www\.salzburginharmony\.com([^"]*)">/g)) {
    if (!exists(m[2])) p(u, 'hreflang target missing ' + m[2]);
    else if (m[1] !== 'x-default' && !read(m[2]).includes(`hreflang="${h.match(/<html lang="(\w+)"/)[1]}" href="${SITE}${u}"`)) p(u, 'hreflang not reciprocal from ' + m[2]);
  }
  // tour pages: data, stations, sketch, practical box with date, accessibility, sources with access date
  if (/^\/tours\/.+/.test(u)) {
    const j = (h.match(/<script id="tour-data" type="application\/json">([\s\S]*?)<\/script>/) || [])[1];
    try { const data = JSON.parse(j); if (data.stations.length < 6 || data.stations.length > 8) p(u, `station count ${data.stations.length}`); if ((h.match(/<section class="station"/g) || []).length !== data.stations.length) p(u, 'station sections != tour data'); for (const s of data.stations) if (!s.anton || !s.dora || !s.task || !s.body) p(u, 'station incomplete ' + s.id); } catch (e) { p(u, 'tour-data invalid'); }
    if (!/<figure class="sketch">/.test(h) || !/Schematic sketch, not to scale/.test(h)) p(u, 'no labelled route sketch');
    if (!/checked 6 November 2026|status 10\/2026|checked 9 November 2026|checked 24 November 2026/.test(h)) p(u, 'practical box without check date');
    if (!/Accessibility/.test(h)) p(u, 'no accessibility notes');
    if (!/<ul class="src">(<li><a href="https:[^"]+" rel="noopener">[^<]+<\/a>, accessed \d{1,2} [A-Z][a-z]+ 2026<\/li>)+<\/ul>/.test(h)) p(u, 'sources without access date');
    for (const m of h.matchAll(/<img src="\/assets\/img\/tours\/([^"]+)"/g)) if (!/Wikimedia Commons/.test(h.slice(h.indexOf(m[0]), h.indexOf(m[0]) + 1200))) p(u, 'photo without credit ' + m[1]);
  }
  if (u === '/planner/' && !/<script id="planner-data"/.test(h)) p(u, 'planner data missing');
}

// ---------- legal texts: the live fragments of 23 November 2026 must appear unchanged ----------
const where = { en: { imprint: '/imprint/', privacy: '/privacy/' }, de: { imprint: '/de/impressum/', privacy: '/de/datenschutz/' } };
for (const lang of ['en', 'de']) {
  const imp = read(where[lang].imprint), pri = read(where[lang].privacy);
  for (const k of ['owner', 'reach', 'business', 'h_owner', 'h_business', 'h_editorial', 'h_form']) if (!imp.includes(LIVE[`${lang}_${k}`])) p(where[lang].imprint, `live legal text changed: ${lang}_${k}`);
  for (const k of ['privacy_form', 'privacy_text', 'counter', 'ga', 'h_hosting']) if (!pri.includes(LIVE[`${lang}_${k}`])) p(where[lang].privacy, `live legal text changed: ${lang}_${k}`);
  if (!pri.includes(LIVE.privacy_controller)) p(where[lang].privacy, 'live legal text changed: privacy_controller');
  // contact form: same target, method, hidden fields, honeypot, field names and labels as live; only the privacy link moves
  const form = LIVE[`${lang}_form`].replace('<a href="/privacy.html">', `<a href="${where[lang].privacy}">`);
  if (!imp.includes(form)) p(where[lang].imprint, 'contact form differs from the live form');
  if (!imp.includes(`<input type="hidden" name="language" value="${lang}">`)) p(where[lang].imprint, 'form language field');
  if (!/<form action="https:\/\/www\.viennabyalocal\.com\/kontakt\.php" method="post"/.test(imp)) p(where[lang].imprint, 'form target');
  for (const n of ['site', 'language', 'company_url', 'sender_name', 'email', 'message']) if (!imp.includes(`name="${n}"`)) p(where[lang].imprint, 'form field missing ' + n);
}

// ---------- package files ----------
for (const f of ['ads.txt', 'robots.txt', '404.html', 'sitemap.xml', 'favicon.svg', '.htaccess']) if (!fs.existsSync(path.join(DOCS, f))) problems.push('missing ' + f);
for (const f of ['.htaccess.additions', 'index.php', 'CNAME', '.nojekyll', 'traffic.php', 'traffic-config.php', 'traffic-data.php']) if (fs.existsSync(path.join(DOCS, f))) problems.push('must not be in the upload package: ' + f);
if (fs.readFileSync(path.join(DOCS, 'ads.txt'), 'utf8') !== 'google.com, pub-7811071715414905, DIRECT, f08c47fec0942fa0\n') problems.push('ads.txt changed');
const robots = fs.readFileSync(path.join(DOCS, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) problems.push('robots without sitemap');
const ht = fs.readFileSync(path.join(DOCS, '.htaccess'), 'utf8');
for (const line of ht.split('\n').filter((l) => /^\s*Rewrite(Rule|Cond)/.test(l))) if (/traffic|index\\?\.php/.test(line) && !/!\^\/\(index\\\.php\|traffic/.test(line)) problems.push('.htaccess touches index.php/traffic*.php: ' + line);
if (/^\s*(DirectoryIndex|RewriteOptions)/m.test(ht)) problems.push('.htaccess must not set DirectoryIndex or RewriteOptions');
if (/Header[^\n]*\n?/.test(ht) && /<FilesMatch[^>]*php/.test(ht)) problems.push('.htaccess must not set headers for PHP');
for (const m of ht.matchAll(/^RewriteRule \^([^ ]+) /gm)) for (const t of ['traffic.php', 'traffic-config.php', 'traffic-data.php', 'index.php']) if (new RegExp('^' + m[1]).test(t)) problems.push(`.htaccess rule ^${m[1]} matches ${t}`);
const manifest = fs.readFileSync(path.join(ROOT, 'UPLOAD-MANIFEST.txt'), 'utf8');
for (const u of files) { const f = (u.endsWith('/') ? u + 'index.html' : u).slice(1); if (!manifest.includes(`\n${f} -> /html/salzburg/${f} | `)) problems.push('manifest misses ' + f); }
const tourCount = sitemap.filter((l) => /\/tours\/.+\/$/.test(l)).length;
if (tourCount < 6 || tourCount > 8) problems.push(`tour count ${tourCount}`);
console.log(problems.length ? problems.join('\n') : `${files.length} pages, ${sitemap.length} in sitemap, ${tourCount} tours, naming rule clean, legal texts as live: OK`);
process.exit(problems.length ? 1 : 0);
