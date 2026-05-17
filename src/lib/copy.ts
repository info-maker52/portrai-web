import type { LocalizedText } from "./site-content";

/**
 * Canonical copy primitives — single source of truth.
 *
 * Every page imports its taglines, award lockups, SLAs and product names
 * from here so the same phrase never drifts in two places. If you find
 * yourself typing one of these strings literally inside a page, stop and
 * import it from this module instead.
 *
 * Voice anchor: Linear restraint + Snapbar peer-positioning + MSCHF
 * cultural fluency. Headlines answer; numbers beat adjectives; one
 * distinctive sentence per page is the MSCHF moment.
 */

/* -------------------------------------------------------------------------- */
/* Marquee tagline — the customer's one-line memory                            */
/* -------------------------------------------------------------------------- */

export const MARQUEE_TAGLINE = {
  en: '"The hit of every event — hands down."',
  et: '„Täielik hitt — ürituse populaarseim osa."',
} satisfies LocalizedText;

/* -------------------------------------------------------------------------- */
/* Award lockup — order matters: marketing-industry first, vendor third       */
/* -------------------------------------------------------------------------- */

export const AWARD_LOCKUP_SHORT = {
  en: "Pronksmuna · Most Innovative Campaign · Booth Mastermind Awards",
  et: "Pronksmuna · Aasta innovaatilisem turunduskampaania · Booth Mastermind Awards",
} satisfies LocalizedText;

export const AWARD_BADGES = [
  {
    id: "pronksmuna",
    label: {
      en: "Pronksmuna · Postimees Laulupidu campaign",
      et: "Pronksmuna · Postimehe Laulupeo kampaania",
    } satisfies LocalizedText,
  },
  {
    id: "innovaatilisem",
    label: {
      en: "Most Innovative Marketing Campaign · Von Fock for ERR",
      et: "Aasta innovaatilisem turunduskampaania · Von Fock ERR-ile",
    } satisfies LocalizedText,
  },
  {
    id: "booth-mastermind",
    label: {
      en: "Booth Mastermind Awards 2025 · Las Vegas · Best AI Photo Solution",
      et: "Booth Mastermind Awards 2025 · Las Vegas · Parim AI fotolahendus",
    } satisfies LocalizedText,
  },
];

/* -------------------------------------------------------------------------- */
/* Operational promises — short form for badge rows                            */
/* -------------------------------------------------------------------------- */

export const SLA_SHORT = {
  en: "40-min setup · 200+ portraits/hour · 3-business-hour reply · 24h delivery",
  et: "40 min ülespanek · 200+ portreed tunnis · 3 töötunni vastus · 24h digikoopiad",
} satisfies LocalizedText;

/* -------------------------------------------------------------------------- */
/* Product lines — the four shapes the studio takes                            */
/* -------------------------------------------------------------------------- */

export const PRODUCT_LINES = [
  {
    id: "boks",
    name: { en: "Boks", et: "Boks" } satisfies LocalizedText,
    priceLabel: {
      en: "from €490",
      et: "alates 490 €",
    } satisfies LocalizedText,
    body: {
      en: "AI photo booth at your event. Branded prints, on-site host, fast setup.",
      et: "AI fotoboks sinu üritusel. Bränditud prindid, kohapealne host, kiire setup.",
    } satisfies LocalizedText,
  },
  {
    id: "branded",
    name: { en: "Branded", et: "Branded" } satisfies LocalizedText,
    priceLabel: {
      en: "from €890",
      et: "alates 890 €",
    } satisfies LocalizedText,
    body: {
      en: "Full brand takeover — not just the start screen. Every screen, prompt and frame in your design language.",
      et: "Täielik brändi-ülevõtt — mitte ainult avaekraan. Iga ekraan, prompt ja raam sinu disainikeeles.",
    } satisfies LocalizedText,
  },
  {
    id: "custom",
    name: {
      en: "Custom Activation",
      et: "Custom Activation",
    } satisfies LocalizedText,
    priceLabel: {
      en: "By quote",
      et: "Pakkumise alusel",
    } satisfies LocalizedText,
    body: {
      en: "A campaign concept built from a brief. Swedbank, Synlab, Von Fock tier.",
      et: "Kampaania kontseptsioon ehitatud briifist alates. Swedbanki, Synlabi, Von Focki tase.",
    } satisfies LocalizedText,
  },
  {
    id: "widget",
    name: { en: "Virtual Widget", et: "Virtual Widget" } satisfies LocalizedText,
    priceLabel: {
      en: "By quote",
      et: "Pakkumise alusel",
    } satisfies LocalizedText,
    body: {
      en: "AI photo experience embedded on your site or microsite. Runs without an event.",
      et: "AI fotokogemus integreeritud sinu saidile või mikrosaidile. Töötab ilma ürituseta.",
    } satisfies LocalizedText,
  },
];

/* -------------------------------------------------------------------------- */
/* International credential line — single sentence                              */
/* -------------------------------------------------------------------------- */

export const INTERNATIONAL_SENTENCE = {
  en: "Official photobooth partner — European Innovation Council Summit 2025–2026. Experiences also delivered in Finland, Germany, Latvia, Belgium, Poland, the USA.",
  et: "Ametlik fotoboksi partner — European Innovation Council Summit 2025–2026. Kogemusi oleme pakkunud ka Soomes, Saksamaal, Lätis, Belgias, Poolas ja USAs.",
} satisfies LocalizedText;

/* -------------------------------------------------------------------------- */
/* Section-eyebrow helpers (mono-cased numbered labels)                        */
/* -------------------------------------------------------------------------- */

export function eyebrow(n: string, label: string): string {
  return `(${n}) ${label}`;
}

/* -------------------------------------------------------------------------- */
/* Anchor proof — Aivar Kuusk's 20-year quote                                  */
/* -------------------------------------------------------------------------- */

export const AIVAR_QUOTE = {
  en: "The most emotion-producing photo booth experience I've seen in 20 years of event marketing.",
  et: "Kõige rohkem emotsiooni tekitav fotoboksi-elamus, mida olen 20 aasta jooksul üritusturunduses näinud.",
} satisfies LocalizedText;

export const AIVAR_CREDIT = {
  en: "Aivar Kuusk · Founder, Kuusk Events",
  et: "Aivar Kuusk · Asutaja, Kuusk Events",
} satisfies LocalizedText;

/* -------------------------------------------------------------------------- */
/* CTAs — used across the site                                                 */
/* -------------------------------------------------------------------------- */

export const CTA = {
  primary: {
    en: "Talk about your event",
    et: "Räägi oma üritusest",
  } satisfies LocalizedText,
  quote: {
    en: "Get a quote",
    et: "Küsi pakkumist",
  } satisfies LocalizedText,
  studioBrief: {
    en: "Bring us a brief",
    et: "Too meile brief",
  } satisfies LocalizedText,
  seeWork: {
    en: "See the work",
    et: "Vaata töid",
  } satisfies LocalizedText,
  seePricing: {
    en: "See pricing",
    et: "Vaata hindu",
  } satisfies LocalizedText,
  joinWaitlist: {
    en: "Join the waitlist",
    et: "Liitu ootejärjekorraga",
  } satisfies LocalizedText,
};

/* -------------------------------------------------------------------------- */
/* Response promise — used in /kontakt + sticky CTAs                          */
/* -------------------------------------------------------------------------- */

export const RESPONSE_PROMISE = {
  en: "We reply within 3 business hours.",
  et: "Vastame 3 töötunni jooksul.",
} satisfies LocalizedText;
