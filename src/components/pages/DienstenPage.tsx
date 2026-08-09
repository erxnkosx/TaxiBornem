import { Star, ArrowRight, Shield, Award } from "lucide-react";
import { services } from "../../data/site";

export default function DienstenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="taxi-page-hero py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">Onze diensten</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-4">
              Premium taxidiensten voor elk moment
            </h1>
            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              Van luchthaventransfer tot medisch vervoer — Hamid rijdt u stipt en comfortabel naar elke bestemming.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <div
                key={i}
                className="taxi-card bg-white rounded-[24px] p-7 border border-black/5 transition-all duration-200 group flex gap-5"
              >
                <div className="w-14 h-14 bg-[#f4f4f4] rounded-[18px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC107]/10 transition-colors">
                  <s.icon className="w-6 h-6 text-[#181818] group-hover:text-[#FFC107] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-bold text-[#181818] text-base">{s.title}</h3>
                    {s.tag && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-[#FFC107] text-[#181818] text-[10px] font-bold rounded-full uppercase tracking-wide">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6b6b6b] uppercase tracking-wide mb-3">{s.subtitle}</p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{s.description}</p>
                  <a
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#181818] hover:text-[#FFC107] transition-colors"
                  >
                    Boek nu
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hamid */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] tracking-tight">Waarom Hamid?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Stiptheid", desc: "Op tijd, altijd. Hamid volgt verkeer en vluchten op de voet." },
              { icon: Award, title: "Discretie", desc: "Wat in de wagen blijft, blijft in de wagen. 100% vertrouwelijk." },
              { icon: Star, title: "Comfort", desc: "Verzorgde Kia, schoon en comfortabel voor elke rit." },
            ].map((v, i) => (
              <div key={i} className="taxi-card flex flex-col items-center text-center p-6 rounded-[18px] bg-[#f7f7f7]">
                <div className="w-12 h-12 bg-[#FFC107]/10 rounded-[14px] flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-[#FFC107]" />
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{v.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
