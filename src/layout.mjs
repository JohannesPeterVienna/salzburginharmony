// Page shell for salzburginharmony.com: head (consent default before any Google script, static AdSense loader
// only on ad pages), header, footer, ad boxes, tour sketch. Written for this site.
import { UI } from './i18n/ui.mjs';

export const SITE = 'https://www.salzburginharmony.com';
export const CLIENT = 'ca-pub-7811071715414905';
export const GA_ID = 'G-T00HRG2YVF';
export const BUILD_DATE = '2026-11-06';
export const V = '20261106b';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const words = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[\p{L}]/u.test(w)).length;

const NAV = {
  en: [['/', 'Home'], ['/tours/', 'Walks'], ['/planner/', 'Day planner'], ['/hosts/', 'Anton & Dora'], ['/about/', 'About']],
  de: [['/de/', 'Start'], ['/de/touren/', 'Spaziergänge'], ['/de/planer/', 'Tagesplaner'], ['/de/gastgeber/', 'Anton & Dora'], ['/de/ueber/', 'Über']],
  hi: [['/hi/', 'होम'], ['/tours/', 'Walks (EN)'], ['/planner/', 'Day planner (EN)'], ['/about/', 'About (EN)']]
};
const LEGAL = {
  en: { imprint: '/imprint/', privacy: '/privacy/', contact: '/contact/', about: '/about/', hosts: '/hosts/' },
  de: { imprint: '/de/impressum/', privacy: '/de/datenschutz/', contact: '/de/kontakt/', about: '/de/ueber/', hosts: '/de/gastgeber/' },
  hi: { imprint: '/imprint/', privacy: '/privacy/', contact: '/contact/', about: '/about/', hosts: '/hosts/' }
};
const LANGS = [['en', 'English', '/'], ['de', 'Deutsch', '/de/'], ['hi', 'हिन्दी', '/hi/']];

export const logo = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#F7F1E6"/><path d="M6 27c4-6 7-9 10-9s5 4 8 4 5-5 10-7v12H6z" fill="#23402F"/><path d="M14 18l3-6 3 6z" fill="#B4612A"/><path d="M15 12h4v3h-4z" fill="#B4612A"/><circle cx="29" cy="11" r="3.2" fill="#CDA349"/></svg>`;

export function adBox(slot, lang = 'en') {
  return `<div class="ad" data-slot="${slot}" hidden><span class="ad-label">${UI[lang].ad_label}</span></div>`;
}

// schematic route sketch: points {x,y,label} on a 600×300 canvas, optional backdrop shapes (svg string)
export function sketch(points, backdrop = '', caption = '', lang = 'en') {
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
  const dots = points.map((p, i) => `<g><circle class="s-dot" cx="${p.x}" cy="${p.y}" r="11"/><text class="s-num" x="${p.x}" y="${p.y + 4}">${i + 1}</text><text class="s-label" x="${p.x + (p.lx ?? 14)}" y="${p.y + (p.ly ?? 4)}"${p.anchor ? ` text-anchor="${p.anchor}"` : ''}>${esc(p.label)}</text></g>`).join('');
  return `<figure class="sketch"><svg viewBox="0 0 600 300" role="img" aria-label="${esc(UI[lang].sketch_aria)}">${backdrop}<path class="s-path" d="${path}"/>${dots}</svg><figcaption>${esc(caption || UI[lang].sketch_caption)}</figcaption></figure>`;
}

export function page(o) {
  const lang = o.lang || 'en';
  const ui = UI[lang];
  const url = SITE + o.path;
  const ads = !!o.ads;
  const googleOff = !!o.googleOff;
  const noindex = !!o.noindex;
  const legal = LEGAL[lang];
  const alternates = (o.alternates || []).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE}${p}">`).join('\n');
  const xdefault = o.alternates && o.alternates.length ? `<link rel="alternate" hreflang="x-default" href="${SITE}${o.alternates.find((a) => a[0] === 'en')?.[1] || o.path}">` : '';
  const ld = o.ld ? `<script type="application/ld+json">${JSON.stringify(o.ld)}</script>` : '';
  const crumbs = o.crumbs ? `<nav class="crumbs" aria-label="${esc(ui.breadcrumb)}">${o.crumbs.map(([href, label], i, a) => i === a.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a> › `).join('')}</nav>` : '';
  const nav = NAV[lang].map(([href, label]) => `<li><a href="${href}"${href === o.path ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  const langLinks = LANGS.map(([l, label, home]) => { const target = (o.alternates || []).find((a) => a[0] === l)?.[1] || home; return `<a href="${target}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ''}>${label}</a>`; }).join('');
  const side = ads ? `<aside class="side" aria-label="${esc(ui.ad_label)}">${adBox('side', lang)}</aside>` : '';
  return `<!doctype html>
<html lang="${lang}" data-ads="${ads ? 'yes' : 'no'}"${googleOff ? ' data-google="off"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<meta name="google-adsense-account" content="${CLIENT}">
${alternates}${xdefault ? '\n' + xdefault : ''}
<meta property="og:type" content="${o.ogType || 'website'}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${o.image || '/assets/img/og-salzburg-in-harmony.png'}">
<meta property="og:site_name" content="Salzburg in Harmony">
<meta property="og:locale" content="${{ en: 'en_US', de: 'de_AT', hi: 'hi_IN' }[lang]}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#23402F">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/css/harmony.css?v=${V}">
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);window['ga-disable-${GA_ID}']=true;</script>
${googleOff ? '' : `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}" crossorigin="anonymous"></script>\n`}${ld ? ld + '\n' : ''}<script id="sih-ui" type="application/json">${JSON.stringify(ui.runtime)}</script>
<script src="/assets/js/consent.js?v=${V}" defer></script>
<script src="/assets/js/planner.js?v=${V}" defer></script>
<script src="/assets/js/harmony.js?v=${V}" defer></script>
</head>
<body>
<a class="skip" href="#main">${esc(ui.skip)}</a>
<header class="top"><div class="wrap"><a class="brand" href="${NAV[lang][0][0]}">${logo}<span>Salzburg in Harmony<small>${esc(ui.tagline)}</small></span></a><nav class="main" aria-label="${esc(ui.main_nav)}"><ul>${nav}</ul></nav><div class="lang" aria-label="${esc(ui.language)}">${langLinks}</div></div></header>
<main id="main">${o.hero || ''}<div class="wrap">${crumbs}<div class="page"><div class="content">
${o.body}
</div>${side}</div></div></main>
<footer class="foot"><div class="wrap"><div class="cols">
<div><h4>Salzburg in Harmony</h4><p>${esc(ui.footer_about)}</p><p class="small">${ui.footer_ai}</p></div>
<div><h4>${esc(ui.footer_explore)}</h4><ul>${NAV[lang].slice(1).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}<li><a href="${legal.hosts}">${esc(ui.footer_hosts)}</a></li></ul></div>
<div><h4>${esc(ui.footer_legal)}</h4><ul><li><a href="${legal.imprint}">${esc(ui.imprint)}</a></li><li><a href="${legal.privacy}">${esc(ui.privacy)}</a></li><li><a href="${legal.contact}">${esc(ui.contact)}</a></li><li><button type="button" class="linklike" data-privacy-settings>${esc(ui.privacy_settings)}</button></li></ul></div>
</div><p class="fine">© <span id="year">2026</span> AdStern, Vienna · ${esc(ui.footer_fine)}</p></div></footer>
</body>
</html>
`;
}
