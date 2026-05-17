import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { SlaBadges } from "@/components/trust/SlaBadges";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /photobooth-tallinn — SEO landing for "photobooth tallinn" (110/mo,
 * +57% 3-month trend). Single-screen geo landing that routes into the
 * core narrative pages (/peod for booking flow, /hinnad for price).
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
        ? "AI photobooth in Tallinn — same week, branded, award-winning | PortrAI"
        : "AI fotoboks Tallinnas — sama nädal, bränditud, auhinnatud | PortrAI",
    description:
      locale === "en"
        ? "PortrAI delivers AI photo experiences at venues across Tallinn. Local team, fast setup, award-winning work. From €490."
        : "PortrAI tarnib AI fotokogemusi Tallinna venue'des. Kohalik meeskond, kiire setup, auhinnatud töö. Alates 490 €.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/photobooth-tallinn"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Photobooth · Tallinn",
    headline: "AI photobooth in Tallinn. Local team, fast setup.",
    sub: "PortrAI is based in Tallinn. We arrive 90 minutes before doors, set up in 40, and the booth is tuned before the first guest walks in.",
    body1:
      "We have run booths at most of the city's event venues — corporate parties, brand activations, conferences. The local team knows the buildings, the load-ins, the lifts.",
    body2:
      "Tallinn (within 25 km) is included in every booking. Booking the studio-tier custom activations also starts from Tallinn — most of our agency partners are here.",
    primaryCta: "Get a Tallinn quote",
    secondaryCta: "See pricing",
  },
  et: {
    eyebrow: "(01) Fotoboks · Tallinn",
    headline: "AI fotoboks Tallinnas. Kohalik meeskond, kiire setup.",
    sub: "PortrAI asub Tallinnas. Saabume 90 minutit enne uste avamist, paneme üles 40 minutiga — boks on häälestatud enne, kui esimene külaline siseneb.",
    body1:
      "Oleme boksi jooksnud enamikus linna ürituste venue'des — firmapeod, brändi-aktivatsioonid, konverentsid. Kohalik meeskond tunneb hooneid, sissepääse, lifte.",
    body2:
      "Tallinn (kuni 25 km) on igas broneeringus sees. Studio-taseme kohandatud aktivatsioonid algavad samuti Tallinnast — enamik meie agentuuripartnereid asuvad siin.",
    primaryCta: "Küsi Tallinna pakkumist",
    secondaryCta: "Vaata hindu",
  },
} as const;

export default async function PhotoboothTallinnPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/photobooth-tallinn")}`;
  const service = serviceSchema({
    name:
      locale === "en"
        ? "AI photobooth rental — Tallinn"
        : "AI fotoboksi rent — Tallinn",
    description:
      locale === "en"
        ? "AI photo booth at venues across Tallinn. From €490, same-week availability."
        : "AI fotoboks Tallinna venue'des. Alates 490 €, sama nädala saadavus.",
    serviceType: "AI photobooth rental",
    url: pageUrl,
    priceRange: "490+ €",
    image: `${SITE_URL}/images/site/event-action.jpg`,
    areaServed: ["EE-37"],
  });
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: "Photobooth Tallinn", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />

      <section className="px-6 pb-16 pt-24 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.eyebrow}
            </p>
            <h1
              className="mb-6 font-medium leading-[1.05] tracking-tight"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              {copy.headline}
            </h1>
            <p
              className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.sub}
            </p>
            <p className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]">
              {copy.body1}
            </p>
            <p className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]">
              {copy.body2}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href={"/hinnad" as "/hinnad" | "/pricing"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>
          <ImagePlaceholder
            description="Hero photo: PortrAI booth at a recognisable Tallinn venue — Kultuurikatel, Lennusadam, or similar"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <SlaBadges locale={locale} />
      </section>
    </PageShell>
  );
}
