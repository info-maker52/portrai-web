import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/* Hallmark · macrostructure: Photographic · genre: modern-minimal
 * Was: same eyebrow → headline → body → card-grid macrostructure as
 * /firmapidu-fotoboks and the rest. Now: image-first. Full-bleed hero
 * image with headline floating over it. Image-led occasion strip with
 * minimal text. No numbered eyebrows, no card grids with border-left.
 * Reads visibly different from the other two audience pages. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photo booth for birthdays and private events | PortrAI"
        : "AI fotoboks sünnipäevadele ja eraüritustele | PortrAI",
    description:
      locale === "en"
        ? "AI photo booth for birthdays, jubilees, christenings and smaller private gatherings. Boks tier from €490 — fast setup, on-site host, all photos to phones by morning."
        : "AI fotoboks sünnipäevadele, juubelitele, ristsetele ja väiksematele eraüritustele. Boks alates 490 € — kiire setup, kohapealne host, kõik pildid hommikuks telefonidesse.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/sunnipaev-fotoboks"),
  });
}

const COPY = {
  en: {
    heroTag: "Birthday · Jubilee · Private",
    headline: "A booth that doesn't eat into the night.",
    sub: "40-minute setup, on-site host, every photo on every phone by morning. The booth is the entertainment, not the logistics.",
    primaryCta: "Plan the night",
    secondaryCta: "See pricing",

    galleryHeading: "Built for the nights people actually book",
    occasions: [
      {
        tag: "Round-number birthdays",
        body: "30, 40, 50, 60. The night where everyone gets the same group photo styled five different ways.",
        image: "/images/site/portrait-detail.png",
      },
      {
        tag: "Jubilees",
        body: "Anniversaries, retirements, work milestones. Slower throughput, warmer styles (watercolour, vintage, painted).",
        image: "/images/work/laulupidu-postimees-cover.jpg",
      },
      {
        tag: "Christenings and family",
        body: "Multi-generation guests. Cartoon and editorial styles work especially well — grandparents and toddlers get photos that look intentional.",
        image: "/images/themes/naidised-22-5f7217a492.png",
      },
      {
        tag: "30–60 guest evenings",
        body: "Apartment parties, summer-cottage weekends, restaurant private rooms. Boks tier (3 hours, €490) covers the typical evening.",
        image: "/images/site/event-action.jpg",
      },
    ],

    promise: {
      heading: "What you actually get",
      body: "Three hours of AI photo booth on-site, five ready-made styles (acrylic, watercolour, sketch, cartoon, vintage), on-site host running the night, unlimited shots, every photo printed on the spot plus a shared gallery link by morning. €490 around Tallinn; €580 within 100 km; €670 within 200 km.",
    },

    fineprintHeading: "Small print, fast",
    faq: [
      {
        q: "How much space and power do you need?",
        a: "Around 2×2 metres and one standard 230 V outlet. We can work tighter.",
      },
      {
        q: "How early should I book a birthday?",
        a: "2–4 weeks for weekday and smaller weekend dates. Round-number birthdays (30, 40, 50) on Saturday nights fill out 6–8 weeks ahead.",
      },
      {
        q: "What about elderly guests who don't use phones?",
        a: "Every photo prints on the spot. The host walks every guest through.",
      },
      {
        q: "Can I pick a theme for the night?",
        a: "Five ready-made styles are included on Boks. For a fully themed night — birthday colours, decade themes — upgrade to Branded (€890) or add a custom theme for €290.",
      },
    ],

    closingHeading: "Tell us about the night.",
    closingBody:
      "Date, venue, guest count, the kind of energy you want. We reply within 3 business hours with a quote and 2–3 dates we can hold.",
    closingCta: "Plan the night",
  },
  et: {
    heroTag: "Sünnipäev · Juubel · Eraüritus",
    headline: "Boks, mille setup ei söö õhtut.",
    sub: "40-minutiline setup, kohapealne host, kõik pildid igale külalisele hommikuks. Boks on meelelahutus, mitte logistika.",
    primaryCta: "Planeeri õhtu",
    secondaryCta: "Vaata hindu",

    galleryHeading: "Loodud õhtutele, mida inimesed päriselt broneerivad",
    occasions: [
      {
        tag: "Ümmargused sünnipäevad",
        body: "30, 40, 50, 60. Õhtu, kus kõik saavad sama grupifoto viies erinevas stiilis.",
        image: "/images/site/portrait-detail.png",
      },
      {
        tag: "Juubelid",
        body: "Aastapäevad, pension, töö-juubelid. Aeglasem läbilask, soojemad stiilid (akvarell, vintage, maalitud).",
        image: "/images/work/laulupidu-postimees-cover.jpg",
      },
      {
        tag: "Ristsed ja pere-üritused",
        body: "Mitme põlvkonna külalised. Koomiks ja ajakirjalik stiil töötavad eriti hästi — vanavanemad ja väikelapsed saavad tahtlike-näo piltidega.",
        image: "/images/themes/naidised-22-5f7217a492.png",
      },
      {
        tag: "30–60 külalise õhtud",
        body: "Korteripeod, suvila-nädalavahetused, restorani eraruumid. Boks pakett (3 tundi, 490 €) katab tüüpilise õhtu.",
        image: "/images/site/event-action.jpg",
      },
    ],

    promise: {
      heading: "Mis sa päriselt saad",
      body: "Kolm tundi AI fotoboksi kohapeal, viis valmis stiili (akrüül, akvarell, pliiats, koomiks, vintage), kohapealne host hoiab õhtut käigus, piiramatult pilte, iga pilt prinditud kohapeal pluss jagatud galeriilink hommikuks. 490 € Tallinna ümbruses; 580 € kuni 100 km; 670 € kuni 200 km.",
    },

    fineprintHeading: "Väike kiri, kiirelt",
    faq: [
      {
        q: "Kui palju ruumi ja voolu vajate?",
        a: "Umbes 2×2 meetrit ja üks standardne 230 V pistik. Saame töötada ka kitsamates kohtades.",
      },
      {
        q: "Kui vara peaks sünnipäeva broneerima?",
        a: "2–4 nädalat nädala-sees ja väiksematele nädalavahetuse kuupäevadele. Ümmargused sünnipäevad (30, 40, 50) laupäeva-õhtutel lähevad täis 6–8 nädalat ette.",
      },
      {
        q: "Mis saab vanematest külalistest, kes telefoni ei kasuta?",
        a: "Iga pilt prinditakse kohapeal. Host juhendab iga külalist.",
      },
      {
        q: "Kas saab õhtuks teema valida?",
        a: "Viis valmis stiili on Boksis sees. Täielikult teemastatud õhtuks — sünnipäeva värvid, dekaadi teemad — uuenda Branded tasemeks (890 €) või lisa kohandatud teema 290 € eest.",
      },
    ],

    closingHeading: "Räägi meile õhtust.",
    closingBody:
      "Kuupäev, venue, külaliste arv, milline energia. Vastame 3 töötunni jooksul pakkumise ja 2–3 vaba kuupäevaga.",
    closingCta: "Planeeri õhtu",
  },
} as const;

export default async function SunnipaevPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/sunnipaev-fotoboks")}`;

  const service = serviceSchema({
    name:
      locale === "en"
        ? "AI photo booth for birthdays and private events"
        : "AI fotoboks sünnipäevadele ja eraüritustele",
    description:
      locale === "en"
        ? "AI photo booth for birthdays, jubilees, christenings and smaller private gatherings in Estonia."
        : "AI fotoboks sünnipäevadele, juubelitele, ristsetele ja väiksematele eraüritustele Eestis.",
    serviceType: "Private event photo booth rental",
    url: pageUrl,
    priceRange: "490+ €",
    image: `${SITE_URL}/images/site/event-action.jpg`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    {
      name: locale === "en" ? "Birthday & private" : "Sünnipäev & eraüritus",
      url: pageUrl,
    },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs} />

      {/* Full-bleed photographic hero — image is the macrostructure. */}
      <section className="relative isolate h-[95vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/images/site/event-action.jpg"
          alt={
            locale === "en"
              ? "PortrAI booth at a private event"
              : "PortrAI boks eraüritusel"
          }
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.92)] via-[rgba(2,9,30,0.45)] to-[rgba(2,9,30,0.18)]" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-16 md:px-12 md:pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
            {copy.heroTag}
          </p>
          <h1
            className="max-w-[16ch] leading-[1.02] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 400,
            }}
          >
            {copy.headline}
          </h1>
          <p
            className="max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <BookingTrigger
              className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
              initialState={{ eventType: "private" }}
            >
              {copy.primaryCta} →
            </BookingTrigger>
            <Link
              href={"/hinnad" as "/hinnad"}
              className="inline-block rounded-full border border-white/40 bg-transparent px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10"
            >
              {copy.secondaryCta} →
            </Link>
          </div>
        </div>
      </section>

      {/* Image-led occasion strip — 2-up alternating large photographic
          panels, each captioned with the occasion. No grid of border-left
          cards. Each panel is its own full-width row. */}
      <section className="px-0 py-24 md:py-32">
        <h2
          className="mb-16 px-6 max-w-3xl leading-tight tracking-tight md:px-12"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
          }}
        >
          {copy.galleryHeading}
        </h2>

        <div className="flex flex-col">
          {copy.occasions.map((occ, i) => (
            <div
              key={occ.tag}
              className={[
                "grid items-center gap-0",
                "md:grid-cols-2",
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : "",
              ].join(" ")}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[5/4]">
                <Image
                  src={occ.image}
                  alt={occ.tag}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 px-6 py-12 md:px-16 md:py-16">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                  {occ.tag}
                </p>
                <p
                  className="text-[color:var(--color-text-secondary)]"
                  style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
                >
                  {occ.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get — single paragraph with the price ladder inline.
          Replaces the typical pricing-snapshot card row. */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-8 leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {copy.promise.heading}
          </h2>
          <p
            className="text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "1.25rem", lineHeight: 1.65 }}
          >
            {copy.promise.body}
          </p>
        </div>
      </section>

      {/* FAQ — kept compact, accordion not card grid. */}
      <section className="px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-12 leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {copy.fineprintHeading}
          </h2>
          <FaqAccordion items={[...copy.faq]} />
        </div>
      </section>

      {/* Closing — bottom-anchored CTA. */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-6 leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
            }}
          >
            {copy.closingHeading}
          </h2>
          <p
            className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            {copy.closingBody}
          </p>
          <BookingTrigger
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            initialState={{ eventType: "private" }}
          >
            {copy.closingCta} →
          </BookingTrigger>
        </div>
      </section>
    </PageShell>
  );
}
