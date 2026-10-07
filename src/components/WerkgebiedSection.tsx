import { ArrowRight, MapPin } from "lucide-react";
import { gemeentePages } from "../data/landing";

// Eén werkgebied-sectie voor de hele site: homepage, dienst- en
// gemeentepagina's tonen exact hetzelfde blok. Op een gemeentepagina valt
// die gemeente weg en komt Bornem (de homepage) in de plaats.

const bornem = {
  slug: "",
  label: "Taxi Bornem",
  teaser: "Onze standplaats, met het centrum en de deelgemeenten Hingene, Mariekerke en Weert.",
};

interface Props {
  /** Slug van de huidige gemeentepagina, die dan niet als kaart verschijnt. */
  current?: string;
  className?: string;
}

export default function WerkgebiedSection({ current, className = "" }: Props) {
  const others = gemeentePages
    .filter((g) => g.slug !== current)
    .map((g) => ({ slug: g.slug, label: g.label, teaser: g.teaser ?? "" }));
  const cards = current ? [bornem, ...others] : others;

  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">Werkgebied</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight mb-5">
              Taxi in Bornem en de buurgemeenten
            </h2>
            <p className="text-[15px] text-[#6b6b6b] leading-[1.7] mb-4">
              De standplaats is Bornem. Wij rijden in het centrum en in de deelgemeenten Hingene,
              Mariekerke en Weert, en net zo goed in de gemeenten errond.
            </p>
            <p className="text-[15px] text-[#6b6b6b] leading-[1.7]">
              Vanuit de regio rijden we naar Antwerpen, Mechelen, Brussel en alle grote luchthavens
              in België, Nederland en Duitsland.
            </p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((g) => (
              <a
                key={g.slug || "bornem"}
                href={`/${g.slug}`}
                className="taxi-route-card bg-[#f7f7f7] rounded-[18px] p-6 border border-black/5 flex flex-col gap-3 transition-all duration-200"
              >
                <MapPin className="w-5 h-5 text-[#FFC107]" />
                <span className="font-bold text-[#181818]">{g.label}</span>
                <span className="text-sm text-[#6b6b6b] leading-relaxed">{g.teaser}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#181818]">
                  Bekijk
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
