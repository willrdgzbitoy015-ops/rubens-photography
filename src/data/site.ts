/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.ts — ALL website text, contact details and settings live here.
 *  Components only read from this file, so this is the only file you need to
 *  edit to change what the website says.
 *
 *  • Anything in [square brackets] is a placeholder — replace it (brackets too).
 *  • Photo paths are relative to src/assets/photos/. If a photo file doesn't
 *    exist yet, the site shows a gray placeholder box in its place.
 *  • Text wrapped in *asterisks* is shown in gold italics (used in headlines).
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Basics ───────────────────────────────────────────────────────────────────

const brand = "Ruben's Photography";
const photographer = 'Ruben';

const contact = {
  phoneDisplay: '0997 721 4340',
  phoneHref: 'tel:+639977214340',
  smsHref: 'sms:+639977214340',
  phoneIntl: '+639977214340',
  email: 'rubenagosto68@gmail.com',
};

const social = {
  /** Ruben's Facebook Page */
  facebook: 'https://www.facebook.com/profile.php?id=100082353385538',
  instagram: '[Instagram link]',
  /** Messenger chat link, e.g. https://m.me/yourpagename. Every "book" button opens this. */
  messenger: '[Messenger link]',
};

/**
 * Where every booking button goes (Book Now, Book a Shoot, Message me on Messenger):
 * the Messenger link, or the Facebook Page until the Messenger link is filled in.
 */
const bookingUrl = /^\[.*\]$/.test(social.messenger.trim()) ? social.facebook : social.messenger;

const location = {
  town: 'Palompon',
  province: 'Leyte',
  countryCode: 'PH',
  serviceArea: '[service area]', // e.g. "Leyte and Biliran"
};

const years = '[YEARS]';

// Shoot types, used by the Services cards.
const shootTypes = ['Debut', 'Pre-debut Shoot', 'Birthdays', 'Events'];

// ── Types ────────────────────────────────────────────────────────────────────

export type Category = 'debut' | 'birthday' | 'events' | 'portrait';
export type Orientation = 'vertical' | 'horizontal' | 'square';

export interface Photo {
  /** Path relative to src/assets/photos/, e.g. "portfolio/debut-01.jpg" */
  file: string;
  /** Describe the photo for people who can't see it (screen readers, slow connections). */
  alt: string;
  /** Text shown on the gray box until the real photo is added. */
  placeholder: string;
}

export interface PortfolioItem {
  file: string;
  category: Category;
  alt: string;
  /** Only used for the placeholder box shape — real photos keep their own shape. */
  orientation: Orientation;
}

// ── Everything the website shows ─────────────────────────────────────────────

export const site = {
  brand,
  photographer,
  /** Brand name as text, next to the logo mark in the navbar. *Italic* part is gold. */
  wordmark: "Ruben's *Photography*",
  tagline: 'Moments, captured. Forever.',
  contact,
  social,
  bookingUrl,
  location,

  /**
   * Logo files in src/assets/brand/. Ruben's original is logo.png (white
   * background); the two files below were made from it with the white removed,
   * and are shown on a cream badge so the logo's own colors stay true on the
   * dark site. If a file is missing, the text wordmark is shown instead.
   */
  logo: {
    /** The "R" mark only — navbar badge */
    mark: 'logo-mark.png',
    /** Full logo with the Baybayin name and tagline — footer */
    full: 'logo-full.png',
    fullAlt: "Ruben's Photography logo: a stylized R with a camera aperture and film strip, the name in Baybayin, and the tagline “Moments, captured. Forever.”",
  },

  // ── SEO & Facebook sharing ─────────────────────────────────────────────────
  seo: {
    title: "Ruben's Photography | Debut, Birthday & Event Photographer in Palompon, Leyte",
    description:
      'Debut, birthday and event photography in Palompon, Leyte. Browse the portfolio, then message Ruben on Facebook to book your date.',
    ogImage: '/og-image.jpg', // file in /public, 1200×630
    ogImageAlt: "Ruben's Photography — debut, birthday and event photographer in Palompon, Leyte",
    locale: 'en_PH',
    themeColor: '#0e0e0d',
  },

  // ── Navbar ─────────────────────────────────────────────────────────────────
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  /** Opens Messenger (or the Facebook Page) in a new tab */
  navCta: { label: 'Book Now', href: bookingUrl },

  // ── 1. Hero ────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: `${location.town}, ${location.province} · Photographer`,
    headline: "Life's biggest moments, *remembered beautifully*.",
    tagline:
      'Debuts, birthdays and celebrations photographed with heart — so you can relive every smile, every tear and every dance for years to come.',
    primaryCta: { label: 'View My Work', href: '#portfolio' },
    /** Opens Messenger (or the Facebook Page) in a new tab */
    secondaryCta: { label: 'Book a Shoot', href: bookingUrl },
    scrollLabel: 'Scroll',
    photo: {
      file: 'hero.jpg',
      alt: 'A debutante in her gown smiling during her debut celebration',
      placeholder: 'Hero photo — horizontal, 2400px wide',
    } satisfies Photo,
    /** Which part of the hero photo to keep visible on narrow phone screens (CSS object-position). */
    photoFocus: 'center 35%',
  },

  // ── 2. Marquee strip ───────────────────────────────────────────────────────
  marquee: ['Debut', 'Pre-debut', 'Birthdays', 'Events', 'Portraits', 'Weddings'],

  // ── 3. Featured shoot ──────────────────────────────────────────────────────
  featured: {
    eyebrow: 'Featured Shoot',
    title: 'A night of *eighteen roses*',
    meta: 'Debut · Palompon, Leyte',
    // PLACEHOLDER STORY — replace with the real story behind this shoot,
    // then set storyIsPlaceholder to false.
    story:
      'From the grand entrance to the very last of the eighteen roses, this debut was full of happy tears, loud laughter and quiet in-between moments. Here is how the night unfolded, told one frame at a time.',
    storyIsPlaceholder: true,
    link: { label: 'See the full portfolio', href: '#portfolio' },
    photo: {
      file: 'featured/featured.jpg',
      alt: 'A debutante dancing with her father during the eighteen roses',
      placeholder: 'Featured photo — horizontal, 1600px wide',
    } satisfies Photo,
  },

  // ── 4. Services ────────────────────────────────────────────────────────────
  services: {
    eyebrow: 'Services',
    title: 'What I *photograph*',
    intro: 'Every celebration has its own rhythm. I adapt to yours.',
    items: [
      { title: shootTypes[0], text: 'Your 18th, from the grand entrance to the last dance.' },
      { title: shootTypes[1], text: 'A styled session for invitations, tarpaulins and your debut AVP.' },
      { title: shootTypes[2], text: 'From first birthdays to milestone parties, full of color and fun.' },
      { title: shootTypes[3], text: 'Reunions, christenings, company parties and everything in between.' },
    ],
  },

  // ── 5. Portfolio ───────────────────────────────────────────────────────────
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Stories told in *light*',
    intro: 'A few favorite frames from recent celebrations. Tap any photo to view it full size.',
    filters: [
      { label: 'All', value: 'all' },
      { label: 'Debut', value: 'debut' },
      { label: 'Birthday', value: 'birthday' },
      { label: 'Events', value: 'events' },
      { label: 'Portrait', value: 'portrait' },
    ],
    /** Read out to screen readers after filtering. {count} is replaced automatically. */
    statusTemplate: 'Showing {count} photos',
    // 12 photos. Put the files in src/assets/photos/portfolio/ with these names,
    // and update each alt text so it describes the actual photo.
    items: [
      { file: 'portfolio/debut-01.jpg', category: 'debut', orientation: 'vertical', alt: 'Debutante in her ball gown making her grand entrance' },
      { file: 'portfolio/birthday-01.jpg', category: 'birthday', orientation: 'horizontal', alt: 'Child blowing out the candles on a birthday cake' },
      { file: 'portfolio/events-01.jpg', category: 'events', orientation: 'horizontal', alt: 'Guests raising a toast at an evening celebration' },
      { file: 'portfolio/portrait-01.jpg', category: 'portrait', orientation: 'vertical', alt: 'Outdoor portrait in soft golden-hour light' },
      { file: 'portfolio/debut-02.jpg', category: 'debut', orientation: 'horizontal', alt: 'The eighteen roses dance at a debut' },
      { file: 'portfolio/birthday-02.jpg', category: 'birthday', orientation: 'vertical', alt: 'Birthday celebrant laughing with family' },
      { file: 'portfolio/debut-03.jpg', category: 'debut', orientation: 'square', alt: "Close-up of a debutante's tiara and gown details" },
      { file: 'portfolio/events-02.jpg', category: 'events', orientation: 'vertical', alt: 'Candid moment on the dance floor' },
      { file: 'portfolio/portrait-02.jpg', category: 'portrait', orientation: 'horizontal', alt: 'Portrait by the sea at sunset' },
      { file: 'portfolio/birthday-03.jpg', category: 'birthday', orientation: 'horizontal', alt: 'Party table decorated with balloons and a birthday cake' },
      { file: 'portfolio/events-03.jpg', category: 'events', orientation: 'square', alt: 'Decorated reception venue before guests arrive' },
      { file: 'portfolio/debut-04.jpg', category: 'debut', orientation: 'vertical', alt: 'Debutante sharing a quiet moment with her parents' },
    ] satisfies PortfolioItem[],
  },

  // ── 6. About ───────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'About',
    title: `Hi, I'm *${photographer}*`,
    // PLACEHOLDER BIO — replace with Ruben's real bio, then set bioIsPlaceholder to false.
    bio: [
      `I'm ${photographer}, a photographer based in ${location.town}, ${location.province}. For ${years} years I've been photographing debuts, birthdays and celebrations — the grand entrances, the happy tears and all the little moments in between.`,
      "My style is natural and cinematic. I'll guide you when you need it, then step back and let the day unfold, so your photos feel like you.",
    ],
    bioIsPlaceholder: true,
    stats: [
      { value: `${years}+`, label: 'Years of experience' },
      { value: '7.7K', label: 'Facebook followers' },
      { value: '100%', label: 'Recommend (10 reviews)' },
    ],
    serviceArea: `Based in ${location.town}, ${location.province}. Available across ${location.serviceArea}.`,
    photo: {
      file: 'about.jpg',
      alt: `${photographer}, the photographer behind ${brand}, camera in hand`,
      placeholder: 'Photo of Ruben — vertical, 1200px wide',
    } satisfies Photo,
  },

  // ── 7. How it works ────────────────────────────────────────────────────────
  process: {
    eyebrow: 'How It Works',
    title: 'From hello to *your gallery*',
    steps: [
      { title: 'Message Me', text: 'Send your date, location and type of shoot on Messenger.' },
      { title: 'Planning', text: 'We go over your theme, venue, timeline and must-have shots.' },
      { title: 'Shoot Day', text: 'I capture the big moments and the candid ones in between.' },
      { title: 'Photo Delivery', text: 'Your edited photos arrive ready to share, print and treasure.' },
    ],
  },

  // ── 8. Contact (#contact) — bookings happen on Facebook / Messenger ────────
  contactSection: {
    eyebrow: 'Get in touch',
    title: "Let's plan your *shoot*",
    intro: "Message me on Facebook with your date, location and type of shoot, and I'll send you a quote.",
    /** Big button — opens Messenger (or the Facebook Page) in a new tab */
    primaryCta: 'Message me on Messenger',
    facebookLabel: 'Facebook Page',
    phoneLabel: `Call or text ${contact.phoneDisplay}`,
    callLabel: 'Call',
    textLabel: 'Text',
    emailLabel: 'Email',
    replyNote: 'I usually reply within 24 hours.',
  },

  // ── 9. Testimonials ───────────────────────────────────────────────────────
  // PLACEHOLDERS — paste real client reviews (with permission), then set
  // isPlaceholder to false. Never publish made-up reviews.
  testimonials: {
    eyebrow: 'Kind Words',
    title: 'What clients *say*',
    summary: '100% recommend · 10 reviews on Facebook',
    summaryLink: { label: 'Read the reviews', href: social.facebook },
    isPlaceholder: true,
    items: [
      {
        quote: '[Placeholder review] Paste a real client review here — for example, what they loved most about their debut photos.',
        name: '[Client name]',
        shoot: 'Debut',
      },
      {
        quote: '[Placeholder review] Short, specific reviews work best: the occasion, how the shoot felt, and how the photos turned out.',
        name: '[Client name]',
        shoot: 'Birthday',
      },
      {
        quote: "[Placeholder review] You can copy reviews from the Reviews tab on Ruben's Facebook page — ask the client first.",
        name: '[Client name]',
        shoot: 'Event',
      },
    ],
  },

  // ── 10. FAQ ────────────────────────────────────────────────────────────────
  // PLACEHOLDER ANSWERS — confirm each answer with Ruben, then set
  // answersArePlaceholder to false.
  faq: {
    eyebrow: 'FAQ',
    title: 'Good to *know*',
    intro: "Can't find your answer? Send me a message — I'm happy to help.",
    answersArePlaceholder: true,
    items: [
      {
        q: 'How far ahead should I book?',
        a: 'Most clients book [X] months ahead, especially for debuts and weekend events. For birthdays and smaller shoots, a few weeks is often enough — send me your date and I’ll check if it’s free.',
      },
      {
        q: 'How much does a shoot cost?',
        a: 'It depends on the location, the number of hours and the coverage you need. Message me with your date and location and I’ll send you a quote.',
      },
      {
        q: 'When will I get my photos?',
        a: 'You’ll get a few sneak peeks soon after your shoot, and I’ll confirm when your full set of edited photos will be ready when you book.',
      },
      {
        q: 'How do I book?',
        a: 'Just message me on Facebook or Messenger with your date, location and type of shoot. I’ll let you know if I’m available and send you a quote.',
      },
    ],
  },

  // ── 11. Footer ─────────────────────────────────────────────────────────────
  footer: {
    line: 'Debut, birthday and event photography from Palompon, Leyte.',
    backToTop: 'Back to top',
  },

  // Small labels shown on placeholder text so it's easy to spot before launch.
  placeholderNote: 'Placeholder text — edit in src/data/site.ts',
};

export type Site = typeof site;
