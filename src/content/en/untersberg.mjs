// Walk 7: Untersberg – the mountain in the south, by cable car
export default {
  slug: 'untersberg',
  title: 'Untersberg: Salzburg’s Mountain by Cable Car',
  short: 'Untersberg',
  kicker: 'Walk 7 · A day above the city',
  desc: 'A self-guided day on the Untersberg: bus to Grödig, cable car to 1,776 m, the summit walk to the Salzburger Hochthron, legends and marble, with 2026 hours and closures.',
  hero: { file: 'untersberg/hero.jpg', alt: 'Snow-covered Untersberg summit above the Salzburg basin on a clear winter day' },
  facts: { duration: 'about 5 hours including travel', length: 'about 3 km of walking at the top, with roughly 100 m of climb; more if you extend', start: 'Grödig/St. Leonhard valley station (456 m), buses 25, 28 or trolleybus 5', cost: 'return ride adults € 34.00, children 6–14 € 13.00, 2026 prices · included in the Salzburg Card' },
  intro: `<p>The Untersberg is the mountain you have been looking at all week: the flat-topped massif that closes the view south from the fortress, from Nonnberg, from the Leopoldskron pond. It stands on the border between Austria and Bavaria, its highest point is in Germany, and its Austrian summit, the Salzburger Hochthron, is 1,853 metres high. A cable car from the village of Grödig carries you to 1,776 metres in eight and a half minutes, and from the top station a path along the ridge leads to the summit in about half an hour.</p>
<p>This is the one walk in the series that leaves the city, and the one that needs the most checking before you go: the cable car has maintenance closures, the weather changes fast, and the top is high alpine terrain in every season. Anton knows the legends. Dora packs the rucksack.</p>`,
  before: `<ul>
<li><b>Closures:</b> the cable car does not run from 2 November to about 13 December 2026 (autumn maintenance) and from 30 March to 16 April 2027 (spring maintenance); dates subject to change (salzburg.info, status 10/2026, checked 6 November 2026).</li>
<li><b>Operating hours 2026:</b> January–February 9 a.m.–4 p.m.; March and April (from 30 March) 8.30 a.m.–5 p.m.; May–September 8.30 a.m.–5.30 p.m.; October–1 November 8.30 a.m.–5 p.m.; from 14 December 9 a.m.–4 p.m.; 24 December 9 a.m.–12 p.m. Last ride up 30 minutes before closing; cars every hour and half hour, more when busy (salzburg.info, status 10/2026).</li>
<li><b>Prices 2026, return:</b> adults € 34.00, seniors 65+ € 29.00, youth 14–18 and students € 18.00, children 6–14 € 13.00, under 6 free; one way adults € 22.00. The Salzburg Card includes one return ride and must still be active for the descent (salzburg.info, status 10/2026).</li>
<li><b>Safety:</b> the top station is high alpine terrain. Good footwear, warm and wind-proof clothing, water and sun protection are needed in every season; snow can lie on the ridge into June. The operator's weather line is listed on salzburg.info. Do not leave the marked paths; the plateau has sinkholes and cliffs.</li>
</ul>`,
  sketch: {
    backdrop: '<path class="s-hill" d="M0 300 L0 250 Q 150 60 320 70 Q 520 60 600 250 L600 300 Z"/>',
    points: [
      { x: 70, y: 270, label: 'Grödig valley station', lx: 16, ly: -10 }, { x: 200, y: 150, label: 'Cable car ride', lx: 16 }, { x: 300, y: 90, label: 'Geiereck top station', lx: 16, ly: -8 },
      { x: 420, y: 95, label: 'Salzburger Hochthron', lx: 16, ly: 18 }, { x: 350, y: 140, label: 'Plateau & legends', lx: 16, ly: 18 }, { x: 500, y: 270, label: 'Fürstenbrunn & marble', lx: -16, anchor: 'end', ly: -10 }
    ]
  },
  stations: [
    {
      id: 'ub-valley', title: 'Grödig and the valley station', where: 'St. Leonhard, about 10 km south of the city', minutes: 20,
      img: { file: 'untersberg/01-valley.jpg', alt: 'Valley station of the Untersberg cable car in Grödig with the steep forested mountain face behind' },
      body: `<p>The valley station stands at 456 metres in St. Leonhard, a part of the village of Grödig, roughly ten kilometres south of the city. Buses 25 and 28 and the trolleybus line 5 stop nearby; by car there is managed parking. From the stop the mountain is already overwhelming: a wall of limestone and forest rising more than 1,300 metres in one sweep, with the cable in a straight line up it and the two gondolas crossing in the middle.</p>
<p>Buy your return ticket here or use the Salzburg Card, which gives fast entry without exchanging at the counter. Look at the weather board before you commit; if the top is in cloud, the ride is still spectacular but the walk is not, and the operator will tell you honestly. The cars run every hour and half hour, more often when there is a queue.</p>`,
      anton: 'The railway was built between 1958 and 1961, which for a mountain this size counts as yesterday. Before that you walked up, five hours, and most of Salzburg never did.',
      dora: 'Check the board, then the sky, then your bag: water, a warm layer, something to eat, sun cream. The top is colder than the valley by eight to ten degrees even in July.',
      task: 'Before you get in, look up and find the top station on the ridge. Follow the cable with your eye from the valley to the top. Then estimate how long it would take you to walk the same line. The ride takes eight and a half minutes.'
    },
    {
      id: 'ub-ride', title: 'The ride up', where: 'Gondola, 1,320 m of height difference in 8½ minutes', minutes: 15,
      img: { file: 'untersberg/02-ride.jpg', alt: 'View from inside the Untersberg gondola looking down on treetops, the valley floor and the city of Salzburg in the distance' },
      body: `<p>Each of the two gondolas holds fifty people. Stand on the valley side as you leave: the forest drops away, the villages shrink, and then the city appears in the north with the river as a grey line and the fortress as a small block on its hill. Partway up the car passes a pylon and swings; then the limestone face comes close enough to see cracks and small pines growing out of them.</p>
<p>The height difference is 1,320 metres, from 456 to 1,776, which is more than many Alpine lifts; the ride takes eight and a half minutes. On clear days the view opens north over the Salzburg plain to the lakes of the Salzkammergut in the east and the Chiemsee in Bavaria to the west. The last minute is the steepest, with the top station growing out of the cliff above you.</p>`,
      anton: 'Everything you walked on the other days fits inside your thumbnail from here: the gardens, the squares, the two hills. A city is small from a mountain. That is what mountains are for.',
      dora: 'If you get nervous in cable cars, stand in the middle and look at the horizon, not down. Talk to the person next to you; everyone in the gondola is a little quiet on this stretch.',
      task: 'During the ride, find the Leopoldskron pond and the fortress. Then find the line of the Hellbrunner Allee if you have walked it. Put the whole series of walks into one picture before the top station takes it away.'
    },
    {
      id: 'ub-top', title: 'Geiereck: the top station', where: 'Mountain station at 1,776 m, terrace and the plateau edge', minutes: 30,
      img: { file: 'untersberg/03-top.jpg', alt: 'Terrace of the Untersberg mountain station with a panorama over Salzburg and the Alpine foothills under a blue sky' },
      body: `<p>The top station sits on the Geiereck at 1,776 metres with a terrace on the edge of the drop. In good visibility the panorama runs from the Dachstein massif in the east through the lakes to the Bavarian plain in the north and the Berchtesgaden peaks in the south and west, with the Watzmann the sharpest of them. There is a restaurant at the station and a chapel a few steps away.</p>
<p>This is already high alpine terrain. The paths from here are marked and well walked but go along cliff edges, over limestone that is sharp when dry and slippery when wet, and across a plateau full of sinkholes that is not to be explored off the path. If you only want the view, the terrace gives you all of it; if you want the summit, the next stop is thirty to forty minutes of walking each way with about a hundred metres of climb.</p>`,
      anton: 'The border with Germany runs across this plateau. Smugglers used it, soldiers watched it, and hikers now cross it without noticing. The mountain has never cared which side it was on.',
      dora: 'Have something warm at the restaurant before you walk; the wind on the ridge takes the heat out of you. Then go. The summit is not far and the path is clear in summer.',
      task: 'On the terrace, point to where you are staying in Salzburg. Then turn through all four directions and name one thing in each: a lake, a mountain, a town, a cloud. The exercise takes two minutes and fixes the day in your memory.'
    },
    {
      id: 'ub-hochthron', title: 'The Salzburger Hochthron', where: 'Ridge path from the Geiereck to the Austrian summit, 1,853 m', minutes: 75,
      img: { file: 'untersberg/04-hochthron.jpg', alt: 'Summit cross of the Salzburger Hochthron on the Untersberg with limestone rock and wide views over the Alps' },
      body: `<p>The path to the Salzburger Hochthron follows the edge of the plateau, mostly gently, with one short rocky section near the summit. It is marked, busy on summer weekends and quiet otherwise; in early summer there is often snow in the hollows. The summit has a cross, a bench and the kind of view that explains why people climb: the plateau stretching away to the German summit, the Berchtesgaden peaks beyond it, and the whole of the Salzburg basin at your feet.</p>
<p>Allow thirty to forty minutes each way and do not try it in low cloud, strong wind or with children who are tired; the drop on the plateau edge is real. Turn back at the same path. The German summit, the Berchtesgadener Hochthron at 1,973 metres, is a much longer walk and a different day.</p>`,
      anton: 'From here the mountain shows its real shape: not a peak but a table, kilometres wide, with hollows, caves and ice underneath. The old stories put a sleeping emperor inside it. Standing here, you understand why.',
      dora: 'There are alpine flowers along the path in June and July: gentians, alpine roses and tiny saxifrages in the rocks if you look. Photograph, do not pick; they are protected and they do not survive in a hotel glass.',
      task: 'At the summit, sit for five minutes with your back to the cross and the view in front of you. Count the lakes you can see. Then find the one road you could use to get home if the cable car stopped, and be glad it will not.'
    },
    {
      id: 'ub-legends', title: 'Legends, ice and marble', where: 'On the plateau and in your head', minutes: 15,
      img: { file: 'untersberg/05-plateau.jpg', alt: 'Limestone plateau of the Untersberg with hollows, dwarf pines and a border marker between Austria and Germany' },
      body: `<p>The Untersberg has more stories attached to it than any other mountain near Salzburg. The best known says that an emperor, Charlemagne in the Salzburg telling, sleeps inside with his knights and will wake when his beard has grown three times around the table; ravens circle the summit to check whether it is time. Others tell of the small mountain people who come down to help farmers, and of travellers who entered a cave and came out a hundred years later.</p>
<p>Some of the stories have a basis. The mountain is hollow: it has hundreds of caves, including ice caves and some of the deepest shafts in Austria, explored by cavers for a century. And it is in the city: the pale marble of the cathedral facade, the Mirabell dwarfs and most of the fountains you have seen was quarried at its foot, at Fürstenbrunn, and carried into Salzburg for four hundred years. The mountain built the town you have been walking.</p>`,
      anton: 'Every mountain has a sleeping king; this one has the best ravens. The farmers told the stories; the quarrymen cut the stone; the archbishops took the credit. That is Salzburg history in one mountain.',
      dora: 'Next time you stand in front of the cathedral, touch the marble of the facade. It is this mountain, cut and polished. The whole city is a piece of the Untersberg carried downhill.',
      task: 'Find a piece of pale limestone on the path and look at it closely. Then remember the cathedral facade. Decide for yourself whether the stories about the mountain or the stone in the city are the better reason to come up here.'
    },
    {
      id: 'ub-down', title: 'Down, and the marble village', where: 'Cable car down; optional: Fürstenbrunn and the Untersberg museum', minutes: 45,
      img: { file: 'untersberg/06-fuerstenbrunn.jpg', alt: 'Village of Fürstenbrunn at the foot of the Untersberg with the old marble quarry area and a stream' },
      body: `<p>Take the cable car down before the last ride, which leaves thirty minutes before closing; in autumn that is early. At the bottom you can simply take the bus back to the city, or walk or drive a few kilometres to Fürstenbrunn, the village at the foot of the quarries, where a small museum tells the story of the Untersberg marble and the people who cut it; its hours are limited and seasonal, so check before you go.</p>
<p>From Grödig the bus takes about half an hour back to the centre. If you still have light, the <a href="/tours/hellbrunn/">Hellbrunn</a> grounds are on the same side of the city, and the park is open after the fountains close. Otherwise, go back to the squares and look at the cathedral facade with new eyes.</p>`,
      anton: 'You have seen the city from the river, from both hills and from the mountain. There is nothing left to climb. Tomorrow walk slowly and look at the stone.',
      dora: 'If you took the bus, the stop by the valley station has a timetable; take a photo of it on the way up so you know the return times. The last cars are busy; do not cut it fine.',
      task: 'On the way down, look at the city as it comes up to meet you and choose the one walk you would do again. That is the one to tell people about.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>Five hours from the city centre and back with the summit walk; three without it. Check the closure dates above first: for most of November and early December 2026 and in early April 2027 the cable car does not run at all. The top is not step-free and the summit path is a mountain path; the terrace at the top station is reachable without walking. In winter the ridge path needs proper equipment and experience.</p>
<p>Add the stops to your <a href="/planner/">day planner</a>; count the travel time separately, which the planner does not do.</p>`,
  sources: [
    { label: 'Untersberg cable car – Salzburg Tourism (hours, prices 2026, maintenance closures, safety)', url: 'https://www.salzburg.info/en/sights/excursions/cable-car-untersberg' },
    { label: 'Untersberg – Wikipedia (summits, geology, legends)', url: 'https://en.wikipedia.org/wiki/Untersberg' }
  ]
};
