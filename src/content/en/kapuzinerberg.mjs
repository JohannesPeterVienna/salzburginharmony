// Walk 6: Kapuzinerberg – the wooded hill on the right bank
export default {
  slug: 'kapuzinerberg',
  title: 'Kapuzinerberg: the Green Hill Across the River',
  short: 'Kapuzinerberg',
  kicker: 'Walk 6 · Woods, walls and the best view of the Old Town',
  desc: 'A self-guided walk up the Kapuzinerberg from the Linzergasse: the Capuchin monastery, the best view of the Old Town, the old bastions, the summit and the Steingasse.',
  hero: { file: 'kapuzinerberg/hero.jpg', alt: 'Wooded slope of the Kapuzinerberg above the Old Town roofs, seen from the opposite hill' },
  facts: { duration: 'about 2–2.5 hours', length: 'about 4 km with roughly 220 m of climb', start: 'Platzl at the foot of the Linzergasse', cost: 'free · the monastery church is open to visitors, the convent is not' },
  intro: `<p>Every visitor photographs the fortress; few climb the hill opposite to photograph it properly. The Kapuzinerberg rises to 640 metres on the right bank of the Salzach, directly across from the Old Town, and is covered in forest, old fortifications and footpaths. The Capuchin friars have been at the top of the first rise since 1599; the summit beyond holds a small castle that is now a restaurant; and the paths along the walls are where the people of Salzburg go for a walk on a Sunday.</p>
<p>Anton leads here, because the hill is about walls, wars and views, which are his department. Dora takes over at the top, where there is a garden and a plate of something warm. Wear real shoes: the paths are steep in places and muddy after rain.</p>`,
  before: `<ul>
<li><b>Paths:</b> open at all times, free, unlit at night. Steps on the Stations of the Cross path from the Linzergasse, forest tracks and some rock steps on the Basteiweg; not suitable for prams or wheelchairs.</li>
<li><b>Monastery church:</b> normally open during the day; the convent and its garden are closed to visitors. Services take precedence.</li>
<li><b>Franziskischlössl:</b> a small restaurant on the summit with seasonal and weekday-dependent hours; check before relying on it for lunch, and carry water in any case.</li>
<li><b>Wildlife:</b> the hill has chamois, a protected population living inside a city. Keep dogs on the lead and stay on the paths.</li>
<li><b>Sources:</b> background from the Wikipedia article on the Kapuzinerberg and Salzburg Tourism’s Linzergasse page, checked 6 November 2026; no admission fees or opening hours apply to this walk.</li>
</ul>`,
  sketch: {
    backdrop: '<path class="s-hill" d="M60 300 Q 300 40 560 300 Z"/><rect class="s-water" x="0" y="282" width="600" height="18"/>',
    points: [
      { x: 90, y: 255, label: 'Platzl & Linzergasse', lx: 16, ly: -10 }, { x: 150, y: 205, label: 'Stations of the Cross', lx: 16 }, { x: 220, y: 150, label: 'Monastery & bastion', lx: 16, ly: -8 },
      { x: 300, y: 120, label: 'Writer\'s house', lx: 16, ly: -8 }, { x: 380, y: 110, label: 'Basteiweg', lx: 16 }, { x: 310, y: 60, label: 'Franziskischlössl', lx: 16, ly: -6 }, { x: 480, y: 250, label: 'Steingasse', lx: 16 }
    ]
  },
  stations: [
    {
      id: 'kb-linzergasse', title: 'Platzl and the Linzergasse', where: 'Right bank, foot of the hill', minutes: 15,
      img: { file: 'kapuzinerberg/01-linzergasse.jpg', alt: 'Pedestrian Linzergasse in Salzburg with shop fronts and the Kapuzinerberg rising at the end' },
      body: `<p>Cross the Staatsbrücke from the Old Town and you are on Platzl, the small square where the Linzergasse begins. This was the road out to Linz and the trading street of the right bank, humbler than the Getreidegasse and today more local: bakeries, a pharmacy, small shops, a few hotels. Halfway up, a gateway on the right leads into St. Sebastian's cemetery, an arcaded Renaissance graveyard where Mozart's father Leopold and his widow Constanze are buried, along with the physician Paracelsus and, in a domed mausoleum in the middle, the archbishop Wolf Dietrich.</p>
<p>A little further up the street, on the left, a stone archway with a small chapel marks the start of the path up the hill. This is the Franziskuspforte. Through it, the city ends abruptly and the stairs begin.</p>`,
      anton: 'Wolf Dietrich, who cleared the squares you saw across the river, lies in that mausoleum. He died a prisoner in his own fortress. The Linzergasse was his road out, and he never took it.',
      dora: 'There is a good bakery in the Linzergasse for the climb. The cemetery garden is the quietest spot on the right bank; sit there a minute before the stairs.',
      task: 'In St. Sebastian’s cemetery, find the three graves named above without a map. Which is the grandest and which the plainest, and does that match what you know of the people?'
    },
    {
      id: 'kb-stations', title: 'The Stations of the Cross', where: 'Stepped path from the Franziskuspforte to the monastery', minutes: 20,
      img: { file: 'kapuzinerberg/02-stations.jpg', alt: 'Stepped pilgrim path up the Kapuzinerberg with small baroque chapels of the Stations of the Cross between trees' },
      body: `<p>The path climbs in steps between walls, and at intervals stand small chapels with painted scenes of the Passion: thirteen of them, built between 1736 and 1744 for pilgrims going up to the monastery. The figures are weathered and the paint is faded, which is their charm. Pilgrims stopped at each one; walkers today stop because the steps are steep. Between the chapels there are gaps in the trees with views back over the roofs of the Linzergasse.</p>
<p>Halfway up, a small memorial to Mozart stands beside the path. The climb from the gate to the monastery takes about fifteen minutes at a steady pace, and the gradient eases as you reach the first terrace, where the forest opens and the monastery wall appears.</p>`,
      anton: 'Thirteen stops for pilgrims who walked up to pray and walked down forgiven. You are using the same steps for the view. The hill does not mind; the friars built it for both.',
      dora: 'Take the climb slowly and look at the little chapels; the painted figures are 18th-century village art, the kind you find in chapels all over the countryside here.',
      task: 'At the fifth chapel, stop and look at the painting until you can say what is happening in it. Then look at how the chapel is built to shelter it. Why is it facing the way it does?'
    },
    {
      id: 'kb-monastery', title: 'The Capuchin monastery and the Hettwer bastion', where: 'Monastery church, the terrace below it with the view', minutes: 30,
      img: { file: 'kapuzinerberg/03-monastery.jpg', alt: 'Simple church front of the Capuchin monastery on the Kapuzinerberg with a stone bastion and a wide view over Salzburg' },
      body: `<p>The monastery was founded by Wolf Dietrich in 1599 on the site of a medieval tower, and the first church was consecrated in 1602. It is plain, as Capuchin churches are: whitewashed, wooden, with 15th-century carved reliefs that came from the old cathedral. The friars were evicted by French troops around 1800, by Bavarians in 1813 and by the Nazi regime in 1938, which planned a vast party forum on this hill that was never built. They came back in 1942 and are still here.</p>
<p>Below the monastery is the Hettwer bastion, a stone platform from the 17th-century fortifications. This is the view: the whole Old Town laid out across the river at eye level, the cathedral dome, the towers, the Mönchsberg behind, and the fortress above, close enough to see people on its walls. It is the classic picture of Salzburg, and almost nobody is here to take it.</p>`,
      anton: 'From this bastion the cannons could reach the river. From the fortress, the cannons could reach this bastion. Salzburg was a city aimed at itself. Look at both and understand why it was never attacked.',
      dora: 'This is where I bring friends from abroad first, before anything else. Ten minutes on this wall and they understand the city. In the morning the light is on the Old Town; in the evening it is behind it.',
      task: 'From the bastion, find the seven things in this order: river, bridge, cathedral dome, the gardens on the left bank, the fortress, the Untersberg, your hotel. The last one is the hardest and the most useful.'
    },
    {
      id: 'kb-zweig', title: 'The writer\'s house', where: 'Paschinger Schlössl on the slope above the monastery', minutes: 10,
      img: { file: 'kapuzinerberg/04-house.jpg', alt: 'Yellow house called Paschinger Schlössl on the wooded slope of the Kapuzinerberg, seen from the path' },
      body: `<p>A few minutes further up, the path passes a yellow house behind a wall: the Paschinger Schlössl, where the writer Stefan Zweig lived from 1919 until 1934. Here he wrote many of the books that made him one of the most translated authors of his time and received guests from across Europe; and from here he left when Austria turned, first for England, then Brazil. The house is private and cannot be visited, but there is a memorial by the path, and the city has placed stumbling-stone memorials for him and his family at the foot of the hill.</p>
<p>Walk on past the house. The path divides: one branch continues up through the woods to the summit, the other, the Basteiweg, turns along the old walls. Take the Basteiweg first and come back to the summit path later.</p>`,
      anton: 'Zweig looked at the Old Town from this terrace for fifteen years and called Salzburg the most beautiful city he knew. Then the view did not help him. The hill holds that story as well as the pretty one.',
      dora: 'The house is private; look from the path only. His memoir has a chapter about this hill and the guests who climbed it. Read it on the bench further on if you have it with you.',
      task: 'Stand where the path gives you the house and the Old Town in one view. What would you write about from here? Then imagine leaving it, knowing you could not come back. Walk on with that.'
    },
    {
      id: 'kb-bastei', title: 'The Basteiweg along the walls', where: 'Fortification walls on the southern and eastern side of the hill', minutes: 30,
      img: { file: 'kapuzinerberg/05-basteiweg.jpg', alt: 'Footpath along a long stone fortification wall with small towers on the Kapuzinerberg, forest on one side' },
      body: `<p>The Basteiweg follows the walls that were built around the hill in 1629, in the Thirty Years' War, when the archbishop fortified the right bank as he had fortified the left. Long curtain walls with small lookout towers, bastions at the corners, a military tower at the Felix gate: most of it stands, moss-covered and quiet, with the forest growing up to the stones. The path runs along the top or the foot of the walls with the city appearing and vanishing through the trees.</p>
<p>Keep an eye out for chamois. A small herd lives on the hill, in a city of 150,000 people, on the steep northern rocks and in the woods; you see them most often in the early morning or at dusk. The path has roots, rock steps and a few short steep bits; the whole loop to the summit path takes about half an hour.</p>`,
      anton: 'Nobody ever came. The walls were built for an attack that did not happen, and they have been a Sunday walk for three centuries. The best defence a city ever bought.',
      dora: 'In early summer the walls are covered with wild flowers and the woods smell of wild garlic in April. Walk this bit without talking and you may see a chamois before it sees you.',
      task: 'Find a lookout tower and stand inside it. Which direction did the guard watch, and what would he have seen that you cannot? Then look at what you can see that he could not.'
    },
    {
      id: 'kb-summit', title: 'The Franziskischlössl on the summit', where: 'Top of the Kapuzinerberg, 640 m', minutes: 30,
      img: { file: 'kapuzinerberg/06-summit.jpg', alt: 'Small square castle Franziskischlössl with a tower on the wooded summit of the Kapuzinerberg' },
      body: `<p>The summit path ends at a small square fort with a tower and a drawbridge, the Franziskischlössl, built in 1629 as the highest point of the defences and named after the archbishop Paris Lodron's patron. For a long time it has been a restaurant with a garden under the trees, with an approach over the old bridge. Its opening hours follow the season and the weekday, so check before you count on it; when it is open it is one of the best places in Salzburg to sit down with a plate and a view.</p>
<p>The summit itself is in forest, with glimpses to the north over the plain towards Bavaria and the lake country, and to the Gaisberg, the next hill east. This is where the city ends for walkers; beyond is the Kühberg and the villages. Rest, eat, and then take the summit path back down past the writer's house to the monastery.</p>`,
      anton: 'A fort that became a tavern: that is the history of the Kapuzinerberg in one building. Sit in the garden and look at the walls you have walked. They are the frame of this whole walk.',
      dora: 'If the kitchen is open, the dishes are simple Austrian cooking: dumplings, roast pork, a sweet omelette with plum jam. If it is not, the bench by the bridge and your bakery bread are no hardship.',
      task: 'Order or unpack something and eat it slowly. Then, before you leave, choose which way you would have attacked this hill in 1629. The answer is: you would not have, and that is why it is a garden now.'
    },
    {
      id: 'kb-steingasse', title: 'Down through the Steingasse', where: 'Descent via the Imbergstiege to the Steingasse and the river', minutes: 25,
      img: { file: 'kapuzinerberg/07-steingasse.jpg', alt: 'Cobbled medieval Steingasse in Salzburg with narrow high houses and an old town gate' },
      body: `<p>From the monastery, do not go back down the Stations path. Take the stepped lane on the river side, the Imbergstiege, which drops steeply to the Steingasse, the oldest street on the right bank. It was the Roman road south, squeezed between the rock and the river, and its houses are tall, narrow and medieval, with a town gate at the southern end. At number 9 the priest Joseph Mohr was born in 1792; he wrote the words of a carol that is sung all over the world every December, and a plaque marks the house.</p>
<p>The Steingasse comes out by the river near the Mozartsteg footbridge. Cross it and you are on Mozartplatz, where the <a href="/tours/mirabell-to-fortress/">first walk</a> passes; or stay on the right bank and walk along the water to the Mirabell Gardens. Either way you have now seen Salzburg from both sides.</p>`,
      anton: 'The Steingasse is older than the Getreidegasse and poorer. Craftsmen, dyers, tanners: the trades that needed the river and smelled. The Old Town could see them and did not have to meet them.',
      dora: 'Walk the Steingasse at dusk when the lanterns come on. It is the most atmospheric fifty metres in the city and almost always empty. Then a bridge, and the squares are lit for you.',
      task: 'In the Steingasse, find the house where the carol writer was born and read the plaque. Then look at the river side of the street and decide why a priest’s family would have lived in a street of tanners.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>Two to two and a half hours for the full loop with a stop at the summit; one hour for the Stations path to the bastion and back, which gives you the view with the least effort. All paths are steps and forest tracks; none is step-free. Go in the morning for the light on the Old Town, or late afternoon for the Steingasse at dusk. Carry water; there is nothing between the Linzergasse and the summit.</p>
<p>Add the stops to your <a href="/planner/">day planner</a>. For the hill on the other side of the river, the Mönchsberg, there is a lift from the Old Town; it is a separate walk we will add later.</p>`,
  sources: [
    { label: 'Kapuzinerberg – Wikipedia (monastery, fortifications, Stations of the Cross, Zweig)', url: 'https://en.wikipedia.org/wiki/Kapuzinerberg' },
    { label: 'Linzergasse – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/squares-streets/linzergasse' }
  ]
};
