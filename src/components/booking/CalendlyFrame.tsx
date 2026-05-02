"use client";

import { useEffect, useState } from "react";

type CalendlyFrameProps = {
  /** Calendly event URL (e.g. https://calendly.com/portrai/15min). */
  url?: string;
  /** Plain CTA shown when no URL is configured yet. */
  fallbackCta?: string;
  /** Where the fallback CTA links (mailto: or contact form). */
  fallbackHref?: string;
  className?: string;
};

/**
 * Calendly placeholder / embed.
 *
 * Today: shows a styled "Book a 15-min call" CTA that links to the
 * fallback (defaults to /kontakt). When `url` is provided, mounts the
 * real Calendly inline widget.
 *
 * To wire up:
 *   1. Get a Calendly link (e.g. https://calendly.com/portrai/15min)
 *   2. Pass it as the `url` prop OR set NEXT_PUBLIC_CALENDLY_URL in env
 *   3. Real widget replaces the placeholder automatically
 */
export function CalendlyFrame({
  url,
  fallbackCta = "Book a 15-min call",
  fallbackHref = "/kontakt",
  className,
}: CalendlyFrameProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const resolvedUrl = url ?? process.env.NEXT_PUBLIC_CALENDLY_URL;

  useEffect(() => {
    if (!resolvedUrl) return;
    // Calendly's official embed script. Loaded only when a URL is set.
    if (
      typeof document !== "undefined" &&
      !document.querySelector("script[data-calendly]")
    ) {
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.dataset.calendly = "true";
      s.onload = () => setScriptLoaded(true);
      document.body.appendChild(s);
    } else {
      setScriptLoaded(true);
    }
  }, [resolvedUrl]);

  if (!resolvedUrl) {
    // No URL yet — render a styled CTA that goes to the contact page.
    return (
      <div
        className={
          "flex flex-col items-start gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 " +
          (className ?? "")
        }
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-brand-accent)]">
          15 min · No commitment
        </p>
        <p
          className="leading-snug"
          style={{ fontSize: "var(--text-title)" }}
        >
          {fallbackCta}
        </p>
        <a
          href={fallbackHref}
          className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
        >
          {fallbackCta} →
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-text-tertiary)]">
          [Calendly embed lands once URL is configured]
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        "calendly-inline-widget rounded-2xl border border-[color:var(--color-stroke-subtle)] " +
        (className ?? "")
      }
      data-url={resolvedUrl}
      style={{ minWidth: 320, height: 700 }}
    >
      {!scriptLoaded && (
        <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-tertiary)]">
          loading calendar...
        </div>
      )}
    </div>
  );
}
