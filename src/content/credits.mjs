// Licence record of every photograph used on the site (details and history: BILDNACHWEISE.md in the repository root).
// A photo is shown only if its file exists AND it is listed here. Licence pages on Wikimedia Commons were checked on
// 06.11.2026 (title photos) and on 24.11.2026 (station photos).
const CC_BY_2 = ['CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0/'];
const CC_BY_3 = ['CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'];
const CC_BY_4 = ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'];
const CC0 = ['CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/'];
const c = (author, [license, licenseUrl], file, title, edit, accessed) => ({ author, license, licenseUrl, source: 'https://commons.wikimedia.org/wiki/File:' + file, title, edit, accessed });
export const CREDITS = {
  'mirabell-to-fortress/hero.jpg': c('Salzburgnischen', CC_BY_3, 'Mirabellgarten-Ausblick_auf_die_Festung_Hohensalzburg_-_panoramio.jpg', 'Mirabellgarten-Ausblick auf die Festung Hohensalzburg', 'cropped, resized', '2026-11-06'),
  'hellbrunn/hero.jpg': c('Jakub Hałun', CC_BY_4, 'Hellbrunn_Palace,_Salzburg,_Austria,_20260502_0902_0612.jpg', 'Hellbrunn Palace, Salzburg, Austria', 'resized', '2026-11-06'),
  'nonnberg/hero.jpg': c('Jorge Franganillo', CC_BY_2, 'Salzburg_(48489551981).jpg', 'Salzburg (48489551981)', 'resized', '2026-11-06'),
  'kapuzinerberg/hero.jpg': c('Leonhard Lenz', CC0, 'Kapuzinerberg_from_M%C3%B6nchsberg_Salzburg_2023-09-28_01.jpg', 'Kapuzinerberg from Mönchsberg, Salzburg', 'resized', '2026-11-06'),
  'untersberg/hero.jpg': c('Renek78', CC0, 'Untersberg_in_winter_of_2023-25.jpg', 'Untersberg in winter', 'resized', '2026-11-06'),
  'mirabell-to-fortress/01-palace.jpg': c('Hiroki Ogawa', CC_BY_3, 'Schloss_Mirabell_Salzburg_Austria_-_panoramio.jpg', 'Schloss Mirabell Salzburg Austria', 'cropped to 3:2, resized', '2026-11-24'),
  'mirabell-to-fortress/04-mozartplatz.jpg': c('Jorge Franganillo', CC_BY_2, 'Salzburg_Mozartplatz_(48481773501).jpg', 'Salzburg Mozartplatz', 'cropped to 3:2, resized', '2026-11-24'),
  'mirabell-to-fortress/05-residenzplatz.jpg': c('Leonhard Lenz', CC0, 'Residenzbrunnen_Salzburg_at_night_2023-09-28_01.jpg', 'Residenzbrunnen Salzburg at night', 'cropped to 3:2, resized', '2026-11-24'),
  'mirabell-to-fortress/08-fortress.jpg': c('Jorge Franganillo', CC_BY_2, 'Festung_Hohensalzburg_-_49787305433.jpg', 'Festung Hohensalzburg', 'cropped to 3:2, resized', '2026-11-24'),
  'getreidegasse/06-stpeter.jpg': c('Leonhard Lenz', CC0, 'Petersfriedhof_Salzburg_2023-09-27_02.jpg', 'Petersfriedhof Salzburg', 'cropped to 3:2, resized', '2026-11-24')
};
