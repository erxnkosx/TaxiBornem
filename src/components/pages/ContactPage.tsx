import type { ReactNode } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { PHONE, PHONE_RAW, WHATSAPP_URL, EMAIL } from "../../data/site";
import GoogleReviews from "../GoogleReviews";

// Statische pagina; het boekingsformulier en de kaart komen als interactieve
// eilandjes binnen via de props `booking` en `map` (zie contact.astro).
export default function ContactPage({ booking, map }: { booking?: ReactNode; map?: ReactNode }) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="taxi-page-hero py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-4">
            Neem contact op
          </h1>
          <p className="text-lg text-[#6b6b6b] max-w-lg">
            We staan klaar om uw vragen te beantwoorden en uw rit te bevestigen.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Phone,
                  label: "Telefoon",
                  value: PHONE,
                  link: `tel:${PHONE_RAW}`,
                  sub: "Direct bereikbaar",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Stuur een bericht",
                  link: WHATSAPP_URL,
                  sub: "Snelle reactie",
                  external: true,
                },
                {
                  icon: Mail,
                  label: "E-mail",
                  value: EMAIL,
                  link: `mailto:${EMAIL}`,
                  sub: "Reactie binnen 24u",
                },
                {
                  icon: MapPin,
                  label: "Locatie",
                  value: "2880 Bornem, Antwerpen",
                  link: null,
                  sub: "België",
                },
                {
                  icon: Clock,
                  label: "Openingsuren",
                  value: "24u/24 — 7 dagen/7",
                  link: null,
                  sub: "Ook op feestdagen",
                },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-[18px] p-5 border border-black/5 flex items-center gap-4">
                  <div className="w-11 h-11 bg-[#FFC107]/10 rounded-[14px] flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-[#FFC107]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-0.5">{c.label}</p>
                    {c.link ? (
                      <a
                        href={c.link}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold text-[#181818] hover:text-[#FFC107] transition-colors block truncate"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[#181818] truncate">{c.value}</p>
                    )}
                    <p className="text-xs text-[#9b9b9b]">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking form + Map */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Full booking form */}
              <div className="bg-white rounded-[24px] p-7 border border-black/5 shadow-sm">
                <h2 className="font-bold text-[#181818] text-lg mb-5">Rit aanvragen</h2>
                {booking}
              </div>

              {map}
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />
    </div>
  );
}
