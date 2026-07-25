import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-[18px] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
      aria-label="Chat op WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="text-sm font-semibold hidden sm:block">WhatsApp Hamid</span>
    </a>
  );
}
