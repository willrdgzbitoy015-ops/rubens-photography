# Ruben's Photography — website

One-page showcase website for Ruben's Photography (Palompon, Leyte), built with
[Astro](https://astro.build) and Tailwind CSS.

The site advertises Ruben's work. It has **no prices, no payment details and no booking form**.
Every "Book" button opens Ruben's **Messenger** (or the Facebook Page),
so bookings and quotes happen in a direct conversation.

---

## 1. Run it on your computer

You need **Node.js 22.23 or newer** ([download the LTS version](https://nodejs.org)).

```bash
npm install      # first time only
npm run dev      # start the site at http://localhost:4321
```

The page reloads by itself when you save a file. Press `Ctrl + C` to stop.

To check the final version: `npm run build`, then `npm run preview`.

---

## 2. Edit the text: `src/data/site.ts`

**All** text, contact details, services, photos, reviews and FAQ live in one file:
`src/data/site.ts`. You never need to touch the other files to change the wording.

- Anything in **[square brackets]** is a placeholder. Replace it, brackets included.
- A FAQ question whose answer is still `[answer]` stays hidden until you fill it in.
- In headlines, words wrapped in `*asterisks*` show in tan italics.
- Don't add prices, payment details or a packages section: Ruben gives every
  client a personal quote on Messenger, since his rates vary by location.

---

## 3. Add or replace photos

Photos go in **`src/assets/photos/`**, using these exact file names:

| File | Section |
| --- | --- |
| `hero.jpg` + the photos listed in `hero.slides` | Full-screen slideshow at the top |
| `featured/01.jpg` … `featured/06.jpg` | Featured shoot (01 is the big one) |
| `portfolio/wedding-01.jpg`, `prenup-01.jpg`, `debut-01.jpg`, … | Portfolio, 12 photos |
| `about.jpg` | Photo of Ruben in the About section (vertical) |

The full list is in `src/assets/photos/README.md`. Until a file is there, a gray box
shows the exact name it's waiting for, so the site always works.

- **To replace a photo:** save the new file over the old one, with the same name.
  If it shows something different, update its `alt` text (a short description
  for people using screen readers) in `src/data/site.ts`.
- **To add a portfolio photo:** put the file in `src/assets/photos/portfolio/`, then add a
  line to `portfolio.items` in `src/data/site.ts` with its file name, category and alt text.
- **Photo of Ruben:** `src/assets/photos/about.jpg` (already in place). To change it, save
  the new photo over it with the same name.
- **Slideshow at the top:** the photos, their order and alt text are the
  `hero.slides` list in `src/data/site.ts`. Dedicated slideshow photos go in
  `src/assets/photos/hero/` (`slide-01.jpg`, `slide-02.jpg`, …). Use horizontal photos.
  `prompts/hero-slideshow-photos.md` is a ready-made prompt for Claude to pick, download
  and lightly edit Ruben's best photos from his Facebook Page.
- Use the original, full-quality JPGs. The site makes small, fast versions (AVIF + WebP)
  for phones by itself when it's built.
- If a slideshow photo crops out the people on phones, change that photo's `focus` in
  `hero.slides` in `src/data/site.ts` (for example `'70% 35%'` when they're on the right).

**Facebook share picture:** `public/og-image.jpg` (1200×630) is what Facebook shows
when someone shares the link. Right now it shows the logo. Once `hero.jpg` is in place,
you can make it from the hero photo instead:

```bash
npm run og-image
```

---

## 4. The logo

Ruben's logo is already set up in `src/assets/brand/`: the "R" mark shows in the navbar
(next to the name in text) and the full logo in the footer. To change it, replace
`logo-mark.png` and `logo-full.png` with new transparent PNGs using the same names.
See `src/assets/brand/README.md` for details. If those files are missing, the site
shows the name as a text logo instead.

**Light or dark background.** The site has two color themes: light (warm white) and
dark (espresso brown). `theme.default` in `src/data/site.ts` picks the one visitors see
first. The sun/moon button in the navbar switches between them and remembers the
choice. Set `theme.showToggle` to `false` to lock the site to one theme. The hero, the
photo viewer and the loading screen stay dark in both. The colors are at the top of
`src/styles/global.css`.

**Effects.** A camera-shutter loading screen, photos that "develop" as they load, a
viewfinder cursor over photos, word-by-word headings and more. They're all in
`src/styles/global.css` (the "Effects & animations" part) and `src/scripts/`. Anyone who
has turned on "reduce motion" on their phone or computer gets a still version.

---

## 5. Connect the booking buttons to Messenger

"Book Now", "Book a Shoot" and "Message me on Messenger" all open one link:
`messenger` in `src/data/site.ts`. Until it's filled in, they open the Facebook Page instead,
so nothing is broken in the meantime.

1. On a phone, open **https://m.me/100082353385538**
2. If it opens a Messenger chat with **Ruben's Photography**, that's the right link.
   Paste it into `src/data/site.ts`:
   ```ts
   messenger: 'https://m.me/100082353385538',
   ```
3. If it doesn't, open the Facebook Page, tap **Message**, and use that chat's link instead.

---

## 6. Put it online with Netlify (free)

1. Create a free account on [GitHub](https://github.com) and upload this folder as a new repository
   (GitHub Desktop is the easiest way).
2. Create a free account on [Netlify](https://netlify.com) and sign in with GitHub.
3. Click **Add new site → Import an existing project → GitHub** and pick the repository.
4. The settings fill in automatically from `netlify.toml`. Click **Deploy**.
5. Under **Site configuration → Change site name**, set the name to `rubens-photography`,
   so the address is `https://rubens-photography.netlify.app`. That's the address already
   set as `SITE_URL` in `astro.config.mjs`. If you pick a different name, change it there
   too, or Facebook link previews will point to the wrong place.

From now on, every change you push to GitHub goes live automatically. On Netlify's free
plan each live deploy uses some of the monthly credits, so push finished batches of changes
rather than every small edit.

### Security

- `netlify.toml` sends security headers with every page (no framing by other sites,
  HTTPS only, no camera/microphone/location access, and so on).
- `astro.config.mjs` turns on a Content Security Policy: the browser only runs the
  scripts and styles this site ships. It only applies to the built site, so test with
  `npm run build` then `npm run preview`, not `npm run dev`.
- If you add a script, font or embed from another website (for example a Google Map),
  add its address to the `security.csp` settings in `astro.config.mjs`, or the browser
  will block it.
- You can check the live site's headers at [securityheaders.com](https://securityheaders.com).

> **Vercel** works too, but its free plan doesn't allow business sites.

---

## 7. Use your own domain (e.g. rubensphotography.com)

1. Buy the domain from any registrar (Namecheap, GoDaddy, Cloudflare and so on).
2. In Netlify, go to **Domain management → Add a domain** and type it in.
3. Follow Netlify's instructions. Either point the domain's nameservers to Netlify
   (easiest), or add the DNS records it shows you at your registrar.
4. HTTPS (the padlock) is set up for you automatically, usually within an hour.
5. Update `SITE_URL` in `astro.config.mjs` to the new domain and push the change.
6. Once the domain works, you can make the HTTPS rule stricter in `netlify.toml`:
   `Strict-Transport-Security = "max-age=63072000; includeSubDomains"`.

---

## Where things are

```
public/              favicon, Facebook share image, robots.txt
src/assets/photos/   photos (hero, hero/ slideshow, about, featured/, portfolio/)
src/assets/brand/    logo (+ the Baybayin lettering cut from it)
prompts/             ready-made prompts for Claude (slideshow photos)
src/data/site.ts     ALL text and settings  ← edit this
src/components/      one file per section of the page
src/styles/global.css colors and fonts (theme tokens at the top)
tools/               one-off helper (npm run og-image)
```
