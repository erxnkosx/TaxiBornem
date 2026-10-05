# Taxi Bornem Hamid — website

Statische site gebouwd met [Astro](https://astro.build) en React-componenten,
bestemd voor **www.taxibornem.be**. Gehost op Cloudflare Pages.

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
├─ data/site.ts          Contactgegevens, diensten (kort), reviews, FAQ
├─ data/landing.ts       Volledige teksten van de dienst- en gemeentepagina's
├─ layouts/Layout.astro  Gedeelde <head>, meta-tags, Open Graph en schema-markup
├─ lib/schema.ts         schema.org-blokken (bedrijf, diensten, FAQ, broodkruimels)
├─ pages/                Eén bestand = één URL
│  ├─ index.astro           /
│  ├─ diensten.astro        /diensten
│  ├─ [slug].astro          /luchthavenvervoer, /zakelijk-vervoer, /prive-ritten,
│  │                        /lange-afstanden, /taxi-puurs-sint-amands,
│  │                        /taxi-willebroek, /taxi-temse
│  ├─ over-ons.astro        /over-ons
│  ├─ contact.astro         /contact
│  ├─ bedankt.astro         /bedankt      (na een aanvraag, noindex)
│  └─ 404.astro             onbekende URL's
├─ components/           Navbar, Footer, BookingForm, FAQ, …
│  └─ pages/             De opmaak per pagina (LandingPage = sjabloon)
└─ lib/                  Validatie, cookie-toestemming, schema's
```

## SEO: hoe de site in elkaar zit

- **Statische HTML, kleine eilandjes JavaScript.** De pagina's worden zonder
  JavaScript gerenderd. Alleen interactieve onderdelen laden JS: de navigatie,
  het boekingsformulier, de tijdlijn, de kaart en de cookiebanner
  (`client:load`, `client:visible`, `client:idle` in de `.astro`-bestanden).
  Een component zonder `client:`-directive levert alleen HTML op; hooks
  (`useState`, `onClick`) werken daar dus niet.
- **FAQ's en uitklapblokken** gebruiken `<details>`, zodat de tekst altijd in
  de HTML staat.
- **Schema.org:** elke pagina krijgt het `LocalBusiness`-blok uit
  `lib/schema.ts`; dienst- en gemeentepagina's daarnaast een dienst-,
  FAQ- en broodkruimelblok.
- **Kaal domein → www** regel je bij de DNS-provider (Easyhost), niet in
  `public/_redirects`: Cloudflare Pages ondersteunt daar geen domein-redirects.
- Het `pages.dev`-adres krijgt een `noindex` via `public/_headers`.

### Een nieuwe dienst- of gemeentepagina toevoegen

Voeg een object toe aan `dienstPages` of `gemeentePages` in
`src/data/landing.ts`. De pagina, de sitemap, de footer, de interne links en
de schema-markup volgen automatisch. Schrijf voor elke gemeente echt eigen
tekst (deelgemeenten, ritten, wat er te doen is); pagina's die alleen een
andere plaatsnaam hebben, werken niet in Google.

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

## Deploy

Cloudflare Pages bouwt de site automatisch bij elke push naar GitHub
(`npm run build`, uitvoermap `dist/`).
