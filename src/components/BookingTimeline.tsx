import { MessageCircle, Car, Check, Calendar, User } from "lucide-react";

export default function BookingTimeline() {
  const steps = [
    { icon: Calendar, label: "Aanvraag", desc: "U vult het formulier in of stuurt een WhatsApp" },
    { icon: User, label: "Hamid ontvangt", desc: "Hamid bekijkt uw aanvraag persoonlijk" },
    { icon: MessageCircle, label: "Prijs via WhatsApp", desc: "U ontvangt een transparant prijsvoorstel" },
    { icon: Check, label: "Klant bevestigt", desc: "U geeft akkoord via WhatsApp of telefoon" },
    { icon: Car, label: "Rit bevestigd", desc: "Hamid staat op het afgesproken moment klaar" },
  ];

  return (
    <div className="taxi-road-section py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Hoe het werkt</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">Van aanvraag tot rit</h2>
        </div>
        <div className="relative">
          {/* Connecting route line desktop */}
          <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-[3px] rounded-full taxi-route-line" aria-hidden="true" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="relative mb-3 z-10">
                  <div className="taxi-step-icon w-16 h-16 rounded-[18px] bg-[#FFC107]/10 flex items-center justify-center border-2 border-[#FFC107]/20">
                    <step.icon className="w-6 h-6 text-[#FFC107]" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFC107] rounded-full flex items-center justify-center">
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
