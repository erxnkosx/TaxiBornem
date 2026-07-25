# Taxi Bornem Hamid — website

Statische site gebouwd met [Astro](https://astro.build) en React-componenten,
bestemd voor **www.taxibornem.be**. Gehost op Hostinger (Premium-plan).

## Snel starten

```bash
npm install
npm run dev        # ontwikkelserver op localhost:4321
```

| Commando | Doet |
| --- | --- |
| `npm run dev` | Ontwikkelserver met live herladen |
| `npm run build` | Bouwt de site naar `dist/` |
| `npm run preview` | Toont de gebouwde site lokaal |
| `npm test` | Draait de tests van het boekingsformulier |

## Structuur

```
src/
├─ data/site.ts          Alle inhoud op één plek: contactgegevens, diensten,
│                        tarieven, reviews, FAQ, Web3Forms-sleutel.
├─ layouts/Layout.astro  Gedeelde <head>, meta-tags en schema-markup
├─ pages/                Eén bestand = één URL
│  ├─ index.astro           /
│  ├─ diensten.astro        /diensten
│  ├─ tarieven.astro        /tarieven
│  ├─ over-ons.astro        /over-ons
│  ├─ contact.astro         /contact
│  ├─ bedankt.astro         /bedankt      (na een aanvraag)
│  └─ 404.astro             onbekende URL's
├─ components/           Navbar, Footer, BookingForm, FAQ, …
│  └─ pages/             De inhoud per pagina
└─ lib/
   ├─ validation.ts      Validatieregels voor het formulier
   └─ web3forms.ts       Maakt de aanvraag op voor verzending
```

## Inhoud aanpassen

Bijna alle teksten, prijzen en gegevens staan in **`src/data/site.ts`**.
Een telefoonnummer of tarief wijzigen doe je daar één keer; het wordt overal
op de site meteen doorgevoerd.

## Het boekingsformulier

Omdat de site op een Hostinger Premium-plan draait (zonder Node.js), verloopt de
verzending via **[Web3Forms](https://web3forms.com)** — een gratis dienst die de
aanvraag per e-mail naar Hamid stuurt. De site zelf blijft volledig statisch.

### Instellen (eenmalig)

1. Ga naar [web3forms.com](https://web3forms.com), vul `info@taxibornem.be` in en
   klik op *Create Access Key*. De sleutel komt per e-mail toe.
2. Plak die sleutel in `src/data/site.ts` bij `WEB3FORMS_ACCESS_KEY`.
3. Klaar. Elke aanvraag komt vanaf dan binnen in de mailbox.

> De access key mag publiek in de code staan — ze bepaalt enkel naar welke
> mailbox de aanvraag gaat, niet wie mag versturen.

### Wat de bezoeker ervaart

1. Formulier invullen → validatie in het Nederlands, per veld.
2. Verzenden → de aanvraag gaat naar Web3Forms → Hamid krijgt een nette e-mail
   met alle ritgegevens.
3. De bezoeker belandt op `/bedankt`.

Antwoorden op die e-mail gaat rechtstreeks naar de klant (als die een e-mailadres
opgaf), zodat Hamid meteen een prijs kan doorsturen.

### Spam

Twee onzichtbare maatregelen: een verborgen veld dat enkel bots invullen, en een
tijdscontrole (invullen binnen drie seconden is geen mens). Web3Forms heeft
daarnaast zijn eigen ingebouwde spamfilter.

## Later opschalen

Wil Hamid ooit een overzicht van alle aanvragen in plaats van losse mails, dan
biedt Web3Forms een betaalde Submissions-API. Ook een overstap naar een eigen
mailoplossing (bv. bij een zwaarder hostingplan) kan later, zonder de rest van
de site te herbouwen — enkel `src/components/BookingForm.tsx` verandert dan.

## Deploy naar Hostinger

De site wordt lokaal of via GitHub Actions gebouwd (`npm run build`), waarna de
inhoud van de map `dist/` via FTP naar `public_html/` op Hostinger gaat. Zie de
losse deploy-handleiding.
