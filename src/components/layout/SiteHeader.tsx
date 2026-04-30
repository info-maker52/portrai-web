import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Editorial top nav.
 * Numbered nav items in mono — Direction B signature.
 * Sticky on desktop, collapses on mobile (hamburger lands in Phase 4).
 */
export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)]/80 px-6 py-5 backdrop-blur-md md:px-12">
      <Link
        href="/"
        className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
      >
        PortrAI
      </Link>

      <nav className="hidden gap-8 md:flex">
        <NavLink href="/tood" number="01" label={t("work")} />
        <NavLink href="/teenused" number="02" label={t("services")} />
        <NavLink href="/blog" number="03" label={t("blog")} />
        <NavLink href="/kontakt" number="04" label={t("contact")} />
      </nav>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          locale="en"
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
        >
          {t("switchLanguage")}
        </Link>
        <Link
          href="/kontakt"
          className="hidden rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-soft)] md:inline-block"
        >
          {t("primary")}
        </Link>
      </div>
    </header>
  );
}

function NavLink({
  href,
  number,
  label,
}: {
  href: "/tood" | "/teenused" | "/blog" | "/kontakt";
  number: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
    >
      <span className="text-[color:var(--color-text-tertiary)] transition-colors group-hover:text-[color:var(--color-brand-accent)]">
        {number}
      </span>
      <span>— {label}</span>
    </Link>
  );
}
