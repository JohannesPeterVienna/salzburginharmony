// Walk 5: Getreidegasse, Alter Markt, through-houses, St. Peter
export default {
  slug: 'getreidegasse',
  title: 'Getreidegasse and the Lanes of the Old Town',
  short: 'Getreidegasse',
  kicker: 'Walk 5 · Signs, passages and a bakery',
  desc: 'A self-guided walk through Salzburg’s Old Town: Alter Markt, the guild signs of the Getreidegasse, Mozart’s birthplace, the through-houses and St. Peter’s cemetery.',
  hero: { file: 'getreidegasse/hero.jpg', alt: 'Wrought-iron guild signs hanging over the narrow Getreidegasse in Salzburg with tall house fronts on both sides' },
  facts: { duration: 'about 2–2.5 hours', length: 'about 2 km, flat, cobbles', start: 'Alter Markt', cost: 'free · Mozart\'s birthplace and the catacombs are ticketed' },
  intro: `<p>The Getreidegasse is the street everyone walks, usually too fast and looking at shop windows. Walked slowly and looking up, it is one of the best-preserved medieval trading streets in Europe: narrow house fronts, windows that get smaller on each floor, passages that cut through the blocks to the next street, and wrought-iron signs that told customers who could not read what was sold inside. Mozart was born in one of these houses in 1756.</p>
<p>This walk starts on the market square next door, takes the street in short stages, dives through the passages and ends in the oldest cemetery in the city. Theresa knows where the bakery is. Alois knows why the street is called what it is and why the name is wrong.</p>`,
  before: `<ul>
<li><b>The street</b> is pedestrian and open at all hours; shops mostly 9 or 10 a.m. to 6 p.m., some open Sundays in the tourist season. Mornings before 10 a.m. are quiet; Saturday afternoons are the busiest time of the week.</li>
<li><b>Mozart's birthplace</b> (Getreidegasse 9) is a museum run by the International Mozarteum Foundation, open year-round; allow about an hour. Check current hours and prices on the foundation's site; we do not list prices we have not verified.</li>
<li><b>St. Peter's catacombs:</b> May to September daily 10 a.m.–12.30 p.m. and 1–6 p.m.; October to April daily 10 a.m.–12.30 p.m. and 1–5 p.m.; last admission 20 minutes before closing; closed 1 January, 24–26 and 31 December (salzburg.info, checked 6 November 2026). The cemetery itself is free.</li>
<li><b>Green market</b> on Universitätsplatz: weekday mornings, Saturday the biggest day; no market on Sundays.</li>
</ul>`,
  sketch: {
    backdrop: '<path class="s-hill" d="M0 300 L0 230 Q 200 170 600 220 L600 300 Z"/><rect class="s-water" x="0" y="0" width="600" height="26"/>',
    points: [
      { x: 500, y: 90, label: 'Alter Markt', lx: -16, anchor: 'end' }, { x: 400, y: 100, label: 'Getreidegasse', lx: 0, ly: -16, anchor: 'middle' }, { x: 290, y: 100, label: 'Mozart\'s birthplace', lx: 0, ly: -16, anchor: 'middle' },
      { x: 200, y: 110, label: 'Through-houses', lx: -16, anchor: 'end' }, { x: 250, y: 170, label: 'Universitätsplatz', lx: 16 }, { x: 420, y: 215, label: 'St. Peter\'s cemetery', lx: 16 }, { x: 330, y: 250, label: 'Abbey bakery', lx: -16, anchor: 'end' }
    ]
  },
  stations: [
    {
      id: 'gg-altermarkt', title: 'Alter Markt: the oldest marketplace', where: 'Alter Markt with the St. Florian fountain', minutes: 15,
      img: { file: 'getreidegasse/01-altermarkt.jpg', alt: 'Alter Markt square in Salzburg with the St. Florian fountain and the narrow smallest house beside a coffeehouse' },
      body: `<p>The Alter Markt has been a marketplace since the 13th century. Its fountain was built in 1488 and got its octagonal basin and the wrought-iron grille in the 1680s; the statue of St. Florian on top, patron saint against fire, dates from 1734. The houses around it are medieval at the core with baroque faces, and two of them matter: the old court pharmacy, in business on this square since the end of the 16th century, with an interior worth a glance through the door, and the Café Tomaselli, one of the oldest coffeehouses in Austria.</p>
<p>Next to the café is the smallest house in the Old Town, 1.42 metres wide, built in the 19th century to close a gap between two buildings. The square once hosted dairy, herb and cabbage markets, a dance of the miners from the Dürrnberg and the midsummer fire. Today it is cafés and the first shops of the Getreidegasse, which begins at its western corner.</p>`,
      alois: 'Markets, dances, fires and executions: a medieval square did everything. The fountain was the water supply, the court pharmacy the hospital, and the coffeehouse came in 1700 as the newest idea in town.',
      theresa: 'If you want a coffee, Tomaselli is the classic, with the cake ladies carrying trays between the tables. It is not cheap and it is not fast; it is a place to sit for an hour.',
      task: 'Find the smallest house without looking at the sign. Then estimate how many people could stand in its ground floor. The answer in the 1850s was: one shopkeeper and one customer.'
    },
    {
      id: 'gg-signs', title: 'The street and its signs', where: 'Getreidegasse, eastern half', minutes: 20,
      img: { file: 'getreidegasse/02-signs.jpg', alt: 'Detail of a gilded wrought-iron guild sign over a shop in the Getreidegasse' },
      body: `<p>Walk in and look up. The signs hanging over the street are the Getreidegasse's trademark: a pretzel for a bakery, a key for a locksmith, a boot, a hat, an umbrella, and newer ones for fast-food chains and jewellers, all made in the same wrought-iron style. They were a medieval solution for customers who could not read. A metalworking shop in the street still makes them by hand, and the city insists that new businesses follow the rule.</p>
<p>Now look at the house fronts. The windows get smaller with each floor, the ground floors have deep doorways, and many facades carry painted dates, former owners' names and the eye of God in a triangle. Behind the fronts the houses are deep, running back through the whole block to the next street, which is the secret of the next stop. The name, by the way, has nothing to do with grain: it comes from an old word for trotting, the street where you walked your horse.</p>`,
      alois: 'Getreide means grain, but the street was the Trabgasse, the trotting lane, long before anyone misheard it. Names in this town are often mistakes that stuck. Ask me about the Mönchsberg sometime.',
      theresa: 'The bakery sign with the pretzel is the one I look for. Signs for pharmacies, hats and umbrellas are the old trades; count how many of the signs today are for things people actually needed in 1500.',
      task: 'Choose five signs and guess the trade from the picture alone, then check the shop. How many did you get right? Decide which modern sign is the most honest and which is just a logo in iron.'
    },
    {
      id: 'gg-mozart', title: 'Mozart\'s birthplace, Getreidegasse 9', where: 'The yellow house with the lettering, museum entrance in the courtyard', minutes: 60,
      img: { file: 'getreidegasse/03-birthplace.jpg', alt: 'Yellow facade of the house at Getreidegasse 9 in Salzburg where Mozart was born, with crowds in the street below' },
      body: `<p>The yellow house at number 9 belonged to the merchant Hagenauer, who let the third floor to Leopold Mozart from 1747. Wolfgang was born there on 27 January 1756, and the family stayed until 1773, when they moved across the river to the house on Makartplatz. The International Mozarteum Foundation opened a museum here in 1880, and it has grown through the whole building: original rooms, a reconstructed middle-class apartment of the 18th century, letters, portraits, and instruments including his childhood violin and clavichord.</p>
<p>Allow an hour inside if you go in, and go early; it is one of the most visited museums in Austria. If you do not go in, the courtyard is free and quieter than the street, and the house front tells you something about the man: a merchant's house in a trading street, four floors of tenants, a composer born in a rented flat above a shop.</p>`,
      alois: 'He was born in a rented flat above a shop, like most people in this street. Salzburg did not make much of him while he lived; the museum came ninety years after he died. Fame is slow and then it is loud.',
      theresa: 'The queue is shortest at opening time. Inside, find the small kitchen; it tells you more about daily life in 1760 than the instruments do.',
      task: 'In the courtyard, look up and count the floors. Which windows were the Mozarts’ flat? Then imagine a violin practised there with the windows open in summer, and the neighbours’ opinion of it.'
    },
    {
      id: 'gg-passages', title: 'The through-houses', where: 'Schatz passage (Getreidegasse 3) and the other Durchhäuser', minutes: 20,
      img: { file: 'getreidegasse/04-passage.jpg', alt: 'Vaulted passage of a through-house in Salzburg leading from the Getreidegasse to a courtyard and the next street' },
      body: `<p>The Durchhäuser, through-houses, are the Old Town's hidden network. A house front on the Getreidegasse and another on Universitätsplatz or the river side belong to the same building, and a vaulted passage runs through the courtyards between them. They were built for deliveries, light and escape from fire; today they hold galleries, small shops and the best shortcuts in the city. The most famous is the Schatz passage from number 3, which comes out on Universitätsplatz.</p>
<p>Go through at least two. In the Schatz passage, in a dark corner, there is a relief of the Madonna with the child that most people walk past. Other passages have painted vaults, old shop signs, and courtyards with a single tree. The street outside may be packed, and ten steps in it is silent. This is the oldest Salzburg there is, and it is not on any ticket.</p>`,
      alois: 'Fire was the great fear of a medieval town. These passages let people run, let water through, and let the air move. The galleries came later. Walk through one and you walk through a fire regulation of 1400.',
      theresa: 'Look for the courtyards with a tree or a table and chairs. A few passages have a bench where you can sit out of the crowd. Bring a pastry from the bakery two stops on and come back.',
      task: 'Enter a passage from the Getreidegasse and count your steps until you come out the other side. Then find the two house fronts on a map in your head: are they the same building or do they only share a courtyard?'
    },
    {
      id: 'gg-universitaetsplatz', title: 'Universitätsplatz: the market and the church', where: 'Green market stalls and the Kollegienkirche', minutes: 25,
      img: { file: 'getreidegasse/05-market.jpg', alt: 'Market stalls with vegetables and flowers on Universitätsplatz in front of the white baroque Kollegienkirche' },
      body: `<p>The passages bring you out on Universitätsplatz, where the weekly market moved in 1857 and has stayed. On weekday mornings and especially on Saturdays the square fills with stalls: vegetables from the Flachgau, cheese, bread, flowers, sausages and, in season, mushrooms and berries. It is a real market where people buy their food, with tourists mixed in. The white church behind it is the Kollegienkirche, the university church, built to plans by Fischer von Erlach and finished in the early 18th century, one of the great baroque interiors of Austria and usually empty.</p>
<p>The square also has the Old Town's cheapest decent lunch: a sausage from a stall or bread and cheese from the farmers, eaten on the church steps. From here the Mönchsberg rises behind the houses; the lift up to the modern art museum is a few minutes away if the view calls.</p>`,
      alois: 'The university was founded in 1622 by the archbishop who built the cathedral. The church is its chapel, bigger than most cathedrals. Baroque Salzburg thought in that scale, even for students.',
      theresa: 'Buy something small at the market: a piece of mountain cheese, a few apples, a Bosna from the stand if you eat meat. Eating what the city eats is the fastest way to understand it.',
      task: 'Ask one stallholder where their produce comes from. Then step into the church and stand in the middle under the dome for one minute. Which of the two, market or church, felt more like the real Salzburg to you?'
    },
    {
      id: 'gg-stpeter', title: 'St. Peter\'s cemetery and catacombs', where: 'Through the Franziskanergasse to St. Peter\'s, cemetery at the foot of the rock', minutes: 30,
      img: { file: 'getreidegasse/06-stpeter.jpg', alt: 'Wrought-iron grave crosses and arcaded tombs in St. Peter\'s cemetery with the rock face of the Mönchsberg and the catacomb windows above' },
      body: `<p>Walk through the Franziskanergasse to St. Peter's, the oldest monastery still in existence in the German-speaking world, founded in 696 by Rupert, the bishop who gave Salzburg its name. The church is Romanesque at the core and rococo on the surface; look at the organ and the chapels. Behind it, against the rock of the Mönchsberg, is the cemetery, older than the monastery itself, with family tombs in arcades, wrought-iron crosses, flowers everywhere and the late Gothic Margaret chapel in the middle.</p>
<p>The catacombs are the caves cut into the cliff above the graves. Their origins go back to late antiquity; according to St. Peter's Abbey they served both as hermitages and as burial places, and you climb to them by steps from the cemetery with a small ticket. From the upper chapel there is a view down over the graves and the roofs. The cemetery is one of the most visited places in the city and still a working graveyard; keep to the paths and keep your voice down.</p>`,
      alois: 'Rupert arrived in 696 and found the Roman town in ruins. He built here, at the foot of the rock, and the city grew out of this courtyard. Everything you have walked today is downstream of this cemetery.',
      theresa: 'The flowers on the graves are tended by the families and by the monastery gardeners. Look at which graves have fresh flowers in November; those are the ones still visited.',
      task: 'Read three gravestones and find the oldest date you can. Then look at the rock above and find the catacomb windows. Which is older, the graves or the caves, and how do you know?'
    },
    {
      id: 'gg-bakery', title: 'The abbey bakery and the end of the walk', where: 'St. Peter\'s bakery by the Almkanal, Kapitelplatz beyond', minutes: 15,
      img: { file: 'getreidegasse/07-bakery.jpg', alt: 'Wooden water wheel turning beside the old abbey bakery of St. Peter in Salzburg' },
      body: `<p>Leave the cemetery by the lane towards Kapitelplatz and listen for water. The St. Peter's abbey bakery stands beside the Almkanal, the medieval canal that brings water through the Mönchsberg into the Old Town, and a wooden water wheel still turns in front of it. The bakery bakes dark sourdough loaves in a wood-fired oven and sells them through a hatch; the queue is a sign of how good it is. It is one of the monastery's businesses, like the restaurant next to the church.</p>
<p>With a piece of bread in your hand you are at the foot of the fortress, on Kapitelplatz, where the <a href="/tours/mirabell-to-fortress/">fortress walk</a> climbs the hill. Or go back through the passages to the Getreidegasse and see the signs again in the evening light, when the shops have closed and the street belongs to the houses.</p>`,
      alois: 'The Almkanal was dug through the rock in the 12th century to drive mills and flush the town. It still runs. A city that keeps a thousand-year-old canal working is a city that remembers.',
      theresa: 'Buy the small loaf, tear it, and eat it warm on the bench by the wheel. Then wrap the rest for tomorrow’s breakfast. This is the best thing I can tell you about Salzburg food, and it costs a few euros.',
      task: 'Watch the water wheel for one full minute. Count the turns. Then think about how many loaves one turn of the wheel might have ground flour for in 1400. Nobody knows the answer, but the question slows you down.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>Two to two and a half hours with the museum, ninety minutes without. The whole walk is flat; the catacombs are steps cut into rock and not step-free. Early morning is best for the street and the market, late afternoon for the light; Saturday morning gives you the market at full size but the street at its fullest.</p>
<p>The walk ends where the <a href="/tours/mirabell-to-fortress/">fortress walk</a> climbs, and the <a href="/tours/nonnberg/">Nonnberg walk</a> starts five minutes away. Add the stops to your <a href="/planner/">day planner</a>.</p>`,
  sources: [
    { label: 'Getreidegasse – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/top10/getreidegasse' },
    { label: 'Mozart\'s Birthplace – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/top10/mozarts-birthplace' },
    { label: 'Alter Markt – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/squares-streets/alter-markt' },
    { label: 'St. Peter\'s Abbey, cemetery and catacombs – Salzburg Tourism (catacomb hours)', url: 'https://www.salzburg.info/en/sights/churches-cemeteries/st-peters-monastery-cemetery' }
  ]
};
