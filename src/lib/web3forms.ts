import type { Booking } from "./validation";
import { WEB3FORMS_ACCESS_KEY, EMAIL } from "../data/site";

function nlDatum(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export interface AfstandInfo {
  afstandKm: number;
  rijtijdMin: number;
}

export function buildWeb3FormsPayload(b: Booking, afstand?: AfstandInfo): Record<string, string> {
  const retour =
    b.ritType === "heen-terug"
      ? `\nTerugrit: ${nlDatum(b.terugDatum)} om ${b.terugTijd}`
      : "";
const whatsappNumber = b.telefoon.replace(/\D/g, "");

const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const afstandRegel = afstand
    ? `Afstand: ± ${afstand.afstandKm} km (± ${afstand.rijtijdMin} min rijden)\n`
    : "";

  const message =
    `Nieuwe ritaanvraag via de website\n\n` +
    `Naam: ${b.naam}\n` +
    `Telefoon: ${b.telefoon}\n` +
    (b.email ? `E-mail: ${b.email}\n` : "") +
    `\nOphalen: ${b.ophalen}\n` +
    `Bestemming: ${b.bestemming}\n` +
    afstandRegel +
    `Wanneer: ${nlDatum(b.datum)} om ${b.tijd}${retour}\n` +
    `Type rit: ${b.ritType === "heen-terug" ? "Heen & terug" : "Enkele rit"}\n` +
    `Personen: ${b.personen}\n` +
    `WhatsApp klant:\n${whatsappLink}\n\n` +
    (b.opmerkingen ? `Opmerkingen: ${b.opmerkingen}\n` : "");

  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Rit ${nlDatum(b.datum)} ${b.tijd} — ${b.naam} (${b.ophalen} → ${b.bestemming})`,
    from_name: "Taxi Bornem — website",

    replyto: b.email?.trim() || EMAIL,
    message,

    naam: b.naam,
    telefoon: b.telefoon,
    email: b.email || "—",
    ophalen: b.ophalen,
    bestemming: b.bestemming,
    afstand: afstand ? `${afstand.afstandKm} km` : "—",
    rijtijd: afstand ? `${afstand.rijtijdMin} min` : "—",
    ritType: b.ritType === "heen-terug" ? "Heen & terug" : "Enkele rit",
    datum: nlDatum(b.datum),
    tijd: b.tijd,
    terugrit: b.ritType === "heen-terug" ? `${nlDatum(b.terugDatum)} ${b.terugTijd}` : "—",
    personen: b.personen,
    opmerkingen: b.opmerkingen || "—",
  };
}

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";