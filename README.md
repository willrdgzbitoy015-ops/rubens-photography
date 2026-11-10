# Ruben's Photography — website

One-page showcase website for Ruben's Photography (Palompon, Leyte), built with
[Astro](https://astro.build) and Tailwind CSS.

The site advertises Ruben's work. It has **no prices, no payment details and no booking form**.
Every "Book" button opens Ruben's **Messenger** (or the Facebook Page), so bookings and
quotes happen in a direct conversation.

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

## 2. Add the photos and logo

**Photos** go in `src/assets/photos/`. Until a photo is added, a gray box shows
the exact file name it's waiting for.

| File | Section |
| --- | --- |
| `hero.jpg` | Full-screen cover (horizontal, ~2400px wide) |
| `featured/featured.jpg` | Featured shoot (horizontal, ~1600px wide) |
| `about.jpg` | Photo of Ruben (vertical, ~1200px wide) |
| `portfolio/debut-01.jpg` … | Portfolio, 12 photos (see `src/assets/photos/README.md`) |

- Use lowercase names, JPG/PNG/WebP, about 2400px on the long side.
- The site makes small, fast versions (AVIF + WebP) for phones automatically.
- Update each photo's `alt` text in `src/data/site.ts` to describe the real photo.

**Logo:** already set up. Ruben's logo is in `src/assets/brand/`: the "R" mark
shows in the navbar and the full logo in the footer. See
`src/assets/brand/README.md` for what each file is.

**Other images in `public/`:**

- `og-image.jpg` is the preview picture shown when the link is shared on Facebook
  (**1200×630**). It shows the logo mark, the name and the tagline.
- `favicon.svg` and `apple-touch-icon.png` are the browser-tab and phone home-screen icons.
  Both use the "R" mark.

---

## 3. Edit the text: `src/data/site.ts`

**All** text, contact details, FAQ and settings are in one file:
`src/data/site.ts`. You never need to touch the other files to change the wording.

- Anything in **[square brackets]** is a placeholder. Replace it, brackets included.
- In headlines, words wrapped in `*asterisks*` show in gold italics.
- Placeholder sections show a dashed **"Placeholder text"** tag. Once you've
  replaced the text, set the matching flag to `false` to remove the tag:
  `storyIsPlaceholder`, `bioIsPlaceholder`, `isPlaceholder` (testimonials) and
  `answersArePlaceholder` (FAQ).

---

## 4. Connect the booking buttons to Messenger

"Book Now", "Book a Shoot" and "Message me on Messenger"
open one link: the `messenger` link in `src/data/site.ts`.

1. Find the Messenger link for Ruben's Facebook Page. It's usually `https://m.me/` followed by
   the Page's username (the part after `facebook.com/`), for example `https://m.me/rubensphotography`.
2. Open that link on your phone. It should start a Messenger chat with the Page.
3. Paste it into `src/data/site.ts`:
   ```ts
   messenger: 'https://m.me/your-page-username',
   ```

Until this is filled in, the buttons open the Facebook Page instead, so nothing is broken in the meantime.

---

## 5. Put it online with Netlify (free)

1. Create a free account on [GitHub](https://github.com) and upload this folder as a new repository
   (GitHub Desktop is the easiest way).
2. Create a free account on [Netlify](https://netlify.com) and sign in with GitHub.
3. Click **Add new site → Import an existing project → GitHub** and pick the repository.
4. The settings fill in automatically from `netlify.toml`. Click **Deploy**.
5. After a minute or two you get an address like `https://something.netlify.app`.
   You can change it under **Site configuration → Change site name**.
6. Open `astro.config.mjs` and replace `[your-site]` with that name, for example:
   ```js
   const SITE_URL = 'https://rubensphotography.netlify.app';
   ```
   This makes Facebook link previews show the right picture.

From now on, every change you push to GitHub goes live automatically.

> Prefer **Vercel**? Import the same GitHub repository at [vercel.com](https://vercel.com).
> It detects Astro by itself; no extra settings are needed.

---

## 6. Use your own domain (e.g. rubensphotography.com)

1. Buy the domain from any registrar (Namecheap, GoDaddy, Cloudflare and so on).
2. In Netlify, go to **Domain management → Add a domain** and type it in.
3. Follow Netlify's instructions. Either point the domain's nameservers to Netlify
   (easiest), or add the DNS records it shows you at your registrar.
4. HTTPS (the padlock) is set up for you automatically, usually within an hour.
5. Update `SITE_URL` in `astro.config.mjs` to the new domain and push the change.

---

## Where things are

```
public/              favicon, Facebook share image, robots.txt
src/assets/photos/   photos (hero, about, featured/, portfolio/)
src/assets/brand/    logo
src/data/site.ts     ALL text and settings  ← edit this
src/components/      one file per section of the page
src/styles/global.css colors and fonts (theme tokens at the top)
```
