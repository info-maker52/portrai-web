type FaqItem = {
  q: string;
  a: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

/**
 * Lightweight FAQ accordion built on native <details>/<summary>.
 * Server-component compatible (no JS needed for open/close).
 *
 * Visual: each row is a separator-bordered item that reveals body copy
 * on click. The "+" rotates to "×" via CSS group-open utility.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <details
          key={i}
          className="group border-b border-[color:var(--color-stroke-subtle)] py-6"
        >
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 transition-colors hover:text-[color:var(--color-brand-accent)]">
            <span
              className="font-medium leading-snug"
              style={{ fontSize: "var(--text-title)" }}
            >
              {item.q}
            </span>
            <span className="font-mono text-base text-[color:var(--color-text-tertiary)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p
            className="mt-5 max-w-3xl leading-relaxed text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
