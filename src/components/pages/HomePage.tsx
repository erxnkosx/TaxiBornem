import { MessageCircle, Clock, Star, Car, ArrowRight, Shield, Award, Navigation2, Plane } from "lucide-react";
import { WHATSAPP_URL, services, destinations, airportPriceNotice } from "../../data/site";
import GoogleReviews from "../GoogleReviews";
import BookingForm from "../BookingForm";
import FAQ from "../FAQ";
import BookingTimeline from "../BookingTimeline";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="taxi-hero relative min-h-screen flex items-center pt-16 overflow-hidden bg-white">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="taxi-checker-fade absolute inset-y-0 right-0 w-[42%] opacity-70" />
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#FFC107]/8 blur-3xl" />
          <div className="absolute top-1/2 -left-64 w-[400px] h-[400px] rounded-full bg-[#FFC107]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="taxi-eyebrow inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs font-semibold text-[#181818] tracking-wide">Premium Taxi Service — Bornem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#181818] leading-[1.1] tracking-tight mb-6">
                Uw{" "}
                <span className="relative inline-block">
                  betrouwbare
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#FFC107] rounded-full" />
                </span>{" "}
                taxi in Bornem en omgeving
              </h1>

              <p className="text-lg text-[#6b6b6b] leading-relaxed mb-8 max-w-md">
                Stipt, betrouwbaar en persoonlijk. Taxi Bornem brengt u comfortabel en veilig naar elke bestemming, 24 uur per dag, 7 dagen per week.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => {
                    document.getElementById("boek")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="taxi-primary-btn px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                >
                  <Car className="w-4 h-4" />
                  Boek een rit
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-[18px] hover:bg-[#1db954] transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/15"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-6 text-sm text-[#6b6b6b]">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#181818]">4,9</span>
                  <span>Google</span>
                </div>
                <div className="w-px h-4 bg-black/10" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  24/7 beschikbaar
                </span>
                <div className="hidden sm:block w-px h-4 bg-black/10" />
                <span className="hidden sm:flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Verzekerd
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="taxi-image-frame relative rounded-[24px] overflow-hidden shadow-2xl shadow-black/15 aspect-[4/3]">
                <img
                  src="/car.webp"
                  alt="Kia taxi van Taxi Bornem Hamid in Bornem"
                  className="w-full h-full object-cover"
                  width={900}
                  height={675}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-[18px] p-4 shadow-xl border border-black/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC107]/10 rounded-[12px] flex items-center justify-center">
                  <Star className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                </div>
                <div>
                  <p className="font-bold text-[#181818] text-sm">4,9 / 5</p>
                  <p className="text-xs text-[#6b6b6b]">46 Google-reviews</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-[18px] p-4 shadow-xl border border-black/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-[12px] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-bold text-[#181818] text-sm">Direct antwoord</p>
                  <p className="text-xs text-[#6b6b6b]">Via WhatsApp</p>
                </div>
              </div>
              <div className="taxi-dispatch-badge absolute bottom-5 right-5 hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-[14px] bg-[#181818]/90 backdrop-blur-md text-white shadow-lg border border-white/10">
                <div className="relative w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-[#FFC107] animate-ping opacity-40" />
                  <span className="absolute inset-0 rounded-full bg-[#FFC107]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/50 font-semibold">Standplaats</p>
                  <p className="text-xs font-bold">Bornem · 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form section */}
      <section id="boek" className="taxi-grid-bg py-20 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Reservatie</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">Boek uw rit</h2>
            <p className="text-[#6b6b6b] mt-3 text-sm">Vul het formulier in en ontvang snel een prijsvoorstel via WhatsApp.</p>
          </div>
          <div className="taxi-panel bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-black/5">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <BookingTimeline />

      {/* Services */}
      <section className="taxi-grid-bg py-24 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Onze diensten</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">Wat wij aanbieden</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {services.slice(0, 3).map((s, i) => (
              <div key={i} className="taxi-card bg-white rounded-[18px] p-6 border border-black/5 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 bg-[#f4f4f4] rounded-[14px] flex items-center justify-center group-hover:bg-[#FFC107]/10 transition-colors">
                  <s.icon className="w-5 h-5 text-[#181818] group-hover:text-[#FFC107] transition-colors" />
                </div>

                {s.tag && (
                  <span className="px-3 py-1 bg-[#FFC107] text-[#181818] text-[10px] font-bold rounded-full uppercase tracking-wide leading-none -translate-y-3">
                    {s.tag}
                  </span>
                )}
              </div>
                <h3 className="font-bold text-[#181818] text-base mb-0.5">{s.title}</h3>
                <p className="text-xs text-[#6b6b6b] uppercase tracking-wide mb-3">{s.subtitle}</p>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/diensten"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-[14px] text-sm font-semibold text-[#181818] hover:bg-[#f7f7f7] transition-colors"
            >
              Alle diensten bekijken
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Luchthavenvervoer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">Vaste luchthavenprijzen</h2>
            <p className="text-[#6b6b6b] mt-3 text-sm max-w-lg mx-auto">
              Eén vaste prijs per luchthaven, voordeliger dan ons kilometertarief. Alleen voor rechtstreeks
              luchthavenvervoer — persoonlijk bevestigd door onze medewerkers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="taxi-route-card flex items-center justify-between p-4 rounded-[18px] bg-[#f7f7f7] transition-all border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-[10px] flex items-center justify-center shadow-sm">
                    <Navigation2 className="w-4 h-4 text-[#FFC107]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b] font-medium">{d.from}</p>
                    <p className="text-sm font-semibold text-[#181818]">{d.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6b6b6b]">Vaste prijs</p>
                  <p className="text-base font-bold text-[#181818]">{d.price}</p>
                  <p className="text-xs text-[#9b9b9b]">{d.duration}</p>
                  <p className="text-[10px] text-[#9b9b9b]">excl. toeslagen</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 bg-white rounded-[14px] border border-[#FFC107]/30 p-4 text-left">
            <Plane className="w-4 h-4 text-[#c99700] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              <span className="font-semibold text-[#181818]">Enkel voor luchthavenvervoer. </span>
              {airportPriceNotice}
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="taxi-cta py-24 bg-[#181818]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-[#FFC107] rounded-[18px] flex items-center justify-center mx-auto mb-6">
            <Car className="w-7 h-7 text-[#181818]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Klaar voor een comfortabele rit?
          </h2>
          <p className="text-white/50 mb-8 text-base leading-relaxed">
            Contacteer ons vandaag nog. Persoonlijk, stipt en betrouwbaar — elke keer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="px-6 py-3.5 bg-[#FFC107] text-[#181818] font-bold rounded-[18px] hover:bg-[#FFD54F] transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              Boek een rit
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 text-white font-semibold rounded-[18px] hover:bg-white/20 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Taxi Bornem
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
