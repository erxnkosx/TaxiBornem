/// <reference types="@cloudflare/workers-types" />
/**
 * Cloudflare Pages Function — verwerkt een boekingsaanvraag.
 *
 * Draait op de rand van Cloudflare, niet in de browser. Ontvangt de POST van
 * het formulier, controleert de gegevens nog eens server-side (nooit op de
 * browser vertrouwen), en verstuurt twee mails via Resend:
 *   1. naar Hamid, met de volledige aanvraag
 *   2. naar de klant, als bevestiging
 *
 * De Resend API-key staat NIET in de code, maar als environment-variabele in
 * Cloudflare (Settings → Variables and secrets → RESEND_API_KEY). Zo staat hij
 * niet in de publieke repo.
 *
 * Bereikbaar op /api/booking omdat het bestand functions/api/booking.ts heet.
 */

import { validate, type Booking } from "../../src/lib/validation";
import { hamidMail, klantMail, type RitGegevens } from "../_lib/email";

interface Env {
  RESEND_API_KEY: string;
}

// Waar de mails vandaan en naartoe gaan.
const AFZENDER = "Taxi Bornem <info@taxibornem.be>";
const HAMID_MAILBOX = "info@taxibornem.be";

function nlDatum(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Eén mail versturen via de Resend API. Geeft true bij succes. */
async function verstuur(
  apiKey: string,
  opts: { from: string; to: string; subject: string; html: string; text: string; replyTo?: string },
): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  return res.ok;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // 1. Body inlezen
  let body: Partial<Booking> & { botcheck?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Ongeldige aanvraag." }, 400);
  }

  // 2. Spamval: het verborgen honeypot-veld hoort leeg te zijn.
  //    Bots vullen het in. Stil doen alsof het lukte, niets versturen.
  if (body.botcheck) {
    return json({ success: true });
  }

  // 3. Server-side valideren — exact dezelfde regels als in de browser.
  const fouten = validate(body);
  if (Object.keys(fouten).length > 0) {
    return json({ success: false, message: "Controleer de ingevulde gegevens.", fouten }, 422);
  }

  // 4. Sleutel aanwezig?
  if (!env.RESEND_API_KEY) {
    return json({ success: false, message: "Verzenden is tijdelijk niet mogelijk. Bel of app ons gerust." }, 500);
  }

  // 5. Gegevens klaarmaken voor de mailtemplates.
  const b = body as Booking & { afstandKm?: number; rijtijdMin?: number };
  const r: RitGegevens = {
    naam: b.naam.trim(),
    telefoon: b.telefoon.trim(),
    email: (b.email || "").trim(),
    ophalen: b.ophalen.trim(),
    bestemming: b.bestemming.trim(),
    ritType: b.ritType,
    datum: nlDatum(b.datum),
    tijd: b.tijd,
    terugDatum: nlDatum(b.terugDatum || ""),
    terugTijd: b.terugTijd || "",
    personen: b.personen,
    opmerkingen: (b.opmerkingen || "").trim(),
    afstandKm: typeof b.afstandKm === "number" ? b.afstandKm : undefined,
    rijtijdMin: typeof b.rijtijdMin === "number" ? b.rijtijdMin : undefined,
  };

  // 6. Mail naar Hamid — dit is de belangrijkste. Antwoorden gaat naar de klant.
  const hamid = hamidMail(r);
  const naarHamid = await verstuur(env.RESEND_API_KEY, {
    from: AFZENDER,
    to: HAMID_MAILBOX,
    subject: hamid.subject,
    html: hamid.html,
    text: hamid.text,
    replyTo: r.email || undefined,
  });

  // Als de mail naar Hamid faalt, is de boeking effectief mislukt: hij weet
  // van niets. Dan een eerlijke fout tonen zodat de klant kan bellen/appen.
  if (!naarHamid) {
    return json({ success: false, message: "Verzenden lukte niet. Bel of app ons gerust rechtstreeks." }, 502);
  }

  // 7. Bevestiging naar de klant — alleen als die een e-mailadres gaf.
  //    Faalt deze, dan is dat niet fataal: Hamid heeft de aanvraag al.
  if (r.email) {
    const klant = klantMail(r);
    await verstuur(env.RESEND_API_KEY, {
      from: AFZENDER,
      to: r.email,
      subject: klant.subject,
      html: klant.html,
      text: klant.text,
    });
  }

  return json({ success: true });
};