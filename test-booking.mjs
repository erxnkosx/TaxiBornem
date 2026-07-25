/**
 * Test van de validatie en de Web3Forms-payload.
 * Draaien met:  npm test
 */
import { validate } from "./src/lib/validation.ts";
import { buildWeb3FormsPayload } from "./src/lib/web3forms.ts";

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
test("leeg e-mailadres mag (optioneel veld)", () => { if (validate({ ...geldig, email: "" }).email) throw new Error("onterecht afgekeurd"); });
test("heen & terug vereist terugdatum en -tijd", () => {
  const f = validate({ ...geldig, ritType: "heen-terug" });
  if (!f.terugDatum || !f.terugTijd) throw new Error("terugrit niet afgedwongen");
});
test("terugrit vóór heenrit wordt afgekeurd", () => {
  const f = validate({ ...geldig, ritType: "heen-terug", terugDatum: gisteren, terugTijd: "10:00" });
  if (!f.terugDatum) throw new Error("volgorde niet gecontroleerd");
});
test("ongeldig aantal personen wordt afgekeurd", () => { if (!validate({ ...geldig, personen: "12" }).personen) throw new Error("geen fout"); });

console.log("\nWeb3Forms-payload");
test("bevat de access key", () => { if (!buildWeb3FormsPayload(geldig).access_key) throw new Error("access_key ontbreekt"); });
test("samenvatting bevat naam, route, tijd en opmerking", () => {
  const m = buildWeb3FormsPayload(geldig).message;
  for (const s of ["Jan Vermeersch", "Zaventem", "07:30", "Twee koffers"])
    if (!m.includes(s)) throw new Error(`"${s}" ontbreekt in de samenvatting`);
});
test("datum staat in Belgisch formaat in het onderwerp", () => {
  const s = buildWeb3FormsPayload(geldig).subject;
  const [y, m, d] = morgen.split("-");
  if (!s.includes(`${d}/${m}/${y}`)) throw new Error("datum niet in dd/mm/jjjj");
});
test("replyto is het e-mailadres van de klant", () => gelijk(buildWeb3FormsPayload(geldig).replyto, "jan@example.be", "replyto"));
test("replyto valt terug op Hamids mailbox zonder klant-e-mail", () => {
  gelijk(buildWeb3FormsPayload({ ...geldig, email: "" }).replyto, "info@taxibornem.be", "replyto");
});
test("terugrit verschijnt enkel bij heen & terug", () => {
  const enkel = buildWeb3FormsPayload(geldig).message;
  if (enkel.includes("Terugrit")) throw new Error("terugrit onterecht aanwezig");
  const retour = buildWeb3FormsPayload({ ...geldig, ritType: "heen-terug", terugDatum: morgen, terugTijd: "18:00" }).message;
  if (!retour.includes("Terugrit")) throw new Error("terugrit ontbreekt");
});

console.log(`\n${ok} geslaagd, ${fout} gefaald\n`);
process.exit(fout ? 1 : 0);
