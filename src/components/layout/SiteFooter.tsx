import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Site footer.
 *
 * 4 columns on desktop:
 *   1. Brand + legal
 *   2. Contact
 *   3. Sitemap (work / marketing / events / blog)
 *   4. Social
 *
 * Sitemap column uses locale-aware hrefs:
 *   - ET: /studio, /peod
 *   - EN: /studio, /events
 */
export function SiteFooter() {
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact.details");
  const tNav = useTranslations("nav");
  const locale = (useLocale() as "et" | "en") ?? "et";

  // /tood, /hinnad, /boksid have no EN URL alias — same path in both locales.
  // /peod has a /events alias re-export kept for historical inbound links.
  const eventsHref = locale === "en" ? "/events" : "/peod";
  const boothsHref = "/boksid";
  const workHref = "/tood";
  const pricingHref = "/hinnad";
  const sitemapLabel = locale === "en" ? "Site" : "Leht";
  const moreLabel = locale === "en" ? "More" : "Veel";

  return (
    <footer className="mt-32 border-t border-[color:var(--color-stroke-subtle)] px-6 pb-8 pt-16 md:px-12">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
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

        {/* Primary sitemap — 5 main nav routes */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {sitemapLabel}
          </p>
          <Link
            href={"/studio" as "/studio"}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Studio" : "Studio"}
          </Link>
          <Link
            href={eventsHref as "/peod" | "/events"}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Events" : "Peod"}
          </Link>
          <Link
            href={boothsHref as "/boksid"}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Booths" : "Boksid"}
          </Link>
          <Link
            href={workHref as "/tood"}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Work" : "Tööd"}
          </Link>
          <Link
            href={pricingHref as "/hinnad"}
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Pricing" : "Hinnad"}
          </Link>
        </div>

        {/* Secondary + SEO landing pages — discoverable but not in top nav */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {moreLabel}
          </p>
          <Link
            href="/blog"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {tNav("blog")}
          </Link>
          <Link
            href="/kontakt"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {tNav("contact")}
          </Link>
          <Link
            href="/stiilid"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "AI styles" : "AI stiilid"}
          </Link>
          <Link
            href="/fotopeegel"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Fotopeegel
          </Link>
          <Link
            href="/firmapidu-fotoboks"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Company party" : "Firmapidu"}
          </Link>
          <Link
            href="/pulma-fotoboks"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Wedding · Spring 2026" : "Pulm · kevad 2026"}
          </Link>
          <Link
            href="/sunnipaev-fotoboks"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Birthday & private" : "Sünnipäev & eraüritus"}
          </Link>
          <Link
            href="/messilahendused"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            {locale === "en" ? "Trade-show booth" : "Messilahendused"}
          </Link>
          <Link
            href="/photobooth-tallinn"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Photobooth Tallinn
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {tFooter("social")}
          </p>
          <a
            href="https://www.instagram.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PortrAI on Instagram (opens in new tab)"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Instagram <span aria-hidden>→</span>
          </a>
          <a
            href="https://www.facebook.com/portrai.ee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="PortrAI on Facebook (opens in new tab)"
            className="text-sm transition-colors hover:text-[color:var(--color-brand-accent)]"
          >
            Facebook <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--color-stroke-subtle)] pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          © 2026 PortrAI · {tFooter("rights")}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          <Link href="/" locale="et" className="hover:text-white">
            Eesti
          </Link>{" · "}
          <Link href="/" locale="en" className="hover:text-white">
            English
          </Link>
          {" · "}
          {/* Plain Next link — /ru lives outside next-intl routing */}
          <NextLink href="/ru" className="hover:text-white">
            Русский
          </NextLink>
        </p>
      </div>
    </footer>
  );
}
