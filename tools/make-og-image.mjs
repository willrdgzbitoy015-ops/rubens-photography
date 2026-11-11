/**
 * Makes public/og-image.jpg (the picture Facebook shows when the link is shared)
 * as a 1200×630 crop of src/assets/photos/hero.jpg.
 *
 *   npm run og-image
 *
 * Run it once after adding or changing hero.jpg, then commit the new og-image.jpg.
 * Uses sharp, which comes with Astro.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const input = fileURLToPath(new URL('../src/assets/photos/hero.jpg', import.meta.url));
const output = fileURLToPath(new URL('../public/og-image.jpg', import.meta.url));

if (!existsSync(input)) {
  console.error('No hero photo yet: add src/assets/photos/hero.jpg first. public/og-image.jpg was not changed.');
  process.exit(1);
}

await sharp(input)
  .rotate() // respect the camera's orientation
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention }) // keeps the most interesting part
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(output);

console.log('Saved public/og-image.jpg (1200×630) from hero.jpg');
