import type { ImageMetadata } from 'astro';

type ImageModule = { default: ImageMetadata };

/**
 * Every image in src/assets/photos/ (any sub-folder), found at build time.
 * site.ts refers to photos by their path relative to that folder.
 */
const photoModules = import.meta.glob<ImageModule>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

/** Logo files in src/assets/brand/. */
const brandModules = import.meta.glob<ImageModule>(
  '/src/assets/brand/*.{svg,png,webp,jpg,jpeg,avif,SVG,PNG,WEBP,JPG,JPEG,AVIF}',
  { eager: true },
);

/** Returns the photo, or undefined if the file hasn't been added yet. */
export function getPhoto(file: string | undefined): ImageMetadata | undefined {
  if (!file) return undefined;
  return photoModules[`/src/assets/photos/${file.replace(/^\/+/, '')}`]?.default;
}

/** Returns the logo image, or undefined if the file hasn't been added yet. */
export function getBrandImage(file: string | undefined): ImageMetadata | undefined {
  if (!file) return undefined;
  return brandModules[`/src/assets/brand/${file.replace(/^\/+/, '')}`]?.default;
}

/**
 * Keeps only the widths that don't upscale the original photo, so small
 * originals don't produce blurry, oversized files.
 */
export function fitWidths(image: ImageMetadata, widths: number[]): number[] {
  const fitted = widths.filter((w) => w <= image.width);
  return fitted.length > 0 ? fitted : [image.width];
}
