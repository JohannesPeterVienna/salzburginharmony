// Walk 1: Mirabell Palace → Mirabell Gardens → across the river → the squares → Hohensalzburg Fortress
export default {
  slug: 'mirabell-to-fortress',
  title: 'From Mirabell Palace to the Fortress',
  short: 'Mirabell to the Fortress',
  kicker: 'Walk 1 · The classic line',
  desc: 'A self-guided Salzburg walk from Mirabell Palace through the gardens, over the Salzach and across the baroque squares up to Hohensalzburg Fortress, with Anton and Dora.',
  hero: { file: 'mirabell-to-fortress/hero.jpg', alt: 'Mirabell Gardens in summer bloom, with flower beds and the fortress on its hill in the distance' },
  facts: { duration: 'about 3–4 hours with the fortress', length: 'roughly 3 km on foot plus the funicular or the footpath', start: 'Mirabell Palace, Mirabellplatz', cost: 'gardens free · fortress tickets from € 12.00 (foot path, basic) to € 19.20 (all-inclusive with railway), 2026 prices' },
  intro: `<p>If you only have one day in Salzburg, this is the line most visitors end up walking, and for good reason: it strings together the baroque garden, the river, the three great squares and the castle on the hill in the order they were meant to be seen. The gardens were laid out around 1690 with their main axis pointing straight at the cathedral dome and the fortress, so the walk follows a view that an archbishop's architect drew on paper more than three centuries ago.</p>
<p>Anton likes to start early, before the coaches arrive at Mirabellplatz; Dora prefers the afternoon light on the fountains. Either way, give yourself time at each stop. Nothing on this route needs a ticket until the very end, and the fortress is open all year.</p>`,
  before: `<ul>
<li><b>Mirabell Gardens:</b> open daily from about 6 a.m. until dusk, admission free; parts close in winter, the dwarf garden and hedge theatre are closed in the winter months, and the Orangery Garden is closed for redesign until December 2026 (salzburg.info, status 10/2026).</li>
<li><b>Mirabell Palace:</b> the angel staircase can be seen Monday to Saturday about 8 a.m.–6 p.m.; the Marble Hall Monday, Wednesday and Thursday about 8 a.m.–4 p.m., Tuesday and Friday 1–4 p.m., not during events; closed Sundays and holidays (salzburg.info, status 10/2026).</li>
<li><b>Hohensalzburg Fortress:</b> 2026 hours January–April and October–December 9.30 a.m.–5 p.m. (Easter and Advent weekends to 6 p.m.), May–September 8.30 a.m.–8 p.m., last admission 30 minutes before closing. From 11 January to 14 March 2027 the fortress railway is under revision and the fortress can only be reached on foot (salzburg.info, checked 6 November 2026).</li>
<li><b>Tickets 2026:</b> all-inclusive with the railway € 19.20 adults / € 7.30 children; basic with railway € 15.50 / € 6.30; via the foot path € 12.00 / € 4.90 basic, € 14.50 / € 5.60 all-inclusive. The Salzburg Card includes one visit (salzburg.info, checked 6 November 2026).</li>
</ul>`,
  sketch: {
    backdrop: '<rect class="s-water" x="0" y="118" width="600" height="34" rx="17"/><path class="s-hill" d="M330 300 Q 440 175 560 300 Z"/><rect class="s-green" x="20" y="20" width="150" height="86" rx="8"/>',
    points: [
      { x: 60, y: 44, label: 'Mirabell Palace', lx: 16 }, { x: 110, y: 88, label: 'Gardens', lx: 16 }, { x: 230, y: 112, label: 'Makartplatz & bridge', lx: -16, anchor: 'end', ly: -10 },
      { x: 300, y: 180, label: 'Mozartplatz', lx: 14 }, { x: 350, y: 215, label: 'Residenzplatz', lx: 14 }, { x: 395, y: 245, label: 'Cathedral', lx: 14 },
      { x: 430, y: 270, label: 'Kapitelplatz', lx: 14 }, { x: 470, y: 225, label: 'Fortress', lx: 14, ly: -8 }
    ]
  },
  stations: [
    {
      id: 'mf-palace', title: 'Mirabell Palace and the angel staircase', where: 'Mirabellplatz · entrance from the garden side', minutes: 25,
      img: { file: 'mirabell-to-fortress/01-palace.jpg', alt: 'White marble balustrade of the angel staircase in Mirabell Palace with small putti figures' },
      body: `<p>The palace began in 1606 as a residence that Prince-Archbishop Wolf Dietrich von Raitenau built for Salome Alt and their children, outside the city walls of the time. His successor renamed it Mirabell, and after a fire and several rebuilds it became the baroque complex you see today. Most of the building is now the city's administration, including the mayor's office, so only two parts are open: the staircase and, at set times, the Marble Hall.</p>
<p>The staircase is worth the detour even if the hall is closed. Georg Raphael Donner designed the marble balustrade with its crowd of putti; look at how the figures lean, climb and ignore the visitors. The Marble Hall above was once the archbishop's banqueting room; today it is a wedding and concert venue, and the Mozart family performed here in the 18th century.</p>`,
      anton: 'Wolf Dietrich built this for a family he was never allowed to marry into. Most of the baroque Salzburg you will see today was ordered by men like him. Keep that in mind on the squares.',
      dora: 'If the hall is open, step in for one minute and look at the ceiling first, then the floor. Weddings happen here most mornings, so wait at the door if a couple is inside.',
      task: 'On the angel staircase, pick one putto and describe in a sentence what it is doing. Then find a second one that seems to answer it. The stair was designed to be read on the way up, not photographed from the bottom.'
    },
    {
      id: 'mf-gardens', title: 'Mirabell Gardens: the axis to the fortress', where: 'Great parterre, Pegasus fountain, Rose Hill steps', minutes: 35,
      img: { file: 'mirabell-to-fortress/02-gardens.jpg', alt: 'Formal flower beds of the Mirabell Gardens with the central fountain and the cathedral dome in the distance' },
      body: `<p>Walk out of the palace onto the great parterre. The layout dates from about 1690 and follows plans by Johann Bernhard Fischer von Erlach: a central fountain, four groups of figures by Ottavio Mosto for fire, air, earth and water, and clipped hedges that frame the view. The trick of the garden is that its main axis does not end in the garden at all. It runs straight on to the cathedral dome and the fortress above it, pulling the whole city into the picture.</p>
<p>The smaller parterre holds the Pegasus fountain. The copper horse was cast in 1661 for a horse pond in the Old Town and only came here in 1913. The steps beside it lead up to the Rose Hill, a small rise that gives the best overview of the pattern of the beds. In the western corner is the hedge theatre, one of the oldest north of the Alps, and the dwarf garden with its marble figures; both close in winter.</p>`,
      anton: 'Stand at the far end of the parterre, turn around, and you will see what the gardener wanted: palace, beds, fountain, cathedral, fortress, all on one line. That line is the reason the garden is famous.',
      dora: 'The beds are replanted several times a year. In spring it is tulips, in summer summer flowers, and in autumn the gardeners switch again. Ask yourself what season the colours are telling you.',
      task: 'Find two viewpoints along the main axis, one at ground level and one from the Rose Hill steps. Which one makes the fortress look closer? Say it in one sentence before you take the picture, and keep the path clear for others.'
    },
    {
      id: 'mf-bridge', title: 'Makartplatz and the river crossing', where: 'Makartplatz, Mozart Residence, Makartsteg footbridge', minutes: 20,
      img: { file: 'mirabell-to-fortress/03-bridge.jpg', alt: 'Pedestrian bridge over the Salzach river with the Old Town and fortress behind it' },
      body: `<p>Leave the gardens by the southern gate and you are on Makartplatz. The house at number 8 is the Mozart Residence, where the family lived from 1773 after leaving the Getreidegasse; it is a museum today. Across the square stands the Trinity Church, another Fischer von Erlach building, and the Landestheater is a few steps away.</p>
<p>Walk down to the river. The Salzach is fast and green-grey, fed by Alpine water, and the Old Town on the far bank sits in a bend of it with the Mönchsberg behind and the fortress above. The Makartsteg is a footbridge; the Staatsbrücke a little downstream carries the traffic. Either one gives you the postcard view of the domes and towers lined up under the castle. Cross and keep right along the bank until you reach the Mozartplatz.</p>`,
      anton: 'The river decided where the city stands: the Romans built on the bend, the archbishops built on the hill, and the newer town grew on this side. You are walking from the newer Salzburg into the old one.',
      dora: 'On the bridge the wind is always a little stronger. In the afternoon the light comes from behind you and the Old Town facades glow. In the morning they are in shade and the water is bright instead.',
      task: 'Halfway across the bridge, count the church towers and domes you can see on the far bank. Then find the one that is not a church. Decide which single building you would use to describe this skyline to someone at home.'
    },
    {
      id: 'mf-mozartplatz', title: 'Mozartplatz', where: 'Old Town, between the river and Residenzplatz', minutes: 15,
      img: { file: 'mirabell-to-fortress/04-mozartplatz.jpg', alt: 'Bronze statue of Mozart on a marble pedestal in the middle of Mozartplatz' },
      body: `<p>The square is small and busy, and its centre is the statue by Ludwig Schwanthaler. It was meant to be unveiled in 1841, fifty years after the composer's death, but workers found a Roman mosaic while preparing the ground, and recovering it took a year. The unveiling happened on 4 September 1842 with Mozart's sons present; a copy of the mosaic lies at the foot of the statue.</p>
<p>Look around the edges. The low building at number 5, the Imhofstöckl, houses the tourist information office, with a piece of the old city wall behind it. The New Residence on the south side has held the Salzburg Museum since 2007; its tower carries the carillon that plays at 7 a.m., 11 a.m. and 6 p.m. At number 8 lived Constanze, Mozart's widow, and a few steps away the poet Georg Trakl was born in 1887.</p>`,
      anton: 'The square is older than the statue by centuries, but the statue is what people remember. Salzburg has a habit of turning its history into monuments, and this is the first one on our way.',
      dora: 'If you are here on the hour, listen for the carillon in the tower of the New Residence. It is quieter than you expect, so stop talking for a moment.',
      task: 'Walk once around the statue. From which side does Mozart look at you, and from which side does he look away? Choose the side you prefer and say why, without using the word famous.'
    },
    {
      id: 'mf-residenzplatz', title: 'Residenzplatz and the Residence Fountain', where: 'Between the Old and New Residence and the cathedral', minutes: 20,
      img: { file: 'mirabell-to-fortress/05-residenzplatz.jpg', alt: 'Baroque Residence Fountain with horses, giants and a Triton figure in front of the cathedral' },
      body: `<p>Residenzplatz is the biggest of the squares that Wolf Dietrich cleared at the end of the 16th century; fifty-five medieval houses were demolished for it, and the design follows the Italian architect Vincenzo Scamozzi. On one side stands the Old Residence, where the prince-archbishops lived and governed; opposite is the New Residence; the cathedral closes the third side, and a row of townhouses the fourth.</p>
<p>The fountain in the middle was commissioned by Archbishop Guidobald Thun and is attributed to Tommaso di Garone. Read it from the bottom up: four horses burst out of the rock, giants carry the lower basin, three dolphins balance the upper one, and a Triton on top blows a jet of water from his shell. In September the square hosts the St. Rupert's Fair, and in Advent the Christmas market, so its character changes with the calendar.</p>`,
      anton: 'Fifty-five houses were pulled down for this square. The archbishop wanted Rome north of the Alps, and he got it. Whether the people who lost their homes agreed is not written on any plaque.',
      dora: 'Stand with your back to the fountain and look at the cathedral facade. The marble came from the Untersberg, the mountain you will see later from the fortress. The whole city is built from that hill.',
      task: 'First look at the fountain as a single silhouette, then as separate figures. Which part seems to move and which stands still? Compare the order of the New Residence facade with the chaos of the horses and decide which the sculptor wanted you to notice first.'
    },
    {
      id: 'mf-cathedral', title: 'Domplatz and the cathedral', where: 'Cathedral Square, under the arcades', minutes: 30,
      img: { file: 'mirabell-to-fortress/06-cathedral.jpg', alt: 'Marble facade of Salzburg Cathedral with its two towers seen from Domplatz' },
      body: `<p>Pass through the arcades and you are on Domplatz, enclosed on three sides by the cathedral, the Residence and a wing of St. Peter's. The column in the middle is the Immaculata, a Marian statue made between 1766 and 1771 by the brothers Hagenauer in marble and cast lead. Stand in the centre of the Franziskanergasse arcade and the crown held by the angels on the cathedral facade appears to settle onto her head; the alignment was intended.</p>
<p>The cathedral itself is early baroque, built under Markus Sittikus and Paris Lodron and consecrated in 1628; the facade carries the statues of Peter and Paul and of the local saints Rupert and Virgil. Inside are the bronze baptismal font of 1311 on lions from around 1200, where Mozart was baptised, the organs, and the crypt. Entry is by paid admission, which funds the upkeep. In summer the square becomes the stage for the Festival's Jedermann; in winter it holds the Christmas market.</p>`,
      anton: 'Three prince-archbishops are named on this facade and the square. The cathedral was burnt, rebuilt, bombed in 1944 and repaired again. What you see is patient work more than one grand gesture.',
      dora: 'Inside, the light changes completely with the weather. On a grey day the dome is almost dark; on a sunny afternoon it fills with light. If you have a choice, go in when the sun is out.',
      task: 'Find the spot under the arcade where the crown on the facade sits on the statue’s head. Move one step left and one step right. The whole effect depends on where you stand; note how few steps it takes to lose it.'
    },
    {
      id: 'mf-kapitelplatz', title: 'Kapitelplatz and the way up', where: 'Below the fortress, by the horse pond and the giant chessboard', minutes: 15,
      img: { file: 'mirabell-to-fortress/07-kapitelplatz.jpg', alt: 'Kapitelplatz with the large golden sphere sculpture and the fortress on the hill above' },
      body: `<p>South of the cathedral the ground opens into Kapitelplatz. The baroque horse pond on its edge was built in 1732 for the archbishop's horses, with Neptune standing over it. The large golden sphere with a man on top is Sphaera, a sculpture by Stephan Balkenhol from 2007, and the oversized chessboard beside it is usually in use. Above everything hangs the fortress wall.</p>
<p>From here you have two ways up. The fortress railway leaves from Festungsgasse and has been running since 1892; it takes about a minute. The footpath climbs from the same lane in roughly fifteen to twenty minutes with good views over the roofs on the way. Tickets differ depending on which you choose, and in winter 2027 the railway closes for maintenance, so check the box above before you decide.</p>`,
      anton: 'I take the footpath. You arrive the way soldiers, pilgrims and delivery boys arrived for eight hundred years, and you understand why nobody ever took this castle by force.',
      dora: 'If you have children, tired feet or a stroller, the railway is the better choice. Keep your ticket; the ride down is included and the evening descent is lovely.',
      task: 'Before you go up, turn around on Kapitelplatz and look at the cathedral from behind. Then look at the fortress. Which of the two buildings was meant to be seen from here, and which was meant to see?'
    },
    {
      id: 'mf-fortress', title: 'Hohensalzburg Fortress', where: 'Festungsberg · courtyards, bastions, museums, panorama', minutes: 90,
      img: { file: 'mirabell-to-fortress/08-fortress.jpg', alt: 'Courtyard inside Hohensalzburg Fortress with the keep and a view over the city' },
      body: `<p>Archbishop Gebhard started the castle in 1077, and his successors kept adding to it until around 1500, when Leonhard von Keutschach gave it the outline you see. It is the largest fully preserved castle in central Europe and was never taken by an enemy army. The courtyards and bastions are free to wander once you are inside; the museums, the Gothic prince's rooms with their original furnishings from 1501/02, the armoury and the panorama tour up the keep are in the ticket.</p>
<p>Take the panorama route if your ticket allows: it climbs past the dungeon to the viewing platform at the top of the keep and comes down along the battlements to the Salzburg Bull, a mechanical organ. From the walls you see the city in the river bend, the Mirabell axis you walked, the Kapuzinerberg across the water, and south of everything the flat top of the Untersberg. On Sundays at 11.45 a.m. the tower trumpeters play from the trumpet tower.</p>`,
      anton: 'Everything you walked this morning is laid out below you like the garden plan: palace, beds, river, squares. This is where the walk closes its circle. Sit down on a bastion and let it settle.',
      dora: 'There is a café in the courtyard, but the best picnic spot is on the bastion facing south, with the mountains in front of you. Bring something from a bakery in town; the climb earns it.',
      task: 'From the walls, find the Mirabell Gardens where you started. Trace with your finger the route you walked. Then find one place you did not visit today and give it a name for your next walk.'
    }
  ],
  after: `<h2>How this walk fits into a day</h2>
<p>Allow three to four hours including the fortress, or two hours if you only climb the path for the view and skip the museums. The gardens and the squares are at their calmest before 9 a.m.; the fortress is busiest between 11 a.m. and 3 p.m. If you want lunch on the way, the Getreidegasse and the Alter Markt are two minutes from Residenzplatz, and the <a href="/tours/getreidegasse/">Getreidegasse walk</a> can be joined there. For the evening, the fortress ticket includes the ride down, and the squares are lit after dark.</p>
<p>Accessibility: the gardens and squares are level with gravel and cobbles; the angel staircase and the Rose Hill are steps only. The fortress railway makes the castle reachable without the climb, but the interior has many stairs and uneven floors; the fortress website lists which parts are step-free.</p>
<p>Add the stops you want to your <a href="/planner/">day planner</a>; the default minutes above are generous estimates for a slow walk, not timings.</p>`,
  sources: [
    { label: 'Mirabell Palace & Gardens – Salzburg Tourism (opening times, status 10/2026)', url: 'https://www.salzburg.info/en/sights/top10/mirabell-palace-gardens' },
    { label: 'Hohensalzburg Fortress – Salzburg Tourism (opening times and 2026 prices)', url: 'https://www.salzburg.info/en/sights/top10/hohensalzburg-fortress' },
    { label: 'Residenzplatz & Residence Fountain – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/squares-streets/residenzplatz' },
    { label: 'Mozartplatz & Mozart Monument – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/squares-streets/mozartplatz' },
    { label: 'Cathedral Square & Marian statue – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/squares-streets/domplatz-marienstatue' },
    { label: 'Salzburg Cathedral – Salzburg Tourism', url: 'https://www.salzburg.info/en/sights/churches-cemeteries/salzburger-cathedral' }
  ]
};
