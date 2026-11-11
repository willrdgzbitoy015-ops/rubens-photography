# Photos go here

Until a file exists, the website shows a gray placeholder box in its place.
The box shows the exact file path it's waiting for.

| File | Where it shows |
| --- | --- |
| `hero.jpg` | Full-screen cover at the top (horizontal, ~2400px wide) |
| `featured/01.jpg` | Featured shoot, large photo (horizontal) |
| `featured/02.jpg` … `featured/06.jpg` | Featured shoot, small row under it (cropped to squares; the full photo opens when tapped) |
| `about.jpg` | About section, photo of Ruben (vertical) |
| `portfolio/wedding-01.jpg` … `wedding-03.jpg` | Portfolio: Wedding |
| `portfolio/prenup-01.jpg`, `prenup-02.jpg` | Portfolio: Prenup |
| `portfolio/debut-01.jpg` … `debut-03.jpg` | Portfolio: Debut |
| `portfolio/birthday-01.jpg`, `birthday-02.jpg` | Portfolio: Birthday |
| `portfolio/events-01.jpg`, `events-02.jpg` | Portfolio: Events |

Tips:

- Use **lowercase** file names exactly as above (`.jpg`, `.png` or `.webp`).
- Use the original, full-quality files. The website makes the smaller,
  faster versions (AVIF + WebP) for phones automatically when it's built.
- iPhone HEIC photos must be exported as JPG first.
- Each photo's `alt` text (a short description for screen readers) is in
  `src/data/site.ts`. Update it if you swap a photo for a different one.
- To add or remove portfolio photos, edit the `portfolio.items` list in
  `src/data/site.ts`.
- After adding or changing `hero.jpg`, run `npm run og-image` to make the
  Facebook share picture from it (see the main README).
