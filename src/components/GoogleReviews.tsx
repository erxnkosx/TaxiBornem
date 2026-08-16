import { Star, ArrowRight } from "lucide-react";
import { GOOGLE_REVIEWS_URL, reviews } from "../data/site";

export default function GoogleReviews() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/google-logo.webp" alt="Google" className="h-5 w-auto" width={74} height={24} />
              <span className="text-sm font-medium text-[#6b6b6b]">Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
              Wat klanten zeggen
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                ))}
              </div>
              <span className="text-2xl font-bold text-[#181818]">4,9</span>
              <span className="text-sm text-[#6b6b6b]">op basis van 46 Google Reviews</span>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-[14px] text-sm font-medium text-[#181818] hover:bg-[#f7f7f7] transition-colors self-start md:self-auto"
          >
            Bekijk alle Google Reviews
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="taxi-card bg-[#f7f7f7] rounded-[18px] p-5 flex flex-col gap-3 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#181818] text-sm">{r.name}</p>
                    <p className="text-xs text-[#6b6b6b]">{r.date}</p>
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 opacity-60" aria-label="Google">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
                </svg>
              </div>
              <div className="flex">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                ))}
              </div>
              <p className="text-sm text-[#444] leading-relaxed whitespace-pre-line">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
