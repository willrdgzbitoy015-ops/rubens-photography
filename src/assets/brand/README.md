# Logo files

| File | What it is | Where it shows |
| --- | --- | --- |
| `logo.png` | Ruben's original logo (white background) | Not used directly. The master copy everything else is made from |
| `logo-mark-inks.png` | The "R" mark with no background, split into its three colors | Navbar and loading screen |
| `logo-full-inks.png` | The full logo (R + Baybayin + tagline), split the same way | Footer |
| `logo-mark.png`, `logo-full.png` | The same two logos with the white removed, in their true colors | Not used on the site. Handy for posts, prints or watermarks |
| `baybayin.png` | Just the Baybayin lettering ("ruben potograpya") cut from `logo.png`, white on transparent | Tagline band above About. The site uses it as a mask and colors it tan |

## Why the logo is split into colors

The site has a light and a dark theme, so the logo can't have a background of
its own. Each `-inks.png` file holds the logo's dark brown, tan and black side
by side (white on transparent). The site paints each one with a color from
`src/styles/global.css` (`--color-logo-brown`, `--color-logo-tan`, `--color-logo-black`):

- **Light theme:** the logo's true colors.
- **Dark theme, the hero photo and the loading screen:** the dark brown and black
  turn cream; the tan stays tan.

The browser-tab icon (`public/favicon.svg`), the iPhone home-screen icon
(`public/apple-touch-icon.png`) and the Facebook share image (`public/og-image.jpg`)
use the "R" mark on a cream square, since they show up on all kinds of backgrounds.

**If the logo changes:** replace `logo.png` (same name, white background), then
run `npm run logo-inks` to remake the two `-inks.png` files. If a file is missing,
the site shows the text "Ruben's *Photography*" instead.
