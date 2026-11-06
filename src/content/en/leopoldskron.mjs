// Walk 4: Leopoldskron – the pond, the palace from outside, the meadows
export default {
  slug: 'leopoldskron',
  title: 'Leopoldskron: a Palace Seen Across the Water',
  short: 'Leopoldskron',
  kicker: 'Walk 4 · Flat, green, mostly quiet',
  desc: 'A self-guided walk from Nonntal to the Leopoldskron pond, around the water with the palace and fortress in view, and out to the Moos meadows. The palace is private.',
  hero: { file: 'leopoldskron/hero.jpg', alt: 'Leopoldskron Palace seen across the still water of the Leopoldskroner Weiher with Hohensalzburg Fortress on the hill behind' },
  facts: { duration: 'about 1.5–2 hours', length: 'about 4 km, flat, gravel and asphalt', start: 'Kajetanerplatz or Nonntal', cost: 'free · palace and park are private, exterior view only' },
  intro: `<p>Leopoldskron is a baroque palace on a pond at the southern edge of the city, built in 1736 by Prince-Archbishop Leopold Anton von Firmian as a residence for his family. Max Reinhardt, the theatre director, bought it in 1918, restored it over twenty years and made it a meeting place for artists; the Salzburg Festival was founded by him, Hugo von Hofmannsthal and Richard Strauss in those years. Today it is a hotel and seminar venue. The palace and its park are closed to the public, and this walk respects that.</p>
<p>What you can have, freely, is the view: the palace reflected in the pond, with the fortress on its hill behind it, from a public path along the water. Theresa likes this walk in the evening; Alois says the morning mist on the pond is the best thing Salzburg does for free.</p>`,
  before: `<ul>
<li><b>The palace and park are not open to the public.</b> Access is reserved for hotel guests and invited participants. Do not enter the gates, the drive or the lawns; photograph only from public paths and respect the privacy of guests (salzburg.info, checked 6 November 2026).</li>
<li><b>The pond path</b> (Leopoldskroner Weiher) is a public footpath, free, unlit at night. In summer the lido on the western shore is open with its own admission; in winter the pond sometimes freezes, but walking on the ice is at your own risk and often forbidden.</li>
<li><b>Getting there:</b> on foot from the Old Town through Nonntal in about 20–25 minutes; city buses stop near Leopoldskronstraße (check the Salzburg AG timetable for the current line).</li>
</ul>`,
  sketch: {
    backdrop: '<ellipse class="s-water" cx="330" cy="190" rx="150" ry="70"/><path class="s-hill" d="M0 0 L140 0 Q 100 60 0 70 Z"/><rect class="s-green" x="480" y="200" width="120" height="100"/>',
    points: [
      { x: 80, y: 60, label: 'Kajetanerplatz', lx: 16 }, { x: 150, y: 130, label: 'Leopoldskronstraße', lx: 16, ly: -8 }, { x: 230, y: 150, label: 'Pond, first view', lx: -16, anchor: 'end', ly: 18 },
      { x: 330, y: 118, label: 'Palace from outside', lx: 16, ly: -8 }, { x: 410, y: 250, label: 'Around the pond', lx: 16 }, { x: 520, y: 240, label: 'Moos meadows', lx: -16, anchor: 'end', ly: -10 }
    ]
  },
  stations: [
    {
      id: 'lk-start', title: 'Out through Nonntal', where: 'Kajetanerplatz, Nonntaler Hauptstraße, Leopoldskronstraße', minutes: 25,
      img: { file: 'leopoldskron/01-nonntal.jpg', alt: 'Residential street in Nonntal, Salzburg, with villas, gardens and the Festungsberg behind' },
      body: `<p>Leave the Old Town at Kajetanerplatz and walk south along Nonntaler Hauptstraße. The baroque ends quickly here; what follows is 19th- and 20th-century Salzburg, villas with gardens, a school, a few shops, and the hill of the fortress always on your right. After about ten minutes turn right into Leopoldskronstraße, signposted. The street runs straight towards the pond between hedges and old trees.</p>
<p>This stretch is ordinary in the best sense. People walk dogs, children cycle to school, and nobody is selling anything. It gives you a sense of how the city lives outside its postcard centre, and it is flat the whole way, which makes it a good walk for anyone who found the hill walks too much.</p>`,
      alois: 'You are walking the road the archbishop took from his town residence to his family palace. Two kilometres, by carriage. He would not have noticed the villas; they came a century after him.',
      theresa: 'In spring the gardens along here are full of lilac and in autumn there are apples on the trees behind the fences. Look, do not pick. Salzburgers are proud of their gardens.',
      task: 'Count the different kinds of fence or garden wall you pass in five minutes. Then decide which house you would most like to live in and why; the answer tells you something about what you want from a city.'
    },
    {
      id: 'lk-pond', title: 'The pond: first view', where: 'North-eastern shore of the Leopoldskroner Weiher', minutes: 15,
      img: { file: 'leopoldskron/02-pond.jpg', alt: 'Reeds and calm water of the Leopoldskroner Weiher with the palace facade small in the distance' },
      body: `<p>The pond appears suddenly at the end of the street: a sheet of water about half a kilometre long, with reeds, ducks and swans, and on the far shore the yellow facade of the palace. Behind and above it the fortress completes the composition, which is exactly what the archbishop intended when he chose the site. The pond is older than the house: the archbishop bought the land around an existing fish pond and set the palace on its shore like a mirror.</p>
<p>Take the path that runs along the shore to the right. It is public, gravel, mostly level, and passes close to the palace grounds without entering them. The best photographs are from this side in the morning, when the light is behind you and the water is still. In the evening the palace is backlit and the sky over the fortress does the work instead.</p>`,
      alois: 'A pond, a palace and a fortress in one frame: archbishops liked to be seen owning both the water and the view. Reinhardt later staged plays on the lawn with the fortress as backdrop. The frame has not changed.',
      theresa: 'Swans nest in the reeds in spring. Keep dogs on the lead and children on the path; a swan defending its nest is not as pretty as it looks.',
      task: 'Stand at the water’s edge and look at the reflection before you look at the palace. Which is more complete, the building or its mirror image? Note what the wind does to the picture while you watch.'
    },
    {
      id: 'lk-palace', title: 'The palace from outside', where: 'Public path near the palace, outside the fence', minutes: 20,
      img: { file: 'leopoldskron/03-palace.jpg', alt: 'Baroque garden front of Schloss Leopoldskron seen from the public path, with a stone balustrade and the water in front' },
      body: `<p>The path brings you to within a few dozen metres of the palace, with the fence and the water between you. Firmian commissioned it in 1736 as a family seat with a chapel, a few years after he had expelled more than twenty thousand Protestants from the archbishopric; he was so attached to the house that after his death in 1744 his heart was buried in the chapel. After Firmian's family sold it the house changed hands many times and was in poor condition when Max Reinhardt bought it in 1918.</p>
<p>Reinhardt restored it room by room, furnished it with pieces from all over Europe, and filled it with actors, writers and composers; the Marble Hall, the library and the Venetian room are known from photographs. He fled Austria in 1938, the house was confiscated in 1939 as so-called Jewish property, and he died in New York in 1943. Since 1947 it has been the home of an international seminar organisation, and since 2014 it has also been run as a hotel. None of this is visible from the path, which is the point of mentioning it: the facade you see has a history far larger than its stucco.</p>`,
      alois: 'Reinhardt gave Salzburg its festival and lost his house for being Jewish. When you look at this facade, think of 1938 as well as 1736, and of the Protestants Firmian drove out to pay for it.',
      theresa: 'The hotel guests have breakfast on the terrace facing you. Smile, wave if you like, but do not walk up to the fence with a camera at their table. It is their holiday too.',
      task: 'From the path, decide how many floors the palace has and where the chapel might be. Then imagine the house in 1930 with a theatre company in residence. Which window would have had the light on latest?'
    },
    {
      id: 'lk-round', title: 'Around the pond', where: 'Western and southern shore, lido, benches', minutes: 30,
      img: { file: 'leopoldskron/04-round.jpg', alt: 'Gravel footpath along the western shore of the Leopoldskron pond lined with old trees' },
      body: `<p>Continue along the shore. The path circles the whole pond in about thirty to forty minutes, passing the public lido on the western side, a 1960s open-air pool that opens in summer, and some of the biggest old trees in the district. Benches face the water at intervals, and from the southern shore the view turns around: now the palace stands between you and the fortress, and the whole of the Festungsberg rises behind it.</p>
<p>This is the stretch for a slow walk and a conversation. Herons stand in the shallows, fishermen sit on folding stools, and in winter the pond freezes to a grey sheet with the castle reflected in the ice at the edges. Do not go onto the ice unless it is officially released, which is rare.</p>`,
      alois: 'On the south shore you see the fortress the way an army would have seen it, from the plain. There is no gentle side. Then turn around: in the south the Untersberg, Europe’s legend-mountain. Both are in one glance.',
      theresa: 'The lido is where Salzburg families spend hot July afternoons: lawns, a kiosk, cold water. If you are here in summer with children, bring swimming things and stay for the afternoon.',
      task: 'Find the bench with the best view and sit on it. Then find the bench the locals sit on, which is probably not the same one. What does each bench face, and what does that tell you?'
    },
    {
      id: 'lk-moos', title: 'Out to the Moos meadows', where: 'Beyond the pond towards Leopoldskroner Moos', minutes: 25,
      img: { file: 'leopoldskron/05-moos.jpg', alt: 'Flat open meadows of the Leopoldskroner Moos south of Salzburg with the Untersberg massif on the horizon' },
      body: `<p>South of the pond the city stops and the Moos begins: flat, open meadows and fields drained from an old moor, criss-crossed by lanes and ditches, with farms, a few riding stables and the Untersberg filling the horizon. It is the widest open space inside the city limits and a favourite with runners and cyclists. Walk out along any lane for ten minutes and the view back to the fortress, now small above the trees, is worth the detour.</p>
<p>If you keep going south you eventually reach the villages at the foot of the Untersberg and the valley station of its cable car, which is the subject of the <a href="/tours/untersberg/">Untersberg day</a>. For this walk, turn around when you have had enough of the flatness and go back along the pond the other way.</p>`,
      alois: 'This moor fed the city with peat for heating until the 20th century. The lanes are the old peat tracks. The farmers here were the last people in Salzburg to see the fortress as a workplace rather than a monument.',
      theresa: 'In late summer the meadows are cut and the air smells of hay. In winter you can see across to Bavaria. Bring a scarf; there is nothing here to stop the wind.',
      task: 'Walk until the fortress is smaller than your thumb at arm’s length. Note how long that took. Distance in Salzburg is measured by how big the castle looks, and you now have your own scale.'
    },
    {
      id: 'lk-back', title: 'Back to town', where: 'Pond path, Leopoldskronstraße, Nonntal', minutes: 25,
      img: { file: 'leopoldskron/06-back.jpg', alt: 'Evening light on the Leopoldskron pond with the palace and fortress silhouetted against the sky' },
      body: `<p>Return the way you came or along the opposite shore. In the evening the pond is at its best: the palace lights come on, the fortress is lit from below, and the water holds both. From the north-eastern corner it is twenty-five minutes back to Kajetanerplatz on foot, or a few minutes to the nearest bus stop on Leopoldskronstraße.</p>
<p>If you want to extend the day, the <a href="/tours/nonnberg/">Nonnberg walk</a> begins where this one ends, and the convent's evening Vespers at 5 p.m. make a fitting close. Or simply stop at a café in Nonntal, which is what most people who live here would do.</p>`,
      alois: 'The archbishop’s carriage went back this way after dinner, lanterns swinging. The road is the same. Walk it slowly and the city comes back to you one lit window at a time.',
      theresa: 'The last light on the fortress from the pond is the picture I would keep. Take one photograph and then put the phone away for the walk back.',
      task: 'On the way back, name the moment the city sounds louder than the pond. That line, wherever it is for you, is the real edge of Salzburg.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>This is the flattest walk in the series and good for prams, wheelchairs on the asphalt sections, and tired legs; the pond path is gravel and can be muddy after rain. Allow ninety minutes to two hours. There are no toilets on the pond path outside the lido's opening hours; use the cafés in Nonntal before you set out.</p>
<p>Please remember that the palace is private. Guided city tours sometimes stop at the fence; follow the same rule they do and stay outside. Add the stops to your <a href="/planner/">day planner</a>.</p>`,
  sources: [
    { label: 'Leopoldskron Palace – Salzburg Tourism (not open to the public)', url: 'https://www.salzburg.info/en/sights/fortress-palaces/leopoldskron-palace' },
    { label: 'Schloss Leopoldskron – Wikipedia (history, Max Reinhardt)', url: 'https://en.wikipedia.org/wiki/Schloss_Leopoldskron' }
  ]
};
