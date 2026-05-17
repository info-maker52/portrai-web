import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { OutcomeMetrics } from "@/components/trust/OutcomeMetrics";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  buildPageMetadata,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /messilahendused — SEO landing for "messiboks" / "messilahendused" /
 * "konverentsi fotoboks" (small volume, premium CPC €1.51–€11.76).
 *
 * Routes the buyer into /studio for the actual offering. The lead-capture
 * angle from the competitor analysis becomes the load-bearing message.
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
        ? "Trade-show booth (messibox) — lead capture + AI portraits | PortrAI"
        : "Messiboks ja konverentsi-fotoboks — leadid + AI portreed | PortrAI",
    description:
      locale === "en"
        ? "Stop standing alone in your trade-show booth. AI photos pull visitors in, GDPR-clean lead capture sends them to your CRM the next morning."
        : "Lõpeta messistandil üksinda seismine. AI fotod toovad külastajad sisse, GDPR-puhas leadide kogumine saadab nad sinu CRM-i järgmisel hommikul.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/messilahendused"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Messibox & conference booths",
    headline: "A trade-show booth that pulls visitors and captures leads.",
    sub: "PortrAI's trade-show offering is a Custom Activation — booth + AI photo + opt-in lead capture, all branded to your stand. Visitors stop because the AI portrait pulls them in. They opt in to receive the photo. You leave with a CSV ready for your CRM.",
    body1:
      "We have run trade-show booths at the European Innovation Council Summit, Latitude59, and brand activations across Estonia, Finland, Germany and the USA. Custom flow, custom UI, your domain on the QR.",
    body2:
      "Trade-show activations sit in the Custom Activation tier — quote-only because pricing depends on the depth of the brand-integration, the length of the show, and whether you want the experience to live on a microsite afterwards.",

    outcomesEyebrow: "(02) What you usually see",
    outcomesBody:
      "Aggregated across PortrAI trade-show activations. Your numbers depend on booth size, foot traffic, and how the activation is positioned on your stand.",

    ctaEyebrow: "(03) Bring us your show brief",
    ctaTitle: "Tell us about the show.",
    ctaBody:
      "Dates, stand size, the audience profile. We come back with a concept inside 3 business hours.",
    primaryCta: "Open the studio",
    secondaryCta: "Talk to us",
  },
  et: {
    eyebrow: "(01) Messiboks ja konverentsi-boks",
    headline: "Messiboks, mis tõmbab külastajaid ja kogub leadi.",
    sub: "PortrAI messi-pakkumine on Custom Activation — boks + AI foto + opt-in leadide kogumine, kõik bränditud sinu standile. Külastajad peatuvad, sest AI portree tõmbab nad sisse. Nad annavad nõusoleku saada pilt. Sina lahkud CSV-iga, mis on valmis sinu CRM-i.",
    body1:
      "Oleme messistande jooksnud European Innovation Council Summit'il, Latitude59-l ja brändi-aktivatsioonidel üle Eesti, Soome, Saksamaa ja USA. Kohandatud voog, kohandatud UI, sinu domeen QR-il.",
    body2:
      "Messi-aktivatsioonid kuuluvad Custom Activation tasemesse — pakkumise alusel, sest hind sõltub brändi-integratsiooni sügavusest, messi pikkusest ja sellest, kas tahad, et kogemus elaks pärast mikrosaidil.",

    outcomesEyebrow: "(02) Mida tüüpiliselt näed",
    outcomesBody:
      "Kokku võetud PortrAI messi-aktivatsioonidelt. Sinu numbrid sõltuvad standi suurusest, läbikäigust ja sellest, kuidas aktivatsioon on standile paigutatud.",

    ctaEyebrow: "(03) Too meile messi-brief",
    ctaTitle: "Räägi meile messist.",
    ctaBody:
      "Kuupäevad, standi suurus, publiku profiil. Tuleme tagasi kontseptsiooniga 3 töötunni jooksul.",
    primaryCta: "Ava stuudio",
    secondaryCta: "Räägi meiega",
  },
} as const;

export default async function MessilahendusedPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/messilahendused")}`;
  const service = serviceSchema({
    name:
      locale === "en"
        ? "Trade-show messibox + lead capture"
        : "Messiboks ja leadide kogumine",
    description:
      locale === "en"
        ? "AI photo activations for trade-show stands and conferences — GDPR-clean lead capture, branded UI, optional virtual widget."
        : "AI foto-aktivatsioonid messistandidele ja konverentsidele — GDPR-puhas leadide kogumine, bränditud UI, valikuline virtuaalne widget.",
    serviceType: "Trade-show photobooth activation",
    url: pageUrl,
    image: `${SITE_URL}/images/site/event-action.jpg`,
  });
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Trade-show booth" : "Messilahendused", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />

      <section className="px-6 pb-16 pt-24 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
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
                  href={"/studio" as "/studio"}
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href="/kontakt"
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>
          <ImagePlaceholder
            description="Hero photo: PortrAI booth integrated into a brand's trade-show stand — booth visible in context with the larger booth setup, queue of visitors visible"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.outcomesEyebrow}
          </p>
          <p
            className="self-end max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.outcomesBody}
          </p>
        </div>
        <OutcomeMetrics locale={locale} />
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          {copy.ctaEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {copy.ctaTitle}
        </h2>
        <p
          className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.ctaBody}
        </p>
        <MagneticButton>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.secondaryCta} →
          </Link>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
