# Prompt: pick, download and edit the hero slideshow photos

Paste everything below the line into Claude on the laptop (Claude with
browser access, e.g. Claude in Chrome, signed in to Facebook). If that Claude
can't browse Facebook itself, it will ask you to download the photos it picks.

---

You're helping me finish the website for **Ruben's Photography**, a wedding,
debut and event photographer in Palompon, Leyte (Philippines). The photographer
is **Ruben Agosto**. The site is an Astro project. On my PC it's in
`C:\Users\Will Bitoy\Desktop\Website`. If you're on another computer, find the
project folder and run `git pull` first.

The top of the homepage is a full-screen **slideshow**. Large photos cross-fade
every 7 seconds with a slow zoom, behind the headline "Life's biggest moments,
remembered beautifully." Right now it borrows 5 photos from elsewhere on the
page. Your job is to give it its own set of Ruben's best photos.

Before you start, check that `src/scripts/slideshow.ts` exists and that
`hero.slides` is in `src/data/site.ts`. If either is missing, the project isn't
up to date: stop and tell me.

## 1. Choose the photos (from Ruben's own Facebook Page only)

Ruben's Page: https://www.facebook.com/profile.php?id=100082353385538
(open **Photos → Albums**). Use only photos Ruben took and posted himself. Don't
use photos from other pages, other photographers or stock sites.

Look through the albums and shortlist **10–12**, then pick the best **6–8**.
Each pick must be:

- **Landscape** (wider than tall). Portrait photos don't fit a full-screen
  background.
- **Sharp and well exposed**, with real emotion: a first look, a laugh, a
  dance, a quiet moment. Choose "wow" photos over safe ones.
- **Composed with the people in the center or right third.** On computers the
  headline covers the left ~45% of the photo, so faces on the left get hidden.
- **Clean**: no text overlays, collages, borders, big watermarks or event
  graphics on the photo. Skip a photo like that rather than editing it out.
- **Faces big enough to read.** Skip big group shots where everyone is tiny.

Aim for variety, roughly: weddings ×2, prenup/engagement ×2, debut ×1–2,
birthday/christening/event ×1–2. Mix day and night, indoor and outdoor.

**Skip photos already on the site.** These are already used: the red-gown
debut under white pillars at night (two shots), the Michael & Marian
engagement session in a flower garden (six shots), a couple at a gold church
altar, a confetti kiss, a veil-and-earring close-up, a debutante in profile
with big earrings, a yellow-gown debut table, a pregnant couple with a violin
in a forest, a couple in a red gown and cream suit in the forest, a 70th
birthday with a gold backdrop, a birthday dance with a bouquet, and two
pickleball shots on a blue court at night.

## 2. Download at full size

For each pick, open it in Facebook's photo viewer, then **⋯ (options) →
Download**. Facebook gives you its largest copy (usually 2048 px wide). Don't
screenshot, and don't save the small preview. Put the downloads in a new
folder **outside** the project, e.g. `Downloads\ruben-slideshow-originals\`,
and never change those originals.

Write down each photo's Facebook link as you go. I need the list to confirm
with Ruben.

## 3. Edit: light, natural and consistent

The goal is for the 6–8 photos to look like one set, with the warm, slightly
moody tone of the site (dark espresso brown with tan accents). Ruben already
edited these, so this is a **light finishing pass, not a restyle**.

Do, per photo, judging each one by eye:

- **Straighten** if the horizon or vertical lines are tilted. Crop only as
  much as straightening needs.
- **Keep the full frame, landscape 3:2 or close.** Don't crop tight: the site
  crops differently on each screen and needs the room. Only trim distractions
  at the very edge.
- **Balance exposure**: recover blown highlights a little and lift muddy
  shadows a little. Leave night photos dark and moody.
- **Unify the color**: a gentle, consistent warmth, and slightly lower
  saturation on photos that look much more saturated than the rest.
  **Skin tones must stay natural.**
- **Don't** add filters, vignettes, grain, text or watermarks. Don't retouch
  faces or bodies, and don't add or remove people or objects. Don't darken the
  left side for the headline; the site already does that.
- **Never upscale.** Export at the downloaded size.

How: the project already has `sharp` (Node). Write a small script outside
`src/`, e.g. in the downloads folder, that reads each original and writes the
edited copy. Typical per-photo settings:

- `.rotate()` for auto-orientation, and optionally `.rotate(angle)` plus
  `.extract(...)` to straighten,
- `.modulate({ brightness: 0.97–1.05, saturation: 0.92–1.0 })`,
- `.linear(a, 128 * (1 - a))` with `a` between 1.03 and 1.08, for a touch of
  contrast,
- `.recomb([[1.02, 0, 0], [0, 1, 0], [0, 0, 0.97]])` for gentle warmth.
  **Don't use `.tint()`**: it turns the whole photo one color.

Python + Pillow is fine too. Export with `.jpeg({ quality: 90, mozjpeg: true })`
and keep metadata stripped (sharp's default), so no GPS or camera data goes
online.

**Look at every edited photo next to its original** (open both images) before
moving on. If an edit looks worse or "filtered", undo it. Leaving a photo as it
is counts as a valid choice.

## 4. Put them in the website

1. Save the edited files as `src/assets/photos/hero/slide-01.jpg`,
   `slide-02.jpg`, … in slideshow order (lowercase, two digits). Leave every
   other photo in `src/assets/photos/` alone, including `hero.jpg`.
2. **Order:** the strongest photo goes first, and it should be fairly dark or
   calm on the left, because it loads first and sits behind the headline.
   After that, alternate categories and alternate bright with dark photos.
3. In `src/data/site.ts`, replace the list in `hero.slides` with one entry per
   photo, in the same format as the current entries:
   ```ts
   { file: 'hero/slide-01.jpg', focus: '68% 35%', alt: 'Bride and groom laughing under a shower of petals outside the church' },
   ```
   - `alt`: one plain sentence describing what's in the photo, for blind
     visitors. Don't start with "Photo of" and don't use names.
   - `focus`: which part of the photo stays visible when it's cropped. The
     first number places the faces horizontally: on phones only about a third
     of the width shows, so use **(faceCenter − 0.15) ÷ 0.69**, where
     faceCenter is how far across the photo the faces are (0 = left edge, 1 =
     right edge). For example, faces at 0.65 across give `74%`. The second
     number is the faces' height, usually `25%`–`45%`.
   - Keep `slideSeconds: 7` and `placeholder` as they are.
4. Don't change anything else on the site. Two specifics: no prices, and no
   "Packages" section (Ruben decided against both).

## 5. Check it

- Run `npm run dev` and open the local address it prints.
- Watch the whole slideshow on a wide window. No face should be hidden behind
  the headline, and the headline should read clearly on every photo.
- Then open Chrome DevTools → device toolbar → 390 × 844 (phone) and check
  every slide again: faces in view, not cut off at the sides. Adjust `focus`
  where needed. Each photo stays 7 seconds and there's no way to skip
  ahead, so to check one photo quickly, move its entry to the top of
  `hero.slides` for a moment. Put the order back afterwards.
- Run `npm run build`. It must finish without errors.
- Don't commit or push. I'll review first.

## 6. Report back

Send me:

- a table of the final photos: file name, what it shows (Wedding, Debut, …),
  Facebook link, and the edits you made (or "none"),
- the photos you shortlisted but didn't use, with links and why,
- anything that looked off or that you weren't sure about.
