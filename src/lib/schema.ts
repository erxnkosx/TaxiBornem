// ─── schema.org-blokken (JSON-LD) ─────────────────────────────────────────────
// Eén centrale bedrijfsbeschrijving met een vaste @id. Alle andere blokken
// (diensten, broodkruimels) verwijzen daarnaar, zodat Google ze aan elkaar koppelt.

import { EMAIL, GOOGLE_REVIEWS_URL, PHONE_RAW } from "../data/site";
import { dienstPages, type LandingFaq, type LandingPageData } from "../data/landing";

export const SITE = "https://www.taxibornem.be";
export const BUSINESS_ID = `${SITE}/#taxibedrijf`;

const city = (name: string) => ({ "@type": "City", name });

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "Taxi Bornem",
  description:
    "Taxibedrijf in Bornem voor luchthavenvervoer, zakelijk vervoer, privéritten en lange afstanden. 24/7, met vaste prijs vooraf.",
  url: `${SITE}/`,
  logo: `${SITE}/logo.webp`,
  image: [`${SITE}/og-image.jpg`, `${SITE}/car.webp`],
  telephone: PHONE_RAW,
  email: EMAIL,
  vatID: "BE1019703590",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Bancontact, Payconiq, Visa, Mastercard, Overschrijving",
  knowsLanguage: ["nl", "en", "ar"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bornem",
    postalCode: "2880",
    addressRegion: "Antwerpen",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.0973,
    longitude: 4.2437,
  },
  hasMap: GOOGLE_REVIEWS_URL,
  sameAs: [GOOGLE_REVIEWS_URL],
  areaServed: [
    "Bornem",
    "Puurs-Sint-Amands",
    "Willebroek",
    "Temse",
    "Antwerpen",
    "Mechelen",
    "Brussel",
  ].map(city),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  makesOffer: dienstPages.map((d) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: d.label,
      url: `${SITE}/${d.slug}`,
    },
  })),
};

export function faqSchema(items: LandingFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: new URL(t.path, SITE).href,
    })),
  };
}

export function serviceSchema(page: LandingPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: page.kind === "gemeente" ? page.label : `${page.label} vanuit Bornem`,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url: `${SITE}/${page.slug}`,
    image: `${SITE}${page.image}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: page.areaServed.map(city),
  };
}
