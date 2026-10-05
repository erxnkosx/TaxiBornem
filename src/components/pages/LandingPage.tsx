import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, PHONE, PHONE_RAW, WHATSAPP_URL, services } from "../../data/site";
import { dienstPages, gemeentePages, type LandingPageData } from "../../data/landing";
import FAQ from "../FAQ";
import GoogleReviews from "../GoogleReviews";

interface Props {
  page: LandingPageData;
  /** Het boekingsformulier, als interactief eilandje (zie [slug].astro). */
  booking?: ReactNode;
}

// Statische sjabloonpagina voor diensten en gemeenten. Alle tekst staat in
// src/data/landing.ts; deze component zorgt alleen voor de opmaak.
export default function LandingPage({ page, booking }: Props) {
  const isDienst = page.kind === "dienst";
  const otherDiensten = dienstPages.filter((d) => d.slug !== page.slug);
  const otherGemeenten = gemeentePages.filter((g) => g.slug !== page.slug);
  const plaats = isDienst ? "Bornem" : page.label.replace(/^Taxi /, "");

  const crumbs = isDienst
    ? [
        { name: "Home", href: "/" },
        { name: "Diensten", href: "/diensten" },
        { name: page.label, href: null },
      ]
    : [
        { name: "Home", href: "/" },
        { name: page.label, href: null },
      ];

  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="taxi-page-hero py-14 lg:py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-[#6b6b6b]">
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-[#b0b0b0]" aria-hidden="true" />}
                  {c.href ? (
                    <a href={c.href} className="hover:text-[#181818] transition-colors">
                      {c.name}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-[#181818] font-medium">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">{page.kicker}</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-5 leading-[1.1]">
                {page.h1}
              </h1>
              <p className="text-lg text-[#6b6b6b] leading-relaxed mb-8 max-w-xl">{page.lead}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href="#boek"
                  className="taxi-primary-btn px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                >
                  Vraag uw prijs aan
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="px-6 py-3.5 border border-black/10 text-[#181818] font-semibold rounded-[18px] hover:bg-[#f7f7f7] transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6b6b6b]">
                <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#181818]">
                  <span className="flex" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                    ))}
                  </span>
                  <span className="font-semibold text-[#181818]">4,9</span> op Google
                </a>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  24/7 beschikbaar
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="taxi-image-frame relative rounded-[24px] overflow-hidden shadow-2xl shadow-black/15 aspect-[16/10]">
                <img
                  src={page.image}
                  alt={page.imageAlt}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={625}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kernpunten ───────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-black/[0.07]">
            {page.highlights.map((h) => (
              <li key={h.title} className="md:px-8 first:md:pl-0 last:md:pr-0 flex gap-4">
                <span className="w-9 h-9 rounded-full bg-[#FFC107]/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#c99700]" strokeWidth={3} />
                </span>
                <div>
                  <p className="font-bold text-[#181818] mb-1">{h.title}</p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Inhoud + routes ──────────────────────────────────── */}
      <section className="taxi-grid-bg py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-12 max-w-2xl">
            {page.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight mb-4">{sec.heading}</h2>
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-[16px] text-[#4a4a4a] leading-[1.75] mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul
                    className={
                      sec.bullets.length > 5
                        ? "mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3"
                        : "mt-5 flex flex-col gap-3"
                    }
                  >
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-[#181818] leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#FFC107]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#c99700]" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 self-start flex flex-col gap-4">
            {page.routes && (
              <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7">
                <h2 className="font-bold text-[#181818] text-lg mb-5">{page.routes.title}</h2>
                <div className="relative">
                  {/* Startpunt van de route */}
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#181818] ring-4 ring-[#181818]/10 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#181818]">{page.routes.from}</span>
                  </div>
                  <ul className="relative pl-[6px]">
                    {/* Gestippelde route langs alle bestemmingen */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[6px] top-0 bottom-[18px] border-l-2 border-dashed border-[#181818]/15"
                    />
                    {page.routes.rows.map((r) => (
                      <li key={r.naar} className="relative pl-6 pt-4">
                        <span
                          aria-hidden="true"
                          className="absolute left-[-4px] top-[22px] w-3 h-3 rounded-full bg-[#FFC107] ring-4 ring-white"
                        />
                        <p className="text-sm font-semibold text-[#181818] leading-snug">{r.naar}</p>
                        <p className="text-xs text-[#6b6b6b] tabular-nums mt-0.5">
                          {r.afstand}, {r.reistijd}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-[#9b9b9b] leading-relaxed mt-6 pt-4 border-t border-black/5">
                  Richtwaarden zonder file. Bij uw boeking plannen we het vertrek met marge voor het verkeer.
                </p>
              </div>
            )}

            <div className="bg-[#181818] text-white rounded-[24px] p-6 sm:p-7">
              <p className="font-bold text-lg mb-2">Liever even overleggen?</p>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                Bel of stuur een WhatsApp. U krijgt ons meteen aan de lijn, dag en nacht.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFC107] text-[#181818] text-sm font-bold rounded-[14px] hover:bg-[#FFD54F] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white text-sm font-semibold rounded-[14px] hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Boeken ───────────────────────────────────────────── */}
      <section id="boek" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
              {isDienst ? `${page.label} boeken` : `Taxi boeken in ${plaats}`}
            </h2>
            <p className="text-[#6b6b6b] mt-3 text-sm">
              Vul het formulier in en ontvang snel een vaste prijs via WhatsApp. Pas na uw akkoord is de rit geboekt.
            </p>
          </div>
          <div className="taxi-panel bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-black/5">{booking}</div>
        </div>
      </section>

      {/* ── Diensten in deze gemeente ────────────────────────── */}
      {!isDienst && (
        <section className="py-20 bg-[#f7f7f7] border-t border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight mb-8">
              Onze diensten in {plaats}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="taxi-card bg-white rounded-[18px] p-6 border border-black/5 flex flex-col gap-3 group"
                >
                  <s.icon className="w-5 h-5 text-[#181818] group-hover:text-[#c99700] transition-colors" />
                  <span className="font-bold text-[#181818]">{s.title}</span>
                  <span className="text-sm text-[#6b6b6b] leading-relaxed">{s.description}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews (altijd allemaal, zelfde blok als op de homepage) ── */}
      <div className="border-t border-black/5">
        <GoogleReviews />
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQ
        items={page.faq}
        title={isDienst ? `Vragen over ${page.label.toLowerCase()}` : `Vragen over een taxi in ${plaats}`}
        tone="grey"
      />

      {/* ── Verder kijken ────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-bold text-[#181818] text-lg mb-4">{isDienst ? "Andere diensten" : "Ook in de buurt"}</h2>
            <div className="flex flex-wrap gap-2.5">
              {(isDienst ? otherDiensten : otherGemeenten).map((l) => (
                <a
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f7f7f7] border border-black/5 rounded-[14px] text-sm font-semibold text-[#181818] hover:border-[#FFC107]/40 hover:bg-white transition-colors"
                >
                  {!isDienst && <MapPin className="w-4 h-4 text-[#FFC107]" />}
                  {l.label}
                </a>
              ))}
              {!isDienst && (
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f7f7f7] border border-black/5 rounded-[14px] text-sm font-semibold text-[#181818] hover:border-[#FFC107]/40 hover:bg-white transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#FFC107]" />
                  Taxi Bornem
                </a>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[#181818] text-lg mb-4">{isDienst ? "Werkgebied" : "Alle diensten"}</h2>
            <div className="flex flex-wrap gap-2.5">
              {(isDienst ? gemeentePages : dienstPages).map((l) => (
                <a
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f7f7f7] border border-black/5 rounded-[14px] text-sm font-semibold text-[#181818] hover:border-[#FFC107]/40 hover:bg-white transition-colors"
                >
                  {isDienst && <MapPin className="w-4 h-4 text-[#FFC107]" />}
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
