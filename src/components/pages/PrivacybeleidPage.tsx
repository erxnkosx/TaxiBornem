import {
  Shield,
  Lock,
  Eye,
  FileText,
  Phone,
  MessageCircle,
  Database,
  Globe,
} from "lucide-react";
import { BTWNUMMER, EMAIL, PHONE, PHONE_RAW, WHATSAPP_URL } from "../../data/site";

export default function PrivacybeleidPage() {
  const sections = [
    {
      icon: Shield,
      title: "Wie is verantwoordelijk?",
      content: (
        <>
          <p>
            Taxi Bornem Hamid is verantwoordelijk voor de verwerking van uw persoonsgegevens.
            BTW-nummer: {BTWNUMMER}. Postadres: Molenveldweg 31, 2880 Bornem, België.
          </p>
          <p className="mt-3">
            U kunt ons bereiken via <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a> of
            {" "}<a className="underline" href={"tel:" + PHONE_RAW}>{PHONE}</a>.
          </p>
        </>
      ),
    },
    {
      icon: FileText,
      title: "Welke gegevens en waarom?",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Ritaanvraag:</strong> naam, telefoonnummer, e-mailadres, ophaal- en
              bestemmingsadres, ritsoort, datum, tijd, aantal personen en eventuele opmerkingen.
              We gebruiken die gegevens om uw aanvraag te beoordelen, contact op te nemen en een
              rit uit te voeren. Rechtsgrond: uitvoering van precontractuele stappen of de
              overeenkomst (artikel 6(1)(b) GDPR).
            </li>
            <li>
              <strong>Facturatie en boekhouding:</strong> gegevens die nodig zijn voor facturen en
              wettelijke administratie. Rechtsgrond: wettelijke verplichting (artikel 6(1)(c)
              GDPR).
            </li>
            <li>
              <strong>Beveiliging:</strong> technische gegevens die nodig zijn om de website te
              leveren en misbruik te voorkomen. Rechtsgrond: ons gerechtvaardigd belang bij een
              veilige en betrouwbare website (artikel 6(1)(f) GDPR).
            </li>
            <li>
              <strong>Google Maps:</strong> de kaart op de contactpagina wordt pas geladen nadat u
              daarvoor kiest. Rechtsgrond voor het laden van deze externe inhoud is uw toestemming.
              U kunt die keuze later intrekken via de cookievoorkeuren.
            </li>
          </ul>
          <p className="mt-3">
            Naam, telefoonnummer, e-mailadres, adressen en ritdatum/-tijd zijn nodig om een
            aanvraag te behandelen. Zonder die gegevens kunnen we de aanvraag niet verwerken.
            Opmerkingen zijn optioneel; vermeld daarin geen gevoelige persoonsgegevens.
          </p>
          <p className="mt-3">
            We gebruiken geen geautomatiseerde besluitvorming of profilering die rechtsgevolgen
            voor u heeft of u op vergelijkbare wijze wezenlijk treft.
          </p>
        </>
      ),
    },
    {
      icon: Globe,
      title: "Adressuggesties en externe diensten",
      content: (
        <>
          <p>
            Wanneer u minstens drie tekens in een adresveld typt, ontvangt Photon (de
            adressuggestiedienst van Komoot) de ingevoerde zoektekst en technische
            verbindingsgegevens, zoals uw IP-adres. Als u beide adressen uit de suggesties kiest,
            ontvangt de openbare OSRM-routeserver de bijbehorende coördinaten om de geschatte
            afstand te berekenen. Deze verzoeken gebeuren voordat u het formulier verstuurt.
          </p>
          <p className="mt-3">
            Na verzending verstuurt Resend de aanvraagmail naar ons en de bevestiging naar uw
            e-mailadres. Cloudflare levert en beveiligt de website; Hostinger host onze mailbox.
            Onze boekhouder kan gegevens ontvangen die voor de boekhouding nodig zijn. Google
            ontvangt gegevens wanneer u de kaart toestaat of zelf een Google-link opent. Meta
            verwerkt gegevens wanneer u zelf naar WhatsApp gaat en daar contact opneemt.
          </p>
          <p className="mt-3">
            Deze website laadt geen Google-reviewprofielen of persoonlijke reviewcitaten in. De
            Google Reviews-knop opent Google pas als u erop klikt. Elke externe dienst verwerkt
            gegevens volgens zijn eigen voorwaarden en privacyverklaring.
          </p>
        </>
      ),
    },
    {
      icon: Database,
      title: "Bewaartermijnen",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Aanvragen die niet tot een rit leiden, bewaren we maximaal 12 maanden na de aanvraag.
          </li>
          <li>
            Facturen en gegevens die deel uitmaken van de btw- en boekhoudadministratie bewaren we
            10 jaar, zoals de Belgische bewaarplicht voorschrijft.
          </li>
          <li>
            De keuze voor Google Maps wordt maximaal 180 dagen in de lokale opslag van uw browser
            bewaard. Daarna vragen we u opnieuw om een keuze.
          </li>
          <li>
            Technische beveiligingsgegevens worden niet langer bewaard dan nodig voor beveiliging
            en het oplossen van incidenten, behoudens een wettelijke verplichting.
          </li>
        </ul>
      ),
    },
    {
      icon: Lock,
      title: "Ontvangers, doorgifte en beveiliging",
      content: (
        <>
          <p>
            We verkopen uw persoonsgegevens niet. We delen ze alleen met de hierboven genoemde
            dienstverleners wanneer dat nodig is voor hun beschreven taak, met uw boekhouder waar
            dat nodig is voor de administratie, of wanneer de wet dit verplicht.
          </p>
          <p className="mt-3">
            Sommige dienstverleners kunnen gegevens buiten de Europese Economische Ruimte
            verwerken. Voor zulke doorgifte is een passend mechanisme vereist, zoals een
            adequaatheidsbesluit of passende waarborgen onder de GDPR. U kunt via ons e-mailadres
            informatie vragen over de waarborg die voor een specifieke dienst geldt.
          </p>
          <p className="mt-3">
            De website gebruikt HTTPS. We nemen technische en organisatorische maatregelen om
            persoonsgegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang.
          </p>
        </>
      ),
    },
    {
      icon: Eye,
      title: "Uw rechten en klacht indienen",
      content: (
        <>
          <p>
            Afhankelijk van de toepasselijke voorwaarden kunt u om inzage, correctie, verwijdering,
            beperking of overdraagbaarheid vragen, bezwaar maken tegen verwerkingen op basis van
            gerechtvaardigd belang en toestemming intrekken. U kunt uw verzoek sturen naar{" "}
            <a className="underline" href={"mailto:" + EMAIL}>{EMAIL}</a>. We antwoorden binnen de
            wettelijke termijn. Voor gegevens die we wettelijk moeten bewaren, kan verwijdering
            niet altijd onmiddellijk.
          </p>
          <p className="mt-3">
            U kunt ook een klacht indienen bij de Belgische{" "}
            <a
              className="underline"
              href="https://www.gegevensbeschermingsautoriteit.be/burger/acties/klacht-indienen"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gegevensbeschermingsautoriteit
            </a>.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="pt-16">
      <section className="taxi-page-hero py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">
              Juridische informatie
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-6">
              Privacybeleid
            </h1>
            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              Hier leest u welke persoonsgegevens Taxi Bornem Hamid verwerkt, waarom dat gebeurt,
              met wie gegevens worden gedeeld en welke rechten u heeft.
            </p>
            <p className="mt-3 text-sm text-[#6b6b6b]">Laatst bijgewerkt: 30 september 2026.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#B7791F] font-bold mb-2">Duidelijke doelen</p>
              <p className="font-medium text-[#181818]">Gegevens alleen voor beschreven doeleinden.</p>
            </div>
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#B7791F] font-bold mb-2">Beperkte termijnen</p>
              <p className="font-medium text-[#181818]">Bewaren volgens de genoemde termijnen.</p>
            </div>
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#B7791F] font-bold mb-2">Uw rechten</p>
              <p className="font-medium text-[#181818]">U kunt ons rechtstreeks bereiken.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div key={section.title} className="taxi-card bg-[#f7f7f7] rounded-[24px] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#FFC107]/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#B7791F]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#181818]">
                    {index + 1}. {section.title}
                  </h2>
                </div>
                <div className="text-[#6b6b6b] leading-relaxed">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#181818] mb-4">Vragen over uw privacy?</h2>
          <p className="text-[#6b6b6b] mb-6">
            Neem contact op via {EMAIL} of bel {PHONE}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={"tel:" + PHONE_RAW}
              className="px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Bel ons
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-[18px] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
