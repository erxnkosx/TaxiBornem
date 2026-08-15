import { Phone, MessageCircle, Mail, MapPin, Star, Car } from "lucide-react";
import { PHONE, PHONE_RAW, WHATSAPP_URL, EMAIL } from "../data/site";

export default function Footer() {
  return (
    <footer className="taxi-footer bg-[#181818] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group" aria-label="Taxi Bornem Hamid — startpagina">
              <img
                src="/logo.webp"
                alt="Taxi Bornem Hamid"
                className="h-16 w-auto"
                width={320}
                height={160}
              />

            </a>
              <span className="font-bold text-white text-base">Taxi Bornem Hamid</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Uw betrouwbare en luxueuze taxiservice in Bornem en omgeving. Persoonlijk, stipt en professioneel — elke rit.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              <a href={`tel:${PHONE_RAW}`} className="flex items-center gap-2 hover:text-[#FFC107] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                {PHONE}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFC107] transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#FFC107] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                {EMAIL}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                2880 Bornem, Antwerpen
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Navigatie</p>
            <div className="flex flex-col gap-2.5">
              {[
                ["Home", "/"],
                ["Diensten", "/diensten"],
                ["Tarieven", "/tarieven"],
                ["Over ons", "/over-ons"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="text-sm text-white/50 hover:text-white text-left transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Openingsuren</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="text-sm text-white/70 font-medium">24u/24u — 7d/7</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mt-1">
                Elke dag van de week, ook op feestdagen. Hamid staat voor u klaar.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#FFC107] text-[#181818] text-sm font-semibold rounded-[14px] hover:bg-[#FFD54F] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Stuur een bericht
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Taxi Bornem Hamid. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/20">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
              ))}
            </div>
            <span className="ml-1">4,9/5 op Google Reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
