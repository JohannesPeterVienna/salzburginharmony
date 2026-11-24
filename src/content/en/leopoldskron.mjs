// Walk 4: Leopoldskron – the pond, the palace from outside, the meadows
export default {
  slug: 'leopoldskron',
  title: 'Leopoldskron: a Palace Seen Across the Water',
  short: 'Leopoldskron',
  kicker: 'Walk 4 · Flat, green, mostly quiet',
  desc: 'A self-guided walk from Nonntal to the Leopoldskron pond, along its public paths with the palace and fortress in view, and out to the Moos meadows. The palace is private.',
  hero: { file: 'leopoldskron/hero.jpg', alt: 'Leopoldskron Palace seen across the still water of the Leopoldskroner Weiher with Hohensalzburg Fortress on the hill behind' },
  facts: { duration: 'about 1.5–2 hours', length: 'about 4 km, flat, gravel and asphalt', start: 'Kajetanerplatz or Nonntal', cost: 'free · palace and park are private, exterior view only' },
  intro: `<p>Leopoldskron is a baroque palace on a pond at the southern edge of the city, built in 1736 by Prince-Archbishop Leopold Anton von Firmian as a residence for his family. Max Reinhardt, the theatre director, bought it in 1918, restored it over twenty years and made it a meeting place for artists; the Salzburg Festival was founded by him, Hugo von Hofmannsthal and Richard Strauss in those years. Today it is a hotel and seminar venue. The palace and its park are closed to the public, and this walk respects that.</p>
<p>What you can have, freely, is the view: the palace reflected in the pond, with the fortress on its hill behind it, from a public path along the water. Dora likes this walk in the evening; Anton says the morning mist on the pond is the best thing Salzburg does for free.</p>`,
  before: `<ul>
<li><b>The palace and park are not open to the public.</b> Access is reserved for hotel guests and invited participants. Do not enter the gates, the drive or the lawns; photograph only from public paths and respect the privacy of guests (salzburg.info, checked 6 November 2026).</li>
<li><b>The pond</b> (Leopoldskroner Weiher, about 13 hectares) belongs to the listed palace park. Public paths run along parts of its shore; where a gate or sign marks private ground, turn back. Paths are unlit at night. The municipal open-air pool next to the pond, opened in 1964, has its own season and admission. Feeding the water birds is forbidden all year. Do not walk on the ice in winter unless it is officially released (Wikipedia, Leopoldskroner Weiher, accessed 24 November 2026).</li>
<li><b>Getting there:</b> on foot from the Old Town in about 20–25 minutes; use a city map or the signposts to Leopoldskron, as the route through the residential streets is not marked as a trail. City buses run to the area; check the Salzburg AG timetable for the current line and stop.</li>
</ul>`,
  sketch: {
    backdrop: '<ellipse class="s-water" cx="330" cy="190" rx="150" ry="70"/><path class="s-hill" d="M0 0 L140 0 Q 100 60 0 70 Z"/><rect class="s-green" x="480" y="200" width="120" height="100"/>',
    points: [
      { x: 80, y: 60, label: 'Kajetanerplatz', lx: 16 }, { x: 150, y: 130, label: 'Leopoldskronstraße', lx: 16, ly: -8 }, { x: 230, y: 150, label: 'Pond, first view', lx: -16, anchor: 'end', ly: 18 },
      { x: 330, y: 118, label: 'Palace from outside', lx: 16, ly: -8 }, { x: 410, y: 250, label: 'Along the shore', lx: 16 }, { x: 520, y: 240, label: 'Moos meadows', lx: -16, anchor: 'end', ly: -10 }
    ]
  },
  stations: [
    {
      id: 'lk-start', title: 'Out through Nonntal', where: 'Kajetanerplatz, Nonntaler Hauptstraße, Leopoldskronstraße', minutes: 25,
      img: { file: 'leopoldskron/01-nonntal.jpg', alt: 'Residential street in Nonntal, Salzburg, with villas, gardens and the Festungsberg behind' },
      body: `<p>Leave the Old Town at Kajetanerplatz and head south into Nonntal, with the hill of the fortress on your right, then follow the signposts and your map towards Leopoldskron. The baroque ends quickly here; what follows is 19th- and 20th-century Salzburg, villas with gardens, a school, a few shops. The last stretch is Leopoldskronstraße, the street that ends at the palace, between hedges and old trees.</p>
<p>This stretch is ordinary in the best sense. People walk dogs, children cycle to school, and nobody is selling anything. It gives you a sense of how the city lives outside its postcard centre, and it is flat the whole way, which makes it a good walk for anyone who found the hill walks too much.</p>`,
      anton: 'You are walking the road the archbishop took from his town residence to his family palace. Two kilometres, by carriage. He would not have noticed the villas; they came a century after him.',
      dora: 'In spring the gardens along here are full of lilac and in autumn there are apples on the trees behind the fences. Look, do not pick. Salzburgers are proud of their gardens.',
      task: 'Count the different kinds of fence or garden wall you pass in five minutes. Then decide which house you would most like to live in and why; the answer tells you something about what you want from a city.'
    },
    {
      id: 'lk-pond', title: 'The pond: first view', where: 'Public paths by the Leopoldskroner Weiher, beside the palace grounds', minutes: 15,
      img: { file: 'leopoldskron/02-pond.jpg', alt: 'Reeds and calm water of the Leopoldskroner Weiher with the palace facade small in the distance' },
      body: `<p>The water opens out beside the palace grounds: about thirteen hectares of shallow pond with reeds, islands, ducks, swans and grebes. The pond is older than the house. It was laid out before 1500, probably to catch surplus water from the Almkanal, and in 1728 Archbishop Firmian bought it together with the neighbouring estate and built his palace directly on its shore, the first archbishop's summer residence to face a pond rather than a river.</p>
<p>Keep to the public paths along the shore; the palace park beside them is private and fenced. Remember the geography: the fortress lies north-east of the pond, so the classic picture with the palace in front and the fortress behind it is taken from the far, south-western side of the water, with the light best in the afternoon.</p>`,
      anton: 'A pond, a palace and a fortress in one frame: archbishops liked to be seen owning both the water and the view. Firmian chose this shore on purpose, and the frame has not changed.',
      dora: 'Swans nest in the reeds in spring. Keep dogs on the lead and children on the path, and leave the bread at home: feeding is forbidden here because it makes the birds ill in the shallow water.',
      task: 'Stand at the water’s edge and look at the reflection before you look at the palace. Which is more complete, the building or its mirror image? Note what the wind does to the picture while you watch.'
    },
    {
      id: 'lk-palace', title: 'The palace from outside', where: 'Public path near the palace, outside the fence', minutes: 20,
      img: { file: 'leopoldskron/03-palace.jpg', alt: 'Baroque garden front of Schloss Leopoldskron seen from the public path, with a stone balustrade and the water in front' },
      body: `<p>From the public paths you see the palace across the fence or the water. Firmian commissioned it in 1736 as a family seat with a chapel, a few years after he had expelled more than twenty thousand Protestants from the archbishopric; he was so attached to the house that after his death in 1744 his heart was buried in the chapel. After Firmian's family sold it the house changed hands many times and was in poor condition when Max Reinhardt bought it in 1918.</p>
<p>Reinhardt restored it room by room, furnished it with pieces from all over Europe, and filled it with actors, writers and composers; the Marble Hall, the library and the Venetian room are known from photographs. He fled Austria in 1938, the house was confiscated in 1939 as so-called Jewish property, and he died in New York in 1943. Since 1947 it has been the home of an international seminar organisation, and since 2014 it has also been run as a hotel. None of this is visible from the path, which is the point of mentioning it: the facade you see has a history far larger than its stucco.</p>`,
      anton: 'Reinhardt gave Salzburg its festival and lost his house for being Jewish. When you look at this facade, think of 1938 as well as 1736, and of the Protestants Firmian drove out to pay for it.',
      dora: 'The hotel guests have breakfast on the terrace facing you. Smile, wave if you like, but do not walk up to the fence with a camera at their table. It is their holiday too.',
      task: 'From the path, decide how many floors the palace has and where the chapel might be. Then imagine the house in 1930 with a theatre company in residence. Which window would have had the light on latest?'
    },
    {
      id: 'lk-round', title: 'Along the shore', where: 'Public shore paths, the open-air pool, the southern end', minutes: 30,
      img: { file: 'leopoldskron/04-round.jpg', alt: 'Gravel footpath along the western shore of the Leopoldskron pond lined with old trees' },
      body: `<p>Continue along the public paths by the water, past the municipal open-air pool, opened in 1964 and busy on hot summer days, and some of the biggest old trees in the district. At the southern end of the pond stands a statue of St. John of Nepomuk, carved in 1741 from white Untersberg marble by Anton Pfaffinger, one of the few sculptures of the palace park that survive. From the southern and western side the view turns around: now the palace stands between you and the fortress, and the whole Festungsberg rises behind it.</p>
<p>This is the stretch for a slow walk and a conversation. Grey herons stand in the shallows, anglers with a day licence sit on the bank, and in a cold winter the pond freezes to a grey sheet. Do not go onto the ice unless it is officially released.</p>`,
      anton: 'From the south you see the fortress the way an army would have seen it, from the plain. There is no gentle side. Then turn around: the Untersberg, the mountain of a hundred legends, fills the south. Both are in one glance.',
      dora: 'The lido is where Salzburg families spend hot July afternoons: lawns, a kiosk, cold water. If you are here in summer with children, bring swimming things and stay for the afternoon.',
      task: 'Find the statue at the southern end and look at it the way it looks: across the water. Then decide which you would rather have built here in 1741, a saint or a bench.'
    },
    {
      id: 'lk-moos', title: 'Out to the Moos meadows', where: 'Beyond the pond towards Leopoldskroner Moos', minutes: 25,
      img: { file: 'leopoldskron/05-moos.jpg', alt: 'Flat open meadows of the Leopoldskroner Moos south of Salzburg with the Untersberg massif on the horizon' },
      body: `<p>South of the pond the city thins out and the Moos begins: flat, open meadows on drained moorland, crossed by lanes, with farms, a few riding stables and the Untersberg filling the horizon. It is the widest open space inside the city limits and a favourite with runners and cyclists. Walk out along any lane for ten minutes and the view back to the fortress, now small above the trees, is worth the detour.</p>
<p>If you keep going south you eventually reach the villages at the foot of the Untersberg and the valley station of its cable car, which is the subject of the <a href="/tours/untersberg/">Untersberg day</a>. For this walk, turn around when you have had enough of the flatness and go back along the pond the other way.</p>`,
      anton: 'This was moorland before it was drained for meadows and farms. Out here the fortress stops being the centre of everything and becomes a small grey block on the horizon. That is a useful thing to see.',
      dora: 'In late summer the meadows are cut and the air smells of hay. In winter you can see across to Bavaria. Bring a scarf; there is nothing here to stop the wind.',
      task: 'Walk until the fortress is smaller than your thumb at arm’s length. Note how long that took. Distance in Salzburg is measured by how big the castle looks, and you now have your own scale.'
    },
    {
      id: 'lk-back', title: 'Back to town', where: 'Leopoldskronstraße, Nonntal, Kajetanerplatz', minutes: 25,
      img: { file: 'leopoldskron/06-back.jpg', alt: 'Evening light on the Leopoldskron pond with the palace and fortress silhouetted against the sky' },
      body: `<p>Return the way you came. In the evening the pond is at its best: the fortress is lit from below and the water holds the light. It is about twenty-five minutes back to Kajetanerplatz on foot, or check the timetable for a bus.</p>
<p>If you want to extend the day, the <a href="/tours/nonnberg/">Nonnberg walk</a> begins where this one ends, and the convent's evening Vespers at 5 p.m. make a fitting close. Or simply stop at a café in Nonntal, which is what most people who live here would do.</p>`,
      anton: 'The archbishop’s carriage went back this way after dinner, lanterns swinging. The road is the same. Walk it slowly and the city comes back to you one lit window at a time.',
      dora: 'The last light on the fortress from the pond is the picture I would keep. Take one photograph and then put the phone away for the walk back.',
      task: 'On the way back, name the moment the city sounds louder than the pond. That line, wherever it is for you, is the real edge of Salzburg.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p><b>Accessibility:</b> this is the flattest walk in the series. The streets from the Old Town are asphalt and step-free; the shore paths are gravel and can be muddy after rain, which matters for wheelchairs and prams. There are no public toilets on the shore paths outside the pool's season; use a café in Nonntal before you set out.</p>
<p>Allow ninety minutes to two hours.</p>
<p>Please remember that the palace is private. Guided city tours sometimes stop at the fence; follow the same rule they do and stay outside. Add the stops to your <a href="/planner/">day planner</a>.</p>`,
  sources: [
    { label: 'Leopoldskron Palace – Salzburg Tourism (not open to the public)', url: 'https://www.salzburg.info/en/sights/fortress-palaces/leopoldskron-palace' },
    { label: 'Schloss Leopoldskron – Wikipedia (history, Max Reinhardt)', url: 'https://en.wikipedia.org/wiki/Schloss_Leopoldskron' },
    { label: 'Leopoldskroner Weiher – Wikipedia, German (size, history, Nepomuk statue, pool, feeding ban)', url: 'https://de.wikipedia.org/wiki/Leopoldskroner_Weiher', accessed: '24 November 2026' }
  ]
};
