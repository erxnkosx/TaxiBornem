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
  build: {
    // 'file' genereert /diensten.html i.p.v. /diensten/index.html.
    // Nodig voor de .html-rewrite in public/.htaccess, zodat /diensten
    // rechtstreeks werkt zonder redirect naar /diensten/.
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