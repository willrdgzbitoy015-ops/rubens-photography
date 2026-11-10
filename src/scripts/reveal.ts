/**
 * Gentle fade-up as sections scroll into view.
 * Content is only hidden once this script runs (the `reveal-ready` class),
 * so if JavaScript fails, everything is still visible. With reduced motion
 * turned on, the CSS never hides anything in the first place.
 */

const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window && elements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );

  // Anything already on screen (e.g. after a reload halfway down the page)
  // is shown straight away instead of flashing.
  const viewportBottom = window.innerHeight;
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportBottom && rect.bottom > 0) {
      el.classList.add('is-visible');
    } else {
      observer.observe(el);
    }
  }

  document.documentElement.classList.add('reveal-ready');
}
