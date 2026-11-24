// Interface strings for the shell and the runtime (tour mode, planner, analytics window).
// The analytics window follows the wording of the privacy policy (“Allow analytics” / „Analytics erlauben“, 180 days).
const en = {
  skip: 'Skip to content', tagline: 'Walks with Anton & Dora', main_nav: 'Main navigation', language: 'Language', breadcrumb: 'Breadcrumb',
  ad_label: 'Advertisement', imprint: 'Legal notice', privacy: 'Privacy policy', contact: 'Contact', terms: 'Terms of use', contact_form: 'Contact form',
  analytics_settings: 'Analytics settings', ad_choices: 'Ad privacy choices (Google)',
  footer_about: 'Self-guided walks through Salzburg, Austria, with two fictional hosts. Independent, free to read, written and checked by AdStern in Vienna.',
  footer_ai: 'Anton and Dora are AI-generated, fictional characters. Texts are written with AI assistance and checked against the sources named on each page.',
  footer_explore: 'Explore', footer_legal: 'Legal', footer_planner: 'Day planner',
  footer_fine: 'An independent project. Not affiliated with the City of Salzburg, Salzburg Tourism or any attraction named on this site.',
  sketch_aria: 'Schematic sketch of the route with numbered stops', sketch_caption: 'Schematic sketch, not to scale and not a map. Use a current city map or the signposts on site for directions.',
  runtime: {
    privacy_url: '/privacy/', planner_url: '/planner/',
    a_title: 'Help us improve this website?',
    a_text: 'With your permission, Google Analytics (Google Ireland Ltd.) counts visits and general actions such as a print or export request. Your day plan, your walk progress and your form entries stay private. Analytics cookies last up to 180 days; processing in the USA is possible. The website works fully without analytics. This choice is separate from advertising consent.',
    a_yes: 'Allow analytics', a_no: 'Without analytics', a_close: 'Close without choosing', close: 'Close', a_privacy: 'Privacy details',
    a_on: 'Analytics is enabled on this website.', a_off: 'Analytics is disabled on this website.', a_none: 'No choice saved in this browser yet.',
    a_blocked: 'Your browser privacy preference (Global Privacy Control or Do Not Track) or a U.S. opt-out is respected. Analytics remains disabled.',
    a_legal: 'No analytics is collected on this privacy or legal page. Your choice applies to the other pages.',
    a_saved_yes: 'Analytics allowed.', a_saved_no: 'Analytics switched off.',
    restart: 'Start the walk again', resume: 'Continue the walk at stop ', stop: 'Stop', says: 'says', look: 'Look closer', back: 'Back', next: 'Next stop', finish: 'Finish the walk', leave: 'Leave walk mode',
    done_title: 'You have finished this walk.', done_text: 'Thank you for walking with us. Your progress is saved in this browser only.', to_planner: 'Open the day planner', print: 'Print this walk',
    added: 'Added – open the day planner', plan_title: 'My Salzburg day', plan_empty: '(no stops chosen)', min: 'min', buffer: 'Buffer', plan_total: 'Time at the stops incl. buffer', ends: 'ends about',
    plan_note: 'Walking, transport, queues and opening hours are not included. Check them before you go.', stops: 'stops', open: 'open', minutes_at: 'Minutes at',
    plan_hint: 'Tick the stops you want on the left. Your plan stays in this browser.', up: 'move up', down: 'move down', copied: 'Plan copied.', copy_manual: 'Copy your plan:', cleared: 'Plan cleared.'
  }
};
const de = {
  skip: 'Zum Inhalt', tagline: 'Spaziergänge mit Anton & Dora', main_nav: 'Hauptnavigation', language: 'Sprache', breadcrumb: 'Pfad',
  ad_label: 'Werbung', imprint: 'Impressum', privacy: 'Datenschutz', contact: 'Kontakt', terms: 'Nutzungsbedingungen', contact_form: 'Kontaktformular',
  analytics_settings: 'Analytics-Einstellungen', ad_choices: 'Werbe-Datenschutz (Google)',
  footer_about: 'Selbst geführte Spaziergänge durch Salzburg mit zwei fiktiven Gastgebern. Unabhängig, kostenlos lesbar, geschrieben und geprüft von AdStern in Wien.',
  footer_ai: 'Anton und Dora sind KI-generierte, fiktive Figuren. Die Texte entstehen mit KI-Unterstützung und werden gegen die auf jeder Seite genannten Quellen geprüft.',
  footer_explore: 'Entdecken', footer_legal: 'Rechtliches', footer_planner: 'Tagesplaner (englisch)',
  footer_fine: 'Ein unabhängiges Projekt. Keine Verbindung zur Stadt Salzburg, zu Tourismus Salzburg oder zu den genannten Sehenswürdigkeiten.',
  sketch_aria: 'Schematische Skizze des Weges mit nummerierten Stationen', sketch_caption: 'Schematische Skizze, nicht maßstäblich und keine Karte. Für den Weg bitte einen aktuellen Stadtplan oder die Wegweiser vor Ort nutzen.',
  runtime: {
    privacy_url: '/de/datenschutz/', planner_url: '/planner/',
    a_title: 'Dürfen wir diese Website verbessern?',
    a_text: 'Mit deiner Zustimmung zählt Google Analytics (Google Ireland Ltd.) Besuche und allgemeine Aktionen wie eine Druck- oder Exportanforderung. Dein Tagesplan, dein Fortschritt und deine Formulareingaben bleiben privat. Analytics-Cookies gelten höchstens 180 Tage; eine Verarbeitung in den USA ist möglich. Die Website funktioniert vollständig ohne Analytics. Diese Wahl ist getrennt von einer Werbeeinwilligung.',
    a_yes: 'Analytics erlauben', a_no: 'Ohne Analytics', a_close: 'Schließen ohne Auswahl', close: 'Schließen', a_privacy: 'Datenschutz im Detail',
    a_on: 'Analytics ist auf dieser Website eingeschaltet.', a_off: 'Analytics ist auf dieser Website ausgeschaltet.', a_none: 'In diesem Browser ist noch keine Wahl gespeichert.',
    a_blocked: 'Dein Browser-Datenschutzsignal (Global Privacy Control oder Do Not Track) bzw. ein US-Widerspruch wird berücksichtigt. Analytics bleibt ausgeschaltet.',
    a_legal: 'Auf dieser Datenschutz- oder Rechteseite findet keine Analytics-Messung statt. Deine Wahl gilt für die übrigen Seiten.',
    a_saved_yes: 'Analytics erlaubt.', a_saved_no: 'Analytics ausgeschaltet.',
    restart: 'Spaziergang neu starten', resume: 'Spaziergang fortsetzen bei Station ', stop: 'Station', says: 'sagt', look: 'Genauer hinsehen', back: 'Zurück', next: 'Nächste Station', finish: 'Spaziergang beenden', leave: 'Modus verlassen',
    done_title: 'Du hast diesen Spaziergang beendet.', done_text: 'Danke fürs Mitgehen. Dein Fortschritt ist nur in diesem Browser gespeichert.', to_planner: 'Tagesplaner öffnen', print: 'Spaziergang drucken',
    added: 'Hinzugefügt – Tagesplaner öffnen', plan_title: 'Mein Salzburg-Tag', plan_empty: '(keine Stationen gewählt)', min: 'Min.', buffer: 'Puffer', plan_total: 'Zeit an den Stationen inkl. Puffer', ends: 'endet etwa',
    plan_note: 'Wege, Verkehrsmittel, Warteschlangen und Öffnungszeiten sind nicht enthalten. Bitte vorher prüfen.', stops: 'Stationen', open: 'öffnen', minutes_at: 'Minuten bei',
    plan_hint: 'Wähle links die Stationen aus. Dein Plan bleibt in diesem Browser.', up: 'nach oben', down: 'nach unten', copied: 'Plan kopiert.', copy_manual: 'Plan kopieren:', cleared: 'Plan gelöscht.'
  }
};
export const UI = { en, de };
