import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { PHONE, PHONE_RAW, WHATSAPP_URL, EMAIL } from "../../data/site";
import GoogleReviews from "../GoogleReviews";
import BookingForm from "../BookingForm";

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({ naam: "", email: "", bericht: "" });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 800);
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#f4f4f4] border border-transparent rounded-[14px] text-sm text-[#181818] placeholder:text-[#9b9b9b] focus:outline-none focus:border-[#FFC107] focus:bg-white transition-all duration-150";
  const labelClass = "block text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-1.5";

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
            Hamid staat klaar om uw vragen te beantwoorden en uw rit te bevestigen.
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
                <BookingForm />
              </div>

              {/* Map */}
              <div className="bg-white rounded-[24px] overflow-hidden border border-black/5 shadow-sm">
                <div className="p-4 border-b border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FFC107]" />
                    <span className="text-sm font-semibold text-[#181818]">Bornem, Antwerpen</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Bornem,Belgium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#6b6b6b] hover:text-[#181818] transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
                <iframe
                  title="Bornem op Google Maps"
                  src="https://maps.google.com/maps?q=Bornem,Belgium&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-56 border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />
    </div>
  );
}
