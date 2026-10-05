import { ChevronDown } from "lucide-react";
import { faqItems } from "../data/site";

interface FAQProps {
  items?: { q: string; a: string }[];
  title?: string;
  /** Achtergrond van de sectie; standaard grijs. */
  tone?: "grey" | "white";
}

// Statisch: elke vraag is een native <details>-element. De antwoorden staan
// dus altijd in de HTML (goed voor Google) en openen zonder JavaScript.
export default function FAQ({ items = faqItems, title = "Veelgestelde vragen", tone = "grey" }: FAQProps) {
  return (
    <section className={tone === "grey" ? "taxi-grid-bg py-24 bg-[#f7f7f7]" : "py-24 bg-white"}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">{title}</h2>
        </div>

        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <details
              key={i}
              className="taxi-faq group bg-white rounded-[18px] overflow-hidden border border-black/5"
            >
              <summary className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer list-none hover:bg-[#f7f7f7] transition-colors">
                <h3 className="font-semibold text-[#181818] text-sm pr-4">{item.q}</h3>
                <ChevronDown
                  aria-hidden="true"
                  className="w-4 h-4 text-[#6b6b6b] flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
