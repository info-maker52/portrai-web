"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  n: string;
  title: string;
  body: string;
};

type Props = {
  steps: ReadonlyArray<Step>;
  /** Locale-specific "Begins here" caption rendered under step 01. */
  beginsHereLabel?: string;
};

/**
 * 5-step process row with a CSS-animated connecting line that draws
 * left-to-right when the section enters the viewport.
 *
 * Motion is purely CSS — `portrai-process-line-draw` keyframe in
 * globals.css. IntersectionObserver only flips a `data-in-view`
 * attribute that triggers the animation; nothing renders client-only
 * past that flip. Respects `prefers-reduced-motion` via the global
 * reduce rule which collapses animation-duration.
 */
export function ProcessFlow({ steps, beginsHereLabel }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} data-in-view={inView} className="relative">
      {/* Horizontal connecting line — visible on lg+ only.
          scaleX animates 0→1 over 1.2s once `data-in-view` flips true.
          transform-origin: left so the line draws from left edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[8px] hidden h-px origin-left bg-[color:var(--color-brand-primary)]/40 transition-transform duration-[1200ms] ease-out lg:block"
        style={{
          transform: inView ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <div
            key={step.n}
            className="relative flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5 lg:border-l-0 lg:pl-0 lg:pt-6"
          >
            {/* Node dot on lg+ — sits on the horizontal line */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-1.5 left-0 hidden h-4 w-4 rounded-full border-2 border-[color:var(--color-brand-primary)] bg-[color:var(--color-surface-base)] transition-all duration-500 lg:block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.5)",
                transitionDelay: `${600 + i * 120}ms`,
              }}
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {step.n}
            </p>
            <h3
              className="font-medium leading-tight"
              style={{ fontSize: "var(--text-title)" }}
            >
              {step.title}
            </h3>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {step.body}
            </p>
            {i === 0 && beginsHereLabel && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
                ← {beginsHereLabel}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
