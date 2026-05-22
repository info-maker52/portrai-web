"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import type { BookingEventType } from "@/components/booking/BookingFlowProvider";

const HIDE_ON_PATHS = ["/kontakt"];

/**
 * Per-route CTA shape. Either opens the booking flow (with an optional
 * eventType pre-fill matching the page) OR navigates to /hinnad's
 * embedded calculator on the pricing page itself.
 */
type StickyCta = {
  kind: "trigger" | "link";
  href?: "/hinnad" | "/hinnad#calculator";
  eventType?: BookingEventType;
  label: { en: string; et: string };
};

function ctaForPath(pathname: string): StickyCta {
  if (pathname === "/turundus" || pathname === "/marketing") {
    return {
      kind: "trigger",
      eventType: "brand",
      label: { en: "Bring us a brief", et: "Too meile brief" },
    };
  }
  if (pathname === "/hinnad") {
    return {
      kind: "link",
      href: "/hinnad#calculator",
      label: { en: "Open calculator", et: "Ava kalkulaator" },
    };
  }
  if (pathname === "/peod" || pathname === "/events") {
    return {
      kind: "link",
      href: "/hinnad",
      label: { en: "See pricing", et: "Vaata hindu" },
    };
  }
  if (pathname === "/boksid") {
    return {
      kind: "trigger",
      label: { en: "Pick a booth", et: "Vali boks" },
    };
  }
  if (pathname === "/pulma-fotoboks") {
    return {
      kind: "trigger",
      eventType: "wedding",
      label: { en: "Lock the date", et: "Pane kuupäev kinni" },
    };
  }
  if (pathname === "/messilahendused") {
    return {
      kind: "trigger",
      eventType: "tradeshow",
      label: { en: "Send the show brief", et: "Saada messi-brief" },
    };
  }
  if (pathname === "/firmapidu-fotoboks") {
    return {
      kind: "trigger",
      eventType: "corporate",
      label: { en: "Get a corporate quote", et: "Küsi firma pakkumist" },
    };
  }
  if (pathname === "/sunnipaev-fotoboks") {
    return {
      kind: "trigger",
      eventType: "private",
      label: { en: "Plan the night", et: "Planeeri õhtu" },
    };
  }
  return {
    kind: "trigger",
    label: { en: "Get a quote", et: "Küsi pakkumist" },
  };
}

/**
 * Desktop-only floating CTA. Switches label + behaviour by route so
 * the sticky button matches what the visitor is reading. Mobile gets
 * the wider StickyContactBar instead — the `md:inline-flex` /
 * `md:hidden` classes keep the two mutually exclusive.
 *
 * On most pages the CTA opens the booking flow with an event-type
 * pre-fill matching the page (so the visitor skips step 1 of the
 * flow). On /peod and /hinnad the CTA still navigates — pricing
 * snapshot or in-page calculator deep-link.
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

  const buttonClasses = [
    "fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[color:var(--color-brand-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-[var(--glow-medium)] transition-all duration-300 hover:bg-[color:var(--color-brand-secondary)] md:inline-flex",
    show
      ? "translate-y-0 opacity-100"
      : "pointer-events-none translate-y-3 opacity-0",
  ].join(" ");

  if (cta.kind === "link" && cta.href) {
    return (
      <Link href={cta.href} aria-hidden={!show} className={buttonClasses}>
        {cta.label[locale]} →
      </Link>
    );
  }

  return (
    <BookingTrigger
      ariaLabel={cta.label[locale]}
      ariaHidden={!show}
      className={buttonClasses}
      initialState={
        cta.eventType ? { eventType: cta.eventType } : undefined
      }
    >
      {cta.label[locale]} →
    </BookingTrigger>
  );
}
