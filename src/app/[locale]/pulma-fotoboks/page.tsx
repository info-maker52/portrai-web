import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale } from "@/lib/site-content";

/* Hallmark · macrostructure: Long Document (Letter) · genre: editorial
 * Was: card grid + section eyebrows + 4-card "why" grid. Now: a single
 * editorial column read as a letter from PortrAI about the Spring 2026
 * wedding launch. No numbered eyebrows, no card grids, no side-stripe
 * cards. Categorically different from /firmapidu-fotoboks (Specimen)
 * and /sunnipaev-fotoboks (Photographic) — three audience pages now
 * read as three different sites, not three colour-swaps. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "Wedding AI photo booth — Spring 2026 with Everybooth ICON 2 | PortrAI"
        : "Pulma AI fotoboks — kevad 2026 koos ICON 2-ga | PortrAI",
    description:
      locale === "en"
        ? "PortrAI's wedding line launches Spring 2026 with the handcrafted Everybooth ICON 2 — a warmer, light-wood booth. Join the waitlist; the first five couples get a custom AI theme included."
        : "PortrAI pulmaformaat tuleb kevadel 2026 koos käsitsi valmistatud Everybooth ICON 2-ga — soojema, heleda puiduga boksiga. Liitu ootejärjekorraga; esimesed viis paari saavad kohandatud AI teema hinnas.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/pulma-fotoboks"),
  });
}

const COPY = {
  en: {
    date: "Tallinn · written November 2026",
    headline: "About the wedding line, in plain language.",
    intro:
      "We started PortrAI for brand activations. The booth we built — black metal, brand-purple LEDs, neon energy — fits a corporate stand or a year-end party. It doesn't fit a wedding reception. We've known this for two years, said no to weddings the whole time, and stopped feeling fine about it.",
    para2:
      "So in spring 2026 a second booth joins the lineup. It's the Everybooth ICON 2 — light wood, neutral fabric, brass hinges, soft tungsten light. Hand-built, not stamped. It looks like furniture. It disappears into a reception room instead of standing out, which is the point.",
    para3:
      "The AI engine is the same one running on the neon booth. Same twelve styles. Same on-site host, same 40-minute setup, same all-night gallery to every guest's phone by morning. The thing that changes is how the booth looks while it's doing the work.",
    para4Heading: "The early-couple offer",
    para4:
      "The first five couples who confirm a 2026 wedding date with PortrAI Wedding get a custom AI theme designed around their wedding visuals — the invitation typeface, the colour palette, the venue. That theme normally costs €290 as an add-on; the first five get it included. After five we'll still build custom themes, just not bundled.",
    para5Heading: "What it costs",
    para5:
      "Most weddings land in the Branded tier — €890 for five hours, the booth's UI in the couple's design language, ten-plus AI styles, host, live gallery wall, prints. Smaller weddings can go with Boks at €490 for three hours. Custom wedding concepts (think Synlab-tier ambition, scaled to a wedding) are quoted separately.",
    para6Heading: "What people ask",
    faq: [
      {
        q: "When can I actually book a wedding with the ICON 2?",
        a: "Spring 2026 onwards. The booth lands with us in Q1 2026. We're taking waitlist confirmations now for 2026 wedding dates from May onwards — and we'll come back to you with available dates the moment the ICON 2 arrives.",
      },
      {
        q: "How much space and power does it need?",
        a: "Around two square metres and one standard 230 V outlet. We've worked tighter — describe the venue when you write and we'll confirm.",
      },
      {
        q: "What if our venue is far from Tallinn?",
        a: "Tallinn within 25 km is included. We add a flat distance fee beyond that — 90 € within 100 km, 180 € within 200 km, custom quote further. The setup is the same anywhere.",
      },
      {
        q: "Will the booth match the wedding's visual language?",
        a: "On the Branded tier — yes, the UI takes your colour palette and frame. For couples in the first-five offer the AI theme itself is built around the invitation typeface.",
      },
      {
        q: "What about elderly guests who don't use phones?",
        a: "Every photo prints on the spot. The host walks every guest through the flow. Nobody leaves empty-handed.",
      },
    ],
    closeHeading: "How to get on the waitlist",
    close:
      "Email me — Reijo — at info@portrai.ee, or click the button below. Tell me the date you've held, the venue, the rough guest count, and what kind of energy you want the reception to feel like. I write back personally within three business hours.",
    cta: "Join the waitlist",
    sign: "— Reijo Pullai, founder",
  },
  et: {
    date: "Tallinn · kirjutatud novembris 2026",
    headline: "Pulmaformaadist, ausa keelega.",
    intro:
      "Alustasime PortrAI-d brändi-aktivatsioonide jaoks. Boks, mille ehitasime — must metall, brändi-purpuriga LED-id, neoon — sobib firma standile või aastapeole. See ei sobi pulma vastuvõttu. Oleme seda teadnud kaks aastat, oleme kogu selle aja pulmadele ei öelnud, ja oleme lakanud end selle pärast hästi tundmast.",
    para2:
      "Seega kevadel 2026 liitub valikuga teine boks. See on Everybooth ICON 2 — hele puit, neutraalne kangas, messing-hinged, pehme tungsten-valgus. Käsitsi valmistatud, mitte vormitud. See näeb välja kui mööbel. See kaob vastuvõturuumi, mitte ei paista sealt välja, mis ongi mõte.",
    para3:
      "AI-mootor on sama, mis neoon-boksil. Samad kaksteist stiili. Sama kohapealne host, sama 40-minutiline setup, sama terve öö galerii igale külalisele hommikuks telefoni. See, mis muutub, on kuidas boks tööd tehes välja näeb.",
    para4Heading: "Varase-paari pakkumine",
    para4:
      "Esimesed viis paari, kes kinnitavad 2026 pulmakuupäeva PortrAI Pulmaga, saavad kohandatud AI teema, mis on disainitud nende pulma visuaalide ümber — kutsete kirjatüüp, värvi-palett, venue. See teema maksab tavaliselt 290 € lisana; esimesed viis saavad selle hinnas sees. Pärast viit ehitame ikka kohandatud teemasid, lihtsalt mitte komplektis.",
    para5Heading: "Mis see maksab",
    para5:
      "Enamik pulmadest läheb Branded tasemesse — 890 € viie tunni eest, boksi UI paari disainikeeles, kümme pluss AI stiili, host, live-galerii sein, printimine. Väiksemad pulmad sobivad Boksiga 490 € eest kolme tunni eest. Kohandatud pulma-kontseptsioonid (mõtle Synlabi-taseme ambitsioonile, pulma mõõtmes) hindame eraldi.",
    para6Heading: "Mida inimesed küsivad",
    faq: [
      {
        q: "Millal saan päriselt pulma ICON 2-ga broneerida?",
        a: "Alates kevadest 2026. Boks saabub meile Q1 2026. Praegu võtame ootejärjekorda 2026 pulmakuupäevi alates maist — ja tuleme sinu juurde tagasi vabade kuupäevadega kohe, kui ICON 2 kohale jõuab.",
      },
      {
        q: "Kui palju ruumi ja voolu vajab?",
        a: "Umbes kaks ruutmeetrit ja üks standardne 230 V pistik. Oleme töötanud kitsamates kohtades — kirjelda venuet kirjas ja kinnitame.",
      },
      {
        q: "Mis siis, kui meie venue on Tallinnast kaugel?",
        a: "Tallinn kuni 25 km on sees. Lisame fikseeritud transporditasu kaugemale — 90 € kuni 100 km, 180 € kuni 200 km, eraldi pakkumine kaugemale. Setup on igal pool sama.",
      },
      {
        q: "Kas boks sobib pulma visuaalsesse keelde?",
        a: "Branded tasemes — jah, UI võtab sinu värvi-paleti ja raami. Esimese-viie pakkumises olevatele paaridele on AI teema ise ehitatud kutsete kirjatüübi ümber.",
      },
      {
        q: "Mis saab vanematest külalistest, kes telefoni ei kasuta?",
        a: "Iga pilt prinditakse kohapeal. Host juhendab iga külalist. Keegi ei lähe tühjade kätega ära.",
      },
    ],
    closeHeading: "Kuidas ootejärjekorda jõuda",
    close:
      "Kirjuta mulle — Reijo — aadressil info@portrai.ee, või vajuta allolevat nuppu. Räägi kuupäev, mille oled kinni hoidnud, venue, ligikaudne külaliste arv ja milline energia peaks vastuvõtul olema. Vastan isiklikult kolme töötunni jooksul.",
    cta: "Liitu ootejärjekorraga",
    sign: "— Reijo Pullai, asutaja",
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

      {/* Letter format — single editorial column, max 720px, no eyebrow,
          no card grid, no border-left stripes. Heading + signed body. */}
      <article className="mx-auto max-w-[720px] px-6 py-24 md:py-32">
        <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          {copy.date}
        </p>

        <h1
          className="mb-12 leading-[1.04] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            fontWeight: 400,
          }}
        >
          {copy.headline}
        </h1>

        <div
          className="flex flex-col gap-6 text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          <p>{copy.intro}</p>
          <p>{copy.para2}</p>
          <p>{copy.para3}</p>
        </div>

        <h2
          className="mt-16 mb-6 leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {copy.para4Heading}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          {copy.para4}
        </p>

        <h2
          className="mt-16 mb-6 leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {copy.para5Heading}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          {copy.para5}
        </p>

        <h2
          className="mt-16 mb-6 leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {copy.para6Heading}
        </h2>
        <dl className="flex flex-col gap-8">
          {copy.faq.map((item) => (
            <div key={item.q}>
              <dt
                className="mb-2 leading-snug text-white"
                style={{ fontSize: "1.125rem", lineHeight: 1.5 }}
              >
                {item.q}
              </dt>
              <dd className="text-[color:var(--color-text-secondary)]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <h2
          className="mt-20 mb-6 leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          {copy.closeHeading}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          {copy.close}
        </p>

        <div className="mt-12">
          <Link
            href="/kontakt"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
          >
            {copy.cta} →
          </Link>
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          {copy.sign}
        </p>
      </article>
    </PageShell>
  );
}
