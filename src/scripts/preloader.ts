/**
 * Loading screen (src/components/Preloader.astro).
 *
 * Fills a thin progress line while the fonts, the first hero photo and the
 * page finish loading (at least ~0.7s so it never just flickers, at most 4s so
 * a slow connection never keeps people waiting), then fades the screen away
 * and starts the hero's entrance animation.
 *
 * Safety nets: the screen only exists once JavaScript runs, and BaseLayout's
 * inline script hides it after 6s even if this file never loads.
 */

const root = document.documentElement;
const loader = document.querySelector<HTMLElement>('[data-preloader]');

if (!loader) root.classList.remove('is-preloading');
else run(loader);

function run(loader: HTMLElement) {
  const MIN_MS = 700;
  const MAX_MS = 4000;
  const start = performance.now();

  // What the progress line waits for
  const heroImage = document.querySelector<HTMLImageElement>('.hero-slide[data-active] img');
  const tasks: Promise<unknown>[] = [
    document.fonts?.ready ?? Promise.resolve(),
    heroImage ? imageReady(heroImage) : Promise.resolve(),
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve, { once: true })),
  ];
  let finishedTasks = 0;
  for (const task of tasks) task.finally(() => finishedTasks++);

  let shown = 0;

  const tick = (now: number) => {
    const elapsed = now - start;
    const ready = finishedTasks === tasks.length || elapsed > MAX_MS;
    // Each finished task moves the line on; time alone creeps it forward a little
    const target = ready ? 100 : (finishedTasks / tasks.length) * 88 + Math.min(elapsed / MAX_MS, 1) * 10;
    shown += (target - shown) * (ready ? 0.16 : 0.06);
    loader.style.setProperty('--progress', shown.toFixed(2));

    if (ready && shown >= 99.5 && elapsed >= MIN_MS) finish();
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  function finish() {
    root.classList.remove('is-preloading'); // the hero's entrance plays as the screen fades
    loader.classList.add('is-fading');
    window.setTimeout(() => loader.remove(), 550);
  }
}

/** Resolves once the photo has loaded (or failed) and is ready to paint. */
function imageReady(img: HTMLImageElement): Promise<void> {
  const loaded = img.complete
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
  return loaded.then(() => img.decode?.().catch(() => undefined));
}

export {}; // a module: keeps these names private to this file
