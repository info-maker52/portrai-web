import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout/PageShell";
import { WorkIndexClient } from "@/components/work/WorkIndexClient";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

const HERO_COPY: Record<SiteLocale, { intro: string }> = {
  en: {
    intro:
      "A selection of launches, cultural events, conferences, and branded activations built around AI portraits people actually want to keep.",
  },
  et: {
    intro:
      "Tööde indeks on nüüd seemendatud päris projektitüüpide, allikapõhiste kokkuvõtete ja toimiva filtriloogikaga, et portfooliot saaks hinnata süsteemina juba enne lõplike piltide lisamist.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photo booth projects and campaign work | PortrAI"
        : "AI fotoboksi projektid ja kampaaniatööd | PortrAI",
    description:
      locale === "en"
        ? "Portfolio of AI photo booth launches, trade-show activations, company events, and branded portrait campaigns delivered by PortrAI."
        : "PortrAI portfoolio: AI fotoboksi lansseerimised, messiaktivatsioonid, firmaüritused ja bränditud portreekampaaniad.",
    locale,
    ogImage: "/images/work/von-fock-cover.jpg",
    path: localizedSitePath(locale, "/tood"),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero locale={locale} />
      <WorkIndexClient locale={locale} />
    </PageShell>
  );
}

function Hero({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("work");
  const intro =
    locale === "et"
      ? "Valik lansseerimisi, kultuurisündmusi, konverentse ja brändiaktivatsioone, kus AI-portreed on osa kogemusest ja mida inimesed päriselt tahavad alles hoida."
      : HERO_COPY[locale].intro;

  return (
    <section className="px-6 pb-16 pt-20 md:px-12 md:pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        (01) - {t("tagline")}
      </p>
      <h1
        className="mb-6 max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("title")}
      </h1>
      <p
        className="max-w-3xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {intro}
      </p>
    </section>
  );
}
