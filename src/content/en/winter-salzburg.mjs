// Walk 8: Winter Salzburg – Advent markets, lit squares, cold-weather walking
export default {
  slug: 'winter-salzburg',
  title: 'Winter Salzburg: Markets, Lights and Cold Clear Days',
  short: 'Winter Salzburg',
  kicker: 'Walk 8 · Late November to early January',
  desc: 'A self-guided winter walk through Salzburg: the Christmas market on the cathedral squares (19 Nov 2026 – 1 Jan 2027), the ice rink, the fortress in Advent and what is closed.',
  hero: { file: 'winter-salzburg/hero.jpg', alt: 'Wooden stalls of the Salzburg Christmas market on Residenzplatz at dusk with strings of lights and the cathedral towers behind' },
  facts: { duration: 'about 3 hours in town, half a day with Hellbrunn', length: 'about 3 km in the Old Town, flat but icy in places', start: 'Mozartplatz', cost: 'markets free to enter · fortress and Hellbrunn market see notes' },
  intro: `<p>Salzburg in winter is a different city: fewer visitors, early dark, wood smoke, and from the third week of November the market stalls on the cathedral squares with their lights strung between the towers. The Christmas market on Domplatz and Residenzplatz has existed in its present form since 1974 and is counted among the oldest in the world in its tradition; it draws close to a million visitors a season. Around it, the fortress opens its courtyards for an Advent market, Hellbrunn does the same in its palace yard, and an ice rink appears on Mozartplatz.</p>
<p>This walk strings the winter places together and says honestly what is closed: the Mirabell dwarf garden, the hedge theatre, the Hellbrunn fountains, and for six weeks the Untersberg cable car. Theresa leads; this is her season. Alois carries the mulled wine and the opinions.</p>`,
  before: `<ul>
<li><b>Salzburg Christmas Market (Christkindlmarkt)</b> on Domplatz and Residenzplatz: 19 November 2026 to 1 January 2027. <b>Ice rink</b> on Mozartplatz: 12 November 2026 to 31 January 2027. <b>Old Town New Year's Eve</b> on Kapitelplatz: 31 December 2026 to 1 January 2027 (christkindlmarkt.co.at, checked 6 November 2026). Daily opening hours of the stalls vary by weekday; check the market's site.</li>
<li><b>Hohensalzburg Fortress</b> in winter: 9.30 a.m.–5 p.m., Advent weekends to 6 p.m., 24 December 9.30 a.m.–2 p.m.; on Advent market days the interiors are open until 6 p.m. From 11 January to 14 March 2027 the fortress railway is closed for revision and the fortress is reached on foot only (salzburg.info, checked 6 November 2026). Dates of the fortress Advent market: check festung-hohensalzburg.at.</li>
<li><b>Hellbrunn:</b> the palace and trick fountains are closed from 2 November 2026; the park is open and the courtyard hosts an Advent market (salzburg.info). Dates: check the operator's site.</li>
<li><b>Mirabell Gardens</b> stay open daily with partial winter closures; the dwarf garden and hedge theatre are closed in winter; the Orangery Garden is closed for redesign until December 2026 (salzburg.info, status 10/2026).</li>
<li><b>Untersberg cable car:</b> closed 2 November to about 13 December 2026, then 9 a.m.–4 p.m. (salzburg.info, status 10/2026).</li>
</ul>`,
  sketch: {
    backdrop: '<rect class="s-water" x="0" y="40" width="600" height="26" rx="13"/><path class="s-hill" d="M330 300 Q 440 190 560 300 Z"/>',
    points: [
      { x: 110, y: 110, label: 'Mozartplatz ice rink', lx: 16 }, { x: 200, y: 150, label: 'Residenzplatz market', lx: 16 }, { x: 260, y: 200, label: 'Domplatz market', lx: 16 },
      { x: 330, y: 245, label: 'Kapitelplatz', lx: 16 }, { x: 430, y: 220, label: 'Fortress in Advent', lx: 16, ly: -8 }, { x: 60, y: 60, label: 'Mirabell in winter', lx: 16, ly: -14 }, { x: 530, y: 280, label: 'Hellbrunn courtyard', lx: -16, anchor: 'end', ly: -12 }
    ]
  },
  stations: [
    {
      id: 'ws-mozartplatz', title: 'Mozartplatz and the ice rink', where: 'Mozartplatz, from 12 November', minutes: 30,
      img: { file: 'winter-salzburg/01-icerink.jpg', alt: 'Open-air ice rink on Mozartplatz in Salzburg with skaters, the Mozart statue and lit house fronts' },
      body: `<p>Start on Mozartplatz, where from mid-November an open-air ice rink is set up around the statue. Skates can be hired on the spot, and the rink is used by school classes in the morning and by families and couples in the afternoon and evening, when the lights come on and music plays. It runs until the end of January, well beyond the markets, so it is also the winter thing to do if you come in the quiet weeks after New Year.</p>
<p>If you do not skate, the benches around the rink are a good place to watch the square work: the carillon in the tower of the New Residence at 11 a.m. and 6 p.m., the tourist office at number 5 for maps and current opening hours, and the smell of roasted almonds from the first stalls on the Residenzplatz side. Dress warmer than you think; the squares channel the wind.</p>`,
      alois: 'The statue has stood in snow for 180 winters. The rink is new; the idea of a square as a place to play is old. Mozart would have skated, badly, and laughed.',
      theresa: 'Hire skates for half an hour even if you are not good. Then warm your hands on a cup of something at the edge. It is the cheapest fun in winter Salzburg, and the stalls are ten steps away.',
      task: 'Watch the skaters for two minutes and find the one who is the most careful and the one who is the most reckless. Then decide which you would be, and whether that changes with the music.'
    },
    {
      id: 'ws-residenzplatz', title: 'The market on Residenzplatz', where: 'Residenzplatz, 19 November to 1 January', minutes: 40,
      img: { file: 'winter-salzburg/02-residenzplatz.jpg', alt: 'Christmas market stalls around the Residence Fountain in Salzburg with lights strung overhead at night' },
      body: `<p>The Residenzplatz half of the market fills the big square around the fountain, which is boarded up for the winter to protect the marble. The stalls are wooden huts in a traditional style with a lighting design that is meant to look like a starry sky over the square. The market has been run in its current form since 1974, and the stallholders are chosen for crafts and food that belong to the region: wooden toys, felted and knitted things, candles, beeswax, smoked sausages, gingerbread, roasted chestnuts and the mulled wine and punch that keep everyone warm.</p>
<p>Come on a weekday afternoon if you can; Saturday evenings are crowded, and the Advent Sundays most of all. Choir performances and brass music take place on a small stage on some days. Look at the facades of the Old and New Residence lit above the stalls; the market is the one time of year when the square is full for weeks and the buildings are the backdrop rather than the point.</p>`,
      alois: 'Fifty-five houses were cleared for this square so that an archbishop could hold processions. Now it holds a market for six weeks, and the fountain hides under boards. Squares outlast the reasons for them.',
      theresa: 'Try the Bosna from the stand by the fountain if you eat meat, and the Bratapfel, baked apple, if you do not. Buy a wooden toy from the maker who is standing behind the stall; ask who made it, and you will get a story.',
      task: 'Choose one stall and find out whether the person selling made the goods. Then look up at the lights and find where they are fixed to the buildings. Someone climbs up there every November.'
    },
    {
      id: 'ws-domplatz', title: 'Domplatz, the cathedral and the crib', where: 'Cathedral Square, inside the cathedral', minutes: 30,
      img: { file: 'winter-salzburg/03-domplatz.jpg', alt: 'Christmas market on Domplatz in Salzburg in front of the cathedral facade with a decorated tree' },
      body: `<p>Through the arcades is the Domplatz half of the market, smaller and more intimate, under the cathedral facade with the Marian column in the middle of the stalls. The big tree stands here, and this is where the choirs sing. Go into the cathedral: in Advent and at Christmas it shows a large crib, the organs play at the midday concerts, and the marble is cold enough to feel through your shoes. Entry is by paid admission, which keeps the building standing.</p>
<p>The cathedral has a December story of its own: in the bronze font of 1311 at the back of the nave, the priest Joseph Mohr was baptised in 1792. He grew up a few hundred metres away in the Steingasse and later wrote the words of a carol first sung in Oberndorf, twenty kilometres north, on Christmas Eve 1818, which has since been translated into hundreds of languages. The chapel in Oberndorf is a short train ride and a separate afternoon.</p>`,
      alois: 'A carol written by a poor priest from the Steingasse, first sung in a village church because the organ was broken. Salzburg sells it on every stall now. The font is still here, and nobody queues for it.',
      theresa: 'If you are here on an Advent weekend, the choirs on Domplatz sing in the late afternoon. Stand at the back by the arcades with a hot drink; the sound carries and it is less crowded.',
      task: 'Inside the cathedral, find the baptismal font with the lions. Then outside, listen for any music being sung on the square. Think about how far a tune can travel from one font and one village church.'
    },
    {
      id: 'ws-kapitelplatz', title: 'Kapitelplatz, the way up and New Year\'s Eve', where: 'Below the fortress', minutes: 15,
      img: { file: 'winter-salzburg/04-kapitelplatz.jpg', alt: 'Kapitelplatz in winter with the golden sphere sculpture, light snow and the fortress railway station below the castle' },
      body: `<p>South of the cathedral, Kapitelplatz is quieter in Advent, with the golden sphere sculpture and the horse pond in its winter cover, and the fortress railway leaving from Festungsgasse at the corner. On 31 December the square becomes the Old Town's New Year's Eve party with a stage and music into the first hours of the year; the fireworks are watched from here and from the bridges.</p>
<p>In the 2026/27 winter the railway runs through the Advent season and into early January, then closes for revision from 11 January to 14 March 2027, when the fortress is reached on foot only. The footpath is cleared but can be icy; the walk up takes fifteen to twenty minutes with care. Decide here whether you go up now, in daylight, or come back for the lit castle after dark.</p>`,
      alois: 'The fortress has watched 950 New Year’s Eves from up there. Fireworks are recent; bells are old. If you are here at midnight, listen for the cathedral bells under the noise.',
      theresa: 'The footpath in winter needs good soles; in a hard frost take the railway while it runs. Up top the courtyard market has the best view of any Advent stall in Austria.',
      task: 'From Kapitelplatz look at the fortress and decide where on its walls you would stand at midnight on New Year’s Eve. Then look at the chessboard; in winter someone still plays. Find out who.'
    },
    {
      id: 'ws-fortress', title: 'The fortress in Advent', where: 'Hohensalzburg courtyards and the Advent market', minutes: 90,
      img: { file: 'winter-salzburg/05-fortress-advent.jpg', alt: 'Advent market stalls in the inner courtyard of Hohensalzburg Fortress with snow on the roofs and lanterns' },
      body: `<p>On Advent weekends the fortress courtyards hold their own market, smaller than the one in town and higher: crafts, food, music, and children's programmes between walls that are five hundred years old. On market days the interiors and museums stay open until 6 p.m., so you can combine the stalls with the prince's rooms and the panorama tour, and come out onto the bastions as the lights come on in the city below.</p>
<p>In winter the fortress keeps 9.30 a.m. to 5 p.m. hours, with the Advent weekends to 6 p.m. and 24 December to 2 p.m.; last admission is half an hour before closing. The view from the walls on a cold clear day reaches to the snow on the Untersberg and the Berchtesgaden peaks, with the river steaming below. The courtyards are stone and can be icy, and the wind on the bastions is sharp: gloves and a hat, and a hot drink from the stalls.</p>`,
      alois: 'The archbishops spent their winters down in the Residence with the stoves; the fortress was for garrisons and prisoners. Now the warmest place on the hill is a punch stall. History improves.',
      theresa: 'Go up in the last hour of daylight. Walk the walls while it is light, buy something hot as the stalls light up, and ride down with the city sparkling. That is my favourite Salzburg evening of the year.',
      task: 'From the bastion, find the lights of the two market squares below and the dark shape of the Kapuzinerberg across the river. Then find one lit window in the Old Town that is not a shop. Someone lives there; the city is not only a market.'
    },
    {
      id: 'ws-mirabell', title: 'Mirabell in winter', where: 'Mirabell Gardens, across the river', minutes: 25,
      img: { file: 'winter-salzburg/06-mirabell-winter.jpg', alt: 'Mirabell Gardens in winter with bare clipped hedges, the fountain shut off and the fortress in cold light' },
      body: `<p>Cross the river to the Mirabell Gardens, which stay open daily in winter from about 6 a.m. until dusk, with partial closures. The parterre beds are empty, the fountains are off and boarded, and the famous axis is clearer than ever because nothing is in flower to distract you: hedges, gravel, the palace, and the fortress on its hill, sometimes with snow. The dwarf garden and the hedge theatre are closed in the winter months; the Orangery Garden is closed for redesign until December 2026.</p>
<p>The palace's angel staircase is open on weekdays and Saturdays; the Marble Hall at its set hours, if no event is on. In Advent, concerts in the hall are frequent and sell out; the hall is also a wedding venue through the winter. On a bright frosty morning the gardens are empty and beautiful; on a grey afternoon they are grey, and the cafés of the Linzergasse are a better idea.</p>`,
      alois: 'Baroque gardens were drawn for winter as much as summer: the pattern of the beds is the point, and in December you see the drawing. The gardener’s plan of 1690 is lying on the ground in front of you.',
      theresa: 'The orangery used to be the place to warm up and see green things in January; it is being redone this year. Instead, cross to the Linzergasse for a coffee and a Krapfen, the jam-filled doughnut of the season.',
      task: 'Walk the main axis from the palace to the far end and count the steps. Then look back. Without flowers, which part of the garden holds the eye longest: the hedges, the statues or the fortress?'
    },
    {
      id: 'ws-hellbrunn', title: 'Optional: Hellbrunn\'s courtyard market', where: 'Hellbrunn Palace, south of the city, Advent weekends', minutes: 120,
      img: { file: 'winter-salzburg/07-hellbrunn-advent.jpg', alt: 'Advent market in the courtyard of Hellbrunn Palace with Christmas trees, lanterns and the palace facade in the evening' },
      body: `<p>If you have an afternoon, take bus 25 to Hellbrunn. The trick fountains and the palace are closed for the winter, but the courtyard and the old palace entrance become an Advent market that many locals prefer to the one in town: a forest of Christmas trees, lanterns, an Advent calendar made of the palace windows, crafts and food, and the park open for a cold walk afterwards. Check the market's dates on the Hellbrunn site; it runs on the Advent weekends and some weekdays.</p>
<p>The avenue, the Hellbrunner Allee, is a fine winter walk on a frosty day with the bare old trees and the mountain behind them, and the park's long pond sometimes freezes at the edges. There are no fountains to get you wet, which Alois counts as the one advantage of the season. Take the bus back in the dark; the avenue is unlit.</p>`,
      alois: 'The archbishop closed Hellbrunn for the winter and so does the city; the market is the modern way of saying the palace is still awake. The water sleeps under the hill until April.',
      theresa: 'This is the market I take my family to: fewer people, trees everywhere, and the palace windows lit one more each day. Bring children; there is usually something for them to do, and the park is a playground.',
      task: 'Count the Christmas trees in the courtyard until you lose count. Then find the window of the palace that is lit today and work out the date. Then go for a walk in the dark park and listen for the water that is not running.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>Three hours in town for the squares, the cathedral and the gardens; a full day with the fortress and Hellbrunn. The Old Town is flat but cobbles freeze; wear shoes with grip. Sunset in December is before 4.30 p.m., so plan the viewpoints for the middle of the day and the markets for after dark. The quietest market hours are weekday mornings and the days between Christmas and New Year.</p>
<p>What is closed: the Hellbrunn fountains and palace (from 2 November), the Mirabell dwarf garden and hedge theatre, the Untersberg cable car (2 November to about 13 December), and the fortress railway from 11 January 2027. Everything else in the <a href="/tours/">walk series</a> works in winter with warm clothes. Add the stops to your <a href="/planner/">day planner</a>.</p>`,
  sources: [
    { label: 'Salzburg Christmas Market (Christkindlmarkt), ice rink, New Year\'s Eve – official site (dates 2026/27)', url: 'https://www.christkindlmarkt.co.at/en/' },
    { label: 'Hohensalzburg Fortress – Salzburg Tourism (winter hours, railway revision 2027)', url: 'https://www.salzburg.info/en/sights/top10/hohensalzburg-fortress' },
    { label: 'Hellbrunn Palace – Salzburg Tourism (season, Advent market in the courtyard)', url: 'https://www.salzburg.info/en/sights/top10/hellbrunn-palace-trick-fountains' },
    { label: 'Mirabell Palace & Gardens – Salzburg Tourism (winter closures)', url: 'https://www.salzburg.info/en/sights/top10/mirabell-palace-gardens' },
    { label: 'Untersberg cable car – Salzburg Tourism (maintenance closure)', url: 'https://www.salzburg.info/en/sights/excursions/cable-car-untersberg' },
    { label: 'Salzburg Cathedral – Salzburg Tourism (baptismal font, Joseph Mohr)', url: 'https://www.salzburg.info/en/sights/churches-cemeteries/salzburger-cathedral' }
  ]
};
