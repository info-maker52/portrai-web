"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const HIDE_ON_PATHS = ["/kontakt"];

/**
 * Map a route to a context-appropriate CTA. The default fallback is
 * the universal "Get a quote → /kontakt", but specific pages get a
 * label that matches the page's intent so the sticky button doesn't
 * read as the same generic ask on every page.
 */
type StickyCta = {
  href: "/kontakt" | "/studio" | "/hinnad" | `/hinnad#${string}`;
  label: { en: string; et: string };
};

function ctaForPath(pathname: string): StickyCta {
  if (pathname === "/studio") {
    return {
      href: "/kontakt",
      label: { en: "Bring us a brief", et: "Too meile brief" },
    };
  }
  if (pathname === "/hinnad") {
    return {
      href: "/hinnad#calculator",
      label: { en: "Open calculator", et: "Ava kalkulaator" },
    };
  }
  if (pathname === "/peod" || pathname === "/events") {
    return {
      href: "/hinnad",
      label: { en: "See pricing", et: "Vaata hindu" },
    };
  }
  if (pathname === "/boksid") {
    return {
      href: "/kontakt",
      label: { en: "Pick a booth", et: "Vali boks" },
    };
  }
  if (pathname === "/pulma-fotoboks") {
    return {
      href: "/kontakt",
      label: { en: "Lock the date", et: "Pane kuupäev kinni" },
    };
  }
  if (pathname === "/messilahendused") {
    return {
      href: "/kontakt",
      label: { en: "Send the show brief", et: "Saada messi-brief" },
    };
  }
  return {
    href: "/kontakt",
    label: { en: "Get a quote", et: "Küsi pakkumist" },
  };
}

/**
 * Desktop-only floating CTA. Switches label + destination by route so
 * the sticky button matches what the visitor is reading. Mobile gets
 * the wider StickyContactBar (quote / call / WhatsApp) instead — the
 * `md:inline-flex` / `md:hidden` classes keep the two mutually
 * exclusive.
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

  const cta = useMemo(() => ctaForPath(pathname), [pathname]);

  if (HIDE_ON_PATHS.some((path) => pathname === path)) return null;

  return (
    <Link
      href={cta.href}
      aria-hidden={!show}
      className={[
        "fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[color:var(--color-brand-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-[var(--glow-medium)] transition-all duration-300 hover:bg-[color:var(--color-brand-secondary)] md:inline-flex",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      {cta.label[locale]} →
    </Link>
  );
}
