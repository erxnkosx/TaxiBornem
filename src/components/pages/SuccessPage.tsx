import { MessageCircle, CheckCircle2, Mail } from "lucide-react";
import { WHATSAPP_URL } from "../../data/site";
import { cn } from "../../lib/cn";

export default function SuccessPage() {
  return (
    <div className="pt-16 min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[24px] p-10 border border-black/5 shadow-sm text-center">
        <div className="w-16 h-16 bg-[#25D366]/10 rounded-[20px] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
        </div>
        <h1 className="text-2xl font-bold text-[#181818] mb-3">Aanvraag ontvangen!</h1>
        <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
          We hebben uw ritaanvraag ontvangen en sturen u zo snel mogelijk een{" "}
          <strong className="text-[#181818]">persoonlijk prijsvoorstel via WhatsApp</strong>.
        </p>

        <div className="flex items-start gap-2.5 bg-[#25D366]/8 border border-[#25D366]/20 rounded-[14px] px-4 py-3 text-left mb-6">
          <Mail className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#6b6b6b] leading-relaxed">
            Er is een <strong className="text-[#181818]">bevestiging naar uw e-mailadres</strong> gestuurd.
            Geen mail ontvangen? Kijk even in uw spam-map.
          </p>
        </div>

        <div className="bg-[#f7f7f7] rounded-[18px] p-5 text-left mb-6">
          <div className="flex flex-col gap-3 text-sm">
            {[
              ["Aanvraag verzonden", "✓"],
              ["We bekijken uw aanvraag", "Binnenkort"],
              ["Prijsvoorstel via WhatsApp", "Binnenkort"],
            ].map(([step, status], i) => (
              <div key={i} className="flex items-center justify-between">
                <span className={i === 0 ? "text-[#181818] font-medium" : "text-[#9b9b9b]"}>{step}</span>
                <span className={cn("text-xs font-semibold", i === 0 ? "text-[#25D366]" : "text-[#9b9b9b]")}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#9b9b9b] mb-6">
          Heeft u een dringende rit? Contacteer ons direct via WhatsApp of telefoon.
        </p>

        <div className="flex flex-col gap-2.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] text-white text-sm font-semibold rounded-[14px] hover:bg-[#1db954] transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Open WhatsApp
          </a>
          <a
            href="/"
            className="block text-center w-full py-3 bg-[#f4f4f4] text-[#181818] text-sm font-semibold rounded-[14px] hover:bg-[#eee] transition-colors"
          >
            Terug naar de startpagina
          </a>
        </div>
      </div>
    </div>
  );
}
