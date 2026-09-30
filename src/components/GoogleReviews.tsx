import { Star, ArrowRight } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "../data/site";

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
              <span className="text-sm text-[#6b6b6b]">op basis van 50+ Google Reviews</span>
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

        <div className="rounded-[18px] bg-[#f7f7f7] p-6">
          <p className="text-sm leading-relaxed text-[#6b6b6b]">
            We tonen hier alleen het geaggregeerde cijfer. Namen en persoonlijke reviewteksten
            blijven op Google; die externe pagina opent pas wanneer u zelf op de link hierboven klikt.
          </p>
        </div>
      </div>
    </section>
  );
}
