import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { MotionProviders } from "@/components/motion/MotionProviders";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { BookingFlowProvider } from "@/components/booking/BookingFlowProvider";
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
      {/* Skip link — first focusable element, visible only on keyboard focus. */}
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-[color:var(--color-brand-primary)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {locale === "en" ? "Skip to content" : "Liigu sisu juurde"}
      </a>
      {/* Sets <html lang> client-side without forcing dynamic rendering on
          every route. Static SSG wins — and a11y tools see the right lang
          immediately after hydration. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <MotionProviders />
      <BookingFlowProvider>
        {children}
        {/* The booking sheet is mounted at the layout level so any
            BookingTrigger across the app can open it. Renders only when
            the provider's isOpen flag is true. */}
        <BookingFlow />
      </BookingFlowProvider>
    </NextIntlClientProvider>
  );
}
