import { testimonialSeeds, text, type SiteLocale } from "@/lib/site-content";

/**
 * A single pull-quote placed directly above a page's final CTA, so the
 * visitor sees proof at the decision moment (the review found proof always
 * lived far from the buttons). Server component — no JS.
 *
 * `index` picks which seed; vary it per page so repeat visitors don't see
 * the same quote everywhere. Defaults to the flagship Aivar Kuusk quote.
 */
export function TestimonialStrip({
  locale,
  index = 0,
}: {
  locale: SiteLocale;
  index?: number;
}) {
  const t = testimonialSeeds[index % testimonialSeeds.length];
  if (!t) return null;

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <figure className="mx-auto max-w-3xl">
        <span
          aria-hidden
          className="block font-display text-5xl leading-none text-[color:var(--color-brand-accent)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          “
        </span>
        <blockquote
          className="mt-4 leading-[1.25] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-md)",
            fontWeight: 400,
          }}
        >
          {text(locale, t.quote)}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]">
          <span className="text-white">{t.name}</span>
          <span className="text-[color:var(--color-text-tertiary)]">·</span>
          <span>{t.company}</span>
          <span className="text-[color:var(--color-text-tertiary)]">·</span>
          <span>{text(locale, t.role)}</span>
        </figcaption>
      </figure>
    </section>
  );
}
