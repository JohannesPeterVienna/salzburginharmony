// Build: src/ → docs/. Node 22, no dependencies. docs/ is the complete upload package for the web space
// (World4You, Apache); UPLOAD-MANIFEST.txt in the repository root lists every file with SHA-256 and size.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { page, sketch, esc, SITE, BUILD_DATE, words } from './layout.mjs';
import * as EN from './pages/en.mjs';
import * as DE from './pages/de.mjs';
import * as LEGAL from './pages/legal.mjs';
import { TOUR_UI } from './i18n/tour.mjs';
import { CREDITS } from './content/credits.mjs';
import { LEGACY, HTACCESS } from './legacy.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(ROOT, 'docs');

const tourFiles = fs.readdirSync(path.join(ROOT, 'src/content/en')).filter((f) => f.endsWith('.mjs')).sort();
const ORDER = ['mirabell-to-fortress', 'hellbrunn', 'nonnberg', 'leopoldskron', 'getreidegasse', 'kapuzinerberg', 'untersberg', 'winter-salzburg'];
const tours = (await Promise.all(tourFiles.map((f) => import(path.join(ROOT, 'src/content/en', f)).then((m) => m.default)))).sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

// an image is used only if the file exists AND it has a licence entry; otherwise the place is designed without a picture
const imgExists = (file) => !!file && fs.existsSync(path.join(DOCS, 'assets/img/tours', file)) && !!CREDITS[file];
const creditLine = (file) => { const c = CREDITS[file]; return `Photo: ${esc(c.author)}, <a href="${c.source}" rel="noopener">Wikimedia Commons</a>, <a href="${c.licenseUrl}" rel="noopener license">${esc(c.license)}</a>${c.edit ? ` (${esc(c.edit)})` : ''}.`; };

// ---------- tour page ----------
function tourPage(t) {
  const L = TOUR_UI.en;
  const data = { slug: t.slug, title: t.title, stations: t.stations.map((s) => ({ id: s.id, title: s.title, where: s.where, minutes: s.minutes, body: s.body, anton: s.anton, dora: s.dora, task: s.task })) };
  const stations = t.stations.map((s, i) => `<section class="station" id="station-${i + 1}" aria-labelledby="st-${i + 1}">
<header><span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3 id="st-${i + 1}">${s.title}</h3></header>
<p class="where">${s.where} · ${L.about} ${s.minutes} ${L.min}</p>
${s.img && imgExists(s.img.file) ? `<figure><span class="pic"><img src="/assets/img/tours/${s.img.file}" alt="${esc(s.img.alt)}" loading="lazy" width="1200" height="800"></span><figcaption>${creditLine(s.img.file)}</figcaption></figure>\n` : ''}${s.body}
<div class="say anton"><img src="/assets/img/anton-160.png" alt="" width="56" height="56" loading="lazy"><div><b>Anton ${L.says}</b><p>${s.anton}</p></div></div>
<div class="say dora"><img src="/assets/img/dora-160.png" alt="" width="56" height="56" loading="lazy"><div><b>Dora ${L.says}</b><p>${s.dora}</p></div></div>
<div class="task"><b>${L.look}</b><p>${s.task}</p></div>
</section>`).join('\n');
  const hasHero = imgExists(t.hero.file);
  const heroPic = hasHero
    ? `<span class="tour-pic"><img src="/assets/img/tours/${t.hero.file}" alt="${esc(t.hero.alt)}" width="1600" height="900"></span><p class="credit">${creditLine(t.hero.file)}</p>`
    : `<div class="tour-sign" aria-hidden="true"><span>${ORDER.indexOf(t.slug) + 1}</span><b>${esc(t.short)}</b><i>${t.stations.length} stops · ${esc(t.facts.duration)}</i></div>`;
  const body = `
<div class="tour-head${hasHero ? '' : ' no-pic'}"><div><span class="kicker">${t.kicker}</span><h1>${t.title}</h1><p class="lede">${t.desc}</p></div><div>${heroPic}</div></div>
<div class="facts"><div><b>${L.duration}</b>${t.facts.duration}</div><div><b>${L.length}</b>${t.facts.length}</div><div><b>${L.start}</b>${t.facts.start}</div><div><b>${L.cost}</b>${t.facts.cost}</div></div>
${t.intro}
<section class="panel" aria-labelledby="start-h"><h2 id="start-h">${L.walk_with}</h2>
<p class="small">${L.hosts_note}</p>
<div class="hostpick"><label><input type="radio" name="host" value="anton" checked><img src="/assets/img/anton-160.png" alt="" width="48" height="48"><span>Anton<small>${L.anton_short}</small></span></label><label><input type="radio" name="host" value="dora"><img src="/assets/img/dora-160.png" alt="" width="48" height="48"><span>Dora<small>${L.dora_short}</small></span></label></div>
<p class="row"><button type="button" class="btn" id="tour-start">${L.start_walk}</button><a class="btn ghost" id="tour-plan-add" href="${L.planner_url}" role="button">${L.add_plan}</a><button type="button" class="btn ghost" data-print>${L.print}</button></p>
<p class="small muted">${L.progress_note}</p></section>
<div id="tourmode" class="tourmode" aria-live="polite"></div>
<h2>${L.before}</h2>${t.before}
<h2>${L.route}</h2>${sketch(t.sketch.points, t.sketch.backdrop, '', 'en')}
<h2>${L.stops_h} (${t.stations.length})</h2>
${stations}
${t.after}
<h2>${L.sources}</h2><ul class="src">${t.sources.map((s) => `<li><a href="${s.url}" rel="noopener">${esc(s.label)}</a>, ${L.accessed} ${s.accessed || L.date}</li>`).join('')}</ul>
<p class="reviewed">${L.checked} ${L.date}${t.rechecked ? `; ${t.rechecked}` : ''}.</p>
<script id="tour-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
  const url = `/tours/${t.slug}/`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: L.home, item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: L.walks, item: SITE + '/tours/' }, { '@type': 'ListItem', position: 3, name: t.title, item: SITE + url }] },
    { '@type': 'Article', headline: t.title, description: t.desc, inLanguage: 'en', datePublished: '2026-11-06', dateModified: BUILD_DATE, author: { '@type': 'Organization', name: 'AdStern' }, publisher: { '@type': 'Organization', name: 'AdStern' }, mainEntityOfPage: SITE + url },
    { '@type': 'ItemList', name: t.title, itemListOrder: 'https://schema.org/ItemListOrderAscending', numberOfItems: t.stations.length, itemListElement: t.stations.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title })) }
  ] };
  return page({ lang: 'en', path: url, title: `${t.title} – Salzburg in Harmony`, desc: t.desc, body, ads: true, crumbs: [['/', L.home], ['/tours/', L.walks], ['', t.short]], ld, ogType: 'article', image: hasHero ? `/assets/img/tours/${t.hero.file}` : undefined });
}

// ---------- write pages ----------
fs.rmSync(DOCS, { recursive: true, force: true });
fs.mkdirSync(DOCS, { recursive: true });
// static assets live in src/static and are copied as they are
fs.cpSync(path.join(ROOT, 'src/static'), DOCS, { recursive: true });

const urls = [];   // sitemap entries
function write(rel, html, { sitemap = true } = {}) {
  const out = rel.endsWith('.html') ? rel : path.join(rel, 'index.html');
  const f = path.join(DOCS, out);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  if (sitemap) urls.push(rel);
}

const plannerData = JSON.stringify({ tours: tours.map((t) => ({ slug: t.slug, title: t.short, url: `/tours/${t.slug}/`, stations: t.stations.map((s) => ({ id: s.id, title: s.title, minutes: s.minutes })) })) }).replace(/</g, '\\u003c');
const ALT = (en, de) => [['en', en], ['de', de]];

// English
write('/', page({ lang: 'en', path: '/', title: 'Salzburg in Harmony – self-guided walks with Anton and Dora', desc: 'Eight self-guided walks through Salzburg, Austria, told stop by stop by two fictional hosts: Mirabell, the fortress, Hellbrunn, Nonnberg, Kapuzinerberg and more.', hero: EN.hero(tours), body: EN.home(tours, imgExists), ads: true, alternates: ALT('/', '/de/'), ld: { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Salzburg in Harmony', url: SITE + '/', inLanguage: 'en', publisher: { '@type': 'Organization', name: 'AdStern' } } }));
write('/tours/', page({ lang: 'en', path: '/tours/', title: 'All walks – Salzburg in Harmony', desc: 'The eight self-guided Salzburg walks in a sensible order, with what to take first, how long each takes and how the practical boxes are checked.', body: EN.toursIndex(tours, imgExists), ads: true, crumbs: [['/', 'Home'], ['', 'Walks']], alternates: ALT('/tours/', '/de/touren/') }));
for (const t of tours) write(`/tours/${t.slug}/`, tourPage(t));
write('/planner/', page({ lang: 'en', path: '/planner/', title: 'Day planner – Salzburg in Harmony', desc: 'Pick stops from the eight Salzburg walks, set minutes and a buffer, and get a schedule to copy, download or print. Stored in your browser only.', body: EN.planner(tours) + `<script id="planner-data" type="application/json">${plannerData}</script>`, ads: true, crumbs: [['/', 'Home'], ['', 'Day planner']] }));
write('/hosts/', page({ lang: 'en', path: '/hosts/', title: 'Anton and Dora, the hosts – Salzburg in Harmony', desc: 'Who Anton and Dora are: two fictional, AI-generated Salzburg hosts, how they were made, what they know and what they are not.', body: EN.hosts(), ads: true, crumbs: [['/', 'Home'], ['', 'Hosts']], alternates: ALT('/hosts/', '/de/gastgeber/') }));
write('/about/', page({ lang: 'en', path: '/about/', title: 'About the site – Salzburg in Harmony', desc: 'What Salzburg in Harmony offers, how facts are checked and dated, the limits of the walks, image credits, advertising and who makes the site.', body: EN.about(tours, CREDITS, imgExists), ads: true, crumbs: [['/', 'Home'], ['', 'About']], alternates: ALT('/about/', '/de/ueber/') }));
write('/imprint/', page({ lang: 'en', path: '/imprint/', title: 'Legal notice – Salzburg in Harmony', desc: 'Legal notice for www.salzburginharmony.com: media owner AdStern – Agentur für digitales Marketing, Vienna, business details, contact form and terms of use.', body: LEGAL.imprintEn(), crumbs: [['/', 'Home'], ['', 'Legal notice']], alternates: ALT('/imprint/', '/de/impressum/') }));
write('/privacy/', page({ lang: 'en', path: '/privacy/', title: 'Privacy policy – Salzburg in Harmony', desc: 'How www.salzburginharmony.com handles data: World4You hosting, the contact form, Google Analytics only with your permission, Google AdSense and browser storage.', body: LEGAL.privacyEn(), crumbs: [['/', 'Home'], ['', 'Privacy']], alternates: ALT('/privacy/', '/de/datenschutz/') }));
write('/contact/', page({ lang: 'en', path: '/contact/', title: 'Contact – Salzburg in Harmony', desc: 'How to reach AdStern about the Salzburg walks: corrections, image credits and press, by contact form, email or phone, with the full postal address.', body: LEGAL.contactEn(), crumbs: [['/', 'Home'], ['', 'Contact']], alternates: ALT('/contact/', '/de/kontakt/') }));
write('404.html', page({ lang: 'en', path: '/404.html', title: 'Page not found – Salzburg in Harmony', desc: 'This page does not exist on Salzburg in Harmony. The address may have changed; all eight Salzburg walks are listed on one page, with the day planner next to it.', body: EN.notFound(), noindex: true }), { sitemap: false });

// German subset: only pages that are complete in German
write('/de/', page({ lang: 'de', path: '/de/', title: 'Salzburg in Harmony – Spaziergänge mit Anton und Dora', desc: 'Acht selbst geführte Spaziergänge durch Salzburg, Station für Station erzählt von zwei fiktiven Gastgebern: Mirabell, Festung, Hellbrunn, Nonnberg, Kapuzinerberg und mehr.', hero: DE.hero(), body: DE.home(tours, imgExists), ads: true, alternates: ALT('/', '/de/') }));
write('/de/touren/', page({ lang: 'de', path: '/de/touren/', title: 'Alle Spaziergänge – Salzburg in Harmony', desc: 'Die acht Salzburg-Spaziergänge in sinnvoller Reihenfolge, mit Dauer, Anlass und Hinweisen zum Lesen der Praxiskästen; die Stationstexte sind englisch.', body: DE.toursIndex(tours, imgExists), ads: true, crumbs: [['/de/', 'Start'], ['', 'Spaziergänge']], alternates: ALT('/tours/', '/de/touren/') }));
write('/de/gastgeber/', page({ lang: 'de', path: '/de/gastgeber/', title: 'Anton und Dora, die Gastgeber – Salzburg in Harmony', desc: 'Wer Anton und Dora sind: zwei fiktive, KI-generierte Salzburger Gastgeber, wie sie entstanden sind, was sie wissen und was sie nicht sind.', body: DE.hosts(), ads: true, crumbs: [['/de/', 'Start'], ['', 'Gastgeber']], alternates: ALT('/hosts/', '/de/gastgeber/') }));
write('/de/ueber/', page({ lang: 'de', path: '/de/ueber/', title: 'Über die Website – Salzburg in Harmony', desc: 'Was Salzburg in Harmony bietet, wie Fakten geprüft und datiert werden, die Grenzen der Spaziergänge, Bildnachweise, Werbung und wer die Seite macht.', body: DE.about(tours, CREDITS, imgExists), ads: true, crumbs: [['/de/', 'Start'], ['', 'Über']], alternates: ALT('/about/', '/de/ueber/') }));
write('/de/impressum/', page({ lang: 'de', path: '/de/impressum/', title: 'Impressum – Salzburg in Harmony', desc: 'Impressum von www.salzburginharmony.com: Medieninhaber AdStern – Agentur für digitales Marketing, Wien, Unternehmensangaben, Kontaktformular, Nutzungsbedingungen.', body: LEGAL.imprintDe(), crumbs: [['/de/', 'Start'], ['', 'Impressum']], alternates: ALT('/imprint/', '/de/impressum/') }));
write('/de/datenschutz/', page({ lang: 'de', path: '/de/datenschutz/', title: 'Datenschutzerklärung – Salzburg in Harmony', desc: 'Wie www.salzburginharmony.com mit Daten umgeht: Hosting bei World4You, Kontaktformular, Google Analytics nur mit Zustimmung, Google AdSense, Browser-Speicher.', body: LEGAL.privacyDe(), crumbs: [['/de/', 'Start'], ['', 'Datenschutz']], alternates: ALT('/privacy/', '/de/datenschutz/') }));
write('/de/kontakt/', page({ lang: 'de', path: '/de/kontakt/', title: 'Kontakt – Salzburg in Harmony', desc: 'So erreichst du AdStern zu den Salzburg-Spaziergängen: Korrekturen, Bildnachweise, Presse – per Kontaktformular, E-Mail oder Telefon, mit voller Anschrift.', body: LEGAL.contactDe(), crumbs: [['/de/', 'Start'], ['', 'Kontakt']], alternates: ALT('/contact/', '/de/kontakt/') }));

// ---------- static files ----------
fs.writeFileSync(path.join(DOCS, 'ads.txt'), 'google.com, pub-7811071715414905, DIRECT, f08c47fec0942fa0\n');
fs.writeFileSync(path.join(DOCS, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const alternatesOf = (u) => { const pair = [['/', '/de/'], ['/tours/', '/de/touren/'], ['/hosts/', '/de/gastgeber/'], ['/about/', '/de/ueber/'], ['/imprint/', '/de/impressum/'], ['/privacy/', '/de/datenschutz/'], ['/contact/', '/de/kontakt/']].find((p) => p.includes(u)); return pair ? [['en', pair[0]], ['de', pair[1]], ['x-default', pair[0]]] : []; };
fs.writeFileSync(path.join(DOCS, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${BUILD_DATE}</lastmod>${alternatesOf(u).map(([l, p]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${p}"/>`).join('')}</url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DOCS, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#F7F1E6"/><path d="M6 27c4-6 7-9 10-9s5 4 8 4 5-5 10-7v12H6z" fill="#23402F"/><path d="M14 18l3-6 3 6z" fill="#B4612A"/><path d="M15 12h4v3h-4z" fill="#B4612A"/><circle cx="29" cy="11" r="3.2" fill="#CDA349"/></svg>`);
// Apache rules for /html/salzburg (no .htaccess exists there yet; see UPLOAD-MANIFEST.txt)
fs.writeFileSync(path.join(DOCS, '.htaccess'), HTACCESS);

// ---------- BILDER.md: every picture slot, with status ----------
const rows = [];
for (const t of tours) {
  rows.push({ file: t.hero.file, use: `${t.title} – Titelbild`, alt: t.hero.alt });
  for (const s of t.stations) rows.push({ file: s.img ? s.img.file : '', use: `${t.short} – Station: ${s.title}`, alt: s.img ? s.img.alt : '' });
}
const missing = rows.filter((r) => !imgExists(r.file));
const md = `# Bilder für salzburginharmony.com\n\nStand: ${BUILD_DATE}. Wird vom Build erzeugt. Ein Bild erscheint nur, wenn die Datei unter \`docs/assets/img/tours/<pfad>\` liegt UND in \`src/content/credits.mjs\` (und BILDNACHWEISE.md) einen Lizenznachweis hat. Fehlt eines davon, wird die Station ohne Bild gestaltet – kein Platzhalter.\nFormat: JPG, Qualität ~80, Titelbild 1600 px breit, Stationen 1200×800.\n\n## Vorhanden (${rows.length - missing.length})\n\n| Datei | Verwendung | Alt-Text (EN) |\n|---|---|---|\n${rows.filter((r) => imgExists(r.file)).map((r) => `| \`${r.file}\` | ${r.use} | ${r.alt} |`).join('\n')}\n\n## Fehlt (${missing.length}) – Seite wird ohne Bild gezeigt\n\n| Datei (vorgesehen) | Verwendung | Motiv |\n|---|---|---|\n${missing.map((r) => `| \`${r.file}\` | ${r.use} | ${r.alt} |`).join('\n')}\n\nRegeln: nur lizenzierte Fotos mit Nachweis (Urheber, Lizenz, Quelle, Abrufdatum); keine Bilder fremder Websites ohne Lizenz; keine erfundenen Fotos und keine KI-Fotos realer Orte; keine Motive, die auf einen bekannten Film oder eine bekannte Familie anspielen; Avatare nur die beiden KI-Porträts \`anton.png\`/\`dora.png\`.\n`;
fs.writeFileSync(path.join(ROOT, 'BILDER.md'), md);

// ---------- UPLOAD-MANIFEST.txt ----------
const files = [];
(function walk(d, rel = '') { for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) { const r = rel ? rel + '/' + e.name : e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else files.push(r); } })(DOCS);
const upload = files;
for (const f of upload) if (/(^|\/)(index\.php|traffic[^/]*\.php)$/.test(f) || (/\.htaccess$/.test(f) && f !== '.htaccess')) throw new Error('forbidden file in upload package: ' + f);
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(DOCS, f))).digest('hex');
const manifest = `UPLOAD-MANIFEST – www.salzburginharmony.com – Build ${BUILD_DATE}
Erzeugt von src/build.mjs. Quelle: Ordner docs/ dieses Repos (inkl. der versteckten Datei docs/.htaccess). Ziel: World4You-Webspace /html/salzburg (Document Root von www.salzburginharmony.com).
Upload SELEKTIV: nur die unten gelisteten Dateien hochladen bzw. überschreiben. Nichts löschen, kein Spiegeln/Synchronisieren.
Auf dem Server bleiben unangetastet: traffic.php, traffic-config.php, traffic-data.php, /html/.htaccess (übergeordneter Ordner) und alle anderen dort liegenden Dateien.
/html/salzburg/.htaccess existiert laut Hosting-Prüfung (24.11.2026) noch nicht und wird mit docs/.htaccess neu angelegt. Sie ersetzt für diesen Ordner die RewriteRules aus /html/.htaccess (Apache-Standard); RewriteOptions wird nicht gesetzt.
Überschrieben werden auf dem Server: index.html, robots.txt, sitemap.xml, ads.txt (Inhalt gleich), 404.html falls vorhanden.

== 1. Hochzuladende Dateien (${upload.length}) ==
Pfad relativ zu docs/ -> Zielpfad | SHA-256 | Bytes
${upload.map((f) => `${f} -> /html/salzburg/${f} | ${sha(f)} | ${fs.statSync(path.join(DOCS, f)).size}`).join('\n')}

== 2. Alte Live-Dateien, die durch Regeln in .htaccess überdeckt werden (NICHT löschen) ==
${LEGACY.map((l) => `/${l.from} -> ${l.code}${l.to ? ' ' + l.to : ''}`).join('\n')}

== 3. Legacy-Mapping alte URL -> neue URL (Anker bleiben beim Browser erhalten) ==
${LEGACY.filter((l) => l.to).map((l) => `https://www.salzburginharmony.com/${l.from} -> https://www.salzburginharmony.com${l.to}${l.why ? '   # ' + l.why : ''}`).join('\n')}
${LEGACY.filter((l) => l.anchors).map((l) => l.anchors.map((a) => `https://www.salzburginharmony.com/${l.from}${a[0]} -> https://www.salzburginharmony.com${l.to}${a[0]}   # ${a[1]}`).join('\n')).join('\n')}
`;
fs.writeFileSync(path.join(ROOT, 'UPLOAD-MANIFEST.txt'), manifest);

// ---------- report ----------
const counts = tours.map((t) => `${t.slug}: ${words(t.intro + t.before + t.stations.map((s) => s.body + s.anton + s.dora + s.task).join(' ') + t.after)} words`);
console.log(`built ${urls.length} sitemap pages (+ 404)\n` + counts.join('\n') + `\npictures: ${rows.length - missing.length} of ${rows.length} slots have a licensed photo; ${missing.length} are designed without one\nupload files: ${upload.length}`);
