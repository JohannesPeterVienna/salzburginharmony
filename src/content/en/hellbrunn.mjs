// Walk 2: Hellbrunn – avenue, palace, trick fountains, park
export default {
  slug: 'hellbrunn',
  title: 'Hellbrunn: the Water Palace in the South',
  short: 'Hellbrunn',
  kicker: 'Walk 2 · Half a day out of town',
  desc: 'A self-guided visit to Hellbrunn Palace south of Salzburg: the old avenue, the trick fountains, the park and the hill, with dated opening times for 2026.',
  hero: { file: 'hellbrunn/hero.jpg', alt: 'Yellow facade of Hellbrunn Palace reflected in the pond of the water parterre' },
  facts: { duration: 'about 4 hours including the way there and back', length: 'about 1.5 km inside the grounds; 5 km each way on the avenue if you walk from town', start: 'Hellbrunn bus stop (line 25) or the start of Hellbrunner Allee', cost: 'park free · palace and trick fountains ticketed, open 28 March – 1 November 2026' },
  intro: `<p>Hellbrunn is the place where a prince-archbishop went to play. Markus Sittikus had the summer palace built between 1612 and 1615, remarkably quickly, by Santino Solari, who was also building the cathedral in town. The hill behind it is full of springs, so water became the theme: fountains, grottoes, a mechanical theatre, and tables where the guests got sprayed while the host stayed dry.</p>
<p>This walk takes you there the old way, along the avenue, and then through the four parts of the grounds in a sensible order. Dora takes the lead here; she knows the gardens and the picnic spots. Anton adds the stories. Bring a change of mind about staying dry, and a small towel if you are travelling with children.</p>`,
  before: `<ul>
<li><b>Season 2026:</b> trick fountains, palace and folklore museum open daily from 28 March to 1 November 2026. Opening hours: from 28 March and in April 9.30 a.m.–5.30 p.m. (last admission 4.30 p.m.); May and June 9.30 a.m.–6.30 p.m. (last admission 5.30 p.m.); July and August 9.30 a.m.–7 p.m. (last admission 6 p.m.); September 9.30 a.m.–6.30 p.m. (last admission 5.30 p.m.); October to 1 November 9.30 a.m.–5.30 p.m. (last admission 4.30 p.m.), according to hellbrunn.at, checked 9 November 2026. The 2027 season starts on 25 March 2027 (hellbrunn.at; end of season 1 November 2027 according to salzburg.info, status 11/2025).</li>
<li><b>Outside the season</b> the park stays open, but the fountains are switched off and the palace is closed; in Advent the courtyard holds a Christmas market.</li>
<li><b>Trick fountains tour:</b> about 50 minutes with a mobile audio guide at 21 stations, admissions every 15–20 minutes; palace about 30 minutes more. Dogs are allowed in the park and on the fountains tour on a leash, not in the palace.</li>
<li><b>Getting there:</b> bus line 25 from the city, by bicycle in about 25 minutes, on foot along the Hellbrunner Allee, or by boat on the Salzach in season (salzburg.info). Check current prices on the operator's site before you go; we do not list ticket prices we have not verified on the day.</li>
</ul>`,
  sketch: {
    backdrop: '<path class="s-hill" d="M380 300 Q 470 190 600 260 L600 300 Z"/><rect class="s-water" x="250" y="150" width="120" height="40" rx="20"/><rect class="s-green" x="10" y="20" width="580" height="60" rx="8"/>',
    points: [
      { x: 60, y: 50, label: 'Hellbrunner Allee', lx: 16 }, { x: 250, y: 110, label: 'Palace & courtyard', lx: 16, ly: -8 }, { x: 330, y: 220, label: 'Trick fountains', lx: 16 },
      { x: 230, y: 250, label: 'Water parterre & park', lx: -16, anchor: 'end' }, { x: 450, y: 240, label: 'Hill & Monatsschlössl', lx: 16 }, { x: 540, y: 150, label: 'Zoo (optional)', lx: -16, anchor: 'end', ly: -10 }
    ]
  },
  stations: [
    {
      id: 'hb-allee', title: 'Hellbrunner Allee: the archbishop\'s approach', where: 'From Freisaal or Nonntal south to the palace gate', minutes: 50,
      img: { file: 'hellbrunn/01-allee.jpg', alt: 'Straight tree-lined avenue of Hellbrunner Allee with old oaks and lime trees in autumn colour' },
      body: `<p>The avenue was planted when the palace was built, in the 1610s, which makes it one of the oldest preserved avenues of its kind in Europe. It runs almost dead straight from the edge of the Old Town to the gate of Hellbrunn, about five kilometres, between old oaks, limes and chestnuts, with meadows and a few small manor houses on either side. Cars are kept off it, so you share it with cyclists, runners and dog walkers.</p>
<p>You do not have to walk the whole way. Take bus 25 to Hellbrunn and walk the last stretch of the avenue backwards for twenty minutes to get the feeling, or ride a bicycle from town. If you walk all of it, start in Nonntal and give yourself an hour; the surface is gravel and flat the whole way. The point is to arrive at the palace as its guests did, slowly, with the mountains in front of you.</p>`,
      anton: 'The archbishop rode this way in a carriage with musicians. The straightness is deliberate: you see the goal the whole time and it never seems to get closer. That is baroque thinking about distance.',
      dora: 'In May the meadows along the avenue are full of flowers and the lime trees smell sweet in June. If you have a bicycle, this is the nicest ride in the city. The farm shops near the gate sell apple juice.',
      task: 'Pick one tree on the avenue and estimate how old it is from the width of the trunk. Then look for a young one planted recently. The avenue is kept alive by replacing trees one at a time, so both ages should be there.'
    },
    {
      id: 'hb-palace', title: 'The palace and the courtyard', where: 'Entrance courtyard, ticket office, exhibition "SchauLust"', minutes: 40,
      img: { file: 'hellbrunn/02-palace.jpg', alt: 'Entrance courtyard of Hellbrunn Palace with the ochre facade and the hill rising behind' },
      body: `<p>The palace was never built for living in. Markus Sittikus used it for day visits, feasts and surprises, and then rode back to town in the evening. That is why it is called a pleasure palace and why there are no bedrooms of note. The building is late Renaissance, plain on the outside and painted inside; the permanent exhibition in the state rooms explains how it was used and what the archbishop was like, which is to say fond of practical jokes.</p>
<p>Buy your ticket here and check the time of the next trick fountains admission; they run every fifteen to twenty minutes. If there is a wait, walk the courtyard and look at the hill behind the palace. Every drop of water in the grounds comes from springs in that hill by gravity alone. No pump has ever been needed, which is the real engineering trick of the place.</p>`,
      anton: 'Santino Solari built this and the cathedral at the same time, one for God and one for fun. The archbishop died only four years after the palace was finished, so he did not have long to enjoy it.',
      dora: 'Weddings are held here on most summer weekends. If you see a bride in the courtyard, give her a moment and take your photos later; the light on the facade is better in the afternoon anyway.',
      task: 'Walk once around the outside of the palace. Count the windows on the garden side and on the courtyard side. Why might the two faces of the building be so different in their decoration?'
    },
    {
      id: 'hb-fountains', title: 'The trick fountains', where: 'Guided route with audio guide, 21 stations, about 50 minutes', minutes: 60,
      img: { file: 'hellbrunn/03-fountains.jpg', alt: 'Stone table with seats in the garden of Hellbrunn where hidden water jets spray the guests' },
      body: `<p>The fountains are the reason to come. The route is only walked with a guide or the audio guide, in groups, and it starts at the Prince's Table: a stone table in the open where the archbishop seated his guests, who then found water shooting up through their stone stools while his own stayed dry. Nobody was allowed to stand up before the host. The same idea repeats through grottoes, a Roman theatre, a crown lifted by a water jet, and birds that sing by water pressure.</p>
<p>The highlight is the Mechanical Theatre, a small town of more than two hundred moving figures, driven by water, made in the 1750s. The audio guide tells you where to stand; it is often wise to ignore it and stand elsewhere. You will get a little wet in places however carefully you behave. Protect phones and cameras, and let children go in front; they will remember this more than anything else in Salzburg.</p>`,
      anton: 'The archbishop was a cardinal’s nephew who had seen the water gardens of Italy. He brought the idea home and then improved it with a sense of humour that four hundred years have not dried out.',
      dora: 'Wear shoes you do not mind getting splashed. Keep your bag closed. And when the guide tells you to stand still at the Prince’s Table, know that this is exactly when something happens.',
      task: 'At the Prince’s Table, before the water comes, guess which seats are rigged. Afterwards, think about how the guests must have felt: amused, honoured, or humiliated? The answer says something about court life.'
    },
    {
      id: 'hb-park', title: 'The water parterre and the park', where: 'Ponds, statues, the landscape garden, the playground', minutes: 45,
      img: { file: 'hellbrunn/04-park.jpg', alt: 'Long pond with stone statues and clipped hedges in the Hellbrunn park with the palace in the background' },
      body: `<p>After the fountains, slow down. The water parterre in front of the palace is Italian in spirit, with long ponds, statues of mythical figures and flower beds, and you can walk it in any direction without a ticket. Beyond it the grounds change into an English-style landscape garden with big trees, lawns and winding paths, laid out two centuries later when taste had moved on from straight lines.</p>
<p>There is a large adventure playground for children, open meadows for a picnic, and benches with a view of the palace across the water. Since 2018 the park has hosted changing art installations as part of a sculpture project. In Advent the courtyard and the old entrance become a Christmas market with the palace lit up behind the stalls. The park is free all year and is the best reason to come back in a different season.</p>`,
      anton: 'Two gardens from two centuries sit side by side here: the geometric one that shows power, and the romantic one that pretends to be nature. Walk from one to the other and feel the change in your pace.',
      dora: 'My picnic spot is the lawn south of the long pond, with the palace reflected in the water and the Untersberg behind it. Bread from town, cheese, apples from the avenue, and nothing else needed.',
      task: 'Sit on a bench for five minutes without a phone. Write down three sounds you hear in order of distance. Water is usually the closest, which is the point of this whole garden.'
    },
    {
      id: 'hb-hill', title: 'The hill, the stone theatre and the Monatsschlössl', where: 'Paths up the Hellbrunner Berg behind the palace', minutes: 40,
      img: { file: 'hellbrunn/05-hill.jpg', alt: 'Small hilltop lodge called Monatsschlössl above Hellbrunn seen through trees' },
      body: `<p>Behind the palace a path climbs the Hellbrunner Berg, the hill that supplies the water. On its slope is the stone theatre, a natural rock stage cut and shaped in the 17th century and used for early opera performances; it is counted among the oldest open-air stages north of the Alps. The path continues to the Monatsschlössl, a small lodge that the archbishop reportedly had built within a month, hence the name. It now houses the folklore museum, included in the full ticket.</p>
<p>From the top there are views over the park, the avenue you came along and the Untersberg in the south, and down into the zoo on the far side of the hill. The paths are forest tracks with roots and some steep sections, fine in walking shoes, slippery after rain. Allow forty minutes up and down, more if you go into the museum.</p>`,
      anton: 'A theatre carved out of a rock, a palace built for water, a lodge built in a month: everything at Hellbrunn is a wager that nature can be ordered about. The hill answers by growing back over the paths.',
      dora: 'The museum in the lodge shows costumes, masks and the things people used in farmhouses around Salzburg. If you want to understand the dress Anton and I wear, this is where it comes from.',
      task: 'At the stone theatre, stand where the audience sat and clap once. Listen for the echo. Then imagine four hundred people here in 1617 for an opera, and decide where the singers must have stood.'
    },
    {
      id: 'hb-zoo', title: 'Optional: Zoo Salzburg and the way back', where: 'Next to the park at the foot of the hill', minutes: 90,
      img: { file: 'hellbrunn/06-zoo.jpg', alt: 'Rocky hillside enclosure of Zoo Salzburg at Hellbrunn with trees and a mountain backdrop' },
      body: `<p>The zoo lies at the southern foot of the Hellbrunn hill, against the cliffs, and has its own entrance and ticket. Its animal houses and enclosures use the rock face as a backdrop, which is why it is counted among Salzburg's main sights alongside the palace. With children it easily fills the rest of the afternoon; without them, consider instead the walk back along the avenue in the evening light or the bus from the Hellbrunn stop.</p>
<p>If you plan both the trick fountains and the zoo, start early and buy the fountains ticket first; its last admission is earlier than you think in spring and autumn. For the way back, bus 25 runs to the city centre and the station. If you are on a bicycle, the avenue is lit only near the ends, so leave before dark in winter.</p>`,
      anton: 'The archbishop kept exotic animals at Hellbrunn as well; a zoo here is not a modern idea. The difference is that today the animals have the better accommodation.',
      dora: 'On the way back, the avenue in late afternoon light is one of my favourite quarter-hours in Salzburg. Walk a little, even if you then take the bus from the next stop.',
      task: 'Before you leave the grounds, choose the one thing at Hellbrunn you would tell a friend to come for. Write it in one sentence. If it is not the fountains, you have found something most visitors miss.'
    }
  ],
  after: `<h2>Planning the half day</h2>
<p>Hellbrunn is best as a separate outing rather than squeezed into an Old Town day. Four hours is realistic with the fountains, the park and the hill; add two more for the zoo. From spring to autumn the fountains are open daily; in winter only the park, which is still worth it on a cold clear day. The grounds are flat and mostly gravel; the fountains route has a few steps and wet stone, and the hill paths are forest tracks.</p>
<p>Pair this walk with the <a href="/tours/untersberg/">Untersberg day</a> if you have a car or are using the same bus lines south, or with a quiet evening in town. Add the stops to your <a href="/planner/">day planner</a>; the minutes above are for a slow visit.</p>`,
  sources: [
    { label: 'Hellbrunn Palace & Trick Fountains – Salzburg Tourism (season 2026/2027, hours, access)', url: 'https://www.salzburg.info/en/sights/top10/hellbrunn-palace-trick-fountains' },
    { label: 'Zoo Salzburg – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/top10/zoo-salzburg' }
  ]
};
