import { useState, useEffect } from "react";
import { MessageCircle, ArrowRight, Check, Navigation2, AlertCircle } from "lucide-react";
import { WHATSAPP_URL } from "../data/site";
import { validate, type Errors } from "../lib/validation";
import { buildWeb3FormsPayload, WEB3FORMS_ENDPOINT } from "../lib/web3forms";
import AddressAutocomplete, { type GeoPoint } from "./AddressAutocomplete";

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
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Gekozen coördinaten uit de adres-suggesties (null zolang er geen exacte
  // match geselecteerd is, of zodra de tekst nadien nog wijzigt).
  const [ophalenPunt, setOphalenPunt] = useState<GeoPoint | null>(null);
  const [bestemmingPunt, setBestemmingPunt] = useState<GeoPoint | null>(null);
  const [afstand, setAfstand] = useState<{ km: number; minuten: number } | null>(null);
  const [afstandLaden, setAfstandLaden] = useState(false);

  // Tijdstip waarop het formulier verscheen — bots vullen sneller in dan mensen.

  // Zodra beide adressen gekozen zijn, rijafstand opvragen via OSRM
  // (router.project-osrm.org) — een gratis, publieke routeserver zonder
  // API-key. Draait client-side, past bij de statische site.
  useEffect(() => {
    if (!ophalenPunt || !bestemmingPunt) {
      setAfstand(null);
      return;
    }
    let geannuleerd = false;
    setAfstandLaden(true);
    const url = `https://router.project-osrm.org/route/v1/driving/${ophalenPunt.lon},${ophalenPunt.lat};${bestemmingPunt.lon},${bestemmingPunt.lat}?overview=false`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (geannuleerd) return;
        const route = data.routes?.[0];
        if (route) {
          setAfstand({
            km: Math.round(route.distance / 100) / 10,
            minuten: Math.round(route.duration / 60),
          });
        } else {
          setAfstand(null);
        }
      })
      .catch(() => {
        if (!geannuleerd) setAfstand(null);
      })
      .finally(() => {
        if (!geannuleerd) setAfstandLaden(false);
      });

    return () => {
      geannuleerd = true;
    };
  }, [ophalenPunt, bestemmingPunt]);

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    // Fout meteen weghalen zodra de bezoeker het veld corrigeert.
    setErrors((e) => (e[key as keyof Errors] ? { ...e, [key]: undefined } : e));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const found = validate(form as any);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Spring naar het eerste probleem zodat het niet buiten beeld blijft.
      document
        .querySelector<HTMLElement>(`[data-veld="${Object.keys(found)[0]}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Spamval: bots vullen dit verborgen veld in. Stil doen alsof het lukte.
    // Web3Forms controleert dit veld ook zelf, server-side (zie botcheck).
    if (honeypot !== "") {
      window.location.href = "/bedankt";
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...buildWeb3FormsPayload(
            form as any,
            afstand ? { afstandKm: afstand.km, rijtijdMin: afstand.minuten } : undefined
          ),
          botcheck: honeypot, // Web3Forms' eigen spamcontrole
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        window.location.href = "/bedankt";
        return;
      }
      setFormError(
        data.message ?? "Er ging iets mis bij het verzenden. Probeer het opnieuw of app ons rechtstreeks."
      );
    } catch {
      setFormError("Geen verbinding. Controleer uw internet, of app ons rechtstreeks.");
    }
    setSubmitting(false);
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
      <form
        onSubmit={handleSubmit}
        aria-label="Rit aanvragen"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
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
        <label htmlFor="naam" className={labelClass}>Naam</label>
        <input
          id="naam"
          data-veld="naam"
          className={fieldClass("naam")}
          placeholder="Uw volledige naam"
          value={form.naam}
          onChange={(e) => set("naam", e.target.value)}
        />
        <Fout veld="naam" />
      </div>
      <div>
        <label htmlFor="telefoon" className={labelClass}>Telefoon</label>
        <input
          id="telefoon"
          type="tel"
          data-veld="telefoon"
          className={fieldClass("telefoon")}
          placeholder="+32 4XX XX XX XX"
          value={form.telefoon}
          onChange={(e) => set("telefoon", e.target.value)}
        />
        <Fout veld="telefoon" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className={labelClass}>E-mail</label>
        <input
          id="email"
          type="email"
          data-veld="email"
          className={fieldClass("email")}
          placeholder="uw@email.be"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
        <Fout veld="email" />
      </div>
      <div>
        <label htmlFor="ophalen" className={labelClass}>Ophalen (adres)</label>
        <AddressAutocomplete
          id="ophalen"
          dataVeld="ophalen"
          className={fieldClass("ophalen")}
          placeholder="Vertrekadres"
          value={form.ophalen}
          onChange={(v) => set("ophalen", v)}
          onSelect={setOphalenPunt}
        />
        <Fout veld="ophalen" />
      </div>
      <div>
        <label htmlFor="bestemming" className={labelClass}>Bestemming</label>
        <AddressAutocomplete
          id="bestemming"
          dataVeld="bestemming"
          className={fieldClass("bestemming")}
          placeholder="Aankomstadres"
          value={form.bestemming}
          onChange={(v) => set("bestemming", v)}
          onSelect={setBestemmingPunt}
        />
        <Fout veld="bestemming" />
      </div>
      {(afstand || afstandLaden) && (
        <div className="sm:col-span-2 flex items-center gap-2.5 rounded-[14px] bg-[#FFC107]/10 px-4 py-2.5">
          <Navigation2 className="w-4 h-4 flex-shrink-0 text-[#B7791F]" />
          {afstandLaden ? (
            <p className="text-xs text-[#6b6b6b]">Afstand berekenen…</p>
          ) : (
            <p className="text-xs text-[#181818]">
              Geschatte afstand: <strong>{afstand!.km} km</strong> · ±{afstand!.minuten} min rijden
              <span className="text-[#6b6b6b]"></span>
            </p>
          )}
        </div>
      )}
      <div>
        <label htmlFor="datum" className={labelClass}>Datum</label>
        <input
          id="datum"
          type="date"
          data-veld="datum"
          className={fieldClass("datum")}
          value={form.datum}
          onChange={(e) => set("datum", e.target.value)}
        />
        <Fout veld="datum" />
      </div>
      <div>
        <label htmlFor="tijd" className={labelClass}>Tijd</label>
        <input
          id="tijd"
          type="time"
          data-veld="tijd"
          className={fieldClass("tijd")}
          value={form.tijd}
          onChange={(e) => set("tijd", e.target.value)}
        />
        <Fout veld="tijd" />
      </div>
      {form.ritType === "heen-terug" && (
        <>
          <div>
            <label htmlFor="terugDatum" className={labelClass}>Terugrit datum</label>
            <input
              id="terugDatum"
              type="date"
              data-veld="terugDatum"
              className={fieldClass("terugDatum")}
              value={form.terugDatum}
              onChange={(e) => set("terugDatum", e.target.value)}
            />
            <Fout veld="terugDatum" />
          </div>

          <div>
            <label htmlFor="terugTijd" className={labelClass}>Terugrit tijd</label>
            <input
              id="terugTijd"
              type="time"
              data-veld="terugTijd"
              className={fieldClass("terugTijd")}
              value={form.terugTijd}
              onChange={(e) => set("terugTijd", e.target.value)}
            />
            <Fout veld="terugTijd" />
          </div>
        </>
      )}
      <div>
          <label htmlFor="personen" className={labelClass}>
            Aantal personen
          </label>

          {/* De native pijl van een <select> negeert padding-right, dus die
              zetten we uit en tekenen we er zelf een. background-position
              bepaalt nu exact hoe ver hij van de rand staat. */}
          <select
            id="personen"
            className={`${inputClass} appearance-none pr-11 bg-no-repeat`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundPosition: "right 1rem center",
              backgroundSize: "16px 16px",
            }}
            value={form.personen}
            onChange={(e) => set("personen", e.target.value)}
          >
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "persoon" : "personen"}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="opmerkingen" className={labelClass}>
          Opmerkingen
        </label>

        <input
          id="opmerkingen"
          className={inputClass}
          placeholder="Kinderzitje, extra bagage, …"
          value={form.opmerkingen}
          onChange={(e) => set("opmerkingen", e.target.value)}
        />
      </div>

      <div className="sm:col-span-2 bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-[14px] px-4 py-3 flex items-start gap-2.5">
        <MessageCircle className="w-4 h-4 text-[#FFC107] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#6b6b6b] leading-relaxed">
          <strong className="text-[#181818]">We bekijken elke aanvraag persoonlijk</strong> en sturen u een prijsvoorstel via WhatsApp. Pas na uw akkoord is de rit bevestigd.
        </p>
      </div>

      {/* Spamval: onzichtbaar voor bezoekers, onweerstaanbaar voor bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      {formError && (
        <div
          role="alert"
          className="sm:col-span-2 flex items-start gap-2.5 rounded-[14px] border border-[#d4183d]/25 bg-[#d4183d]/8 px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4183d]" />
          <p className="text-xs leading-relaxed text-[#d4183d]">{formError}</p>
        </div>
      )}

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
