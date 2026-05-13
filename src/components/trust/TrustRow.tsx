import { INSURANCE, TRUST_BADGES } from "@/lib/contact";
import type { SiteLocale } from "@/lib/site-content";
import { text } from "@/lib/site-content";

/**
 * Compact row of trust signals: award + insurance + first-in-Baltics.
 * Drop into any service-page hero or just below.
 */
export function TrustRow({ locale }: { locale: SiteLocale }) {
  const items = [
    TRUST_BADGES[0],
    {
      id: "insurance",
      label: INSURANCE.label,
    },
    TRUST_BADGES[1],
  ];

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[color:var(--color-text-secondary)]">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
        >
          <span className="text-[color:var(--color-brand-accent)]">★</span>
          {text(locale, item.label)}
        </li>
      ))}
    </ul>
  );
}
