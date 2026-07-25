import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "../data/site";
import { cn } from "../lib/cn";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="taxi-grid-bg py-24 bg-[#f7f7f7]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">Veelgestelde vragen</h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqItems.map((item, i) => (
            <div key={i} className="taxi-card bg-white rounded-[18px] overflow-hidden border border-black/5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f7f7f7] transition-colors"
              >
                <span className="font-semibold text-[#181818] text-sm pr-4">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[#6b6b6b] flex-shrink-0 transition-transform duration-200",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
