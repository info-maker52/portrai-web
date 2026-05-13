"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";

const HIDE_ON_PATHS = ["/kontakt", "/broneeri"];

const COPY = {
  en: {
    quote: "Quote",
    call: "Call",
    whatsapp: "WhatsApp",
  },
  et: {
    quote: "Pakkumine",
    call: "Helista",
    whatsapp: "WhatsApp",
  },
} as const;

const WHATSAPP_TEXT = {
  en: "Hello, I'd like to ask about a PortrAI booth for an event.",
  et: "Tere, soovin küsida PortrAI fotoboksi kohta üritusele.",
} as const;

/**
 * Mobile-only sticky bar with three quick actions: quote / call / WhatsApp.
 * Appears once the user has scrolled ~60% of the viewport, hides on contact pages.
 */
export function StickyContactBar() {
  const locale = (useLocale() as "et" | "en") ?? "et";
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      const trigger = window.innerHeight * 0.6;
      setShow(window.scrollY > trigger);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON_PATHS.some((path) => pathname === path)) return null;

  const copy = COPY[locale];
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_TEXT[locale],
  )}`;

  return (
    <div
      aria-hidden={!show}
      className={[
        "fixed inset-x-3 bottom-3 z-40 flex items-stretch gap-2 rounded-full border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)]/95 p-1 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 md:hidden",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <Link
        href="/broneeri"
        className="flex-1 rounded-full bg-[color:var(--color-brand-primary)] px-4 py-3 text-center font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-brand-secondary)]"
      >
        {copy.quote} →
      </Link>
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
        aria-label={`${copy.call} ${CONTACT.phone}`}
      >
        ☎ {copy.call}
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
        aria-label="WhatsApp"
      >
        ✆ {copy.whatsapp}
      </a>
    </div>
  );
}
