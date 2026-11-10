# Photos go here

Until a file exists, the website shows a gray placeholder box in its place.
The box shows the exact file path it's waiting for.

| File | Where it shows | Shape |
| --- | --- | --- |
| `hero.jpg` | Full-screen cover at the top | Horizontal, ~2400px wide |
| `featured/featured.jpg` | Featured shoot | Horizontal, ~1600px wide |
| `about.jpg` | About section (photo of Ruben) | Vertical, ~1200px wide |
| `portfolio/debut-01.jpg` … `debut-04.jpg` | Portfolio — Debut | Any |
| `portfolio/birthday-01.jpg` … `birthday-03.jpg` | Portfolio — Birthday | Any |
| `portfolio/events-01.jpg` … `events-03.jpg` | Portfolio — Events | Any |
| `portfolio/portrait-01.jpg`, `portrait-02.jpg` | Portfolio — Portrait | Any |

Tips:

- Use **lowercase** file names exactly as above (`.jpg`, `.png` or `.webp`).
- Export at about **2400px on the long side**. The website makes the smaller,
  faster versions for phones automatically.
- iPhone HEIC photos must be exported as JPG first.
- After adding a photo, update its `alt` text in `src/data/site.ts` so it
  describes what's actually in the photo.
- To add or remove portfolio photos, edit the `portfolio.items` list in
  `src/data/site.ts`.
