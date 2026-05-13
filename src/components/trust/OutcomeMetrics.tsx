import { MARKETING_OUTCOMES } from "@/lib/contact";
import type { SiteLocale } from "@/lib/site-content";
import { text } from "@/lib/site-content";

/**
 * Outcome metrics block — borrows the Snapbar pattern of leading B2B
 * landing pages with concrete KPIs (entries, opt-in rate, share rate).
 */
export function OutcomeMetrics({ locale }: { locale: SiteLocale }) {
  return (
    <div className="grid gap-8 md:grid-cols-4">
      {MARKETING_OUTCOMES.map((m, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
        >
          <p
            className="font-mono font-medium tabular-nums leading-none"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {m.value}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {text(locale, m.label)}
          </p>
        </div>
      ))}
    </div>
  );
}
