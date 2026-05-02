import Image from "next/image";

/**
 * Theme gallery for /peod — proves the "largest theme catalog in Estonia"
 * claim with a real visual grid of sample outputs.
 *
 * 12 images sourced from existing AI portrait samples. Each tile is a
 * representative example of a style family (acrylic, watercolour, pencil,
 * cartoon, neon, painted, retro, sci-fi, etc.) — when Reijo confirms the
 * actual theme names, we replace the auto-generated labels.
 *
 * Server-rendered. Lazy-loaded images. Hover scale only — no JS needed.
 */

type Theme = {
  src: string;
  alt: string;
  /** Optional editorial label shown over the tile. */
  label?: string;
};

// Labels are generic stylistic categories — Reijo to refine to real
// theme names from the catalog (e.g. "Renessanss", "Sci-fi 2080", etc.)
const THEMES: Theme[] = [
  { src: "/images/themes/naidised-09-896456d601.jpg", alt: "AI portrait sample 09", label: "Editorial" },
  { src: "/images/themes/naidised-11-72341c5750.png", alt: "AI portrait sample 11", label: "Watercolour" },
  { src: "/images/themes/naidised-13-39725fb530.png", alt: "AI portrait sample 13", label: "Painted" },
  { src: "/images/themes/naidised-14-67ebac8728.png", alt: "AI portrait sample 14", label: "Sketch" },
  { src: "/images/themes/naidised-15-773787c67c.png", alt: "AI portrait sample 15", label: "Cartoon" },
  { src: "/images/themes/naidised-16-d6bb46c110.png", alt: "AI portrait sample 16", label: "Cinematic" },
  { src: "/images/themes/naidised-17-6ca731c7de.png", alt: "AI portrait sample 17", label: "Neon" },
  { src: "/images/themes/naidised-18-fdee8019b7.png", alt: "AI portrait sample 18", label: "Renaissance" },
  { src: "/images/themes/naidised-20-8caf0ec0a6.png", alt: "AI portrait sample 20", label: "Sci-fi" },
  { src: "/images/themes/naidised-22-5f7217a492.png", alt: "AI portrait sample 22", label: "Vintage" },
  { src: "/images/themes/naidised-24-0d51e57526.png", alt: "AI portrait sample 24", label: "Acrylic" },
  { src: "/images/themes/naidised-26-b4bf5c89c5.png", alt: "AI portrait sample 26", label: "Street art" },
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.78)] via-transparent to-transparent" />
          {theme.label && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
              {theme.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
