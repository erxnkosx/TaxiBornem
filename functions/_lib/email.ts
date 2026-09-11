/**
 * Bouwt de twee bevestigingsmails op als HTML.
 *
 * Bewust in platte, oude HTML met inline styles: mailclients (Gmail, Outlook,
 * Apple Mail) ondersteunen geen moderne CSS, geen flexbox, geen <style> in de
 * head die betrouwbaar werkt. Tabellen met inline styles is de enige manier
 * die overal hetzelfde oogt. Niet mooi om te lezen, wel betrouwbaar.
 *
 * Draait server-side in de Cloudflare Pages Function — nooit in de browser.
 */

export interface RitGegevens {
  naam: string;
  telefoon: string;
  email: string;
  ophalen: string;
  bestemming: string;
  ritType: "enkel" | "heen-terug";
  datum: string; // dd/mm/jjjj, al geformatteerd
  tijd: string;
  terugDatum: string;
  terugTijd: string;
  personen: string;
  opmerkingen: string;
  afstandKm?: number;
  rijtijdMin?: number;
}

const GEEL = "#FFC107";
const DONKER = "#181818";
const GRIJS = "#6b6b6b";
const LICHTGRIJS = "#9b9b9b";
const RAND = "#ececec";
const ACHTERGROND = "#f4f4f4";
const GROEN = "#25D366";

// Absolute URL nodig: mailclients kunnen geen relatieve paden laden.
// PNG en niet WebP: veel mailclients (o.a. Outlook) tonen geen WebP.
// TIJDELIJK op pages.dev: www.taxibornem.be draait nu nog de oude site.
// Na de verhuizing terugzetten naar https://www.taxibornem.be/logo-email.png
const LOGO_URL = "https://taxibornem.pages.dev/logo-email.png";
const SITE = "taxibornem.be";
const BEDRIJF = "Taxi Bornem";
const TEL = "+32 472 70 62 45";
const MAIL = "info@taxibornem.be";
// Hamids nummer voor WhatsApp, in internationaal formaat zonder + of spaties.
const HAMID_WA = "32472706245";

/**
 * Zet een Belgisch telefoonnummer om naar het formaat dat wa.me nodig heeft:
 * enkel cijfers, met landcode, zonder leidende 0.
 * "0483 69 04 26" -> "32483690426"  ·  "+32 483..." -> "32483..."
 */
function waNumber(tel: string): string {
  let d = tel.replace(/\D/g, "");
  if (d.startsWith("0032")) d = d.slice(4);      // 0032... -> ...
  else if (d.startsWith("32")) d = d.slice(2);   // 32...   -> ...
  else if (d.startsWith("0")) d = d.slice(1);    // 0483... -> 483...
  return "32" + d;
}

/** Voorkomt dat ingevulde tekst de HTML kan breken of scripts kan injecteren. */
export function escapeHtml(v: string): string {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Buitenste omhulsel: grijze achtergrond, witte kaart, logo, voettekst. */
function shell(kicker: string, binnen: string, voetregel: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(BEDRIJF)}</title>
<style>
  /* Forceer de lichte versie, ook als het toestel in donkere modus staat.
     Clients die dark mode afdwingen (Outlook Android, Apple Mail) kleuren
     anders de witte achtergrond zwart en de zwarte tekst wit. */
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media (prefers-color-scheme: dark) {
    body, .m-shell, .m-card { background-color: #f4f4f4 !important; }
    .m-card { background-color: #ffffff !important; }
    .t-dark { color: #181818 !important; }
    .t-grey { color: #6b6b6b !important; }
    .t-light { color: #9b9b9b !important; }
  }
  /* Outlook (Windows/Android) negeert bovenstaande en draait zelf kleuren om.
     Deze [data-ogsc]/[data-ogsb]-selectors zijn de enige haak die Outlook
     biedt om die omkleuring te overrulen. Zo blijft de kaart wit en de
     tekst leesbaar in plaats van zwart-op-zwart. */
  [data-ogsc] .m-shell, [data-ogsb] .m-shell { background-color: #f4f4f4 !important; }
  [data-ogsc] .m-card, [data-ogsb] .m-card { background-color: #ffffff !important; }
  [data-ogsc] .t-dark { color: #181818 !important; }
  [data-ogsc] .t-grey { color: #6b6b6b !important; }
  [data-ogsc] .t-light { color: #9b9b9b !important; }

  /* Compacter op mobiel. Outlook desktop negeert media queries en houdt
     de ruimere desktop-waarden aan — dat is prima. */
  @media only screen and (max-width: 480px) {
    .m-head { padding: 20px 20px 0 20px !important; }
    .m-rule { padding: 14px 20px 0 20px !important; }
    .m-body { padding: 18px 20px 24px 20px !important; }
    .m-box  { padding: 14px 16px !important; }
    .m-gap  { padding-top: 14px !important; }
    .m-logo { width: 128px !important; }
    .m-wa   { padding: 12px 16px !important; font-size: 14px !important; }
    .m-wa2  { padding: 11px 10px !important; font-size: 12px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${ACHTERGROND} !important;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="m-shell" bgcolor="${ACHTERGROND}" style="background-color:${ACHTERGROND} !important;padding:24px 12px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="m-card" bgcolor="#ffffff" style="max-width:600px;width:100%;background-color:#ffffff !important;border-radius:20px;overflow:hidden;border:1px solid ${RAND};">
      <!-- Kop -->
      <tr><td class="m-head" bgcolor="#ffffff" style="padding:28px 32px 0 32px;background-color:#ffffff !important;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td align="left" style="vertical-align:middle;">
            <img src="${LOGO_URL}" alt="${escapeHtml(BEDRIJF)}" width="150" class="m-logo" style="display:block;width:150px;height:auto;">
          </td>
          <td align="right" style="vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:${LICHTGRIJS};text-transform:uppercase;">
            ${escapeHtml(kicker)}
          </td>
        </tr></table>
      </td></tr>
      <!-- Gele scheidingslijn -->
      <tr><td class="m-rule" bgcolor="#ffffff" style="padding:20px 32px 0 32px;background-color:#ffffff !important;">
        <div style="height:3px;background-color:${GEEL};border-radius:2px;line-height:3px;font-size:0;">&nbsp;</div>
      </td></tr>
      <!-- Inhoud -->
      <tr><td class="m-body" bgcolor="#ffffff" style="padding:24px 32px 32px 32px;background-color:#ffffff !important;font-family:Arial,Helvetica,sans-serif;">
        ${binnen}
      </td></tr>
    </table>
    <!-- Voettekst buiten de kaart -->
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="padding:18px 32px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:${LICHTGRIJS};text-align:center;">
        ${voetregel}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Klein grijs labeltje boven een waarde. */
function label(t: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:1px;color:${LICHTGRIJS};text-transform:uppercase;margin-bottom:4px;">${escapeHtml(t)}</div>`;
}
function waarde(t: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${DONKER};font-weight:bold;">${escapeHtml(t)}</div>`;
}

/* ─────────────────────────────────────────────────────────────────────
   MAIL 1 — naar Hamid: de volledige aanvraag
   ───────────────────────────────────────────────────────────────────── */

export function hamidMail(r: RitGegevens): { subject: string; html: string; text: string } {
  const isRetour = r.ritType === "heen-terug";
  const ritTypeLabel = isRetour ? "Heen & terug" : "Enkele rit";

  const ritOmschrijving = isRetour
    ? `heen op ${r.datum} om ${r.tijd} en terug op ${r.terugDatum} om ${r.terugTijd}`
    : `op ${r.datum} om ${r.tijd}`;

  // Drie klaar-gezette WhatsApp-berichten naar de klant.
  const waNummer = waNumber(r.telefoon);
  const voornaam = r.naam.split(" ")[0];

  const waPrijs = `https://wa.me/${waNummer}?text=${encodeURIComponent(
    `Hallo ${voornaam}, bedankt voor uw aanvraag bij Taxi Bornem voor de rit van ${r.ophalen} naar ${r.bestemming} (${ritOmschrijving}). De prijs bedraagt \u20ac___. Is dit akkoord voor u?`,
  )}`;

  const waAfwijzen = `https://wa.me/${waNummer}?text=${encodeURIComponent(
    `Hallo ${voornaam}, bedankt voor uw aanvraag bij Taxi Bornem. Jammer genoeg zijn wij op het gevraagde moment niet beschikbaar. Onze excuses voor het ongemak.`,
  )}`;

  const waVrij = `https://wa.me/${waNummer}?text=${encodeURIComponent(
    `Hallo ${voornaam}, `,
  )}`;

  const afstandBlok =
    r.afstandKm != null
      ? `<tr><td style="padding:14px 0 0 0;">
           <div style="background-color:${GEEL}1a;border-radius:12px;padding:12px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${DONKER};">
             <strong>Geschatte afstand: ${escapeHtml(String(r.afstandKm))} km</strong>
             &nbsp;·&nbsp; ± ${escapeHtml(String(r.rijtijdMin))} min rijden
           </div>
         </td></tr>`
      : "";

  const opmerkingenBlok = r.opmerkingen
    ? `<tr><td style="padding:20px 0 0 0;">
         ${label("Opmerkingen")}
         <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.6;">${escapeHtml(r.opmerkingen)}</div>
       </td></tr>`
    : "";

  const emailRegel = r.email
    ? `<tr><td colspan="2" style="padding:16px 0 0 0;">
         ${label("E-mail")}
         ${waarde(r.email)}
       </td></tr>`
    : "";

  const binnen = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;"><tr>
      <td style="vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:${GEEL};text-transform:uppercase;">Reservatie</td>
      ${
        isRetour
          ? `<td align="right" style="vertical-align:middle;"><span style="display:inline-block;background-color:${GEEL};color:${DONKER};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;padding:5px 11px;border-radius:8px;">&#8646; Heen &amp; terug</span></td>`
          : ""
      }
    </tr></table>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;color:${DONKER};margin-bottom:8px;">Nieuwe ritaanvraag</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${GRIJS};line-height:1.6;margin-bottom:20px;">Ontvangen via de website — bekijk de details en stuur de klant een prijsvoorstel via WhatsApp.</div>

    <!-- Contactblok -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#fafafa" style="background-color:#fafafa !important;border-radius:14px;padding:0;">
      <tr><td class="m-box" style="padding:18px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="55%" style="vertical-align:top;">${label("Naam")}${waarde(r.naam)}</td>
            <td width="45%" style="vertical-align:top;">${label("Telefoon")}${waarde(r.telefoon)}</td>
          </tr>
          ${emailRegel}
        </table>
      </td></tr>
    </table>

    <!-- Route -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:20px 0 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:top;padding-right:10px;padding-top:1px;font-size:18px;line-height:1.2;">📍</td>
          <td>${label("Ophalen")}<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${DONKER};font-weight:bold;">${escapeHtml(r.ophalen)}</div></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:10px 0 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:top;padding-right:10px;padding-top:1px;font-size:18px;line-height:1.2;">🏁</td>
          <td>${label("Bestemming")}<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${DONKER};font-weight:bold;">${escapeHtml(r.bestemming)}</div></td>
        </tr></table>
      </td></tr>
      ${afstandBlok}
    </table>

    <!-- Wanneer / type / personen -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${RAND};margin-top:20px;">
      ${
        isRetour
          ? `<tr>
               <td width="50%" style="padding:20px 0 0 0;vertical-align:top;">${label("Heenrit")}${waarde(`${r.datum} om ${r.tijd}`)}</td>
               <td width="50%" style="padding:20px 0 0 0;vertical-align:top;">${label("Terugrit")}${waarde(`${r.terugDatum} om ${r.terugTijd}`)}</td>
             </tr>
             <tr>
               <td width="50%" style="padding:16px 0 0 0;vertical-align:top;">${label("Type rit")}${waarde(ritTypeLabel)}</td>
               <td width="50%" style="padding:16px 0 0 0;vertical-align:top;">${label("Personen")}${waarde(r.personen)}</td>
             </tr>`
          : `<tr>
               <td width="40%" style="padding:20px 0 0 0;vertical-align:top;">${label("Wanneer")}${waarde(`${r.datum} om ${r.tijd}`)}</td>
               <td width="35%" style="padding:20px 0 0 0;vertical-align:top;">${label("Type rit")}${waarde(ritTypeLabel)}</td>
               <td width="25%" style="padding:20px 0 0 0;vertical-align:top;">${label("Personen")}${waarde(r.personen)}</td>
             </tr>`
      }
      ${opmerkingenBlok}
    </table>

    <!-- WhatsApp-acties -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr><td>
        <a href="${waPrijs}" class="m-wa" style="display:block;background-color:${GROEN};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-align:center;text-decoration:none;padding:15px 20px;border-radius:14px;">
          Prijsvoorstel sturen via WhatsApp
        </a>
      </td></tr>
      <tr><td style="padding-top:8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="50%" style="padding-right:4px;">
            <a href="${waVrij}" class="m-wa2" style="display:block;background-color:#f4f4f4;color:${DONKER};font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-align:center;text-decoration:none;padding:12px 14px;border-radius:12px;">
              Eigen bericht
            </a>
          </td>
          <td width="50%" style="padding-left:4px;">
            <a href="${waAfwijzen}" class="m-wa2" style="display:block;background-color:#f4f4f4;color:${DONKER};font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-align:center;text-decoration:none;padding:12px 14px;border-radius:12px;">
              Niet beschikbaar
            </a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  `;

  const voet = `Deze aanvraag kwam binnen via het boekingsformulier op ${SITE}.<br>${escapeHtml(BEDRIJF)} · ${escapeHtml(TEL)} · ${escapeHtml(MAIL)}`;

  const wanneerText = isRetour
    ? `Heenrit: ${r.datum} om ${r.tijd}\nTerugrit: ${r.terugDatum} om ${r.terugTijd}`
    : `Wanneer: ${r.datum} om ${r.tijd}`;

  // Platte-tekstversie voor clients die geen HTML tonen, en voor spamfilters.
  const text =
    `Nieuwe ritaanvraag via ${SITE}\n\n` +
    (isRetour ? `>>> HEEN & TERUG <<<\n\n` : "") +
    `Naam: ${r.naam}\nTelefoon: ${r.telefoon}\n` +
    (r.email ? `E-mail: ${r.email}\n` : "") +
    `\nOphalen: ${r.ophalen}\nBestemming: ${r.bestemming}\n` +
    (r.afstandKm != null ? `Afstand: ± ${r.afstandKm} km (± ${r.rijtijdMin} min)\n` : "") +
    `\n${wanneerText}\nType: ${ritTypeLabel}\nPersonen: ${r.personen}\n` +
    (r.opmerkingen ? `\nOpmerkingen: ${r.opmerkingen}\n` : "") +
    `\nPrijsvoorstel sturen: ${waPrijs}\n`;

  const subject = `${isRetour ? "[RETOUR] " : ""}Rit ${r.datum} ${r.tijd} — ${r.naam} (${r.ophalen} → ${r.bestemming})`;

  return { subject, html: shell("Nieuwe aanvraag", binnen, voet), text };
}

/* ─────────────────────────────────────────────────────────────────────
   MAIL 2 — naar de klant: bevestiging van ontvangst
   ───────────────────────────────────────────────────────────────────── */

export function klantMail(r: RitGegevens): { subject: string; html: string; text: string } {
  const isRetour = r.ritType === "heen-terug";

  const wanneer =
    isRetour
      ? `${r.datum} om ${r.tijd} — retour ${r.terugDatum} om ${r.terugTijd}`
      : `${r.datum} om ${r.tijd}`;

  const binnen = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;"><tr>
      <td style="vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:${GEEL};text-transform:uppercase;">Bevestiging</td>
      ${
        isRetour
          ? `<td align="right" style="vertical-align:middle;"><span style="display:inline-block;background-color:${GEEL};color:${DONKER};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;padding:5px 11px;border-radius:8px;">&#8646; Heen &amp; terug</span></td>`
          : ""
      }
    </tr></table>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;color:${DONKER};margin-bottom:8px;">Bedankt, ${escapeHtml(r.naam.split(" ")[0])}!</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${GRIJS};line-height:1.7;margin-bottom:6px;">
      We hebben uw aanvraag goed ontvangen. Hamid bekijkt ze persoonlijk en stuurt u
      zo snel mogelijk een prijsvoorstel via WhatsApp of telefoon.
      <strong style="color:${DONKER};">Pas na uw akkoord is de rit definitief bevestigd</strong> — u zit dus nog nergens aan vast.
    </div>

    <!-- Samenvatting van wat ze aanvroegen -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#fafafa" style="background-color:#fafafa !important;border-radius:14px;margin-top:20px;">
      <tr><td class="m-box" style="padding:18px 20px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;color:${LICHTGRIJS};text-transform:uppercase;margin-bottom:12px;">Uw aanvraag</div>
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:top;padding-right:10px;padding-top:1px;font-size:16px;line-height:1.2;">📍</td>
          <td style="padding-bottom:8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${DONKER};">${escapeHtml(r.ophalen)}</td>
        </tr><tr>
          <td style="vertical-align:top;padding-right:10px;padding-top:1px;font-size:16px;line-height:1.2;">🏁</td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${DONKER};">${escapeHtml(r.bestemming)}</td>
        </tr></table>
        ${
          isRetour
            ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;border-top:1px solid ${RAND};">
                 <tr>
                   <td width="50%" style="padding:12px 0 0 0;vertical-align:top;">${label("Heenrit")}<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${DONKER};font-weight:bold;">${escapeHtml(`${r.datum} om ${r.tijd}`)}</div></td>
                   <td width="50%" style="padding:12px 0 0 0;vertical-align:top;">${label("Terugrit")}<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${DONKER};font-weight:bold;">${escapeHtml(`${r.terugDatum} om ${r.terugTijd}`)}</div></td>
                 </tr>
               </table>
               <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${GRIJS};margin-top:12px;">${escapeHtml(r.personen)} ${Number(r.personen) === 1 ? "persoon" : "personen"}</div>`
            : `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${GRIJS};margin-top:12px;">${escapeHtml(wanneer)} · ${escapeHtml(r.personen)} ${Number(r.personen) === 1 ? "persoon" : "personen"}</div>`
        }
      </td></tr>
    </table>

    <!-- WhatsApp-knop naar Hamid -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr><td>
        <a href="https://wa.me/${HAMID_WA}?text=${encodeURIComponent(`Hallo, ik heb net een rit aangevraagd (${r.ophalen} naar ${r.bestemming}) en heb nog een vraag.`)}" class="m-wa" style="display:block;background-color:${GROEN};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-align:center;text-decoration:none;padding:15px 20px;border-radius:14px;">
          Stuur ons een bericht via WhatsApp
        </a>
      </td></tr>
    </table>

    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${GRIJS};line-height:1.7;margin-top:20px;">
      Liever bellen? U bereikt ons op <a href="tel:${TEL.replace(/\s/g, "")}" style="color:${DONKER};font-weight:bold;text-decoration:none;">${escapeHtml(TEL)}</a>.
    </div>
  `;

  const voet = `${escapeHtml(BEDRIJF)} · ${escapeHtml(TEL)} · ${escapeHtml(MAIL)}<br>Deze mail werd automatisch verzonden ter bevestiging van uw aanvraag op ${SITE}.`;

  const text =
    `Bedankt, ${r.naam.split(" ")[0]}!\n\n` +
    `We hebben uw aanvraag goed ontvangen. We sturen u zo snel mogelijk een prijsvoorstel via WhatsApp. Pas na uw akkoord is de rit definitief bevestigd.\n\n` +
    `Uw aanvraag:\n${r.ophalen} -> ${r.bestemming}\n${wanneer} · ${r.personen} ${Number(r.personen) === 1 ? "persoon" : "personen"}\n\n` +
    `Dringend? Bel ${TEL}.\n\n${BEDRIJF}`;

  return { subject: `We hebben uw aanvraag ontvangen — ${BEDRIJF}`, html: shell("Bevestiging", binnen, voet), text };
}