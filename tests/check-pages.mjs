// Static checks on docs/: sitemap vs files, canonical, meta, headings, loader order, ads only where allowed,
// noindex where required, internal links, word counts, forbidden words (trademark rule), hreflang pairs.
import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.resolve('docs');
const SITE = 'https://www.salzburginharmony.com';
const problems = [];
const p = (u, m) => problems.push(`${u}: ${m}`);
const read = (rel) => fs.readFileSync(path.join(DOCS, rel.endsWith('/') ? rel + 'index.html' : rel), 'utf8');
const exists = (u) => { const c = u.split('#')[0].split('?')[0]; return fs.existsSync(path.join(DOCS, c.endsWith('/') ? c + 'index.html' : c)); };

// every html file under docs
const files = [];
(function walk(d, rel = '') { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'assets') continue; const r = rel + '/' + e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else if (e.name.endsWith('.html')) files.push(r.replace(/\/index\.html$/, '/')); } })(DOCS);
const sitemap = [...fs.readFileSync(path.join(DOCS, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const loc of sitemap) if (!loc.startsWith(SITE + '/')) problems.push('sitemap loc not on site: ' + loc);
const inSitemap = new Set(sitemap.map((l) => l.slice(SITE.length)));

// the trademark rule: none of these may appear anywhere on the site (case-insensitive), in any language
const FORBIDDEN = [/trapp/i, /sound of music/i, /edelwei/i, /\bmaria\b/i, /do-re-mi/i, /film location/i, /movie location/i, /julie andrews/i, /ट्रैप/, /साउंड ऑफ़? म्यूज़िक/];
const titles = new Map(), descs = new Map();
for (const u of files) {
  const h = read(u);
  const noindex = /<meta name="robots" content="noindex/.test(h);
  const legal = /^\/(de\/)?(imprint|impressum|privacy|datenschutz|contact|kontakt|shop)\/$/.test(u) || u === '/404.html';
  const hi = u.startsWith('/hi/');
  // sitemap membership
  if (inSitemap.has(u) && noindex) p(u, 'noindex page in sitemap');
  if (!inSitemap.has(u) && !noindex) p(u, 'indexable page missing from sitemap');
  if ((hi || u === '/shop/' || u === '/404.html') && !noindex) p(u, 'must be noindex');
  // head
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!hi && (t.length < 20 || t.length > 75)) p(u, `title length ${t.length}`);
  if (!hi && (d.length < 100 || d.length > 175)) p(u, `description length ${d.length}`);
  if (titles.has(t)) p(u, 'duplicate title with ' + titles.get(t)); titles.set(t, u);
  if (descs.has(d)) p(u, 'duplicate description with ' + descs.get(d)); descs.set(d, u);
  if ((h.match(/<h1[ >]/g) || []).length !== 1) p(u, 'needs exactly one h1');
  const canon = u === '/404.html' ? SITE + '/404.html' : SITE + u;
  if (!h.includes(`<link rel="canonical" href="${canon}">`)) p(u, 'canonical missing or wrong');
  if (!h.includes('name="google-adsense-account"')) p(u, 'adsense account meta missing');
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(h)) p(u, 'viewport');
  // loader order: consent default → AdSense loader (only on ad pages) → everything in head
  const ads = /<html lang="\w+" data-ads="yes"/.test(h);
  const loaders = (h.match(/<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-7811071715414905" crossorigin="anonymous"><\/script>/g) || []).length;
  const googleOff = h.includes('data-google="off"');
  if (legal && (ads || loaders || !googleOff)) p(u, 'legal/contact/shop/404 page must have no ads, no loader and data-google="off"');
  if (hi && (ads || loaders)) p(u, 'hindi draft must not carry ads');
  if (!legal && !hi && (!ads || loaders !== 1)) p(u, `content page needs data-ads="yes" and exactly one loader (has ${loaders})`);
  if (loaders) {
    const def = h.indexOf("gtag('consent','default'"), ld = h.indexOf('adsbygoogle.js'), head = h.indexOf('</head>');
    if (!(def > 0 && def < ld && ld < head)) p(u, 'AdSense loader must be in head after the consent default');
    if (!/ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'/.test(h)) p(u, 'consent default not all denied');
  }
  if (h.includes('googletagmanager.com/gtag/js')) p(u, 'GA script must never be static');
  if (h.includes('fundingchoicesmessages.google.com')) p(u, 'CMP script must not be static (comes with the AdSense loader / explicit click)');
  if (!/<footer[\s\S]*data-privacy-settings>/.test(h)) p(u, 'footer without Privacy settings button');
  // ad boxes: only on ad pages, hidden by default, with label
  const boxes = (h.match(/<div class="ad" data-slot="[a-z]+" hidden>/g) || []).length;
  if (!ads && boxes) p(u, 'ad boxes on a non-ad page');
  if (ads && !boxes) p(u, 'ad page without ad boxes');
  if (ads && !/<div class="ad" data-slot="side" hidden>/.test(h)) p(u, 'ad page without the sidebar box');
  if (/<ins class="adsbygoogle"/.test(h)) p(u, 'static <ins> is not allowed; the runtime adds it');
  // links
  for (const m of h.matchAll(/href="(\/[^"]*)"/g)) if (!exists(m[1])) p(u, 'broken internal link ' + m[1]);
  for (const m of h.matchAll(/src="(\/[^"]*)"/g)) if (!fs.existsSync(path.join(DOCS, m[1].split('?')[0]))) p(u, 'missing asset ' + m[1]);
  if (u !== '/shop/' && /href="\/shop\/"/.test(h)) p(u, 'shop page linked while hidden');
  // forbidden words
  const text = h.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const re of FORBIDDEN) if (re.test(text)) p(u, 'forbidden word ' + re);
  // words on tour pages
  const main = h.slice(h.indexOf('<main'), h.indexOf('</main>')).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ');
  const words = main.replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
  if (/^\/tours\/.+/.test(u) && words < 900) p(u, `only ${words} words`);
  if (!legal && !hi && words < 250) p(u, `thin page: ${words} words`);
  if (u === '/404.html' && !noindex) p(u, '404 must be noindex');
  // hreflang: each alternate must exist and point back
  for (const m of h.matchAll(/<link rel="alternate" hreflang="(\w+|x-default)" href="https:\/\/www\.salzburginharmony\.com([^"]*)">/g)) { if (!exists(m[2])) p(u, 'hreflang target missing ' + m[2]); else if (m[1] !== 'x-default' && !read(m[2]).includes(`hreflang="${h.match(/<html lang="(\w+)"/)[1]}" href="${SITE}${u}"`)) p(u, 'hreflang not reciprocal from ' + m[2]); }
  // tour pages: tour-data json present and valid, station count matches
  if (/^\/(hi\/)?tours\/.+/.test(u)) {
    const j = (h.match(/<script id="tour-data" type="application\/json">([\s\S]*?)<\/script>/) || [])[1];
    try { const data = JSON.parse(j); if (data.stations.length < 6 || data.stations.length > 8) p(u, `station count ${data.stations.length}`); if ((h.match(/<section class="station"/g) || []).length !== data.stations.length) p(u, 'station sections != tour data'); for (const s of data.stations) if (!s.anton || !s.dora || !s.task || !s.body) p(u, 'station incomplete ' + s.id); } catch (e) { p(u, 'tour-data invalid'); }
    if (!/<figure class="sketch">/.test(h)) p(u, 'no route sketch');
    if (!/checked 6 November 2026|status 10\/2026|status 11\/2025|6 नवंबर 2026/.test(h)) p(u, 'practical box without check date');
  }
  if (/^\/(de\/)?(planner|planer)\/$/.test(u) && !/<script id="planner-data"/.test(h)) p(u, 'planner data missing');
}
for (const f of ['ads.txt', 'robots.txt', 'CNAME', '404.html', 'sitemap.xml', 'favicon.svg', '.nojekyll']) if (!fs.existsSync(path.join(DOCS, f))) problems.push('missing ' + f);
if (fs.readFileSync(path.join(DOCS, 'CNAME'), 'utf8') !== 'www.salzburginharmony.com') problems.push('CNAME must be exactly www.salzburginharmony.com without newline');
if (fs.readFileSync(path.join(DOCS, 'ads.txt'), 'utf8') !== 'google.com, pub-7811071715414905, DIRECT, f08c47fec0942fa0\n') problems.push('ads.txt changed');
const robots = fs.readFileSync(path.join(DOCS, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) problems.push('robots without sitemap');
for (const s of ['/shop/', '/hi/']) if (!robots.includes('Disallow: ' + s)) problems.push('robots must disallow ' + s);
const tourCount = sitemap.filter((l) => /\/tours\/.+\/$/.test(l)).length;
if (tourCount < 6 || tourCount > 8) problems.push(`tour count ${tourCount}`);
console.log(problems.length ? problems.join('\n') : `${files.length} pages, ${sitemap.length} in sitemap, ${tourCount} tours: OK`);
process.exit(problems.length ? 1 : 0);
