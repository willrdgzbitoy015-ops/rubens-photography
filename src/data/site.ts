/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.ts — ALL website text, contact details and settings live here.
 *  Components only read from this file, so this is the only file you need to
 *  edit to change what the website says.
 *
 *  • Anything in [square brackets] is a placeholder — replace it (brackets too).
 *    While a section still has [placeholders], it shows a small dashed
 *    "Placeholder text" tag; the tag disappears once the brackets are gone.
 *  • Photo paths are relative to src/assets/photos/. If a photo file doesn't
 *    exist yet, the site shows a gray placeholder box in its place.
 *  • Text wrapped in *asterisks* is shown in tan italics (used in headlines).
 *  • No prices or payment details anywhere: quotes happen on Messenger.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { isPlaceholder } from '../utils/text';

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
  /** Shown in the footer only once it's a real link */
  instagram: '[Instagram link]',
  /** Messenger chat link, e.g. https://m.me/100082353385538. Every "book" button opens this. */
  messenger: '[Messenger link]',
};

/**
 * Where every booking button goes (Book Now, Book a Shoot, Ask for a Quote,
 * Message me on Messenger): the Messenger link, or the Facebook Page until
 * the Messenger link is filled in.
 */
const messengerIsSet = !isPlaceholder(social.messenger);
const bookingUrl = messengerIsSet ? social.messenger : social.facebook;
/** Used in the buttons' screen-reader label, e.g. "message Ruben on Messenger" */
const bookingVia = messengerIsSet ? 'Messenger' : 'Facebook';

const location = {
  town: 'Palompon',
  province: 'Leyte',
  countryCode: 'PH',
  serviceArea: '[service area]', // e.g. "Leyte and Biliran"
};

const years = '[YEARS]';

// ── Types ────────────────────────────────────────────────────────────────────

export type Category = 'wedding' | 'prenup' | 'debut' | 'birthday' | 'events';
export type Orientation = 'vertical' | 'horizontal' | 'square';

export interface Photo {
  /** Path relative to src/assets/photos/, e.g. "featured/01.jpg" */
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
  /** Brand name as text, next to the logo mark in the navbar. *Italic* part is tan. */
  wordmark: "Ruben's *Photography*",
  tagline: 'Moments, captured. Forever.',
  contact,
  social,
  bookingUrl,
  bookingVia,
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
    title: "Ruben's Photography | Wedding, Debut & Event Photographer in Palompon, Leyte",
    // Keep this under 155 characters so Google shows all of it.
    description:
      'Wedding, prenup, debut and event photography in Palompon, Leyte. See the portfolio, then message Ruben on Facebook to book your date.',
    ogImage: '/og-image.jpg', // file in /public, 1200×630
    ogImageAlt: "Ruben's Photography — wedding, debut and event photographer in Palompon, Leyte",
    locale: 'en_PH',
    themeColor: '#1a110b',
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
  navCta: 'Book Now',

  // ── 1. Hero ────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: `${location.town}, ${location.province} · Photographer`,
    headline: "Life's biggest moments, *remembered beautifully*.",
    tagline:
      'Weddings, debuts and celebrations photographed with heart, so you can relive every vow, every dance and every happy tear for years to come.',
    primaryCta: { label: 'View My Work', href: '#portfolio' },
    /** Opens Messenger (or the Facebook Page) in a new tab */
    bookCta: 'Book a Shoot',
    scrollLabel: 'Scroll',
    photo: {
      file: 'hero.jpg',
      alt: 'Debutante in a red ball gown under white pillars at night',
      placeholder: 'Hero photo — horizontal, 2400px wide',
    } satisfies Photo,
    /**
     * Which part of the hero photo stays visible on narrow phone screens
     * (CSS object-position: "left/center/right  top%"). If the debutante is
     * cut off on phones, move the first value, e.g. "40% 30%".
     */
    photoFocus: 'center 30%',
  },

  // ── 2. Marquee strip ───────────────────────────────────────────────────────
  marquee: ['Weddings', 'Prenup', 'Engagement', 'Debut', 'Pre-debut', 'Birthdays', 'Christenings', 'Events'],

  // ── 3. Featured shoot ──────────────────────────────────────────────────────
  // The first photo is shown large; the other five sit in a row underneath.
  featured: {
    eyebrow: 'Featured Shoot',
    title: 'Michael & Marian — *Engagement Session*',
    story:
      '[Michael and Marian wanted their engagement photos to feel like a slow afternoon walk together. We wandered through a garden in full bloom, and between the laughter and quiet glances, they soon forgot the camera was there. These are a few favorite frames from that day.]',
    link: { label: 'See the full portfolio', href: '#portfolio' },
    photos: [
      { file: 'featured/01.jpg', alt: 'Engaged couple walking hand in hand through a flower garden', placeholder: 'Featured photo 01 — horizontal, 1600px wide' },
      { file: 'featured/02.jpg', alt: 'Couple sharing a close embrace in the garden', placeholder: '02' },
      { file: 'featured/03.jpg', alt: 'Couple framed by soft-focus flowers', placeholder: '03' },
      { file: 'featured/04.jpg', alt: 'Couple portrait among the flowers', placeholder: '04' },
      { file: 'featured/05.jpg', alt: 'A forehead kiss in the garden', placeholder: '05' },
      { file: 'featured/06.jpg', alt: 'Couple making a heart with their hands', placeholder: '06' },
    ] satisfies Photo[],
  },

  // ── 4. Services ────────────────────────────────────────────────────────────
  services: {
    eyebrow: 'Services',
    title: 'What I *photograph*',
    intro: 'Every celebration has its own rhythm. I adapt to yours.',
    items: [
      { title: 'Weddings', text: '[Your wedding day, from getting ready to the last dance.]' },
      { title: 'Prenup & Engagement', text: '[A relaxed session for your save-the-dates and wedding AVP.]' },
      { title: 'Debut & Pre-debut', text: '[Your 18th, from the pre-debut shoot to the eighteen roses.]' },
      { title: 'Birthdays, Christenings & Events', text: '[Milestone birthdays, christenings, reunions and team events.]' },
    ],
  },

  // ── 5. Portfolio ───────────────────────────────────────────────────────────
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Stories told in *light*',
    intro: 'A few favorite frames from recent shoots. Tap any photo to view it full size.',
    filters: [
      { label: 'All', value: 'all' },
      { label: 'Wedding', value: 'wedding' },
      { label: 'Prenup', value: 'prenup' },
      { label: 'Debut', value: 'debut' },
      { label: 'Birthday', value: 'birthday' },
      { label: 'Events', value: 'events' },
    ],
    /** Read out to screen readers after filtering. {count} is replaced automatically. */
    statusTemplate: 'Showing {count} photos',
    // Photos show in this order (top to bottom, column by column), mixed so
    // the "All" view isn't grouped by category. Files go in
    // src/assets/photos/portfolio/.
    items: [
      { file: 'portfolio/wedding-01.jpg', category: 'wedding', orientation: 'horizontal', alt: 'Bride and groom at the church altar' },
      { file: 'portfolio/debut-01.jpg', category: 'debut', orientation: 'vertical', alt: 'Debutante in profile with statement earrings' },
      { file: 'portfolio/prenup-01.jpg', category: 'prenup', orientation: 'horizontal', alt: 'Expecting couple with a violin in the forest' },
      { file: 'portfolio/birthday-01.jpg', category: 'birthday', orientation: 'vertical', alt: 'Celebrant at her 70th birthday before a gold backdrop' },
      { file: 'portfolio/events-01.jpg', category: 'events', orientation: 'horizontal', alt: 'Pickleball team on a lit court at night' },
      { file: 'portfolio/wedding-02.jpg', category: 'wedding', orientation: 'vertical', alt: 'Newlyweds kissing as confetti falls' },
      { file: 'portfolio/debut-02.jpg', category: 'debut', orientation: 'horizontal', alt: 'Debutante in a yellow gown at her debut table' },
      { file: 'portfolio/prenup-02.jpg', category: 'prenup', orientation: 'vertical', alt: 'Couple in a red gown and cream suit among the trees' },
      { file: 'portfolio/birthday-02.jpg', category: 'birthday', orientation: 'horizontal', alt: 'Celebrant dancing with a bouquet' },
      { file: 'portfolio/events-02.jpg', category: 'events', orientation: 'vertical', alt: 'Player resting against the court fence at night' },
      { file: 'portfolio/wedding-03.jpg', category: 'wedding', orientation: 'vertical', alt: "Close-up of the bride's veil and earring" },
      { file: 'portfolio/debut-03.jpg', category: 'debut', orientation: 'vertical', alt: 'Debutante seated in a red gown under white pillars' },
    ] satisfies PortfolioItem[],
  },

  // ── 6. About ───────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'About',
    title: `Hi, I'm *${photographer}*`,
    // One string per paragraph.
    bio: [
      `[I'm ${photographer}, a photographer based in ${location.town}, ${location.province}. I photograph weddings, prenups, debuts and family celebrations, from the big entrances to the quiet moments in between. My style is natural and cinematic: I'll guide you when you need it, then step back and let the day unfold. Replace this with your own story.]`,
    ],
    stats: [
      { value: `${years}+`, label: 'Years of experience' },
      { value: '7.7K', label: 'Facebook followers' },
      { value: '100%', label: 'Recommend (12 reviews)' },
    ],
    serviceArea: `Based in ${location.town}, ${location.province}. Available across ${location.serviceArea}.`,
    photo: {
      file: 'about.jpg',
      alt: `${photographer}, the photographer behind ${brand}, camera in hand`,
      placeholder: 'Photo of Ruben — vertical',
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

  // ── 9. Contact (#contact) — bookings happen on Facebook / Messenger ────────
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

  // ── 10. Testimonials ──────────────────────────────────────────────────────
  // Real recommendations from Ruben's Facebook Page, kept word-for-word.
  // Never publish made-up reviews. To add one, copy it from Facebook and add
  // another { quote, name, source } entry below.
  testimonials: {
    eyebrow: 'Kind Words',
    title: 'What clients *say*',
    summary: '100% recommend · 12 reviews on Facebook',
    summaryLink: { label: 'Read the reviews', href: social.facebook },
    items: [
      {
        quote:
          'Thank you so much Sir Ruben for beautifully capturing our special day. Highly recommended—professional, easy to work with, and truly talented! ❤️',
        name: 'Flor R. Osabel',
        source: 'Recommended on Facebook',
      },
      {
        quote: 'The best team very accommodating and friendly kaayo plus bootan pa jud.',
        name: 'Irish Joy Pilapil Pintoy-Samuray',
        source: 'Recommended on Facebook',
      },
      {
        quote:
          "Very recommendable jud kaayoooo. Since day one palang very nice gyud ang service, so if gusto mo ug sulit and ma satisfied mo, Ruben's Photography is for you 👌🏼",
        name: 'Crishia Valenzuela',
        source: 'Recommended on Facebook',
      },
      {
        // Shortened: the full review continues on Facebook.
        quote:
          'I would like to recommend those who plan to get a photographer na Kani ang kuhaon Kay very accommodating, approachable and even you are not photogenic person or Dili hilig ug picture picture, tabangan jud ka ni sir Ruben and his team to make your photos more beautiful. I assure you na ug kini inyung kuhaon, Dili Jud mo maowaw Kay maayo jud Sila…',
        name: 'Jomalyn Gerolaga Graciano-Carlos',
        source: 'Recommended on Facebook',
      },
    ],
  },

  // ── 11. FAQ ────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: 'FAQ',
    title: 'Good to *know*',
    intro: "Can't find your answer? Send me a message — I'm happy to help.",
    items: [
      {
        q: 'How far ahead should I book?',
        a: '[answer]',
      },
      {
        q: 'How much does a shoot cost?',
        a: 'It depends on the location, the number of hours and the coverage you need, so message me for a personal quote.',
      },
      {
        q: 'When will I get my photos?',
        a: '[answer]',
      },
      {
        q: 'How do I book?',
        a: 'Message me on Facebook or Messenger with your date, location and type of shoot.',
      },
    ],
  },

  // ── 12. Footer ─────────────────────────────────────────────────────────────
  footer: {
    line: 'Wedding, debut and event photography from Palompon, Leyte.',
    backToTop: 'Back to top',
  },

  // Small tag shown next to placeholder text so it's easy to spot before launch.
  placeholderNote: 'Placeholder text — edit in src/data/site.ts',
};

export type Site = typeof site;
