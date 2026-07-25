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
              {/* Google logo SVG */}
              <svg viewBox="0 0 74 24" className="h-5 w-auto" aria-label="Google">
                <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
                <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81C30.83 8.63 28.21 6.19 25 6.19zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52s1.52-3.52 3.28-3.52 3.28 1.43 3.28 3.52-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
                <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 7.03c-1.76 0-3.1-1.5-3.1-3.52s1.34-3.52 3.1-3.52c1.74 0 3.1 1.52 3.1 3.54-.01 2.01-1.36 3.5-3.1 3.5z" fill="#4285F4"/>
                <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81C43.83 8.63 41.21 6.19 38 6.19zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52S36.24 8.48 38 8.48s3.28 1.43 3.28 3.52-1.52 3.52-3.28 3.52z" fill="#FBBC05"/>
                <path d="M58 .24h2.51v17.57H58z" fill="#34A853"/>
                <path d="M63.93 13.45c-.65-1.51-1.03-2.15-1.82-2.15-1.06 0-2.47 1.14-2.47 3.47 0 2.3 1.38 3.47 2.47 3.47.8 0 1.17-.65 1.82-2.15l2.05 1.24c-.98 1.7-2.14 2.5-3.87 2.5-2.4 0-4.64-1.95-4.64-5.06s2.24-5.06 4.64-5.06c1.73 0 2.89.8 3.87 2.5l-2.05 1.24z" fill="#EA4335"/>
              </svg>
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
              <span className="text-sm text-[#6b6b6b]">op basis van 80+ Google Reviews</span>
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
              <p className="text-sm text-[#444] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
