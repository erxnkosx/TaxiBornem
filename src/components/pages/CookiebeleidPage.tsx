import {
  Cookie,
  Shield,
  Settings,
  Globe,
  Database,
  Phone,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react";

import { PHONE_RAW, WHATSAPP_URL } from "../../data/site";
import { openConsentBanner } from "../../lib/cookieConsent";

export default function CookiebeleidPage() {
  const sections = [
    {
      icon: Cookie,
      title: "Wat zijn cookies?",
      content:
        "Cookies zijn kleine tekstbestanden die op uw toestel worden opgeslagen wanneer u een website bezoekt. Ze zorgen ervoor dat websites correct functioneren en kunnen bepaalde voorkeuren onthouden.",
    },
    {
      icon: Settings,
      title: "Functionele cookies",
      content:
        "Functionele cookies zijn noodzakelijk voor de correcte werking van deze website. Zonder deze cookies kunnen bepaalde onderdelen van de website mogelijk niet correct functioneren.",
    },
    {
      icon: Database,
      title: "Analytische cookies",
      content:
        "Wij gebruiken geen Google Analytics of vergelijkbare meetsoftware. Er wordt dus niet bijgehouden welke pagina's u bekijkt of hoe lang u blijft.",
    },
    {
      icon: Globe,
      title: "Cookies van derden",
      content:
        "De kaart op onze contactpagina komt van Google Maps en wordt pas geladen nadat u daar toestemming voor geeft. Doet u dat, dan kan Google eigen cookies plaatsen; die vallen onder het beleid van Google. Onze WhatsApp-knop en de link naar Google Reviews zijn gewone links: die versturen niets tot u erop klikt.",
    },
    {
      icon: Shield,
      title: "Cookies beheren of verwijderen",
      content:
        "U kunt uw keuze op elk moment wijzigen met de knop onderaan deze pagina. Daarnaast kunt u cookies altijd beheren, blokkeren of verwijderen via de instellingen van uw browser.",
    },
    {
      icon: Shield,
      title: "Wijzigingen aan dit cookiebeleid",
      content:
        "Taxi Bornem behoudt zich het recht voor dit cookiebeleid aan te passen wanneer dit noodzakelijk is. De meest recente versie is steeds beschikbaar op deze website.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="taxi-page-hero py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">
              Juridische informatie
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-6">
              Cookiebeleid
            </h1>

            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              Deze website plaatst zelf geen cookies. Enkel externe inhoud die u
              uitdrukkelijk toestaat — vandaag is dat alleen de kaart op onze
              contactpagina — kan cookies plaatsen.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Cookievrij
              </p>

              <p className="text-[#181818] font-medium">
                Geen eigen cookies. De website werkt zonder.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Transparant
              </p>

              <p className="text-[#181818] font-medium">
                Duidelijke uitleg over welke cookies gebruikt worden.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Controle
              </p>

              <p className="text-[#181818] font-medium">
                U beslist zelf welke cookies u aanvaardt.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid gap-6">

            {sections.map((section, index) => (
              <div
                key={index}
                className="taxi-card bg-[#f7f7f7] rounded-[24px] p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#FFC107]/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#FFC107]" />
                  </div>

                  <h2 className="text-2xl font-bold text-[#181818]">
                    {index + 1}. {section.title}
                  </h2>
                </div>

                <p className="text-[#6b6b6b] leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-4 text-center">

          <div className="mb-10 pb-10 border-b border-black/10">
            <h2 className="text-2xl font-bold text-[#181818] mb-3">
              Uw keuze wijzigen
            </h2>

            <p className="text-[#6b6b6b] mb-5 text-sm">
              Hier past u aan of externe inhoud zoals de Google Maps-kaart mag laden.
            </p>

            <button
              type="button"
              onClick={openConsentBanner}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFC107] text-[#181818] font-semibold rounded-[18px] hover:bg-[#FFD54F] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Cookievoorkeuren openen
            </button>
          </div>

          <h2 className="text-2xl font-bold text-[#181818] mb-4">
            Vragen over ons cookiebeleid?
          </h2>

          <p className="text-[#6b6b6b] mb-6 text-sm">
            Neem gerust contact op. Wij beantwoorden uw vragen persoonlijk.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            <a
              href={`tel:${PHONE_RAW}`}
              className="px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Bel ons
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-[18px] hover:bg-[#1db954] transition-colors flex items-center justify-center gap-2"
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