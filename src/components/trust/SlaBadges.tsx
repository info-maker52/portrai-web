import { SLAS } from "@/lib/contact";
import type { SiteLocale } from "@/lib/site-content";
import { text } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
  /** Optional subset of SLA ids to show; defaults to all four. */
  pick?: ReadonlyArray<(typeof SLAS)[number]["id"]>;
  className?: string;
};

/**
 * A row of operational SLA promises.
 * Borrows from naks.ee — concrete-number badges convert better than vague trust copy.
 */
export function SlaBadges({ locale, pick, className }: Props) {
  const items = pick ? SLAS.filter((s) => pick.includes(s.id)) : SLAS;

  return (
    <div
      className={[
        "grid grid-cols-2 gap-4 md:grid-cols-4",
        className ?? "",
      ].join(" ")}
    >
      {items.map((sla) => (
        <div
          key={sla.id}
          className="flex flex-col gap-2 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5"
        >
          <p
            className="font-mono font-medium tabular-nums leading-none text-white"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {sla.value}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {text(locale, sla.label)}
          </p>
        </div>
      ))}
    </div>
  );
}
