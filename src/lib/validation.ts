/**
 * Validatieregels voor een boekingsaanvraag.
 *
 * Bewust in een eigen bestand: dit draait zowel in de browser (directe
 * feedback bij het typen) als op de server (waar je nooit op de browser
 * mag vertrouwen). De mailcode blijft zo buiten de client-bundel.
 */

export interface Booking {
  naam: string;
  telefoon: string;
  email: string;
  ophalen: string;
  bestemming: string;
  ritType: "enkel" | "heen-terug";
  datum: string;
  tijd: string;
  terugDatum: string;
  terugTijd: string;
  personen: string;
  opmerkingen: string;
}

/** Veldnaam → Nederlandse foutmelding. Leeg object = geldig. */
export type Errors = Partial<Record<keyof Booking, string>>;

const MAX = { naam: 100, adres: 200, opmerkingen: 1000 };

function isBlank(v: unknown): boolean {
  return typeof v !== "string" || v.trim() === "";
}

export function validate(b: Partial<Booking>): Errors {
  const e: Errors = {};

  if (isBlank(b.naam)) e.naam = "Vul uw naam in.";
  else if (b.naam!.trim().length < 2) e.naam = "Dat lijkt geen volledige naam.";
  else if (b.naam!.length > MAX.naam) e.naam = "Deze naam is te lang.";

  const digits = (b.telefoon ?? "").replace(/[^\d]/g, "");
  if (isBlank(b.telefoon)) e.telefoon = "Vul uw telefoonnummer in.";
  else if (digits.length < 8 || digits.length > 15)
    e.telefoon = "Controleer uw telefoonnummer.";

  // E-mail is optioneel; enkel valideren als er iets ingevuld is.
  if (!isBlank(b.email) && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(b.email!.trim()))
    e.email = "Controleer uw e-mailadres.";

  if (isBlank(b.ophalen)) e.ophalen = "Vul het ophaaladres in.";
  else if (b.ophalen!.length > MAX.adres) e.ophalen = "Dit adres is te lang.";

  if (isBlank(b.bestemming)) e.bestemming = "Vul de bestemming in.";
  else if (b.bestemming!.length > MAX.adres) e.bestemming = "Dit adres is te lang.";

  if (isBlank(b.datum)) {
    e.datum = "Kies een datum.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(b.datum!)) {
    e.datum = "Kies een geldige datum.";
  } else {
    // Vergelijken op kalenderdag, niet op tijdstip — vandaag mag nog.
    const vandaag = new Date().toISOString().slice(0, 10);
    if (b.datum! < vandaag) e.datum = "Deze datum ligt in het verleden.";
  }

  if (isBlank(b.tijd)) e.tijd = "Kies een tijdstip.";
  else if (!/^\d{2}:\d{2}$/.test(b.tijd!)) e.tijd = "Kies een geldig tijdstip.";

  if (b.ritType === "heen-terug") {
    if (isBlank(b.terugDatum)) e.terugDatum = "Kies een datum voor de terugrit.";
    else if (b.datum && b.terugDatum! < b.datum)
      e.terugDatum = "De terugrit ligt vóór de heenrit.";
    if (isBlank(b.terugTijd)) e.terugTijd = "Kies een tijdstip voor de terugrit.";
  }

  const p = Number(b.personen);
  if (!Number.isInteger(p) || p < 1 || p > 7)
    e.personen = "Kies een aantal tussen 1 en 7.";

  if ((b.opmerkingen ?? "").length > MAX.opmerkingen)
    e.opmerkingen = "Houd de opmerking wat korter.";

  return e;
}
