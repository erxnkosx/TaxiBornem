// ─── Landingspagina's: diensten en gemeenten ──────────────────────────────────
// Elke pagina hier wordt automatisch gebouwd via src/pages/[slug].astro en
// komt vanzelf in de sitemap, de footer en de interne links.
//
// LET OP: afstanden en reistijden zijn richtwaarden zonder file. Controleer ze
// en pas ze aan waar nodig — ze staan zo op de pagina.

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface RouteRow {
  naar: string;
  afstand: string;
  reistijd: string;
}

export interface LandingPageData {
  slug: string;
  kind: "dienst" | "gemeente";
  /** Korte naam voor broodkruimels, footer en links. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  lead: string;
  image: string;
  imageAlt: string;
  highlights: { title: string; text: string }[];
  sections: LandingSection[];
  routes?: { title: string; from: string; rows: RouteRow[] };
  /** Gemeenten/steden voor het schema.org-blok. */
  areaServed: string[];
  serviceType: string;
  faq: LandingFaq[];
  /** Waarde voor /contact?dienst=… */
  dienstSlug?: string;
  /** Korte tekst op de werkgebied-kaart (enkel gemeenten). Zelfde opbouw voor elke gemeente. */
  teaser?: string;
}


// ─── Diensten ─────────────────────────────────────────────────────────────────
export const dienstPages: LandingPageData[] = [
  {
    slug: "luchthavenvervoer",
    kind: "dienst",
    label: "Luchthavenvervoer",
    metaTitle: "Taxi naar de luchthaven vanuit Bornem",
    metaDescription:
      "Taxi van Bornem naar Zaventem, Charleroi, Antwerpen, Eindhoven, Schiphol of Köln/Bonn. Vaste prijs vooraf, vluchttracking en 24/7 vertrek, ook voor vroege vluchten.",
    kicker: "Luchthavenvervoer",
    h1: "Taxi naar de luchthaven vanuit Bornem",
    lead:
      "Wij brengen u van uw voordeur naar Brussels Airport, Charleroi, Antwerpen, Eindhoven, Schiphol of Köln/Bonn, en halen u daar ook weer op. U kent de prijs voor u boekt, en bij uw terugkeer wordt uw vlucht gevolgd.",
    image: "/dienst-luchthaven.webp",
    imageAlt: "Chauffeur laadt bagage in een witte Kia-taxi aan Brussels Airport",
    highlights: [
      {
        title: "Vaste prijs vooraf",
        text: "U krijgt een prijsvoorstel via WhatsApp. Pas na uw akkoord ligt de rit vast.",
      },
      {
        title: "Vluchttracking",
        text: "Landt u later dan gepland? Wij volgen uw vlucht en wachten, zonder bijkomende kosten.",
      },
      {
        title: "Ook om 4 uur 's nachts",
        text: "Vroege en late vluchten zijn geen probleem. Taxi Bornem rijdt 24 uur per dag, 7 dagen per week.",
      },
    ],
    sections: [
      {
        heading: "Zo verloopt uw luchthavenrit",
        paragraphs: [
          "Vertrekt u op reis? Dan staan wij op het afgesproken uur voor uw deur, laden uw bagage in en zetten u af aan de vertrekhal. U hoeft geen parkeerplaats te zoeken, geen shuttle te nemen en uw auto staat niet een week op een parking.",
          "Komt u terug? Geef bij uw aanvraag uw vluchtnummer door. Wij volgen de landing en staan klaar wanneer u buitenkomt. Heeft uw vlucht vertraging, dan wachten we zonder extra kosten.",
        ],
        bullets: [
          "Ophalen aan huis, in Bornem en de hele regio",
          "Hulp met bagage bij het in- en uitladen",
          "Heen, terug of allebei, in één aanvraag",
        ],
      },
      {
        heading: "Hoe vroeg vertrekken naar Zaventem?",
        paragraphs: [
          "Voor een vlucht binnen Europa raden de meeste luchtvaartmaatschappijen aan om ongeveer twee uur voor vertrek op de luchthaven te zijn, voor een intercontinentale vlucht rond drie uur. Tel daar de rit bij op: vanuit Bornem naar Brussels Airport is dat ongeveer 40 minuten zonder file, maar in de ochtendspits rond Brussel kan het flink langer duren.",
          "Bij uw boeking spreken we samen een vertrekuur af, met genoeg marge voor het verkeer.",
        ],
      },
      {
        heading: "Goed om te weten",
        paragraphs: [
          "Wordt u aan de terminal opgehaald, dan komt er een toeslag van €8,00 bij voor het luchthavenparkeren. Verder betaalt u de prijs die vooraf is afgesproken.",
          "Vermeld bij uw aanvraag met hoeveel personen u reist en hoeveel koffers u meeneemt. Zo weten we zeker dat alles en iedereen past.",
        ],
      },
    ],
    routes: {
      title: "Luchthavens vanuit Bornem",
      from: "Bornem",
      rows: [
        { naar: "Brussels Airport (Zaventem)", afstand: "± 45 km", reistijd: "± 40 min" },
        { naar: "Antwerp Airport (Deurne)", afstand: "± 30 km", reistijd: "± 30 min" },
        { naar: "Brussels South Charleroi Airport", afstand: "± 100 km", reistijd: "± 1u10" },
        { naar: "Eindhoven Airport", afstand: "± 120 km", reistijd: "± 1u20" },
        { naar: "Amsterdam Schiphol", afstand: "± 185 km", reistijd: "± 2u" },
        { naar: "Köln Bonn Airport", afstand: "± 230 km", reistijd: "± 2u30" },
      ],
    },
    areaServed: ["Bornem", "Puurs-Sint-Amands", "Willebroek", "Temse", "Antwerpen", "Mechelen"],
    serviceType: "Luchthavenvervoer",
    faq: [
      {
        q: "Wat kost een taxi van Bornem naar Zaventem?",
        a: "Dat hangt af van uw exacte ophaaladres, het uur en of u een enkele rit of heen en terug boekt. U krijgt altijd eerst een vaste prijs via WhatsApp. Pas na uw akkoord is de rit geboekt.",
      },
      {
        q: "Wat als mijn vlucht vertraging heeft?",
        a: "Geef bij uw aanvraag uw vluchtnummer door. Wij volgen uw vlucht en passen onze aankomst aan. Wachten bij vertraging kost u niets extra.",
      },
      {
        q: "Kan ik een taxi boeken voor een vlucht heel vroeg in de ochtend?",
        a: "Ja. Taxi Bornem rijdt 24 uur per dag, ook voor vluchten om 6 uur 's ochtends. Boek liefst minstens 24 uur vooraf, zodat uw rit zeker vastligt.",
      },
      {
        q: "Komt er nog iets bij de afgesproken prijs?",
        a: "Alleen wanneer u aan de terminal wordt opgehaald: dan geldt een toeslag van €8,00 voor het luchthavenparkeren. Verder betaalt u de prijs die vooraf is bevestigd.",
      },
      {
        q: "Rijdt u ook naar luchthavens in Nederland en Duitsland?",
        a: "Ja. Naast Zaventem, Charleroi en Antwerpen rijden we ook naar Eindhoven, Schiphol en Köln/Bonn.",
      },
    ],
    dienstSlug: "luchthavenvervoer",
  },
  {
    slug: "zakelijk-vervoer",
    kind: "dienst",
    label: "Zakelijk vervoer",
    metaTitle: "Zakelijk vervoer en zakentaxi vanuit Bornem",
    metaDescription:
      "Zakentaxi vanuit Bornem voor meetings, beurzen en luchthaventransfers in de Benelux. Vaste chauffeur, factuur met btw en betaling per overschrijving mogelijk.",
    kicker: "Zakelijk vervoer",
    h1: "Zakelijk vervoer met een vaste chauffeur",
    lead:
      "Voor afspraken, zakenreizen en bedrijfsevenementen in de Benelux. Bij Taxi Bornem hebben u, uw collega's en uw gasten altijd dezelfde, discrete chauffeur.",
    image: "/dienst-zakelijk.webp",
    imageAlt: "Zakenman stapt in een witte Kia-taxi voor een kantoorgebouw",
    highlights: [
      {
        title: "Factuur voor uw bedrijf",
        text: "U ontvangt een factuur met btw. Zakelijke klanten kunnen betalen per overschrijving.",
      },
      {
        title: "Altijd dezelfde chauffeur",
        text: "Geen callcenter en geen wisselende gezichten. Uw aanspreekpunt is ook uw chauffeur.",
      },
      {
        title: "Stipt volgens uw agenda",
        text: "Vertrekuren worden afgestemd op uw afspraken, vluchten en vergaderingen.",
      },
    ],
    sections: [
      {
        heading: "Voor wie?",
        paragraphs: [
          "Voor bedrijven in Bornem, Puurs-Sint-Amands, Willebroek en de rest van de regio die medewerkers, klanten of bezoekers goed vervoerd willen zien: van de luchthaven naar uw kantoor, van het hotel naar een vergadering, of na een seminarie veilig naar huis.",
        ],
        bullets: [
          "Luchthaventransfers voor medewerkers en bezoekers",
          "Vervoer van gasten naar meetings, beurzen en events",
          "Terugkerende ritten met een vaste afspraak",
          "Buitenlandse bezoekers: wij spreken Nederlands, Engels en Arabisch",
        ],
      },
      {
        heading: "Discreet en verzorgd",
        paragraphs: [
          "Wie we vervoeren en waarheen, blijft tussen u en ons. De wagen is een verzorgde Kia, schoon en comfortabel, zodat u onderweg rustig kunt bellen of een dossier doorlezen.",
        ],
      },
      {
        heading: "Hoe regelt u het?",
        paragraphs: [
          "Stuur uw eerste aanvraag via het formulier, per telefoon of via WhatsApp. Boekt u een rit voor iemand anders, geef dan de naam en het gsm-nummer van de passagier door. Voor ritten die vaak terugkomen, spreken we de werkwijze één keer af, zodat u daarna snel kunt boeken.",
        ],
      },
    ],
    areaServed: ["Bornem", "Puurs-Sint-Amands", "Willebroek", "Temse", "Antwerpen", "Mechelen", "Brussel"],
    serviceType: "Zakelijk personenvervoer",
    faq: [
      {
        q: "Kan ik een factuur krijgen voor mijn bedrijf?",
        a: "Ja. Geef bij uw aanvraag uw bedrijfsnaam en btw-nummer door, dan ontvangt u een factuur met btw.",
      },
      {
        q: "Hoe kunnen zakelijke klanten betalen?",
        a: "Per overschrijving, of cash, Bancontact, Payconiq, Visa of Mastercard. De betaalwijze spreken we af bij de prijsbevestiging.",
      },
      {
        q: "Kan ik een rit boeken voor een collega of een klant?",
        a: "Zeker. Vermeld de naam en het gsm-nummer van de passagier, dan nemen wij indien nodig rechtstreeks contact op.",
      },
      {
        q: "Rijdt u ook naar het buitenland?",
        a: "Ja, in de hele Benelux en verder. Bekijk ook onze pagina over lange afstanden.",
      },
    ],
    dienstSlug: "zakelijk-vervoer",
  },
  {
    slug: "prive-ritten",
    kind: "dienst",
    label: "Privé ritten",
    metaTitle: "Privé taxi in Bornem, ook 's nachts",
    metaDescription:
      "Uw persoonlijke chauffeur in Bornem voor een daguitstap, een etentje, een feest of een afspraak. Veilig thuis, ook 's nachts. Wachtdienst mogelijk, prijs vooraf.",
    kicker: "Privé ritten",
    h1: "Privé taxi in Bornem, overdag en 's nachts",
    lead:
      "Een daguitstap, een etentje in de stad, een feest of een afspraak waar u niet zelf naartoe wilt rijden. Wij halen u op, brengen u weg en zetten u veilig weer thuis af.",
    image: "/dienst-prive.webp",
    imageAlt: "Chauffeur houdt de deur open van een witte Kia-taxi in een stadsstraat",
    highlights: [
      {
        title: "Veilig thuis",
        text: "Na een feest of een avond uit hoeft u niet te rijden en niet op de laatste bus te wachten.",
      },
      {
        title: "Wachtdienst",
        text: "Duurt uw afspraak niet lang? Wij kunnen wachten en u daarna terugbrengen.",
      },
      {
        title: "Geen verrassingen",
        text: "U kent de prijs voor de rit begint, ook voor een rit heen en terug.",
      },
    ],
    sections: [
      {
        heading: "Waarvoor boeken klanten een privérit?",
        paragraphs: [
          "Eigenlijk voor alles waarbij u liever niet zelf rijdt, niet wilt parkeren of gewoon comfortabel wilt reizen.",
        ],
        bullets: [
          "Een avond uit in Antwerpen, Mechelen of Gent",
          "Een daguitstap of een bezoek aan familie",
          "Avondshopping, met hulp bij het inladen van uw aankopen",
          "Een afspraak bij de dokter, in het ziekenhuis of bij de notaris",
          "Een feest, huwelijk of communie",
        ],
      },
      {
        heading: "Ook als het dringend is",
        paragraphs: [
          "Een geplande taxi die niet komt opdagen of een gemiste trein: het gebeurt. Bel dan gerust. Zijn we vrij, dan komen we zo snel mogelijk.",
        ],
      },
      {
        heading: "Wachten of later ophalen",
        paragraphs: [
          "Wij kunnen tijdens uw afspraak wachten, of u op een afgesproken uur terug ophalen. Vermeld het bij uw aanvraag, dan zit het meteen in het prijsvoorstel.",
        ],
      },
    ],
    areaServed: ["Bornem", "Puurs-Sint-Amands", "Willebroek", "Temse", "Antwerpen", "Mechelen"],
    serviceType: "Privé taxirit",
    faq: [
      {
        q: "Kan ik ook 's nachts een taxi bellen?",
        a: "Ja. Taxi Bornem rijdt 24 uur per dag, 7 dagen per week, ook op feestdagen.",
      },
      {
        q: "Kan de chauffeur wachten tijdens mijn afspraak?",
        a: "Ja, wachtdienst is mogelijk. Vermeld het bij uw aanvraag, dan nemen we het mee in het prijsvoorstel.",
      },
      {
        q: "Hoe snel kan ik een taxi krijgen?",
        a: "Boek liefst 24 uur vooraf. Voor een rit op korte termijn kunt u altijd bellen. We doen ons best om u zo snel mogelijk te helpen.",
      },
      {
        q: "Kan ik met meerdere personen reizen?",
        a: "Geef bij uw aanvraag het aantal personen en de bagage door. We bevestigen dan of alles in één rit past.",
      },
    ],
    dienstSlug: "prive-ritten",
  },
  {
    slug: "lange-afstanden",
    kind: "dienst",
    label: "Lange afstanden",
    metaTitle: "Taxi voor lange afstanden vanuit Bornem",
    metaDescription:
      "Met de taxi van Bornem naar Parijs, Amsterdam, Keulen, Luxemburg of elders in Europa. Vaste prijs op voorhand, van deur tot deur, retour mogelijk.",
    kicker: "Lange afstanden",
    h1: "Lange ritten naar Parijs, Amsterdam, Keulen en verder",
    lead:
      "Soms is de taxi de makkelijkste manier om ver te reizen: niet overstappen, geen bagage door stations sleuren, en u vertrekt wanneer het u past.",
    image: "/dienst-lange-afstand.webp",
    imageAlt: "Witte Kia-taxi op de snelweg",
    highlights: [
      {
        title: "Prijs vooraf afgesproken",
        text: "U krijgt één vaste prijs voor de hele rit, op voorhand bevestigd.",
      },
      {
        title: "Van deur tot deur",
        text: "U stapt in aan uw voordeur en uit op uw bestemming, met pauzes wanneer u wilt.",
      },
      {
        title: "Ook retour",
        text: "Wij kunnen u op een afgesproken dag terug ophalen, of wachten bij een dagtrip.",
      },
    ],
    sections: [
      {
        heading: "Waarom met de taxi?",
        paragraphs: [
          "Met bagage, kinderen of na een lange werkdag is een rit van deur tot deur vaak veel rustiger dan de trein met overstappen. U bepaalt zelf het vertrekuur, en onderweg stoppen we waar en wanneer u dat wilt.",
        ],
      },
      {
        heading: "Wat geeft u door bij uw aanvraag?",
        paragraphs: [
          "Vermeld uw vertrekadres, de bestemming, de datum en het uur, met hoeveel personen u reist en hoeveel koffers er meegaan. Laat ook weten of u een enkele rit wilt of heen en terug. Dan krijgt u een volledig prijsvoorstel.",
        ],
      },
    ],
    routes: {
      title: "Bestemmingen vanuit Bornem",
      from: "Bornem",
      rows: [
        { naar: "Amsterdam", afstand: "± 185 km", reistijd: "± 2u" },
        { naar: "Keulen", afstand: "± 230 km", reistijd: "± 2u30" },
        { naar: "Luxemburg", afstand: "± 250 km", reistijd: "± 2u45" },
        { naar: "Parijs", afstand: "± 330 km", reistijd: "± 3u30" },
      ],
    },
    areaServed: ["Bornem", "Puurs-Sint-Amands", "Willebroek", "Temse", "Antwerpen", "Mechelen"],
    serviceType: "Taxi voor lange afstanden",
    faq: [
      {
        q: "Wat kost een taxi van Bornem naar Parijs?",
        a: "Voor lange ritten maken we altijd een prijs op maat, afhankelijk van uw adres, de bestemming en of u heen en terug wilt. U krijgt die prijs vooraf, pas na uw akkoord is de rit geboekt.",
      },
      {
        q: "Kunnen we onderweg stoppen?",
        a: "Ja. Een pauze voor koffie, eten of het toilet plannen we gewoon in.",
      },
      {
        q: "Hoe ver op voorhand moet ik een lange rit boeken?",
        a: "Zo vroeg mogelijk, en minstens 24 uur vooraf. Zeker in vakantieperiodes is een paar dagen op voorhand beter.",
      },
      {
        q: "Rijdt u ook naar luchthavens in het buitenland?",
        a: "Ja, onder meer naar Schiphol, Eindhoven en Köln/Bonn. Bekijk daarvoor ook onze pagina over luchthavenvervoer.",
      },
    ],
    dienstSlug: "lange-afstanden",
  },
];

// ─── Gemeenten ────────────────────────────────────────────────────────────────
export const gemeentePages: LandingPageData[] = [
  {
    slug: "taxi-puurs-sint-amands",
    teaser: "Vanuit Bornem in ongeveer 10 minuten, ook in Breendonk, Liezele, Ruisbroek, Lippelo en Oppuurs.",
    kind: "gemeente",
    label: "Taxi Puurs-Sint-Amands",
    metaTitle: "Taxi Puurs-Sint-Amands, 24/7 met vaste prijs",
    metaDescription:
      "Taxi in Puurs-Sint-Amands: Puurs, Breendonk, Liezele, Ruisbroek, Sint-Amands, Lippelo en Oppuurs. Luchthavenvervoer, zakelijke en privéritten, 24/7. Prijs vooraf.",
    kicker: "Werkgebied",
    h1: "Taxi in Puurs-Sint-Amands",
    lead:
      "Taxi Bornem rijdt elke dag in Puurs-Sint-Amands, de buurgemeente van Bornem. Wij halen u op in alle zeven deelgemeenten, op elk uur van de dag, en u kent de prijs voor de rit begint.",
    image: "/dienst-zakelijk.webp",
    imageAlt: "Witte Kia-taxi van Taxi Bornem voor een kantoorgebouw",
    highlights: [
      {
        title: "Om de hoek",
        text: "Vanuit Bornem zijn we in ongeveer tien minuten in Puurs. Ook een rit op korte termijn is daardoor vaak haalbaar.",
      },
      {
        title: "Alle deelgemeenten",
        text: "Van Breendonk tot Oppuurs en van Ruisbroek tot Sint-Amands aan de Schelde.",
      },
      {
        title: "24 uur per dag",
        text: "Voor de eerste vlucht van de dag of de laatste rit na een feest.",
      },
    ],
    sections: [
      {
        heading: "Deelgemeenten waar we rijden",
        paragraphs: [
          "Sinds de fusie van 2019 vormen Puurs en Sint-Amands één gemeente. Voor ons maakt het niet uit of u in het centrum van Puurs woont of aan de Schelde in Sint-Amands: de werkwijze en de prijsafspraak zijn overal dezelfde.",
        ],
        bullets: ["Puurs", "Breendonk", "Liezele", "Ruisbroek", "Sint-Amands", "Lippelo", "Oppuurs"],
      },
      {
        heading: "Zakelijk vervoer in Puurs",
        paragraphs: [
          "Puurs is een belangrijke werkplek in de regio, met onder meer de grote farmaceutische site van Pfizer. Voor bezoekers, consultants en medewerkers die van of naar de luchthaven moeten, of tussen hotel en bedrijf, regelt Taxi Bornem stipt vervoer met een factuur voor uw bedrijf.",
        ],
      },
      {
        heading: "Van Puurs-Sint-Amands naar de luchthaven",
        paragraphs: [
          "Door de ligging aan de A12 bent u vanuit Puurs snel richting Brussel. Brussels Airport ligt op ongeveer 35 à 40 minuten zonder file, Antwerp Airport op een klein halfuur. Bij uw boeking spreken we een vertrekuur af met marge voor het verkeer.",
        ],
      },
    ],
    routes: {
      title: "Ritten vanuit Puurs",
      from: "Puurs",
      rows: [
        { naar: "Bornem", afstand: "± 8 km", reistijd: "± 10 min" },
        { naar: "Antwerpen centrum", afstand: "± 25 km", reistijd: "± 30 min" },
        { naar: "Antwerp Airport (Deurne)", afstand: "± 30 km", reistijd: "± 30 min" },
        { naar: "Brussels Airport (Zaventem)", afstand: "± 40 km", reistijd: "± 35 min" },
        { naar: "Brussels South Charleroi Airport", afstand: "± 90 km", reistijd: "± 1u05" },
      ],
    },
    areaServed: ["Puurs-Sint-Amands", "Puurs", "Breendonk", "Liezele", "Ruisbroek", "Sint-Amands", "Lippelo", "Oppuurs"],
    serviceType: "Taxi",
    faq: [
      {
        q: "Hoe snel bent u in Puurs-Sint-Amands?",
        a: "Bornem en Puurs-Sint-Amands grenzen aan elkaar. Zijn we vrij, dan zijn we meestal binnen 10 à 15 minuten ter plaatse. Voor een vaste afspraak, zoals een luchthavenrit, boekt u best 24 uur vooraf.",
      },
      {
        q: "Rijdt u ook in Breendonk, Liezele en Ruisbroek?",
        a: "Ja, in alle deelgemeenten: Puurs, Breendonk, Liezele, Ruisbroek, Sint-Amands, Lippelo en Oppuurs.",
      },
      {
        q: "Kan ik een factuur krijgen voor een zakelijke rit vanuit Puurs?",
        a: "Ja. Geef uw bedrijfsnaam en btw-nummer door bij de aanvraag, dan ontvangt u een factuur met btw.",
      },
      {
        q: "Wat kost een taxi van Puurs naar Zaventem?",
        a: "U krijgt een vaste prijs op maat via WhatsApp, op basis van uw adres en het uur. Pas na uw akkoord is de rit geboekt.",
      },
    ],
  },
  {
    slug: "taxi-willebroek",
    teaser: "Vanuit Bornem in ongeveer 15 minuten, ook in Blaasveld, Heindonk en Tisselt.",
    kind: "gemeente",
    label: "Taxi Willebroek",
    metaTitle: "Taxi Willebroek, 24/7 met vaste prijs vooraf",
    metaDescription:
      "Taxi in Willebroek, Blaasveld, Heindonk en Tisselt. Vlot naar Brussels Airport, zakelijk vervoer en privéritten, dag en nacht. Prijs vooraf via WhatsApp.",
    kicker: "Werkgebied",
    h1: "Taxi in Willebroek",
    lead:
      "Willebroek ligt op een kwartier van Bornem. Taxi Bornem rijdt er dag en nacht: naar de luchthaven, naar het werk, naar een feest of gewoon veilig naar huis.",
    image: "/dienst-luchthaven.webp",
    imageAlt: "Witte Kia-taxi van Taxi Bornem aan de luchthaven",
    highlights: [
      {
        title: "Vlak bij de A12",
        text: "Vanuit Willebroek bent u snel op weg naar Brussel, Antwerpen of Mechelen.",
      },
      {
        title: "Ook in de deelgemeenten",
        text: "We rijden in Willebroek, Blaasveld, Heindonk en Tisselt.",
      },
      {
        title: "Dag en nacht",
        text: "24 uur per dag, 7 dagen per week, ook op feestdagen.",
      },
    ],
    sections: [
      {
        heading: "Willebroek en de deelgemeenten",
        paragraphs: [
          "Langs het zeekanaal en de A12 combineert Willebroek woonwijken met bedrijventerreinen. We rijden zowel van en naar privéadressen als naar bedrijven en hotels.",
        ],
        bullets: ["Willebroek", "Blaasveld", "Heindonk", "Tisselt"],
      },
      {
        heading: "Vlot naar Brussels Airport",
        paragraphs: [
          "Door de ligging aan de A12 en de nabijheid van Mechelen en de E19 is Willebroek een van de vlotste vertrekpunten naar Zaventem in de regio. Reken op ongeveer een halfuur zonder file. Bij uw terugkeer volgen we uw vlucht en wachten we bij vertraging zonder extra kosten.",
        ],
      },
      {
        heading: "Een bezoek aan Fort Breendonk",
        paragraphs: [
          "Komt u naar het Nationaal Gedenkteken Fort Breendonk? Wij brengen u van het station, uw hotel of de luchthaven naar het fort en halen u na uw bezoek weer op.",
        ],
      },
    ],
    routes: {
      title: "Ritten vanuit Willebroek",
      from: "Willebroek",
      rows: [
        { naar: "Bornem", afstand: "± 12 km", reistijd: "± 15 min" },
        { naar: "Mechelen centrum", afstand: "± 12 km", reistijd: "± 15 min" },
        { naar: "Antwerpen centrum", afstand: "± 25 km", reistijd: "± 30 min" },
        { naar: "Brussels Airport (Zaventem)", afstand: "± 30 km", reistijd: "± 30 min" },
        { naar: "Brussels South Charleroi Airport", afstand: "± 85 km", reistijd: "± 1u" },
      ],
    },
    areaServed: ["Willebroek", "Blaasveld", "Heindonk", "Tisselt"],
    serviceType: "Taxi",
    faq: [
      {
        q: "Hoe snel bent u in Willebroek?",
        a: "Vanuit Bornem zijn we in ongeveer een kwartier in Willebroek. Voor een luchthavenrit of een vaste afspraak boekt u best 24 uur vooraf.",
      },
      {
        q: "Rijdt u ook in Blaasveld, Heindonk en Tisselt?",
        a: "Ja, in heel Willebroek en alle deelgemeenten.",
      },
      {
        q: "Kan ik een taxi boeken naar Fort Breendonk?",
        a: "Ja. We brengen u naar het fort en spreken een uur af om u weer op te halen.",
      },
      {
        q: "Hoe lang duurt de rit van Willebroek naar Zaventem?",
        a: "Ongeveer een halfuur zonder file. In de spits rond Brussel kan het langer duren, daarom plannen we altijd wat marge in.",
      },
    ],
  },
  {
    slug: "taxi-temse",
    teaser: "Vanuit Bornem in ongeveer 10 minuten via de Temsebrug, ook in Elversele, Steendorp en Tielrode.",
    kind: "gemeente",
    label: "Taxi Temse",
    metaTitle: "Taxi Temse, net over de Schelde, 24/7",
    metaDescription:
      "Taxi in Temse, Elversele, Steendorp en Tielrode. Vanuit Bornem snel over de Temsebrug. Luchthavenvervoer, privé- en zakelijke ritten, prijs vooraf.",
    kicker: "Werkgebied",
    h1: "Taxi in Temse",
    lead:
      "Temse ligt in Oost-Vlaanderen, maar voor Taxi Bornem is het gewoon de overkant van de Schelde. Over de Temsebrug zijn we snel bij u, in Temse zelf en in Elversele, Steendorp en Tielrode.",
    image: "/car.webp",
    imageAlt: "Witte Kia-taxi van Taxi Bornem aan de waterkant",
    highlights: [
      {
        title: "Net over de Schelde",
        text: "Via de Temsebrug ligt Temse op ongeveer tien minuten van Bornem.",
      },
      {
        title: "Antwerpen en het Waasland",
        text: "Ook voor ritten naar Sint-Niklaas, Antwerpen of een avond uit.",
      },
      {
        title: "24 uur per dag",
        text: "Voor een vroege vlucht of een late thuisrit, elke dag van de week.",
      },
    ],
    sections: [
      {
        heading: "Temse en de deelgemeenten",
        paragraphs: [
          "De Schelde vormt hier de provinciegrens, maar via de Temsebrug is Temse voor ons even dichtbij als veel plaatsen in Bornem zelf. We rijden in de hele gemeente.",
        ],
        bullets: ["Temse", "Elversele", "Steendorp", "Tielrode"],
      },
      {
        heading: "Van Temse naar de luchthaven",
        paragraphs: [
          "Naar Brussels Airport rijden we over de Temsebrug en via de A12 of Mechelen. Reken op ongeveer 50 minuten zonder file. Antwerp Airport en het centrum van Antwerpen liggen op ongeveer een halfuur.",
        ],
      },
      {
        heading: "Ritten in het Waasland",
        paragraphs: [
          "Ook voor een rit naar Sint-Niklaas, een afspraak in de buurt of een avond uit in Antwerpen kunt u bij ons terecht. U krijgt altijd eerst een prijsvoorstel, pas na uw akkoord ligt de rit vast.",
        ],
      },
    ],
    routes: {
      title: "Ritten vanuit Temse",
      from: "Temse",
      rows: [
        { naar: "Bornem", afstand: "± 8 km", reistijd: "± 10 min" },
        { naar: "Sint-Niklaas", afstand: "± 10 km", reistijd: "± 15 min" },
        { naar: "Antwerpen centrum", afstand: "± 25 km", reistijd: "± 30 min" },
        { naar: "Antwerp Airport (Deurne)", afstand: "± 30 km", reistijd: "± 30 min" },
        { naar: "Brussels Airport (Zaventem)", afstand: "± 55 km", reistijd: "± 50 min" },
      ],
    },
    areaServed: ["Temse", "Elversele", "Steendorp", "Tielrode"],
    serviceType: "Taxi",
    faq: [
      {
        q: "Rijdt u echt tot in Temse? Dat is toch Oost-Vlaanderen?",
        a: "Ja. De Schelde is hier de provinciegrens, maar via de Temsebrug ligt Temse op ongeveer tien minuten van Bornem.",
      },
      {
        q: "Rijdt u ook in Elversele, Steendorp en Tielrode?",
        a: "Ja, in heel Temse en alle deelgemeenten.",
      },
      {
        q: "Kan ik vanuit Temse naar Schiphol of Eindhoven?",
        a: "Ja. We rijden naar alle grote luchthavens in België, en ook naar Eindhoven, Schiphol en Köln/Bonn.",
      },
      {
        q: "Hoe boek ik een taxi in Temse?",
        a: "Via het formulier op deze pagina, per telefoon of via WhatsApp. U krijgt eerst een prijsvoorstel en pas na uw akkoord is de rit geboekt.",
      },
    ],
  },
];

export const landingPages: LandingPageData[] = [...dienstPages, ...gemeentePages];
