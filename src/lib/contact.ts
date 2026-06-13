import type { LocalizedText } from "./site-content";

/**
 * Contact + SLA + trust constants. Single source of truth.
 *
 * NOTE — Reijo: confirm the WhatsApp number, insurance amount, and SLAs.
 * Numbers below are derived from public site / TASKS.md.
 */

export const CONTACT = {
  email: "info@portrai.ee",
  phone: "+372 5663 9304",
  /** Phone number stripped to digits for `tel:` links. */
  phoneTel: "+37256639304",
  /** WhatsApp accepts numbers in international format without `+`. */
  whatsapp: "37256639304",
  hoursLabel: {
    en: "Mon–Fri 09:00 — 18:00",
    et: "E–R 09:00 — 18:00",
  } satisfies LocalizedText,
  address: {
    locality: "Tallinn",
    country: "EE",
  },
};

export const TRUST_BADGES = [
  {
    id: "award-2025",
    label: {
      en: "Booth Mastermind Awards 2025 · Las Vegas",
      et: "Booth Mastermind Awards 2025 · Las Vegas",
    } satisfies LocalizedText,
  },
  {
    id: "first-baltic",
    label: {
      en: "First in the Baltics to win Best AI Photo Solution",
      et: "Esimene Baltikumis Best AI Photo Solution auhinna võitja",
    } satisfies LocalizedText,
  },
];

/**
 * Awards ordered for buyer relevance — Estonian marketing-industry awards
 * lead because they're recognized by the actual buyer (HR, agencies,
 * marketing directors). Booth Mastermind is the international credential
 * but sits behind the locally-credible wins.
 *
 * Reijo: confirm exact award names, categories, years.
 */
export const HERO_AWARDS = [
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
      en: "Booth Mastermind Awards 2025 · Las Vegas",
      et: "Booth Mastermind Awards 2025 · Las Vegas",
    } satisfies LocalizedText,
  },
];

/**
 * Official partnership / event credentials beyond awards.
 * Anchor international trust without making international the headline.
 */
export const PARTNERSHIPS = [
  {
    id: "euic-summit",
    label: {
      en: "Official photobooth partner · European Innovation Council Summit 2025–2026",
      et: "Ametlik fotoboksi partner · European Innovation Council Summit 2025–2026",
    } satisfies LocalizedText,
  },
];

/**
 * Countries where PortrAI experiences have been delivered.
 * Trust-signal only — international is not actively sold.
 */
export const INTERNATIONAL_REACH = [
  { code: "EE", flag: "🇪🇪" },
  { code: "FI", flag: "🇫🇮" },
  { code: "LV", flag: "🇱🇻" },
  { code: "DE", flag: "🇩🇪" },
  { code: "BE", flag: "🇧🇪" },
  { code: "PL", flag: "🇵🇱" },
  { code: "US", flag: "🇺🇸" },
];

/**
 * Operational service-level promises shown as a badge row.
 * Reijo: edit numbers below before launch.
 */
export const SLAS = [
  {
    id: "setup",
    value: "40 min",
    label: {
      en: "Total setup + teardown",
      et: "Ülespanek + maha võtmine kokku",
    } satisfies LocalizedText,
  },
  {
    id: "delivery",
    value: "24 h",
    label: {
      en: "Digital photos delivered",
      et: "Digikoopiad valmis",
    } satisfies LocalizedText,
  },
  {
    id: "response",
    value: "3 h",
    label: {
      en: "Quote response (business hours)",
      et: "Pakkumise vastus (töötundi)",
    } satisfies LocalizedText,
  },
  {
    id: "throughput",
    value: "200/h",
    label: {
      en: "Portraits per hour at peak",
      et: "Portreed tunnis tipphetkel",
    } satisfies LocalizedText,
  },
];

/**
 * Liability/insurance disclosure used in trust badges.
 * Confirmed real: €100,000 liability cover.
 */
export const INSURANCE = {
  amount: 100_000,
  currency: "EUR",
  label: {
    en: "Liability insurance up to €100,000",
    et: "Vastutuskindlustus kuni 100 000 €",
  } satisfies LocalizedText,
};

/**
 * Outcome metrics shown on /turundus and /messilahendused.
 * These are illustrative ranges from PortrAI campaign averages — Reijo to confirm.
 */
export const MARKETING_OUTCOMES = [
  {
    value: "200+",
    label: {
      en: "Portraits per hour at peak",
      et: "Portreed tunnis tipphetkel",
    } satisfies LocalizedText,
  },
  {
    value: "60–70%",
    label: {
      en: "Average opt-in rate to brand emails",
      et: "Keskmine opt-in määr brändi listidesse",
    } satisfies LocalizedText,
  },
  {
    value: "3–5×",
    label: {
      en: "Social re-shares vs classic photo booth",
      et: "Sotsiaalmeedia jagamised vs klassikaline fotoboks",
    } satisfies LocalizedText,
  },
  {
    value: "681K",
    label: {
      en: "Largest single campaign output (Von Fock · ERR)",
      et: "Suurim ühe kampaania mahtu (Von Fock · ERR)",
    } satisfies LocalizedText,
  },
];
