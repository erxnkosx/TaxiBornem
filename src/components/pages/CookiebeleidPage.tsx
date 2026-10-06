import {
  Cookie,
  Shield,
  Globe,
  Database,
  Phone,
  MessageCircle,
} from "lucide-react";
import type { ReactNode } from "react";

import { PHONE_RAW, WHATSAPP_URL } from "../../data/site";

// Statische pagina; de knop om de cookievoorkeuren te openen komt als
// interactief eilandje binnen via de prop `settingsButton`.
export default function CookiebeleidPage({ settingsButton }: { settingsButton?: ReactNode }) {
  const sections = [
    {
      icon: Cookie,
      title: "Cookies en lokale opslag",
      content:
        "We bewaren uw afzonderlijke keuzes voor Google Maps en statistieken maximaal 180 dagen in de lokale opslag van uw browser. Deze noodzakelijke opslag onthoudt uw voorkeuren. Eerdere toestemming voor Maps geldt niet als toestemming voor statistieken.",
    },
    {
      icon: Database,
      title: "Analyse en advertenties",
      content:
        "Als Google Analytics is geactiveerd, laden we deze dienst alleen nadat u statistieken toestaat. We meten paginaweergaven, het starten van het formulier, verzendfouten, succesvol ingediende aanvragen en klikken op bellen of WhatsApp. Google Analytics gebruikt hiervoor _ga- en _ga_*-cookies met een ingestelde levensduur van maximaal 180 dagen. We sturen geen ingevulde namen, contactgegevens, ritadressen of opmerkingen mee. Advertentiepersonalisatie en Google Signals zijn uitgeschakeld. We gebruiken geen advertentietags.",
    },
    {
      icon: Globe,
      title: "Google Maps en andere externe links",
      content: (
        <>
          De Google Maps-kaart wordt pas ingeladen nadat u daarvoor kiest. Google ontvangt dan
          onder meer uw IP-adres en technische browsergegevens en kan eigen cookies of opslag
          gebruiken. Welke cookies Google precies plaatst, kan per browser en Google-dienst
          verschillen; raadpleeg het{" "}
          <a
            className="underline"
            href="https://policies.google.com/privacy?hl=nl"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacybeleid van Google
          </a>
          . WhatsApp en Google Reviews zijn gewone externe links: er wordt pas met die diensten
          verbonden wanneer u erop klikt.
        </>
      ),
    },
    {
      icon: Shield,
      title: "Uw keuze wijzigen of wissen",
      content:
        "U kunt uw keuze op elk moment wijzigen met de knop onderaan deze pagina. U kunt de lokale opslag ook wissen via de privacy- of sitegegevensinstellingen van uw browser. Als u de keuzes wist, vragen we opnieuw toestemming. Bij het intrekken van statistiekentoestemming stoppen we de meting en verwijderen we de bereikbare Analytics-cookies op dit domein. Reeds verstuurde gegevens worden daarmee niet automatisch bij Google gewist.",
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
            <p className="text-sm text-[#6b6b6b] mb-4">Laatst bijgewerkt: 6 oktober 2026.</p>

            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              U kiest afzonderlijk voor Google Maps en, indien geactiveerd, Google Analytics. Deze diensten laden pas na uw toestemming. Uw keuzes bewaren we maximaal 180 dagen.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Uw toestemming
              </p>

              <p className="text-[#181818] font-medium">
                Statistieken laden alleen als u ze toestaat.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Transparant
              </p>

              <p className="text-[#181818] font-medium">
                Duidelijke uitleg over Maps en statistieken.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold text-sm mb-2">
                Controle
              </p>

              <p className="text-[#181818] font-medium">
                U kunt beide keuzes afzonderlijk wijzigen.
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
              Hier wijzigt u uw voorkeuren voor Google Maps en statistieken.
            </p>

            {settingsButton}
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
