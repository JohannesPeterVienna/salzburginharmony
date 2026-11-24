// Legal notice, privacy policy and contact page (English and German).
// Basis: the live texts of 23 November 2026 in ../content/legal-live.mjs, kept word for word. Deviations (all listed in
// DEVIATIONS below and in the report): the editorial line (it named a family and a film that may not be named), the
// privacy link inside the contact form (new address of the privacy page), the terms of use (written for the former
// preview), and two supplements to the privacy policy for functions the live page did not have (AdSense, local storage).
import { LIVE } from '../content/legal-live.mjs';

export const DEVIATIONS = [
  'Editorial line (§ 25 MedienG) rewritten without the names of a family and a film',
  'Contact form: privacy link /privacy.html → /privacy/ (EN) or /de/datenschutz/ (DE); everything else unchanged',
  'Terms of use: written for the former free preview; points 1–3 and 6 adapted to the finished website, 4 and 5 unchanged',
  'Privacy: supplements of 24 November 2026 on Google AdSense with Google’s consent platform and on browser storage',
  'Privacy: the bilingual privacy.html is split into /privacy/ (English parts) and /de/datenschutz/ (German parts)'
];

const form = (lang) => LIVE[`${lang}_form`].replace('<a href="/privacy.html">', `<a href="${lang === 'de' ? '/de/datenschutz/' : '/privacy/'}">`);
const ANALYTICS_LINK = '<p><a href="/#analytics-settings">Analytics-Einstellungen / Analytics settings</a></p>';

// ---------------- English ----------------
export const imprintEn = () => `
<span class="kicker">Legal</span>
<h1>${LIVE.en_summary_imprint}</h1>
<h2>${LIVE.en_h_owner}</h2>
${LIVE.en_owner}
${LIVE.en_reach}
<h2>${LIVE.en_h_business}</h2>
${LIVE.en_business}
<h2>${LIVE.en_h_editorial}</h2>
<p>Salzburg in Harmony publishes self-guided walks through Salzburg, Austria, with background on the history of the places, practical information for visitors and two fictional hosts.</p>
<h2 id="contact-form">${LIVE.en_h_form}</h2>
${form('en')}
<h2 id="terms">Terms of use</h2>
<p><strong>Terms of use of this website · 24 November 2026</strong><br>1. The provider is Johannes Peter, trading as AdStern – Agentur für digitales Marketing; see the legal notice for address and contact details. These terms concern this freely accessible website only.<br>2. No paid guides, apps, downloads or tours are offered here. Visiting creates no payment obligation or subscription.<br>3. Hosts are fictional AI-generated designs. Texts are written with AI assistance and checked; AI-generated images are labelled as such. No audio or video tours are offered.<br>4. Content may be viewed for personal information. Uses permitted by law remain unaffected; other commercial reuse requires appropriate permission. No exclusive rights that do not exist are claimed in purely AI-generated elements.<br>5. Information does not guarantee access, opening hours or safe passage at any location. Local notices and property rules must be followed. These terms do not restrict statutory liability or mandatory consumer rights.<br>6. The website may evolve. Before any future paid order, specific services, prices, technical requirements, usage rights and consumer information including withdrawal will be provided. These terms do not replace sales terms.</p>
<h2>Image credits</h2>
<p>Photographs and their licences are listed on the <a href="/about/#image-credits">About page</a>.</p>`;

export const privacyEn = () => `
<span class="kicker">Privacy</span>
<h1>Privacy policy</h1>
<p>Version of 23 October 2026, supplemented on 24 November 2026 with the sections “Advertising with Google AdSense” and “Data stored in your browser”. <a href="/de/datenschutz/" hreflang="de" lang="de">Deutsche Fassung</a>.</p>
<h2>Controller</h2>
${LIVE.privacy_controller}
<section><h2>${LIVE.en_h_hosting}</h2>
<p>${LIVE.en_privacy_form}</p>
<p>${LIVE.en_privacy_text}</p>
${LIVE.en_counter}</section>
<section id="google-analytics">${ANALYTICS_LINK}${LIVE.en_ga}</section>
<section id="advertising"><h2>Advertising with Google AdSense</h2>
<p><i>Supplement of 24 November 2026.</i> The content pages of this website (home page, walks, walk overview, day planner, hosts page and About) can show advertising from Google AdSense, a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, and, for users outside the EEA, the UK and Switzerland, Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. The legal notice, this privacy policy, the contact page and the error page load no advertising. AdSense uses cookies and similar technologies to deliver ads, limit how often an ad is shown, measure performance and prevent fraud.</p>
<p>Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet. You can opt out of personalised advertising in <a href="https://adssettings.google.com/" rel="noopener">Google’s Ads Settings</a>, at <a href="https://www.aboutads.info/" rel="noopener">www.aboutads.info</a> or, in Europe, at <a href="https://www.youronlinechoices.eu/" rel="noopener">www.youronlinechoices.eu</a>. How Google uses data from websites that use its services is explained at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
<p>Before any Google script runs, Google Consent Mode is set to “denied” for advertising and analytics storage. Visitors from the European Economic Area, the United Kingdom and Switzerland see a consent message from Google’s certified consent management platform (IAB Transparency &amp; Consent Framework) before cookies or similar technologies that require consent are used for advertising. Personalised ads are shown only with your consent. Non-personalised ads also use cookies or similar identifiers for frequency capping, reporting and fraud prevention and therefore also require consent to storing and accessing information on your device. Without consent, Google can show only limited ads, which do not use cookies or local storage for personalised advertising; Google still processes technical data such as your IP address to deliver them. Legal basis: your consent (Article 6(1)(a) GDPR and Section 165(3) Austrian TKG 2021). You can change or withdraw your advertising choice at any time with effect for the future using “Ad privacy choices (Google)” in the footer of every page; visitors from U.S. states with privacy laws can opt out of the sale or sharing of personal information there. On pages without advertising, Google’s consent script is loaded only when you press that button. Your advertising choice never switches on Google Analytics; the analytics choice described above is separate.</p></section>
<section id="browser-storage"><h2>Data stored in your browser</h2>
<p><i>Supplement of 24 November 2026.</i> Walk mode stores the stop you reached in each walk (key <code>sih-tour-…</code>) and your chosen host (<code>sih-host</code>), and the day planner stores your plan (<code>sih-plan</code>), in your browser’s local storage on your device only. Your analytics decision is stored under <code>tw-analytics-consent-v1</code> as described above. These entries are never sent to us or to third parties; they are needed to provide the functions you use (Section 165(3) TKG 2021). You can delete them with “Clear plan” on the planner page or by deleting this site’s data in your browser settings. If local storage is blocked, the website still works for the page you are on.</p></section>`;

export const contactEn = () => `
<span class="kicker">Contact</span>
<h1>Contact</h1>
<p class="lede">Corrections, questions about a walk, image credits or press enquiries: use the contact form in the legal notice or write to us by email. We read everything and answer within a few working days.</p>
${LIVE.en_owner}
${LIVE.en_reach}
<p class="row"><a class="btn" href="/imprint/#contact-form">Open the contact form</a></p>
<h2>Found a mistake?</h2>
<p>Opening times and prices change at short notice. If a line in a “Before you go” box is wrong, tell us the walk, the stop and what you saw on site or on the operator’s page, and we will correct it and note the date. The same goes for history: if you know a source that contradicts us, send it.</p>
<h2>Places that would like to be mentioned</h2>
<p>We do not take payment for inclusion or for favourable descriptions, and we do not publish advertorials in the walks. Advertising on the site is delivered by Google AdSense and labelled as such.</p>
<h2>Using our texts and images</h2>
<p>The texts are copyright AdStern. Short quotations with a link are welcome; reprinting whole walks is not. Photographs carry their own licences, listed on the <a href="/about/#image-credits">About page</a>; the AI-generated host portraits may not be reused.</p>
<p>What happens to your message is described in the <a href="/privacy/">privacy policy</a>.</p>`;

// ---------------- Deutsch ----------------
export const imprintDe = () => `
<span class="kicker">Rechtliches</span>
<h1>${LIVE.de_summary_imprint}</h1>
<h2>${LIVE.de_h_owner}</h2>
${LIVE.de_owner}
${LIVE.de_reach}
<h2>${LIVE.de_h_business}</h2>
${LIVE.de_business}
<h2>${LIVE.de_h_editorial}</h2>
<p>Salzburg in Harmony veröffentlicht selbst geführte Spaziergänge durch Salzburg mit Hintergründen zur Geschichte der Orte, praktischen Informationen für Besucher und zwei fiktiven Gastgebern.</p>
<h2 id="contact-form">${LIVE.de_h_form}</h2>
${form('de')}
<h2 id="nutzungsbedingungen">Nutzungsbedingungen</h2>
<p><strong>Nutzungsbedingungen dieser Website · Stand 24.11.2026</strong><br>1. Anbieter ist Johannes Peter, tätig unter AdStern – Agentur für digitales Marketing; Kontakt und Anschrift siehe Impressum. Diese Bedingungen betreffen ausschließlich diese frei zugängliche Website.<br>2. Hier werden keine kostenpflichtigen Guides, Apps, Downloads oder Touren angeboten. Durch den Seitenbesuch entsteht keine Zahlungspflicht und kein Abonnement.<br>3. Die Gastgeber sind fiktive, KI-generierte Entwürfe. Texte entstehen mit KI-Unterstützung und werden geprüft; KI-generierte Bilder sind als solche gekennzeichnet. Es werden keine Audio- oder Videotouren angeboten.<br>4. Inhalte dürfen für die persönliche Information betrachtet werden. Gesetzlich erlaubte Nutzungen bleiben unberührt; darüber hinausgehende gewerbliche Weiterverwendung bedarf einer entsprechenden Berechtigung. An rein KI-generierten Bestandteilen werden hierdurch keine nicht bestehenden Ausschließlichkeitsrechte behauptet.<br>5. Informationen sind keine Zusage über Zutritt, Öffnungszeiten oder sichere Begehbarkeit von Orten. Örtliche Hinweise und Hausordnungen sind zu beachten. Gesetzliche Haftung und zwingende Verbraucherrechte werden durch diese Bedingungen nicht eingeschränkt.<br>6. Die Website kann weiterentwickelt werden. Für ein späteres kostenpflichtiges Angebot werden vor Bestellung die konkreten Leistungen, Preise, technischen Voraussetzungen, Nutzungsrechte und Verbraucherinformationen einschließlich Widerruf bereitgestellt. Diese Bedingungen ersetzen keine Verkaufsbedingungen.</p>
<h2>Bildnachweise</h2>
<p>Fotos und ihre Lizenzen stehen auf der Seite <a href="/de/ueber/#bildnachweise">Über die Website</a>.</p>`;

export const privacyDe = () => `
<span class="kicker">Datenschutz</span>
<h1>Datenschutzerklärung</h1>
<p>Stand: 23. Oktober 2026; ergänzt am 24. November 2026 um die Abschnitte „Werbung mit Google AdSense“ und „Daten in deinem Browser“. <a href="/privacy/" hreflang="en" lang="en">English version</a>.</p>
<h2>Verantwortlicher</h2>
${LIVE.privacy_controller}
<section><h2>${LIVE.de_h_hosting}</h2>
<p>${LIVE.de_privacy_form}</p>
<p>${LIVE.de_privacy_text}</p>
${LIVE.de_counter}</section>
<section id="google-analytics">${ANALYTICS_LINK}${LIVE.de_ga}</section>
<section id="werbung"><h2>Werbung mit Google AdSense</h2>
<p><i>Ergänzung vom 24. November 2026.</i> Die Inhaltsseiten dieser Website (Startseite, Spaziergänge, Übersicht, Tagesplaner, Gastgeberseite und „Über“) können Werbung von Google AdSense zeigen, einem Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, und für Nutzer außerhalb des EWR, des Vereinigten Königreichs und der Schweiz der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Impressum, diese Datenschutzerklärung, die Kontaktseite und die Fehlerseite laden keine Werbung. AdSense verwendet Cookies und ähnliche Technologien, um Anzeigen auszuliefern, die Häufigkeit zu begrenzen, die Leistung zu messen und Betrug zu verhindern.</p>
<p>Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage früherer Besuche eines Nutzers auf dieser oder anderen Websites zu schalten. Die Verwendung von Werbecookies durch Google ermöglicht es Google und seinen Partnern, Nutzern Anzeigen auf Grundlage ihrer Besuche dieser und/oder anderer Websites im Internet zu zeigen. Personalisierte Werbung kannst du in den <a href="https://adssettings.google.com/" rel="noopener">Google-Einstellungen für Werbung</a>, unter <a href="https://www.aboutads.info/" rel="noopener">www.aboutads.info</a> oder in Europa unter <a href="https://www.youronlinechoices.eu/" rel="noopener">www.youronlinechoices.eu</a> deaktivieren. Wie Google Daten von Websites verwendet, die seine Dienste nutzen, steht unter <a href="https://policies.google.com/technologies/partner-sites?hl=de" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
<p>Bevor ein Google-Skript läuft, steht der Google Consent Mode für Werbe- und Analysespeicher auf „abgelehnt“. Besucher aus dem EWR, dem Vereinigten Königreich und der Schweiz sehen eine Einwilligungsmeldung von Googles zertifizierter Einwilligungsplattform (IAB Transparency &amp; Consent Framework), bevor einwilligungspflichtige Cookies oder ähnliche Technologien für Werbung eingesetzt werden. Personalisierte Werbung erscheint nur mit deiner Einwilligung. Auch nicht personalisierte Anzeigen verwenden Cookies oder ähnliche Kennungen zur Häufigkeitsbegrenzung, für Berichte und zur Betrugsvermeidung und brauchen daher ebenfalls die Einwilligung zum Speichern und Auslesen von Informationen auf deinem Gerät. Ohne Einwilligung kann Google nur eingeschränkte Anzeigen zeigen, die keine Cookies oder lokalen Speicher für personalisierte Werbung nutzen; technische Daten wie deine IP-Adresse verarbeitet Google zur Auslieferung trotzdem. Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 165 Abs. 3 TKG 2021). Du kannst deine Werbe-Entscheidung jederzeit mit Wirkung für die Zukunft über „Werbe-Datenschutz (Google)“ im Fuß jeder Seite ändern oder widerrufen; Besucher aus US-Bundesstaaten mit Datenschutzgesetzen können dort dem Verkauf oder der Weitergabe personenbezogener Daten widersprechen. Auf Seiten ohne Werbung wird Googles Einwilligungsskript erst geladen, wenn du diese Schaltfläche drückst. Deine Werbe-Entscheidung schaltet Google Analytics nie ein; die oben beschriebene Analytics-Wahl ist davon getrennt.</p></section>
<section id="browser-speicher"><h2>Daten in deinem Browser</h2>
<p><i>Ergänzung vom 24. November 2026.</i> Der Spaziergang-Modus speichert die erreichte Station je Spaziergang (Schlüssel <code>sih-tour-…</code>) und deinen gewählten Gastgeber (<code>sih-host</code>), der Tagesplaner deinen Plan (<code>sih-plan</code>), im lokalen Speicher deines Browsers, nur auf deinem Gerät. Deine Analytics-Entscheidung liegt wie oben beschrieben unter <code>tw-analytics-consent-v1</code>. Diese Einträge werden nie an uns oder Dritte gesendet; sie sind nötig, um die von dir genutzten Funktionen bereitzustellen (§ 165 Abs. 3 TKG 2021). Löschen kannst du sie mit „Clear plan“ auf der Planerseite oder durch Löschen der Website-Daten in den Browsereinstellungen. Ist der lokale Speicher gesperrt, funktioniert die Website für die aktuelle Seite trotzdem.</p></section>`;

export const contactDe = () => `
<span class="kicker">Kontakt</span>
<h1>Kontakt</h1>
<p class="lede">Korrekturen, Fragen zu einem Spaziergang, Bildnachweise oder Presseanfragen: Nutze das Kontaktformular im Impressum oder schreib uns per E-Mail. Wir lesen alles und antworten innerhalb weniger Werktage.</p>
${LIVE.de_owner}
${LIVE.de_reach}
<p class="row"><a class="btn" href="/de/impressum/#contact-form">Zum Kontaktformular</a></p>
<h2>Fehler gefunden?</h2>
<p>Öffnungszeiten und Preise ändern sich kurzfristig. Stimmt eine Zeile in einem Kasten „Before you go“ nicht, nenn uns Spaziergang, Station und was du vor Ort oder auf der Betreiberseite gesehen hast; wir korrigieren und vermerken das Datum. Dasselbe gilt für Geschichte: Kennst du eine Quelle, die uns widerspricht, schick sie.</p>
<h2>Orte, die erwähnt werden möchten</h2>
<p>Wir nehmen kein Geld für Aufnahme oder wohlwollende Beschreibung und veröffentlichen keine Werbetexte in den Spaziergängen. Werbung auf der Website liefert Google AdSense und ist als solche gekennzeichnet.</p>
<h2>Texte und Bilder verwenden</h2>
<p>Die Texte sind urheberrechtlich geschützt (AdStern). Kurze Zitate mit Link sind willkommen; ganze Spaziergänge nachzudrucken nicht. Fotos tragen ihre eigenen Lizenzen, aufgelistet auf der Seite <a href="/de/ueber/#bildnachweise">Über die Website</a>; die KI-generierten Gastgeberporträts dürfen nicht weiterverwendet werden.</p>
<p>Was mit deiner Nachricht geschieht, steht in der <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>`;
