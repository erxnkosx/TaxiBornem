import { MessageCircle, Car } from "lucide-react";
import { WHATSAPP_URL } from "../../data/site";

export default function NotFoundPage() {
  return (
    <div className="pt-16 min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#FFC107]/10 rounded-[24px] flex items-center justify-center mx-auto mb-8">
          <Car className="w-10 h-10 text-[#FFC107]" />
        </div>
        <p className="text-[#FFC107] font-bold text-6xl mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#181818] mb-3">Pagina niet gevonden</h1>
        <p className="text-[#6b6b6b] text-sm mb-8 leading-relaxed">
          Deze pagina lijkt nergens naartoe te rijden. Geen zorgen — We brengen u terug op de juiste weg.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-block text-center px-6 py-3 bg-[#181818] text-white text-sm font-semibold rounded-[18px] hover:bg-[#2a2a2a] transition-colors"
          >
            Terug naar home
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-[18px] hover:bg-[#1db954] transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Taxi Bornem
          </a>
        </div>
      </div>
    </div>
  );
}
