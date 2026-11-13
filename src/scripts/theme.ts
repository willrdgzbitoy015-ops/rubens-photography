/**
 * Light / dark switch (the sun/moon button in the navbar).
 *
 * The theme is set before the page paints by the inline script in
 * BaseLayout.astro (saved choice, or site.ts → theme.default). This script
 * only handles the button: the new theme spreads out in a circle from where
 * you clicked (View Transitions; browsers without them just switch), and the
 * choice is remembered for next time.
 */

const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

type Theme = 'light' | 'dark';
const current = (): Theme => (root.dataset.theme === 'light' ? 'light' : 'dark');

const updateLabels = () => {
  const label = current() === 'light' ? 'Switch to dark background' : 'Switch to light background';
  buttons.forEach((button) => button.setAttribute('aria-label', label));
};

const apply = (theme: Theme) => {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // private mode or storage blocked: the switch still works for this visit
  }
  if (themeColor?.dataset[theme]) themeColor.content = themeColor.dataset[theme]!;
  updateLabels();
};

const toggle = (button: HTMLElement) => {
  const next: Theme = current() === 'light' ? 'dark' : 'light';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof document.startViewTransition !== 'function') {
    apply(next);
    return;
  }

  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => apply(next));
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => undefined);
};

updateLabels();
buttons.forEach((button) => button.addEventListener('click', () => toggle(button)));

export {}; // a module: keeps these names private to this file
