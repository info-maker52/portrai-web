import Image from "next/image";

/**
 * Theme gallery — proves the "12 named AI styles" claim with a real
 * visual grid of sample outputs. Each tile shows the style label at
 * idle; on hover, slides in a one-line "Best for:" caption so the
 * visitor learns which event the style fits without leaving the page.
 *
 * Server-rendered. Lazy-loaded images. Pure CSS hover state.
 *
 * Reijo's note: the auto-generated category labels are stand-ins
 * until the actual catalog names are confirmed; the structure stays
 * the same when labels are replaced.
 */

type Theme = {
  src: string;
  alt: string;
  label: string;
  /** One-line "best for" caption shown on hover. */
  bestFor: string;
};

const THEMES: Theme[] = [
  {
    src: "/images/themes/naidised-09-896456d601.jpg",
    alt: "Editorial AI portrait sample",
    label: "Editorial",
    bestFor: "Brand-led activations + premium magazine moments",
  },
  {
    src: "/images/themes/naidised-11-72341c5750.png",
    alt: "Watercolour AI portrait sample",
    label: "Watercolour",
    bestFor: "Weddings + garden parties + lifestyle launches",
  },
  {
    src: "/images/themes/naidised-13-39725fb530.png",
    alt: "Painted AI portrait sample",
    label: "Painted",
    bestFor: "Gala dinners + heritage-brand evenings",
  },
  {
    src: "/images/themes/naidised-14-67ebac8728.png",
    alt: "Pencil sketch AI portrait sample",
    label: "Sketch",
    bestFor: "Conferences + intimate B2B dinners",
  },
  {
    src: "/images/themes/naidised-15-773787c67c.png",
    alt: "Cartoon AI portrait sample",
    label: "Cartoon",
    bestFor: "Family parties + school galas + gaming events",
  },
  {
    src: "/images/themes/naidised-16-d6bb46c110.png",
    alt: "Cinematic AI portrait sample",
    label: "Cinematic",
    bestFor: "Film premieres + product launches",
  },
  {
    src: "/images/themes/naidised-17-6ca731c7de.png",
    alt: "Neon AI portrait sample",
    label: "Neon",
    bestFor: "Late-night parties + music festivals",
  },
  {
    src: "/images/themes/naidised-18-fdee8019b7.png",
    alt: "Renaissance AI portrait sample",
    label: "Renaissance",
    bestFor: "Black-tie galas + museum partnerships",
  },
  {
    src: "/images/themes/naidised-20-8caf0ec0a6.png",
    alt: "Sci-fi AI portrait sample",
    label: "Sci-fi",
    bestFor: "Tech launches + Web3 / AI events",
  },
  {
    src: "/images/themes/naidised-22-5f7217a492.png",
    alt: "Vintage AI portrait sample",
    label: "Vintage",
    bestFor: "Weddings + anniversaries + heritage brands",
  },
  {
    src: "/images/themes/naidised-24-0d51e57526.png",
    alt: "Acrylic AI portrait sample",
    label: "Acrylic",
    bestFor: "Brand activations + gallery-feel evenings",
  },
  {
    src: "/images/themes/naidised-26-b4bf5c89c5.png",
    alt: "Street-art AI portrait sample",
    label: "Street art",
    bestFor: "Streetwear drops + music + urban brands",
  },
];

export function ThemeGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {THEMES.map((theme) => (
        <div
          key={theme.src}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]"
        >
          <Image
            src={theme.src}
            alt={theme.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {/* Two stacked gradients — idle uses the lighter one, hover swaps
              to the stronger one so the bestFor caption stays readable. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.78)] via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.92)] via-[rgba(2,9,30,0.45)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Idle label */}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
            {theme.label}
          </span>

          {/* Hover-revealed best-for caption — slides up + fades in */}
          <p className="pointer-events-none absolute inset-x-3 bottom-12 translate-y-2 text-[11px] leading-snug text-white/95 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="mr-1 font-mono uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
              Best for ·
            </span>
            {theme.bestFor}
          </p>
        </div>
      ))}
    </div>
  );
}
