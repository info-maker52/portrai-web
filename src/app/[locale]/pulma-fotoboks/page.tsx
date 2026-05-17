import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { TrustRow } from "@/components/trust/TrustRow";
import { SlaBadges } from "@/components/trust/SlaBadges";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
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
 * /pulma-fotoboks — Spring 2026 wedding waitlist landing.
 *
 * Frames the wedding line as a Spring 2026 launch with Everybooth ICON 2.
 * First-five-couples-get-custom-theme offer creates urgency.
 *
 * Voice: warmer than /studio (wedding audience) but still Linear restraint.
 * MSCHF moment: H1 names the launch date specifically.
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
        ? "Wedding AI photo booth — Spring 2026 launch with ICON 2 | PortrAI"
        : "Pulma AI fotoboks — kevad 2026 koos ICON 2-ga | PortrAI",
    description:
      locale === "en"
        ? "PortrAI's wedding line launches Spring 2026 with the handcrafted Everybooth ICON 2. Join the waitlist — first 5 couples get a custom AI theme included."
        : "PortrAI pulmaformaat tuleb kevadel 2026 koos käsitsi valmistatud Everybooth ICON 2-ga. Liitu ootejärjekorraga — esimesed 5 paari saavad kohandatud AI teema hinnas.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/pulma-fotoboks"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Coming Spring 2026",
    headline:
      "The wedding line launches Spring 2026 — and we're taking five early couples now.",
    sub: "PortrAI's wedding offering is built around the handcrafted, light-wood Everybooth ICON 2. A warmer booth than our usual neon-and-metal events kit — designed to disappear into a reception room instead of standing out.",
    primaryCta: "Join the waitlist",
    secondaryCta: "See the booth",

    offerEyebrow: "(02) Early-couple offer",
    offerTitle: "First 5 couples get a custom AI theme — included.",
    offerBody:
      "Custom themes normally cost €290 as an add-on. The first five couples to confirm a 2026 wedding date with PortrAI Wedding get one bundled with their package — designed around the invitation typeface, colour palette and venue.",

    whyEyebrow: "(03) Why this booth, for weddings",
    why: [
      {
        title: "Light wood, not black metal",
        body: "The ICON 2 is made to look like furniture. Soft tungsten light, neutral fabric, brass details. The room treats it as part of the decor.",
      },
      {
        title: "Watercolour, acrylic, editorial",
        body: "Romantic AI styles tuned for wedding aesthetics — soft palettes, gentle skin work, light bleed. The catalog opens with these three.",
      },
      {
        title: "On-site host all night",
        body: "Our host welcomes guests, helps shy ones pose, keeps the queue moving, and packs everything down. You enjoy the night.",
      },
      {
        title: "Print + phone in 15 seconds",
        body: "Every portrait prints on the spot and lands on the guest's phone via QR. You wake up to a full shared gallery.",
      },
    ],

    flowEyebrow: "(04) How a wedding evening goes",
    flow: [
      { n: "01", title: "Tell us about the day", body: "Date, venue, guest count, invitation visuals." },
      { n: "02", title: "Pick AI styles", body: "Most couples pick 3–5. Watercolour and acrylic lead the wedding catalog." },
      { n: "03", title: "We arrive 90 min early", body: "Setup is 40 min. Tested and quiet before guests arrive." },
      { n: "04", title: "All-night gallery", body: "Photos go to the live wall and to phones. Morning after — one shared link." },
    ],

    faqEyebrow: "(05) Wedding FAQ",
    faqTitle: "What couples ask first.",
    faq: [
      {
        q: "When can I book a wedding with ICON 2?",
        a: "Spring 2026 onwards. The booth arrives in Q1 2026. We're taking waitlist confirmations now for 2026 wedding dates from May onwards.",
      },
      {
        q: "What does it cost?",
        a: "Wedding bookings most often land in the Branded tier (€890) — 5 hours, fully-branded UI, 10+ styles, host, live gallery, prints. Smaller weddings can do Boks at €490 (3 hours). Custom wedding concepts are quoted separately.",
      },
      {
        q: "Can the booth match our wedding visuals?",
        a: "Yes. The Branded tier takes over the UI in your colour palette and frame. The first 5 waitlist couples get a fully custom AI theme designed around your invitation typeface — included, no extra fee.",
      },
      {
        q: "How much space and power does it need?",
        a: "About 2×2 metres and one standard 230 V outlet. We can work tighter — describe the venue and we'll confirm.",
      },
      {
        q: "What if our wedding is far from Tallinn?",
        a: "Flat distance fee — €90 within 100 km, €180 within 200 km. Beyond that we quote per event. The setup itself is the same anywhere.",
      },
      {
        q: "What about elderly guests who don't use phones?",
        a: "Our host walks every guest through the flow. There's a printed photo for every shot — nobody leaves empty-handed.",
      },
    ],

    ctaTitle: "Save the date — and the booth.",
    ctaBody:
      "Tell us your wedding details. We'll come back within 3 business hours.",
    ctaButton: "Join the waitlist",
  },
  et: {
    eyebrow: "(01) Tuleb kevadel 2026",
    headline:
      "Pulma-formaat tuleb kevadel 2026 — ja võtame viis esimest paari juba praegu.",
    sub: "PortrAI pulma-pakkumine on ehitatud käsitsi valmistatud heleda puiduga Everybooth ICON 2 ümber. Soojem boks kui meie tavaline neoonist-metallist üritus-komplekt — disainitud kaduma vastuvõturuumi, mitte sealt välja paistma.",
    primaryCta: "Liitu ootejärjekorraga",
    secondaryCta: "Vaata boksi",

    offerEyebrow: "(02) Varase-paari pakkumine",
    offerTitle: "Esimesed 5 paari saavad kohandatud AI teema — hinnas sees.",
    offerBody:
      "Kohandatud teemad maksavad tavaliselt 290 € lisana. Esimesed viis paari, kes kinnitavad 2026 pulmakuupäeva PortrAI Pulmaga, saavad selle paketi sees — kujundatud kutsete kirjatüübi, värvi-paleti ja venue ümber.",

    whyEyebrow: "(03) Miks see boks pulma jaoks",
    why: [
      {
        title: "Hele puit, mitte must metall",
        body: "ICON 2 on tehtud nägema välja nagu mööbel. Pehme tungsten-valgus, neutraalne kangas, messing-detailid. Saal kohtleb seda kui osa kaunistustest.",
      },
      {
        title: "Akvarell, akrüül, ajakirjalik",
        body: "Romantilised AI stiilid, mis on häälestatud pulma esteetikale — pehmed paletid, õrn naha-viimistlus, valgus-ülevoolud. Kataloog avab nendega.",
      },
      {
        title: "Kohapealne host terve öö",
        body: "Meie host tervitab külalisi, aitab häbelikel poseerida, hoiab järjekorra liikuvana ja pakib kõik kokku. Sina naudid õhtut.",
      },
      {
        title: "Print + telefon 15 sekundiga",
        body: "Iga portree prinditakse kohapeal ja jõuab QR-i kaudu külalise telefoni. Hommikul ärkad terve jagatud galeriiga.",
      },
    ],

    flowEyebrow: "(04) Kuidas pulmaõhtu käib",
    flow: [
      { n: "01", title: "Räägi meile päevast", body: "Kuupäev, venue, külaliste arv, kutsete visuaalid." },
      { n: "02", title: "Vali AI stiilid", body: "Enamik paare valib 3–5. Akvarell ja akrüül juhivad pulma kataloogi." },
      { n: "03", title: "Saabume 90 min varem", body: "Setup võtab 40 min. Testitud ja vaikselt valmis enne külaliste saabumist." },
      { n: "04", title: "Terve öö galerii", body: "Pildid jõuavad live-seinale ja telefonidesse. Hommikul — üks jagatud link." },
    ],

    faqEyebrow: "(05) Pulma KKK",
    faqTitle: "Mida paarid kõige sagedamini küsivad.",
    faq: [
      {
        q: "Millal saan pulma ICON 2-ga broneerida?",
        a: "Alates kevadest 2026. Boks saabub Q1 2026. Praegu võtame ootejärjekorda 2026 pulmakuupäevi alates maist.",
      },
      {
        q: "Mis see maksab?",
        a: "Pulmad lähevad kõige sagedamini Branded tasemesse (890 €) — 5 tundi, täielikult bränditud UI, 10+ stiili, host, live-galerii, printimine. Väiksemad pulmad sobivad Boks tasemega 490 € (3 tundi). Kohandatud pulma-kontseptsioone hindame eraldi.",
      },
      {
        q: "Kas boks saab sobituda meie pulma visuaalidega?",
        a: "Jah. Branded tase võtab UI üle sinu värvi-paletis ja raamis. Esimesed 5 ootejärjekorra paari saavad täiesti kohandatud AI teema kutsete kirjatüübi ümber — hinnas sees, ilma lisatasuta.",
      },
      {
        q: "Kui palju ruumi ja voolu vajab?",
        a: "Umbes 2×2 meetrit ja üks standardne 230 V pistik. Saame töötada ka kitsamates kohtades — kirjelda venuet ja kinnitame.",
      },
      {
        q: "Mis siis, kui meie pulm on Tallinnast kaugel?",
        a: "Fikseeritud transporditasu — 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Setup ise on igal pool sama.",
      },
      {
        q: "Mis saab vanematest külalistest, kes telefoni ei kasuta?",
        a: "Meie host juhendab iga külalist. Iga pildi jaoks on prinditud koopia — keegi ei lähe tühjade kätega ära.",
      },
    ],

    ctaTitle: "Pane kuupäev kinni — ja boks.",
    ctaBody:
      "Räägi meile pulma detailid. Tuleme tagasi 3 töötunni jooksul.",
    ctaButton: "Liitu ootejärjekorraga",
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
    name:
      locale === "en"
        ? "Wedding AI photo booth — Spring 2026 launch"
        : "Pulma AI fotoboks — kevad 2026 lansseering",
    description:
      locale === "en"
        ? "Handcrafted Everybooth ICON 2 wedding photo booth, AI portraits, on-site host. Joining the PortrAI lineup Spring 2026."
        : "Käsitsi valmistatud Everybooth ICON 2 pulma-fotoboks, AI portreed, kohapealne host. Liitub PortrAI valikuga kevadel 2026.",
    serviceType: "Wedding photo booth rental",
    url: pageUrl,
    priceRange: "490+ €",
    image: `${SITE_URL}/images/site/portrait-detail.png`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    {
      name: locale === "en" ? "Wedding booth" : "Pulma fotoboks",
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
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8B87C]/40 bg-[#E8B87C]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8B87C]">
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
                href={"/boksid" as "/boksid" | "/booths"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
            <TrustRow locale={locale} />
          </div>

          <ImagePlaceholder
            description="Everybooth ICON 2 — handcrafted wooden photo booth, light wood with neutral fabric, soft tungsten light, in a wedding reception setting"
            className="aspect-[4/5] rounded-3xl"
          />
        </div>
      </section>

      {/* (02) Early-couple offer band */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-[#E8B87C]/8 px-6 py-16 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#E8B87C]">
              {copy.offerEyebrow}
            </p>
            <h2
              className="mb-4 font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.offerTitle}
            </h2>
            <p
              className="text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.offerBody}
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <MagneticButton>
              <Link
                href="/kontakt"
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

      {/* (03) Why this booth */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.whyEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.why.map((item) => (
            <article
              key={item.title}
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

      {/* (04) Flow */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.flowEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-4">
          {copy.flow.map((s) => (
            <div key={s.n} className="flex flex-col gap-3 border-l border-[color:var(--color-brand-primary)] pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
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
