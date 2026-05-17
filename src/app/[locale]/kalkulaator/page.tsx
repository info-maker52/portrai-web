import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { PriceCalculator } from "@/components/pricing/PriceCalculator";
import { TrustRow } from "@/components/trust/TrustRow";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photobooth price calculator | PortrAI"
        : "AI fotoboksi hinnakalkulaator | PortrAI",
    description:
      locale === "en"
        ? "Get an indicative AI photobooth price for your event in 30 seconds. Pick a package, distance, guest count, and add-ons — see the total live."
        : "Saa indikatiivne AI fotoboksi hind oma üritusele 30 sekundiga. Vali pakett, kaugus, külaliste arv ja lisad — näe kokkuhinda kohe.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/kalkulaator"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Price calculator",
    headline: "An indicative number in 30 seconds.",
    subhead:
      "Pick a tier, set the distance, slide the guests, toggle add-ons. The breakdown updates live. For the full pricing page and FAQ, see /pricing.",
  },
  et: {
    eyebrow: "(01) Hinnakalkulaator",
    headline: "Indikatiivne number 30 sekundiga.",
    subhead:
      "Vali tase, sea kaugus, libista külalisi, lülita lisad. Hinnastruktuur uueneb kohe. Terve hinnaleht ja KKK on /hinnad lehel.",
  },
} as const;

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  return (
    <PageShell>
      <section className="px-6 pb-8 pt-24 md:px-12 md:pt-32">
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
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.subhead}
        </p>
        <TrustRow locale={locale} />
      </section>

      <section className="px-6 pb-32 md:px-12">
        <PriceCalculator />
      </section>
    </PageShell>
  );
}
