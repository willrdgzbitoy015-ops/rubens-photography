/**
 * Hero slideshow: cross-fades the cover photos.
 *
 * Timing comes from CSS: each photo slowly zooms out (the "ken-burns"
 * animation in global.css, --slide-duration long), and the next photo fades
 * in when that zoom ends. So pausing (hero scrolled out of view, hidden tab)
 * is just pausing the CSS animation.
 * With "reduce motion" switched on there's no animation: the first photo
 * simply stays.
 *
 * Without JavaScript only the first photo shows.
 */

const root = document.querySelector<HTMLElement>('[data-slideshow]');
if (root) setUp(root);

function setUp(root: HTMLElement) {
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  if (slides.length < 2) return;

  const FADE_MS = 1600; // keep in sync with .hero-slide's opacity transition
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // nothing moves, so nothing to do

  let current = 0;
  let fadeTimer: number | undefined;

  /** Un-hides a slide so its photo starts downloading (hidden photos aren't fetched). */
  const prepare = (index: number) => {
    const slide = slides[index % slides.length];
    if (slide.hidden) slide.hidden = false;
  };

  function showNext() {
    const next = (current + 1) % slides.length;
    const outgoing = slides[current];
    const incoming = slides[next];

    // A slide that was hidden until now needs one frame as "visible but
    // transparent" before it fades in.
    if (incoming.hidden) {
      incoming.hidden = false;
      void incoming.offsetWidth;
    }

    for (const slide of slides) slide.removeAttribute('data-prev');
    outgoing.removeAttribute('data-active');
    outgoing.setAttribute('data-prev', ''); // stays visible underneath while the new photo fades in
    outgoing.setAttribute('aria-hidden', 'true');
    incoming.setAttribute('data-active', '');
    incoming.removeAttribute('aria-hidden');

    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => outgoing.removeAttribute('data-prev'), FADE_MS);

    current = next;
    prepare(next + 1); // fetch the photo after this one
  }

  // Next photo when the photo on screen has finished its slow zoom.
  root.addEventListener('animationend', (event) => {
    if (event.animationName !== 'ken-burns') return;
    if ((event.target as Element).closest('[data-slide]') === slides[current]) showNext();
  });

  // Save battery: no animating while the hero is scrolled away or the tab is hidden
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => root.toggleAttribute('data-offscreen', !entry.isIntersecting)).observe(root);
  }
  document.addEventListener('visibilitychange', () => root.toggleAttribute('data-tab-hidden', document.hidden));

  // Fetch the second photo once the page itself has finished loading
  if (document.readyState === 'complete') prepare(1);
  else window.addEventListener('load', () => prepare(1), { once: true });
}

export {}; // a module: keeps these names private to this file
