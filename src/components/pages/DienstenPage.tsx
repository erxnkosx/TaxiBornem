import { Plus, ArrowRight, Info, Check, MapPin } from "lucide-react";
import { services } from "../../data/site";
import { gemeentePages } from "../../data/landing";

// Statisch: "Meer over deze dienst" is een native <details>, dus de tekst
// staat altijd in de HTML en werkt zonder JavaScript.
export default function DienstenPage() {
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
                          alt={`${s.title} — Taxi Bornem`}
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
                      <a href={`/${s.slug}`} className="hover:text-[#c99700] transition-colors">
                        {s.title}
                      </a>
                    </h2>
                    <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">{s.description}</p>

                    {/* Meer info */}
                    <details className="taxi-details group/details mt-7" open={i === 0}>
                      <summary className="w-full flex items-center justify-between gap-4 py-4 border-t border-black/[0.07] text-sm font-semibold text-[#181818] hover:text-[#c99700] transition-colors cursor-pointer list-none">
                        Kort samengevat
                        <span className="w-7 h-7 rounded-full bg-[#f4f4f4] flex items-center justify-center flex-shrink-0">
                          <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-open/details:rotate-45" />
                        </span>
                      </summary>
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
                    </details>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/${s.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181818] text-white text-sm font-semibold rounded-[16px] hover:bg-[#2a2a2a] active:bg-[#111] transition-colors"
                      >
                        Alles over {s.title.toLowerCase()}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href={`/contact?dienst=${s.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-black/10 text-[#181818] text-sm font-semibold rounded-[16px] hover:bg-[#f7f7f7] transition-colors"
                      >
                        Direct boeken
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Werkgebied ───────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-[#181818] tracking-tight mb-2">Alle diensten, ook in uw gemeente</h2>
            <p className="text-sm text-[#6b6b6b] leading-relaxed">
              Vanuit Bornem rijden we elke dag in de buurgemeenten.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {gemeentePages.map((g) => (
              <a
                key={g.slug}
                href={`/${g.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f7f7f7] border border-black/5 rounded-[14px] text-sm font-semibold text-[#181818] hover:border-[#FFC107]/40 hover:bg-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#FFC107]" />
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
