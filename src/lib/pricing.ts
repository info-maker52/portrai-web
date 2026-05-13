import type { LocalizedText, SiteLocale } from "./site-content";

/**
 * Pricing config — single source of truth.
 *
 * NUMBERS HERE ARE PLACEHOLDERS. Reijo: confirm and edit before launch.
 * Every package, distance tier, and surcharge below should map to your real catalog.
 */

export type PackageId = "essential" | "signature" | "studio";

export type Package = {
  id: PackageId;
  name: LocalizedText;
  tagline: LocalizedText;
  /**
   * Base price in EUR (net, VAT added on top).
   * For tiers where pricing is intentionally hidden (`customPricing: true`),
   * this is treated as a fallback for the calculator only — the value is
   * never rendered on /hinnad or in the wizard.
   */
  basePrice: number;
  hours: number;
  bestFor: LocalizedText;
  features: LocalizedText[];
  highlight?: boolean;
  /**
   * Custom-pricing tier (Activation projects: Swedbank, Synlab, Von Fock).
   * UI must render `Küsi pakkumist` instead of a number, hide from the
   * calculator selector, and route the buyer to /turundus or /broneeri
   * instead of a "from €X" anchor.
   */
  customPricing?: boolean;
};

export const VAT_RATE = 0.22;

export const PACKAGES: Package[] = [
  {
    id: "essential",
    name: { en: "Boks", et: "Boks" },
    tagline: {
      en: "AI photo booth at your event. Fast to book, easy to love.",
      et: "AI fotoboks sinu üritusel. Kiire broneerida, lihtne armastada.",
    },
    basePrice: 490,
    hours: 3,
    bestFor: {
      en: "Birthdays, small weddings, intimate company evenings up to ~100 guests.",
      et: "Sünnipäevad, väiksed pulmad, intiimsed firmaõhtud kuni ~100 külalist.",
    },
    features: [
      {
        en: "3 hours of AI photobooth on-site",
        et: "3 tundi AI fotoboksi kohapeal",
      },
      { en: "5 ready-made AI styles", et: "5 valmis AI stiili" },
      { en: "On-site host", et: "Kohapealne host" },
      { en: "Unlimited shots + digital gallery", et: "Piiramatult pilte + digi-galerii" },
      {
        en: "Setup + teardown within 40 minutes",
        et: "Ülespanek + maha võtmine 40 minutiga",
      },
    ],
  },
  {
    id: "signature",
    name: { en: "Branded", et: "Branded" },
    tagline: {
      en: "Not just a start screen — the whole UI is your brand.",
      et: "Mitte ainult avaekraan — kogu kasutajaliides on sinu bränd.",
    },
    basePrice: 890,
    hours: 5,
    bestFor: {
      en: "Corporate parties, brand-aware weddings, agency-led events for 100–300 guests.",
      et: "Firmapeod, brändi-teadlikud pulmad, agentuuride ülesseatud üritused 100–300 külalisele.",
    },
    features: [
      {
        en: "5 hours on-site — full brand takeover of the booth UI",
        et: "5 tundi kohapeal — kogu boksi UI sinu brändi keeles",
      },
      {
        en: "Logo, colours, photo frames, prompt copy — all branded",
        et: "Logo, värvid, fotoraamid, prompt-tekst — kõik bränditud",
      },
      {
        en: "10+ AI styles tuned to match your event mood",
        et: "10+ AI stiili, häälestatud sobima ürituse meeleoluga",
      },
      {
        en: "Live gallery wall + on-site host",
        et: "Live-galerii sein + kohapealne host",
      },
      {
        en: "QR delivery + digital gallery within 24 h",
        et: "QR-i kaudu + digi-galerii 24 tunni jooksul",
      },
    ],
    highlight: true,
  },
  {
    id: "studio",
    name: { en: "Custom Activation", et: "Kohandatud aktivatsioon" },
    tagline: {
      en: "A campaign concept built around AI photo. Award-winning territory.",
      et: "Kampaania kontseptsioon, mis ehitatud AI foto ümber. Auhinnatud territoorium.",
    },
    // Hidden behind a quote-on-request — the number below is calculator
    // fallback only and is never rendered on /hinnad or in the wizard.
    basePrice: 0,
    hours: 0,
    customPricing: true,
    bestFor: {
      en: "Brand activations, trade-show campaigns, virtual AI widgets, multi-channel concepts.",
      et: "Brändi-aktivatsioonid, messikampaaniad, virtuaalsed AI-widgetid, multikanalised kontseptsioonid.",
    },
    features: [
      {
        en: "Concept designed brief-up — not a booth template",
        et: "Kontseptsioon disainitud briifist alates — mitte boksi-malli põhjal",
      },
      {
        en: "Booth + virtual AI widget for client's site or microsite",
        et: "Boks + virtuaalne AI-widget kliendi saidile või mikrosaidile",
      },
      {
        en: "Lead capture + GDPR-clean data export",
        et: "Leadide kogumine + GDPR-puhas andmete eksport",
      },
      {
        en: "Custom AI prompts, custom UI flow, custom output styles",
        et: "Kohandatud AI promptid, voog, väljund-stiilid",
      },
      {
        en: "Post-event report with engagement metrics",
        et: "Üritusejärgne raport koos kaasatuse mõõdikutega",
      },
    ],
  },
];

export type AddOn = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
};

export const ADD_ONS: AddOn[] = [
  {
    id: "fotopeegel",
    name: { en: "Fotopeegel (mirror booth)", et: "Fotopeegel" },
    description: {
      en: "Add a full-length mirror booth alongside the AI booth.",
      et: "Lisa täismõõdus fotopeegel AI fotoboksi kõrvale.",
    },
    price: 390,
  },
  {
    id: "extra-hour",
    name: { en: "Extra hour", et: "Lisatund" },
    description: {
      en: "Each additional hour beyond the package length.",
      et: "Iga lisatund peale paketis sisalduvat aega.",
    },
    price: 150,
  },
  {
    id: "custom-theme",
    name: { en: "Custom AI theme", et: "Kohandatud AI teema" },
    description: {
      en: "We design a unique AI theme matching your event concept.",
      et: "Loome unikaalse AI teema sinu ürituse kontseptsiooniga sobivaks.",
    },
    price: 290,
  },
  {
    id: "branded-frame",
    name: { en: "Branded photo frame", et: "Bränditud fotoraam" },
    description: {
      en: "Your logo, colours, and event name baked into every photo.",
      et: "Sinu logo, värvid ja ürituse nimi igas fotos.",
    },
    price: 90,
  },
  {
    id: "lead-capture",
    name: { en: "Lead capture + email export", et: "Leadide kogumine + e-posti eksport" },
    description: {
      en: "GDPR-clean opt-in flow, ready-to-import CSV.",
      et: "GDPR-puhas opt-in voog, valmis-imporditav CSV.",
    },
    price: 190,
  },
  {
    id: "second-host",
    name: { en: "Second on-site host", et: "Teine kohapealne host" },
    description: {
      en: "For events over 250 guests or simultaneous booth zones.",
      et: "Üritustele üle 250 külalise või mitme tsooniga ülessehitustele.",
    },
    price: 220,
  },
];

export type DistanceTier = {
  id: string;
  label: LocalizedText;
  /** km from Tallinn, upper bound (inclusive). null = anywhere further */
  maxKm: number | null;
  fee: number;
};

export const DISTANCE_TIERS: DistanceTier[] = [
  {
    id: "tallinn",
    label: { en: "Tallinn (within 25 km)", et: "Tallinn (kuni 25 km)" },
    maxKm: 25,
    fee: 0,
  },
  {
    id: "near",
    label: { en: "Within 100 km from Tallinn", et: "Kuni 100 km Tallinnast" },
    maxKm: 100,
    fee: 90,
  },
  {
    id: "far",
    label: { en: "Within 200 km from Tallinn", et: "Kuni 200 km Tallinnast" },
    maxKm: 200,
    fee: 180,
  },
  {
    id: "anywhere",
    label: { en: "Further / abroad — quoted on request", et: "Kaugemal / välismaal — pakkumine eraldi" },
    maxKm: null,
    fee: 0,
  },
];

export const NIGHT_SURCHARGE = {
  amount: 120,
  label: {
    en: "Late-night surcharge (event runs past 00:00)",
    et: "Hiline õhtu lisatasu (üritus kestab üle 00:00)",
  } satisfies LocalizedText,
};

export const WEEKEND_SURCHARGE = {
  amount: 90,
  label: {
    en: "Weekend surcharge (Saturday or Sunday)",
    et: "Nädalavahetuse lisatasu (laupäev või pühapäev)",
  } satisfies LocalizedText,
};

/** Currency formatting with Estonian thin-space convention. */
export function formatEur(value: number, locale: SiteLocale = "et"): string {
  const rounded = Math.round(value);
  const intl = new Intl.NumberFormat(locale === "et" ? "et-EE" : "en-EE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  return intl.format(rounded);
}

export type CalculatorInputs = {
  packageId: PackageId;
  distanceTierId: string;
  guestCount: number;
  addOnIds: string[];
  weekend: boolean;
  lateNight: boolean;
};

export type CalculatorBreakdownLine = {
  label: LocalizedText;
  amount: number;
};

export type CalculatorResult = {
  lines: CalculatorBreakdownLine[];
  subtotal: number;
  vat: number;
  total: number;
};

export function calculatePrice(
  inputs: CalculatorInputs,
): CalculatorResult {
  const requested = PACKAGES.find((p) => p.id === inputs.packageId);
  // Custom-pricing tiers don't take part in calculator math — fall back to
  // the highlighted (Branded) tier so the breakdown stays sensible.
  const pkg =
    requested && !requested.customPricing
      ? requested
      : PACKAGES.find((p) => p.highlight) ?? PACKAGES[1];
  const distance =
    DISTANCE_TIERS.find((d) => d.id === inputs.distanceTierId) ??
    DISTANCE_TIERS[0];

  const lines: CalculatorBreakdownLine[] = [
    {
      label: {
        en: `${pkg.name.en} package — ${pkg.hours}h`,
        et: `${pkg.name.et} pakett — ${pkg.hours}h`,
      },
      amount: pkg.basePrice,
    },
  ];

  // Guest-count uplift: large events add operational cost.
  if (inputs.guestCount > 200) {
    const extraTiers = Math.ceil((inputs.guestCount - 200) / 100);
    lines.push({
      label: {
        en: `Large event uplift (${inputs.guestCount} guests)`,
        et: `Suure ürituse lisatasu (${inputs.guestCount} külalist)`,
      },
      amount: extraTiers * 80,
    });
  }

  if (distance.fee > 0) {
    lines.push({ label: distance.label, amount: distance.fee });
  }

  for (const addOnId of inputs.addOnIds) {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    if (addOn) {
      lines.push({ label: addOn.name, amount: addOn.price });
    }
  }

  if (inputs.weekend) {
    lines.push({ label: WEEKEND_SURCHARGE.label, amount: WEEKEND_SURCHARGE.amount });
  }
  if (inputs.lateNight) {
    lines.push({ label: NIGHT_SURCHARGE.label, amount: NIGHT_SURCHARGE.amount });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return { lines, subtotal, vat, total };
}
