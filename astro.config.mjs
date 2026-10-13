// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

const SITE_UPDATED = '2026-10-13';
const PAGE_UPDATED = {
  // 'https://www.taxibornem.be/diensten': '2026-11-01',
};

// https://astro.build/config
export default defineConfig({
  // Definitieve URL — gebruikt voor canonical links, sitemap en Open Graph.
  site: 'https://www.taxibornem.be',

  // Nette URL's zonder trailing slash: /diensten i.p.v. /diensten/
  trailingSlash: 'never',

  // 'file' genereert /diensten.html i.p.v. /diensten/index.html.
  // Cloudflare Pages serveert die automatisch op /diensten (zonder .html),
  // dus samen met trailingSlash: 'never' krijg je nette URL's zonder
  // serverconfiguratie. Zie ook public/_redirects en public/_headers.
  build: {
    format: 'file',
  },

  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/bedankt'),
      // lastmod = datum van de laatste echte inhoudswijziging. Pas SITE_UPDATED
      // (of een datum per pagina in PAGE_UPDATED) aan wanneer de tekst verandert,
      // nooit automatisch de builddatum: dan negeert Google het.
      serialize(item) {
        item.lastmod = PAGE_UPDATED[item.url] ?? SITE_UPDATED;
        return item;
      },
    }),
  ],
});
