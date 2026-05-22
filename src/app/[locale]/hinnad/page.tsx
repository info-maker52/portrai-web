import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PriceCalculator } from "@/components/pricing/PriceCalculator";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { ADD_ONS, formatEur, PACKAGES } from "@/lib/pricing";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /hinnad (ET) and /pricing (EN) — pricing page.
 *
 * Three tiers, two with a transparent "from €X" anchor and one Custom tier
 * with no public price. Live calculator embedded. Add-ons priced openly.
 *
 * Voice: Linear restraint. Numbers do the work. Custom tier is the
 * conversation-starter — never anchor it with a number.
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
        ? "Pricing — booth from €490, campaigns by quote | PortrAI"
        : "Hinnad — boks alates 490 €, kampaaniad pakkumise alusel | PortrAI",
    description:
      locale === "en"
        ? "Boks from €490, Branded from €890, Custom Activation by quote. Calculator gives an indicative price in 30 seconds."
        : "Boks alates 490 €, Branded alates 890 €, Custom Activation pakkumise alusel. Kalkulaator annab indikatiivse hinna 30 sekundiga.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/hinnad"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Pricing",
    headline: "Booth from €490. Campaigns by quote.",
    sub: "Two productized tiers for direct bookings. A third for custom activations where the brief is bigger than the booth. The calculator gives an indicative number in 30 seconds.",
    calcCta: "Open calculator",
    bookCta: "Get a quote",

    packagesEyebrow: "(02) Packages",
    packagesTitle: "Pick the tier that fits the room.",
    fromLabel: "from",
    customPriceLabel: "By quote",
    customCta: "Talk about your concept",
    bookTier: "Book this tier",

    addOnsEyebrow: "(03) Add-ons",
    addOnsTitle: "Build the experience your event needs.",
    addOnsBody:
      "Common add-ons priced openly. Anything outside this list gets a custom quote within 3 business hours.",

    calcEyebrow: "(04) Calculator",
    calcTitle: "An indicative number in 30 seconds.",
    calcBody:
      "Pick a tier, choose distance, slide guests, toggle add-ons. The breakdown updates live. Custom activations don't slot in here — talk to us about those.",

    inclusionsEyebrow: "(05) On every tier",
    inclusionsTitle: "What's always in the price.",
    inclusions: [
      "On-site host running the booth start to finish",
      "All digital photos to every guest via QR + shared link by dawn",
      "Setup and teardown within 40 minutes total",
      "Liability insurance up to €100,000",
      "Quote response within 3 business hours, every time",
    ],

    faqEyebrow: "(06) Pricing FAQ",
    faqTitle: "What people ask before they book.",
    faq: [
      {
        q: "Why isn't there one fixed price?",
        a: "Event size, distance from Tallinn, length, and add-ons all move the cost. The tiers anchor the typical range; the calculator gives you the exact number for your event in 30 seconds.",
      },
      {
        q: "What's the cheapest event you'll do?",
        a: "Boks at €490 covers smaller weddings, birthdays and casual corporate evenings around Tallinn. Below that we usually point clients to a simpler partner — talk to us and we'll be honest about fit.",
      },
      {
        q: "What does Custom Activation actually cost?",
        a: "Quote-only. Pricing depends on the brief: concept depth, custom UI work, microsite, integrations, event length. The Swedbank, Synlab, Von Fock and Laulupidu projects are all in this tier.",
      },
      {
        q: "Does the price include VAT?",
        a: "All listed prices are without VAT (22%). The calculator shows both the net subtotal and the VAT-inclusive total.",
      },
      {
        q: "Are travel costs included?",
        a: "Tallinn within 25 km is included. Beyond that — €90 within 100 km, €180 within 200 km, custom quote further or abroad.",
      },
      {
        q: "Can I get a custom AI theme?",
        a: "Yes. Custom AI themes are €290 as an add-on on Boks or Branded, included on Custom Activation. Delivered within 2 weeks.",
      },
    ],

    ctaTitle: "Ready for an exact number?",
    ctaBody:
      "Run the calculator or send a quote request — both take under 60 seconds.",
    primaryCta: "Get a quote",
    secondaryCta: "Open calculator",
  },
  et: {
    eyebrow: "(01) Hinnad",
    headline: "Boks alates 490 €. Kampaaniad pakkumise alusel.",
    sub: "Kaks produktitud taset otsesteks broneeringuteks. Kolmas — kohandatud aktivatsioonidele, kui brief on suurem kui boks. Kalkulaator annab indikatiivse numbri 30 sekundiga.",
    calcCta: "Ava kalkulaator",
    bookCta: "Küsi pakkumist",

    packagesEyebrow: "(02) Paketid",
    packagesTitle: "Vali tase, mis sobib saalile.",
    fromLabel: "alates",
    customPriceLabel: "Pakkumise alusel",
    customCta: "Räägi kontseptsioonist",
    bookTier: "Broneeri see tase",

    addOnsEyebrow: "(03) Lisad",
    addOnsTitle: "Lisa juurde see, mida üritus vajab.",
    addOnsBody:
      "Tavalised lisad on hinnastatud avalikult. Kõik, mis siit välja jääb, saab eraldi pakkumise 3 töötunni jooksul.",

    calcEyebrow: "(04) Kalkulaator",
    calcTitle: "Indikatiivne number 30 sekundiga.",
    calcBody:
      "Vali tase, vali kaugus, libista külalisi, lülita lisad. Hinnastruktuur uueneb kohe. Kohandatud aktivatsioonid siia ei sobi — räägi meiega nende kohta.",

    inclusionsEyebrow: "(05) Igal tasemel",
    inclusionsTitle: "Mis on alati hinnas sees.",
    inclusions: [
      "Kohapealne host hoiab boksi käigus algusest lõpuni",
      "Kõik digitaalsed pildid igale külalisele QR-i kaudu + jagatud link hommikuks",
      "Ülespanek ja maha võtmine 40 minutiga",
      "Vastutuskindlustus kuni 100 000 €",
      "Pakkumise vastus 3 töötunni jooksul, alati",
    ],

    faqEyebrow: "(06) Hinna KKK",
    faqTitle: "Mida inimesed enne broneerimist küsivad.",
    faq: [
      {
        q: "Miks pole ühte fikseeritud hinda?",
        a: "Ürituse suurus, kaugus Tallinnast, pikkus ja lisad — kõik mõjutavad hinda. Tasemed annavad tüüpilise vahemiku; kalkulaator annab täpse numbri sinu ürituse jaoks 30 sekundiga.",
      },
      {
        q: "Mis on kõige väiksem üritus, kuhu te tulete?",
        a: "Boks 490 € sobib väiksematele pulmadele, sünnipäevadele ja vabamatele firmaõhtutele Tallinna ümbruses. Alla selle suuname lihtsama partneri poole — räägi meiega ja oleme ausad sobivuse osas.",
      },
      {
        q: "Mis on Custom Activation tegelik hind?",
        a: "Pakkumise alusel. Hind sõltub briifist: kontseptsiooni sügavus, kohandatud UI töö, mikrosait, integratsioonid, ürituse pikkus. Swedbanki, Synlabi, Von Focki ja Laulupeo projektid on kõik selles tasemes.",
      },
      {
        q: "Kas hinnad sisaldavad käibemaksu?",
        a: "Kõik nimetatud hinnad on käibemaksuta (22%). Kalkulaator näitab nii netosummat kui ka käibemaksuga koguhinda.",
      },
      {
        q: "Kas transpordikulud on hinnas sees?",
        a: "Tallinn (kuni 25 km) on sees. Kaugemale — 90 € kuni 100 km, 180 € kuni 200 km, eraldi pakkumine kaugemale või välismaale.",
      },
      {
        q: "Kas saab kohandatud AI teemat?",
        a: "Jah. Kohandatud AI teemad on 290 € lisana Boks või Branded paketil, sees Custom Activationi puhul. Valmib 2 nädalaga.",
      },
    ],

    ctaTitle: "Valmis täpse numbri saamiseks?",
    ctaBody:
      "Käivita kalkulaator või saada pakkumise päring — mõlemad võtavad alla 60 sekundi.",
    primaryCta: "Küsi pakkumist",
    secondaryCta: "Ava kalkulaator",
  },
} as const;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];

  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/hinnad")}`;
  const publicPrices = PACKAGES.filter((p) => !p.customPricing).map(
    (p) => p.basePrice,
  );
  const minPrice = Math.min(...publicPrices);

  const service = serviceSchema({
    name:
      locale === "en"
        ? "AI photobooth rental — pricing"
        : "AI fotoboksi rent — hinnad",
    description:
      locale === "en"
        ? "AI photobooth rental in Estonia. Boks from €490, Branded from €890, Custom Activation by quote."
        : "AI fotoboksi rent Eestis. Boks alates 490 €, Branded alates 890 €, Custom Activation pakkumise alusel.",
    serviceType: "AI photobooth rental",
    url: pageUrl,
    priceRange: `${minPrice}+ €`,
    image: `${SITE_URL}/images/site/interactive-booth.png`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Pricing" : "Hinnad", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />
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
          className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.sub}
        </p>
        <div className="mb-10 flex flex-wrap gap-4">
          <MagneticButton>
            <BookingTrigger
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            >
              {copy.bookCta} →
            </BookingTrigger>
          </MagneticButton>
          <Link
            href="#calculator"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
          >
            {copy.calcCta} →
          </Link>
        </div>
        <ProofMicrocopy locale={locale} variant="throughput" />
      </section>

      {/* (02) Packages */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.packagesEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.packagesTitle}
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={[
                "flex flex-col gap-6 rounded-3xl border p-8 transition-colors",
                pkg.highlight
                  ? "border-[color:var(--color-brand-primary)]/60 bg-[color:var(--color-brand-primary)]/8"
                  : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={[
                      "mb-2 font-mono text-[10px] uppercase tracking-[0.22em]",
                      pkg.highlight
                        ? "text-[color:var(--color-brand-accent)]"
                        : "text-[color:var(--color-text-secondary)]",
                    ].join(" ")}
                  >
                    {text(locale, pkg.name)}
                  </p>
                  <p
                    className="font-medium leading-tight"
                    style={{ fontSize: "var(--text-title)" }}
                  >
                    {text(locale, pkg.tagline)}
                  </p>
                </div>
                {pkg.highlight && (
                  <span className="flex flex-col items-end gap-1.5">
                    <span
                      aria-hidden
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--color-brand-accent)]/50 bg-[color:var(--color-brand-accent)]/15 font-mono text-[color:var(--color-brand-accent)] [animation:portrai-most-booked-pulse_2.4s_ease-in-out_infinite]"
                    >
                      ★
                    </span>
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
                      {locale === "en"
                        ? "Most booked · 100–300 guests"
                        : "Enim broneeritud · 100–300 külalist"}
                    </span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                {pkg.customPricing ? (
                  <span
                    className="font-medium leading-none text-[color:var(--color-brand-accent)]"
                    style={{ fontSize: "var(--text-display-md)" }}
                  >
                    {copy.customPriceLabel}
                  </span>
                ) : (
                  <>
                    <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                      {copy.fromLabel}
                    </span>
                    <span
                      className="font-medium tabular-nums leading-none"
                      style={{ fontSize: "var(--text-display-md)" }}
                    >
                      {formatEur(pkg.basePrice, locale)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, pkg.bestFor)}
              </p>

              <ul className="flex flex-col gap-3 border-t border-[color:var(--color-stroke-subtle)] pt-6 text-sm text-[color:var(--color-text-secondary)]">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[6px] block h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-accent)]" />
                    <span>{text(locale, f)}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pkg.customPricing ? ("/turundus" as "/turundus") : "/kontakt"}
                className={[
                  "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors",
                  pkg.highlight
                    ? "bg-[color:var(--color-brand-primary)] text-white hover:bg-[color:var(--color-brand-secondary)]"
                    : "border border-[color:var(--color-stroke-medium)] text-white hover:bg-[color:var(--color-surface-raised)]",
                ].join(" ")}
              >
                {pkg.customPricing ? copy.customCta : copy.bookTier} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* (03) Add-ons */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.addOnsEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.addOnsTitle}
            </h2>
          </div>
          <p
            className="self-end max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.addOnsBody}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5"
            >
              <div>
                <p className="font-medium">{text(locale, addOn.name)}</p>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                  {text(locale, addOn.description)}
                </p>
              </div>
              <p className="whitespace-nowrap font-mono tabular-nums text-[color:var(--color-brand-accent)]">
                +{formatEur(addOn.price, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* (04) Embedded calculator */}
      <section
        id="calculator"
        className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12"
      >
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.calcEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.calcTitle}
            </h2>
          </div>
          <p
            className="self-end max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.calcBody}
          </p>
        </div>
        <PriceCalculator />
      </section>

      {/* (05) Inclusions + SLA */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.inclusionsEyebrow}
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.inclusionsTitle}
        </h2>
        <ul className="mb-10 grid gap-4 md:grid-cols-2">
          {copy.inclusions.map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
            >
              <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-brand-accent)]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <SlaBadges locale={locale} />
      </section>

      {/* (06) FAQ */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[300px_1fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.faqEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.faqTitle}
            </h2>
          </div>
          <FaqAccordion items={[...copy.faq]} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
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
        <div className="flex flex-wrap gap-4">
          <MagneticButton>
            <BookingTrigger
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.primaryCta} →
            </BookingTrigger>
          </MagneticButton>
          <Link
            href="#calculator"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-8 py-4 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.secondaryCta} →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
