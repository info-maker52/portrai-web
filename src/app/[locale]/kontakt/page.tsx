import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { JsonLd } from "@/components/seo/JsonLd";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { CONTACT } from "@/lib/contact";
import { RESPONSE_PROMISE } from "@/lib/copy";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /kontakt — direct-contact landing.
 *
 * The booking form itself lives in the guided sheet (BookingFlow),
 * triggered by any "Get a quote" CTA across the site. This page
 * exists for the visitors who want either:
 *   - To open the guided flow with one click (the prominent button)
 *   - To reach us directly by email / phone / WhatsApp
 *
 * No form on this page. The "What happens next" timeline sits above
 * the contact details so visitors see the SLA promise before they
 * decide which channel to use.
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
        ? "Contact — book PortrAI or write directly | PortrAI"
        : "Kontakt — broneeri PortrAI või kirjuta otse | PortrAI",
    description:
      locale === "en"
        ? "Open the guided booking flow, email, call, or WhatsApp. We reply within 3 business hours."
        : "Ava juhitud broneerimisvoog, kirjuta e-postile, helista või WhatsApp. Vastame 3 töötunni jooksul.",
    locale,
    path: localizedSitePath(locale, "/kontakt"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Contact",
    headline: "Open the booking guide — or write directly.",
    sub: "The guided booking flow takes 60 seconds. Or skip it and email / call / WhatsApp.",
    primaryCta: "Open the booking guide",
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
    directEyebrow: "(03) Direct channels",
    directTitle: "Reach us without the flow.",
    directBody:
      "If you'd rather skip the guide, email is the fastest path. WhatsApp is good for quick checks.",
  },
  et: {
    eyebrow: "(01) Kontakt",
    headline: "Ava broneerimise juhend — või kirjuta otse.",
    sub: "Juhitud broneerimisvoog võtab 60 sekundit. Või jäta see vahele ja kirjuta / helista / WhatsApp.",
    primaryCta: "Ava broneerimise juhend",
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
    directEyebrow: "(03) Otsesed kanalid",
    directTitle: "Võta meiega ühendust ilma juhendita.",
    directBody:
      "Kui eelistad juhendit vahele jätta, on e-post kõige kiirem. WhatsApp sobib kiiretele küsimustele.",
  },
} as const;

const WHATSAPP_URL = (locale: SiteLocale) => {
  const t =
    locale === "en"
      ? "Hello, I'd like to ask about a PortrAI booth for an event."
      : "Tere, soovin küsida PortrAI fotoboksi kohta üritusele.";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t)}`;
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

      {/* Hero — quiet, one job: route the visitor to a channel. */}
      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.eyebrow}
        </p>
        <h1
          className="mb-6 max-w-4xl leading-[1.05] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-xl)",
            fontWeight: 400,
          }}
        >
          {copy.headline}
        </h1>
        <p
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.sub}
        </p>
        <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          <span aria-hidden>★</span>
          {text(locale, RESPONSE_PROMISE)}
        </p>
        <BookingTrigger
          className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.primaryCta} →
        </BookingTrigger>
      </section>

      {/* (02) What happens next — above the contact details so the
          visitor sees the promise before deciding how to reach us. */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.nextEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-md)",
            fontWeight: 400,
          }}
        >
          {copy.nextTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.next.map((step) => (
            <div key={step.n} className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {step.n}
              </p>
              <h3
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-title)",
                  fontWeight: 400,
                }}
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

      {/* (03) Direct channels */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.directEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-md)",
            fontWeight: 400,
          }}
        >
          {copy.directTitle}
        </h2>
        <p
          className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.directBody}
        </p>

        <div className="grid gap-4 md:grid-cols-3 lg:max-w-3xl">
          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex flex-col gap-2 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 transition-colors hover:border-[color:var(--color-brand-primary)]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {locale === "en" ? "Email" : "E-post"}
            </p>
            <p className="text-base text-white">{CONTACT.email}</p>
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="group flex flex-col gap-2 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 transition-colors hover:border-[color:var(--color-brand-primary)]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {locale === "en" ? "Phone" : "Telefon"}
            </p>
            <p className="text-base text-white">{CONTACT.phone}</p>
          </a>
          <a
            href={WHATSAPP_URL(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 transition-colors hover:border-[color:var(--color-brand-primary)]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              WhatsApp
            </p>
            <p className="text-base text-white">
              {locale === "en" ? "Open chat →" : "Ava vestlus →"}
            </p>
          </a>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
          {text(locale, CONTACT.hoursLabel)}
        </p>
      </section>
    </PageShell>
  );
}
