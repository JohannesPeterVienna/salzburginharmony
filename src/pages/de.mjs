// Deutsche Seiten. Die Spaziergänge selbst (Stationstexte, Spaziergang-Modus, Tagesplaner) gibt es nur auf Englisch;
// die deutschen Seiten sagen das offen und verlinken mit hreflang="en".
import { esc } from '../layout.mjs';

export const hero = () => `<section class="hero"><div class="wrap"><div class="hero-card">
<div><span class="kicker">Selbst geführte Spaziergänge · Salzburg</span>
<h1>Salzburg zu Fuß, mit Anton und Dora.</h1>
<p class="lede">Acht Spaziergänge durch Gärten, Plätze, Hügel und Märkte Salzburgs, Station für Station erzählt von zwei fiktiven Gastgebern, die die Stadt kennen. Kostenlos lesbar, ohne App, ohne Anmeldung. Gastgeber wählen, starten, und der Spaziergang kommt am Handy mit.</p>
<p class="row"><a class="btn" href="/de/touren/">Spaziergang wählen</a><a class="btn ghost" href="/planner/" hreflang="en">Tagesplaner (englisch)</a></p>
<p class="small muted">Anton und Dora sind KI-generierte, fiktive Figuren, keine echten Fremdenführer. Öffnungszeiten und Preise tragen auf jedem Spaziergang das Datum unserer Prüfung.</p></div>
<div class="hosts"><div class="host"><img src="/assets/img/anton.png" alt="Anton, fiktiver Gastgeber: älterer Mann mit grauem Bart, grünem Filzhut und Trachtenweste" width="230" height="230"><b>Anton</b><span>Geschichte, Wege, Aussichten</span></div><div class="host"><img src="/assets/img/dora.png" alt="Dora, fiktive Gastgeberin: Frau mit geflochtenem blondem Haar in rotem Trachtenmieder" width="230" height="230"><b>Dora</b><span>Gärten, Küche, Feste</span></div></div>
</div></div></section>`;

const card = (t, imgExists) => {
  const n = Object.keys(DE_META).indexOf(t.slug) + 1;
  const pic = imgExists(t.hero.file) ? `<span class="pic"><img src="/assets/img/tours/${t.hero.file}" alt="${esc(t.hero.alt)}" loading="lazy" width="640" height="360"></span>` : `<span class="pic sign" aria-hidden="true"><span>${n}</span><b>${esc(DE_META[t.slug].kurz)}</b></span>`;
  return `<li><a class="card" href="/tours/${t.slug}/" hreflang="en">${pic}<span class="body"><span class="meta">${t.stations.length} Stationen · ${DE_META[t.slug].dauer} · Text englisch</span><h3>${DE_META[t.slug].titel}</h3><p>${DE_META[t.slug].text}</p></span></a></li>`;
};
const DE_META = {
  'mirabell-to-fortress': { kurz: 'Mirabell und Festung', titel: 'Von Schloss Mirabell zur Festung', dauer: '3–4 Std.', text: 'Die klassische Linie: Mirabellgarten, Salzach, Mozartplatz, Residenzplatz, Dom, Kapitelplatz und hinauf auf die Festung Hohensalzburg.' },
  hellbrunn: { kurz: 'Hellbrunn', titel: 'Hellbrunn: das Wasserschloss im Süden', dauer: '4 Std.', text: 'Hellbrunner Allee, Schloss, Wasserspiele, Park und der Hügel mit Steintheater und Monatsschlössl; Saison 28. März bis 1. November 2026.' },
  nonnberg: { kurz: 'Nonnberg', titel: 'Nonnberg: das älteste Kloster und der stille Hügel', dauer: '1,5 Std.', text: 'Über die Nonnbergstiege zum Stift Nonnberg (gegründet um 714), Kirche, Aussicht nach Süden und hinunter durch Nonntal.' },
  leopoldskron: { kurz: 'Leopoldskron', titel: 'Leopoldskron: ein Schloss über das Wasser gesehen', dauer: '1,5–2 Std.', text: 'Flacher Weg von Nonntal zum Leopoldskroner Weiher, Schloss und Festung im Blick, hinaus ins Moos. Das Schloss selbst ist nicht öffentlich.' },
  getreidegasse: { kurz: 'Getreidegasse', titel: 'Getreidegasse und die Gassen der Altstadt', dauer: '2–2,5 Std.', text: 'Alter Markt, Zunftzeichen, Mozarts Geburtshaus, Durchhäuser, Grünmarkt, Petersfriedhof und die Stiftsbäckerei am Wasserrad.' },
  kapuzinerberg: { kurz: 'Kapuzinerberg', titel: 'Kapuzinerberg: der grüne Hügel über dem Fluss', dauer: '2–2,5 Std.', text: 'Linzergasse, Kreuzweg, Kapuzinerkloster, Hettwer-Bastei, Basteiweg, Franziskischlössl und hinunter durch die Steingasse.' },
  untersberg: { kurz: 'Untersberg', titel: 'Untersberg: Salzburgs Berg mit der Seilbahn', dauer: '5 Std.', text: 'Bus nach Grödig, Seilbahn auf 1.776 m, Gipfelweg zum Salzburger Hochthron, Sagen und Marmor; mit Revisionszeiten 2026/27.' },
  'winter-salzburg': { kurz: 'Winter in Salzburg', titel: 'Winter in Salzburg: Märkte, Lichter, klare Tage', dauer: '3 Std.', text: 'Christkindlmarkt auf Dom- und Residenzplatz (19.11.2026–1.1.2027), Eislaufen am Mozartplatz, Festung im Advent, Hellbrunner Hof – und was geschlossen ist.' }
};

export const home = (tours, imgExists) => `
<h2 id="walks">Die acht Spaziergänge</h2>
<p class="lede">Jeder Spaziergang ist eine Seite zum Lesen zu Hause und ein Modus zum Mitgehen vor Ort, eine Station nach der anderen, mit einem Wort des Gastgebers, einer Beobachtungsaufgabe und einem „Weiter“. Fortschritt und Tagesplan bleiben in deinem Browser; nichts wird an uns gesendet.</p>
<div class="note">Die Spaziergänge selbst – Stationstexte, Spaziergang-Modus und Tagesplaner – sind auf Englisch geschrieben. Auf Deutsch findest du hier die Übersicht, die Gastgeber, die Seite über die Website und alle Rechtstexte.</div>
<ul class="cards">${tours.map((t) => card(t, imgExists)).join('')}</ul>
<section class="two">
<div><h2>So funktioniert ein Spaziergang</h2>
<ol>
<li><b>Zuerst lesen.</b> Jeder Spaziergang hat eine Einleitung, einen Kasten mit geprüften Öffnungszeiten und Preisen samt Prüfdatum, eine Skizze des Weges und sechs bis acht Stationen, deren Text ohne Skript lesbar ist.</li>
<li><b>Gastgeber wählen.</b> Anton erzählt von den Erzbischöfen, den Mauern und den Aussichten; Dora von Gärten, Küche und dem, was die Leute hier zu jeder Jahreszeit tun. Beide sind erfundene Figuren mit echtem Wissen über die Stadt.</li>
<li><b>Starten.</b> Der Modus zeigt eine Station nach der anderen mit Fortschrittsbalken, Bemerkung des Gastgebers und einer kleinen Beobachtungsaufgabe. Er merkt sich, wo du stehen geblieben bist. Drucken oder als Text sichern geht jederzeit.</li>
<li><b>Den Tag planen.</b> Der <a href="/planner/" hreflang="en">Tagesplaner</a> (englisch) addiert die Minuten an den Stationen und gibt dir einen Zeitplan zum Kopieren oder Drucken. Gehzeiten und Wartezeiten rechnet er nicht, und er sagt das auch.</li>
</ol></div>
<div><h2>Warum diese Spaziergänge</h2>
<p>Salzburg ist klein, barock und um einen Fluss und drei Hügel gebaut; eine Stadt für Fußgänger. Die meisten Besucher sehen dieselben Plätze in Eile und verpassen das Stift über den Dächern, die Mauern auf dem Hügel gegenüber, den Weiher im Süden und den Markt, auf dem die Salzburger ihren Käse kaufen. Diese Spaziergänge bringen die berühmten und die stillen Orte in die Reihenfolge, die ein Salzburger wählen würde.</p>
<p>Alles Sachliche auf dieser Website ist gegen die am Ende jedes Spaziergangs genannten offiziellen Quellen geprüft, mit dem Datum der Prüfung. Wo wir einen Preis oder eine Öffnungszeit nicht prüfen konnten, sagen wir das und verweisen auf den Betreiber. Wo ein Ort privat ist, wie Leopoldskron, bleiben wir draußen. Mehr dazu <a href="/de/ueber/">über die Website</a>.</p></div>
</section>
<h2>Was diese Website ist und was nicht</h2>
<p>Salzburg in Harmony ist ein unabhängiges Projekt von AdStern, einer kleinen Agentur in Wien. Sie ist nicht mit der Stadt Salzburg, Tourismus Salzburg oder einer Sehenswürdigkeit verbunden und verkauft weder Tickets noch Führungen. Sie trägt gekennzeichnete Werbung von Google AdSense, die die Arbeit bezahlt; die Spaziergänge sind kostenlos lesbar. Die Gastgeber sind KI-generierte Figuren, die Texte entstehen mit KI-Unterstützung und werden von einem Menschen geprüft; siehe die <a href="/de/gastgeber/">Gastgeberseite</a> und die <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const toursIndex = (tours, imgExists) => `
<span class="kicker">Die Spaziergänge</span>
<h1>Acht Spaziergänge durch Salzburg</h1>
<p class="lede">In der Reihenfolge, die wir für einen ersten Besuch vorschlagen. Jeder ist in sich geschlossen; die praktischen Hinweise am Ende sagen, welche sich verbinden lassen. Zeiten sind großzügige Schätzungen für langsames Gehen mit Pausen, keine Fahrpläne.</p>
<div class="note">Die Stationstexte der Spaziergänge sind auf Englisch geschrieben. Die Karten und Links führen zur englischen Seite des jeweiligen Spaziergangs.</div>
<ul class="cards">${tours.map((t) => card(t, imgExists)).join('')}</ul>
<h2>Welcher zuerst?</h2>
<table><thead><tr><th>Wenn du hast</th><th>Nimm</th><th>Warum</th></tr></thead><tbody>
<tr><td>Einen Vormittag</td><td><a href="/tours/mirabell-to-fortress/">Mirabell bis zur Festung</a></td><td>Garten, Fluss, die drei Plätze und die Burg in der Reihenfolge, in der sie gesehen werden sollten.</td></tr>
<tr><td>Einen zweiten Tag</td><td><a href="/tours/kapuzinerberg/">Kapuzinerberg</a> + <a href="/tours/getreidegasse/">Getreidegasse</a></td><td>Morgens der Blick auf die Altstadt von gegenüber, danach die Gassen und der Markt.</td></tr>
<tr><td>Einen ruhigen Nachmittag</td><td><a href="/tours/nonnberg/">Nonnberg</a> → <a href="/tours/leopoldskron/">Leopoldskron</a></td><td>Stufen zu einem Stift, dann ein flacher Weg zu einem Weiher unter der Festung; die beiden schließen aneinander an.</td></tr>
<tr><td>Einen halben Tag außerhalb</td><td><a href="/tours/hellbrunn/">Hellbrunn</a></td><td>Wasserspiele und Park, April bis Anfang November.</td></tr>
<tr><td>Einen klaren Tag</td><td><a href="/tours/untersberg/">Untersberg</a></td><td>Seilbahn auf 1.776 m und Gipfelweg; zuerst die Revisionszeiten prüfen.</td></tr>
<tr><td>Dezember</td><td><a href="/tours/winter-salzburg/">Winter in Salzburg</a></td><td>Märkte, Eislaufplatz, Festung im Advent und eine ehrliche Liste dessen, was geschlossen ist.</td></tr>
</tbody></table>
<h2>Die Kästen „Vor dem Weg“ lesen</h2>
<p>Jeder Spaziergang beginnt mit einem Kasten mit Öffnungszeiten, Saison, Preisen und Sperren. Sie stammen von den offiziellen Seiten von Tourismus Salzburg (salzburg.info) oder vom Betreiber; jede Zeile nennt Quelle und Prüfdatum, meist mit dem Standdatum des Betreibers. Alles kann sich kurzfristig ändern; wenn eine Zeile für deinen Tag zählt, öffne den Quelllink und schau am Morgen noch einmal nach. Wo wir einen Preis nicht prüfen konnten, drucken wir keinen.</p>
<p>Entfernungen und Dauer sind eigene Schätzungen für langsames Gehen mit Pausen. Stufen und Steigungen beschreiben wir in Worten; keiner der Hügelwege ist stufenlos, und wir sagen, welche Teile es sind.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const hosts = () => `
<span class="kicker">Die Gastgeber</span>
<h1>Anton und Dora</h1>
<p class="lede">Zwei erfundene Salzburger, die mit dir gehen. Sie sind keine echten Personen, keine Fremdenführer mit Befugnis und keine Fotos von irgendjemandem; sie sind KI-generierte Figuren mit gleichbleibendem Gesicht, eigener Stimme und eigenen Interessen, geschaffen für diese Website, damit die Spaziergänge einen Ton haben statt einer Broschüre.</p>
<div class="two">
<div><img src="/assets/img/anton.png" alt="Anton, fiktiver Gastgeber" width="400" height="400" style="border-radius:50%;max-width:260px"><h2>Anton</h2>
<p>Ein älterer Mann mit grauem Bart, grünem Filzhut mit Federbüschel und Lodenweste. Anton erzählt von den Fürsterzbischöfen, den Mauern, den Hügeln und den Aussichten. Er zieht den Fußweg der Festungsbahn vor, beginnt früh und hat zu jedem Platz eine Meinung. Er ist der, der dir sagt, dass für den Residenzplatz 55 Häuser abgerissen wurden, dass die Festung nie eingenommen wurde und dass der Untersberg die Stadt gebaut hat.</p></div>
<div><img src="/assets/img/dora.png" alt="Dora, fiktive Gastgeberin" width="400" height="400" style="border-radius:50%;max-width:260px"><h2>Dora</h2>
<p>Eine Frau mit geflochtenem blondem Haar im roten Mieder der Salzburger Tracht. Dora kennt die Gärten, die Märkte, die Bäckerei mit dem Wasserrad und das, was die Salzburger zu jeder Jahreszeit tun. Sie sagt dir, wo du dich hinsetzt, was du isst, wann das Licht stimmt und wann das Handy in die Tasche gehört. Sie führt den Hellbrunn- und den Winterspaziergang.</p></div>
</div>
<h2>Wie sie entstanden sind</h2>
<p>Die Porträts wurden mit einem Bildmodell aus einer schriftlichen Beschreibung erzeugt und von uns zugeschnitten; sie zeigen keine realen Personen. Ihre Kleidung ist die Tracht der Region Salzburg, wie sie das Volkskundemuseum in Hellbrunn zeigt, gewählt, weil Besucher sie erwarten und weil die Leute hier sie bei Festen tatsächlich tragen. Ihre Bemerkungen auf jedem Spaziergang schreiben wir mit KI-Unterstützung und prüfen die Fakten gegen die auf jeder Seite genannten Quellen; die Meinungen sind absichtlich ihre, nicht unsere, und du darfst Anton in der Frage Festungsbahn widersprechen.</p>
<h2>Was sie nicht sind</h2>
<p>Sie sprechen nicht, bewegen sich nicht und beantworten keine Fragen; es gibt keinen Chat. Sie vertreten weder Tourismus Salzburg noch die Stadt Salzburg noch eine Sehenswürdigkeit. Sie beruhen auf keiner realen Person, keiner historischen Figur und keiner Figur aus einem Buch, Film oder Stück, und die Spaziergänge erzählen keine solche Geschichte nach; sie beschreiben reale Orte mit ihrer realen Geschichte und überlassen den Rest dir.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const about = (tours, CREDITS, imgExists) => `
<span class="kicker">Über</span>
<h1>Über Salzburg in Harmony</h1>
<p class="lede">Eine unabhängige Sammlung selbst geführter Spaziergänge durch Salzburg, gemacht von AdStern, einer kleinen Agentur in Wien, für Besucher, die die Stadt verstehen wollen statt sie abzuhaken.</p>
<h2>Was die Website bietet</h2>
<p>Acht englischsprachige Spaziergänge, jeder mit Einleitung, datiertem Kasten praktischer Fakten, Wegskizze, Hinweisen zur Barrierefreiheit, sechs bis acht Stationen mit Text, einer Bemerkung eines der beiden fiktiven Gastgeber und einer Beobachtungsaufgabe, einem Modus, der dich Station für Station führt, und einem Tagesplaner, der die Zeit an den Stationen addiert. Alles ist kostenlos lesbar und funktioniert ohne Konto. Wo ein Ort ein Ticket braucht, sagen wir es; wir verkaufen keine Tickets, Führungen oder sonst etwas im Namen der beschriebenen Orte.</p>
<h2>Quellen und Prüfung</h2>
<p>Öffnungszeiten, Saisonzeiten, Preise und Sperren stammen von den offiziellen Seiten von Tourismus Salzburg (salzburg.info), den Seiten der Betreiber (etwa des Christkindlmarkts) und, für Hintergrund, aus Wikipedia und den veröffentlichten Geschichten der Orte. Jeder Spaziergang nennt seine Quellen mit Links, und jede praktische Zeile trägt das Datum unserer Prüfung und, wo die Quelle eines nennt, deren Standdatum. Alle wurden am 6. November 2026 geprüft und werden vor jeder Saison erneut geprüft. Konnten wir eine Zahl nicht bestätigen, drucken wir sie nicht. Findest du einen Fehler, schreib an office@adstern.com; wir korrigieren rasch und vermerken das Datum.</p>
<p>Die Ortsbeschreibungen sind in eigenen Worten aus Besuchen, den genannten Quellen und Standardwerken geschrieben. Beobachtungsaufgaben und die Bemerkungen der Gastgeber sind unsere eigenen. Die Texte entstehen mit KI-Unterstützung und werden vor der Veröffentlichung von einem Menschen redigiert und geprüft; die Gastgeber sind KI-generierte Figuren, was überall, wo sie auftreten, gesagt wird.</p>
<h2>Grenzen</h2>
<p>Das ist keine Karte und keine Navigation. Die Wegskizzen sind schematisch; nutze einen Stadtplan oder die Wegweiser. Dauerangaben sind Schätzungen für langsames Gehen. Nichts hier garantiert Zugang, Öffnung oder Sicherheit; beachte Hinweise vor Ort, die Regeln jedes Ortes und das eigene Urteil auf den Hügeln und am Berg. Private Grundstücke beschreiben wir nur von außen, und wir bitten, das zu respektieren.</p>
<h2 id="bildnachweise">Fotos und Bildnachweise</h2>
<p>Die Fotos auf den Spaziergängen sind lizenzierte Bilder von Wikimedia Commons; jedes trägt seinen Nachweis in der Bildunterschrift, und alle sind unten mit Urheber, Lizenz und Quelle aufgeführt. Wir verwenden keine Bilder von den Websites der Sehenswürdigkeiten, keine KI-Bilder realer Orte und keine Bilder von Personen ohne deren Zustimmung. Gibt es von einer Station kein lizenziertes Foto, steht sie ohne Bild da, und die Wegskizze zeigt, wo sie liegt. Die Porträts von Anton und Dora sind von uns KI-generiert und zeigen keine realen Personen.</p>
<ul class="src">${Object.entries(CREDITS).filter(([f]) => imgExists(f)).map(([f, c]) => `<li>${esc(c.title)} – ${esc(c.author)}, <a href="${c.licenseUrl}" rel="noopener license">${esc(c.license)}</a>, <a href="${c.source}" rel="noopener">Wikimedia Commons</a>, abgerufen ${c.accessed.split('-').reverse().join('.')}. Verwendet bei: ${esc(tours.find((t) => f.startsWith(t.slug + '/')).short)}.</li>`).join('')}</ul>
<h2>Werbung und Geld</h2>
<p>Die Website zeigt Werbung über Google AdSense auf Inhaltsseiten, unterhalb des Inhalts und gekennzeichnet mit „Werbung“, nie auf Impressum, Datenschutz, Kontakt oder Fehlerseite. Die Spaziergänge sind kostenlos lesbar; hier wird nichts verkauft. Wir haben keine geschäftliche Beziehung zu einem beschriebenen Ort, und kein Ort hat für Aufnahme oder wohlwollende Beschreibung bezahlt.</p>
<h2>Wer</h2>
<p>AdStern – Agentur für digitales Marketing, Johannes Peter, Seilerstätte 8, 1010 Wien, Österreich, office@adstern.com. Alle Angaben im <a href="/de/impressum/">Impressum</a>; Datenschutz in der <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;
