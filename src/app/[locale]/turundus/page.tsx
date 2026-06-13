import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { OutcomeMetrics } from "@/components/trust/OutcomeMetrics";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { ProofMicrocopy } from "@/components/trust/ProofMicrocopy";
import { ProcessFlow } from "@/components/studio/ProcessFlow";
import { StudioHeroCycle } from "@/components/studio/StudioHeroCycle";
import {
  AIVAR_CREDIT,
  AIVAR_QUOTE,
  CTA,
  PRODUCT_LINES,
} from "@/lib/copy";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  localizedSitePath,
  serviceSchema,
  SITE_URL,
} from "@/lib/seo";
import { type SiteLocale, text } from "@/lib/site-content";

/**
 * /turundus — brand-activations landing.
 *
 * Buyer: marketing director / agency producer. Page sells the
 * campaign-concept tier (Custom Activation + Virtual Widget product
 * lines) where the brief is bigger than a rental.
 *
 * Identity: PortrAI builds brand activations. We avoid calling
 * ourselves a "studio" anywhere visible — it's a coined frame nobody
 * searches, and it leaked across the rest of the site. The page sells
 * the work, not the metaphor.
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
        ? "Brand activations with AI photo — PortrAI"
        : "Brändi-aktivatsioonid AI fotoga — PortrAI",
    description:
      locale === "en"
        ? "PortrAI builds campaign concepts that use AI photo as the medium — for brands, agencies and trade-show teams. Swedbank, Synlab, Von Fock, Laulupidu."
        : "PortrAI ehitab kampaania-kontseptsioone, mis kasutavad AI fotot meediumina — brändidele, agentuuridele ja messimeeskondadele. Swedbank, Synlab, Von Fock, Laulupidu.",
    locale,
    ogImage: "/images/site/portrait-detail.png",
    path: localizedSitePath(locale, "/turundus"),
  });
}

const COPY = {
  en: {
    eyebrow: "(01) Brand activations",
    headline: "Brand activations, not booth rentals.",
    sub: "PortrAI builds campaign concepts with AI photo as the medium. Every project starts from a brief. Tech comes second. Swedbank, Synlab, Von Fock, Laulupidu — these are campaigns, not bookings.",
    primaryCta: "Bring us a brief",
    secondaryCta: "See the work",

    productLinesEyebrow: "(02) What you can choose",
    productLinesTitle: "Four shapes the work takes.",

    showcaseEyebrow: "(03) Recent campaigns",
    showcaseTitle: "Award territory.",
    showcase: [
      {
        client: "Swedbank",
        title: '"What\'s your dream?"',
        body: "AI Photobooth campaign positioning Swedbank as the bank that helps dreams come true. Guests typed a dream — AI visualised them inside it.",
        href: "/tood/swedbank-unistused",
        metric: "15-second renders",
        image: "/images/work/swedbank-unistused-cover.jpg",
      },
      {
        client: "Synlab",
        title: "Elu nagu Synlab'is",
        body: "Employee-engagement concept turning lab staff into characters across past, present and future versions of Synlab.",
        href: "/tood/synlab-elu",
        metric: "20-year emotion record",
        image: "/images/work/melt-cover.png",
      },
      {
        client: "ERR · Von Fock",
        title: "Most Innovative Marketing Campaign 2023",
        body: "Virtual AI photo experience turning audiences into Von Fock-era portraits. The campaign asset lived on an ERR microsite.",
        href: "/tood/von-fock",
        metric: "681K portraits · +10% ep.2 viewers",
        image: "/images/work/von-fock-cover.jpg",
      },
      {
        client: "Postimees · Laulupidu",
        title: "Pronksmuna winner",
        body: "Laulupidu engagement device for Postimees. Lived on a Postimees microsite for the duration of the campaign.",
        href: "/tood/laulupidu-postimees",
        metric: "103K portraits · 23K opt-ins",
        image: "/images/work/laulupidu-postimees-cover.jpg",
      },
    ],

    processEyebrow: "(04) How we work",
    processTitle: "Brief in. Campaign out.",
    process: [
      { n: "01", title: "Brief", body: "What you're launching, who you're for, what success looks like." },
      { n: "02", title: "Concept", body: "We design the activation idea around your brand — booth, widget or both." },
      { n: "03", title: "Build", body: "Custom AI prompts, branded UI, hardware setup, lead capture." },
      { n: "04", title: "Run", body: "On-event delivery + microsite up. We host the experience." },
      { n: "05", title: "Report", body: "Portraits, opt-ins, throughput. CSV or BI-ready." },
    ],

    metricsEyebrow: "(05) What you usually see",
    metricsBody:
      "Aggregated across PortrAI activations. Your number depends on event size, length, and how the booth is positioned in your program.",

    quoteEyebrow: "(06) What organisers say",

    faqEyebrow: "(07) Questions agencies ask first",
    faqTitle: "Working with PortrAI, in numbers.",
    faq: [
      {
        q: "Do you sell the booth or the campaign?",
        a: "Both. Pick the productized booth tier (Boks or Branded) if you want a known quantity. Pick Custom Activation when the brief is bigger than the booth — that's the Swedbank / Synlab / Von Fock tier.",
      },
      {
        q: "Can we plug PortrAI into our existing event microsite?",
        a: "Yes. Virtual Widget runs on your microsite without a physical booth, or alongside one. Same AI engine, your domain, your design system.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Lead-capture is GDPR-clean, opt-in per guest, exported to CSV with consent timestamps. No middle layer.",
      },
      {
        q: "How custom can a Custom Activation get?",
        a: "Brief-led. Swedbank's was a dream-keyword flow; Synlab's was a tone-and-keyword character builder; Von Fock was a virtual widget delivering 681K outputs. If you can describe the campaign moment, we can probably build it.",
      },
      {
        q: "Timeline from brief to event?",
        a: "Custom themes deliver inside 2 weeks. Full Custom Activations with bespoke flow + microsite typically need 3–5 weeks. Tighter timelines exist — talk to us.",
      },
      {
        q: "Can we see your standard rates?",
        a: "Productized tiers are public: Boks €490, Branded €890. Custom is quote-only — pricing depends on the brief.",
      },
    ],

    messibox: {
      eyebrow: "(08) Trade shows",
      title: "Looking for a messibox?",
      body: "Trade-show booths get their own page — same team, narrower brief.",
      cta: "See messibox",
    },

    ctaEyebrow: "(09) Bring us a brief",
    ctaTitle: "Tell us what you're launching.",
    ctaBody: "We reply within 3 business hours with a sharp first read.",
    ctaButton: "Bring us a brief",
  },
  et: {
    eyebrow: "(01) Brändi-aktivatsioonid",
    headline: "Brändi-aktivatsioonid, mitte boksi rent.",
    sub: "Me ehitame kampaania-kontseptsioone, mis kasutavad AI fotot meediumina. Iga projekt algab briifist. Tehnoloogia tuleb pärast. Swedbank, Synlab, Von Fock, Laulupidu — need on kampaaniad, mitte broneeringud.",
    primaryCta: "Too meile brief",
    secondaryCta: "Vaata töid",

    productLinesEyebrow: "(02) Mida saad valida",
    productLinesTitle: "Neli kuju, milleks töö saab muutuda.",

    showcaseEyebrow: "(03) Hiljutised kampaaniad",
    showcaseTitle: "Auhinnatud territoorium.",
    showcase: [
      {
        client: "Swedbank",
        title: "„Mis on sinu unistus?\"",
        body: "AI Photobooth kampaania, mis positsioneerib Swedbanki pangana, kes aitab unistused täita. Külalised kirjutasid unistuse — AI visualiseeris neid selles.",
        href: "/tood/swedbank-unistused",
        metric: "15-sekundilised renderdused",
        image: "/images/work/swedbank-unistused-cover.jpg",
      },
      {
        client: "Synlab",
        title: "„Elu nagu Synlab'is\"",
        body: "Töötaja-kaasamise kontseptsioon, mis muutis labori töötajad tegelasteks mineviku, oleviku ja tuleviku Synlabis.",
        href: "/tood/synlab-elu",
        metric: "20 aasta emotsiooni-rekord",
        image: "/images/work/melt-cover.png",
      },
      {
        client: "ERR · Von Fock",
        title: "Aasta innovaatilisem turunduskampaania 2023",
        body: "Virtuaalne AI fotokogemus, mis muutis publiku Von Focki-aegseteks portreedeks. Kampaania asset elas ERR-i mikrosaidil.",
        href: "/tood/von-fock",
        metric: "681K portreed · +10% 2. saate vaatajaid",
        image: "/images/work/von-fock-cover.jpg",
      },
      {
        client: "Postimees · Laulupidu",
        title: "Pronksmuna võitja",
        body: "Laulupeo-kaasamise lahendus Postimehele. Elas Postimehe mikrosaidil kampaania ajal.",
        href: "/tood/laulupidu-postimees",
        metric: "103K portreed · 23K opt-ini",
        image: "/images/work/laulupidu-postimees-cover.jpg",
      },
    ],

    processEyebrow: "(04) Kuidas töötame",
    processTitle: "Brief sisse. Kampaania välja.",
    process: [
      { n: "01", title: "Brief", body: "Mida sa lansseerid, kellele, mis on edu mõõdupuu." },
      { n: "02", title: "Kontseptsioon", body: "Disainime aktivatsiooni idee sinu brändi ümber — boks, widget või mõlemad." },
      { n: "03", title: "Ehitame", body: "Kohandatud AI promptid, bränditud UI, riistvara ülespanek, leadide kogumine." },
      { n: "04", title: "Run", body: "Üritusel kohapeal + mikrosait üleval. Meie hostime kogemuse." },
      { n: "05", title: "Raport", body: "Portreed, opt-inid, läbilask. CSV või BI-valmis." },
    ],

    metricsEyebrow: "(05) Mida tüüpiliselt näed",
    metricsBody:
      "Kokku võetud PortrAI aktivatsioonidelt. Sinu number sõltub ürituse suurusest, kestusest ja sellest, kuidas boks on programmi paigutatud.",

    quoteEyebrow: "(06) Mida korraldajad ütlevad",

    faqEyebrow: "(07) Mida agentuurid kõige sagedamini küsivad",
    faqTitle: "PortrAI-ga töötamine numbrites.",
    faq: [
      {
        q: "Kas te müüte boksi või kampaaniat?",
        a: "Mõlemat. Vali produktitud boksi-tase (Boks või Branded), kui tahad teadaolevat kogust. Vali Custom Activation, kui brief on suurem kui boks — see on Swedbanki / Synlabi / Von Focki tase.",
      },
      {
        q: "Kas saame PortrAI ühendada oma ürituse mikrosaidiga?",
        a: "Jah. Virtual Widget töötab sinu mikrosaidil ilma füüsilise boksita või selle kõrval. Sama AI-mootor, sinu domeen, sinu disainisüsteem.",
      },
      {
        q: "Kellele kuulub andmestik?",
        a: "Sinule. Leadide kogumine on GDPR-puhas, opt-in iga külalise jaoks, eksporditud CSV-na koos nõusoleku ajatemplitega. Vahekihti pole.",
      },
      {
        q: "Kui kohandatav Custom Activation tegelikult on?",
        a: "Briifi-juhitud. Swedbanki oma oli unistuse-märksõna voog; Synlabi oma oli tooni-ja-märksõna karakteri-ehitaja; Von Fock oli virtuaalne widget, mis tarnis 681K väljundit. Kui sa oskad kirjeldada kampaania-hetke, oskame me seda ehitada.",
      },
      {
        q: "Ajakulu briifist ürituseni?",
        a: "Kohandatud teemad valmivad 2 nädalaga. Täielikud Custom Activationid spetsiifilise voo ja mikrosaidiga vajavad tüüpiliselt 3–5 nädalat. Lühemad ajakavad on olemas — räägi meiega.",
      },
      {
        q: "Kas saame näha standard-hindu?",
        a: "Produktitud tasemed on avalikud: Boks 490 €, Branded 890 €. Custom on pakkumise-põhine — hind sõltub briifist.",
      },
    ],

    messibox: {
      eyebrow: "(08) Messid",
      title: "Otsid messiboksi?",
      body: "Messi-boksid saavad oma lehe — sama meeskond, kitsam brief.",
      cta: "Vaata messilahendusi",
    },

    ctaEyebrow: "(09) Too meile brief",
    ctaTitle: "Räägi, mida lansseerid.",
    ctaBody: "Vastame 3 töötunni jooksul terava esimese lugemisega.",
    ctaButton: "Too meile brief",
  },
} as const;

export default async function TurundusPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const copy = COPY[locale];
  const pageUrl = `${SITE_URL}${localizedSitePath(locale, "/turundus")}`;

  const service = serviceSchema({
    name: locale === "en" ? "Brand activations with AI photo" : "Brändi-aktivatsioonid AI fotoga",
    description:
      locale === "en"
        ? "Custom AI photo activations for brands, agencies, and trade-show teams in Estonia and across Europe."
        : "Kohandatud AI foto-aktivatsioonid brändidele, agentuuridele ja messimeeskondadele Eestis ja üle Euroopa.",
    serviceType: "Brand activation",
    url: pageUrl,
    image: `${SITE_URL}/images/site/portrait-detail.png`,
  });
  const faqLd = faqSchema(copy.faq);
  const breadcrumbs = breadcrumbSchema([
    {
      name: locale === "en" ? "Home" : "Avaleht",
      url: `${SITE_URL}${localizedSitePath(locale, "/")}`,
    },
    { name: locale === "en" ? "Brand activations" : "Brändi-aktivatsioonid", url: pageUrl },
  ]);

  return (
    <PageShell>
      <JsonLd data={service} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs} />

      {/* Hero — MSCHF moment lives in the H1 */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--color-stroke-subtle)] px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 18% 26%, rgba(121,72,255,0.16), transparent 22%), radial-gradient(circle at 82% 14%, rgba(255,162,255,0.10), transparent 22%)",
          }}
        />
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
            <ProofMicrocopy locale={locale} variant="awards" className="mb-4" />
            <div className="mb-8 flex flex-wrap gap-4">
              <MagneticButton>
                <BookingTrigger
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                  initialState={{ eventType: "brand" }}
                >
                  {copy.primaryCta} →
                </BookingTrigger>
              </MagneticButton>
              <Link
                href={"/tood" as "/tood" | "/work"}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          {/* Studio hero reel — 5 styles cross-fade via CSS keyframe.
              See StudioHeroCycle for layer + timing detail. */}
          <StudioHeroCycle />
        </div>
      </section>

      {/* (02) Four product lines */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.productLinesEyebrow}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.productLinesTitle}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PRODUCT_LINES.map((line) => (
            <article
              key={line.id}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                {text(locale, line.priceLabel)}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {text(locale, line.name)}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, line.body)}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* (03) Case-study showcase */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.showcaseEyebrow}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.showcaseTitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {copy.showcase.map((item) => (
            <Link
              key={item.client}
              href={item.href as `/tood/${string}`}
              className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)] p-6 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/60 hover:shadow-[var(--glow-medium)] md:p-8"
            >
              <Image
                src={item.image}
                alt={`${item.client} — ${item.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-40 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-65"
              />
              <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-[rgba(2,9,30,0.85)] via-[rgba(2,9,30,0.78)] to-[rgba(2,9,30,0.6)]" />

              {/* Static layer — idle state */}
              <div className="relative transition-opacity duration-300 group-hover:opacity-40">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                  {item.client}
                </p>
                <h3
                  className="mt-2 font-medium leading-tight"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[color:var(--color-text-secondary)]">
                  {item.body}
                </p>
              </div>

              {/* Hover-reveal — the metric pops to centre */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-brand-accent)]">
                  {item.client}
                </p>
                <p
                  className="font-medium tabular-nums leading-tight text-white"
                  style={{ fontSize: "var(--text-display-md)" }}
                >
                  {item.metric}
                </p>
              </div>

              {/* Footer link cue — always visible */}
              <div className="relative flex items-end justify-end gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-white transition-colors group-hover:text-[color:var(--color-brand-accent)]">
                  {locale === "en" ? "Read the case →" : "Loe juhtumit →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* (04) Process */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            {copy.processEyebrow}
          </p>
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {copy.processTitle}
          </h2>
        </div>
        <ProcessFlow
          steps={copy.process}
          beginsHereLabel={locale === "en" ? "Begins here" : "Algab siit"}
        />
      </section>

      {/* (05) Outcomes */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-16 md:px-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
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

      {/* (06) Quote */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-gradient-to-b from-[color:var(--color-surface-raised)] to-transparent px-6 py-24 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.quoteEyebrow}
        </p>
        <figure className="mx-auto max-w-4xl">
          <blockquote
            className="font-medium leading-[1.1] tracking-tight text-white"
            style={{ fontSize: "var(--text-display-lg)" }}
          >
            <span className="text-[color:var(--color-brand-accent)]">"</span>
            {text(locale, AIVAR_QUOTE)}
            <span className="text-[color:var(--color-brand-accent)]">"</span>
          </blockquote>
          <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
            — {text(locale, AIVAR_CREDIT)}
          </figcaption>
        </figure>
      </section>

      {/* (07) FAQ */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] px-6 py-20 md:px-12">
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

      {/* (08) Trade-show callout */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-brand-primary)]/6 px-6 py-16 md:px-12">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
              {copy.messibox.eyebrow}
            </p>
            <h3
              className="font-medium leading-tight"
              style={{ fontSize: "var(--text-title)" }}
            >
              {copy.messibox.title}
            </h3>
            <p className="mt-2 max-w-xl text-[color:var(--color-text-secondary)]">
              {copy.messibox.body}
            </p>
          </div>
          <Link
            href="/messilahendused"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
          >
            {copy.messibox.cta} →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.ctaEyebrow}
        </p>
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
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
          <BookingTrigger
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-strong)]"
            style={{ fontSize: "var(--text-body-lg)" }}
            initialState={{ eventType: "brand" }}
          >
            {copy.ctaButton} →
          </BookingTrigger>
        </MagneticButton>
      </section>
    </PageShell>
  );
}
