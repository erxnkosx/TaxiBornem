import { useState } from "react";
import { MessageCircle, ArrowRight, Check, Navigation2, AlertCircle } from "lucide-react";
import { WHATSAPP_URL } from "../data/site";
import { validate, type Errors } from "../lib/validation";

export default function BookingForm() {
  const [form, setForm] = useState({
    naam: "",
    telefoon: "",
    email: "",
    ophalen: "",
    bestemming: "",
    ritType: "enkel",
    datum: "",
    tijd: "",
    terugDatum: "",
    terugTijd: "",
    personen: "1",
    opmerkingen: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    // Fout meteen weghalen zodra de bezoeker het veld corrigeert.
    setErrors((e) => (e[key as keyof Errors] ? { ...e, [key]: undefined } : e));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate(form as any);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Spring naar het eerste probleem zodat het niet buiten beeld blijft.
      document
        .querySelector<HTMLElement>(`[data-veld="${Object.keys(found)[0]}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // TODO: echte verzending volgt. Voorlopig door naar de bedankpagina.
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      window.location.href = "/bedankt";
    }, 600);
  };

  /** Rode rand zodra een veld een fout heeft. */
  const fieldClass = (veld: keyof Errors) =>
    errors[veld]
      ? inputClass.replace("border-transparent", "border-[#d4183d]") + " bg-[#d4183d]/5"
      : inputClass;

  /** Foutmelding onder een veld. */
  const Fout = ({ veld }: { veld: keyof Errors }) =>
    errors[veld] ? (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-[#d4183d]">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {errors[veld]}
      </p>
    ) : null;

  const inputClass =
    "w-full px-4 py-3 bg-[#f4f4f4] border border-transparent rounded-[14px] text-sm text-[#181818] placeholder:text-[#9b9b9b] focus:outline-none focus:border-[#FFC107] focus:bg-white transition-all duration-150";
  const labelClass = "block text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="sm:col-span-2">
      <label className={labelClass}>Rittype</label>

      <div className="mt-2 grid grid-cols-2 gap-1 rounded-[18px] bg-[#f4f4f4] p-1">
        <button
          type="button"
          onClick={() => set("ritType", "enkel")}
          className={`flex items-center justify-center gap-2 py-3 rounded-[14px] text-sm font-semibold transition-all ${
            form.ritType === "enkel"
              ? "taxi-segment-active bg-white text-[#181818] shadow-sm"
              : "text-[#6b6b6b] hover:text-[#181818]"
          }`}
        >
          <ArrowRight className="w-4 h-4" />
          Enkele rit
        </button>

        <button
          type="button"
          onClick={() => set("ritType", "heen-terug")}
          className={`flex items-center justify-center gap-2 py-3 rounded-[14px] text-sm font-semibold transition-all ${
            form.ritType === "heen-terug"
              ? "taxi-segment-active bg-white text-[#181818] shadow-sm"
              : "text-[#6b6b6b] hover:text-[#181818]"
          }`}
        >
          <Navigation2 className="w-4 h-4" />
          Heen & terug
        </button>
      </div>
    </div>
      <div>
        <label className={labelClass}>Naam</label>
        <input data-veld="naam" className={fieldClass("naam")} placeholder="Uw volledige naam" value={form.naam} onChange={(e) => set("naam", e.target.value)} />
        <Fout veld="naam" />
      </div>
      <div>
        <label className={labelClass}>Telefoon</label>
        <input type="tel" data-veld="telefoon" className={fieldClass("telefoon")} placeholder="+32 4XX XX XX XX" value={form.telefoon} onChange={(e) => set("telefoon", e.target.value)} />
        <Fout veld="telefoon" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>
          E-mail <span className="normal-case font-normal text-[#9b9b9b]">— optioneel, voor een bevestiging</span>
        </label>
        <input
          type="email"
          data-veld="email" className={fieldClass("email")}
          placeholder="uw@email.be"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <Fout veld="email" />
      </div>
      <div>
        <label className={labelClass}>Ophalen (adres)</label>
        <input data-veld="ophalen" className={fieldClass("ophalen")} placeholder="Vertrekadres" value={form.ophalen} onChange={(e) => set("ophalen", e.target.value)} />
        <Fout veld="ophalen" />
      </div>
      <div>
        <label className={labelClass}>Bestemming</label>
        <input data-veld="bestemming" className={fieldClass("bestemming")} placeholder="Aankomstadres" value={form.bestemming} onChange={(e) => set("bestemming", e.target.value)} />
        <Fout veld="bestemming" />
      </div>
      <div>
        <label className={labelClass}>Datum</label>
        <input type="date" data-veld="datum" className={fieldClass("datum")} value={form.datum} onChange={(e) => set("datum", e.target.value)} />
        <Fout veld="datum" />
      </div>
      <div>
        <label className={labelClass}>Tijd</label>
        <input type="time" data-veld="tijd" className={fieldClass("tijd")} value={form.tijd} onChange={(e) => set("tijd", e.target.value)} />
        <Fout veld="tijd" />
      </div>
      {form.ritType === "heen-terug" && (
        <>
          <div>
            <label className={labelClass}>Terugrit datum</label>

            <input
              type="date"
              data-veld="terugDatum" className={fieldClass("terugDatum")}
              value={form.terugDatum}
              onChange={(e) => set("terugDatum", e.target.value)}
            />
            <Fout veld="terugDatum" />
          </div>

          <div>
            <label className={labelClass}>Terugrit tijd</label>

            <input
              type="time"
              data-veld="terugTijd" className={fieldClass("terugTijd")}
              value={form.terugTijd}
              onChange={(e) => set("terugTijd", e.target.value)}
            />
            <Fout veld="terugTijd" />
          </div>
        </>
      )}
      <div>
        <label className={labelClass}>Aantal personen</label>
        <select className={inputClass} value={form.personen} onChange={(e) => set("personen", e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "persoon" : "personen"}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Opmerkingen</label>
        <input className={inputClass} placeholder="Kinderzitje, extra bagage, …" value={form.opmerkingen} onChange={(e) => set("opmerkingen", e.target.value)} />
      </div>

      <div className="sm:col-span-2 bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-[14px] px-4 py-3 flex items-start gap-2.5">
        <MessageCircle className="w-4 h-4 text-[#FFC107] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#6b6b6b] leading-relaxed">
          <strong className="text-[#181818]">Hamid bekijkt elke aanvraag persoonlijk</strong> en stuurt u een prijsvoorstel via WhatsApp. Pas na uw akkoord is de rit bevestigd.
        </p>
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3.5 bg-[#181818] text-white text-sm font-semibold rounded-[18px] hover:bg-[#2a2a2a] disabled:opacity-60 transition-all duration-150 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Aanvraag verzenden…
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Aanvraag verzenden
            </>
          )}
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 bg-[#25D366] text-white text-sm font-semibold rounded-[18px] hover:bg-[#1db954] transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Direct via WhatsApp
        </a>
      </div>
    </form>
  );
}
