import { MessageCircle, Car } from "lucide-react";
import { destinations } from "../../data/site";
import { cn } from "../../lib/cn";

export default function TarievenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="taxi-page-hero py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">Tarieven</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-4">
            Transparante prijzen
          </h1>
          <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto leading-relaxed">
            Elke definitieve prijs wordt persoonlijk bevestigd door Hamid via WhatsApp. Geen verrassingen, altijd eerlijk.
          </p>
        </div>
      </section>

      {/* Base rates */}
      <section className="py-20 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#181818] mb-6">Basistarieven</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Starttarief", value: "€3,50", sub: "bij elke rit" },
              { label: "Prijs per km", value: "€2,10", sub: "per kilometer" },
              { label: "Wachttijd", value: "€30,00", sub: "per uur" },
              { label: "Nachttoeslag", value: "+25%", sub: "22:00 – 06:00" },
            ].map((item, i) => (
              <div key={i} className="taxi-card bg-white rounded-[18px] p-6 border border-black/5 text-center">
                <p className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-3xl font-bold text-[#181818] mb-1">{item.value}</p>
                <p className="text-xs text-[#9b9b9b]">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Surcharges */}
          <div className="bg-white rounded-[18px] p-6 border border-black/5 mb-6">
            <h3 className="font-bold text-[#181818] mb-4 text-base">Toeslagen</h3>
            <div className="flex flex-col gap-3">
              {[
                ["Nachttoeslag", "22:00 – 06:00", "+25%"],
                ["Weekendtoeslag", "Zaterdag & zondag", "+15%"],
                ["Feestdagentoeslag", "Officiële feestdagen", "+25%"],
                ["Luchthavenparkeren", "Ophaal aan terminal", "+€8,00"],
                ["Kinderzitje", "Op aanvraag", "Gratis"],
              ].map(([label, desc, price], i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-[#181818]">{label}</p>
                    <p className="text-xs text-[#6b6b6b]">{desc}</p>
                  </div>
                  <span className={cn("text-sm font-bold", price === "Gratis" ? "text-[#25D366]" : "text-[#181818]")}>
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-[18px] p-5 flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#181818] leading-relaxed">
              <strong>Hamid bevestigt elke prijs persoonlijk via WhatsApp</strong> vóór de rit. U ontvangt een transparant prijsvoorstel op basis van uw exacte route en tijdstip — geen verrassingen achteraf.
            </p>
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#181818] mb-2">Populaire ritten (vanafprijzen)</h2>
          <p className="text-sm text-[#6b6b6b] mb-8">Indicatieve tarieven. Definitieve prijs op aanvraag via het boekingsformulier.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {destinations.map((d, i) => (
              <div key={i} className="taxi-route-card flex items-center justify-between p-5 rounded-[18px] bg-[#f7f7f7] transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107] border-2 border-[#FFC107]/30" />
                    <div className="w-px h-4 bg-black/15" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#181818] border-2 border-[#181818]/30" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6b6b6b]">{d.from}</p>
                    <p className="text-sm font-semibold text-[#181818]">{d.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6b6b6b] mb-0.5">Vanaf</p>
                  <p className="text-xl font-bold text-[#181818]">{d.price}</p>
                  <p className="text-xs text-[#9b9b9b]">{d.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#181818] mb-4">Exacte prijs opvragen?</h2>
          <p className="text-[#6b6b6b] mb-6 text-sm">Stuur uw rit door via het boekingsformulier en Hamid stuurt u snel een voorstel.</p>
          <a
            href="/contact"
            className="taxi-primary-btn px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-all text-sm inline-flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            Boek een rit
          </a>
        </div>
      </section>
    </div>
  );
}
