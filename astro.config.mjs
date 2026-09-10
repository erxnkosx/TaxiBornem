// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

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
      filter: (page) => !page.includes('bedankt'),
    }),
  ],
});
