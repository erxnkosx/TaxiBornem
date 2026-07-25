import { Phone, MessageCircle, Clock, Check, Shield, Award } from "lucide-react";
import { PHONE_RAW, WHATSAPP_URL, stats } from "../../data/site";

export default function OverOnsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="taxi-page-hero py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">Over ons</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-6">
                Meer dan een taxi. <br />
                <span className="text-[#6b6b6b]">Een vertrouwde partner.</span>
              </h1>
              <p className="text-base text-[#6b6b6b] leading-relaxed mb-6">
                Hamid startte in 2012 met één doel: de meest betrouwbare taxichauffeur van Bornem worden.
                Wat begon als een soloproject groeide uit tot een vertrouwde naam in de regio, gebaseerd op stiptheid, discretie en een oprechte glimlach.
              </p>
              <p className="text-base text-[#6b6b6b] leading-relaxed mb-8">
                Vandaag rijdt Hamid elke dag zakenmensen, gezinnen en reizigers naar hun bestemming — altijd persoonlijk, altijd met zorg. Geen callcenter, geen anonieme service: ú belt Hamid, en Hamid rijdt u.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-sm text-[#181818]">Mercedes-Benz voertuig — geluxeerd en altijd schoon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-sm text-[#181818]">Volledig vergund en verzekerd — Antwerpen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-sm text-[#181818]">Meertalig: Nederlands, Frans, Engels, Arabisch</span>
                </div>
              </div>
            </div>

            {/* Portrait */}
            <div className="relative">
              <div className="taxi-image-frame relative rounded-[24px] overflow-hidden aspect-[16/10] shadow-xl shadow-black/10 max-w-xl mx-auto">
                <img
                  src="/logo.webp"
                  alt="Hamid, professionele taxichauffeur in Bornem"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-black text-[#FFC107] mb-1">{s.value}</p>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] tracking-tight">Onze waarden</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Stiptheid",
                desc: "Op tijd zijn is respect. Hamid plant elke rit nauwkeurig en volgt verkeer en vluchten live op.",
              },
              {
                icon: Shield,
                title: "Discretie",
                desc: "Zakelijke gesprekken, persoonlijke verhalen — alles wat in de wagen wordt gezegd, blijft vertrouwelijk.",
              },
              {
                icon: Award,
                title: "Comfort",
                desc: "Een propere, geluxeerde Mercedes. Airco, water, stille muziek of stilte — zoals u dat wenst.",
              },
            ].map((v, i) => (
              <div key={i} className="taxi-card p-7 rounded-[18px] bg-[#f7f7f7] flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-[14px] flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-[#FFC107]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#181818] text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#181818] mb-4">Leer Hamid persoonlijk kennen</h2>
          <p className="text-[#6b6b6b] mb-6 text-sm">Bel of stuur een WhatsApp — Hamid beantwoordt elke vraag persoonlijk.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${PHONE_RAW}`}
              className="taxi-primary-btn px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-all text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Bel Hamid
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-[18px] hover:bg-[#1db954] transition-colors text-sm flex items-center justify-center gap-2"
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
