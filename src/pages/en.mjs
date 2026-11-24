// English core pages. Each function returns the body HTML (inside .content); the build wraps it.
import { esc } from '../layout.mjs';

export const hero = (tours) => `<section class="hero"><div class="wrap"><div class="hero-card">
<div><span class="kicker">Self-guided walks · Salzburg, Austria</span>
<h1>Walk Salzburg with Anton and Dora.</h1>
<p class="lede">Eight walks through the gardens, squares, hills and markets of Salzburg, told stop by stop by two fictional hosts who know the city. Free to read, no app, no sign-up. Pick a host, press start, and the walk comes with you on your phone.</p>
<p class="row"><a class="btn" href="/tours/">Choose a walk</a><a class="btn ghost" href="/planner/">Plan my day</a></p>
<p class="small muted">Anton and Dora are AI-generated, fictional characters, not real guides. Opening times and prices on every walk carry the date we checked them.</p></div>
<div class="hosts"><div class="host"><img src="/assets/img/anton.png" alt="Anton, a fictional host: an older man with a grey beard, a green felt hat and a traditional waistcoat" width="230" height="230"><b>Anton</b><span>history, paths and views</span></div><div class="host"><img src="/assets/img/dora.png" alt="Dora, a fictional host: a woman with braided blond hair in a red traditional bodice" width="230" height="230"><b>Dora</b><span>gardens, food and festivals</span></div></div>
</div></div></section>`;

export const tourCard = (t, lang = 'en', imgExists) => {
  const n = ['mirabell-to-fortress', 'hellbrunn', 'nonnberg', 'leopoldskron', 'getreidegasse', 'kapuzinerberg', 'untersberg', 'winter-salzburg'].indexOf(t.slug) + 1;
  const pic = imgExists(t.hero.file) ? `<span class="pic"><img src="/assets/img/tours/${t.hero.file}" alt="${esc(t.hero.alt)}" loading="lazy" width="640" height="360"></span>` : `<span class="pic sign" aria-hidden="true"><span>${n}</span><b>${esc(t.short)}</b></span>`;
  return `<li><a class="card" href="/tours/${t.slug}/">${pic}<span class="body"><span class="meta">${t.kicker} · ${t.stations.length} stops · ${t.facts.duration}</span><h3>${t.title}</h3><p>${t.desc}</p></span></a></li>`;
};

export const home = (tours, imgExists) => `
<h2 id="walks">The eight walks</h2>
<p class="lede">Each walk is a page you can read at home and a mode you can follow on the spot, one stop at a time, with a short word from your host, a thing to look for, and a “next” button. Your progress and your day plan stay in your browser; nothing is sent to us.</p>
<ul class="cards">${tours.map((t) => tourCard(t, 'en', imgExists)).join('')}</ul>
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
<p>Salzburg in Harmony is an independent project by AdStern, a small agency in Vienna. It is not affiliated with the City of Salzburg, Salzburg Tourism or any attraction. It does not sell tickets, tours or anything else. It carries advertising from Google AdSense, which pays for the work; the walks are free to read. The hosts are AI-generated characters and the texts are written with AI assistance and checked by a person; see the <a href="/hosts/">hosts page</a> for how they were made and the <a href="/privacy/">privacy policy</a> for what the site does with data (very little).</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const toursIndex = (tours, imgExists) => `
<span class="kicker">The walks</span>
<h1>Eight walks through Salzburg</h1>
<p class="lede">In the order we would suggest for a first visit. Each one is self-contained; the practical notes at the end say which walks join up. Times are generous estimates for a slow walk with stops, not schedules.</p>
<ul class="cards">${tours.map((t) => tourCard(t, 'en', imgExists)).join('')}</ul>
<h2>Which walk first?</h2>
<table><thead><tr><th>If you have</th><th>Take</th><th>Why</th></tr></thead><tbody>
<tr><td>One morning</td><td><a href="/tours/mirabell-to-fortress/">Mirabell to the Fortress</a></td><td>The garden, the river, the three squares and the castle in the order they were designed to be seen.</td></tr>
<tr><td>A second day</td><td><a href="/tours/kapuzinerberg/">Kapuzinerberg</a> + <a href="/tours/getreidegasse/">Getreidegasse</a></td><td>The view of the Old Town from across the river in the morning, the lanes and the market after.</td></tr>
<tr><td>A quiet afternoon</td><td><a href="/tours/nonnberg/">Nonnberg</a> → <a href="/tours/leopoldskron/">Leopoldskron</a></td><td>Steps to a convent, then a flat walk to a pond below the fortress; the two join up.</td></tr>
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

export const about = (tours, CREDITS, imgExists) => `
<span class="kicker">About</span>
<h1>About Salzburg in Harmony</h1>
<p class="lede">An independent set of self-guided walks through Salzburg, Austria, made by AdStern, a small agency in Vienna, for visitors who want to understand the city rather than tick it off.</p>
<h2>What the site offers</h2>
<p>Eight walks, each with an introduction, a dated box of practical facts, a route sketch, notes on accessibility, six to eight stops with a text, a remark from one of two fictional hosts and an observation task, a walk mode that takes you through the stops one at a time, and a day planner that adds up your time at the stops. Everything is free to read and works without an account. Where a tour needs a ticket, we say so; we do not sell tickets, tours or anything on behalf of the places described.</p>
<h2>Sources and checking</h2>
<p>Opening times, seasons, prices and closures come from the official pages of Salzburg Tourism (salzburg.info), the operators' own sites (for example the Christmas market's site) and, for background history, Wikipedia and the published histories of the sites. Each walk lists its sources with links, and each practical line carries the date we checked it and, where the source gives one, the source's own status date. We checked all of them on 6 November 2026 and will re-check before each season. If we could not verify a figure, we do not print it. If you find an error, write to office@adstern.com; we correct quickly and note the date.</p>
<p>The descriptions of places are written in our own words from visits, the sources above and standard references. Observation tasks and the hosts' remarks are our own. The texts are produced with AI assistance and edited and checked by a person before publication; the hosts are AI-generated characters, which is stated wherever they appear.</p>
<h2>Limits</h2>
<p>This is not a map and not navigation. The route sketches are schematic; use a city map or the signposts. Durations are estimates for a slow walk. Nothing here is a guarantee of access, opening or safety; follow local notices, the rules of each site and your own judgement on the hills and the mountain. Private properties are described from outside only, and we ask you to respect that.</p>
<h2 id="image-credits">Photographs and image credits</h2>
<p>The photographs on the walks are licensed images from Wikimedia Commons; each one carries its credit in the caption, and all of them are listed below with author, licence and source. We do not use images from the attractions' websites, AI-generated pictures of real places or pictures of people who did not agree to it. Where no licensed photograph of a stop exists, the stop is shown without one, and the route sketch shows where it is. The portraits of Anton and Dora are AI-generated by us and show no real persons.</p>
<ul class="src">${Object.entries(CREDITS).filter(([f]) => imgExists(f)).map(([f, c]) => `<li>${esc(c.title)} – ${esc(c.author)}, <a href="${c.licenseUrl}" rel="noopener license">${esc(c.license)}</a>, <a href="${c.source}" rel="noopener">Wikimedia Commons</a>, accessed ${c.accessed}${c.edit ? `; ${esc(c.edit)}` : ''}. Used on: ${esc(tours.find((t) => f.startsWith(t.slug + '/')).short)}.</li>`).join('')}</ul>
<h2>Advertising and money</h2>
<p>The site shows advertising through Google AdSense on content pages, below the content and labelled “Advertisement”, never on the legal notice, privacy, contact or error pages. The walks are free to read; nothing is sold here. We have no commercial relationship with any place described, and no place has paid to be included or described favourably.</p>
<h2>Who</h2>
<p>AdStern – Agentur für digitales Marketing, Johannes Peter, Seilerstätte 8, 1010 Vienna, Austria, office@adstern.com. Full details in the <a href="/imprint/">legal notice</a>; data protection in the <a href="/privacy/">privacy policy</a>.</p>
<p class="reviewed">Last checked: November 6, 2026.</p>`;

export const notFound = () => `
<span class="kicker">Error 404</span>
<h1>This page does not exist</h1>
<p class="lede">The address may have changed or been typed wrongly. The walks are all on one page.</p>
<p class="row"><a class="btn" href="/tours/">All walks</a><a class="btn ghost" href="/">Home</a></p>`;
