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
export const WHATSAPP_URL = "https://wa.me/32472706245?text=Hallo%20Hamid%2C%20ik%20wil%20graag%20een%20taxi%20boeken.";
export const EMAIL = "info@taxibornem.be";
export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=5113066939281304031";

// Access key van Web3Forms (web3forms.com) — verwerkt het boekingsformulier.
// Deze sleutel mag publiek zijn: ze bepaalt enkel naar welke mailbox de
// aanvraag gaat. Vervang door de echte sleutel uit je Web3Forms-account.
export const WEB3FORMS_ACCESS_KEY = "VERVANG-DOOR-JE-WEB3FORMS-KEY";

// ─── Data ─────────────────────────────────────────────────────────────────────
export const services = [
  {
    icon: Plane,
    slug: "luchthavenvervoer",
    image: "/dienst-luchthaven.webp",
    title: "Luchthavenvervoer",
    subtitle: "Airport transfer",
    description: "Stressvrij naar Brussels Airport (Zaventem), Charleroi of Eindhoven. Vluchttracking inbegrepen — Hamid wacht op u bij aankomst.",
    tag: "Meest gevraagd",
    details: [
      "Brussels Airport (Zaventem), Charleroi en Eindhoven",
      "Vluchttracking: bij vertraging wacht Hamid gewoon",
      "Hulp met bagage, in- en uitladen",
      "Kinderzitje gratis op aanvraag",
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
    night: 25, // 's nachts, 22:00–06:00 (%)
    weekend: 15, // zaterdag & zondag (%)
    holiday: 25, // officiële feestdagen (%)
    airportParking: 8, // luchthavenparkeren, ophaal aan terminal (€)
  },
};

// Toeslagen zoals ze getoond worden in "Toeslagen in één oogopslag".
export const surcharges = [
  { icon: "moon", label: "Nachttoeslag", desc: "22:00 – 06:00", value: "+25%" },
  { icon: "calendar", label: "Weekendtoeslag", desc: "Zaterdag & zondag", value: "+15%" },
  { icon: "party", label: "Feestdagentoeslag", desc: "Officiële feestdagen", value: "+25%" },
  { icon: "plane", label: "Luchthavenparkeren", desc: "Ophaal aan terminal", value: "+€8,00" },
  { icon: "baby", label: "Kinderzitje", desc: "Op aanvraag", value: "Gratis" },
  { icon: "clock", label: "Wachttijd", desc: "Hamid wacht ter plaatse", value: "€30,00/u" },
];

// Betaalmethoden zoals getoond op de tarievenpagina.
export const paymentMethods = [
  "Cash",
  "Bancontact",
  "Visa & Mastercard",
  "Overschrijving voor zakelijke klanten",
];

// Welke FAQ-vragen tonen op de tarievenpagina (verwijst naar faqItems hierboven).
// De cijfers zijn de posities in faqItems: 0 = eerste vraag, 2 = derde, enzovoort.
export const tariffFaqIndexes = [0, 2, 4, 5];
export const faqItems = [
  {
    q: "Hoe kan ik een taxi boeken?",
    a: "Via het boekingsformulier op deze website, per telefoon of via WhatsApp. Hamid bekijkt uw aanvraag persoonlijk en stuurt u een prijsvoorstel via WhatsApp vóór bevestiging.",
  },
  {
    q: "Hoe lang van tevoren moet ik boeken?",
    a: "Liefst 24 uur op voorhand, zeker voor luchthaventrips. Voor spoedriten kunt u altijd bellen — Hamid doet zijn uiterste best om u zo snel mogelijk te helpen.",
  },
  {
    q: "Welke betalingsmethoden zijn er?",
    a: "Cash, Bancontact, Visa/Mastercard en overschrijving voor zakelijke klanten. Alle betaalmethoden worden vooraf besproken bij de prijsbevestiging.",
  },
  {
    q: "Kan ik een kinderzitje aanvragen?",
    a: "Ja, kinderzitjes (inclusief reiswiegjes) zijn beschikbaar op aanvraag. Vermeld dit in uw boeking zodat Hamid dit tijdig kan voorbereiden.",
  },
  {
    q: "Zijn er toeslagen voor nachten of weekenden?",
    a: "Een nachttoeslag van +25% geldt tussen 22:00 en 06:00. Weekendritten kennen een minimumtoeslag van +15%. Deze zijn altijd inbegrepen in het prijsvoorstel van Hamid.",
  },
  {
    q: "Hoe werkt de prijsbevestiging precies?",
    a: "Na uw boeking berekent Hamid de exacte prijs op basis van uw rit. U ontvangt een voorstel via WhatsApp. Pas na uw akkoord is de rit definitief geboekt. Geen verrassingen.",
  },
];

export const destinations = [
  { from: "Bornem", to: "Brussels Airport (Zaventem)", price: "€75", duration: "±55 min" },
  { from: "Bornem", to: "Antwerpen Centraal", price: "€35", duration: "±30 min" },
  { from: "Bornem", to: "Brussel-Centrum", price: "€65", duration: "±50 min" },
  { from: "Bornem", to: "Gent-Sint-Pieters", price: "€80", duration: "±60 min" },
  { from: "Bornem", to: "Charleroi Airport", price: "€95", duration: "±75 min" },
  { from: "Bornem", to: "Mechelen", price: "€25", duration: "±20 min" },
];

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
  { value: "12+", label: "Jaar ervaring" },
  { value: "50+", label: "Tevreden klanten" },
  { value: "4,9/5", label: "Google-beoordeling" },
  { value: "24/7", label: "Beschikbaar" },
];
