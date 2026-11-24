// Addresses of the former preview site (live until the relaunch) and the Apache rules that send them to the new pages.
// docs/.htaccess for /html/salzburg (World4You), where no .htaccess exists yet. The rules touch only the file names
// listed here; index.php, traffic.php, traffic-config.php and traffic-data.php are never matched.
export const LEGACY = [
  { from: 'en.html', code: 301, to: '/', why: 'English start page; /en.html#imprint lands on the footer block id="imprint"', anchors: [['#imprint', 'Rücksprung des Kontaktformular-Handlers (language=en)']] },
  { from: 'de.html', code: 301, to: '/de/', why: 'German start page; /de.html#imprint lands on the footer block id="imprint"', anchors: [['#imprint', 'Rücksprung des Kontaktformular-Handlers (language=de)']] },
  { from: 'hi.html', code: 301, to: '/', why: 'Hindi copy removed; English start page' },
  { from: 'zh.html', code: 301, to: '/', why: 'Chinese copy removed; English start page' },
  { from: 'package-en.html', code: 301, to: '/tours/', why: 'the planned paid guide described stations of a Salzburg walk; the free walks replace it' },
  { from: 'package-hi.html', code: 301, to: '/tours/', why: 'as package-en.html (no Hindi pages any more)' },
  { from: 'package-zh.html', code: 301, to: '/tours/', why: 'as package-en.html (no Chinese pages any more)' },
  { from: 'package-de.html', code: 301, to: '/de/touren/', why: 'German overview of the walks' },
  { from: 'guide-en.html', code: 301, to: '/tours/', why: 'the free reading guide of five places is replaced by the eight walks' },
  { from: 'guide-hi.html', code: 301, to: '/tours/', why: 'as guide-en.html' },
  { from: 'guide-zh.html', code: 301, to: '/tours/', why: 'as guide-en.html' },
  { from: 'guide-de.html', code: 301, to: '/de/touren/', why: 'German overview of the walks' },
  { from: 'werbung.html', code: 301, to: '/', why: 'advertising media page removed' },
  { from: 'privacy.html', code: 301, to: '/privacy/', why: 'bilingual privacy page; anchors #google-analytics and #google-analytics-en exist on /privacy/ and /de/datenschutz/', anchors: [['#google-analytics', 'Analytics-Abschnitt']] },
  { from: 'datenschutz.html', code: 301, to: '/de/datenschutz/', why: 'German privacy policy' },
  { from: 'impressum.html', code: 301, to: '/imprint/', why: 'legal notice (German version: /de/impressum/)' },
  { from: 'imprint.html', code: 301, to: '/imprint/', why: 'legal notice' },
  { from: 'programmatic.js', code: 410 }, { from: 'programmatic-config.js', code: 410 }, { from: 'gam-adapter.js', code: 410 },
  { from: 'portfolio-analytics.js', code: 410 }, { from: 'ad-preview.js', code: 410 }, { from: 'ads.css', code: 410 },
  { from: 'guide-plan.css', code: 410 }, { from: 'guide-plan.js', code: 410 }, { from: 'avatars.png', code: 410 }
];

const reEsc = (s) => s.replace(/[.\-]/g, (m) => '\\' + m);
const redirects = LEGACY.filter((l) => l.code === 301).map((l) => `RewriteRule ^${reEsc(l.from)}$ ${l.to}? [R=301,L]`).join('\n');
const gone = LEGACY.filter((l) => l.code === 410).map((l) => reEsc(l.from)).join('|');

export const HTACCESS = `# ==== salzburginharmony.com – relaunch 2026-11-24 ====
# Vollständige .htaccess für /html/salzburg (Document Root von www.salzburginharmony.com, World4You).
# Stand 24.11.2026: in /html/salzburg liegt laut Hosting-Prüfung keine .htaccess und keine index.php; diese Datei
# wird dort neu angelegt. Die Regeln treffen nur die unten genannten alten Dateinamen, "index.html"-Adressen und
# Verzeichnisse mit index.html. traffic.php, traffic-config.php und traffic-data.php werden von keiner Regel
# umgeleitet, blockiert oder mit Kopfzeilen versehen (Kopfzeilen nur für .html/.css/.js/.svg/.png/.jpg/.txt/.xml).
# RewriteOptions wird nicht verändert. Hinweis: Eine .htaccess mit "RewriteEngine On" in diesem Ordner ersetzt
# für Adressen dieses Ordners die RewriteRules aus /html/.htaccess (Apache-Standard ohne RewriteOptions Inherit).
# DirectoryIndex wird nicht gesetzt (Apache-Standard liefert index.html aus).

<IfModule mod_rewrite.c>
RewriteEngine On

# 1) Alte Adressen der Vorschau-Seite -> neue Seiten (301; ein #Anker bleibt im Browser erhalten)
${redirects}

# 2) Skripte und Dateien der Vorschau, die es nicht mehr gibt -> 410 Gone
RewriteRule ^(${gone})$ - [G,L]

# 3) Doppelte Adressen vermeiden: /pfad/index.html -> /pfad/ (nur bei direktem Aufruf, keine Schleife mit DirectoryIndex)
RewriteCond %{THE_REQUEST} \\s/((?:[A-Za-z0-9_-]+/)*)index\\.html[\\s?]
RewriteRule ^ /%1 [R=301,L]

# 4) Verzeichnisse der neuen Seiten (z. B. /tours/, /de/) mit vorhandener index.html unverändert durchlassen
RewriteCond %{REQUEST_URI} !^/(index\\.php|traffic[^/]*\\.php)$
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^ - [L]
# Verzeichnis ohne Schrägstrich am Ende (z. B. /tours) -> mit Schrägstrich
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^((?:[A-Za-z0-9_-]+/)*[A-Za-z0-9_-]+)$ /$1/ [R=301,L]
</IfModule>

# 5) Fehlerseite
ErrorDocument 404 /404.html

# 6) Zeichensatz, Sicherheits- und Cache-Kopfzeilen nur für die statischen Dateien der Website (nicht für PHP)
AddCharset utf-8 .html .css .js .txt .xml .svg
<IfModule mod_headers.c>
<FilesMatch "\\.(html|css|js|svg|png|jpe?g|txt|xml)$">
Header set X-Content-Type-Options "nosniff"
Header set Referrer-Policy "strict-origin-when-cross-origin"
</FilesMatch>
<FilesMatch "\\.(html|xml|txt)$">
Header set Cache-Control "no-cache"
</FilesMatch>
<FilesMatch "\\.(css|js)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
<FilesMatch "\\.(svg|png|jpe?g)$">
Header set Cache-Control "public, max-age=604800"
</FilesMatch>
</IfModule>
# ==== Ende ====
`;
