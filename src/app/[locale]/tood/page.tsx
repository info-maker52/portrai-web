import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkIndexClient } from "@/components/work/WorkIndexClient";
import { AWARD_BADGES } from "@/lib/copy";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /tood (ET) / /work (EN) — case-study grid.
 *
 * Voice: Linear restraint. The portfolio speaks; copy stays out of its way.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Work — campaigns and events we've shipped | PortrAI"
        : "Tööd — kampaaniad ja üritused | PortrAI",
    description:
      locale === "en"
        ? "Portfolio of PortrAI campaigns and events — Swedbank, Synlab, Von Fock for ERR, Postimees Laulupidu, MELT, Telia, OIXIO."
        : "PortrAI portfoolio — Swedbank, Synlab, Von Fock ERR-ile, Postimehe Laulupidu, MELT, Telia, OIXIO.",
    locale,
    ogImage: "/images/work/von-fock-cover.jpg",
    path: localizedSitePath(locale, "/tood"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Work",
    headline: "Campaigns we've shipped. Award territory.",
    sub: "A portfolio of brand activations, corporate events and cultural campaigns. Filter by category to find the one closest to your brief.",
    awardsEyebrow: "(02) Graded",
    nextEyebrow: "(03) Want one like this?",
    nextTitle: "Bring us a brief.",
    nextBody:
      "Every project on this page started from a brief. Yours can be the next one.",
    nextCta: "Bring us a brief",
  },
  et: {
    eyebrow: "(01) Tööd",
    headline: "Tehtud kampaaniad. Auhinnatud territoorium.",
    sub: "Portfoolio brändi-aktivatsioonidest, firma-üritustest ja kultuurikampaaniatest. Filtreeri kategooria järgi, et leida see, mis on sinu briifile lähim.",
    awardsEyebrow: "(02) Hinnatud",
    nextEyebrow: "(03) Tahad ühte selliseid?",
    nextTitle: "Too meile brief.",
    nextBody:
      "Iga projekt sellel lehel algas briifist. Sinu oma võib olla järgmine.",
    nextCta: "Too meile brief",
  },
} as const;

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/tood")}`;
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Work" : "Tööd", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      {/* Hero — minimal, no image. The grid below does the visual work. */}
      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.eyebrow}
        </p>
        <h1
          className="mb-6 max-w-4xl font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {copy.headline}
        </h1>
        <p
          className="max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.sub}
        </p>
      </section>

      {/* Grid — filter chips + cards */}
      <WorkIndexClient locale={locale} />

      {/* Awards strip — compact second appearance */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.awardsEyebrow}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {AWARD_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-brand-primary)]/30 bg-[color:var(--color-brand-primary)]/5 p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)]/15 text-[color:var(--color-brand-accent)]">
                ★
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                {text(locale, badge.label)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA → studio */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          {copy.nextEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {copy.nextTitle}
        </h2>
        <p
          className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.nextBody}
        </p>
        <Link
          href={"/studio" as "/studio"}
          className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.nextCta} →
        </Link>
      </section>
    </PageShell>
  );
}
