import { useState } from "react";
import { Plus, X, ArrowRight, Shield, Award, Star, Info, Check } from "lucide-react";
import { services } from "../../data/site";

export default function DienstenPage() {
  // Welke dienst heeft z'n "Meer info" open? De eerste (index 0) staat standaard open.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="taxi-page-hero py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">
              Onze diensten
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-5 leading-[1.1]">
              Premium taxidiensten voor elk moment
            </h1>
            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              Van luchthaventransfer tot lange afstanden — Wij rijden u stipt en comfortabel
              naar elke bestemming.
            </p>
          </div>
        </div>
      </section>

      {/* ── Diensten ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {services.map((s, i) => {
              const isOpen = openIndex === i;
              return (
                <article
                  key={i}
                  className="taxi-card group bg-white rounded-[24px] border border-black/5 overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5"
                >
                  {/* Beeld of icoon */}
                  <div className="relative">
                    {s.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={s.image}
                          alt={`${s.title} — Taxi Bornem Hamid`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          width={1000}
                          height={625}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        {s.tag && (
                          <span className="absolute top-5 left-5 px-3 py-1.5 bg-[#FFC107] text-[#181818] text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                            {s.tag}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#FFC107]/18 via-[#FFC107]/6 to-transparent flex items-center justify-center">
                        {s.tag && (
                          <span className="absolute top-5 left-5 px-3 py-1.5 bg-[#FFC107] text-[#181818] text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {s.tag}
                          </span>
                        )}
                        <div className="w-24 h-24 rounded-full bg-white shadow-md shadow-black/5 ring-1 ring-[#FFC107]/25 flex items-center justify-center">
                          <s.icon className="w-10 h-10 text-[#FFC107]" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Inhoud */}
                  <div className="px-8 pt-7 pb-8 flex-1 flex flex-col">
                    <p className="text-[11px] font-semibold text-[#9b9b9b] uppercase tracking-[0.12em] mb-2">
                      {s.subtitle}
                    </p>
                    <h2 className="font-bold text-[#181818] text-xl tracking-tight mb-3">
                      {s.title}
                    </h2>
                    <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">{s.description}</p>

                    {/* Meer info */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="mt-7 w-full flex items-center justify-between gap-4 py-4 border-t border-black/[0.07] text-sm font-semibold text-[#181818] hover:text-[#FFC107] transition-colors"
                    >
                      {isOpen ? "Minder info" : "Meer over deze dienst"}
                      <span className="w-7 h-7 rounded-full bg-[#f4f4f4] flex items-center justify-center flex-shrink-0">
                        {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pb-2">
                        <ul className="flex flex-col gap-3.5 mb-5">
                          {s.details.map((d, di) => (
                            <li key={di} className="flex items-start gap-3 text-[14px] text-[#444] leading-relaxed">
                              <span className="w-5 h-5 rounded-full bg-[#FFC107]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-[#c99700]" strokeWidth={3} />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                        {s.note && (
                          <div className="flex items-start gap-3 bg-[#FFC107]/[0.08] border border-[#FFC107]/25 rounded-[14px] px-4 py-3.5">
                            <Info className="w-4 h-4 text-[#c99700] mt-0.5 flex-shrink-0" />
                            <p className="text-[13px] text-[#6b6b6b] leading-relaxed">{s.note}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={`/contact?dienst=${s.slug}`}
                      className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181818] text-white text-sm font-semibold rounded-[16px] hover:bg-[#2a2a2a] active:bg-[#111] transition-colors"
                    >
                      {s.title} boeken
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Waarom Taxi Bornem ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
              Waarom Taxi Bornem?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Stiptheid", desc: "Op tijd, altijd. Wij volgen verkeer en vluchten op de voet." },
              { icon: Award, title: "Discretie", desc: "Wij zijn discreet over wie we vervoeren en waarheen. Dat spreekt voor zich." },
              { icon: Star, title: "Comfort", desc: "Verzorgde Kia, schoon en comfortabel voor elke rit." },
            ].map((v, i) => (
              <div
                key={i}
                className="taxi-card flex flex-col items-center text-center px-7 py-9 rounded-[20px] bg-[#f7f7f7]"
              >
                <div className="w-14 h-14 bg-[#FFC107]/12 rounded-[16px] flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-[#FFC107]" />
                </div>
                <h3 className="font-bold text-[#181818] text-lg mb-2.5">{v.title}</h3>
                <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
