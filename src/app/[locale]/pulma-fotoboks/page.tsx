import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { TrustRow } from "@/components/trust/TrustRow";
import { SlaBadges } from "@/components/trust/SlaBadges";
import {
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Wedding AI photo booth — Spring 2026 launch with Everybooth ICON 2 | PortrAI"
        : "Pulma AI fotoboks — kevadel 2026 Everybooth ICON 2-ga | PortrAI",
    description:
      locale === "en"
        ? "PortrAI launches its wedding line in Spring 2026 with the handcrafted Everybooth ICON 2. Join the waitlist — first 5 couples get a custom theme included."
        : "PortrAI käivitab pulmaformaadi kevadel 2026 käsitsi valmistatud Everybooth ICON 2-ga. Liitu ootejärjekorraga — esimesed 5 paari saavad kohandatud teema hinnas sees.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/pulma-fotoboks"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Coming Spring 2026 · with Everybooth ICON 2",
    headline:
      "PortrAI's wedding line launches Spring 2026 — and we're taking 5 early couples now.",
    subhead:
      "We're adding the handcrafted, light-wood Everybooth ICON 2 to the PortrAI lineup specifically for weddings — a warmer, more elegant booth than our usual neon-and-metal events kit. Join the waitlist and we'll get back to you with dates the moment ICON 2 lands. The first five couples to confirm get a custom AI theme matching their wedding visuals — included.",
    primaryCta: "Join the waitlist",
    secondaryCta: "See AI styles",
    waitlistEyebrow: "Early-couple offer",
    waitlistTitle: "First 5 weddings get a custom AI theme — included.",
    waitlistBody:
      "Custom themes normally cost €290 as an add-on. The first 5 couples to confirm a 2026 wedding date with PortrAI Wedding get it bundled with their package, designed around their invitation typeface, colours, and venue.",

    whyEyebrow: "(02) Why couples pick PortrAI",
    whyTitle: "Built for weddings, not just events.",
    why: [
      {
        title: "Watercolour, acrylic, vintage",
        body: "Romantic, painterly styles tuned for wedding aesthetics — soft palettes, light bleed, gentle skin work.",
      },
      {
        title: "On-site host all night",
        body: "Our host welcomes guests, keeps the queue smooth, helps shy people pose, and packs everything down so you don't have to think about it.",
      },
      {
        title: "Print + phone in 15 seconds",
        body: "Every portrait prints instantly and lands on the guest's phone via QR. Couples wake up to a full shared gallery.",
      },
      {
        title: "Couple-branded option",
        body: "We can match the wedding aesthetic — a small monogram, your invite typeface, your venue's frame.",
      },
    ],

    flowEyebrow: "(03) How a wedding evening goes",
    flowSteps: [
      {
        n: "01",
        title: "Tell us about the day",
        body: "Date, venue, guest count, theme, what you don't want.",
      },
      {
        n: "02",
        title: "Pick styles",
        body: "Most couples pick 3–5 styles. Watercolour and acrylic lead the wedding catalog.",
      },
      {
        n: "03",
        title: "We arrive 90 min early",
        body: "Setup is 40 min. We're tested and quiet before guests arrive.",
      },
      {
        n: "04",
        title: "All-night gallery",
        body: "Photos go to the live wall and to phones. Morning after, you get a single shared link.",
      },
    ],

    faqEyebrow: "(04) Wedding FAQ",
    faqTitle: "What couples ask first.",
    faq: [
      {
        q: "How much does an AI wedding photo booth cost?",
        a: "Wedding bookings most often land in the Branded package (€890) — 5 hours, fully-branded UI, 10+ styles, host, live gallery, prints. Smaller weddings can do Boks at €490 (3 hours). Custom wedding concepts are quoted separately.",
      },
      {
        q: "How much space does it need?",
        a: "Around 2×2 metres and one regular power outlet. We can work with tighter spaces — ask us when you describe the venue.",
      },
      {
        q: "Will it work in a country wedding far from Tallinn?",
        a: "Yes. We add a flat distance fee — €90 within 100 km, €180 within 200 km. Beyond that we quote per event. Setup is the same anywhere.",
      },
      {
        q: "Can the booth match our wedding visuals?",
        a: "Yes. We match the colour palette and frame; for €290 we build a fully custom theme in your wedding's brand language. Fits couples who care about every detail.",
      },
      {
        q: "What about elderly guests who don't use phones?",
        a: "Our host walks every guest through the flow. There's a printed photo for every shot — nobody leaves empty-handed.",
      },
    ],

    ctaTitle: "Save the date — and the booth.",
    ctaBody: "Tell us your wedding details. We'll send a quote within 24 hours.",
    ctaButton: "Get your wedding quote",
  },
  et: {
    eyebrow: "(01) Tuleb kevadel 2026 · Everybooth ICON 2-ga",
    headline:
      "PortrAI pulmaformaat tuleb kevadel 2026 — ja võtame 5 esimest paari juba praegu.",
    subhead:
      "Lisame PortrAI valikusse käsitsi valmistatud heleda puiduga Everybooth ICON 2 — soojem ja elegantsem boks kui meie tavaline neoonist-metallist üritus-komplekt. Liitu ootejärjekorraga ja anname sulle kuupäevadest teada kohe, kui ICON 2 kohale jõuab. Esimesed 5 paari, kes kinnitavad oma 2026 pulmakuupäeva, saavad kohandatud AI teema, mis sobitub pulma visuaalidega — hinnas sees.",
    primaryCta: "Liitu ootejärjekorraga",
    secondaryCta: "Vaata AI stiile",
    waitlistEyebrow: "Varase-paari pakkumine",
    waitlistTitle: "Esimesed 5 pulma saavad kohandatud AI teema — hinnas sees.",
    waitlistBody:
      "Kohandatud teema maksab tavaliselt 290 € lisana. Esimesed 5 paari, kes kinnitavad 2026 pulmakuupäeva PortrAI Pulmaga, saavad selle paketi sees — kujundatud kutsete kirjatüübi, värvide ja venue ümber.",

    whyEyebrow: "(02) Miks paarid valivad PortrAI",
    whyTitle: "Tehtud pulma, mitte ainult ürituse jaoks.",
    why: [
      {
        title: "Akvarell, akrüül, vintage",
        body: "Romantilised, maalingulised stiilid, mis on pulma esteetikale häälestatud — pehmed paletid, õrnad värviüleminekud, hooliv nahaviimistlus.",
      },
      {
        title: "Kohapealne host terve öö",
        body: "Meie host tervitab külalisi, hoiab järjekorra sujuva, aitab häbelikel poseerida ja pakib kõik ära — sina ei pea mõtlema.",
      },
      {
        title: "Print + telefon 15 sekundiga",
        body: "Iga portree prinditakse kohe ja jõuab QR-i kaudu külalise telefoni. Hommikul ärkad terve jagatud galeriiga.",
      },
      {
        title: "Paari brändi võimalus",
        body: "Saame kohandada pulma esteetikaga — väike monogramm, kutsete kirjatüüp, venue raam.",
      },
    ],

    flowEyebrow: "(03) Kuidas pulmaõhtu käib",
    flowSteps: [
      {
        n: "01",
        title: "Räägi meile päevast",
        body: "Kuupäev, venue, külaliste arv, teema, mida sa ei taha.",
      },
      {
        n: "02",
        title: "Vali stiilid",
        body: "Enamik paare valib 3–5 stiili. Akvarell ja akrüül juhivad pulma kataloogi.",
      },
      {
        n: "03",
        title: "Saabume 90 min varem",
        body: "Setup võtab 40 minutit. Oleme testitud ja vaikselt valmis enne külaliste saabumist.",
      },
      {
        n: "04",
        title: "Terve öö galerii",
        body: "Pildid jõuavad live-seinale ja telefonidesse. Hommikul saad ühe jagatud galeriilingi.",
      },
    ],

    faqEyebrow: "(04) Pulma KKK",
    faqTitle: "Mida paarid kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kui palju maksab AI pulma fotoboks?",
        a: "Pulmad lähevad kõige sagedamini Branded paketti (890 €) — 5 tundi, täielikult bränditud UI, 10+ stiili, host, live-galerii, printimine. Väiksemad pulmad sobivad Boks paketiga 490 € (3 tundi). Kohandatud pulma-kontseptsioone hindame eraldi.",
      },
      {
        q: "Kui palju ruumi vajab?",
        a: "Umbes 2×2 meetrit ja üks tavaline pistik. Saame töötada ka kitsamates kohtades — küsi, kui kirjeldad venuet.",
      },
      {
        q: "Kas see töötab maapulmas, kaugel Tallinnast?",
        a: "Jah. Lisame fikseeritud transporditasu — 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Setup on igal pool sama.",
      },
      {
        q: "Kas boks saab sobituda meie pulma visuaalidega?",
        a: "Jah. Värvi-palett ja raam sobituvad; 290 € eest loome täiesti kohandatud teema sinu pulma brändi keeles. Sobib paaridele, kes hoolivad igast detailist.",
      },
      {
        q: "Mis saab vanematest külalistest, kes telefoni ei kasuta?",
        a: "Meie host juhendab iga külalist. Iga pildi jaoks on prinditud koopia — keegi ei lähe tühjade kätega ära.",
      },
    ],

    ctaTitle: "Pane kuupäev kinni — ja boks.",
    ctaBody:
      "Räägi meile pulma detailid. Saadame pakkumise 24 tunni jooksul.",
    ctaButton: "Küsi pulma pakkumist",
  },
} as const;

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/pulma-fotoboks")}`;

  const service = serviceSchema({
    name: locale === "en" ? "Wedding AI photo booth" : "AI pulma fotoboks",
    description:
      locale === "en"
        ? "AI photo booth rental for weddings in Estonia."
        : "AI fotoboksi rent pulmadele Eestis.",
    serviceType: "Wedding photo booth rental",
    url: pageUrl,
    priceRange: "690–2490 €",
    image: `${SITE_URL}/images/site/portrait-detail.png`,
  });
  const faqLd = faqSchema(copy.faq);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />

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
              {copy.subhead}
            </p>
            <div className="mb-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/broneeri"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href="/stiilid"
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
            <TrustRow locale={locale} />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/site/portrait-detail.png"
              alt={
                locale === "en"
                  ? "Watercolour AI portrait of a wedding guest"
                  : "Akvarell AI portree pulmakülalisest"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Waitlist offer band */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-brand-primary)]/8 px-6 py-16 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {copy.waitlistEyebrow}
            </p>
            <h2
              className="mb-4 font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.waitlistTitle}
            </h2>
            <p
              className="text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.waitlistBody}
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <MagneticButton>
              <Link
                href="/broneeri"
                className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
              >
                {copy.primaryCta} →
              </Link>
            </MagneticButton>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
              Everybooth ICON 2 · everybooth-icon.com
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.whyEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.whyTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.why.map((item, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
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

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.flowEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-4">
          {copy.flowSteps.map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {s.n}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SlaBadges locale={locale} />
        </div>
      </section>

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
            href="/broneeri"
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
