import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { TrustRow } from "@/components/trust/TrustRow";
import { CONTACT } from "@/lib/contact";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { type SiteLocale, text } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Book PortrAI — 4-step quote request | PortrAI"
        : "Broneeri PortrAI — 4-sammuline pakkumise päring | PortrAI",
    description:
      locale === "en"
        ? "Tell us about your event in four short steps. We respond within 24 hours with a precise AI photobooth quote."
        : "Räägi meile oma üritusest neljas lühikeses sammus. Vastame 24 tunni jooksul täpse AI fotoboksi pakkumisega.",
    locale,
    path: localizedSitePath(locale, "/broneeri"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Booking",
    headline: "Tell us about your event.",
    subhead:
      "Four short steps. We come back with a precise quote within 24 hours.",
    direct: "Prefer email or phone?",
  },
  et: {
    eyebrow: "(01) Broneerimine",
    headline: "Räägi meile oma üritusest.",
    subhead:
      "Neli lühikest sammu. Tuleme tagasi täpse pakkumisega 24 tunni jooksul.",
    direct: "Eelistad e-posti või telefoni?",
  },
} as const;

export default async function BookingPage({
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

      <section className="px-6 pb-12 md:px-12">
        <BookingWizard />
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.direct}
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-[color:var(--color-text-secondary)]">
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-white underline-offset-4 hover:underline"
          >
            {CONTACT.email}
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="text-white underline-offset-4 hover:underline"
          >
            {CONTACT.phone}
          </a>
          <span className="font-mono text-xs uppercase tracking-wider">
            {text(locale, CONTACT.hoursLabel)}
          </span>
        </div>
      </section>
    </PageShell>
  );
}
