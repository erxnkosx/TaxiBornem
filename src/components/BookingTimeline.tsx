import { useEffect, useRef, useState } from "react";
import { MessageCircle, Car, Check, Calendar, User } from "lucide-react";

export default function BookingTimeline() {
  const steps = [
    { icon: Calendar, label: "Aanvraag", desc: "U vult het formulier in of stuurt een WhatsApp bericht" },
    { icon: User, label: "Aanvraag ontvangen", desc: "Wij bekijken uw aanvraag persoonlijk" },
    { icon: MessageCircle, label: "Prijs via WhatsApp", desc: "U ontvangt een transparant prijsvoorstel" },
    { icon: Check, label: "Klant bevestigt", desc: "U geeft akkoord via WhatsApp of telefoon" },
    { icon: Car, label: "Rit bevestigd", desc: "Wij staan op het afgesproken moment klaar" },
  ];

  const sectieRef = useRef<HTMLDivElement>(null);
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    // Respecteer de systeeminstelling "verminder beweging": dan meteen alles tonen.
    const minderBeweging = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (minderBeweging) {
      setZichtbaar(true);
      return;
    }

    const el = sectieRef.current;
    if (!el) return;

    // Start de animatie zodra de tijdlijn in beeld komt — en maar één keer.
    const waarnemer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setZichtbaar(true);
          waarnemer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    waarnemer.observe(el);
    return () => waarnemer.disconnect();
  }, []);

  return (
    <div className="taxi-road-section py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">
            Hoe het werkt
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">
            Van aanvraag tot rit
          </h2>
        </div>

        <div className="relative" ref={sectieRef}>
          {/* Route die zichzelf tekent van links naar rechts */}
          <div
            className="hidden md:block absolute top-8 left-[8%] right-[8%] h-[3px] rounded-full overflow-hidden bg-black/[0.06]"
            aria-hidden="true"
          >
            <div
              className="taxi-route-line h-full rounded-full origin-left transition-transform duration-[1400ms] ease-out"
              style={{ transform: zichtbaar ? "scaleX(1)" : "scaleX(0)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center relative transition-all duration-500 ease-out"
                style={{
                  opacity: zichtbaar ? 1 : 0,
                  transform: zichtbaar ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 140}ms`,
                }}
              >
                <div className="relative mb-3 z-10">
                  <div className="taxi-step-icon w-16 h-16 rounded-[18px] bg-[#FFC107]/10 flex items-center justify-center border-2 border-[#FFC107]/20 transition-all duration-300 group-hover:bg-[#FFC107]/20 group-hover:border-[#FFC107]/50 group-hover:-translate-y-1">
                    <step.icon className="w-6 h-6 text-[#FFC107] transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Nummerbolletje met een klein pop-effect */}
                  <div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFC107] rounded-full flex items-center justify-center transition-transform duration-300 ease-out"
                    style={{
                      transform: zichtbaar ? "scale(1)" : "scale(0)",
                      transitionDelay: `${i * 140 + 220}ms`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-[#181818]">{i + 1}</span>
                  </div>
                </div>

                <p className="font-semibold text-[#181818] text-sm mb-1">{step.label}</p>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
