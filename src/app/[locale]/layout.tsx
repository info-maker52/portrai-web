import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { MotionProviders } from "@/components/motion/MotionProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, organizationSchema } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("siteName"), template: `%s - ${t("siteName")}` },
    description: t("description"),
    openGraph: {
      title: t("tagline"),
      description: t("description"),
      type: "website",
      locale: locale === "et" ? "et_EE" : "en_US",
      siteName: t("siteName"),
    },
    // No `alternates` here — that would cascade canonical: "/" onto every
    // child route. Per-page metadata sets canonical/hreflang where useful.
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <MotionProviders />
      {children}
    </NextIntlClientProvider>
  );
}
