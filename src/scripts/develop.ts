/**
 * Photos fade in as they appear: each photo marked `data-develop` stays
 * invisible (its frame is a plain soft box) until it has loaded AND scrolled
 * into view, then fades in. All styling is in global.css (search for "develop").
 *
 * Without JavaScript the photos simply show (the CSS needs the `js` class).
 */

const images = document.querySelectorAll<HTMLImageElement>('img[data-develop]');

const develop = (img: HTMLImageElement) => img.classList.add('is-developed');

const whenLoaded = (img: HTMLImageElement, callback: () => void) => {
  if (img.complete) {
    callback();
    return;
  }
  img.addEventListener('load', callback, { once: true });
  img.addEventListener('error', callback, { once: true }); // show the alt text rather than an empty frame
};

if (!('IntersectionObserver' in window)) {
  images.forEach(develop);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target as HTMLImageElement;
        observer.unobserve(img);
        whenLoaded(img, () => develop(img));
      }
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.1 },
  );
  images.forEach((img) => observer.observe(img));
}

export {}; // a module: keeps these names private to this file
