/**
 * Portfolio: category filters + PhotoSwipe lightbox.
 * PhotoSwipe is only downloaded the first time someone opens a photo.
 */
import type { SlideData } from 'photoswipe';
// Only the file's URL is imported here; the stylesheet itself is added on first open.
import photoswipeCssUrl from 'photoswipe/style.css?url';

/** Adds PhotoSwipe's stylesheet once and waits until it has loaded. */
let cssReady: Promise<void> | undefined;
const loadPhotoSwipeCss = () =>
  (cssReady ??= new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = photoswipeCssUrl;
    link.onload = () => resolve();
    link.onerror = () => {
      cssReady = undefined;
      reject(new Error('PhotoSwipe CSS failed to load'));
    };
    document.head.append(link);
  }));

const gallery = document.querySelector<HTMLElement>('[data-gallery]');

if (gallery) {
  const filters = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const items = Array.from(gallery.querySelectorAll<HTMLElement>('[data-gallery-item]'));
  const status = gallery.querySelector<HTMLElement>('[data-gallery-status]');

  // ── Filters ───────────────────────────────────────────────────────────────
  for (const button of filters) {
    button.addEventListener('click', () => {
      const value = button.dataset.filter ?? 'all';
      let count = 0;

      for (const b of filters) b.setAttribute('aria-pressed', String(b === button));
      for (const item of items) {
        const show = value === 'all' || item.dataset.category === value;
        item.hidden = !show;
        if (show) count++;
      }

      if (status) {
        status.textContent = (status.dataset.template ?? '{count}').replace('{count}', String(count));
      }
    });
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────
  const escapeHtml = (text: string) =>
    text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

  const cameraIcon =
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>';

  /** Turns a gallery item into a PhotoSwipe slide (a real photo, or the placeholder box). */
  const toSlide = (item: HTMLElement): SlideData => {
    const trigger = item.querySelector<HTMLElement>('[data-gallery-open]')!;
    const { pswpSrc, pswpSrcset, pswpWidth, pswpHeight, placeholderLabel } = trigger.dataset;

    if (pswpSrc) {
      return {
        src: pswpSrc,
        srcset: pswpSrcset,
        width: Number(pswpWidth),
        height: Number(pswpHeight),
        alt: trigger.querySelector('img')?.alt ?? '',
        element: trigger,
      };
    }
    return {
      html: `<div class="pswp-placeholder"><div role="img" aria-label="Photo placeholder: ${escapeHtml(placeholderLabel ?? '')}">${cameraIcon}<span>${escapeHtml(placeholderLabel ?? 'Photo placeholder')}</span></div></div>`,
    };
  };

  let opening = false;

  gallery.addEventListener('click', async (event) => {
    const trigger = (event.target as Element).closest<HTMLElement>('[data-gallery-open]');
    if (!trigger) return;
    // Let Ctrl/Cmd-click open the full photo in a new tab as usual
    if (event instanceof MouseEvent && (event.metaKey || event.ctrlKey || event.shiftKey)) return;

    event.preventDefault();
    if (opening) return;
    opening = true;

    try {
      // Only photos visible under the current filter go into the lightbox
      const visible = items.filter((item) => !item.hidden);
      const index = Math.max(
        0,
        visible.findIndex((item) => item.contains(trigger)),
      );

      const [{ default: PhotoSwipe }] = await Promise.all([import('photoswipe'), loadPhotoSwipeCss()]);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const pswp = new PhotoSwipe({
        dataSource: visible.map(toSlide),
        index,
        bgOpacity: 1,
        showHideAnimationType: reduceMotion ? 'none' : 'fade',
        showAnimationDuration: reduceMotion ? 0 : 250,
        hideAnimationDuration: reduceMotion ? 0 : 250,
        zoomAnimationDuration: reduceMotion ? 0 : 300,
        closeTitle: 'Close (Esc)',
        zoomTitle: 'Zoom in or out',
        arrowPrevTitle: 'Previous photo',
        arrowNextTitle: 'Next photo',
        errorMsg: 'Sorry, this photo could not be loaded.',
        returnFocus: true,
        trapFocus: true,
      });

      pswp.on('afterInit', () => {
        pswp.element?.setAttribute('aria-label', 'Photo viewer');
      });
      pswp.init();
    } catch (error) {
      // If the lightbox can't load (e.g. offline), fall back to opening the photo directly
      console.error('Lightbox failed to open', error);
      if (trigger instanceof HTMLAnchorElement) window.location.href = trigger.href;
    } finally {
      opening = false;
    }
  });
}
