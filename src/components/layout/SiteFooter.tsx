import NextLink from "next/link";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT } from "@/lib/contact";

/* Hallmark · component: Ft1 Mast-headed + Ft6 Letter close · genre: editorial
 * Was the AI-footer fingerprint (4–5 column link grid + social row +
 * copyright tail). Now: huge PortrAI wordmark mast, a short signed
 * paragraph (letter close), and a single-line index of routes in mono.
 * Closes the page instead of cataloguing it. */

const COPY = {
  en: {
    letter:
      "PortrAI is a small team in Tallinn. We build AI photo experiences — for company parties one weekend, for a campaign brief the next. If your event is the kind people will still talk about on Monday, write to us.",
    sign: "Reijo Pullai · founder",
    indexLabel: "Index",
    moreLabel: "Use cases",
    write: "Write to us",
    call: "Call",
    rights: "All rights reserved.",
    address: "PortrAI OÜ · Tallinn, Estonia",
  },
  et: {
    letter:
      "PortrAI on väike meeskond Tallinnas. Ehitame AI fotokogemusi — ühel nädalavahetusel firmapeole, järgmisel kampaania briifi peale. Kui sinu üritus on selline, millest räägitakse veel esmaspäeval, kirjuta meile.",
    sign: "Reijo Pullai · asutaja",
    indexLabel: "Indeks",
    moreLabel: "Kasutuskohad",
    write: "Kirjuta meile",
    call: "Helista",
    rights: "Kõik õigused kaitstud.",
    address: "PortrAI OÜ · Tallinn, Eesti",
  },
} as const;

export function SiteFooter() {
  const locale = (useLocale() as "et" | "en") ?? "et";
  const copy = COPY[locale];

  const indexLinks: Array<{ href: string; label: string }> = [
    {
      href: "/turundus",
      label: locale === "en" ? "Marketing" : "Turundus",
    },
    {
      href: "/peod",
      label: locale === "en" ? "Events" : "Peod",
    },
    { href: "/boksid", label: locale === "en" ? "Booths" : "Boksid" },
    { href: "/tood", label: locale === "en" ? "Work" : "Tööd" },
    { href: "/hinnad", label: locale === "en" ? "Pricing" : "Hinnad" },
    { href: "/stiilid", label: locale === "en" ? "Styles" : "Stiilid" },
    { href: "/blog", label: "Blog" },
    {
      href: "/kontakt",
      label: locale === "en" ? "Contact" : "Kontakt",
    },
  ];

  const useCaseLinks: Array<{ href: string; label: string }> = [
    {
      href: "/firmapidu-fotoboks",
      label: locale === "en" ? "Company party" : "Firmapidu",
    },
    {
      href: "/pulma-fotoboks",
      label: locale === "en" ? "Wedding · Spring 2026" : "Pulm · kevad 2026",
    },
    {
      href: "/sunnipaev-fotoboks",
      label: locale === "en" ? "Birthday & private" : "Sünnipäev & eraüritus",
    },
    {
      href: "/messilahendused",
      label: locale === "en" ? "Trade-show booth" : "Messilahendused",
    },
    {
      href: "/fotopeegel",
      label: "Fotopeegel",
    },
    {
      href: "/photobooth-tallinn",
      label: "Photobooth Tallinn",
    },
  ];

  return (
    <footer className="mt-32 border-t border-[color:var(--color-stroke-subtle)] px-6 pb-10 pt-20 md:px-12 md:pt-28">
      {/* (1) Mast — full-width wordmark in display face */}
      <Link
        href="/"
        className="block leading-none tracking-tight text-white transition-opacity hover:opacity-80"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4.5rem, 14vw, 12rem)",
          fontWeight: 400,
        }}
        aria-label="PortrAI"
      >
        PortrAI
      </Link>

      {/* (2) Letter close — signed paragraph */}
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="max-w-2xl">
          <p
            className="text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            {copy.letter}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
            — {copy.sign}
          </p>
        </div>

        {/* (3) Direct contact — letter-style address block */}
        <div className="flex flex-col gap-3 text-[color:var(--color-text-secondary)]">
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-mono text-sm text-white underline-offset-4 transition-colors hover:underline"
          >
            {CONTACT.email}
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="font-mono text-sm text-white underline-offset-4 transition-colors hover:underline"
          >
            {CONTACT.phone}
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
            {copy.address}
          </p>
        </div>
      </div>

      {/* (4) Index — single-line route list. Replaces the 4-column grid. */}
      <div className="mt-16 border-t border-[color:var(--color-stroke-subtle)] pt-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          {copy.indexLabel}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {indexLinks.map((link, i) => (
            <span
              key={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              <Link
                href={link.href as never}
                className="text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
              {i < indexLinks.length - 1 && (
                <span className="ml-4 text-[color:var(--color-text-tertiary)]">·</span>
              )}
            </span>
          ))}
        </div>

        <p className="mt-8 mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          {copy.moreLabel}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {useCaseLinks.map((link, i) => (
            <span
              key={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              <Link
                href={link.href as never}
                className="text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
              {i < useCaseLinks.length - 1 && (
                <span className="ml-4 text-[color:var(--color-text-tertiary)]">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* (5) Colophon — language switch + social handles + copyright */}
      <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--color-stroke-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
          © 2026 · {copy.rights}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <Link href="/" locale="et" className="text-[color:var(--color-text-secondary)] hover:text-white">
            Eesti
          </Link>
          <Link href="/" locale="en" className="text-[color:var(--color-text-secondary)] hover:text-white">
            English
          </Link>
          <NextLink href="/ru" className="text-[color:var(--color-text-secondary)] hover:text-white">
            Русский
          </NextLink>
          <span className="text-[color:var(--color-text-tertiary)]">·</span>
          <a
            href="https://www.instagram.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-text-secondary)] hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-text-secondary)] hover:text-white"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
