/**
 * Test van de validatie en de bevestigingsmails (functions/_lib/email.ts).
 * Draaien met:  npm test
 */
import { validate } from "./src/lib/validation.ts";
import { hamidMail, klantMail, waNumber } from "./functions/_lib/email.ts";

const morgen = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
const gisteren = new Date(Date.now() - 864e5).toISOString().slice(0, 10);

const geldig = {
  naam: "Jan Vermeersch",
  telefoon: "+32 470 12 34 56",
  email: "jan@example.be",
  ophalen: "Kardinaal Cardijnplein 1, Bornem",
  bestemming: "Brussels Airport, Zaventem",
  ritType: "enkel",
  datum: morgen,
  tijd: "07:30",
  terugDatum: "",
  terugTijd: "",
  personen: "2",
  opmerkingen: "Twee koffers",
};

let ok = 0, fout = 0;
function test(naam, fn) {
  try { fn(); console.log(`  ✓ ${naam}`); ok++; }
  catch (e) { console.log(`  ✗ ${naam}\n      ${e.message}`); fout++; }
}
const gelijk = (a, b, wat) => {
  if (JSON.stringify(a) !== JSON.stringify(b))
    throw new Error(`${wat}: verwacht ${JSON.stringify(b)}, kreeg ${JSON.stringify(a)}`);
};

console.log("\nValidatie");
test("geldige aanvraag geeft geen fouten", () => gelijk(Object.keys(validate(geldig)).length, 0, "aantal fouten"));
test("lege naam wordt afgekeurd", () => { if (!validate({ ...geldig, naam: "  " }).naam) throw new Error("geen fout"); });
test("te kort telefoonnummer wordt afgekeurd", () => { if (!validate({ ...geldig, telefoon: "0470" }).telefoon) throw new Error("geen fout"); });
test("telefoonnummer met spaties en streepjes mag", () => { if (validate({ ...geldig, telefoon: "0470-12 34 56" }).telefoon) throw new Error("onterecht afgekeurd"); });
test("datum in het verleden wordt afgekeurd", () => { if (!validate({ ...geldig, datum: gisteren }).datum) throw new Error("geen fout"); });
test("datum van vandaag mag nog", () => {
  const vandaag = new Date().toISOString().slice(0, 10);
  if (validate({ ...geldig, datum: vandaag }).datum) throw new Error("onterecht afgekeurd");
});
test("ongeldig e-mailadres wordt afgekeurd", () => { if (!validate({ ...geldig, email: "jan@@x" }).email) throw new Error("geen fout"); });
test("leeg e-mailadres wordt afgekeurd (verplicht veld)", () => { if (!validate({ ...geldig, email: "" }).email) throw new Error("geen fout"); });
test("heen & terug vereist terugdatum en -tijd", () => {
  const f = validate({ ...geldig, ritType: "heen-terug" });
  if (!f.terugDatum || !f.terugTijd) throw new Error("terugrit niet afgedwongen");
});
test("terugrit vóór heenrit wordt afgekeurd", () => {
  const f = validate({ ...geldig, ritType: "heen-terug", terugDatum: gisteren, terugTijd: "10:00" });
  if (!f.terugDatum) throw new Error("volgorde niet gecontroleerd");
});
test("ongeldig aantal personen wordt afgekeurd", () => { if (!validate({ ...geldig, personen: "12" }).personen) throw new Error("geen fout"); });

console.log("\nBevestigingsmails");
// Zo zet functions/api/booking.ts de formulierdata om vóór het mailen.
const nl = (iso) => iso.split("-").reverse().join("/");
const rit = (b) => ({ ...b, datum: nl(b.datum), terugDatum: b.terugDatum ? nl(b.terugDatum) : "" });

test("mail naar Hamid: onderwerp met datum (dd/mm/jjjj), naam en route", () => {
  const s = hamidMail(rit(geldig)).subject;
  for (const deel of [nl(morgen), "07:30", "Jan Vermeersch", "Zaventem"])
    if (!s.includes(deel)) throw new Error(`"${deel}" ontbreekt in het onderwerp`);
});
test("mail naar Hamid: tekstversie bevat naam, route, tijd en opmerking", () => {
  const t = hamidMail(rit(geldig)).text;
  for (const deel of ["Jan Vermeersch", "Zaventem", "07:30", "Twee koffers"])
    if (!t.includes(deel)) throw new Error(`"${deel}" ontbreekt`);
});
test("mail naar Hamid: WhatsApp-link gaat naar het nummer van de klant", () => {
  if (!hamidMail(rit(geldig)).html.includes("https://wa.me/32470123456")) throw new Error("wa.me-link naar klant ontbreekt");
});
test("terugrit en [RETOUR] verschijnen enkel bij heen & terug", () => {
  const enkel = hamidMail(rit(geldig));
  if (enkel.text.includes("Terugrit") || enkel.subject.includes("[RETOUR]")) throw new Error("terugrit onterecht aanwezig");
  const retour = hamidMail(rit({ ...geldig, ritType: "heen-terug", terugDatum: morgen, terugTijd: "18:00" }));
  if (!retour.text.includes("Terugrit") || !retour.subject.startsWith("[RETOUR]")) throw new Error("terugrit ontbreekt");
});
test("e-mailregel valt weg zonder klant-e-mail", () => {
  if (hamidMail(rit({ ...geldig, email: "" })).text.includes("E-mail:")) throw new Error("lege e-mailregel getoond");
});
test("ingevulde tekst kan de HTML niet breken (geen script-injectie)", () => {
  const html = hamidMail(rit({ ...geldig, opmerkingen: "<script>alert(1)</script>" })).html;
  if (html.includes("<script>alert(1)")) throw new Error("HTML niet ge-escaped");
  if (!html.includes("&lt;script&gt;")) throw new Error("opmerking ontbreekt");
});
test("klantmail bedankt de klant en noemt de route", () => {
  const k = klantMail(rit(geldig));
  if (!k.html.includes("Bedankt, Jan Vermeersch!")) throw new Error("aanhef ontbreekt");
  if (!k.text.includes("Kardinaal Cardijnplein 1, Bornem -> Brussels Airport, Zaventem")) throw new Error("route ontbreekt");
});
test("klantmail: 1 persoon in enkelvoud", () => {
  if (!klantMail(rit({ ...geldig, personen: "1" })).text.includes("1 persoon\n")) throw new Error("geen enkelvoud");
});

console.log("\nWhatsApp-nummers");
for (const [invoer, verwacht] of [
  ["0483 69 04 26", "32483690426"],
  ["+32 483 69 04 26", "32483690426"],
  ["483 69 04 26", "32483690426"],
  ["+34 612 34 56 78", "34612345678"],
  ["0031 6 12345678", "31612345678"],
]) test(`${invoer} → ${verwacht}`, () => gelijk(waNumber(invoer), verwacht, "nummer"));

console.log(`\n${ok} geslaagd, ${fout} gefaald\n`);
process.exit(fout ? 1 : 0);
