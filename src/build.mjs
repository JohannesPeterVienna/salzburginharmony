// Build: src/ → docs/. Node 22, no dependencies.
// SHOP_LIVE=true SHOP_CHECKOUT_URL=https://… node src/build.mjs  publishes the shop page (otherwise noindex, unlinked).
import fs from 'node:fs';
import path from 'node:path';
import { page, adBox, sketch, esc, SITE, BUILD_DATE, words } from './layout.mjs';
import * as EN from './pages/en.mjs';
import * as DE from './pages/de.mjs';
import * as HI from './pages/hi.mjs';
import { TOUR_UI } from './i18n/tour.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOCS = path.join(ROOT, 'docs');
const SHOP_LIVE = process.env.SHOP_LIVE === 'true' && /^https:\/\//.test(process.env.SHOP_CHECKOUT_URL || '');
const SHOP_URL = process.env.SHOP_CHECKOUT_URL || '';

const tourFiles = fs.readdirSync(path.join(ROOT, 'src/content/en')).filter((f) => f.endsWith('.mjs')).sort();
const ORDER = ['mirabell-to-fortress', 'hellbrunn', 'nonnberg', 'leopoldskron', 'getreidegasse', 'kapuzinerberg', 'untersberg', 'winter-salzburg'];
const tours = (await Promise.all(tourFiles.map((f) => import(path.join(ROOT, 'src/content/en', f)).then((m) => m.default)))).sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
const hiTours = (await import(path.join(ROOT, 'src/content/hi/mirabell-to-fortress.mjs'))).default;

const imgExists = (file) => fs.existsSync(path.join(DOCS, 'assets/img/tours', file));
const picture = (img, cls = 'pic') => imgExists(img.file)
  ? `<span class="${cls}"><img src="/assets/img/tours/${img.file}" alt="${esc(img.alt)}" loading="lazy" width="900" height="600"></span>`
  : `<span class="${cls}"><span class="ph">${esc(img.alt)}</span></span>`;

const urls = [];   // sitemap entries {loc, lastmod}
function write(rel, html, { sitemap = true, lastmod = BUILD_DATE } = {}) {
  const out = rel.endsWith('.html') ? rel : path.join(rel, 'index.html');
  const f = path.join(DOCS, out);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
  if (sitemap) urls.push({ loc: rel.endsWith('.html') ? '/' + rel : rel, lastmod });
}

// ---------- tour page (any language; `t` is the tour content, `L` the language labels) ----------
function tourPage(t, lang, L, pathPrefix, alternates, extra = {}) {
  const toursUrl = lang === 'en' ? '/tours/' : lang === 'de' ? '/de/touren/' : '/tours/';
  const data = { slug: t.slug, title: t.title, stations: t.stations.map((s) => ({ id: s.id, title: s.title, where: s.where, minutes: s.minutes, body: s.body, alois: s.alois, theresa: s.theresa, task: s.task })) };
  const ads = !extra.noindex;
  const stations = t.stations.map((s, i) => `<section class="station" id="station-${i + 1}" aria-labelledby="st-${i + 1}">
<header><span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3 id="st-${i + 1}">${s.title}</h3></header>
<p class="where">${s.where} · ${L.about} ${s.minutes} ${L.min}</p>
<figure>${picture(s.img)}<figcaption>${esc(s.img.alt)}${imgExists(s.img.file) ? '' : ' – ' + L.photo_pending}</figcaption></figure>
${s.body}
<div class="say alois"><img src="/assets/img/alois-160.png" alt="" width="56" height="56" loading="lazy"><div><b>Alois ${L.says}</b><p>${s.alois}</p></div></div>
<div class="say theresa"><img src="/assets/img/theresa-160.png" alt="" width="56" height="56" loading="lazy"><div><b>Theresa ${L.says}</b><p>${s.theresa}</p></div></div>
<div class="task"><b>${L.look}</b><p>${s.task}</p></div>
${i === 3 && ads ? adBox('inline', lang) : ''}
</section>`).join('\n');
  const body = `
<div class="tour-head"><div><span class="kicker">${t.kicker}</span><h1>${t.title}</h1><p class="lede">${t.desc}</p></div>${picture(t.hero, 'tour-pic')}</div>
${extra.draftNote || ''}
<div class="facts"><div><b>${L.duration}</b>${t.facts.duration}</div><div><b>${L.length}</b>${t.facts.length}</div><div><b>${L.start}</b>${t.facts.start}</div><div><b>${L.cost}</b>${t.facts.cost}</div></div>
${t.intro}
<section class="panel" aria-labelledby="start-h"><h2 id="start-h">${L.walk_with}</h2>
<p class="small">${L.hosts_note}</p>
<div class="hostpick"><label><input type="radio" name="host" value="alois" checked><img src="/assets/img/alois-160.png" alt="" width="48" height="48"><span>Alois<small>${L.alois_short}</small></span></label><label><input type="radio" name="host" value="theresa"><img src="/assets/img/theresa-160.png" alt="" width="48" height="48"><span>Theresa<small>${L.theresa_short}</small></span></label></div>
<p class="row"><button type="button" class="btn" id="tour-start">${L.start_walk}</button><a class="btn ghost" id="tour-plan-add" href="${L.planner_url}" role="button">${L.add_plan}</a><button type="button" class="btn ghost" onclick="window.print()">${L.print}</button></p>
<p class="small muted">${L.progress_note}</p></section>
<div id="tourmode" class="tourmode" aria-live="polite"></div>
<h2>${L.before}</h2>${t.before}
<h2>${L.route}</h2>${sketch(t.sketch.points, t.sketch.backdrop, '', lang)}
${ads ? adBox('top', lang) : ''}
<h2>${L.stops_h} (${t.stations.length})</h2>
${stations}
${t.after}
${ads ? adBox('bottom', lang) : ''}
<h2>${L.sources}</h2><ul class="src">${t.sources.map((s) => `<li><a href="${s.url}" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul>
<p class="reviewed">${L.checked} ${L.date}.</p>
<script id="tour-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: L.home, item: SITE + (lang === 'en' ? '/' : `/${lang}/`) }, { '@type': 'ListItem', position: 2, name: L.walks, item: SITE + toursUrl }, { '@type': 'ListItem', position: 3, name: t.title, item: SITE + pathPrefix + t.slug + '/' }] },
    { '@type': 'Article', headline: t.title, description: t.desc, inLanguage: lang, datePublished: BUILD_DATE, dateModified: BUILD_DATE, author: { '@type': 'Organization', name: 'AdStern' }, publisher: { '@type': 'Organization', name: 'AdStern' }, mainEntityOfPage: SITE + pathPrefix + t.slug + '/' },
    { '@type': 'ItemList', name: t.title, itemListOrder: 'https://schema.org/ItemListOrderAscending', numberOfItems: t.stations.length, itemListElement: t.stations.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title })) }
  ] };
  return page({ lang, path: pathPrefix + t.slug + '/', title: `${t.title} – Salzburg in Harmony`, desc: t.desc, body, ads, googleOff: !!extra.noindex, noindex: !!extra.noindex, crumbs: [[lang === 'en' ? '/' : `/${lang}/`, L.home], [toursUrl, L.walks], ['', t.short]], alternates, ld, ogType: 'article', image: imgExists(t.hero.file) ? `/assets/img/tours/${t.hero.file}` : undefined });
}

const plannerData = JSON.stringify({ tours: tours.map((t) => ({ slug: t.slug, title: t.short, url: `/tours/${t.slug}/`, stations: t.stations.map((s) => ({ id: s.id, title: s.title, minutes: s.minutes })) })) }).replace(/</g, '\\u003c');
const plannerDataDe = JSON.stringify({ tours: tours.map((t) => ({ slug: t.slug, title: t.short, url: `/tours/${t.slug}/`, stations: t.stations.map((s) => ({ id: s.id, title: s.title, minutes: s.minutes })) })) }).replace(/</g, '\\u003c');

// ---------- English ----------
const EN_ALT = (p, dp, hp) => [['en', p], ['de', dp]].concat(hp ? [['hi', hp]] : []);
write('/', page({ lang: 'en', path: '/', title: 'Salzburg in Harmony – self-guided walks with Alois and Theresa', desc: 'Eight self-guided walks through Salzburg, Austria, told stop by stop by two fictional hosts: Mirabell, the fortress, Hellbrunn, Nonnberg, Kapuzinerberg and more.', hero: EN.hero(tours), body: EN.home(tours, imgExists), ads: true, alternates: EN_ALT('/', '/de/', '/hi/'), ld: { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Salzburg in Harmony', url: SITE + '/', inLanguage: 'en', publisher: { '@type': 'Organization', name: 'AdStern' } } }));
write('/tours/', page({ lang: 'en', path: '/tours/', title: 'All walks – Salzburg in Harmony', desc: 'The eight self-guided Salzburg walks in a sensible order, with what to take first, how long each takes and how the practical boxes are checked.', body: EN.toursIndex(tours, imgExists), ads: true, crumbs: [['/', 'Home'], ['', 'Walks']], alternates: EN_ALT('/tours/', '/de/touren/') }));
for (const t of tours) write(`/tours/${t.slug}/`, tourPage(t, 'en', TOUR_UI.en, '/tours/', t.slug === 'mirabell-to-fortress' ? [['en', '/tours/mirabell-to-fortress/']] : undefined));
write('/planner/', page({ lang: 'en', path: '/planner/', title: 'Day planner – Salzburg in Harmony', desc: 'Pick stops from the eight Salzburg walks, set minutes and a buffer, and get a schedule to copy, download or print. Stored in your browser only.', body: EN.planner(tours) + `<script id="planner-data" type="application/json">${plannerData}</script>`, ads: true, crumbs: [['/', 'Home'], ['', 'Day planner']], alternates: EN_ALT('/planner/', '/de/planer/') }));
write('/hosts/', page({ lang: 'en', path: '/hosts/', title: 'Alois and Theresa, the hosts – Salzburg in Harmony', desc: 'Who Alois and Theresa are: two fictional, AI-generated Salzburg hosts, how they were made, what they know and what they are not.', body: EN.hosts(), ads: true, crumbs: [['/', 'Home'], ['', 'Hosts']], alternates: EN_ALT('/hosts/', '/de/gastgeber/') }));
write('/about/', page({ lang: 'en', path: '/about/', title: 'About the site – Salzburg in Harmony', desc: 'What Salzburg in Harmony offers, how facts are checked and dated, the limits of the walks, image credits, advertising and who makes the site.', body: EN.about(), ads: true, crumbs: [['/', 'Home'], ['', 'About']], alternates: EN_ALT('/about/', '/de/ueber/') }));
write('/imprint/', page({ lang: 'en', path: '/imprint/', title: 'Imprint – Salzburg in Harmony', desc: 'Legal notice for www.salzburginharmony.com: publisher AdStern, Vienna, business details, editorial line and the note on fictional AI hosts.', body: EN.imprint(), googleOff: true, crumbs: [['/', 'Home'], ['', 'Imprint']], alternates: EN_ALT('/imprint/', '/de/impressum/') }));
write('/privacy/', page({ lang: 'en', path: '/privacy/', title: 'Privacy policy – Salzburg in Harmony', desc: 'How www.salzburginharmony.com handles data: hosting, local storage for walks and plans, Google AdSense, Google Analytics after consent, the statistics window and your rights.', body: EN.privacy(), googleOff: true, crumbs: [['/', 'Home'], ['', 'Privacy']], alternates: EN_ALT('/privacy/', '/de/datenschutz/') }));
write('/contact/', page({ lang: 'en', path: '/contact/', title: 'Contact – Salzburg in Harmony', desc: 'How to reach AdStern about the Salzburg walks: corrections, image credits, press and advertising, by email, with no contact form by design.', body: EN.contact(), googleOff: true, crumbs: [['/', 'Home'], ['', 'Contact']], alternates: EN_ALT('/contact/', '/de/kontakt/') }));
write('/shop/', page({ lang: 'en', path: '/shop/', title: 'Salzburg Walks Pack – Salzburg in Harmony', desc: 'All eight Salzburg walks as a printable offline pack with route sketches, dated practical boxes and blank day plans. One-time purchase.', body: EN.shop(SHOP_LIVE, SHOP_URL), googleOff: true, noindex: !SHOP_LIVE, crumbs: [['/', 'Home'], ['', 'Shop']] }), { sitemap: SHOP_LIVE });
write('404.html', page({ lang: 'en', path: '/404.html', title: 'Page not found – Salzburg in Harmony', desc: 'This page does not exist on Salzburg in Harmony. The address may have changed; all eight Salzburg walks are listed on one page, with the day planner next to it.', body: EN.notFound(), googleOff: true, noindex: true }), { sitemap: false });

// ---------- German core pages ----------
write('/de/', page({ lang: 'de', path: '/de/', title: 'Salzburg in Harmony – Spaziergänge mit Alois und Theresa', desc: 'Acht selbst geführte Spaziergänge durch Salzburg, Station für Station erzählt von zwei fiktiven Gastgebern: Mirabell, Festung, Hellbrunn, Nonnberg, Kapuzinerberg und mehr.', hero: DE.hero(), body: DE.home(tours, imgExists), ads: true, alternates: EN_ALT('/', '/de/', '/hi/') }));
write('/de/touren/', page({ lang: 'de', path: '/de/touren/', title: 'Alle Spaziergänge – Salzburg in Harmony', desc: 'Die acht Salzburg-Spaziergänge in sinnvoller Reihenfolge, mit Dauer, Schwierigkeit und dem Hinweis, dass die Stationstexte derzeit auf Englisch vorliegen.', body: DE.toursIndex(tours, imgExists), ads: true, crumbs: [['/de/', 'Start'], ['', 'Spaziergänge']], alternates: EN_ALT('/tours/', '/de/touren/') }));
write('/de/planer/', page({ lang: 'de', path: '/de/planer/', title: 'Tagesplaner – Salzburg in Harmony', desc: 'Stationen aus den acht Salzburg-Spaziergängen auswählen, Minuten und Puffer setzen, Zeitplan kopieren, herunterladen oder drucken. Bleibt im Browser.', body: DE.planner() + `<script id="planner-data" type="application/json">${plannerDataDe}</script>`, ads: true, crumbs: [['/de/', 'Start'], ['', 'Tagesplaner']], alternates: EN_ALT('/planner/', '/de/planer/') }));
write('/de/gastgeber/', page({ lang: 'de', path: '/de/gastgeber/', title: 'Alois und Theresa, die Gastgeber – Salzburg in Harmony', desc: 'Wer Alois und Theresa sind: zwei fiktive, KI-generierte Salzburger Gastgeber, wie sie entstanden sind, was sie wissen und was sie nicht sind.', body: DE.hosts(), ads: true, crumbs: [['/de/', 'Start'], ['', 'Gastgeber']], alternates: EN_ALT('/hosts/', '/de/gastgeber/') }));
write('/de/ueber/', page({ lang: 'de', path: '/de/ueber/', title: 'Über die Website – Salzburg in Harmony', desc: 'Was Salzburg in Harmony bietet, wie Fakten geprüft und datiert werden, die Grenzen der Spaziergänge, Bildnachweise, Werbung und wer die Seite macht.', body: DE.about(), ads: true, crumbs: [['/de/', 'Start'], ['', 'Über']], alternates: EN_ALT('/about/', '/de/ueber/') }));
write('/de/impressum/', page({ lang: 'de', path: '/de/impressum/', title: 'Impressum – Salzburg in Harmony', desc: 'Impressum von www.salzburginharmony.com: Medieninhaber AdStern, Wien, Unternehmensangaben, grundlegende Richtung und Hinweis auf fiktive KI-Gastgeber.', body: DE.imprint(), googleOff: true, crumbs: [['/de/', 'Start'], ['', 'Impressum']], alternates: EN_ALT('/imprint/', '/de/impressum/') }));
write('/de/datenschutz/', page({ lang: 'de', path: '/de/datenschutz/', title: 'Datenschutzerklärung – Salzburg in Harmony', desc: 'Wie www.salzburginharmony.com mit Daten umgeht: Hosting, lokaler Speicher, Google AdSense, Google Analytics nur nach Einwilligung, Statistik-Fenster und deine Rechte.', body: DE.privacy(), googleOff: true, crumbs: [['/de/', 'Start'], ['', 'Datenschutz']], alternates: EN_ALT('/privacy/', '/de/datenschutz/') }));
write('/de/kontakt/', page({ lang: 'de', path: '/de/kontakt/', title: 'Kontakt – Salzburg in Harmony', desc: 'So erreichst du AdStern zu den Salzburg-Spaziergängen: Korrekturen, Bildnachweise, Presse und Werbung – per E-Mail, bewusst ohne Kontaktformular.', body: DE.contact(), googleOff: true, crumbs: [['/de/', 'Start'], ['', 'Kontakt']], alternates: EN_ALT('/contact/', '/de/kontakt/') }));

// ---------- Hindi draft: home + one walk (noindex until reviewed by a native speaker) ----------
write('/hi/', page({ lang: 'hi', path: '/hi/', title: 'Salzburg in Harmony – अलोइस और थेरेसा के साथ साल्ज़बर्ग की सैर', desc: 'साल्ज़बर्ग, ऑस्ट्रिया की आठ स्व-निर्देशित सैर: मिराबेल, किला, हेलब्रुन, नॉनबर्ग, लियोपोल्ड्सक्रोन, गेट्राइडेगासे, कापुत्सीनरबर्ग, उन्टर्सबर्ग और सर्दियों के बाज़ार।', hero: HI.hero(), body: HI.home(tours, imgExists), ads: false, googleOff: true, noindex: true, alternates: EN_ALT('/', '/de/', '/hi/') }), { sitemap: false });
write('/hi/tours/mirabell-to-fortress/', tourPage(hiTours, 'hi', TOUR_UI.hi, '/hi/tours/', undefined, { noindex: true, draftNote: HI.draftNote() }), { sitemap: false });

// ---------- static files ----------
fs.writeFileSync(path.join(DOCS, 'CNAME'), 'www.salzburginharmony.com');
fs.writeFileSync(path.join(DOCS, 'ads.txt'), 'google.com, pub-7811071715414905, DIRECT, f08c47fec0942fa0\n');
fs.writeFileSync(path.join(DOCS, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /shop/\nDisallow: /hi/\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(DOCS, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DOCS, '.nojekyll'), '');
fs.writeFileSync(path.join(DOCS, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#F7F1E6"/><path d="M6 27c4-6 7-9 10-9s5 4 8 4 5-5 10-7v12H6z" fill="#23402F"/><path d="M14 18l3-6 3 6z" fill="#B4612A"/><path d="M15 12h4v3h-4z" fill="#B4612A"/><circle cx="29" cy="11" r="3.2" fill="#CDA349"/></svg>`);

// ---------- BILDER.md: every image the pages reference, with alt text and status ----------
const rows = [];
for (const t of tours) {
  rows.push({ file: t.hero.file, alt: t.hero.alt, use: `${t.title} – hero (16:9, ≥1600 px wide)` });
  for (const s of t.stations) rows.push({ file: s.img.file, alt: s.img.alt, use: `${t.short} – stop: ${s.title} (3:2, ≥1200 px wide)` });
}
const md = `# Bilder für salzburginharmony.com\n\nStand: ${BUILD_DATE}. Dateien nach \`docs/assets/img/tours/<pfad>\` legen; der Build setzt sie automatisch ein (vorher Platzhalter mit Alt-Text). Jedes Bild braucht einen Nachweis (Lizenz/Quelle oder „KI-generiert“) in \`docs/assets/img/tours/NACHWEISE.md\`.\nFormat: JPG, Qualität ~80, hero 1600×900, Stationen 1200×800, OG-Bild 1200×630 (\`docs/assets/img/og-salzburg-in-harmony.png\`).\n\n| Datei | Verwendung | Alt-Text (EN) | Status |\n|---|---|---|---|\n${rows.map((r) => `| \`${r.file}\` | ${r.use} | ${r.alt} | ${imgExists(r.file) ? 'vorhanden' : 'fehlt'} |`).join('\n')}\n| \`og-salzburg-in-harmony.png\` (in \`assets/img/\`) | Open-Graph-Bild aller Seiten | Alois und Theresa vor der Salzburger Altstadt, Schriftzug Salzburg in Harmony | ${fs.existsSync(path.join(DOCS, 'assets/img/og-salzburg-in-harmony.png')) ? 'vorhanden' : 'fehlt'} |\n\nRegeln: keine Bilder von salzburg.info oder anderen fremden Seiten ohne Lizenz; keine Motive, die auf den bekannten Film oder die bekannte Familie anspielen (keine Filmszenen nachstellen, keine Kostüme aus dem Film); Avatare nur die beiden KI-Porträts \`alois.png\`/\`theresa.png\`.\n`;
fs.writeFileSync(path.join(ROOT, 'BILDER.md'), md);

// ---------- report ----------
const counts = tours.map((t) => `${t.slug}: ${words(t.intro + t.before + t.stations.map((s) => s.body + s.alois + s.theresa + s.task).join(' ') + t.after)} words`);
console.log(`built ${urls.length} sitemap pages (+ shop ${SHOP_LIVE ? 'live' : 'hidden'}, 404, hi drafts)\n` + counts.join('\n') + `\nimages missing: ${rows.filter((r) => !imgExists(r.file)).length} of ${rows.length}`);
