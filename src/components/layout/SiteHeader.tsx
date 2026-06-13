"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/* Hallmark · component: N5 Floating pill · genre: modern-minimal
 * Was the AI-nav fingerprint (wordmark left + 5 numbered links + filled
 * CTA right + sticky + backdrop-blur). Now: minimal top row (wordmark
 * only) + a center-floating capsule of nav links that reveals
 * post-hero-scroll. Different shape from the SaaS default; reads as a
 * photo studio rather than a SaaS template. */

type NavHref =
  | "/"
  | "/turundus"
  | "/peod"
  | "/boksid"
  | "/tood"
  | "/hinnad"
  | "/blog"
  | "/kontakt";

export function SiteHeader() {
  const locale = (useLocale() as "et" | "en") ?? "et";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillVisible, setPillVisible] = useState(false);

  // Floating pill appears after the first viewport scroll — the hero owns
  // the top of the page on home; on other pages it reveals quickly.
  useEffect(() => {
    const threshold = pathname === "/" ? 0.6 : 0.15;
    function onScroll() {
      setPillVisible(window.scrollY > window.innerHeight * threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const nextLocale = locale === "et" ? "en" : "et";

  // Routes use ET path segments in both locales (the canonical URLs). The
  // old /marketing + /events EN aliases were removed — they caused a
  // duplicate-content + canonical conflict (the page canonical pointed at
  // /en/turundus while the nav linked /en/marketing).
  const eventsHref: NavHref = "/peod";

  const turundusHref: NavHref = "/turundus";

  const labels = {
    turundus: locale === "en" ? "Marketing" : "Turundus",
    events: locale === "en" ? "Events" : "Peod",
    booths: locale === "en" ? "Booths" : "Boksid",
    work: locale === "en" ? "Work" : "Tööd",
    pricing: locale === "en" ? "Pricing" : "Hinnad",
    contact: locale === "en" ? "Contact" : "Kontakt",
    quote: locale === "en" ? "Get a quote" : "Küsi pakkumist",
    menu: locale === "en" ? "Menu" : "Menüü",
    close: locale === "en" ? "Close" : "Sulge",
    switchLanguage: locale === "en" ? "ET" : "EN",
  };

  // Numbered eyebrows + filled CTA buttons removed deliberately — those
  // were the AI-nav tells. Plain word links inside the pill instead.
  const navItems: Array<{ href: NavHref; label: string }> = [
    { href: turundusHref, label: labels.turundus },
    { href: eventsHref, label: labels.events },
    { href: "/boksid", label: labels.booths },
    { href: "/tood", label: labels.work },
    { href: "/hinnad", label: labels.pricing },
  ];

  const menuLabel = menuOpen ? labels.close : labels.menu;

  return (
    <>
      {/* Top row — quiet. Wordmark left, language switch + contact link right.
          No fill, no border, no backdrop-blur. */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight transition-opacity hover:opacity-70 md:text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
          onClick={() => setMenuOpen(false)}
        >
          PortrAI
        </Link>

        <div className="flex items-center gap-5 md:gap-6">
          <Link
            href={pathname}
            locale={nextLocale}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            {labels.switchLanguage}
          </Link>
          <Link
            href="/kontakt"
            className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white underline-offset-4 transition-colors hover:underline md:inline"
          >
            {labels.contact}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[color:var(--color-brand-primary)]/60 hover:bg-[color:var(--color-surface-raised)] md:hidden"
          >
            {menuLabel}
          </button>
        </div>
      </header>

      {/* Floating center pill — desktop only. Appears post-scroll. */}
      <nav
        aria-label={locale === "en" ? "Primary navigation" : "Põhinavigatsioon"}
        className={[
          "fixed inset-x-0 top-5 z-30 hidden justify-center transition-all duration-500 md:flex",
          pillVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center gap-1 rounded-full border border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-base)]/85 px-2 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "bg-[color:var(--color-brand-primary)]/15 text-white"
                    : "text-[color:var(--color-text-secondary)] hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile expanded menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[color:var(--color-surface-base)] px-6 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-2xl tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
              onClick={() => setMenuOpen(false)}
            >
              PortrAI
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white"
            >
              {labels.close}
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl tracking-tight text-white transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl tracking-tight text-[color:var(--color-brand-accent)] transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {labels.contact}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
