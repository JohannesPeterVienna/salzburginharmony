// Deutsche Kernseiten. Die Stationstexte der Spaziergänge liegen derzeit auf Englisch vor; die deutsche Übersicht verweist darauf.
import { adBox } from '../layout.mjs';

export const hero = () => `<section class="hero"><div class="wrap"><div class="hero-card">
<div><span class="kicker">Selbst geführte Spaziergänge · Salzburg</span>
<h1>Salzburg zu Fuß, mit Anton und Dora.</h1>
<p class="lede">Acht Spaziergänge durch Gärten, Plätze, Hügel und Märkte Salzburgs, Station für Station erzählt von zwei fiktiven Gastgebern, die die Stadt kennen. Kostenlos lesbar, ohne App, ohne Anmeldung. Gastgeber wählen, starten, und der Spaziergang kommt am Handy mit.</p>
<p class="row"><a class="btn" href="/de/touren/">Spaziergang wählen</a><a class="btn ghost" href="/de/planer/">Meinen Tag planen</a></p>
<p class="small muted">Anton und Dora sind KI-generierte, fiktive Figuren, keine echten Fremdenführer. Öffnungszeiten und Preise tragen auf jedem Spaziergang das Datum unserer Prüfung.</p></div>
<div class="hosts"><div class="host"><img src="/assets/img/anton.png" alt="Anton, fiktiver Gastgeber: älterer Mann mit grauem Bart, grünem Filzhut und Trachtenweste" width="230" height="230"><b>Anton</b><span>Geschichte, Wege, Aussichten</span></div><div class="host"><img src="/assets/img/dora.png" alt="Dora, fiktive Gastgeberin: Frau mit geflochtenem blondem Haar in rotem Trachtenmieder" width="230" height="230"><b>Dora</b><span>Gärten, Küche, Feste</span></div></div>
</div></div></section>`;

const card = (t, imgExists) => {
  const pic = imgExists(t.hero.file) ? `<img src="/assets/img/tours/${t.hero.file}" alt="${t.hero.alt}" loading="lazy" width="640" height="360">` : `<span class="ph">${t.hero.alt}</span>`;
  return `<li><a class="card" href="/tours/${t.slug}/" hreflang="en"><span class="pic">${pic}</span><span class="body"><span class="meta">${t.stations.length} Stationen · ${DE_META[t.slug].dauer} · Text auf Englisch</span><h3>${DE_META[t.slug].titel}</h3><p>${DE_META[t.slug].text}</p></span></a></li>`;
};
const DE_META = {
  'mirabell-to-fortress': { titel: 'Von Schloss Mirabell zur Festung', dauer: '3–4 Std.', text: 'Die klassische Linie: Mirabellgarten, Salzach, Mozartplatz, Residenzplatz, Dom, Kapitelplatz und hinauf auf die Festung Hohensalzburg.' },
  hellbrunn: { titel: 'Hellbrunn: das Wasserschloss im Süden', dauer: '4 Std.', text: 'Hellbrunner Allee, Schloss, Wasserspiele, Park und der Hügel mit Steintheater und Monatsschlössl; Saison 28. März bis 1. November 2026.' },
  nonnberg: { titel: 'Nonnberg: das älteste Kloster und der stille Hügel', dauer: '1,5 Std.', text: 'Über die Nonnbergstiege zum Stift Nonnberg (gegründet um 714), Kirche, Aussicht nach Süden und hinunter durch Nonntal.' },
  leopoldskron: { titel: 'Leopoldskron: ein Schloss über das Wasser gesehen', dauer: '1,5–2 Std.', text: 'Flacher Weg von Nonntal zum Leopoldskroner Weiher, Schloss und Festung im Blick, hinaus ins Moos. Das Schloss selbst ist nicht öffentlich.' },
  getreidegasse: { titel: 'Getreidegasse und die Gassen der Altstadt', dauer: '2–2,5 Std.', text: 'Alter Markt, Zunftzeichen, Mozarts Geburtshaus, Durchhäuser, Grünmarkt, Petersfriedhof und die Stiftsbäckerei am Wasserrad.' },
  kapuzinerberg: { titel: 'Kapuzinerberg: der grüne Hügel über dem Fluss', dauer: '2–2,5 Std.', text: 'Linzergasse, Kreuzweg, Kapuzinerkloster, Hettwer-Bastei, Basteiweg, Franziskischlössl und hinunter durch die Steingasse.' },
  untersberg: { titel: 'Untersberg: Salzburgs Berg mit der Seilbahn', dauer: '5 Std.', text: 'Bus nach Grödig, Seilbahn auf 1.776 m, Gipfelweg zum Salzburger Hochthron, Sagen und Marmor; mit Revisionszeiten 2026/27.' },
  'winter-salzburg': { titel: 'Winter in Salzburg: Märkte, Lichter, klare Tage', dauer: '3 Std.', text: 'Christkindlmarkt auf Dom- und Residenzplatz (19.11.2026–1.1.2027), Eislaufen am Mozartplatz, Festung im Advent, Hellbrunner Hof – und was geschlossen ist.' }
};

export const home = (tours, imgExists) => `
<h2 id="walks">Die acht Spaziergänge</h2>
<p class="lede">Jeder Spaziergang ist eine Seite zum Lesen zu Hause und ein Modus zum Mitgehen vor Ort, eine Station nach der anderen, mit einem Wort des Gastgebers, einer Beobachtungsaufgabe und einem „Weiter“. Fortschritt und Tagesplan bleiben in deinem Browser; nichts wird an uns gesendet.</p>
<div class="note">Die ausführlichen Stationstexte gibt es derzeit auf Englisch; die deutschen Fassungen folgen Spaziergang für Spaziergang. Die Bedienung, der Planer und alle Rechtsseiten sind auf Deutsch.</div>
<ul class="cards">${tours.map((t) => card(t, imgExists)).join('')}</ul>
${adBox('top', 'de')}
<section class="two">
<div><h2>So funktioniert ein Spaziergang</h2>
<ol>
<li><b>Zuerst lesen.</b> Jeder Spaziergang hat eine Einleitung, einen Kasten mit geprüften Öffnungszeiten und Preisen samt Prüfdatum, eine Skizze des Weges und sechs bis acht Stationen, deren Text ohne Skript lesbar ist.</li>
<li><b>Gastgeber wählen.</b> Anton erzählt von den Erzbischöfen, den Mauern und den Aussichten; Dora von Gärten, Küche und dem, was die Leute hier zu jeder Jahreszeit tun. Beide sind erfundene Figuren mit echtem Wissen über die Stadt.</li>
<li><b>Starten.</b> Der Modus zeigt eine Station nach der anderen mit Fortschrittsbalken, Bemerkung des Gastgebers und einer kleinen Beobachtungsaufgabe. Er merkt sich, wo du stehen geblieben bist. Drucken oder als Text sichern geht jederzeit.</li>
<li><b>Den Tag planen.</b> Der <a href="/de/planer/">Tagesplaner</a> addiert die Minuten an den Stationen und gibt dir einen Zeitplan zum Kopieren oder Drucken. Gehzeiten und Wartezeiten rechnet er nicht, und er sagt das auch.</li>
</ol></div>
<div><h2>Warum diese Spaziergänge</h2>
<p>Salzburg ist klein, barock und um einen Fluss und drei Hügel gebaut; eine Stadt für Fußgänger. Die meisten Besucher sehen dieselben Plätze in Eile und verpassen das Stift über den Dächern, die Mauern auf dem Hügel gegenüber, den Weiher im Süden und den Markt, auf dem die Salzburger ihren Käse kaufen. Diese Spaziergänge bringen die berühmten und die stillen Orte in die Reihenfolge, die ein Salzburger wählen würde.</p>
<p>Alles Sachliche auf dieser Website ist gegen die am Ende jedes Spaziergangs genannten offiziellen Quellen geprüft, mit dem Datum der Prüfung. Wo wir einen Preis oder eine Öffnungszeit nicht prüfen konnten, sagen wir das und verweisen auf den Betreiber. Wo ein Ort privat ist, wie Leopoldskron, bleiben wir draußen. Mehr dazu <a href="/de/ueber/">über die Website</a>.</p></div>
</section>
<h2>Was diese Website ist und was nicht</h2>
<p>Salzburg in Harmony ist ein unabhängiges Projekt von AdStern, einer kleinen Agentur in Wien. Sie ist nicht mit der Stadt Salzburg, Tourismus Salzburg oder einer Sehenswürdigkeit verbunden und verkauft weder Tickets noch Führungen. Sie trägt gekennzeichnete Werbung und könnte künftig einen bezahlten Download der Spaziergänge für unterwegs anbieten; die freien Spaziergänge bleiben frei. Die Gastgeber sind KI-generierte Figuren, die Texte entstehen mit KI-Unterstützung und werden von einem Menschen geprüft; siehe die <a href="/de/gastgeber/">Gastgeberseite</a> und die <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const toursIndex = (tours, imgExists) => `
<span class="kicker">Die Spaziergänge</span>
<h1>Acht Spaziergänge durch Salzburg</h1>
<p class="lede">In der Reihenfolge, die wir für einen ersten Besuch vorschlagen. Jeder ist in sich geschlossen; die praktischen Hinweise am Ende sagen, welche sich verbinden lassen. Zeiten sind großzügige Schätzungen für langsames Gehen mit Pausen, keine Fahrpläne.</p>
<div class="note">Die Stationstexte sind derzeit auf Englisch. Die Karten führen zur englischen Seite; Bedienung und Planer sind auf Deutsch.</div>
<ul class="cards">${tours.map((t) => card(t, imgExists)).join('')}</ul>
${adBox('top', 'de')}
<h2>Welcher zuerst?</h2>
<table><thead><tr><th>Wenn du hast</th><th>Nimm</th><th>Warum</th></tr></thead><tbody>
<tr><td>Einen Vormittag</td><td><a href="/tours/mirabell-to-fortress/">Mirabell bis zur Festung</a></td><td>Garten, Fluss, die drei Plätze und die Burg in der Reihenfolge, in der sie gesehen werden sollten.</td></tr>
<tr><td>Einen zweiten Tag</td><td><a href="/tours/kapuzinerberg/">Kapuzinerberg</a> + <a href="/tours/getreidegasse/">Getreidegasse</a></td><td>Morgens der Blick auf die Altstadt von gegenüber, danach die Gassen und der Markt.</td></tr>
<tr><td>Einen ruhigen Nachmittag</td><td><a href="/tours/nonnberg/">Nonnberg</a> → <a href="/tours/leopoldskron/">Leopoldskron</a></td><td>Stufen zu einem Stift, dann ein flacher Weg um einen Weiher; die beiden schließen aneinander an.</td></tr>
<tr><td>Einen halben Tag außerhalb</td><td><a href="/tours/hellbrunn/">Hellbrunn</a></td><td>Wasserspiele und Park, April bis Anfang November.</td></tr>
<tr><td>Einen klaren Tag</td><td><a href="/tours/untersberg/">Untersberg</a></td><td>Seilbahn auf 1.776 m und Gipfelweg; zuerst die Revisionszeiten prüfen.</td></tr>
<tr><td>Dezember</td><td><a href="/tours/winter-salzburg/">Winter in Salzburg</a></td><td>Märkte, Eislaufplatz, Festung im Advent und eine ehrliche Liste dessen, was geschlossen ist.</td></tr>
</tbody></table>
<h2>Die Kästen „Vor dem Weg“ lesen</h2>
<p>Jeder Spaziergang beginnt mit einem Kasten mit Öffnungszeiten, Saison, Preisen und Sperren. Sie stammen von den offiziellen Seiten von Tourismus Salzburg (salzburg.info) oder vom Betreiber; jede Zeile nennt Quelle und Prüfdatum, meist mit dem Standdatum des Betreibers. Alles kann sich kurzfristig ändern; wenn eine Zeile für deinen Tag zählt, öffne den Quelllink und schau am Morgen noch einmal nach. Wo wir einen Preis nicht prüfen konnten, drucken wir keinen.</p>
<p>Entfernungen und Dauer sind eigene Schätzungen für langsames Gehen mit Pausen. Stufen und Steigungen beschreiben wir in Worten; keiner der Hügelwege ist stufenlos, und wir sagen, welche Teile es sind.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const planner = () => `
<span class="kicker">Tagesplaner</span>
<h1>Plane deinen Salzburg-Tag</h1>
<p class="lede">Wähle Stationen aus den Spaziergängen, lege fest, wie lange du an jeder bleiben willst, gib einen Puffer dazu, und der Planer erstellt einen laufenden Zeitplan zum Kopieren, Herunterladen oder Drucken. Er lebt in deinem Browser; nichts wird irgendwohin gesendet.</p>
<div class="note">Der Planer addiert nur <b>Zeit an den Stationen</b>. Wege zwischen den Stationen, Busse, Warteschlangen, Essen und Öffnungszeiten werden nicht berechnet. Nimm die Summe als Minimum und sieh dir dann die Öffnungszeiten im Kasten „Vor dem Weg“ des jeweiligen Spaziergangs an. Die Stationsnamen erscheinen auf Englisch.</div>
<div id="planner" class="plan-grid">
<div><h2>Stationen</h2><ul class="plan-list" data-plan-list><li class="muted">Der Planer braucht JavaScript. Ohne JavaScript öffne einen Spaziergang und nutze die Druckfunktion des Browsers.</li></ul></div>
<div>
<div class="field"><label for="plan-start">Startzeit (optional)</label><input id="plan-start" type="time" data-start></div>
<div class="field"><label for="plan-buffer">Puffer in Minuten (Pausen, Verlaufen, Kaffee)</label><input id="plan-buffer" type="number" min="0" max="240" step="5" data-buffer value="30"></div>
<div class="plan-out" data-plan-out></div>
<p class="row noprint"><button type="button" class="btn" data-plan-copy>Als Text kopieren</button><button type="button" class="btn ghost" data-plan-download>.txt herunterladen</button><button type="button" class="btn ghost" data-plan-print>Drucken</button><button type="button" class="linklike" data-plan-clear>Plan löschen</button></p>
</div></div>
<h2>Den Planer gut nutzen</h2>
<p>Beginne mit einem Spaziergang, nicht mit dreien. Ein realistischer Salzburg-Tag fasst einen der längeren (Mirabell bis zur Festung, Kapuzinerberg, Getreidegasse) plus einen kurzen (Nonnberg, Leopoldskron) mit einem langen Mittagessen dazwischen, oder einen halben Tag in Hellbrunn oder am Untersberg mit einem ruhigen Abend in der Stadt. Die voreingestellten Minuten je Station sind großzügig; ein Plan mit fünf Stunden an den Stationen ist mit Wegen und Essen ein voller Tag.</p>
<p>Die Reihenfolge zählt. Der Planer lässt dich Stationen nach oben und unten schieben; lege die Aussichtspunkte in die Tagesmitte, wenn das Licht am besten ist, die Märkte und Plätze im Winter nach Einbruch der Dunkelheit, und alles mit letztem Einlass früh genug. Museen und die Festungsräume sind die Stationen, die am häufigsten an Schließzeiten scheitern.</p>
<p>Mit einer Startzeit zeigt der Planer je Station eine Uhrzeit, gerechnet nur aus den Minuten davor. Die Gehzeit rechnest du selbst dazu: in der Altstadt liegen die meisten Stationen fünf bis zehn Minuten auseinander; die Hügel brauchen fünfzehn bis zwanzig Minuten hinauf; Hellbrunn und der Untersberg sind mit dem Bus eine halbe Stunde oder mehr vom Zentrum entfernt.</p>
<h2>Wo dein Plan bleibt</h2>
<p>Auswahl, Minuten, Puffer und Startzeit liegen im lokalen Speicher deines Browsers unter dem Schlüssel <code>sih-plan</code>, nur auf deinem Gerät, bis du sie mit dem Knopf oben löschst oder die Daten dieser Website im Browser entfernst. Wir können sie nicht sehen. Ist der lokale Speicher gesperrt, funktioniert der Plan für die aktuelle Seite und ist danach weg. „Als Text kopieren“ und „.txt herunterladen“ geben dir den Plan als reinen Text; „Drucken“ nutzt den Druckdialog des Browsers, der auch ein PDF speichern kann.</p>
${adBox('bottom', 'de')}
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

export const about = () => `
<span class="kicker">Über</span>
<h1>Über Salzburg in Harmony</h1>
<p class="lede">Eine unabhängige Sammlung selbst geführter Spaziergänge durch Salzburg, gemacht von AdStern, einer kleinen Agentur in Wien, für Besucher, die die Stadt verstehen wollen statt sie abzuhaken.</p>
<h2>Was die Website bietet</h2>
<p>Acht Spaziergänge, jeder mit Einleitung, datiertem Kasten praktischer Fakten, Wegskizze, sechs bis acht Stationen mit Text, einer Bemerkung eines der beiden fiktiven Gastgeber und einer Beobachtungsaufgabe, einem Modus, der dich Station für Station führt, und einem Tagesplaner, der die Zeit an den Stationen addiert. Alles ist kostenlos lesbar und funktioniert ohne Konto. Wo ein Ort ein Ticket braucht, sagen wir es; wir verkaufen keine Tickets, Führungen oder sonst etwas im Namen der beschriebenen Orte.</p>
<h2>Quellen und Prüfung</h2>
<p>Öffnungszeiten, Saisonzeiten, Preise und Sperren stammen von den offiziellen Seiten von Tourismus Salzburg (salzburg.info), den Seiten der Betreiber (etwa des Christkindlmarkts) und, für Hintergrund, aus Wikipedia und den veröffentlichten Geschichten der Orte. Jeder Spaziergang nennt seine Quellen mit Links, und jede praktische Zeile trägt das Datum unserer Prüfung und, wo die Quelle eines nennt, deren Standdatum. Alle wurden am 6. November 2026 geprüft und werden vor jeder Saison erneut geprüft. Konnten wir eine Zahl nicht bestätigen, drucken wir sie nicht. Findest du einen Fehler, schreib an office@adstern.com; wir korrigieren rasch und vermerken das Datum.</p>
<p>Die Ortsbeschreibungen sind in eigenen Worten aus Besuchen, den genannten Quellen und Standardwerken geschrieben. Beobachtungsaufgaben und die Bemerkungen der Gastgeber sind unsere eigenen. Die Texte entstehen mit KI-Unterstützung und werden vor der Veröffentlichung von einem Menschen redigiert und geprüft; die Gastgeber sind KI-generierte Figuren, was überall, wo sie auftreten, gesagt wird.</p>
<h2>Grenzen</h2>
<p>Das ist keine Karte und keine Navigation. Die Wegskizzen sind schematisch; nutze einen Stadtplan oder die Wegweiser. Dauerangaben sind Schätzungen für langsames Gehen. Nichts hier garantiert Zugang, Öffnung oder Sicherheit; beachte Hinweise vor Ort, die Regeln jedes Ortes und das eigene Urteil auf den Hügeln und am Berg. Private Grundstücke beschreiben wir nur von außen, und wir bitten, das zu respektieren.</p>
<h2>Fotos</h2>
<p>Fotos auf den Spaziergängen sind entweder eigene, lizenzierte Stockbilder oder klar gekennzeichnete KI-Illustrationen; jedes Bild trägt seinen Nachweis in der Bildunterschrift oder in der Bildliste der Website. Fehlt ein Bild noch, siehst du einen Platzhalter mit der Beschreibung des Bildes, das dorthin gehört. Wir verwenden keine Bilder von den Websites der Sehenswürdigkeiten ohne Erlaubnis.</p>
<h2>Werbung und Geld</h2>
<p>Die Website zeigt Werbung über Google AdSense auf Inhaltsseiten, gekennzeichnet mit „Werbung“, nie auf Impressum, Datenschutz, Kontakt oder Fehlerseite. Wir könnten künftig ein bezahltes Download-Paket der Spaziergänge für unterwegs anbieten; es wird klar getrennt sein, und die Online-Spaziergänge bleiben frei. Wir haben keine geschäftliche Beziehung zu einem beschriebenen Ort, und kein Ort hat für Aufnahme oder wohlwollende Beschreibung bezahlt.</p>
<h2>Wer</h2>
<p>AdStern, Seilerstätte 8, 1010 Wien, Österreich, office@adstern.com. Alle Angaben im <a href="/de/impressum/">Impressum</a>; Datenschutz in der <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>
<p class="reviewed">Zuletzt geprüft: 6. November 2026.</p>`;

export const imprint = () => `
<span class="kicker">Rechtliches</span>
<h1>Impressum</h1>
<p>Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz (MedienG).</p>
<h2>Herausgeber und Medieninhaber</h2>
<p>AdStern<br>Seilerstätte 8<br>1010 Wien<br>Österreich<br>E-Mail: <a href="mailto:office@adstern.com">office@adstern.com</a></p>
<h2>Unternehmensangaben</h2>
<p>Unternehmensgegenstand: Werbeagentur<br>UID-Nummer: ATU54682507<br>Gewerbebehörde: Magistratisches Bezirksamt für den 1./8. Bezirk, Wien<br>Kammerzugehörigkeit: Wirtschaftskammer Wien, Fachgruppe Werbung und Marktkommunikation<br>Anwendbare Rechtsvorschriften: Gewerbeordnung 1994, abrufbar im <a href="https://www.ris.bka.gv.at/" rel="noopener">Rechtsinformationssystem des Bundes (RIS)</a></p>
<h2>Grundlegende Richtung (§ 25 MedienG)</h2>
<p>Salzburg in Harmony veröffentlicht selbst geführte Spazierwege und Hintergrundinformationen über Salzburg für Besucher. Die Inhalte sind allgemeine Reiseinformation; sie sind keine amtliche Information einer Behörde oder Sehenswürdigkeit und keine Garantie für Zugang oder Öffnung.</p>
<h2>Fiktive Gastgeber und KI</h2>
<p>Die Gastgeber Anton und Dora sind fiktive, KI-generierte Figuren. Sie stellen keine realen Personen dar. Texte entstehen mit KI-Unterstützung und werden redaktionell geprüft.</p>
<h2>Externe Links</h2>
<p>Externe Links wurden bei Veröffentlichung oder letzter Prüfung der Seite kontrolliert. Auf Inhalte fremder Websites haben wir keinen Einfluss und übernehmen dafür keine Verantwortung.</p>
<h2>Verbraucherstreitigkeiten</h2>
<p>Diese Website verkauft derzeit keine Waren oder Dienstleistungen an Verbraucher. Sollte künftig ein bezahlter Download angeboten werden, werden Verkaufsbedingungen und die Hinweise zur Online-Streitbeilegung vor dem Kauf auf der Produktseite bereitgestellt.</p>
<p class="reviewed">Zuletzt aktualisiert: 6. November 2026.</p>`;

export const privacy = () => `
<span class="kicker">Datenschutz</span>
<h1>Datenschutzerklärung</h1>
<p class="lede">Diese Erklärung beschreibt, welche Daten bei der Nutzung von www.salzburginharmony.com verarbeitet werden, zu welchem Zweck und auf welcher Rechtsgrundlage, und welche Rechte du hast.</p>
<h2>Verantwortlicher</h2>
<p>AdStern, Seilerstätte 8, 1010 Wien, Österreich, <a href="mailto:office@adstern.com">office@adstern.com</a> (Details im <a href="/de/impressum/">Impressum</a>).</p>
<h2>Hosting</h2>
<p>Die Website ist eine statische Seite auf GitHub Pages, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite übermittelt dein Browser technische Daten – IP-Adresse, aufgerufene Adresse, Datum und Uhrzeit, Browsertyp, verweisende Seite – an die Server von GitHub, die sie zur Auslieferung der Seite und zum Schutz des Dienstes verwenden und für begrenzte Zeit in Protokolldateien aufbewahren können. Rechtsgrundlage: unser berechtigtes Interesse an einer zuverlässigen und sicheren Website (Art. 6 Abs. 1 lit. f DSGVO). Übermittlungen in die USA stützen sich auf das EU-US Data Privacy Framework oder Standardvertragsklauseln. Siehe die <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub General Privacy Statement</a>.</p>
<h2>Fortschritt, Gastgeberwahl und Tagesplan</h2>
<p>Der Spaziergang-Modus speichert, welche Station du in jedem Spaziergang erreicht hast (<code>sih-tour-…</code>), deinen gewählten Gastgeber (<code>sih-host</code>) und deinen Tagesplan (<code>sih-plan</code>) im lokalen Speicher deines Browsers, nur auf deinem Gerät. Diese Einträge werden nie an uns oder Dritte gesendet; sie sind nötig, damit Spaziergang und Plan einen Seitenwechsel überstehen. Löschen mit „Plan löschen“ auf der Planerseite oder durch Löschen der Website-Daten im Browser. Ist der lokale Speicher gesperrt, funktioniert die Seite trotzdem für die aktuelle Ansicht.</p>
<h2>Werbung mit Google AdSense</h2>
<p>Diese Website zeigt Werbung über Google AdSense, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, und für Nutzer außerhalb des EWR, des Vereinigten Königreichs und der Schweiz der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. AdSense verwendet Cookies und ähnliche Technologien, um Anzeigen auszuliefern, die Häufigkeit zu begrenzen, die Leistung zu messen und Betrug zu verhindern.</p>
<p>Startseite, Spaziergänge, Übersicht, Tagesplaner, Gastgeberseite und „Über“ können Werbung zeigen. Dort wird das AdSense-Skript zusammen mit Googles Einwilligungsmeldung geladen; die Positionen sind feste, mit „Werbung“ gekennzeichnete Flächen. Impressum, diese Datenschutzerklärung, Kontakt, Shopseite und Fehlerseite laden das AdSense-Skript nicht und zeigen keine Werbung; Googles Einwilligungsskript wird dort nur geladen, wenn du im Statistik-Fenster ausdrücklich „Googles Werbe- und US-Datenschutzauswahl öffnen“ anklickst.</p>
<p>Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage früherer Besuche eines Nutzers auf dieser oder anderen Websites zu schalten. Die Verwendung von Werbecookies durch Google ermöglicht es Google und seinen Partnern, Nutzern Anzeigen auf Grundlage ihrer Besuche dieser und/oder anderer Websites zu zeigen. Personalisierte Werbung kannst du in den <a href="https://adssettings.google.com/" rel="noopener">Google-Einstellungen für Werbung</a>, unter <a href="https://www.aboutads.info/" rel="noopener">www.aboutads.info</a> oder in Europa unter <a href="https://www.youronlinechoices.eu/" rel="noopener">www.youronlinechoices.eu</a> deaktivieren. Wie Google Daten von Websites verwendet, die seine Dienste nutzen, steht unter <a href="https://policies.google.com/technologies/partner-sites?hl=de" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
<p><b>Einwilligung.</b> Besucher aus dem EWR, dem Vereinigten Königreich und der Schweiz sehen eine Einwilligungsmeldung von Googles zertifizierter Einwilligungsplattform (IAB Transparency & Consent Framework), bevor einwilligungspflichtige Cookies oder ähnliche Technologien eingesetzt werden. Personalisierte Werbung setzt deine Einwilligung voraus. Auch nicht personalisierte Anzeigen verwenden Cookies oder Kennungen zur Häufigkeitsbegrenzung, für Berichte und zur Betrugsvermeidung und brauchen daher die Einwilligung zum Speichern und Auslesen von Informationen auf deinem Gerät. Ohne Einwilligung kann Google nur eingeschränkte Anzeigen zeigen, die keine Cookies oder lokalen Speicher für personalisierte Werbung nutzen. Bevor ein Google-Skript läuft, steht der Google Consent Mode für alle Zwecke auf „abgelehnt“. Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 165 Abs. 3 TKG 2021). Du kannst deine Wahl jederzeit über den Link „Datenschutz-Einstellungen“ im Fuß jeder Seite ändern oder widerrufen. Besucher aus US-Bundesstaaten mit Datenschutzgesetzen können über denselben Link dem Verkauf oder der Weitergabe personenbezogener Daten widersprechen; ein Global-Privacy-Control-Signal des Browsers wird beachtet.</p>
<h2>Google Analytics 4</h2>
<p>Wir verwenden Google Analytics 4 (Google Ireland Limited / Google LLC), um zu sehen, welche Spaziergänge gelesen und genutzt werden, damit wir sie verbessern können. Bevor ein Google-Skript läuft, steht der Google Consent Mode für Werbe- und Analysespeicher auf „abgelehnt“ und Google Analytics ist abgeschaltet. Im EWR, im Vereinigten Königreich und in der Schweiz wird Google Analytics nur geladen, nachdem du in der Einwilligungsmeldung dem Speichern und Auslesen von Informationen auf deinem Gerät (TCF-Zweck 1), Google als Anbieter und der Analyse zugestimmt hast. Anderswo nur, wenn die Einwilligungsmeldung Analyse als erteilt oder nicht einwilligungspflichtig meldet und bestätigt hat, dass du nicht nach einem US-Bundesstaatengesetz widersprochen hast; fehlende oder unklare Signale lassen es abgeschaltet. Solange Googles Einwilligungsmeldung nicht angezeigt wird, wird Google Analytics nur geladen, nachdem du es in unserem Statistik-Fenster erlaubt hast (nächster Abschnitt). Sendet dein Browser ein Global-Privacy-Control-Signal, bleibt Google Analytics aus. Widerrufst du, geht der Consent Mode auf „abgelehnt“ zurück und Google Analytics wird sofort abgeschaltet. Google-Signale und Anzeigenpersonalisierung sind in unserer Konfiguration deaktiviert. Google Analytics 4 speichert keine IP-Adressen. Ereignisdaten werden für die in unserer Property eingestellte Aufbewahrungsdauer gespeichert und dann gelöscht. Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Übermittlungen an Google LLC in die USA stützen sich auf das EU-US Data Privacy Framework.</p>
<h2 id="statistics">Statistik-Fenster</h2>
<p>Solange Googles Einwilligungsmeldung für diese Website eingerichtet, aber nicht angezeigt ist, zeigen wir ein eigenes kleines Fenster („Nur Statistik“), damit Besuche nur mit deiner Einwilligung gezählt werden. Es erscheint etwa drei Sekunden nach dem Laden einer Seite, wenn Googles Einwilligungsverwaltung bis dahin weder ihre Meldung gezeigt noch eine Entscheidung gemeldet hat und nicht gemeldet hat, dass die DSGVO auf deinen Besuch nicht anwendbar ist. Es fragt nur nach Statistik mit Google Analytics. Es ist keine Einwilligung in Werbung und ändert die Werbeeinstellungen des Google Consent Mode nie: Werbespeicher, Werbenutzerdaten und Werbepersonalisierung bleiben „abgelehnt“. „Zustimmen“ und „Ablehnen“ sind gleichwertig. Schließen mit „×“ oder der Escape-Taste oder keine Auswahl speichert nichts und ist keine Einwilligung; Google Analytics bleibt dann aus, und das Fenster erscheint auf der nächsten Seite erneut.</p>
<p>Stimmst du zu, setzt der Consent Mode nur den Analysespeicher auf „erteilt“ und Google Analytics 4 wird einmal wie oben beschrieben geladen; Google Analytics setzt dann Cookies auf deinem Gerät (<code>_ga</code>, <code>_ga_…</code>), und Daten können an Google LLC in die USA übermittelt werden. Lehnst du ab oder widerrufst du später, wird Google Analytics sofort abgeschaltet, der Analysespeicher geht auf „abgelehnt“ zurück, und die für diese Domain gesetzten Google-Analytics-Cookies werden gelöscht. Deine Wahl liegt im lokalen Speicher deines Browsers unter dem Schlüssel <code>sih-stats</code> – Versionsnummer, „granted“ oder „denied“ und Zeitpunkt – für 12 Monate; sie wird nicht an uns oder Google gesendet. Das Speichern dieses Eintrags ist unbedingt erforderlich, um deine Entscheidung zu beachten. Du kannst deine Wahl jederzeit über „Datenschutz-Einstellungen“ am Ende jeder Seite ändern oder widerrufen.</p>
<p>Googles Einwilligungsverwaltung hat Vorrang: Sobald sie auf einer Seite ihre eigene Meldung zeigt, schließt unser Fenster und erscheint auf dieser Seite nicht mehr. Sobald sie eine Entscheidung meldet oder meldet, dass die DSGVO auf deinen Besuch nicht anwendbar ist, zählt nur das: Eine in unserem Fenster gespeicherte Wahl wird gelöscht, und die obigen Google-Analytics-Regeln gelten. Meldet Google, dass du Analyse abgelehnt hast, werden auch die Google-Analytics-Cookies dieser Domain gelöscht. Impressum, diese Erklärung, Kontakt, Shopseite und Fehlerseite laden weder Werbung noch Google Analytics; dort öffnet „Datenschutz-Einstellungen“ das Fenster nur zum Ansehen, Ändern oder Widerrufen der gespeicherten Wahl, und Googles Einwilligungsskript wird nur auf ausdrücklichen Klick geladen.</p>
<h2>Kontakt per E-Mail</h2>
<p>Schreibst du uns, verarbeiten wir deine E-Mail-Adresse und den Inhalt deiner Nachricht, um dir zu antworten. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, wenn es um einen Vertrag oder eine vorvertragliche Anfrage geht, sonst unser berechtigtes Interesse an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Nachrichten werden gelöscht, wenn die Sache erledigt ist, sofern keine gesetzlichen Aufbewahrungsfristen gelten.</p>
<h2>Shop (sobald verfügbar)</h2>
<p>Wird ein bezahlter Download angeboten, wickelt Lemon Squeezy, LLC, die Bestellung als Händler (Merchant of Record) auf eigenen Seiten ab; welche Daten dabei verarbeitet werden, steht vor der Bestellung auf der Produktseite und in der Datenschutzerklärung von Lemon Squeezy. Diese Website selbst verarbeitet keine Zahlungsdaten.</p>
<h2>Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen sowie das Recht, eine Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Du kannst dich bei der Österreichischen Datenschutzbehörde beschweren, Barichgasse 40–42, 1030 Wien, <a href="https://www.dsb.gv.at/" rel="noopener">dsb.gv.at</a>, dsb@dsb.gv.at.</p>
<h2>Keine automatisierten Entscheidungen, kein Profiling durch uns</h2>
<p>Wir treffen keine automatisierten Entscheidungen über dich und erstellen keine Profile. Werbeprofile, soweit du eingewilligt hast, erstellen Google und seine Partner wie oben beschrieben, nicht wir.</p>
<p class="reviewed">Zuletzt aktualisiert: 6. November 2026.</p>`;

export const contact = () => `
<span class="kicker">Kontakt</span>
<h1>Kontakt</h1>
<p class="lede">Korrekturen, Fragen zu einem Spaziergang, Bildnachweise, Presse- oder Werbeanfragen: Schreib uns per E-Mail. Wir lesen alles und antworten innerhalb weniger Werktage.</p>
<p><b>E-Mail:</b> <a href="mailto:office@adstern.com">office@adstern.com</a><br><b>Post:</b> AdStern, Seilerstätte 8, 1010 Wien, Österreich</p>
<h2>Fehler gefunden?</h2>
<p>Öffnungszeiten und Preise ändern sich kurzfristig. Stimmt eine Zeile in einem Kasten „Vor dem Weg“ nicht, nenn uns Spaziergang, Station und was du vor Ort oder auf der Betreiberseite gesehen hast; wir korrigieren und vermerken das Datum. Dasselbe gilt für Geschichte: Kennst du eine Quelle, die uns widerspricht, schick sie.</p>
<h2>Orte, die erwähnt werden möchten</h2>
<p>Wir nehmen kein Geld für Aufnahme oder wohlwollende Beschreibung und veröffentlichen keine Werbetexte in den Spaziergängen. Werbung auf der Website liefert Google AdSense und ist als solche gekennzeichnet.</p>
<h2>Texte und Bilder verwenden</h2>
<p>Die Texte sind urheberrechtlich geschützt (AdStern). Kurze Zitate mit Link sind willkommen; ganze Spaziergänge nachzudrucken nicht. Bilder tragen ihre eigenen Nachweise; die KI-generierten Gastgeberporträts dürfen nicht weiterverwendet werden.</p>
<p>Es gibt kein Kontaktformular; ein Formular bräuchte einen Server und würde Daten sammeln, die wir nicht halten wollen. E-Mail genügt, und was damit geschieht, steht in der <a href="/de/datenschutz/">Datenschutzerklärung</a>.</p>
<p class="reviewed">Zuletzt aktualisiert: 6. November 2026.</p>`;
