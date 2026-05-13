"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const HIDE_ON_PATHS = ["/kontakt", "/broneeri"];

const COPY = {
  en: { label: "Get a quote" },
  et: { label: "Küsi pakkumist" },
} as const;

/**
 * Desktop-only floating "Küsi pakkumist" CTA.
 * Appears after the user scrolls past the hero and disappears on the
 * contact / booking routes where it would be redundant.
 */
export function StickyQuoteCta() {
  const locale = (useLocale() as "et" | "en") ?? "et";
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 0.5);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON_PATHS.some((path) => pathname === path)) return null;

  return (
    <Link
      href="/broneeri"
      aria-hidden={!show}
      className={[
        "fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[color:var(--color-brand-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-[var(--glow-medium)] transition-all duration-300 hover:bg-[color:var(--color-brand-secondary)] md:inline-flex",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      {COPY[locale].label} →
    </Link>
  );
}
