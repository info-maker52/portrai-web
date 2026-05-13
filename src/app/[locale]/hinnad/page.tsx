import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { TrustRow } from "@/components/trust/TrustRow";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { ADD_ONS, formatEur, PACKAGES } from "@/lib/pricing";
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
        ? "AI photobooth pricing — from €490 | PortrAI"
        : "Fotoboksi hinnad — alates 490 € | PortrAI",
    description:
      locale === "en"
        ? "Transparent AI photobooth pricing in Estonia. Boks from €490, Branded from €890, Custom Activation by quote. Setup, host, and digital delivery included."
        : "Läbipaistvad AI fotoboksi hinnad Eestis. Boks alates 490 €, Branded alates 890 €, Custom Activation pakkumise alusel. Ülespanek, host ja digitaalne üleandmine sees.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/hinnad"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Pricing",
    headline: "Transparent pricing. No surprises.",
    subhead:
      "Three packages, anchored to event size. Every price is a starting point — get a precise quote in 30 seconds with the calculator.",
    calculatorCta: "Open calculator",
    bookCta: "Get a quote",
    customPriceLabel: "By quote",
    customCta: "Talk to us about your concept",
    packagesEyebrow: "(02) Packages",
    packagesTitle: "Pick the package that fits the room.",
    fromLabel: "from",
    addOnsEyebrow: "(03) Add-ons",
    addOnsTitle: "Build the experience your event needs.",
    addOnsBody:
      "Common add-ons priced openly. Anything outside this list gets a custom quote within 24 h.",
    inclusionsEyebrow: "(04) What's always included",
    inclusionsTitle: "Every package, regardless of tier.",
    inclusions: [
      "On-site host running the booth from start to finish",
      "All digital photos shared with guests via QR code",
      "Setup and teardown handled by our team within 40 minutes",
      "Liability insurance up to €100,000",
      "Quote response within 24 hours, every time",
    ],
    faqEyebrow: "(05) Pricing FAQ",
    faqTitle: "What people ask before they book.",
    faq: [
      {
        q: "Why isn't there one fixed price?",
        a: "Event size, distance from Tallinn, length, and add-ons all change the cost. The packages anchor the typical range; the calculator gives you the exact number for your event in 30 seconds.",
      },
      {
        q: "What's the cheapest event you'll do?",
        a: "Boks at €490 covers smaller weddings, birthdays, and casual corporate evenings around Tallinn. Below that we usually recommend simpler setups — talk to us and we'll point you to a partner if PortrAI isn't the right fit.",
      },
      {
        q: "Does the price include VAT?",
        a: "All listed prices are without VAT (22%). The calculator shows both the net subtotal and the VAT-inclusive total.",
      },
      {
        q: "Are travel costs included?",
        a: "Tallinn (within 25 km) is included. Beyond that we add a flat distance fee — €90 within 100 km, €180 within 200 km, custom quote further than that or abroad.",
      },
      {
        q: "Can I get a custom-built theme?",
        a: "Yes. Custom AI themes are €290 as an add-on, delivered within 2 weeks. We design it in your brand language; you sign off before the event.",
      },
    ],
    ctaTitle: "Ready for an exact number?",
    ctaBody: "Open the calculator or send a quote request — both take under 60 seconds.",
    primaryCta: "Open calculator",
    secondaryCta: "Get a quote",
  },
  et: {
    eyebrow: "(01) Hinnad",
    headline: "Läbipaistvad hinnad. Ilma üllatusteta.",
    subhead:
      "Kolm paketti, valitud ürituse suurusele vastavalt. Iga hind on lähtepunkt — saa täpne pakkumine 30 sekundiga kalkulaatoriga.",
    calculatorCta: "Ava kalkulaator",
    bookCta: "Küsi pakkumist",
    customPriceLabel: "Pakkumise alusel",
    customCta: "Räägi meiega oma kontseptsioonist",
    packagesEyebrow: "(02) Paketid",
    packagesTitle: "Vali pakett, mis sobib saalile.",
    fromLabel: "alates",
    addOnsEyebrow: "(03) Lisad",
    addOnsTitle: "Lisa juurde see, mida üritus vajab.",
    addOnsBody:
      "Tavalised lisad on hinnastatud avalikult. Kõik, mis siit nimekirjast välja jääb, saab eraldi pakkumise 24 tunniga.",
    inclusionsEyebrow: "(04) Mis on alati sees",
    inclusionsTitle: "Iga paketi puhul, sõltumata tasemest.",
    inclusions: [
      "Kohapealne host, kes hoiab boksi käigus algusest lõpuni",
      "Kõik digitaalsed pildid jagatud külalistega QR-koodi kaudu",
      "Ülespanek ja maha võtmine meie tiimi poolt 40 minutiga",
      "Vastutuskindlustus kuni 100 000 €",
      "Pakkumise vastus 24 tunni jooksul, alati",
    ],
    faqEyebrow: "(05) Hinna KKK",
    faqTitle: "Mida inimesed enne broneerimist küsivad.",
    faq: [
      {
        q: "Miks pole ühte fikseeritud hinda?",
        a: "Ürituse suurus, kaugus Tallinnast, pikkus ja lisad mõjutavad hinda. Paketid annavad tüüpilise vahemiku; kalkulaator annab täpse numbri 30 sekundiga.",
      },
      {
        q: "Mis on kõige väiksem üritus, kuhu te tulete?",
        a: "Boks (490 €) sobib väiksematele pulmadele, sünnipäevadele ja vabamatele firmaõhtutele Tallinna ümbruses. Alla selle soovitame lihtsamaid lahendusi — räägi meiega ja suuname sind partneri poole, kui PortrAI ei ole õige valik.",
      },
      {
        q: "Kas hinnad sisaldavad käibemaksu?",
        a: "Kõik nimetatud hinnad on käibemaksuta (22%). Kalkulaator näitab nii netosumma kui ka käibemaksuga koguhinda.",
      },
      {
        q: "Kas transpordikulud on hinnas sees?",
        a: "Tallinn (kuni 25 km) on hinnas sees. Kaugemale lisame fikseeritud transporditasu — 90 € kuni 100 km, 180 € kuni 200 km, eraldi pakkumine kaugemale või välismaale.",
      },
      {
        q: "Kas saab kohandatud teema?",
        a: "Jah. Kohandatud AI teema lisana on 290 €, valmib 2 nädalaga. Kujundame sinu brändi keeles; kinnitad enne üritust.",
      },
    ],
    ctaTitle: "Valmis täpse numbri saamiseks?",
    ctaBody:
      "Ava kalkulaator või saada pakkumise päring — mõlemad võtavad alla 60 sekundi.",
    primaryCta: "Ava kalkulaator",
    secondaryCta: "Küsi pakkumist",
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
  // Public price range only covers the two productized tiers; Custom
  // Activation is intentionally hidden from public price anchors.
  const publicPrices = PACKAGES.filter((p) => !p.customPricing).map(
    (p) => p.basePrice,
  );
  const minPrice = Math.min(...publicPrices);
  const maxPrice = Math.max(...publicPrices);

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

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />

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
          {copy.subhead}
        </p>
        <div className="mb-10 flex flex-wrap gap-4">
          <MagneticButton>
            <Link
              href="/kalkulaator"
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            >
              {copy.calculatorCta} →
            </Link>
          </MagneticButton>
          <Link
            href="/broneeri"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
          >
            {copy.bookCta} →
          </Link>
        </div>
        <TrustRow locale={locale} />
      </section>

      {/* Packages */}
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
                  <span className="rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                    ★
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
                href={pkg.customPricing ? "/turundus" : "/broneeri"}
                className={[
                  "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors",
                  pkg.highlight
                    ? "bg-[color:var(--color-brand-primary)] text-white hover:bg-[color:var(--color-brand-secondary)]"
                    : "border border-[color:var(--color-stroke-medium)] text-white hover:bg-[color:var(--color-surface-raised)]",
                ].join(" ")}
              >
                {pkg.customPricing ? copy.customCta : copy.bookCta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Add-ons */}
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

      {/* What's always included + SLAs */}
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

      {/* FAQ */}
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
            <Link
              href="/kalkulaator"
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.primaryCta} →
            </Link>
          </MagneticButton>
          <Link
            href="/broneeri"
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
