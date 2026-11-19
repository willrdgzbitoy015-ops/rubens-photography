/**
 * Splits Ruben's logo (src/assets/brand/logo.png, inks on white) into its three
 * inks — dark brown, tan and black — so the site can color each one with CSS
 * and the logo fits both the light and the dark theme without a white box.
 *
 *   npm run logo-inks
 *
 * Writes two "ink sheets" to src/assets/brand/:
 *   logo-mark-inks.png  just the "R" mark       (navbar, loading screen)
 *   logo-full-inks.png  R + Baybayin + tagline  (footer)
 * Each sheet holds three tiles side by side — brown | tan | black — white on
 * transparent. global.css (.logo-art) uses them as masks and fills them with
 * the --color-logo-* tokens.
 *
 * How it works: every solid shape (letter part, glyph, film strip…) is given
 * the ink its average color is closest to, then its soft anti-aliased edge
 * pixels inherit that ink, and each pixel's opacity is measured against the
 * white background. Only rerun this if logo.png changes.
 */
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const brandDir = fileURLToPath(new URL('../src/assets/brand/', import.meta.url));
// The lettering is a deeper brown than the R; it goes on the brown tile too.
const INKS = [
  { name: 'brown', rgb: [61, 35, 20] }, // #3d2314
  { name: 'tan', rgb: [167, 123, 79] }, // #a77b4f
  { name: 'black', rgb: [8, 8, 8] },
];
const [BROWN, TAN, BLACK] = [0, 1, 2];
const PAD = 6; // transparent margin around each tile, so tiles never bleed into each other when resized

const { data, info } = await sharp(brandDir + 'logo.png').removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const N = W * H;
const darkness = (i) => 765 - (data[i * 3] + data[i * 3 + 1] + data[i * 3 + 2]);

// 1. Solid shapes: clearly inked pixels, grouped into connected shapes
const CORE = 200;
const shape = new Int32Array(N).fill(-1);
const shapes = [];
for (let start = 0; start < N; start++) {
  if (shape[start] !== -1 || darkness(start) < CORE) continue;
  const id = shapes.length;
  let redInk = 0;
  let blueInk = 0;
  const dark = [];
  const stack = [start];
  shape[start] = id;
  while (stack.length) {
    const p = stack.pop();
    redInk += 255 - data[p * 3];
    blueInk += 255 - data[p * 3 + 2];
    dark.push(darkness(p));
    const x = p % W;
    const y = (p / W) | 0;
    for (const q of [x > 0 && p - 1, x < W - 1 && p + 1, y > 0 && p - W, y < H - 1 && p + W]) {
      if (q !== false && shape[q] === -1 && darkness(q) >= CORE) {
        shape[q] = id;
        stack.push(q);
      }
    }
  }
  // Judged by hue and by the shape's darkest pixels, not its average color:
  // thin shapes (letters, aperture blades) are mostly soft edge, so their
  // average looks lighter than the ink really is.
  //  - tan takes away much more blue than red from the white (ratio ≈ 2.0;
  //    brown ≈ 1.2, black and the dark lettering ≈ 1.0–1.1)
  //  - black is darker than any brown, including the lettering's deep brown
  dark.sort((a, b) => a - b);
  const core = dark[Math.floor(dark.length * 0.9)];
  shapes.push(blueInk / redInk > 1.6 ? TAN : core >= 715 ? BLACK : BROWN);
}

// 2. Soft edges take the ink of the nearest solid shape (up to 4px away)
const ink = new Int8Array(N).fill(-1);
const dist = new Uint8Array(N).fill(255);
let frontier = [];
for (let p = 0; p < N; p++) {
  if (shape[p] !== -1) {
    ink[p] = shapes[shape[p]];
    dist[p] = 0;
    frontier.push(p);
  }
}
for (let step = 1; step <= 4 && frontier.length; step++) {
  const next = [];
  for (const p of frontier) {
    const x = p % W;
    for (const q of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, p - W, p + W]) {
      if (q < 0 || q >= N || dist[q] !== 255 || darkness(q) < 12) continue;
      dist[q] = step;
      ink[q] = ink[p];
      next.push(q);
    }
  }
  frontier = next;
}

// 3. Opacity of each pixel against white, for its ink
const alpha = new Float32Array(N);
for (let p = 0; p < N; p++) {
  if (ink[p] < 0) continue;
  const C = INKS[ink[p]].rgb;
  let num = 0;
  let den = 0;
  for (let c = 0; c < 3; c++) {
    num += (255 - data[p * 3 + c]) * (255 - C[c]);
    den += (255 - C[c]) ** 2;
  }
  let a = num / den;
  if (a < 0.04) a = 0;
  if (a > 0.96) a = 1;
  alpha[p] = a;
}

// 4. Crop boxes: the mark is the first block of inked rows; the full logo is everything
const rowHasInk = (y) => {
  for (let x = 0; x < W; x++) if (alpha[y * W + x] > 0) return true;
  return false;
};
const inkRows = [];
for (let y = 0; y < H; y++) if (rowHasInk(y)) inkRows.push(y);
let markBottom = inkRows[0];
for (const y of inkRows) {
  if (y - markBottom > 12) break; // a gap of white rows ends the mark
  markBottom = y;
}

function box(y0, y1) {
  let x0 = W;
  let x1 = 0;
  for (let y = y0; y <= y1; y++)
    for (let x = 0; x < W; x++)
      if (alpha[y * W + x] > 0) {
        x0 = Math.min(x0, x);
        x1 = Math.max(x1, x);
      }
  return { x0, y0, x1, y1 };
}

async function writeSheet(file, { x0, y0, x1, y1 }) {
  const tw = x1 - x0 + 1 + PAD * 2;
  const th = y1 - y0 + 1 + PAD * 2;
  const sheet = Buffer.alloc(tw * 3 * th * 4);
  for (let k = 0; k < INKS.length; k++) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const p = y * W + x;
        if (ink[p] !== k || alpha[p] === 0) continue;
        const o = ((y - y0 + PAD) * tw * 3 + k * tw + (x - x0 + PAD)) * 4;
        sheet[o] = sheet[o + 1] = sheet[o + 2] = 255;
        sheet[o + 3] = Math.round(alpha[p] * 255);
      }
    }
  }
  await sharp(sheet, { raw: { width: tw * 3, height: th, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(brandDir + file);
  console.log(`${file}: 3 tiles of ${tw}×${th}`);
}

await writeSheet('logo-mark-inks.png', box(inkRows[0], markBottom));
await writeSheet('logo-full-inks.png', box(inkRows[0], inkRows.at(-1)));
