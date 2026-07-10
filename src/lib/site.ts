/**
 * Central site configuration.
 *
 * Contact details, socials, partners and positioning are the dealership's
 * REAL published details (from svenljungabilcenter.se, verified 2026-07-02).
 * The few remaining bracketed values (opening hours, trust figures) are not
 * published anywhere and still need to be confirmed before launch.
 */
export const site = {
  name: "Svenljunga Bilcenter",
  /** Full legal name — used in the footer and legal contexts. */
  legalName: "Svenljunga Bilcenter AB",
  tagline: "Din trygga bilaffär",
  /** Production URL — update if a new domain is used for this site. */
  url: "https://svenljungabilcenter.se",

  // ── Contact details (REAL) ─────────────────────────────────────────
  phone: "0325-124 12",
  phoneHref: "tel:+4632512412",
  email: "info@svenljungabilcenter.se",
  emailHref: "mailto:info@svenljungabilcenter.se",
  address: {
    street: "Boråsvägen 16",
    zip: "512 53",
    city: "Svenljunga",
    country: "Sverige",
  },

  // Google Maps directions link for the real address
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Svenljunga+Bilcenter+Bor%C3%A5sv%C3%A4gen+16+Svenljunga",

  // ── Social & marketplace (REAL) ────────────────────────────────────
  social: {
    facebook: "https://www.facebook.com/SvenljungaBilcenterAB",
    instagram: "https://instagram.com/svenljungabilcenterab",
    blocket: "https://www.blocket.se/butik/svenljunga-bilcenter",
  },

  // ── Partners (REAL) ────────────────────────────────────────────────
  partners: {
    financing: "Santander Consumer Bank",
    warranty: "GarantiPartner",
  },

  // ── Opening hours (confirmed with the dealership 2026-07-05) ──────
  hours: [
    { days: "Måndag–Fredag", time: "09:00–18:00" },
    { days: "Lördag", time: "10:00–14:00" },
    { days: "Söndag", time: "10:00–14:00" },
  ],

  // ── Trust figures (NOT PUBLISHED — confirm before showing) ────────
  stats: {
    yearsInBusiness: "[ÅR]",
    carsSold: "[ANTAL]",
  },

  // ── Google reviews (REAL — from the dealership's Google Business
  //    profile, 4,8 av 5 från 70 recensioner). Texts are verbatim Swedish
  //    originals; never edit their meaning. Star ratings pending owner check.
  reviews: {
    rating: "4,8",
    count: 70,
    url: "https://www.google.com/maps?cid=1882012767478859486",
    items: [
      {
        author: "Sobe Sobe",
        stars: 5,
        timeAgo: "9 mån sedan",
        text: "Som tjej och helt okunnig inom bilbranschen kände jag mig trygg genom hela köpet. Från att sälja min bil till att köpa en ny av dom. Blev jätte nöjd och kändes ärligt från start.",
      },
      {
        author: "R S",
        stars: 5,
        timeAgo: "1 år sedan",
        text: "En seriös och bra bilhandlare, väldigt trevligt bemötande av Elvis som var duktig och hjälpsam under hela processen tills köp. Jag hade flera timmars restid men efter samtalen kändes det tryggt att åka och köpa bilen utan några överraskningar. Kan varmt rekommendera!",
      },
      {
        author: "Joel Liljeqvist",
        stars: 5,
        timeAgo: "7 mån sedan",
        text: "Dunder bra service av grabbarna på plats! Dom möter verkligen kunden och ger all den service man kan tänka sej! 10/10! Riktigt bra!",
      },
      {
        author: "Turboojesus",
        stars: 5,
        timeAgo: "1 år sedan",
        text: "Vi är jättenöjda. Vårt andra bilköp under två månader hos Svenljunga Bilcenter.",
      },
    ],
  },
} as const;

/**
 * True once real opening hours are filled in (no bracketed placeholders).
 * Until then the UI shows ring-ahead copy instead of inventing hours.
 */
export const hoursConfirmed = site.hours.every((h) => !h.time.includes("["));

/**
 * True once real trust figures exist. Until then the UI shows verified
 * facts (märkesoberoende, partners) instead of bracketed numbers.
 */
export const statsConfirmed = !Object.values(site.stats).some((v) =>
  v.includes("["),
);

/** Fallback shown wherever hours would appear while they're unconfirmed. */
export const hoursFallback =
  "Ring oss gärna innan besök så ser vi till att rätt person finns på plats.";

/** True once real Google reviews exist. The reviews section hides itself
 *  entirely until then, so it can never show invented testimonials. */
export const reviewsConfirmed = site.reviews.items.length > 0;

export const navigation = [
  { label: "Hem", href: "/" },
  { label: "Bilar i lager", href: "/bilar" },
  { label: "Sälj din bil", href: "/salj-din-bil" },
  { label: "Hitta min bil", href: "/hitta-min-bil" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
