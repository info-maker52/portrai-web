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
import { OutcomeMetrics } from "@/components/trust/OutcomeMetrics";
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
        ? "Company-party photo booth (AI) — PortrAI"
        : "Firmapidu fotoboks (AI) — PortrAI",
    description:
      locale === "en"
        ? "AI photo booth for company parties and corporate events in Estonia. Branded portraits, on-site host, lead capture, fast throughput."
        : "AI fotoboks firmapeole ja ettevõtte üritustele. Bränditud portreed, kohapealne host, leadide kogumine, kiire läbilask.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/firmapidu-fotoboks"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Company party · AI photo booth",
    headline:
      "The company party booth your team actually queues for.",
    subhead:
      "PortrAI runs at peak speed for big crowds — branded portraits, on-site host, optional lead capture. The booth is the experience people remember on Monday.",
    primaryCta: "Get a corporate quote",
    secondaryCta: "See styles",

    whyEyebrow: "(02) Why companies pick PortrAI",
    whyTitle: "Built for crowds, brand control, and content.",
    why: [
      {
        title: "Throughput tuned for 200+/hour",
        body: "Even at peak, queues stay short. Guests don't get bored, and your evening doesn't bottleneck around one tradition.",
      },
      {
        title: "Brand-matched in every frame",
        body: "Your logo, palette, event hashtag. We deliver in the company's design language, not a generic photo-booth template.",
      },
      {
        title: "Optional lead capture",
        body: "GDPR-clean opt-in flow with CSV export. Useful for cross-team campaigns, partner activations, or new-hire onboarding.",
      },
      {
        title: "On-site host who reads the room",
        body: "Our host adjusts energy to the crowd — calm for senior dinners, hype for big anniversaries. They keep the queue civilised either way.",
      },
    ],

    metricsEyebrow: "(03) What companies see in numbers",
    metricsBody:
      "Aggregated across PortrAI corporate events. Your number depends on guest count, length, and how the booth is positioned in the program.",

    flowEyebrow: "(04) How a corporate evening goes",
    flowSteps: [
      {
        n: "01",
        title: "Brief",
        body: "Event purpose, guest count, brand assets, what success looks like for the team.",
      },
      {
        n: "02",
        title: "Pick or build a theme",
        body: "Choose from the catalog or commission a custom theme matched to the event concept.",
      },
      {
        n: "03",
        title: "We arrive 90 min early",
        body: "Setup is 40 minutes. Tested and quiet before guests show up.",
      },
      {
        n: "04",
        title: "Post-event report",
        body: "Photos, opt-ins, hourly throughput. Useful for marketing teams reporting back.",
      },
    ],

    faqEyebrow: "(05) Corporate FAQ",
    faqTitle: "What HR and marketing teams ask first.",
    faq: [
      {
        q: "How much does an AI photo booth for a company party cost?",
        a: "Most company parties land in Signature (€1 190) or Studio (€2 490). Studio includes a custom-built theme, lead capture, and a post-event report.",
      },
      {
        q: "Can the booth match our brand exactly?",
        a: "Yes. Light brand customisation (logo, colours, frame) is included from Signature up. Fully custom themes are €290 as an add-on; we deliver inside two weeks.",
      },
      {
        q: "How does lead capture work?",
        a: "Optional GDPR-clean opt-in screen on the booth. Guests choose to share email + name, get the photo via email, and you get a CSV export the next morning.",
      },
      {
        q: "Can you handle 500+ guests?",
        a: "Yes. We add a second host and tune throughput so the queue never exceeds a few minutes. Studio package is built for this.",
      },
      {
        q: "What if our office is far from Tallinn?",
        a: "We add a flat distance fee — €90 within 100 km, €180 within 200 km. Beyond that we quote per event. Most corporate teams fly in to a Tallinn venue anyway.",
      },
    ],

    ctaTitle: "Make next year's party the one people still talk about.",
    ctaBody:
      "Tell us the date and the team size. We come back with a precise quote within 24 hours.",
    ctaButton: "Get a corporate quote",
  },
  et: {
    eyebrow: "(01) Firmapidu · AI fotoboks",
    headline:
      "Firmapidu fotoboks, mille järjekorda meeskond tegelikult tahab.",
    subhead:
      "PortrAI hoiab tipptunnil tempot — bränditud portreed, kohapealne host, valikuline leadide kogumine. Boks on see kogemus, mida esmaspäeval mäletatakse.",
    primaryCta: "Küsi firma pakkumist",
    secondaryCta: "Vaata stiile",

    whyEyebrow: "(02) Miks ettevõtted valivad PortrAI",
    whyTitle:
      "Tehtud rahvahulkadele, brändi kontrollile ja sisule.",
    why: [
      {
        title: "Läbilask 200+/tund tipus",
        body: "Ka tipphetkel on järjekord lühike. Külalised ei tüdine ja õhtu ei jäägi ühe traditsiooni taha kinni.",
      },
      {
        title: "Bränd igas kaadris",
        body: "Sinu logo, palett, ürituse hashtag. Me anname tulemuse ettevõtte disainikeeles, mitte üldise fotoboksi mallina.",
      },
      {
        title: "Valikuline leadide kogumine",
        body: "GDPR-puhas opt-in voog koos CSV eksportiga. Kasulik kampaaniate, partneri-aktivatsioonide või onboardingu jaoks.",
      },
      {
        title: "Kohapealne host, kes loeb saali",
        body: "Meie host kohandab energia rahvahulgaga — rahulik suuremate juhtide õhtutel, energiline juubelitel. Järjekord püsib alati korras.",
      },
    ],

    metricsEyebrow: "(03) Mida ettevõtted numbrites näevad",
    metricsBody:
      "Kokku võetud PortrAI firma üritustelt. Sinu number sõltub külaliste arvust, kestusest ja sellest, kuidas boks on programmi paigutatud.",

    flowEyebrow: "(04) Kuidas firmaõhtu käib",
    flowSteps: [
      {
        n: "01",
        title: "Brief",
        body: "Ürituse eesmärk, külaliste arv, brändivarad, mida meeskond loeb edukaks.",
      },
      {
        n: "02",
        title: "Vali või loo teema",
        body: "Vali kataloogist või telli kohandatud teema, mis sobib ürituse kontseptsiooniga.",
      },
      {
        n: "03",
        title: "Saabume 90 min varem",
        body: "Setup võtab 40 minutit. Testitud ja vaikselt valmis enne külaliste saabumist.",
      },
      {
        n: "04",
        title: "Üritusejärgne raport",
        body: "Pildid, opt-inid, läbilask tunni kaupa. Kasulik turundusmeeskondadele tagasiraporteerimiseks.",
      },
    ],

    faqEyebrow: "(05) Firmapidu KKK",
    faqTitle: "Mida HR ja turundus kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kui palju maksab AI fotoboks firmapeole?",
        a: "Enamik firmapidudest sobib Signature (1 190 €) või Studio (2 490 €) paketti. Studio sisaldab kohandatud teemat, leadide kogumist ja üritusejärgset raportit.",
      },
      {
        q: "Kas boks saab sobituda meie brändiga täpselt?",
        a: "Jah. Kerge brändi kohandus (logo, värvid, raam) on Signature paketist alates sees. Täiesti kohandatud teemad lisana 290 €; valmib kahe nädalaga.",
      },
      {
        q: "Kuidas leadide kogumine töötab?",
        a: "Valikuline GDPR-puhas opt-in ekraan boksi peal. Külalised valivad jagada e-posti ja nime, saavad pildi e-postile, sina saad CSV ekspordi järgmisel hommikul.",
      },
      {
        q: "Kas saate 500+ külalisega hakkama?",
        a: "Jah. Lisame teise hosti ja häälestame läbilaskvuse nii, et järjekord ei ületa paari minutit. Studio pakett on selleks tehtud.",
      },
      {
        q: "Mis siis, kui kontor on Tallinnast kaugel?",
        a: "Lisame fikseeritud transporditasu — 90 € kuni 100 km, 180 € kuni 200 km. Kaugemale teeme eraldi pakkumise. Enamik firmaüritusi toimub niikuinii Tallinna venue's.",
      },
    ],

    ctaTitle: "Tee järgmise aasta peo, millest aasta hiljem räägitakse.",
    ctaBody:
      "Räägi meile kuupäev ja meeskonna suurus. Tuleme tagasi täpse pakkumisega 24 tunni jooksul.",
    ctaButton: "Küsi firma pakkumist",
  },
} as const;

export default async function CompanyPartyPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/firmapidu-fotoboks")}`;

  const service = serviceSchema({
    name:
      locale === "en"
        ? "Company-party AI photo booth"
        : "AI firmapidu fotoboks",
    description:
      locale === "en"
        ? "AI photo booth rental for corporate events and company parties in Estonia."
        : "AI fotoboksi rent firmapidudele ja ettevõtte üritustele Eestis.",
    serviceType: "Corporate photo booth rental",
    url: pageUrl,
    priceRange: "1190–2490 €",
    image: `${SITE_URL}/images/site/event-action.jpg`,
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
              src="/images/site/event-action.jpg"
              alt={
                locale === "en"
                  ? "PortrAI booth at a company party"
                  : "PortrAI boks firmapeol"
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
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.metricsEyebrow}
          </p>
          <p
            className="self-end max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.metricsBody}
          </p>
        </div>
        <OutcomeMetrics locale={locale} />
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
