/**
 * Navbar: solid background after scrolling + full-screen mobile menu.
 */

const header = document.getElementById('site-header');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobile-menu');

// ── Solid navbar once the page is scrolled ──────────────────────────────────
if (header) {
  let scrolled: boolean | null = null;
  const update = () => {
    const next = window.scrollY > 24;
    if (next !== scrolled) {
      scrolled = next;
      header.toggleAttribute('data-scrolled', next);
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Mobile menu ─────────────────────────────────────────────────────────────
if (toggle && menu) {
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  // While the menu is open, the rest of the page can't be reached with Tab
  // or a screen reader. The header stays usable so the close button works.
  const background = () => document.querySelectorAll<HTMLElement>('main, footer, .skip-link');

  const setOpen = (open: boolean, { restoreFocus = false } = {}) => {
    if (open === isOpen()) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.documentElement.classList.toggle('menu-open', open);
    background().forEach((el) => (el.inert = open));

    if (open) {
      menu.querySelector<HTMLAnchorElement>('a')?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Close when any link in the menu (or the logo) is tapped
  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.querySelector('[data-brand-link]')?.addEventListener('click', () => setOpen(false));

  // Close with Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, { restoreFocus: true });
  });

  // Close if the screen is resized to desktop width (the menu is hidden there)
  window.matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
