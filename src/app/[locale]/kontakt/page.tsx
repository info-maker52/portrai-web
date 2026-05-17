import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { TrustRow } from "@/components/trust/TrustRow";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { CONTACT } from "@/lib/contact";
import { RESPONSE_PROMISE } from "@/lib/copy";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /kontakt — the single conversion page.
 *
 * The 4-step booking wizard lives here (was /broneeri, now absorbed). The
 * right column on desktop carries the direct-contact details + EUIC partner
 * badge + SLA badges. The "what happens next" timeline below the wizard
 * tells the visitor what their next four touchpoints will be.
 *
 * Voice: Linear restraint. No marketing fluff. The page IS the conversion.
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
        ? "Contact — tell us about your event | PortrAI"
        : "Kontakt — räägi meile oma üritusest | PortrAI",
    description:
      locale === "en"
        ? "Four short steps to a precise quote. We reply within 3 business hours."
        : "Neli lühikest sammu täpse pakkumiseni. Vastame 3 töötunni jooksul.",
    locale,
    path: localizedSitePath(locale, "/kontakt"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Contact",
    headline: "Tell us about your event.",
    sub: "Four short steps. We reply within 3 business hours with a sharp first read.",
    directLabel: "Or skip the form",
    nextEyebrow: "(02) What happens next",
    nextTitle: "Four touchpoints between here and the event.",
    next: [
      {
        n: "01",
        title: "Quote in 3h",
        body: "A first proposal with package, indicative price and 2–3 dates we can hold.",
      },
      {
        n: "02",
        title: "Concept call",
        body: "30-minute call to align the booth shape, themes and any branding.",
      },
      {
        n: "03",
        title: "Tech check",
        body: "We confirm space, power and load-in 7–10 days before the event.",
      },
      {
        n: "04",
        title: "Event night",
        body: "We arrive 90 min early. You enjoy your night. Photos delivered by dawn.",
      },
    ],
  },
  et: {
    eyebrow: "(01) Kontakt",
    headline: "Räägi meile oma üritusest.",
    sub: "Neli lühikest sammu. Vastame 3 töötunni jooksul terava esimese lugemisega.",
    directLabel: "Või jäta vormistus vahele",
    nextEyebrow: "(02) Mis edasi juhtub",
    nextTitle: "Neli puutepunkti siit ürituseni.",
    next: [
      {
        n: "01",
        title: "Pakkumine 3 tunniga",
        body: "Esimene ettepanek paketi, indikatiivse hinna ja 2–3 vaba kuupäevaga.",
      },
      {
        n: "02",
        title: "Kontseptsiooni-kõne",
        body: "30-minutiline kõne — boksi kuju, teemad, brändi-küsimused paika.",
      },
      {
        n: "03",
        title: "Tehniline kontroll",
        body: "Kinnitame ruumi, voolu ja sissepääsu 7–10 päeva enne üritust.",
      },
      {
        n: "04",
        title: "Ürituse õhtu",
        body: "Saabume 90 min varem. Sina naudid õhtut. Pildid valmis hommikuks.",
      },
    ],
  },
} as const;

const WHATSAPP_URL = (locale: SiteLocale) => {
  const text =
    locale === "en"
      ? "Hello, I'd like to ask about a PortrAI booth for an event."
      : "Tere, soovin küsida PortrAI fotoboksi kohta üritusele.";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/kontakt")}`;

  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Contact" : "Kontakt", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
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
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.sub}
        </p>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          <span aria-hidden>★</span>
          {text(locale, RESPONSE_PROMISE)}
        </p>
        <TrustRow locale={locale} />
      </section>

      {/* Wizard + direct contact column */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <BookingWizard />

          {/* Direct contact column */}
          <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.directLabel}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-lg text-white underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-lg text-white underline-offset-4 hover:underline"
              >
                {CONTACT.phone}
              </a>
              <a
                href={WHATSAPP_URL(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-white underline-offset-4 hover:underline"
              >
                WhatsApp →
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
                {text(locale, CONTACT.hoursLabel)}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* (02) What happens next */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.nextEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.nextTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.next.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {step.n}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SlaBadges locale={locale} />
        </div>
      </section>
    </PageShell>
  );
}
