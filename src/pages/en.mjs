// English core pages. Each function returns the body HTML (inside .content); the build wraps it.
import { adBox } from '../layout.mjs';

export const hero = (tours) => `<section class="hero"><div class="wrap"><div class="hero-card">
<div><span class="kicker">Self-guided walks · Salzburg, Austria</span>
<h1>Walk Salzburg with Anton and Dora.</h1>
<p class="lede">Eight walks through the gardens, squares, hills and markets of Salzburg, told stop by stop by two fictional hosts who know the city. Free to read, no app, no sign-up. Pick a host, press start, and the walk comes with you on your phone.</p>
<p class="row"><a class="btn" href="/tours/">Choose a walk</a><a class="btn ghost" href="/planner/">Plan my day</a></p>
<p class="small muted">Anton and Dora are AI-generated, fictional characters, not real guides. Opening times and prices on every walk carry the date we checked them.</p></div>
<div class="hosts"><div class="host"><img src="/assets/img/anton.png" alt="Anton, a fictional host: an older man with a grey beard, a green felt hat and a traditional waistcoat" width="230" height="230"><b>Anton</b><span>history, paths and views</span></div><div class="host"><img src="/assets/img/dora.png" alt="Dora, a fictional host: a woman with braided blond hair in a red traditional bodice" width="230" height="230"><b>Dora</b><span>gardens, food and festivals</span></div></div>
</div></div></section>`;

export const tourCard = (t, lang = 'en', imgExists) => {
  const pic = imgExists(t.hero.file) ? `<img src="/assets/img/tours/${t.hero.file}" alt="${t.hero.alt}" loading="lazy" width="640" height="360">` : `<span class="ph">${t.hero.alt}</span>`;
  return `<li><a class="card" href="/tours/${t.slug}/"><span class="pic">${pic}</span><span class="body"><span class="meta">${t.kicker} · ${t.stations.length} stops · ${t.facts.duration}</span><h3>${t.title}</h3><p>${t.desc}</p></span></a></li>`;
};

export const home = (tours, imgExists) => `
<h2 id="walks">The eight walks</h2>
<p class="lede">Each walk is a page you can read at home and a mode you can follow on the spot, one stop at a time, with a short word from your host, a thing to look for, and a “next” button. Your progress and your day plan stay in your browser; nothing is sent to us.</p>
<ul class="cards">${tours.map((t) => tourCard(t, 'en', imgExists)).join('')}</ul>
${adBox('top')}
<section class="two">
<div><h2>How a walk works</h2>
<ol>
<li><b>Read it first.</b> Every walk has an introduction, a box with checked opening times and prices, a sketch of the route, and six to eight stops with the full text visible without any script.</li>
<li><b>Choose a host.</b> Anton tells you about the archbishops, the walls and the view; Dora about the gardens, the food and what people do here in each season. Both are invented characters with real knowledge of the city.</li>
<li><b>Press start.</b> Walk mode shows one stop at a time with a progress bar, the host's remark and a small observation task. It remembers where you stopped. Print it or save the plan as text.</li>
<li><b>Plan the day.</b> The <a href="/planner/">day planner</a> adds up your minutes at the stops and gives you a schedule to copy or print. It does not calculate walking times or queues, and it says so.</li>
</ol></div>
<div><h2>Why these walks</h2>
<p>Salzburg is small, baroque and built around a river and three hills, which makes it a walker's city. Most visitors see the same squares on a tight schedule and miss the convent above the roofs, the walls on the hill across the water, the pond south of town and the market where locals buy their cheese. These walks put the famous places and the quiet ones in the same order a Salzburger would choose.</p>
<p>Everything factual on this site is checked against the official sources named at the bottom of each walk, with the date we looked. Where we could not verify a price or an opening time, we say so and point you to the operator. Where a place is private, like Leopoldskron, we tell you to stay outside. Read more <a href="/about/">about how the site is made</a>.</p>
<p class="quote">“The best thing I can tell you about Salzburg costs a few euros and comes from a bakery hatch by a water wheel.” – Dora, on the Getreidegasse walk</p></div>
</section>
<section class="cta"><h2>Planning a first visit from far away?</h2>
<p>Start with <a href="/tours/mirabell-to-fortress/">Mirabell to the Fortress</a> for the classic line, add <a href="/tours/kapuzinerberg/">the Kapuzinerberg</a> for the view most people miss, and keep <a href="/tours/hellbrunn/">Hellbrunn</a> for a half day. Coming in December? <a href="/tours/winter-salzburg/">Winter Salzburg</a> lists what is open and what is not.</p>
<p><a class="btn" href="/planner/">Open the day planner</a></p></section>
<h2>What this site is and is not</h2>
<p>Salzburg in Harmony is an independent project by AdStern, a small agency in Vienna. It is not affiliated with the City of Salzburg, Salzburg Tourism or any attraction. It does not sell tickets or tours. It carries advertising, clearly labelled, and may in future offer a paid download of the walks for offline use; the free walks will stay free. The hosts are AI-generated characters and the texts are written with AI assistance and checked by a person; see the <a href="/hosts/">hosts page</a> for how they were made and the <a href="/privacy/">privacy policy</a> for what the site does with data (very little).</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const toursIndex = (tours, imgExists) => `
<span class="kicker">The walks</span>
<h1>Eight walks through Salzburg</h1>
<p class="lede">In the order we would suggest for a first visit. Each one is self-contained; the practical notes at the end say which walks join up. Times are generous estimates for a slow walk with stops, not schedules.</p>
<ul class="cards">${tours.map((t) => tourCard(t, 'en', imgExists)).join('')}</ul>
${adBox('top')}
<h2>Which walk first?</h2>
<table><thead><tr><th>If you have</th><th>Take</th><th>Why</th></tr></thead><tbody>
<tr><td>One morning</td><td><a href="/tours/mirabell-to-fortress/">Mirabell to the Fortress</a></td><td>The garden, the river, the three squares and the castle in the order they were designed to be seen.</td></tr>
<tr><td>A second day</td><td><a href="/tours/kapuzinerberg/">Kapuzinerberg</a> + <a href="/tours/getreidegasse/">Getreidegasse</a></td><td>The view of the Old Town from across the river in the morning, the lanes and the market after.</td></tr>
<tr><td>A quiet afternoon</td><td><a href="/tours/nonnberg/">Nonnberg</a> → <a href="/tours/leopoldskron/">Leopoldskron</a></td><td>Steps to a convent, then a flat walk around a pond; the two join up.</td></tr>
<tr><td>Half a day out</td><td><a href="/tours/hellbrunn/">Hellbrunn</a></td><td>Trick fountains and a park, April to early November.</td></tr>
<tr><td>A clear day</td><td><a href="/tours/untersberg/">Untersberg</a></td><td>Cable car to 1,776 m and a summit walk; check the maintenance closures first.</td></tr>
<tr><td>December</td><td><a href="/tours/winter-salzburg/">Winter Salzburg</a></td><td>The markets, the rink, the fortress in Advent, and an honest list of what is closed.</td></tr>
</tbody></table>
<h2>Reading the practical boxes</h2>
<p>Every walk starts with a “Before you go” box. The opening times, seasons, prices and closures in it come from the official pages of Salzburg Tourism (salzburg.info) or the operator, and each line names its source and the date we checked it, usually with the operator's own status date. Things change at short notice; if a line matters to your day, open the source link and look again on the morning you go. Where we could not verify a price, we do not print one.</p>
<p>Distances and durations are our own estimates for a slow walk with stops. Steps and gradients are described in words; none of the hill walks is step-free, and we say which parts of each route are.</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const planner = (tours) => `
<span class="kicker">Day planner</span>
<h1>Plan your Salzburg day</h1>
<p class="lede">Tick the stops you want from any of the walks, set how long you want at each, add a buffer, and the planner gives you a running schedule to copy, download or print. It lives in your browser; nothing is sent anywhere.</p>
<div class="note">The planner adds up <b>time at the stops</b> only. Walking between stops, buses, queues, meals and opening hours are not calculated. Treat the total as the minimum your day needs, then look at the opening times in each walk's “Before you go” box.</div>
<div id="planner" class="plan-grid">
<div>
<h2>Stops</h2>
<ul class="plan-list" data-plan-list><li class="muted">Loading the planner needs JavaScript. Without it, open any walk and use your browser's print function.</li></ul>
</div>
<div>
<div class="field"><label for="plan-start">Start time (optional)</label><input id="plan-start" type="time" data-start></div>
<div class="field"><label for="plan-buffer">Buffer in minutes (breaks, getting lost, coffee)</label><input id="plan-buffer" type="number" min="0" max="240" step="5" data-buffer value="30"></div>
<div class="plan-out" data-plan-out></div>
<p class="row noprint"><button type="button" class="btn" data-plan-copy>Copy as text</button><button type="button" class="btn ghost" data-plan-download>Download .txt</button><button type="button" class="btn ghost" data-plan-print>Print</button><button type="button" class="linklike" data-plan-clear>Clear plan</button></p>
</div>
</div>
<h2>How to use the planner well</h2>
<p>Start with one walk, not three. A realistic Salzburg day holds one of the longer walks (Mirabell to the Fortress, Kapuzinerberg, Getreidegasse) plus one short one (Nonnberg, Leopoldskron) with a long lunch between them, or a single half-day outing to Hellbrunn or the Untersberg with a slow evening in town. The default minutes on each stop are generous, so a plan that adds up to five hours at the stops is a full day once walking and eating are included.</p>
<p>Order matters. The planner lets you move stops up and down; put the viewpoints in the middle of the day when the light is best, the markets and squares after dark in winter, and anything with a last admission early enough to make it. Museums and the fortress interiors are the stops most often cut short by closing times.</p>
<p>Set a start time and the planner shows a clock time for each stop, counting only the minutes before it. Add the walking time yourself: inside the Old Town most stops are five to ten minutes apart; the hills take fifteen to twenty minutes up; Hellbrunn and the Untersberg are half an hour or more from the centre by bus.</p>
<h2>Where your plan is kept</h2>
<p>Your selection, minutes, buffer and start time are stored in your browser's local storage under the key <code>sih-plan</code>, on your device only, until you clear it with the button above or delete this site's data in your browser. We cannot see it. If local storage is blocked, the plan works for the page you are on and is gone when you leave. “Copy as text” and “Download .txt” give you the plan as plain text to paste into your notes or send to a travel companion; “Print” uses your browser's print dialog, which can also save a PDF.</p>
${adBox('bottom')}
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const hosts = () => `
<span class="kicker">The hosts</span>
<h1>Anton and Dora</h1>
<p class="lede">Two invented Salzburgers who walk with you. They are not real people, not licensed guides and not photographs of anyone; they are AI-generated characters with a consistent face, a voice and a set of interests, created for this site so that the walks have a tone rather than a brochure.</p>
<div class="two">
<div><img src="/assets/img/anton.png" alt="Anton, fictional host" width="400" height="400" style="border-radius:50%;max-width:260px"><h2>Anton</h2>
<p>An older man with a grey beard, a green felt hat with a tuft of feathers and a loden waistcoat. Anton talks about the prince-archbishops, the walls, the hills and the views. He prefers the footpath to the funicular, starts early, and has an opinion about every square. He is the one who tells you that fifty-five houses were cleared for the Residenzplatz, that nobody ever took the fortress, and that the Untersberg built the town.</p></div>
<div><img src="/assets/img/dora.png" alt="Dora, fictional host" width="400" height="400" style="border-radius:50%;max-width:260px"><h2>Dora</h2>
<p>A woman with braided blond hair in a red bodice of the regional dress. Dora knows the gardens, the markets, the bakery with the water wheel and what people in Salzburg do in each season. She tells you where to sit, what to eat, when the light is right and when to put the phone away. She leads the Hellbrunn and the winter walks.</p></div>
</div>
<h2>How they were made</h2>
<p>The portraits were generated with an image model from a written description and then cropped and prepared by us; they do not depict real persons. The dress they wear is the traditional clothing of the Salzburg region, as shown in the folklore museum at Hellbrunn, chosen because it is what visitors expect to see and what people here do wear at festivals. Their remarks on each walk are written by us with AI assistance and checked for facts against the sources named on each page; the opinions are deliberately theirs, not ours, and you are welcome to disagree with Anton about the funicular.</p>
<h2>What they are not</h2>
<p>They do not speak, animate or answer questions; there is no chat. They do not represent Salzburg Tourism, the City of Salzburg or any attraction. They are not based on any real person, historical figure or character from any book, film or play, and the walks do not retell any such story; they describe real places with their real history and leave the rest to you.</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const about = () => `
<span class="kicker">About</span>
<h1>About Salzburg in Harmony</h1>
<p class="lede">An independent set of self-guided walks through Salzburg, Austria, made by AdStern, a small agency in Vienna, for visitors who want to understand the city rather than tick it off.</p>
<h2>What the site offers</h2>
<p>Eight walks, each with an introduction, a dated box of practical facts, a route sketch, six to eight stops with a text, a remark from one of two fictional hosts and an observation task, a walk mode that takes you through the stops one at a time, and a day planner that adds up your time at the stops. Everything is free to read and works without an account. Where a tour needs a ticket, we say so; we do not sell tickets, tours or anything on behalf of the places described.</p>
<h2>Sources and checking</h2>
<p>Opening times, seasons, prices and closures come from the official pages of Salzburg Tourism (salzburg.info), the operators' own sites (for example the Christmas market's site) and, for background history, Wikipedia and the published histories of the sites. Each walk lists its sources with links, and each practical line carries the date we checked it and, where the source gives one, the source's own status date. We checked all of them on 6 November 2026 and will re-check before each season. If we could not verify a figure, we do not print it. If you find an error, write to office@adstern.com; we correct quickly and note the date.</p>
<p>The descriptions of places are written in our own words from visits, the sources above and standard references. Observation tasks and the hosts' remarks are our own. The texts are produced with AI assistance and edited and checked by a person before publication; the hosts are AI-generated characters, which is stated wherever they appear.</p>
<h2>Limits</h2>
<p>This is not a map and not navigation. The route sketches are schematic; use a city map or the signposts. Durations are estimates for a slow walk. Nothing here is a guarantee of access, opening or safety; follow local notices, the rules of each site and your own judgement on the hills and the mountain. Private properties are described from outside only, and we ask you to respect that.</p>
<h2>Photographs</h2>
<p>Photographs on the walks are either our own, licensed stock images or clearly marked AI-generated illustrations; each image carries its credit in the caption or in the site's image list. Where an image is still missing, you see a placeholder with the description of the picture that belongs there. We do not use images from the attractions' websites without permission.</p>
<h2>Advertising and money</h2>
<p>The site shows advertising through Google AdSense on content pages, labelled “Advertisement”, never on the imprint, privacy, contact or error pages. We may offer a paid download pack of the walks for offline use in future; it will be clearly separate and the online walks will stay free. We have no commercial relationship with any place described, and no place has paid to be included or described favourably.</p>
<h2>Who</h2>
<p>AdStern, Seilerstätte 8, 1010 Vienna, Austria, office@adstern.com. Full details in the <a href="/imprint/">imprint</a>; data protection in the <a href="/privacy/">privacy policy</a>.</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const imprint = () => `
<span class="kicker">Legal notice</span>
<h1>Imprint</h1>
<p>Information pursuant to § 5 Austrian E-Commerce Act (ECG) and § 25 Austrian Media Act (MedienG).</p>
<h2>Publisher and media owner</h2>
<p>AdStern<br>Seilerstätte 8<br>1010 Vienna<br>Austria<br>Email: <a href="mailto:office@adstern.com">office@adstern.com</a></p>
<h2>Business details</h2>
<p>Line of business: advertising agency (Werbeagentur)<br>VAT identification number: ATU54682507<br>Trade authority: Magistratisches Bezirksamt für den 1./8. Bezirk, Vienna<br>Chamber membership: Vienna Chamber of Commerce (WKO Wien), Fachgruppe Werbung und Marktkommunikation<br>Trade regulations: Austrian Trade Regulation Act (Gewerbeordnung 1994), available in the <a href="https://www.ris.bka.gv.at/" rel="noopener">Austrian Legal Information System (RIS)</a></p>
<h2>Basic editorial line (§ 25 MedienG)</h2>
<p>Salzburg in Harmony publishes self-guided walking routes and background information about Salzburg, Austria, for visitors. The content is general travel information; it is not official information of any authority or attraction and not a guarantee of access or opening.</p>
<h2>Fictional hosts and AI</h2>
<p>The hosts Anton and Dora are fictional, AI-generated characters. They do not depict real persons. Texts are produced with AI assistance and checked editorially.</p>
<h2>External links</h2>
<p>External links were checked when the page was published or last reviewed. We have no influence on the content of other websites and are not responsible for it.</p>
<h2>Consumer disputes</h2>
<p>This website does not currently sell goods or services to consumers. Should a paid download be offered in future, the sales terms and the information on online dispute resolution will be provided on the product page before purchase.</p>
<p class="reviewed">Last updated: November 6, 2026.</p>`;

export const privacy = () => `
<span class="kicker">Privacy</span>
<h1>Privacy policy</h1>
<p class="lede">This policy explains which data is processed when you use www.salzburginharmony.com, for what purpose and on which legal basis, and what rights you have.</p>
<h2>Controller</h2>
<p>AdStern, Seilerstätte 8, 1010 Vienna, Austria, <a href="mailto:office@adstern.com">office@adstern.com</a> (details in the <a href="/imprint/">imprint</a>).</p>
<h2>Hosting</h2>
<p>The website is a static site hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When a page is loaded, your browser transmits technical data – IP address, requested address, date and time, browser type, referring page – to GitHub's servers, which use it to deliver the page and to protect the service and may keep it in log files for a limited period. Legal basis: our legitimate interest in a reliable and secure website (Art. 6(1)(f) GDPR). Transfers to the USA rely on the EU–U.S. Data Privacy Framework or standard contractual clauses. See the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub General Privacy Statement</a>.</p>
<h2>Walk progress, host choice and day plan</h2>
<p>Walk mode stores which stop you reached in each walk (<code>sih-tour-…</code>), your chosen host (<code>sih-host</code>) and your day plan (<code>sih-plan</code>) in your browser's local storage, on your device only. These entries are never sent to us or to third parties; they are needed so that a walk and a plan survive a page change. Delete them with “Clear plan” on the planner page or by deleting this site's data in your browser settings. If local storage is blocked, the site still works for the page you are on.</p>
<h2>Advertising with Google AdSense</h2>
<p>This site shows advertising provided by Google AdSense, a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, and for users outside the EEA, UK and Switzerland Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. AdSense uses cookies and similar technologies to display ads, limit how often an ad is shown, measure ad performance and prevent fraud.</p>
<p>The home page, the walks, the walk overview, the day planner, the hosts page and About can show advertising. The AdSense script, together with Google's consent message, is loaded on these pages; the positions are fixed boxes labelled “Advertisement”. The imprint, this privacy policy, the contact page, the shop page and the error page do not load the AdSense script and show no ads; Google's consent script is loaded there only if you explicitly click “Open Google's ad and U.S. privacy choices” in the statistics window.</p>
<p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the internet. You can opt out of personalized advertising in <a href="https://adssettings.google.com/" rel="noopener">Google's Ads Settings</a>, at <a href="https://www.aboutads.info/" rel="noopener">www.aboutads.info</a> or, in Europe, at <a href="https://www.youronlinechoices.eu/" rel="noopener">www.youronlinechoices.eu</a>. How Google uses information from sites that use its services is explained at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
<p><b>Consent.</b> Visitors from the European Economic Area, the United Kingdom and Switzerland see a consent message from Google's certified consent management platform (IAB Transparency & Consent Framework) before cookies or similar technologies that need consent are used. Personalized ads require your consent. Non-personalized ads also use cookies or identifiers for frequency capping, reporting and fraud prevention, so they too require consent to storing and accessing information on your device. Without consent, Google can show only limited ads, which do not use cookies or local storage for personalised advertising. Before any Google script runs, Google Consent Mode is set to “denied” for all purposes. Legal basis: your consent (Art. 6(1)(a) GDPR, § 165(3) Austrian Telecommunications Act 2021). You can change or withdraw your choice at any time with the “Privacy settings” link in the footer of every page. Visitors from U.S. states with privacy laws can opt out of the sale or sharing of personal information through the same link; a Global Privacy Control signal from your browser is respected.</p>
<h2>Google Analytics 4</h2>
<p>We use Google Analytics 4 (Google Ireland Limited / Google LLC) to see which walks are read and used, so we can improve them. Before any Google script runs, Google Consent Mode is set to “denied” for advertising and analytics storage, and Google Analytics is switched off. In the EEA, the UK and Switzerland, Google Analytics is loaded only after you consent in the consent message to storing and accessing information on your device (TCF purpose 1), to Google as a vendor and to analytics. Elsewhere it is loaded only if the consent message reports analytics as granted or not requiring consent and has confirmed that you have not opted out under a U.S. state privacy law; missing or unclear signals keep it switched off. While Google's consent message is not displayed, Google Analytics is loaded only after you allow it in our statistics window (next section). If your browser sends a Global Privacy Control signal, Google Analytics stays off. If you withdraw consent, Consent Mode returns to “denied” and Google Analytics is switched off immediately. Google signals and ad personalisation are disabled in our configuration. Google Analytics 4 does not store IP addresses. Event data is stored for the retention period set in our property and then deleted. Legal basis: your consent (Art. 6(1)(a) GDPR). Transfers to Google LLC in the USA rely on the EU–U.S. Data Privacy Framework.</p>
<h2 id="statistics">Statistics window</h2>
<p>While Google's consent message is set up for this site but not displayed, we show our own small window (“Statistics only”) so that visits are counted only with your consent. It appears about three seconds after a page has loaded if Google's consent management has by then neither shown its message nor reported a decision, and has not reported that the GDPR does not apply to your visit. It asks only about statistics with Google Analytics. It is not consent to advertising and never changes the advertising settings of Google Consent Mode: ad storage, ad user data and ad personalisation stay “denied”. “Allow” and “Decline” are equal choices. Closing the window with “×” or the Escape key, or making no choice, stores nothing and is not consent; Google Analytics then stays off and the window appears again on the next page.</p>
<p>If you allow it, Consent Mode sets only analytics storage to “granted” and Google Analytics 4 is loaded once, as described above; Google Analytics then sets cookies on your device (<code>_ga</code>, <code>_ga_…</code>), and data may be transferred to Google LLC in the USA. If you decline or later withdraw, Google Analytics is switched off at once, analytics storage returns to “denied” and the Google Analytics cookies set for this domain are deleted. Your choice is kept in your browser's local storage under the key <code>sih-stats</code> – a version number, “granted” or “denied” and the time of your choice – for 12 months; it is not sent to us or to Google. Storing this entry is strictly necessary to respect your decision. You can change or withdraw your choice at any time via “Privacy settings” at the bottom of every page.</p>
<p>Google's consent management has priority: as soon as it shows its own message on a page, our window closes and does not appear again on that page. As soon as it reports a decision or that the GDPR does not apply to your visit, only that counts: a choice stored in our window is deleted and the Google Analytics rules above apply. If Google reports that you declined analytics, the Google Analytics cookies of this domain are deleted as well. The imprint, this policy, the contact page, the shop page and the error page load neither advertising nor Google Analytics; there “Privacy settings” opens the window only to view, change or withdraw the stored choice, and Google's consent script is loaded only on an explicit click.</p>
<h2>Contact by email</h2>
<p>If you write to us, we process your email address and the content of your message to answer you. Legal basis: Art. 6(1)(b) GDPR where your message concerns a contract or a request before a contract, otherwise our legitimate interest in answering enquiries (Art. 6(1)(f) GDPR). Messages are deleted when the matter is closed, unless statutory retention periods apply.</p>
<h2>Shop (when available)</h2>
<p>If a paid download is offered, the order is processed by Lemon Squeezy, LLC, as merchant of record on its own pages; what data it processes is described on the product page and in Lemon Squeezy's privacy policy before you order. This site itself does not process payment data.</p>
<h2>Your rights</h2>
<p>You have the right to access, rectification, erasure, restriction of processing, data portability and objection to processing based on legitimate interests, and the right to withdraw consent at any time with effect for the future. You can lodge a complaint with the Austrian Data Protection Authority, Barichgasse 40–42, 1030 Vienna, <a href="https://www.dsb.gv.at/" rel="noopener">dsb.gv.at</a>, dsb@dsb.gv.at.</p>
<h2>No automated decisions, no profiling by us</h2>
<p>We do not make automated decisions about you and do not build profiles. Advertising profiles, where you have consented, are built by Google and its partners as described above, not by us.</p>
<p class="reviewed">Last updated: November 6, 2026.</p>`;

export const contact = () => `
<span class="kicker">Contact</span>
<h1>Contact</h1>
<p class="lede">Corrections, questions about a walk, image credits, press or advertising enquiries: write to us by email. We read everything and answer within a few working days.</p>
<p><b>Email:</b> <a href="mailto:office@adstern.com">office@adstern.com</a><br><b>Post:</b> AdStern, Seilerstätte 8, 1010 Vienna, Austria</p>
<h2>Found a mistake?</h2>
<p>Opening times and prices change at short notice. If a line in a “Before you go” box is wrong, tell us the walk, the stop and what you saw on site or on the operator's page, and we will correct it and note the date. The same goes for history: if you know a source that contradicts us, send it.</p>
<h2>Places that would like to be mentioned</h2>
<p>We do not take payment for inclusion or for favourable descriptions, and we do not publish advertorials in the walks. Advertising on the site is delivered by Google AdSense and labelled as such.</p>
<h2>Using our texts and images</h2>
<p>The texts are copyright AdStern. Short quotations with a link are welcome; reprinting whole walks is not. Images carry their own credits; the AI-generated host portraits may not be reused.</p>
<p>There is no contact form; a form would need a server and would collect data we do not want to hold. Email is enough, and what happens to it is in the <a href="/privacy/">privacy policy</a>.</p>
<p class="reviewed">Last updated: November 6, 2026.</p>`;

export const shop = (live, checkoutUrl) => `
<span class="kicker">Salzburg Walks Pack</span>
<h1>All eight walks for offline use</h1>
<p class="lede">A single download with the eight walks as a printable PDF, the route sketches, the practical boxes with their check dates and a blank day plan to fill in by hand. For a trip where you do not want to depend on data roaming or battery.</p>
<ul>
<li>Eight walks, 48 stops, the full texts with the hosts' remarks and the observation tasks</li>
<li>A4 and US Letter PDF, printable; dated practical boxes; sources</li>
<li>Blank day plans and a checklist for each walk</li>
<li>One-time purchase, no subscription; updates to the current season's edition free for one year</li>
</ul>
${live ? `<p><a class="btn" href="${checkoutUrl}" rel="noopener">Buy the pack</a> <span class="small muted">Checkout by Lemon Squeezy; price and taxes shown before you pay.</span></p>` : `<div class="note">The pack is in preparation and <b>not yet on sale</b>. Nothing can be ordered on this page, and this page is not linked from the site until the pack exists. The free online walks will stay free.</div>`}
<h2>What the pack is not</h2>
<p>It is not an audio guide, not a map app and not a ticket. It contains the same facts as the website at the date of the edition; opening times change, so the online walks remain the place to check before you go.</p>
<p class="reviewed">Last updated: November 6, 2026.</p>`;

export const notFound = () => `
<span class="kicker">Error 404</span>
<h1>This page does not exist</h1>
<p class="lede">The address may have changed or been typed wrongly. The walks are all on one page.</p>
<p class="row"><a class="btn" href="/tours/">All walks</a><a class="btn ghost" href="/">Home</a></p>`;
