/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.ts — ALL website text, contact details and settings live here.
 *  Components only read from this file, so this is the only file you need to
 *  edit to change what the website says.
 *
 *  • Anything in [square brackets] is a placeholder — replace it (brackets too).
 *    FAQ questions whose answer is still "[answer]" stay hidden until it's filled in.
 *  • Photo paths are relative to src/assets/photos/. If a photo file doesn't
 *    exist yet, the site shows a gray placeholder box in its place.
 *  • Text wrapped in *asterisks* is shown in tan italics (used in headlines).
 *  • No prices or payment details anywhere: quotes happen on Messenger.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { isPlaceholder } from '../utils/text';

// ── Basics ───────────────────────────────────────────────────────────────────

const brand = "Ruben's Photography";
/** First name, used in friendly text ("Hi, I'm Ruben", "message Ruben") */
const photographer = 'Ruben';
/** Full name, used where people (and Google) need it in full */
const photographerFullName = 'Ruben Agosto';

const contact = {
  phoneDisplay: '0997 721 4340',
  phoneHref: 'tel:+639977214340',
  smsHref: 'sms:+639977214340',
  phoneIntl: '+639977214340',
  email: 'rubenagosto68@gmail.com',
};

const social = {
  /** Ruben's Facebook Page (the business page) */
  facebook: 'https://www.facebook.com/profile.php?id=100082353385538',
  /** Ruben's own Facebook account */
  facebookPersonal: 'https://www.facebook.com/rubin.agosto.9',
  /** Shown in the footer only once it's a real link */
  instagram: 'https://www.instagram.com/rubensagosto/',
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
};

const years = '5';

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

export interface Slide {
  /** Path relative to src/assets/photos/, e.g. "hero/slide-01.jpg". Use horizontal photos. */
  file: string;
  /** Describe the photo for people who can't see it. */
  alt: string;
  /**
   * Which part of the photo stays in view when it's cropped (phones crop the
   * sides, wide screens crop top and bottom): "left/right %  top/bottom %".
   * Put the first number where the people are, e.g. "70% 35%" for a couple
   * on the right.
   */
  focus: string;
}

export interface PortfolioItem {
  file: string;
  category: Category;
  alt: string;
  /** Only used for the placeholder box shape — real photos keep their own shape. */
  orientation: Orientation;
}

export interface ServiceItem {
  title: string;
  text: string;
  /** Photo on the card, relative to src/assets/photos/ */
  file: string;
  alt: string;
  /** Which part of the photo stays in view when cropped: "left/right %  top/bottom %" */
  focus: string;
  /** Portfolio filter the card's link switches on */
  category: Category;
  /** Text of the card's link */
  cta: string;
}

// ── Everything the website shows ─────────────────────────────────────────────

export const site = {
  brand,
  photographer,
  photographerFullName,
  /** Brand name as text, next to the logo mark in the navbar. *Italic* part is tan. */
  wordmark: "Ruben's *Photography*",
  /** Ruben's tagline, from his logo. Plain text, for Google (the band above About shows it big). */
  tagline: 'Moments, captured. Forever.',

  /**
   * Color theme. 'light' = white background, 'dark' = espresso brown.
   * The hero photo, the photo viewer and the loading screen stay dark in both.
   * With showToggle, a sun/moon button in the navbar lets visitors switch
   * (their choice is remembered); set it to false to lock the site to `default`.
   */
  theme: {
    default: 'light' as 'light' | 'dark',
    showToggle: true,
    /** Browser bar color on phones, per theme (keep in sync with --color-ink in global.css) */
    barColor: { light: '#faf7f2', dark: '#1a110b' },
  },

  /**
   * The tagline band between the Portfolio and About sections: the Baybayin
   * lettering from Ruben's logo (src/assets/brand/baybayin.png), how to read
   * it, then the tagline in big letters.
   */
  taglineBand: {
    baybayinLabel: `Ruben Potograpya — “${brand}” written in Baybayin`,
    pronunciation: '(ru · be · n   po · to · g · ra · pya)',
    line: 'Moments, captured. *Forever.*',
  },
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
    /** Just the Baybayin lettering, cut from logo.png (white on transparent) — tagline band */
    baybayin: 'baybayin.png',
  },

  // ── SEO & Facebook sharing ─────────────────────────────────────────────────
  seo: {
    title: "Ruben's Photography | Wedding, Debut & Event Photographer in Palompon, Leyte",
    // Keep this under 155 characters so Google shows all of it.
    description:
      'Wedding, prenup, debut and event photography in Palompon, Leyte. See the portfolio, then message Ruben Agosto on Facebook to book your date.',
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

    /**
     * Full-screen slideshow behind the headline. Photos cross-fade in this
     * order with a slow zoom, and pause while the hero is scrolled out of view.
     * The first photo loads first, so make it the strongest one.
     *
     * The photos are in src/assets/photos/hero/ (slide-01.jpg, slide-02.jpg, …),
     * chosen from Ruben's Facebook albums and lightly edited to match.
     * Missing files are skipped automatically.
     */
    slides: [
      { file: 'hero/slide-01.jpg', focus: '58% 40%', alt: 'Debutante having her lip gloss touched up before her debut' },
      { file: 'hero/slide-02.jpg', focus: '52% 33%', alt: 'Newlyweds walking out of the church, the groom raising the bouquet in celebration' },
      { file: 'hero/slide-03.jpg', focus: '51% 45%', alt: 'Young woman in black posing at night against warm golden city lights' },
      { file: 'hero/slide-04.jpg', focus: '61% 35%', alt: 'Engaged couple laughing in a close embrace outdoors' },
      { file: 'hero/slide-05.jpg', focus: '64% 25%', alt: 'Bride with her eyes lowered, holding a bright bouquet in the bridal car' },
      { file: 'hero/slide-06.jpg', focus: '72% 33%', alt: 'Man on one knee proposing as his partner covers her mouth in surprise' },
    ] satisfies Slide[],
    /** Seconds each photo stays on screen */
    slideSeconds: 7,
    /** Shown in the gray box if none of the slideshow photos exist yet */
    placeholder: 'Hero photo — horizontal, 2048px wide or more',
  },

  // ── 2. Marquee strip ───────────────────────────────────────────────────────
  marquee: ['Weddings', 'Prenup', 'Engagement', 'Debut', 'Pre-debut', 'Birthdays', 'Christenings', 'Events'],

  // ── 3. Featured shoot ──────────────────────────────────────────────────────
  // The first photo is shown large; the other five sit in a row underneath.
  featured: {
    eyebrow: 'Featured Shoot',
    title: 'Michael & Marian — *Engagement Session*',
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
    // Each card shows one photo (from src/assets/photos/) and links to that
    // category in the Portfolio.
    items: [
      {
        title: 'Weddings',
        text: 'Your wedding day, from getting ready to the last dance.',
        file: 'portfolio/wedding-02.jpg',
        alt: 'Newlyweds kissing as confetti falls',
        focus: '47% 40%',
        category: 'wedding',
        cta: 'See wedding photos',
      },
      {
        title: 'Prenup & Engagement',
        text: 'A relaxed session for your save-the-dates and wedding AVP.',
        file: 'portfolio/prenup-02.jpg',
        alt: 'Couple in a red gown and cream suit among the trees',
        focus: '48% 45%',
        category: 'prenup',
        cta: 'See prenup photos',
      },
      {
        title: 'Debut & Pre-debut',
        text: 'Your 18th, from the pre-debut shoot to the eighteen roses.',
        file: 'portfolio/debut-03.jpg',
        alt: 'Debutante seated in a red gown under white pillars',
        focus: '52% 50%',
        category: 'debut',
        cta: 'See debut photos',
      },
      {
        title: 'Birthdays, Christenings & Events',
        text: 'Milestone birthdays, christenings, reunions and team events.',
        file: 'portfolio/birthday-02.jpg',
        alt: 'Little girl in heart-shaped sunglasses and a strawberry headscarf at her first birthday shoot',
        focus: '54% 55%',
        category: 'birthday',
        cta: 'See birthday photos',
      },
    ] satisfies ServiceItem[],
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
      { file: 'portfolio/birthday-01.jpg', category: 'birthday', orientation: 'horizontal', alt: 'Young woman in a white dress smiling over a cup of coffee in a café' },
      { file: 'portfolio/events-01.jpg', category: 'events', orientation: 'horizontal', alt: 'Pickleball team on a lit court at night' },
      { file: 'portfolio/wedding-02.jpg', category: 'wedding', orientation: 'vertical', alt: 'Newlyweds kissing as confetti falls' },
      { file: 'portfolio/debut-02.jpg', category: 'debut', orientation: 'horizontal', alt: 'Debutante in a yellow gown at her debut table' },
      { file: 'portfolio/prenup-02.jpg', category: 'prenup', orientation: 'vertical', alt: 'Couple in a red gown and cream suit among the trees' },
      { file: 'portfolio/birthday-02.jpg', category: 'birthday', orientation: 'horizontal', alt: 'Little girl in heart-shaped sunglasses and a strawberry headscarf at her first birthday shoot' },
      { file: 'portfolio/events-02.jpg', category: 'events', orientation: 'vertical', alt: 'Player resting against the court fence at night' },
      { file: 'portfolio/wedding-03.jpg', category: 'wedding', orientation: 'vertical', alt: "Close-up of the bride's veil and earring" },
      { file: 'portfolio/debut-03.jpg', category: 'debut', orientation: 'vertical', alt: 'Debutante seated in a red gown under white pillars' },
    ] satisfies PortfolioItem[],
  },

  // ── 6. About ───────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'About',
    title: `Hi, I'm *${photographer}*`,
    // One string per paragraph. Approved by Ruben (2026-11-12).
    bio: [
      `I am ${photographerFullName}, a professional photographer based in ${location.town}, ${location.province}. For the past five years, I have photographed weddings, prenuptial sessions, debuts and family celebrations, capturing both the grand entrances and the quiet moments in between.`,
      'My style is natural and cinematic. I offer gentle direction whenever it is needed, then step back and allow your day to unfold as it truly happens.',
    ],
    stats: [
      { value: `${years}+`, label: 'Years of experience' },
      { value: '7.7K', label: 'Facebook followers' },
      { value: '100%', label: 'Recommend (12 reviews)' },
    ],
    serviceArea: `Based in ${location.town}, ${location.province}.`,
    photo: {
      file: 'about.jpg',
      alt: `${photographerFullName}, the photographer behind ${brand}, at his desk with a laptop, his cameras and printed photos behind him`,
      placeholder: 'Photo of Ruben — vertical',
    } satisfies Photo,
    /**
     * Which part of Ruben's photo stays in view (the frame is taller than the
     * photo, so the sides are trimmed). "50% 50%" = centered.
     */
    photoFocus: '50% 50%',
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
    /** Card with Ruben's Facebook Page, his own Facebook account and Instagram */
    socialTitle: 'Facebook & Instagram',
    facebookLabel: 'Facebook Page',
    personalFacebookLabel: `${photographer}'s Facebook`,
    instagramLabel: 'Instagram',
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
        a: 'I recommend booking about a month ahead, so your date is still free and we have time to plan your shoot.',
      },
      {
        q: 'How much does a shoot cost?',
        a: 'It depends on the location, the number of hours and the coverage you need, so message me for a personal quote.',
      },
      {
        q: 'When will I get my photos?',
        a: 'Your edited photos will be ready within 1 to 2 weeks after your shoot.',
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
};

export type Site = typeof site;
