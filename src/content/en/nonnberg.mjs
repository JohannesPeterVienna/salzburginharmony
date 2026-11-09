// Walk 3: Nonnberg Abbey and the quiet side of the Festungsberg
export default {
  slug: 'nonnberg',
  title: 'Nonnberg: the Oldest Convent and the Quiet Hill',
  short: 'Nonnberg',
  kicker: 'Walk 3 · Short, steep and still',
  desc: 'A quiet self-guided walk from the Old Town up the Nonnbergstiege to Nonnberg Abbey, founded around 714, with the church, the view and the way down through Nonntal.',
  hero: { file: 'nonnberg/hero.jpg', alt: 'Salzburg Old Town and church domes below the Festungsberg, with snow-capped Alps behind' },
  facts: { duration: 'about 1.5 hours', length: 'about 2 km with roughly 60 m of climb on steps', start: 'Kaigasse near Mozartplatz', cost: 'free · the church is a place of worship, not a museum' },
  intro: `<p>Nonnberg is a working Benedictine convent on the eastern shoulder of the Festungsberg, a few minutes above the Old Town and a world away from it. It was founded between 711 and 715, which makes it one of the oldest continuously existing women's convents in the German-speaking world. The nuns still sing the hours every day. Visitors are welcome in the church and the cemetery, not in the convent, and not during services.</p>
<p>This is a walk for people who like stairs, silence and a view that comes without a ticket. Anton leads, because he grew up with the bells of this church, as he puts it. Dora reminds you to keep your voice down and your shoes quiet on the stone.</p>`,
  before: `<ul>
<li><b>Church and cemetery:</b> open daily from about 6.30 or 6.45 a.m. until nightfall, in summer until 6 p.m.; no sightseeing during services (salzburg.info, checked 6 November 2026).</li>
<li><b>Sung prayer:</b> every morning at 6.45 a.m., Sundays and holidays at 7 a.m., and sung Vespers Monday to Saturday at 5 p.m., Sundays and holidays at 4.30 p.m., before holidays at 4 p.m., changes reserved. From November to February listening to Vespers is possible only with prior registration, at the latest the day before, by email to the abbey (salzburg.info, checked 6 November 2026).</li>
<li><b>Access:</b> from Kaigasse via the Nonnbergstiege (steps) or from Nonntal via a narrow lane. The steps are not suitable for wheelchairs or prams; the Nonntal lane is steep but step-free in parts.</li>
<li><b>Behaviour:</b> this is a convent. No flash, no tripods, no loud talk, no entering areas marked private. If a service begins, sit down or leave quietly.</li>
</ul>`,
  sketch: {
    backdrop: '<path class="s-hill" d="M120 300 Q 330 90 600 240 L600 300 Z"/>',
    points: [
      { x: 70, y: 70, label: 'Kaigasse', lx: 16 }, { x: 170, y: 150, label: 'Nonnbergstiege', lx: -16, anchor: 'end' }, { x: 300, y: 165, label: 'Abbey church', lx: 16, ly: -10 },
      { x: 370, y: 205, label: 'Cemetery & terrace', lx: 16 }, { x: 440, y: 260, label: 'Lane to Nonntal', lx: 16 }, { x: 540, y: 285, label: 'Kajetanerplatz', lx: -16, anchor: 'end', ly: -12 }
    ]
  },
  stations: [
    {
      id: 'nb-kaigasse', title: 'Kaigasse: leaving the squares behind', where: 'From Mozartplatz east along Kaigasse', minutes: 10,
      img: { file: 'nonnberg/01-kaigasse.jpg', alt: 'Narrow Kaigasse in Salzburg Old Town with pastel house fronts and the fortress hill above' },
      body: `<p>Start at the corner of Mozartplatz and walk east into Kaigasse. Within fifty metres the crowds thin out. The street is older than the squares behind you; it runs along the foot of the hill and the houses are tall, narrow and plain, the way Salzburg looked before the archbishops went baroque. The university's law faculty has its home here, so during the week there are students rather than tour groups.</p>
<p>Keep the hill on your right and look for the signposted turn to Nonnberg. The lane bends uphill and ends at the foot of a long flight of stone steps. This is the Nonnbergstiege. Before you climb, look back down Kaigasse: the view of the Old Town roofs from here is the one the nuns have had for twelve centuries, minus the cars.</p>`,
      anton: 'The hill you are about to climb has had a convent on it for longer than Austria has had a name. Everything in the squares behind you is young by comparison.',
      dora: 'There is a bakery and a small grocer on the way; take water. The steps are not long, but on a summer afternoon they are in full sun.',
      task: 'Walk fifty paces into Kaigasse and stop. Compare the house fronts here with the Residence you passed a minute ago. What did the people who built these houses have less of, and what did they have more of?'
    },
    {
      id: 'nb-stiege', title: 'The Nonnbergstiege', where: 'Stone steps from Kaigasse up to the abbey gate', minutes: 15,
      img: { file: 'nonnberg/02-stiege.jpg', alt: 'Old stone staircase Nonnbergstiege climbing between walls towards Nonnberg Abbey' },
      body: `<p>The steps rise between walls, in stages, with landings where you can breathe and turn. It is about sixty metres of climb and takes ten minutes if you do not stop, which you should. Halfway up there is a gap in the wall with the cathedral dome below you and the Kapuzinerberg across the river; near the top the fortress wall appears above the convent roofs.</p>
<p>Pilgrims, farmers and the nuns' suppliers used these steps for centuries before any tourist did. The stone is worn into shallow hollows in the middle of each tread. Walk on the edges in the wet. At the top is the abbey gate with the church to your left and the cemetery straight ahead; the convent buildings beyond are closed to visitors.</p>`,
      anton: 'Count the steps if you like; everyone gets a different number, because the landings confuse you. The nuns say it does not matter how many, only that you arrive quieter than you left.',
      dora: 'Stop at the gap in the wall halfway up and look at the cathedral dome from above. It is the only place in the city where you see it like this without a ticket.',
      task: 'On the landing halfway up, listen. Which sounds from the city still reach you, and which have gone? Note the first moment you hear birds louder than traffic; that is where the convent begins, not at the gate.'
    },
    {
      id: 'nb-church', title: 'The abbey church', where: 'Nonnberg collegiate church, nave, crypt and the "Paradise"', minutes: 25,
      img: { file: 'nonnberg/03-church.jpg', alt: 'Late Gothic interior of Nonnberg Abbey church with the carved winged altar' },
      body: `<p>The present church is late Gothic, but the site is far older. Around the turn of the first millennium Emperor Henry II paid for a Romanesque basilica here, consecrated in 1009, and after a fire the church was rebuilt in the 15th century in the form you see. Its first abbess was Erentrudis, who has been honoured as the mother of Salzburg since 1624; her tomb is in the crypt, a room of free-standing columns under a net vault that has no equal in the city.</p>
<p>Two things are worth the climb alone. The late Gothic winged altar at the east end, with a figure of Mary at its centre, and the wall paintings from the middle of the 12th century in the so-called Paradise under the nuns' choir, among the oldest in Austria. Both can be illuminated with a coin or a switch near the entrance. The nuns' choir itself is behind a screen; the morning chant and the evening Vespers are sung there.</p>`,
      anton: 'Twelfth-century paintings, a tenth-century crypt, an eighth-century foundation. Take them in that order, going back in time as you move towards the altar. Few churches let you do that.',
      dora: 'Put a coin in the light box for the Paradise frescoes and wait for your eyes to adjust. Then sit for one minute. If a nun comes in to pray, that is her church, not your photo.',
      task: 'Find the oldest thing in the church you can date with confidence, and the newest. Then look for one object whose age you cannot guess at all. Which of the three held your attention longest?'
    },
    {
      id: 'nb-terrace', title: 'The cemetery and the view south', where: 'Abbey cemetery and the terrace in front of the church', minutes: 15,
      img: { file: 'nonnberg/04-terrace.jpg', alt: 'Small cemetery of Nonnberg Abbey with wrought-iron crosses and a view over Nonntal to the Untersberg' },
      body: `<p>The cemetery lies against the convent wall, small, well kept and open during the day. Wrought-iron crosses, a few family tombs of old Salzburg names, and flowers that someone tends every week. Beyond the wall the ground drops away to Nonntal, the valley south of the Old Town, and the view opens to the flat-topped Untersberg and the first ridges of the Alps.</p>
<p>This terrace is one of the best quiet viewpoints in Salzburg, and it costs nothing. In the morning the light comes from the left and the mountain is sharp; in the afternoon it goes hazy and blue. On the far side of the valley you can make out the roofs of Leopoldskron and the water of its pond if you know where to look, which is the next walk in this series.</p>`,
      anton: 'The nuns chose the hill for safety and the view was a side effect. Now the view is the reason people climb, and safety is what the nuns still need from us: walk softly, stay outside the walls.',
      dora: 'Look for the Untersberg’s flat top. The marble of the cathedral facade came from quarries at its foot. The mountain is in the city twice: on the horizon and in the walls.',
      task: 'Face south and name, from left to right, three things you can see: a mountain, a building, a piece of water. Then close your eyes and say them again. The terrace is for remembering, not only for looking.'
    },
    {
      id: 'nb-lane', title: 'The lane down to Nonntal', where: 'Narrow footpath from the abbey to Nonntaler Hauptstraße', minutes: 15,
      img: { file: 'nonnberg/05-lane.jpg', alt: 'Steep narrow lane with old walls leading down from Nonnberg Abbey into the Nonntal district' },
      body: `<p>Instead of returning by the steps, take the narrow lane that leaves the abbey on the southern side and winds down into Nonntal. It is steep, between garden walls and under old trees, and in places it is a path rather than a street. Residents use it with shopping bags, so step aside on the narrow bits. At the bottom you reach the quiet streets of Nonntal, a district of villas, small shops and the church of St. Erhard.</p>
<p>From here you can walk west along the foot of the hill back to Kajetanerplatz and the Old Town in ten minutes, or continue south towards Leopoldskron on the <a href="/tours/leopoldskron/">next walk</a>, about twenty minutes further. Both ways are flat once you are off the hill.</p>`,
      anton: 'Nonntal was the farming side of the city, outside the walls, where the abbey’s tenants grew what the nuns ate. The villas came later; the lane is the old road to the fields.',
      dora: 'There is a small café in Nonntal where the locals have coffee after church on Sunday. I will not name it; the point is to find one that looks like that and sit down.',
      task: 'As you come down, notice the first front door with a name on a bell and a garden behind it. The convent above was a world apart; here people simply live under it. What has changed in the sound and the smell since the terrace?'
    },
    {
      id: 'nb-kajetaner', title: 'Kajetanerplatz and back into town', where: 'Kajetanerplatz with the Kajetanerkirche, edge of the Old Town', minutes: 10,
      img: { file: 'nonnberg/06-kajetanerplatz.jpg', alt: 'Baroque dome of the Kajetanerkirche on Kajetanerplatz at the southern edge of Salzburg Old Town' },
      body: `<p>The walk ends on Kajetanerplatz, a small square at the southern end of the Old Town dominated by the dome of the Kajetanerkirche, a baroque church of the late 17th century built for the Theatine order, whose former monastery next to it later served as a hospital. The square is a crossing point between the quiet Nonntal and the busy centre; buses stop here, and the Old Town begins again around the corner.</p>
<p>If you still have energy, the <a href="/tours/mirabell-to-fortress/">fortress</a> is above you and the footpath to it starts from Festungsgasse nearby. If you have had enough climbing, the cafés of Kaigasse are back where you began, five minutes away. A full circle of the hill's eastern side takes about ninety minutes at a slow pace, which is what this walk was designed for.</p>`,
      anton: 'You have circled a hill that has been holy for 1,300 years and fortified for 950. The city grew around it, and the hill never moved. Walks like this are how you learn a place.',
      dora: 'If it is late afternoon, the nuns will be singing Vespers at five. You could go back up for it, quietly, with registration in winter. Hearing it once changes how you remember Salzburg.',
      task: 'Before you rejoin the crowds, decide what you will tell someone about Nonnberg in one sentence that does not use the words beautiful or old. That sentence is your souvenir.'
    }
  ],
  after: `<h2>Practical notes</h2>
<p>Allow ninety minutes at a slow pace, more if you stay for the sung Vespers. Go in the morning for the sharpest view south, or at about 4.30 p.m. to be in the church before Vespers begins. The whole route involves steps or steep lanes; the abbey is not reachable step-free. The church is unheated; in winter dress as if you were outside.</p>
<p>This walk combines naturally with the <a href="/tours/leopoldskron/">Leopoldskron pond walk</a>, which starts where this one ends, or with the fortress. Add its stops to your <a href="/planner/">day planner</a>.</p>`,
  sources: [
    { label: 'Nonnberg Abbey – Salzburg Tourism (opening times, services, registration for Vespers)', url: 'https://www.salzburg.info/en/sights/churches-cemeteries/stift-nonnberg' },
    { label: 'Nonnberg Abbey – Wikipedia (background on the foundation and the church)', url: 'https://en.wikipedia.org/wiki/Nonnberg_Abbey' }
  ]
};
