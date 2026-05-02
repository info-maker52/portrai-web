"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

type NavHref =
  | "/"
  | "/tood"
  | "/turundus"
  | "/peod"
  | "/marketing"
  | "/events"
  | "/teenused"
  | "/blog"
  | "/kontakt";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = (useLocale() as "et" | "en") ?? "et";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const nextLocale = locale === "et" ? "en" : "et";
  const menuLabel = menuOpen ? (locale === "en" ? "Close" : "Sulge") : "Menu";

  // Path labels are locale-aware: /turundus + /peod in ET, /marketing + /events in EN.
  const marketingHref: NavHref = locale === "en" ? "/marketing" : "/turundus";
  const eventsHref: NavHref = locale === "en" ? "/events" : "/peod";

  const navItems: Array<{ href: NavHref; number: string; label: string }> = [
    { href: "/tood", number: "01", label: t("work") },
    { href: marketingHref, number: "02", label: t("marketing") },
    { href: eventsHref, number: "03", label: t("events") },
    { href: "/kontakt", number: "04", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)]/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          PortrAI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              number={item.number}
              label={item.label}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
          >
            {t("switchLanguage")}
          </Link>
          <Link
            href="/kontakt"
            className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-soft)]"
          >
            {t("primary")}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={pathname}
            locale={nextLocale}
            className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            {t("switchLanguage")}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-[color:var(--color-stroke-medium)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-[color:var(--color-brand-primary)]/40 hover:bg-[color:var(--color-surface-raised)]"
          >
            {menuLabel}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                number={item.number}
                label={item.label}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </nav>

          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex rounded-md bg-[color:var(--color-brand-primary)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-soft)]"
          >
            {t("primary")} {"->"}
          </Link>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  number,
  label,
  onNavigate,
}: {
  href: NavHref;
  number: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
    >
      <span className="text-[color:var(--color-text-tertiary)] transition-colors group-hover:text-[color:var(--color-brand-accent)]">
        {number}
      </span>
      <span>- {label}</span>
    </Link>
  );
}
