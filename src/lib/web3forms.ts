/**
 * Zet een boekingsaanvraag om naar de payload voor Web3Forms.
 *
 * Web3Forms (https://web3forms.com) verstuurt de aanvraag per e-mail naar Hamid,
 * zonder dat we daarvoor eigen servercode nodig hebben. Ideaal voor een statische
 * site op een Hostinger Premium-plan.
 *
 * De access key is bewust publiek — dat mag bij Web3Forms. Ze bepaalt enkel naar
 * welke mailbox de aanvraag gaat, niet wie ze mag versturen.
 */
import type { Booking } from "./validation";
import { WEB3FORMS_ACCESS_KEY, EMAIL } from "../data/site";

function nlDatum(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Bouwt het object dat naar Web3Forms gaat. Naast de access key sturen we een
 * nette, leesbare samenvatting mee (`message`) plus alle losse velden, zodat de
 * mail aan Hamid meteen bruikbaar is.
 */
export function buildWeb3FormsPayload(b: Booking): Record<string, string> {
  const retour =
    b.ritType === "heen-terug"
      ? `\nTerugrit: ${nlDatum(b.terugDatum)} om ${b.terugTijd}`
      : "";
const whatsappNumber = b.telefoon.replace(/\D/g, "");

const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const message =
    `Nieuwe ritaanvraag via de website\n\n` +
    `Naam: ${b.naam}\n` +
    `Telefoon: ${b.telefoon}\n` +
    (b.email ? `E-mail: ${b.email}\n` : "") +
    `\nOphalen: ${b.ophalen}\n` +
    `Bestemming: ${b.bestemming}\n` +
    `Wanneer: ${nlDatum(b.datum)} om ${b.tijd}${retour}\n` +
    `Type rit: ${b.ritType === "heen-terug" ? "Heen & terug" : "Enkele rit"}\n` +
    `Personen: ${b.personen}\n` +
    `WhatsApp klant:\n${whatsappLink}\n\n` +
    (b.opmerkingen ? `Opmerkingen: ${b.opmerkingen}\n` : "");

  return {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Rit ${nlDatum(b.datum)} ${b.tijd} — ${b.naam} (${b.ophalen} → ${b.bestemming})`,
    from_name: "Taxi Bornem — website",
    // Antwoorden op de mail gaat naar de klant (als die een e-mail opgaf),
    // anders naar Hamids eigen mailbox.
    replyto: b.email?.trim() || EMAIL,
    message,

    // Losse velden, handig als Hamid later wil filteren of doorzoeken.
    naam: b.naam,
    telefoon: b.telefoon,
    email: b.email || "—",
    ophalen: b.ophalen,
    bestemming: b.bestemming,
    ritType: b.ritType === "heen-terug" ? "Heen & terug" : "Enkele rit",
    datum: nlDatum(b.datum),
    tijd: b.tijd,
    terugrit: b.ritType === "heen-terug" ? `${nlDatum(b.terugDatum)} ${b.terugTijd}` : "—",
    personen: b.personen,
    opmerkingen: b.opmerkingen || "—",
  };
}

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
