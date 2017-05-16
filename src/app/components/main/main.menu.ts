/**
 * Created by jarek on 27/03/2017.
 */
export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'fa fa-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'zwyciezcy',
        data: {
          menu: {
            title: 'Zwycięzcy',
            icon: 'fa fa-trophy',
            selected: false,
            expanded: false,
            order: 250,
          }
        }
      }
    ]
  }
];

/*export const PAGES_MENU = [
 {
 path: '',
 children: [
 {
 path: 'dashboard',
 data: {
 menu: {
 title: 'Dashboard',
 icon: 'ion-android-home',
 selected: false,
 expanded: false,
 order: 0
 }
 }
 },
 {
 path: 'years',
 data: {
 menu: {
 title: 'Lata budżetowe',
 icon: 'ion-calendar',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'tasks',
 data: {
 menu: {
 title: 'Zadania',
 icon: 'ion-clipboard',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'units',
 data: {
 menu: {
 title: 'Jednostki',
 icon: 'ion-briefcase',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'departaments',
 data: {
 menu: {
 title: 'Działy',
 icon: 'ion-gear-a',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'chapters',
 data: {
 menu: {
 title: 'Rozdziały',
 icon: 'ion-flag',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'paragraphs',
 data: {
 menu: {
 title: 'Paragrafy',
 icon: 'ion-pin',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'users',
 data: {
 menu: {
 title: 'Użytkownicy',
 icon: 'ion-person-stalker',
 selected: false,
 expanded: false,
 order: 250,
 }
 }
 },
 {
 path: 'help',
 data: {
 menu: {
 title: 'Pomoc',
 icon: 'ion-help-buoy',
 selected: false,
 expanded: false,
 order: 250,
 }
 },
 children: [
 {
 path: 'contact',
 data: {
 menu: {
 title: 'Kontakt',
 icon: 'ion-android-contact',
 selected: false,
 expanded: false,
 order: 100,
 }
 }
 },
 {
 path: 'faq',
 data: {
 menu: {
 title: 'FAQu',
 icon: 'ion-information',
 selected: false,
 expanded: false,
 order: 100,
 }
 }
 },
 {
 path: 'about',
 data: {
 menu: {
 title: 'O Programie',
 icon: 'ion-code',
 selected: false,
 expanded: false,
 order: 100,
 }
 }
 },
 {
 path: 'guide',
 data: {
 menu: {
 title: 'Instrukcja',
 icon: 'ion-document-text',
 selected: false,
 expanded: false,
 order: 100,
 }
 }
 },
 ]
 }
 ]
 }
 ];*/
