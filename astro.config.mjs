// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The live address. Used for absolute URLs in Facebook share previews
// (og:image, og:url) and the canonical link. If Ruben moves the site to his
// own domain later, change it here.
const SITE_URL = 'https://rubens-photography.netlify.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  security: {
    // Content Security Policy: the browser only runs scripts and styles this
    // site ships (Astro adds a hash for each one at build time), so injected
    // code can't run. Only works in `npm run build` + `preview`, not `dev`.
    // The other security headers live in netlify.toml.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        // Google Fonts serves the font files from this domain.
        "font-src 'self' https://fonts.gstatic.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          // The Google Fonts stylesheet.
          { resource: 'https://fonts.googleapis.com', kind: 'element' },
          // Inline style="" attributes (photo focus points, animation delays).
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
