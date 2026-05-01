import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact.details");

  return (
    <footer className="mt-32 border-t border-[color:var(--color-stroke-subtle)] px-6 pb-8 pt-16 md:px-12">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-wider"
          >
            PortrAI
          </Link>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {tFooter("company")}
          </p>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {tFooter("address")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {tFooter("contact")}
          </p>
          <a
            href={`mailto:${tContact("email")}`}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {tContact("email")}
          </a>
          <a
            href={`tel:${tContact("phone").replace(/\s/g, "")}`}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {tContact("phone")}
          </a>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {tContact("hours")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {tFooter("social")}
          </p>
          <a
            href="https://www.instagram.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Instagram {"->"}
          </a>
          <a
            href="https://www.facebook.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Facebook {"->"}
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--color-stroke-subtle)] pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          Copyright 2026 PortrAI - {tFooter("rights")}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          v0.1
        </p>
      </div>
    </footer>
  );
}
