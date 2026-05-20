import Image from "next/image";

/**
 * Studio hero loop — a stacked cross-fade of 5 AI portrait samples.
 *
 * CSS-only: each layer animates `portrai-style-cycle` (defined in
 * globals.css) at a 17.5s loop with 3.5s per style, staggered via
 * `animation-delay` so only one is fully visible at a time. Behind a
 * thin frame on the dark canvas.
 *
 * No JS, no MP4 required — ships now with existing assets, can be
 * replaced later with a real morphing video by swapping this component
 * for a `<video>` and dropping the layers.
 *
 * Sources are the catalog's representative portrait samples + work
 * covers, chosen for high visual contrast across the cycle so the
 * transformation feels material rather than subtle.
 *
 * Reduced-motion: the @keyframes rule is wrapped in a
 * `prefers-reduced-motion: no-preference` media query in globals.css.
 * When motion is reduced, layer 1 stays visible and the rest are
 * pinned at opacity 0 — the visitor sees a single portrait instead of
 * cycling, no motion at all.
 */

type Layer = {
  src: string;
  alt: string;
  /** Label rendered as a tiny mono badge in the corner during this style's slot. */
  label: string;
};

const LAYERS: Layer[] = [
  {
    src: "/images/site/portrait-base.png",
    alt: "Base portrait",
    label: "Base",
  },
  {
    src: "/images/site/portrait-reveal.png",
    alt: "Acrylic AI portrait sample",
    label: "Acrylic",
  },
  {
    src: "/images/work/von-fock-cover.jpg",
    alt: "Von Fock — renaissance-style AI portrait",
    label: "Renaissance",
  },
  {
    src: "/images/work/melt-cover.png",
    alt: "MELT — cinematic AI portrait",
    label: "Cinematic",
  },
  {
    src: "/images/work/swedbank-unistused-cover.jpg",
    alt: "Swedbank dream-keyword AI portrait",
    label: "Custom",
  },
];

const CYCLE_SECONDS = 17.5; // 5 × 3.5s slot

export function StudioHeroCycle() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]">
      {LAYERS.map((layer, i) => (
        <div
          key={layer.src}
          className="absolute inset-0 [animation:portrai-style-cycle_var(--studio-cycle-duration)_ease-in-out_infinite]"
          style={
            {
              animationDelay: `${(i * CYCLE_SECONDS) / LAYERS.length}s`,
              opacity: i === 0 ? 1 : 0,
              "--studio-cycle-duration": `${CYCLE_SECONDS}s`,
            } as React.CSSProperties
          }
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Permanent gradient overlay for chrome readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />

      {/* Static label — the cycling style names beneath would be a JS
          render; the static "Studio reel" tag is the same shape as the
          /peod hero chip and reads as part of the editorial system. */}
      <p className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
        ◆ Studio reel · 5 styles cycling
      </p>
    </div>
  );
}
