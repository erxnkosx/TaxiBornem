import { Shield, Lock, Eye, FileText, Phone, MessageCircle } from "lucide-react";
import { PHONE_RAW, WHATSAPP_URL } from "../../data/site";

export default function PrivacybeleidPage() {
  const sections = [
    {
      icon: Shield,
      title: "Wie zijn wij?",
      content:
        "Taxi Bornem respecteert uw privacy en verwerkt persoonsgegevens overeenkomstig de Algemene Verordening Gegevensbescherming (AVG/GDPR).",
    },
    {
      icon: FileText,
      title: "Welke gegevens verwerken wij?",
      content:
        "Wanneer u contact opneemt of een rit reserveert, kunnen wij uw naam, telefoonnummer, e-mailadres, ophaaladres, bestemmingsadres en ritinformatie verwerken.",
    },
    {
      icon: FileText,
      title: "Waarom verwerken wij deze gegevens?",
      content:
        "Wij gebruiken deze gegevens uitsluitend voor het uitvoeren van taxiritten, het verwerken van reservaties, communicatie, facturatie en wettelijke verplichtingen.",
    },
    {
      icon: Shield,
      title: "Delen met derden",
      content:
        "Wij verkopen of verhuren uw persoonsgegevens nooit. Enkel wanneer noodzakelijk kunnen gegevens gedeeld worden met boekhoudkundige of technische dienstverleners.",
    },
    {
      icon: Lock,
      title: "Bewaartermijn & beveiliging",
      content:
        "Wij bewaren persoonsgegevens niet langer dan noodzakelijk en nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen.",
    },
    {
      icon: Eye,
      title: "Uw rechten",
      content:
        "U heeft recht op inzage, correctie, verwijdering, beperking van verwerking, bezwaar en overdraagbaarheid van uw persoonsgegevens.",
    },
  ];

  return (
    <div className="pt-16">
      <section className="taxi-page-hero py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <p className="taxi-kicker text-xs font-semibold uppercase tracking-widest mb-4">
              Juridische informatie
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#181818] tracking-tight mb-6">
              Privacybeleid
            </h1>

            <p className="text-lg text-[#6b6b6b] leading-relaxed">
              Transparantie staat centraal. Hier leest u hoe Taxi Bornem
              persoonsgegevens verwerkt, beschermt en gebruikt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold mb-2">AVG/GDPR</p>
              <p className="font-medium text-[#181818]">
                Conform Europese privacywetgeving.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold mb-2">Veilig</p>
              <p className="font-medium text-[#181818]">
                Uw gegevens worden vertrouwelijk behandeld.
              </p>
            </div>

            <div className="taxi-card bg-[#f7f7f7] rounded-[24px] p-6">
              <p className="text-[#FFC107] font-bold mb-2">Transparant</p>
              <p className="font-medium text-[#181818]">
                Duidelijke uitleg zonder kleine lettertjes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="taxi-card bg-[#f7f7f7] rounded-[24px] p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#FFC107]/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#FFC107]" />
                  </div>

                  <h2 className="text-2xl font-bold text-[#181818]">
                    {index + 1}. {section.title}
                  </h2>
                </div>

                <p className="text-[#6b6b6b] leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#181818] mb-4">
            Vragen over uw privacy?
          </h2>

          <p className="text-[#6b6b6b] mb-6">
            Neem gerust contact op. Wij beantwoorden elke vraag persoonlijk.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${PHONE_RAW}`}
              className="px-6 py-3.5 bg-[#181818] text-white font-semibold rounded-[18px] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Bel ons
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-[18px] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}