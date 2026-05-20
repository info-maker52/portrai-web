import type { SiteLocale } from "@/lib/site-content";

type Variant = "clients" | "awards" | "euic" | "throughput";

type Props = {
  locale: SiteLocale;
  variant?: Variant;
  className?: string;
};

const COPY: Record<Variant, { en: string; et: string }> = {
  clients: {
    en: "Used by Swedbank · Telia · Synlab · ERR · Postimees",
    et: "Kasutusel Swedbankis · Telias · Synlabis · ERR-is · Postimehes",
  },
  awards: {
    en: "Pronksmuna · Most Innovative Campaign · Booth Mastermind",
    et: "Pronksmuna · Aasta innovaatilisem kampaania · Booth Mastermind",
  },
  euic: {
    en: "Official partner · European Innovation Council Summit 2025–2026",
    et: "Ametlik partner · European Innovation Council Summit 2025–2026",
  },
  throughput: {
    en: "Up to 200 portraits per hour · 3-business-hour response",
    et: "Kuni 200 portreed tunnis · 3 töötunni vastusaeg",
  },
};

/**
 * One-liner trust microcopy designed to sit *directly above* a hero
 * CTA so the social-proof signal is in the visitor's peripheral
 * vision at the moment of conversion intent. Replaces the previous
 * pattern where TrustRow sat far from the buttons.
 *
 * Use sparingly — one per hero, picked to match the page's buyer:
 *   - `clients` for /, /peod (anyone)
 *   - `awards` for /studio, /tood (marketing/agency buyer)
 *   - `euic` for /messilahendused, /photobooth-tallinn (intl. credibility)
 *   - `throughput` for /hinnad (operational concerns)
 */
export function ProofMicrocopy({ locale, variant = "clients", className }: Props) {
  return (
    <p
      className={[
        "flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]",
        className ?? "",
      ].join(" ")}
    >
      <span aria-hidden className="text-[color:var(--color-brand-accent)]">★</span>
      {COPY[variant][locale]}
    </p>
  );
}
