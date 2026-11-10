// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// [your-site] — replace with your real Netlify address (or custom domain)
// once the site is live, e.g. 'https://rubensphotography.netlify.app'.
// It's used for absolute URLs in Facebook share previews (og:image, og:url).
const SITE_URL = 'https://[your-site].netlify.app';

export default defineConfig({
  // Square brackets aren't allowed in a URL, so they're stripped until you
  // fill in the placeholder above. Once it's filled in, this does nothing.
  site: SITE_URL.replace(/[[\]]/g, ''),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
