import { useState } from "react";
import {
  MessageCircle, Car, ArrowRight, Moon, CalendarDays, PartyPopper,
  Plane, Baby, Clock, Plus, Minus, Info, Banknote, CreditCard, Building2, Check,
} from "lucide-react";
import { destinations, faqItems, rates, paymentMethods, tariffFaqIndexes, WHATSAPP_URL } from "../../data/site";
import { cn } from "../../lib/cn";

/** Icoon per toeslag — los van de data zodat site.ts geen React hoeft te kennen. */
const surchargeIcons: Record<string, typeof Moon> = {
  moon: Moon,
  calendar: CalendarDays,
  party: PartyPopper,
  plane: Plane,
  baby: Baby,
  clock: Clock,
};

const surchargeList = [
  { icon: "moon", label: "Nachttoeslag", desc: "22:00 – 06:00", value: "+25%" },
  { icon: "calendar", label: "Weekendtoeslag", desc: "Zaterdag & zondag", value: "+15%" },
  { icon: "party", label: "Feestdagentoeslag", desc: "Officiële feestdagen", value: "+25%" },
  { icon: "plane", label: "Luchthavenparkeren", desc: "Ophaal aan terminal", value: "+€8,00" },
  { icon: "baby", label: "Kinderzitje", desc: "Op aanvraag", value: "Gratis" },
  { icon: "clock", label: "Wachttijd", desc: "We wachten ter plaatse", value: "€30,00/u" },
];

const betaalIcons = [Banknote, CreditCard, CreditCard, Building2];

/** €-notatie in Belgisch formaat: €45,50 */
function euro(bedrag: number): string {
  return "€" + bedrag.toFixed(2).replace(".", ",");
}

export default function TarievenPage() {
  const [km, setKm] = useState(20);
  const [nacht, setNacht] = useState(false);
  const [weekend, setWeekend] = useState(false);
  const [terminal, setTerminal] = useState(false);

  // Prijsopbouw: (starttarief + km × kmprijs) × toeslagpercentage + vaste toeslagen
  const ritPrijs = rates.base + km * rates.perKm;
  const procent = (nacht ? rates.surcharges.night : 0) + (weekend ? rates.surcharges.weekend : 0);
  const totaal = ritPrijs * (1 + procent / 100) + (terminal ? rates.surcharges.airportParking : 0);

  const situaties = [
    { actief: nacht, zet: setNacht, icon: Moon, label: "'s Nachts", extra: "+25%" },
    { actief: weekend, zet: setWeekend, icon: CalendarDays, label: "Weekend", extra: "+15%" },
    { actief: terminal, zet: setTerminal, icon: Plane, label: "Aan de terminal", extra: "+€8" },
  ];

  const tariefFaqs = tariffFaqIndexes.map((i) => faqItems[i]).filter(Boolean);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="taxi-page-hero py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">Tarieven</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-5 leading-[1.1]">
            Transparante prijzen
          </h1>
          <p className="text-lg text-[#6b6b6b] max-w-xl mx-auto leading-relaxed">
            Elke definitieve prijs wordt persoonlijk bevestigd door onze medewerkers via WhatsApp.
            Geen verrassingen, altijd eerlijk.
          </p>
        </div>
      </section>

      {/* ── Prijsopbouw ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight mb-2">
              Zo is uw prijs opgebouwd
            </h2>
            <p className="text-sm text-[#6b6b6b]">Drie eenvoudige onderdelen, meer is het niet.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-2">
            {[
              { label: "Starttarief", value: euro(rates.base), sub: "bij elke rit" },
              { label: "Per kilometer", value: euro(rates.perKm), sub: "× het aantal km" },
              { label: "Eventuele toeslag", value: "0 – 25%", sub: "nacht, weekend, feestdag" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-2 flex-1">
                <div className="flex-1 bg-[#f7f7f7] rounded-[18px] px-6 py-7 text-center">
                  <p className="text-[11px] font-semibold text-[#9b9b9b] uppercase tracking-[0.1em] mb-2.5">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold text-[#181818] mb-1.5">{item.value}</p>
                  <p className="text-xs text-[#9b9b9b]">{item.sub}</p>
                </div>
                {i < 2 && (
                  <span className="hidden sm:flex text-2xl font-light text-[#FFC107] px-1">+</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────── */}
      <section className="py-20 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Bereken zelf</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">
              Wat kost uw rit ongeveer?
            </h2>
          </div>

          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#FFC107] to-[#FFC107]/20" />
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-7">
              {/* Bediening */}
              <div>
                {/* Afstand */}
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="afstand" className="text-[11px] font-semibold text-[#9b9b9b] uppercase tracking-[0.1em]">
                    Afstand
                  </label>
                  <span className="text-sm font-bold text-[#181818]">{km} km</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setKm((v) => Math.max(1, v - 1))}
                    aria-label="Minder kilometer"
                    className="w-9 h-9 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#181818]" />
                  </button>
                  <input
                    id="afstand"
                    type="range"
                    min={1}
                    max={150}
                    value={km}
                    onChange={(e) => setKm(Number(e.target.value))}
                    className="taxi-range flex-1"
                    style={{
                      background: `linear-gradient(to right, #FFC107 0%, #FFC107 ${((km - 1) / 149) * 100}%, #ebebeb ${((km - 1) / 149) * 100}%, #ebebeb 100%)`,
                    }}
                  />
                  <button
                    onClick={() => setKm((v) => Math.min(150, v + 1))}
                    aria-label="Meer kilometer"
                    className="w-9 h-9 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#181818]" />
                  </button>
                </div>
                <div className="flex justify-between text-[11px] text-[#9b9b9b] mt-2 px-12">
                  <span>1 km</span>
                  <span>150 km</span>
                </div>

                {/* Situatie */}
                <p className="text-[11px] font-semibold text-[#9b9b9b] uppercase tracking-[0.1em] mt-7 mb-3">
                  Situatie
                </p>
                <div className="flex flex-wrap gap-2">
                  {situaties.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => s.zet(!s.actief)}
                      aria-pressed={s.actief}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-sm font-medium border transition-all",
                        s.actief
                          ? "bg-[#FFC107]/12 border-[#FFC107] text-[#181818]"
                          : "bg-[#f7f7f7] border-transparent text-[#6b6b6b] hover:bg-[#f0f0f0]"
                      )}
                    >
                      <s.icon className={cn("w-4 h-4", s.actief ? "text-[#c99700]" : "text-[#9b9b9b]")} />
                      {s.label}
                      <span className={cn("text-xs", s.actief ? "text-[#c99700] font-semibold" : "text-[#9b9b9b]")}>
                        {s.extra}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Richtprijs */}
              <div className="bg-[#181818] rounded-[18px] p-6 flex flex-col justify-center text-center">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.14em] mb-2">
                  Richtprijs
                </p>
                <p className="text-4xl font-bold text-[#FFC107] mb-2 tabular-nums">{euro(totaal)}</p>
                <p className="text-[11px] text-white/40 leading-relaxed mb-5">
                  {euro(rates.base)} start + {km} km × {euro(rates.perKm)}
                  {procent > 0 && ` + ${procent}%`}
                  {terminal && ` + ${euro(rates.surcharges.airportParking)}`}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FFC107] text-[#181818] text-sm font-bold rounded-[14px] hover:bg-[#FFD54F] transition-colors"
                >
                  Vaste prijs opvragen
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 flex items-start gap-3 bg-[#FFC107]/[0.08] border border-[#FFC107]/25 rounded-[14px] px-4 py-3.5">
              <Info className="w-4 h-4 text-[#c99700] mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed">
                Dit is een <strong className="text-[#181818]">indicatie</strong> op basis van de
                basistarieven. Wij berekenen uw exacte prijs op basis van de werkelijke route en het
                tijdstip, en bevestigt die vóór de rit via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toeslagen ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight text-center mb-10">
            Toeslagen in één oogopslag
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {surchargeList.map((t, i) => {
              const Icoon = surchargeIcons[t.icon] ?? Info;
              const gratis = t.value === "Gratis";
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#f7f7f7] rounded-[18px] px-5 py-5"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icoon className="w-5 h-5 text-[#FFC107]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#181818]">{t.label}</p>
                    <p className="text-xs text-[#9b9b9b] mt-0.5">{t.desc}</p>
                  </div>
                  <span className={cn("text-sm font-bold flex-shrink-0", gratis ? "text-[#25D366]" : "text-[#181818]")}>
                    {t.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Populaire ritten ─────────────────────────────────── */}
      <section className="py-20 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight mb-2">
              Populaire ritten
            </h2>
            <p className="text-sm text-[#6b6b6b]">
              Vanafprijzen vanuit Bornem. Klik een rit aan om hem meteen aan te vragen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinations.map((d, i) => (
              <a
                key={i}
                href={`/contact?bestemming=${encodeURIComponent(d.to)}`}
                className="taxi-route-card group bg-white rounded-[18px] p-5 border border-black/5 flex items-center justify-between gap-4 transition-all hover:border-[#FFC107]/40 hover:shadow-md hover:shadow-black/5"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
                    <div className="w-px h-4 bg-black/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#181818]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#9b9b9b]">{d.from}</p>
                    <p className="text-sm font-semibold text-[#181818] truncate">{d.to}</p>
                    {i === 0 && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#FFC107] text-[#181818] text-[9px] font-bold rounded-full uppercase tracking-wider">
                        Meest geboekt
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] text-[#9b9b9b]">Vanaf</p>
                  <p className="text-xl font-bold text-[#181818]">{d.price}</p>
                  <p className="text-[11px] text-[#9b9b9b] mb-1">{d.duration}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6b6b6b] group-hover:text-[#c99700] transition-colors">
                    Aanvragen
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Betalen + FAQ ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Betaalmethoden */}
          <div>
            <h2 className="text-xl font-bold text-[#181818] tracking-tight mb-2">
              Betalen kan zoals u wil
            </h2>
            <p className="text-sm text-[#6b6b6b] mb-6">
              De betaalmethode wordt vooraf besproken bij de prijsbevestiging.
            </p>
            <div className="flex flex-col gap-2.5">
              {paymentMethods.map((m, i) => {
                const Icoon = betaalIcons[i] ?? Check;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 bg-[#f7f7f7] rounded-[14px] px-4 py-3.5"
                  >
                    <Icoon className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
                    <span className="text-sm text-[#181818]">{m}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ over de prijs */}
          <div>
            <h2 className="text-xl font-bold text-[#181818] tracking-tight mb-2">Over de prijs</h2>
            <p className="text-sm text-[#6b6b6b] mb-6">
              De vragen die klanten het vaakst stellen.
            </p>
            <div className="flex flex-col gap-2.5">
              {tariefFaqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-[14px] border transition-colors",
                      open ? "bg-white border-black/10 shadow-sm" : "bg-[#f7f7f7] border-transparent"
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-semibold text-[#181818]">{f.q}</span>
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-black/5">
                        {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </span>
                    </button>
                    {open && (
                      <p className="px-4 pb-4 text-[13px] text-[#6b6b6b] leading-[1.7]">{f.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="taxi-cta py-24 bg-[#181818]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-[#FFC107] rounded-[18px] flex items-center justify-center mx-auto mb-6">
            <Car className="w-7 h-7 text-[#181818]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Exacte prijs opvragen?
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Stuur uw rit door en wij bezorgen u snel een persoonlijk voorstel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="px-6 py-3.5 bg-[#FFC107] text-[#181818] font-bold rounded-[18px] hover:bg-[#FFD54F] transition-colors text-sm inline-flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              Boek een rit
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 text-white font-semibold rounded-[18px] hover:bg-white/20 transition-colors text-sm inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Vraag het via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
