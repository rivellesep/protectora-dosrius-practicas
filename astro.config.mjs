// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output. Cloudflare Workers serves the `dist` folder as static assets (see wrangler.jsonc),
// so no adapter and no Worker script are needed.
export default defineConfig({
  site: 'https://protectora-dosrius-practicas.enric-albert-federg.workers.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Photos come straight from the CMS, often from a phone. Astro resizes them and serves
  // modern formats with srcset, so volunteers never have to prepare an image.
  image: {
    layout: 'constrained',
  },
  build: {
    inlineStylesheets: 'always',
  },
});
