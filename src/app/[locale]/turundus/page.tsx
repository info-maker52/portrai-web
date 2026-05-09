import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import Image from "next/image";
import { CalendlyFrame } from "@/components/booking/CalendlyFrame";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import {
  EditorialImageCard,
  type EditorialImageAsset,
} from "@/components/media/EditorialImageCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import {
  getProject,
  text,
  type SiteLocale,
} from "@/lib/site-content";

/**
 * Marketing-events path: /turundus (ET) and /marketing (EN alias).
 *
 * Position: PortrAI as a creative partner for brand activations, not a
 * photo-booth rental. Lead-gen + branded UGC + GDPR + branded touch-points.
 *
 * NOTE: Estonian copy is DRAFT and needs Reijo's native pass.
 * EN copy is the canonical reference.
 */

const FEATURED_SLUGS = [
  "von-fock",
  "laulupidu-postimees",
  "telia-rohekusimustik",
  "swedbank-unistused",
  "oixio-ebs-ai-oppenoustaja",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photo booth for marketing teams | PortrAI"
        : "AI fotoboks turundusmeeskondadele | PortrAI",
    description:
      locale === "en"
        ? "AI photo booth activations for marketing teams in Estonia: branded UGC, GDPR-clean lead capture, trade-show engagement, and campaign-ready reporting."
        : "AI fotoboksi aktivatsioonid turundusmeeskondadele Eestis: bränditud UGC, GDPR-kohane lead capture, messiaktivatsioonid ja kampaania järelraportid.",
    locale,
    ogImage: "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, "/turundus"),
  });
}

const COPY = {
  en: {
    eyebrow: "(02) For brands & marketing teams",
    headline: "Brand activation that's actually measurable.",
    subhead:
      "Leads, shareable UGC, and campaign memories — all GDPR-clean, in your design language, on your team's timeline.",
    primaryCta: "Book a 15-min strategy call",
    secondaryCta: "See the Postimees case",

    diffEyebrow: "(03) How we're different",
    diffTitle: "We come from a marketing background.",
    diffLead:
      "We don't rent you a machine. We solve the campaign problem behind the booth — and that shows up in every screen, email and dataset.",
    differentiators: [
      {
        title: "Brand on every touch-point",
        body: "The interface, the on-screen prompt, the QR landing, the follow-up email — all in your colours, your typeface, your voice.",
      },
      {
        title: "Lead capture, GDPR-clean",
        body: "Opt-in flow per guest, exported as a clean lead list with consent timestamps. Plug into your CRM the next morning.",
      },
      {
        title: "Fast on the floor",
        body: "Throughput tuned for real event traffic. A guest steps in, a portrait is generated, and they leave with something to share — in seconds.",
      },
      {
        title: "Process you can hand to your team",
        body: "We've ran activations for ERR, Postimees, Telia, Swedbank and OIXIO. We bring the playbook so your team doesn't have to invent it.",
      },
    ],

    proofEyebrow: "(04) Real campaign results",
    proofTitle: "These numbers came from real activations, not pitches.",
    metrics: [
      { value: "681K", label: "Images generated · Von Fock (ERR)" },
      { value: "103K", label: "Images + 23K opt-ins · Laulupidu (Postimees)" },
      { value: "+10%", label: "Episode-2 viewership lift · ERR Von Fock" },
      { value: "215K", label: "Article views · Von Fock launch piece" },
    ],

    workEyebrow: "(05) Selected work",
    workTitle: "A few campaigns we've shipped.",

    processEyebrow: "(06) How we work",
    processSteps: [
      {
        n: "01",
        title: "Brief",
        body: "Audience, brand, KPIs, what guests should want to share afterwards.",
      },
      {
        n: "02",
        title: "Branded concept",
        body: "Visual direction, prompt logic, GDPR flow, branded touch-points.",
      },
      {
        n: "03",
        title: "Live activation",
        body: "On-site, online, or hybrid. Throughput tested, energy held.",
      },
      {
        n: "04",
        title: "Data + campaign export",
        body: "Lead list, gallery, highlight reel, case-study assets.",
      },
    ],

    faqEyebrow: "(07) Frequently asked",
    faqTitle: "Things marketing teams ask us first.",
    faq: [
      {
        q: "How do you make the leads usable for our CRM?",
        a: "Every guest opts in via a GDPR-clean consent flow. We export the lead list as CSV with timestamps and consent records, ready to drop into HubSpot, Salesforce, or any standard CRM.",
      },
      {
        q: "How GDPR-compliant is the experience?",
        a: "Fully. Consent is collected per guest, stored with timestamp, and never shared without explicit opt-in. We can adapt the wording of consent text to match your privacy policy.",
      },
      {
        q: "Can the booth carry our brand 100%?",
        a: "Yes. The on-screen interface, the prompt, the QR landing page, the email confirmation, and the printed output all use your colours, typeface, and voice. Every touch-point is designed.",
      },
      {
        q: "How fast can it run when the queue is busy?",
        a: "Each guest experience runs in 30–60 seconds end-to-end. At peak we've delivered 200+ portraits per hour with a single booth.",
      },
      {
        q: "What metrics do you provide after the campaign?",
        a: "A reporting deck covering: total participation, opt-in rate, sharing rate, geographic spread, time-of-day distribution, and a curated highlight gallery. Plus the lead list.",
      },
    ],

    ctaEyebrow: "(08) Talk to us",
    ctaTitle: "Tell us about the campaign.",
    ctaBody: "We'll send a concept direction and a budget range within 48 hours.",
    ctaCalendly: "Book a 15-min discovery call",
  },
  et: {
    // [ET DRAFT — needs your pass]
    eyebrow: "(02) Brändidele ja turundusmeeskondadele",
    headline: "Brändi-aktivatsioon, mida saab tegelikult mõõta.",
    subhead:
      "Leadid, jagatav UGC ja kampaania-mälestused — kõik GDPR-iga, sinu disainikeeles, sinu meeskonna ajagraafikus.",
    primaryCta: "Broneeri 15-min strateegiakõne",
    secondaryCta: "Vaata Postimehe juhtumit",

    diffEyebrow: "(03) Mille poolest erineme",
    diffTitle: "Tuleme turundustaustast.",
    diffLead:
      "Me ei rendi sulle masinat. Me lahendame kampaania-probleemi, mis on boksi taga — ja see paistab välja igal ekraanil, igas e-kirjas ja igas andmestikus.",
    differentiators: [
      {
        title: "Bränd igal puutepunktil",
        body: "Liides, ekraani-prompt, QR-leht, järelpost — kõik sinu värvides, sinu kirjatüübis, sinu hääles.",
      },
      {
        title: "Leadide kogumine, GDPR-iga",
        body: "Vabatahtlik nõusolek iga külalise jaoks, eksporditav puhas leadide nimekiri koos ajatempliga. Hommikul CRM-i.",
      },
      {
        title: "Kiire kohapeal",
        body: "Läbilask on häälestatud päris ürituseliikluse jaoks. Külaline tuleb, pilt valmib, jagatakse — sekunditega.",
      },
      {
        title: "Protsess, mille saad oma meeskonnale üle anda",
        body: "Oleme teinud aktivatsioone ERR-ile, Postimehele, Teliale, Swedbankile ja OIXIO-le. Toome kaasa playbook'i, mida sinu meeskonnal pole vaja leiutada.",
      },
    ],

    proofEyebrow: "(04) Päris kampaania-tulemused",
    proofTitle: "Need numbrid tulid päris aktivatsioonidest, mitte slaididelt.",
    metrics: [
      { value: "681K", label: "Pilti genereeritud · Von Fock (ERR)" },
      { value: "103K", label: "Pilti + 23K registreerimist · Laulupidu (Postimees)" },
      { value: "+10%", label: "2. seeria vaatajakasv · ERR Von Fock" },
      { value: "215K", label: "Artikli vaatamist · Von Focki lansseerimine" },
    ],

    workEyebrow: "(05) Valitud tööd",
    workTitle: "Mõned kampaaniad, mille oleme teinud.",

    processEyebrow: "(06) Kuidas me töötame",
    processSteps: [
      {
        n: "01",
        title: "Brief",
        body: "Sihtgrupp, bränd, KPI-d, mida külalised peaksid pärast jagada tahtma.",
      },
      {
        n: "02",
        title: "Bränditud kontseptsioon",
        body: "Visuaalne suund, promptiloogika, GDPR-voog, bränditud puutepunktid.",
      },
      {
        n: "03",
        title: "Live-aktivatsioon",
        body: "Kohapeal, veebis või hübriidina. Läbilask testitud, energia üleval.",
      },
      {
        n: "04",
        title: "Andmed + kampaania-eksport",
        body: "Leadide nimekiri, galerii, highlight-video, case-study materjalid.",
      },
    ],

    faqEyebrow: "(07) Korduvad küsimused",
    faqTitle: "Mida turundusmeeskonnad kõige sagedamini küsivad.",
    faq: [
      {
        q: "Kuidas saab leadid meie CRM-i?",
        a: "Iga külaline annab GDPR-kohase nõusoleku. Ekspordime leadide nimekirja CSV-failina koos ajatempli ja nõusoleku kinnitusega — saab kohe HubSpotti, Salesforce'i või muusse CRM-i lisada.",
      },
      {
        q: "Kas kogemus on GDPR-iga vastavuses?",
        a: "Täielikult. Nõusolek küsitakse iga külalise käest, salvestatakse koos ajatempliga ja midagi ei jagata ilma selge nõusolekuta. Vajadusel kohandame nõusoleku teksti teie privaatsuspoliitikaga.",
      },
      {
        q: "Kas boks saab olla 100% bränditud?",
        a: "Jah. Ekraanil olev liides, prompt, QR-leht, kinnituskiri ja prinditud pilt — kõik teie värvides, kirjatüübis ja hääles. Iga puutepunkt on disainitud.",
      },
      {
        q: "Kui kiiresti saab boks tippkoormusel töötada?",
        a: "Üks külalisekogemus võtab 30–60 sekundit. Tippkoormusel oleme ühe boksiga teinud 200+ portreed tunnis.",
      },
      {
        q: "Mida raporteerite pärast kampaaniat?",
        a: "Aruanne, mis sisaldab: osavõtt kokku, nõusoleku määr, jagamiste arv, geograafiline jaotus, kasutus ajalises lõikes ja kuratoorne pildigalerii. Pluss leadide nimekiri.",
      },
    ],

    ctaEyebrow: "(08) Räägi meiega",
    ctaTitle: "Räägi meile kampaaniast.",
    ctaBody: "Saadame kontseptsiooni-suuna ja eelarvevahemiku 48 tunni jooksul.",
    ctaCalendly: "Broneeri 15-min tutvumiskõne",
  },
} as const;

const DIFFERENTIATOR_MEDIA: EditorialImageAsset[] = [
  {
    alt: {
      en: "A branded PortrAI interface designed to match a campaign visual language",
      et: "Bränditud PortrAI liides, mis järgib kampaania visuaalset keelt",
    },
    badge: {
      en: "Brand system",
      et: "Brändisüsteem",
    },
    objectPosition: "55% 44%",
    src: "/images/site/interactive-booth.png",
  },
  {
    alt: {
      en: "A campaign flow showing how portraits move from input to branded output",
      et: "Kampaaniavoog, mis näitab, kuidas portreed liiguvad sisendist bränditud väljundini",
    },
    badge: {
      en: "Consent-ready flow",
      et: "Nõusolekuga voog",
    },
    src: "/images/site/portrait-reveal.png",
  },
  {
    alt: {
      en: "Guests engaging with PortrAI during a high-traffic activation moment",
      et: "Külalised PortrAI-ga suhtlemas suure liiklusega aktivatsiooni hetkel",
    },
    badge: {
      en: "Fast on the floor",
      et: "Kiire saalis",
    },
    objectPosition: "50% 52%",
    src: "/images/site/event-action.jpg",
  },
  {
    alt: {
      en: "A branded Telia activation portrait showing campaign-ready output quality",
      et: "Bränditud Telia aktivatsiooniportree, mis näitab kampaaniaks sobivat väljundikvaliteeti",
    },
    badge: {
      en: "Proven process",
      et: "Tõestatud protsess",
    },
    src: "/images/work/telia-rohekusimustik/gallery-01.jpg",
  },
];

const PROCESS_MEDIA: EditorialImageAsset[] = [
  {
    alt: {
      en: "A style board showing how raw portraits become campaign assets",
      et: "Stiilitahvel, mis näitab, kuidas toorportreedest saavad kampaania varad",
    },
    badge: {
      en: "Brief",
      et: "Brief",
    },
    src: "/images/site/portrait-base.png",
  },
  {
    alt: {
      en: "A branded concept scene from the Telia questionnaire-led activation",
      et: "Bränditud kontseptsioonistseen Telia küsimustikul põhinevast aktivatsioonist",
    },
    badge: {
      en: "Concept",
      et: "Kontseptsioon",
    },
    src: "/images/work/telia-rohekusimustik/gallery-03.jpg",
  },
  {
    alt: {
      en: "A live activation moment where the booth is running on the event floor",
      et: "Live-aktivatsiooni hetk, kus boks töötab ürituse põrandal",
    },
    badge: {
      en: "Activation",
      et: "Aktivatsioon",
    },
    objectPosition: "50% 52%",
    src: "/images/site/event-action.jpg",
  },
  {
    alt: {
      en: "A Swedbank campaign output used in the gallery and post-event export",
      et: "Swedbanki kampaania väljund, mida kasutatakse galeriis ja järelmaterjalides",
    },
    badge: {
      en: "Export",
      et: "Eksport",
    },
    src: "/images/work/swedbank-unistused/gallery-01.jpg",
  },
];

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = COPY[locale];
  const projects = FEATURED_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<ReturnType<typeof getProject>> => p !== null,
  );

  // Image specs — locale-independent. Each differentiator + process step
  // gets a description of what visual eventually goes there.
  const diffImages = [
    "Branded UI mockup: PortrAI booth screen in client's brand colours and typeface",
    "Lead dashboard mockup: GDPR consent flow with timestamps and CRM-ready CSV export",
    "Action shot: guest at booth, photo generating, queue moving smoothly behind them",
    "Workshop photo: PortrAI team handing off the playbook to a marketing team",
  ];

  const processImages = [
    "Client brief workshop — marketing team and PortrAI mapping campaign goals",
    "Concept mockups + prompt-direction sketches in brand colours",
    "Live booth running at a corporate event with full queue",
    "Reporting dashboard with campaign metrics and lead export CSV",
  ];

  return (
    <PageShell>
      {/* Hero — two-column with hero image */}
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
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
              className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.subhead}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  {copy.primaryCta} →
                </Link>
              </MagneticButton>
              <Link
                href={`/tood/${FEATURED_SLUGS[1]}`}
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          {/* Hero image — interactive booth in action */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/site/interactive-booth.png"
              alt={
                locale === "en"
                  ? "PortrAI interactive booth screen mid-experience at a brand activation"
                  : "PortrAI interaktiivse boksi ekraan brändi-aktivatsiooni keskel"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              ◆ Live activation
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.diffEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.diffTitle}
            </h2>
          </div>
          <p
            className="self-end max-w-2xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.diffLead}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.differentiators.map((d, i) => (
            <article
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]"
            >
              <EditorialImageCard
                asset={DIFFERENTIATOR_MEDIA[i] ?? DIFFERENTIATOR_MEDIA[0]}
                className="aspect-[16/9]"
                locale={locale}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="flex flex-col gap-3 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
                  0{i + 1}
                </p>
                <h3
                  className="font-medium leading-tight"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {d.title}
                </h3>
                <p className="text-[color:var(--color-text-secondary)]">
                  {d.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Real campaign metrics */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.proofEyebrow}
        </p>
        <h2
          className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {copy.proofTitle}
        </h2>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}
        >
          {copy.metrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
            >
              <p
                className="font-mono font-medium tabular-nums leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {m.value}
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.workEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.workTitle}
            </h2>
          </div>
          <Link
            href="/tood"
            className="hidden font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-white hover:underline md:inline-block"
          >
            {locale === "en" ? "All work" : "Kõik tööd"} →
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/tood/${project.slug}`}
              className="group flex flex-col gap-3"
            >
              <ProjectCoverImage
                className="aspect-[4/5] rounded-2xl"
                imageClassName="group-hover:scale-[1.03]"
                locale={locale}
                overlayClassName="bg-gradient-to-t from-[rgba(2,9,30,0.78)] via-transparent to-transparent"
                project={project}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="flex items-baseline justify-between">
                <p className="font-medium">{project.client}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  {project.year}
                </p>
              </div>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, project.event)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.processEyebrow}
        </p>
        <div className="grid gap-6 md:grid-cols-4">
          {copy.processSteps.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-4">
              <EditorialImageCard
                asset={PROCESS_MEDIA[i] ?? PROCESS_MEDIA[0]}
                className="aspect-square rounded-2xl"
                locale={locale}
                sizes="(max-width: 768px) 100vw, 25vw"
              />
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

      {/* CTA + Calendly placeholder */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.ctaEyebrow}
            </p>
            <h2
              className="max-w-3xl font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              {copy.ctaTitle}
            </h2>
            <p
              className="max-w-xl text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {copy.ctaBody}
            </p>
          </div>
          <CalendlyFrame
            fallbackCta={copy.ctaCalendly}
            fallbackHref="/kontakt"
          />
        </div>
      </section>
    </PageShell>
  );
}
