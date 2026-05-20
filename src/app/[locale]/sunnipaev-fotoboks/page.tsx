import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { SlaBadges } from "@/components/trust/SlaBadges";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/**
 * /sunnipaev-fotoboks — private-events landing.
 *
 * One page covers three related but distinct private occasions:
 * sünnipäev (birthday), juubel (milestone birthday / jubilee), and
 * smaller eraüritus (private gathering, christening, retirement, etc).
 *
 * Distinct from /firmapidu-fotoboks (corporate) and /pulma-fotoboks
 * (wedding): smaller scale, more casual tone, faster setup talk,
 * less branding talk. The buyer is the host themselves, not HR.
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
        ? "AI photo booth for birthdays, jubilees and private events | PortrAI"
        : "AI fotoboks sünnipäevadele, juubelitele ja eraüritustele | PortrAI",
    description:
      locale === "en"
        ? "AI photo booth for birthdays, milestone jubilees, christenings, retirements and smaller private nights. Boks tier from €490 — fast setup, on-site host, all photos to phones by morning."
        : "AI fotoboks sünnipäevadele, juubelitele, ristsetele, pensionile ja väiksematele eraüritustele. Boks pakett alates 490 € — kiire setup, kohapealne host, kõik pildid hommikuks telefonidesse.",
    locale,
    ogImage: "/images/site/portrait-base.png",
    path: localizedSitePath(locale, "/sunnipaev-fotoboks"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Birthday · Jubilee · Private event",
    headline: "A photo booth that doesn't eat into the night.",
    sub: "PortrAI runs at birthdays, milestone jubilees, christenings, retirement parties and smaller private gatherings. 40-minute setup, on-site host, every photo to every guest by morning. The booth is the entertainment, not the logistics.",
    primaryCta: "Plan the night",
    secondaryCta: "See pricing",

    whyEyebrow: "(02) Why it works for private nights",
    why: [
      {
        title: "Fast in, fast out",
        body: "We arrive 90 minutes before the first guest, set up in 40, and pack down silently while the cake is being cut. You don't notice the logistics.",
      },
      {
        title: "Tight-venue ready",
        body: "Apartments, restaurant back rooms, summer cottages — the booth runs in 2×2 metres and one standard wall outlet. We've worked tighter on request.",
      },
      {
        title: "Host who reads the night",
        body: "Birthday energy at 30 is different from a 60th jubilee. Our host adjusts, helps reluctant relatives pose, and packs everything up at the end.",
      },
      {
        title: "Everyone leaves with the photos",
        body: "Print on the spot plus QR delivery to every guest's phone. The shared gallery link arrives by morning — easier than chasing photos in a WhatsApp group.",
      },
    ],

    occasionEyebrow: "(03) Built for the nights people actually book",
    occasions: [
      {
        title: "Round-number birthdays",
        body: "30, 40, 50, 60. The night where everyone gets the same group photo styled five different ways.",
      },
      {
        title: "Jubilees",
        body: "Milestone anniversaries — wedding anniversaries, retirement, work anniversaries. Slower throughput, warmer styles (watercolour, vintage, painted).",
      },
      {
        title: "Christenings + family events",
        body: "Multi-generation guests. Cartoon and editorial styles work especially well — grandparents and toddlers get photos that look intentional.",
      },
      {
        title: "Small gatherings (30–60 guests)",
        body: "Apartment parties, summer-cottage weekends, restaurant private rooms. Boks tier (3 hours, €490) covers the typical evening.",
      },
    ],

    pricingEyebrow: "(04) What it usually costs",
    pricingTitle: "Most private nights fit the Boks tier.",
    pricingBody:
      "3 hours, 5 ready-made AI styles, on-site host, unlimited photos, digital gallery delivered by morning. Larger jubilees or theme-heavy nights upgrade to Branded for full UI customisation.",
    pricingFromLabel: "Boks · from €490",
    pricingBrandedLabel: "Themed nights → Branded · from €890",
    pricingCta: "See the calculator",

    faqEyebrow: "(05) FAQ",
    faqTitle: "What hosts ask first.",
    faq: [
      {
        q: "How much space and power do you need?",
        a: "Around 2×2 metres and one standard 230 V outlet. We've worked tighter — describe the venue and we'll confirm.",
      },
      {
        q: "How early should I book a birthday?",
        a: "2–4 weeks for weekday and smaller weekend dates. Round-number birthdays (30, 40, 50) clustering on Saturday nights fill out 6–8 weeks ahead.",
      },
      {
        q: "What about elderly guests who don't use phones?",
        a: "Every photo prints on the spot. Our host walks every guest through the flow. Nobody leaves empty-handed.",
      },
      {
        q: "Can we pick a theme that matches the birthday?",
        a: "5 ready-made AI styles are included on the Boks tier (acrylic, watercolour, sketch, cartoon, vintage). For a fully themed night — birthday colours, custom prompts, decade themes — upgrade to Branded for €890 or commission a custom theme as a €290 add-on.",
      },
      {
        q: "What if my place is outside Tallinn?",
        a: "Tallinn (within 25 km) is included. €90 within 100 km, €180 within 200 km. Beyond that we quote per event. Setup is the same anywhere.",
      },
      {
        q: "Can a friend or family member host it themselves?",
        a: "No — we always include the on-site host. The host is what keeps the queue moving, the energy up and the booth running smoothly. It's not an upsell; it's how the booth works.",
      },
    ],

    ctaTitle: "Tell us about the night.",
    ctaBody:
      "Date, venue, guest count, the kind of energy you want. We come back within 3 business hours with a quote and 2–3 dates we can hold.",
    ctaButton: "Plan the night",
  },
  et: {
    eyebrow: "(01) Sünnipäev · Juubel · Eraüritus",
    headline: "Fotoboks, mille setup ei söö õhtut.",
    sub: "PortrAI jookseb sünnipäevadel, juubelitel, ristsetel, pensioniõhtutel ja väiksematel eraüritustel. 40-minutiline setup, kohapealne host, kõik pildid igale külalisele hommikuks. Boks on meelelahutus, mitte logistika.",
    primaryCta: "Planeeri õhtu",
    secondaryCta: "Vaata hindu",

    whyEyebrow: "(02) Miks see töötab eraõhtutel",
    why: [
      {
        title: "Kiire sisse, kiire välja",
        body: "Saabume 90 minutit enne esimest külalist, paneme üles 40 minutiga, ja pakime vaikselt kokku, kui torti lõigatakse. Logistikat sa ei märka.",
      },
      {
        title: "Sobib kitsastele ruumidele",
        body: "Korterid, restorani tagaruumid, suvilad — boks töötab 2×2 meetris ja ühe tavalise pistikuga. Oleme töötanud ka kitsamates kohtades nõudmisel.",
      },
      {
        title: "Host, kes loeb õhtut",
        body: "30-aastase sünnipäeva energia on teine kui 60-juubeli oma. Meie host kohandub, aitab kõhklevaid sugulasi poseerida, pakib lõpus kõik kokku.",
      },
      {
        title: "Kõik lahkuvad piltidega",
        body: "Print kohapeal pluss QR-i kaudu igale külalise telefoni. Jagatud galeriilink saabub hommikuks — lihtsam kui pilte WhatsAppi-grupist taga ajada.",
      },
    ],

    occasionEyebrow: "(03) Loodud õhtutele, mida inimesed päriselt broneerivad",
    occasions: [
      {
        title: "Ümmargused sünnipäevad",
        body: "30, 40, 50, 60. Õhtu, kus kõik saavad sama grupifoto viies erinevas stiilis.",
      },
      {
        title: "Juubelid",
        body: "Verstapostid — pulma-aastapäevad, pension, tööaastapäev. Aeglasem läbilask, soojemad stiilid (akvarell, vintage, maalitud).",
      },
      {
        title: "Ristsed + pere-üritused",
        body: "Mitme põlvkonna külalised. Koomiks ja ajakirjalik stiil töötavad eriti hästi — vanavanemad ja väikelapsed saavad pildid, mis näevad välja tahtlikud.",
      },
      {
        title: "Väikesed kogunemised (30–60 külalist)",
        body: "Korteripeod, suvila-nädalavahetused, restorani eraruumid. Boks pakett (3 tundi, 490 €) katab tüüpilise õhtu.",
      },
    ],

    pricingEyebrow: "(04) Mis see tüüpiliselt maksab",
    pricingTitle: "Enamik eraõhtuid sobib Boks tasemesse.",
    pricingBody:
      "3 tundi, 5 valmis AI stiili, kohapealne host, piiramatult pilte, digi-galerii hommikuks. Suuremad juubelid või teema-rasked õhtud kasvavad Branded tasemeks koos täieliku UI-kohandusega.",
    pricingFromLabel: "Boks · alates 490 €",
    pricingBrandedLabel: "Teemaõhtud → Branded · alates 890 €",
    pricingCta: "Vaata kalkulaatorit",

    faqEyebrow: "(05) KKK",
    faqTitle: "Mida võõrustajad kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kui palju ruumi ja voolu vajate?",
        a: "Umbes 2×2 meetrit ja üks standardne 230 V pistik. Oleme töötanud ka kitsamates kohtades — kirjelda venuet ja kinnitame.",
      },
      {
        q: "Kui vara peaks sünnipäeva broneerima?",
        a: "2–4 nädalat nädala-sees ja väiksematele nädalavahetuse kuupäevadele. Ümmargused sünnipäevad (30, 40, 50) laupäeva-õhtutel lähevad täis 6–8 nädalat ette.",
      },
      {
        q: "Mis saab vanematest külalistest, kes telefoni ei kasuta?",
        a: "Iga pilt prinditakse kohapeal. Meie host juhendab iga külalist. Keegi ei lähe tühjade kätega ära.",
      },
      {
        q: "Kas saab valida teema, mis sünnipäevale sobib?",
        a: "Boks tasemes on 5 valmis AI stiili (akrüül, akvarell, pliiats, koomiks, vintage). Täielikult teemastatud õhtuks — sünnipäeva värvid, kohandatud promptid, dekaadi teemad — uuenda Branded tasemeks 890 € või telli kohandatud teema 290 € lisana.",
      },
      {
        q: "Mis siis, kui mu venue on väljaspool Tallinna?",
        a: "Tallinn (kuni 25 km) on sees. 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Setup on igal pool sama.",
      },
      {
        q: "Kas sõber või pereliige saab seda ise hostida?",
        a: "Ei — me lisame alati kohapealse hosti. Host on see, kes hoiab järjekorra liikuvana, energia üleval ja boksi sujuva. See pole müügipakkumine; see on viis, kuidas boks töötab.",
      },
    ],

    ctaTitle: "Räägi meile õhtust.",
    ctaBody:
      "Kuupäev, venue, külaliste arv, milline energia. Tuleme tagasi 3 töötunni jooksul pakkumise ja 2–3 vaba kuupäevaga.",
    ctaButton: "Planeeri õhtu",
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
        ? "AI photo booth for birthdays, jubilees, christenings, retirements and smaller private gatherings in Estonia. Boks tier from €490."
        : "AI fotoboks sünnipäevadele, juubelitele, ristsetele, pensionile ja väiksematele eraüritustele Eestis. Boks alates 490 €.",
    serviceType: "Private event photo booth rental",
    url: pageUrl,
    priceRange: "490+ €",
    image: `${SITE_URL}/images/site/portrait-base.png`,
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

      {/* Hero */}
      <section className="px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
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
            <ProofMicrocopy locale={locale} variant="clients" className="mb-4" />
            <div className="mb-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href={"/hinnad" as "/hinnad"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/site/portrait-base.png"
              alt={
                locale === "en"
                  ? "AI portrait sample from a private event"
                  : "AI portree näide eraürituselt"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              ◆ Private night
            </div>
          </div>
        </div>
      </section>

      {/* (02) Why it works */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.whyEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.why.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] p-6"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {item.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* (03) Occasions */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.occasionEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.occasions.map((occ) => (
            <div
              key={occ.title}
              className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {occ.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {occ.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SlaBadges locale={locale} />
        </div>
      </section>

      {/* (04) Pricing snapshot */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.pricingEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.pricingTitle}
        </h2>
        <p
          className="mb-8 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {copy.pricingBody}
        </p>
        <div className="mb-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white">
            {copy.pricingFromLabel}
          </span>
          <span className="rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {copy.pricingBrandedLabel}
          </span>
        </div>
        <Link
          href={"/hinnad" as "/hinnad"}
          className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-base)]"
        >
          {copy.pricingCta} →
        </Link>
      </section>

      {/* (05) FAQ */}
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
        <MagneticButton>
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.ctaButton} →
          </Link>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
