/**
 * Small interactive effects. Each one is skipped where it doesn't make sense:
 * mouse-only effects never run on phones and tablets, and anything that
 * moves on its own is skipped when the visitor has asked for reduced motion.
 *
 *  1. Card spotlight   a soft tan light follows the mouse across cards
 *  2. Viewfinder cursor a ring trails the mouse; over a photo it becomes a
 *                       3:2 camera viewfinder that "focuses", with "View"
 *  3. Magnetic buttons buttons lean a few pixels toward the mouse
 *  4. Marquee          the scrolling words speed up, lean, and follow the
 *                       direction you scroll
 *  5. Count-up         the About numbers count up when they come into view
 */

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer) {
  cardSpotlight();
  magneticButtons();
  if (!reduceMotion) viewfinderCursor();
}
if (!reduceMotion) {
  marqueeVelocity();
  countUp();
}

// ── 1. Card spotlight (drawn by .card-hover::before in global.css) ──────────
function cardSpotlight() {
  document.addEventListener(
    'pointermove',
    (event) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>('.card-hover');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}

// ── 2. Viewfinder cursor ─────────────────────────────────────────────────────
function viewfinderCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML =
    '<span class="cursor-ring"><span class="cursor-corner"></span><span class="cursor-corner"></span><span class="cursor-corner"></span><span class="cursor-corner"></span><span class="cursor-cross"></span><span class="cursor-label">View</span></span>';
  document.body.append(cursor);
  document.documentElement.classList.add('has-cursor');

  const ring = cursor.firstElementChild as HTMLElement;
  let x = 0;
  let y = 0;
  let ringX = 0;
  let ringY = 0;
  let frame = 0;
  let state = '';

  // The ring eases after the mouse instead of sticking to it
  const follow = () => {
    ringX += (x - ringX) * 0.22;
    ringY += (y - ringY) * 0.22;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    frame = Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1 ? requestAnimationFrame(follow) : 0;
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (!cursor.classList.contains('is-active')) {
        // first move: start right under the mouse
        ringX = x;
        ringY = y;
        cursor.classList.add('is-active');
      }
      if (!frame) frame = requestAnimationFrame(follow);
      updateState(event.target as Element);
    },
    { passive: true },
  );

  // Viewfinder over photos, bigger ring over links and buttons
  const updateState = (target: Element | null) => {
    const next = target?.closest('.photo-trigger')
      ? 'photo'
      : target?.closest('a, button, summary, label, [role="button"]')
        ? 'link'
        : '';
    if (next === state) return;
    state = next;
    if (next) cursor.dataset.state = next;
    else delete cursor.dataset.state;
  };

  // Scrolling moves the page under a still mouse: check what's under it now
  let scrollFrame = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollFrame || !cursor.classList.contains('is-active')) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateState(document.elementFromPoint(x, y));
      });
    },
    { passive: true },
  );

  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  window.addEventListener('pointerdown', () => cursor.setAttribute('data-pressed', ''));
  window.addEventListener('pointerup', () => cursor.removeAttribute('data-pressed'));
}

// ── 3. Magnetic buttons ──────────────────────────────────────────────────────
function magneticButtons() {
  const MAX = 7; // px
  const clamp = (n: number) => Math.max(-MAX, Math.min(MAX, n));
  document.querySelectorAll<HTMLElement>('.btn, .theme-toggle').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || reduceMotion) return;
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      button.style.translate = `${clamp(dx * 0.15)}px ${clamp(dy * 0.3)}px`;
    });
    button.addEventListener('pointerleave', () => (button.style.translate = ''));
  });
}

// ── 4. Marquee follows the scroll ────────────────────────────────────────────
function marqueeVelocity() {
  const marquee = document.querySelector<HTMLElement>('.marquee');
  const track = marquee?.querySelector<HTMLElement>('.marquee-track');
  const animation = track?.getAnimations()[0];
  if (!marquee || !animation) return;

  // Start deep into the (endless) loop so it can also run backwards
  const duration = Number(animation.effect?.getComputedTiming().duration) || 40000;
  animation.currentTime = duration * 1000;

  let lastY = window.scrollY;
  let velocity = 0;
  let direction = 1;
  let rate = 1;
  let frame = 0;

  const settle = () => {
    velocity *= 0.9;
    const target = direction * (1 + Math.min(Math.abs(velocity) / 6, 5));
    rate += (target - rate) * 0.12;
    animation.playbackRate = rate;
    const skew = Math.max(-10, Math.min(10, velocity * -0.35));
    marquee.style.setProperty('--skew', `${skew.toFixed(2)}deg`);

    if (Math.abs(velocity) > 0.05 || Math.abs(rate - direction) > 0.01) {
      frame = requestAnimationFrame(settle);
    } else {
      animation.playbackRate = direction;
      marquee.style.setProperty('--skew', '0deg');
      frame = 0;
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
      if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
      if (!frame) frame = requestAnimationFrame(settle);
    },
    { passive: true },
  );
}

// ── 5. Count-up numbers ──────────────────────────────────────────────────────
function countUp() {
  const items = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!items.length || !('IntersectionObserver' in window)) return;

  const run = (el: HTMLElement) => {
    const final = el.textContent?.trim() ?? '';
    const match = final.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/); // e.g. "", "7.7", "K"
    if (!match) return;
    const [, before, number, after] = match;
    const target = parseFloat(number);
    const decimals = number.split('.')[1]?.length ?? 0;
    const start = performance.now();
    const DURATION = 1600;

    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - p) ** 4;
      el.textContent = p < 1 ? `${before}${(target * eased).toFixed(decimals)}${after}` : final;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );
  items.forEach((el) => observer.observe(el));
}

export {}; // a module: keeps these names private to this file
