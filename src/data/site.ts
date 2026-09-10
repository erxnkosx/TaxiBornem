import {
  Plane, Briefcase, Star, Navigation2,
} from "lucide-react";

// ─── Constanten ────────────────────────────────────────────────────────────────
export type Page = "home" | "diensten" | "tarieven" | "over-ons" | "contact" | "success" | "not-found";

// Echte URL's per pagina — gebruikt door Navbar, Footer en alle CTA-knoppen.
export const PATHS: Record<Page, string> = {
  home: "/",
  diensten: "/diensten",
  tarieven: "/tarieven",
  "over-ons": "/over-ons",
  contact: "/contact",
  success: "/bedankt",
  "not-found": "/404",
};

export const PHONE = "+32 472 70 62 45";
export const PHONE_RAW = "+32472706245";
export const BTWNUMMER= "BE 1019.703.590";
export const WHATSAPP_URL = "https://wa.me/32472706245?text=Hallo%20Hamid%2C%20ik%20wil%20graag%20een%20taxi%20boeken.";
export const EMAIL = "info@taxibornem.be";
export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=5113066939281304031";

// Access key van Web3Forms (web3forms.com) — verwerkt het boekingsformulier.
// Deze sleutel mag publiek zijn: ze bepaalt enkel naar welke mailbox de
// aanvraag gaat. Vervang door de echte sleutel uit je Web3Forms-account.
export const WEB3FORMS_ACCESS_KEY = "0450fe7f-daa2-4019-849d-8e6c272baa5c";

// ─── Data ─────────────────────────────────────────────────────────────────────
export const services = [
  {
    icon: Plane,
    slug: "luchthavenvervoer",
    image: "/dienst-luchthaven.webp",
    title: "Luchthavenvervoer",
    subtitle: "Airport transfer",
    description: "Stressvrij naar Brussels Airport (Zaventem), Charleroi of Eindhoven. Wij wachten op u bij aankomst.",
    tag: "Meest gevraagd",
    details: [
      "Brussels Airport (Zaventem), Charleroi en Eindhoven",
      "Vluchttracking: bij vertraging wachten we, zonder bijkomende kosten",
      "Hulp met bagage, in- en uitladen",
    ],
    note: "Ophalen aan de terminal: toeslag luchthavenparkeren +€8,00.",
  },
  {
    icon: Briefcase,
    slug: "zakelijk-vervoer",
    image: "/dienst-zakelijk.webp",
    title: "Zakelijk vervoer",
    subtitle: "Business travel",
    description: "Punctueel, discreet en professioneel. Ideaal voor executives, zakenreizen en corporate events in de Benelux.",
    tag: null,
    details: [
      "Discrete, professionele chauffeur",
      "Facturatie mogelijk voor bedrijven",
      "Vaste chauffeur voor terugkerende ritten",
      "Stipt — afgestemd op uw agenda",
    ],
    note: null,
  },
  {
    icon: Star,
    slug: "prive-ritten",
    image: "/dienst-prive.webp",
    title: "Privé ritten",
    subtitle: "Private rides",
    description: "Uw persoonlijke chauffeur voor daguitstappen, avondshopping of gewoon een comfortabele rit naar huis.",
    tag: null,
    details: [
      "Daguitstappen en avondshopping",
      "Veilig thuisgebracht, ook 's nachts",
      "Wachtdienst mogelijk tijdens uw afspraak",
      "Comfortabele, verzorgde wagen",
    ],
    note: null,
  },
  {
    icon: Navigation2,
    slug: "lange-afstanden",
    image: "/dienst-lange-afstand.webp",
    title: "Lange afstanden",
    subtitle: "Long distance",
    description: "Parijs, Amsterdam, Keulen of elke bestemming in Europa. Comfortabel en aan een vaste prijs, op voorhand bevestigd.",
    tag: null,
    details: [
      "Parijs, Amsterdam, Keulen en heel Europa",
      "Vaste prijs, op voorhand afgesproken",
      "Comfortabel voor lange ritten",
      "Ook retour mogelijk",
    ],
    note: null,
  },
];

// ─── Tarieven ─────────────────────────────────────────────────────────────────
// Losse getallen zodat de prijscalculator ermee kan rekenen.
// Pas hier de tarieven aan; de tarievenpagina neemt ze automatisch over.
export const rates = {
  base: 5, // starttarief bij elke rit (€)
  perKm: 2.7, // prijs per kilometer (€)
  waitingPerHour: 30, // wachttijd (€/uur)
  surcharges: {
    night: 15, // 's nachts, 22:00–06:00 (%)
    weekend: 7.5, // zaterdag & zondag (%)
    holiday: 15, // officiële feestdagen (%)
    airportParking: 8, // luchthavenparkeren, ophaal aan terminal (€)
  },
};

/** Percentage in Belgisch formaat, met + ervoor: 7.5 → "+7,5%" */
export function pct(waarde: number): string {
  return "+" + String(waarde).replace(".", ",") + "%";
}

/** Hoogste losse toeslag — gebruikt in de "0 – x%" samenvatting. */
export const maxSurchargePct = Math.max(
  rates.surcharges.night,
  rates.surcharges.weekend,
  rates.surcharges.holiday,
);

// Toeslagen zoals ze getoond worden in "Toeslagen in één oogopslag".
// De percentages komen uit rates.surcharges, dus je past ze daar aan — niet hier.
export const surcharges = [
  { icon: "moon", label: "Nachttoeslag", desc: "22:00 – 06:00", value: pct(rates.surcharges.night) },
  { icon: "calendar", label: "Weekendtoeslag", desc: "Zaterdag & zondag", value: pct(rates.surcharges.weekend) },
  { icon: "party", label: "Feestdagentoeslag", desc: "Officiële feestdagen", value: pct(rates.surcharges.holiday) },
  { icon: "plane", label: "Luchthavenparkeren", desc: "Ophaal aan terminal", value: "+€8,00" },
  { icon: "baby", label: "Kinderzitje", desc: "Op aanvraag", value: "Gratis" },
  { icon: "clock", label: "Wachttijd", desc: "We wachten ter plaatse", value: "€30,00/u" },
];

// Betaalmethoden zoals getoond op de tarievenpagina.
// De icon-sleutel wordt in TarievenPage.tsx aan een icoon gekoppeld, zodat
// je hier vrij mag herordenen of iets tussenvoegen zonder dat de iconen
// verschuiven.
export const paymentMethods = [
  { icon: "cash", label: "Cash" },
  { icon: "card", label: "Bancontact" },
  { icon: "qr", label: "Payconiq" },
  { icon: "card", label: "Visa & Mastercard" },
  { icon: "bank", label: "Overschrijving voor zakelijke klanten" },
];

// Welke FAQ-vragen tonen op de tarievenpagina (verwijst naar faqItems hierboven).
// De cijfers zijn de posities in faqItems: 0 = eerste vraag, 2 = derde, enzovoort.
export const tariffFaqIndexes = [0, 2, 4, 5];
export const faqItems = [
  {
    q: "Hoe kan ik een taxi boeken?",
    a: "Via het boekingsformulier op deze website, per telefoon of via WhatsApp. Wij bekijken uw aanvraag persoonlijk en sturen u een prijsvoorstel vóór bevestiging.",
  },
  {
    q: "Hoe lang van tevoren moet ik boeken?",
    a: "Liefst 24 uur op voorhand, zeker voor luchthavenvervoer. Voor spoedritten kunt u altijd bellen. Wij doen ons uiterste best om u zo snel mogelijk te helpen.",
  },
  {
    q: "Welke betalingsmethoden zijn er?",
    a: "Cash, Bancontact, Payconiq, Visa/Mastercard en overschrijving voor zakelijke klanten. Alle betaalmethoden worden vooraf besproken bij de prijsbevestiging.",
  },
  {
    q: "Zijn er toeslagen voor nachten of weekenden?",
    a: "Een nachttoeslag van +15% geldt tussen 22:00 en 06:00. Weekendritten kennen een minimumtoeslag van +7,5% en op officiële feestdagen rekenen we +15%. Deze zijn altijd inbegrepen in het prijsvoorstel.",
  },
  {
    q: "Hoe werkt de prijsbevestiging precies?",
    a: "Na uw boeking berekenen we de exacte prijs op basis van uw rit. U ontvangt een voorstel via WhatsApp. Pas na uw akkoord is de rit definitief geboekt. Geen verrassingen.",
  },
];

// Vaste prijzen voor rechtstreeks luchthavenvervoer.
// Deze liggen bewust ONDER het gewone kilometertarief (€5,00 + €2,70/km):
// hoe verder de luchthaven, hoe groter het voordeel.
//
// LET OP: dit voordeel geldt UITSLUITEND voor een rechtstreekse rit van of
// naar de luchthaven. Alle andere ritten (en luchthavenritten met tussenstops)
// rekenen we af volgens het gewone kilometertarief. Zie airportPriceNotice.
//
//  Luchthaven            km    volgens tarief   vaste prijs   voordeel
//  Zaventem              45    €126,50          €115          ~9%
//  Antwerpen (Deurne)    28    €80,60           €75           ~7%
//  Charleroi             93    €256,10          €199          ~22%
//  Eindhoven            105    €288,50          €219          ~24%
//  Schiphol             155    €423,50          €275          ~35%
//  Köln/Bonn            225    €612,50          €349          ~43%
export const destinations = [
  { from: "Bornem", to: "Brussels Airport (Zaventem)", price: "€115", duration: "±40 min" },
  { from: "Bornem", to: "Antwerpen Airport (Deurne)", price: "€75", duration: "±30 min" },
  { from: "Bornem", to: "Charleroi Airport", price: "€199", duration: "±1u05" },
  { from: "Bornem", to: "Eindhoven Airport", price: "€219", duration: "±1u15" },
  { from: "Bornem", to: "Amsterdam Schiphol", price: "€275", duration: "±1u45" },
  { from: "Bornem", to: "Köln/Bonn Airport", price: "€349", duration: "±2u15" },
];

// Voorwaarde bij de vaste luchthavenprijzen. Wordt onder de kaarten getoond
// op de homepagina en de tarievenpagina, zodat de regel maar op één plek staat.
export const airportPriceNotice =
  "Deze vaste prijzen gelden enkel voor een rechtstreekse rit van of naar de luchthaven, zonder tussenstops. Voor alle andere ritten geldt ons gewone kilometertarief.";

export const reviews = [
  {
    name: "Sahin Kemaldar",
    initials: "S",
    rating: 5,
    date: "3 maanden geleden",
    text: "Ik heb onlangs gebruikgemaakt van deze taxiservice en ben zeer tevreden over de ervaring. De chauffeur was stipt op tijd, vriendelijk en professioneel. De rit zelf verliep vlot en comfortabel, en de wagen was proper en goed onderhouden.\n\nWat ik vooral apprecieerde, was de veilige rijstijl en de aangename sfeer tijdens de rit. Ik voelde me meteen op mijn gemak. Ook de prijs-kwaliteitverhouding was correct.\n\nZeker een aanrader voor wie op zoek is naar betrouwbaar en comfortabel vervoer!\n\nDankjewel Hamid 👍",
    color: "#f4511e",
  },
  {
    name: "Dominique De Roeck",
    initials: "D",
    rating: 5,
    date: "3 maanden geleden",
    text: "Toen een ander vooraf geboekt taxibedrijf op het afgesproken uur (3u15 's nachts) niet opdaagde en ook geen gehoor gaf hebben we in volle paniek Taxi Bornem gebeld en die stonden op een kwartier tijd aan onze deur. Letterlijk onze redder in nood !\nHeel hartelijk bedankt.",
    color: "#455a64",
  },
  {
    name: "Werner De Decker",
    initials: "W",
    rating: 5,
    date: "2 maanden geleden",
    text: "Ik heb vervoer van en naar vlieghaven Zaventem gedaan met deze firma. Met 4 personen en 4 middelgrote koffers. Goed op voorhand juiste uren en kostprijs afgesproken en alles verliep heel goed. Voordeel was ook dat de taxidienst heel kort bij mijn woonplaats is (bornem)... Zeer vriendelijke en behulpzame chauffeur en auto tiptop in orde. Ik kan deze service ten zeerste aanraden!",
    color: "#33691e",
  },
  {
    name: "Dorien Jaen",
    initials: "D",
    rating: 5,
    date: "8 maanden geleden",
    text: "Zeer vriendelijke mensen een top bediening\nOp voorhand alles gepland. We raden deze mensen ten zeerste aan. Ook door hen hadden we een top reis alles was tot in de puntjes en op tijd gepland.zo zorgeloos voor ons\nEerlijke prijs . We nemen met plezier de volgende diensten terug aan\nGrjes jean & dorien",
    color: "#512da8",
  },
];

export const stats = [
  { value: "1", label: "Vaste chauffeur" },
  { value: "50+", label: "Tevreden klanten" },
  { value: "4,9/5", label: "Google-beoordeling" },
  { value: "24/7", label: "Beschikbaar" },
];