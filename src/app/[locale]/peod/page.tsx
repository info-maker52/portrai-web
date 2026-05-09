import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import Image from "next/image";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import {
  EditorialImageCard,
  type EditorialImageAsset,
} from "@/components/media/EditorialImageCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import { ThemeGallery } from "@/components/themes/ThemeGallery";
import {
  getProject,
  testimonialSeeds,
  text,
  type SiteLocale,
} from "@/lib/site-content";

/**
 * Fun events path: /peod (ET) and /events (EN alias).
 *
 * Position: PortrAI as the most fun, fastest, most theme-rich photo
 * experience for company parties and private events. Live gallery,
 * interactive themes, on-site assistant.
 *
 * NOTE: Estonian copy is DRAFT and needs Reijo's native pass.
 * EN is canonical reference.
 */

const FEATURED_SLUGS = ["melt"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    title:
      locale === "en"
        ? "AI photo booth for company parties and weddings | PortrAI"
        : "AI fotoboks firmapeole ja pulma | PortrAI",
    description:
      locale === "en"
        ? "AI photo booth, fotoboks, and themed guest experiences for company parties, weddings, and private events in Estonia. Fast setup, live gallery, on-site host, and custom themes."
        : "AI fotoboks, photobooth ja teemastatud külaliskogemus firmapidudele, pulmadele ja eraüritustele Eestis. Kiire setup, live-galerii, kohapealne host ja kohandatud teemad.",
    locale,
    ogImage: "/images/site/event-action.jpg",
    path: localizedSitePath(locale, "/peod"),
  });
}

const COPY = {
  en: {
    eyebrow: "(03) For company parties & private events",
    headline: "The photo booth your guests will talk about for weeks.",
    subhead:
      "Estonia's largest theme library. A live gallery on the screen so everyone sees everyone's photos. Interactive themes where your guests shape the result. And an on-site host who keeps the energy up.",
    primaryCta: "Book PortrAI for your event",
    secondaryCta: "See themes",

    diffEyebrow: "(04) Why guests remember it",
    diffTitle: "Built for fun, speed, and shareability.",
    diffLead:
      "We made every part of the experience for the guest, not the operator. More themes, faster photos, more reasons to stick around.",
    differentiators: [
      {
        emoji: "◆",
        title: "Largest theme catalog in Estonia",
        body: "Whatever your event vibe is — retro, sci-fi, fairytale, painted, neon — there's already a theme for it. Or we'll build a custom one.",
      },
      {
        emoji: "▶",
        title: "Live gallery on the screen",
        body: "Everyone sees everyone's photos as they appear. Guests come back. Photos get re-shared in the moment.",
      },
      {
        emoji: "◉",
        title: "Interactive themes",
        body: "Some themes let guests change the outcome — pick a story, answer a prompt, choose a character. The booth becomes part of the event narrative.",
      },
      {
        emoji: "♦",
        title: "On-site host",
        body: "Our assistant keeps the queue smooth and the energy up. People stay longer, take more photos, share more.",
      },
      {
        emoji: "✦",
        title: "Themed events become a single piece",
        body: "If your event has a concept, we build the booth around it — the booth isn't an extra, it's part of the show.",
      },
      {
        emoji: "◇",
        title: "Fast, even at peak",
        body: "Throughput tuned for big crowds. A guest doesn't wait, gets a great photo, and walks away with something to share.",
      },
    ],

    quoteEyebrow: "(05) What organisers say",

    themesEyebrow: "(06) Theme catalog",
    themesTitle: "A glimpse of the largest theme library in Estonia.",
    themesBody:
      "Each style is a starting point — we tune the prompts, frames, and on-screen flow to match your event. Custom themes available in 2-3 weeks.",

    workEyebrow: "(07) Recent events",
    workTitle: "A few events we've made memorable.",
    moreWork:
      "More events join this page as we publish them. In the meantime, see all our work →",

    processEyebrow: "(07) How it goes",
    processSteps: [
      {
        n: "01",
        title: "Tell us about the event",
        body: "Date, venue, theme, guest count, vibe.",
      },
      {
        n: "02",
        title: "Pick a theme (or design one)",
        body: "Choose from the library, or we'll build a custom one to match your concept.",
      },
      {
        n: "03",
        title: "We arrive, you celebrate",
        body: "Setup is fast. Our host runs the booth so you can enjoy the night.",
      },
      {
        n: "04",
        title: "All photos, instantly",
        body: "Everyone leaves with their photos. Plus a shared gallery link for the next morning.",
      },
    ],

    faqEyebrow: "(08) Frequently asked",
    faqTitle: "Things organisers ask us first.",
    faq: [
      {
        q: "What themes are available?",
        a: "Estonia's largest catalog — 30+ pre-made themes covering retro, sci-fi, painted portraits, neon, fairytale, and many more. We can also build a fully custom theme for your event in 2-3 weeks.",
      },
      {
        q: "How much space and setup time do you need?",
        a: "About 2x2 metres and one regular power outlet. Setup takes ~45 minutes; we arrive 90 minutes before the event starts so the venue is calm before guests arrive.",
      },
      {
        q: "Do guests get both prints and digital photos?",
        a: "Yes — both. Every photo prints on-site within seconds, and every guest also gets a QR code that delivers their photos straight to their phone.",
      },
      {
        q: "My event has a specific concept — can you build the booth around it?",
        a: "Yes. We come from a marketing and concept background, so we approach the booth as part of the show, not an add-on. Tell us the theme and we'll design the visuals, prompts, and on-screen flow to match.",
      },
      {
        q: "Is there always someone on-site running it?",
        a: "Always. Our host welcomes guests, keeps the queue smooth, helps people pose, and keeps the energy up. The booth feels staffed and intentional, not like an unattended kiosk.",
      },
    ],

    ctaTitle: "Let's make your event the one people talk about.",
    ctaBody: "Tell us the date and the vibe. We'll send a quote within 24 hours.",
    ctaButton: "Book PortrAI",
  },
  et: {
    // [ET DRAFT — needs your pass]
    eyebrow: "(03) Firmapidudele ja eraüritustele",
    headline: "Fotoboks, millest räägitakse veel kuid hiljem.",
    subhead:
      "Eesti suurim teemakogum. Live-galerii ekraanil, et kõik näeksid kõikide pilte. Interaktiivsed teemad, kus külaline kujundab tulemust. Ja meie kohapealne host, kes hoiab energia üleval.",
    primaryCta: "Broneeri PortrAI oma üritusele",
    secondaryCta: "Vaata teemasid",

    diffEyebrow: "(04) Miks külalised seda mäletavad",
    diffTitle: "Tehtud lõbu, kiiruse ja jagatavuse jaoks.",
    diffLead:
      "Tegime iga osa kogemusest külalise jaoks, mitte operaatori jaoks. Rohkem teemasid, kiiremad pildid, rohkem põhjusi kohale jääda.",
    differentiators: [
      {
        emoji: "◆",
        title: "Eesti suurim teemakogum",
        body: "Mis iganes peo vibe — retro, sci-fi, muinasjutuline, maalitud, neoon — meil on selleks juba teema. Või teeme kohandatud uue.",
      },
      {
        emoji: "▶",
        title: "Live-galerii ekraanil",
        body: "Kõik näevad kõikide pilte kohe, kui need valmivad. Külalised tulevad tagasi. Pilte jagatakse kohe edasi.",
      },
      {
        emoji: "◉",
        title: "Interaktiivsed teemad",
        body: "Mõned teemad lasevad külalisel tulemust mõjutada — vali lugu, vasta promptile, vali karakter. Boks saab osaks ürituse loost.",
      },
      {
        emoji: "♦",
        title: "Kohapealne host",
        body: "Meie assistent hoiab järjekorra sujuva ja energia üleval. Inimesed jäävad kauemaks, teevad rohkem pilte, jagavad rohkem.",
      },
      {
        emoji: "✦",
        title: "Temaatilised üritused saavad ühtseks",
        body: "Kui sinu üritusel on kontseptsioon, ehitame boksi selle ümber — boks pole lisa, vaid osa etendusest.",
      },
      {
        emoji: "◇",
        title: "Kiire ka tipptunnil",
        body: "Läbilask häälestatud suurte rahvahulkade jaoks. Külaline ei oota, saab hea pildi ja midagi jagada.",
      },
    ],

    quoteEyebrow: "(05) Mida korraldajad ütlevad",

    themesEyebrow: "(06) Teemakogum",
    themesTitle: "Pilguheit Eesti suurimasse teemakogumusse.",
    themesBody:
      "Iga stiil on lähtepunkt — kohandame promptid, raamid ja ekraanivoo teie ürituse järgi. Kohandatud teema valmib 2–3 nädalaga.",

    workEyebrow: "(07) Hiljutised üritused",
    workTitle: "Mõned üritused, mida oleme meeldejäävaks teinud.",
    moreWork:
      "Lisame siia üritusi sedamööda kuidas avaldame. Vahepeal vaata kõiki töid →",

    processEyebrow: "(07) Kuidas see käib",
    processSteps: [
      {
        n: "01",
        title: "Räägi meile üritusest",
        body: "Kuupäev, asukoht, teema, külaliste arv, meeleolu.",
      },
      {
        n: "02",
        title: "Vali teema (või tee uus)",
        body: "Vali olemasolevast kogust või teeme kohandatud teema sinu kontseptsiooni järgi.",
      },
      {
        n: "03",
        title: "Meie tuleme, sina tähistad",
        body: "Setup on kiire. Meie host hoiab boksi käigus, sa saad õhtust nautida.",
      },
      {
        n: "04",
        title: "Kõik pildid, kohe",
        body: "Igaüks lahkub oma piltidega. Lisaks jagatud galerii-link järgmiseks hommikuks.",
      },
    ],

    faqEyebrow: "(08) Korduvad küsimused",
    faqTitle: "Mida korraldajad kõige sagedamini küsivad.",
    faq: [
      {
        q: "Millised teemad on saadaval?",
        a: "Eesti suurim kataloog — üle 30 valmis teema, alates retrost ja sci-fi'st kuni maalitud portreede, neoonini ja muinasjutuni. Saame ka 2–3 nädalaga ehitada teie üritusele kohandatud teema.",
      },
      {
        q: "Kui palju ruumi ja setupiks aega vajate?",
        a: "Umbes 2x2 meetrit ja üks tavaline pistik. Setup võtab ~45 minutit; saabume 90 minutit enne ürituse algust, et venue oleks rahulik enne külaliste saabumist.",
      },
      {
        q: "Kas külalised saavad nii printe kui ka digitaalseid pilte?",
        a: "Jah — mõlemat. Iga pilt prinditakse kohapeal sekunditega, lisaks saab iga külaline QR-koodi, mis annab pildid otse tema telefoni.",
      },
      {
        q: "Meie üritusel on kindel kontseptsioon — kas saate boksi sellele kujundada?",
        a: "Jah. Tuleme turundus- ja kontseptsiooni-taustast, seega lähenemine on, et boks on osa etendusest, mitte lisategevus. Räägi meile teema ja kujundame visuaalid, promptid ja ekraanivoo selle järgi.",
      },
      {
        q: "Kas alati on keegi kohapeal, kes boksi haldab?",
        a: "Alati. Meie host tervitab külalisi, hoiab järjekorra sujuva, aitab inimestel poseerida ja hoiab energia üleval. Boks on mehitatud, mitte tühi kiosk.",
      },
    ],

    ctaTitle: "Teeme sinu üritusest selle, millest räägitakse.",
    ctaBody: "Räägi meile kuupäev ja meeleolu. Saadame pakkumise 24 tunni jooksul.",
    ctaButton: "Broneeri PortrAI",
  },
} as const;

const DIFFERENTIATOR_MEDIA: EditorialImageAsset[] = [
  {
    alt: {
      en: "A spread of themed portrait outputs showing the range of PortrAI styles",
      et: "Valik erinevaid PortrAI portreestiile ja teemade väljundeid",
    },
    badge: {
      en: "30+ themes",
      et: "30+ teemat",
    },
    src: "/images/site/portrait-detail.png",
  },
  {
    alt: {
      en: "PortrAI outputs and conference visuals displayed together at a live event",
      et: "PortrAI väljundid ja konverentsivisuaalid koos live-üritusel",
    },
    badge: {
      en: "Live gallery",
      et: "Live-galerii",
    },
    objectPosition: "50% 50%",
    src: "/images/site/event-action.jpg",
  },
  {
    alt: {
      en: "The PortrAI interface showing an interactive prompt-and-result flow",
      et: "PortrAI liides interaktiivse prompti ja tulemuse vooga",
    },
    badge: {
      en: "Interactive flow",
      et: "Interaktiivne voog",
    },
    objectPosition: "55% 44%",
    src: "/images/site/interactive-booth.png",
  },
  {
    alt: {
      en: "Guests using the PortrAI booth during a busy live event",
      et: "Külalised PortrAI boksi kasutamas elavas ürituse hetkes",
    },
    badge: {
      en: "Hosted on-site",
      et: "Kohapeal juhitud",
    },
    objectPosition: "35% 55%",
    src: "/images/site/event-action.jpg",
  },
  {
    alt: {
      en: "A themed portrait cover showing how one event concept can carry through the output",
      et: "Teemaportree, mis näitab, kuidas ühe ürituse kontseptsioon jõuab väljundisse",
    },
    badge: {
      en: "Theme matched",
      et: "Teemaga seotud",
    },
    objectPosition: "50% 42%",
    src: "/images/work/melt-cover.png",
  },
  {
    alt: {
      en: "A selection of outputs prepared for large-guest throughput",
      et: "Väljundite valik, mis on sobitatud suure külastajamahu jaoks",
    },
    badge: {
      en: "Fast at peak",
      et: "Kiire tipul",
    },
    src: "/images/site/portrait-base.png",
  },
];

const PROCESS_MEDIA: EditorialImageAsset[] = [
  {
    alt: {
      en: "Output previews used while shaping the event direction",
      et: "Väljundite eelvaated, mida kasutatakse ürituse suuna paika sättimiseks",
    },
    badge: {
      en: "Brief",
      et: "Brief",
    },
    src: "/images/site/portrait-base.png",
  },
  {
    alt: {
      en: "A broad set of style directions presented for choosing the event theme",
      et: "Lai valik stiilisuundi, mille seast valida ürituse teema",
    },
    badge: {
      en: "Theme pick",
      et: "Teema valik",
    },
    src: "/images/site/portrait-detail.png",
  },
  {
    alt: {
      en: "PortrAI running live during an event setup and guest rush",
      et: "PortrAI töötamas nii setupi ajal kui ka külaliste tipptunni hetkes",
    },
    badge: {
      en: "Setup + host",
      et: "Setup + host",
    },
    objectPosition: "50% 52%",
    src: "/images/site/event-action.jpg",
  },
  {
    alt: {
      en: "Branded prompt and output flow ready for instant guest delivery",
      et: "Bränditud prompti- ja väljundivoog, mis on valmis koheseks jagamiseks",
    },
    badge: {
      en: "Instant delivery",
      et: "Kohene jagamine",
    },
    objectPosition: "55% 44%",
    src: "/images/site/interactive-booth.png",
  },
];

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = COPY[locale];
  const aivar = testimonialSeeds.find((t) => t.id === "aivar-kuusk")!;
  const projects = FEATURED_SLUGS.map((slug) => getProject(slug)).filter(
    (p): p is NonNullable<ReturnType<typeof getProject>> => p !== null,
  );

  // Image specs — locale-independent. Each differentiator + process step
  // gets a description of what visual eventually goes there.
  const diffImages = [
    "Theme catalog grid: thumbnails of all 30+ pre-made styles",
    "Live gallery on a TV at an event — guests gathered watching photos appear",
    "Guest interacting with a touch-screen prompt — choosing a story or character",
    "PortrAI on-site host helping a couple at the booth, smiling, energy up",
    "Themed event scene where the booth is integrated into the decor — everything matches",
    "Wide shot of a packed event with no queue — booth flowing fast",
  ];

  const processImages = [
    "Phone-call sketch — organiser describing event vibe to PortrAI",
    "Theme catalog screen — picking a style for the event",
    "Setup arrival shot — boxes being unpacked at the venue",
    "Phone-screen with the gallery link being shared the morning after",
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
                href="/tood"
                className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
              >
                {copy.secondaryCta} →
              </Link>
            </div>
          </div>

          {/* Hero image — booth in event action */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--color-stroke-subtle)]">
            <Image
              src="/images/site/event-action.jpg"
              alt={
                locale === "en"
                  ? "PortrAI booth at a live event with guests engaging"
                  : "PortrAI boks live-üritusel külalistega"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.55)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
              ◆ Live event
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.differentiators.map((d, i) => (
            <article
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]"
            >
              <EditorialImageCard
                asset={DIFFERENTIATOR_MEDIA[i] ?? DIFFERENTIATOR_MEDIA[0]}
                className="aspect-[16/10]"
                locale={locale}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="flex flex-col gap-3 p-6">
                <p className="text-2xl text-[color:var(--color-brand-accent)]">
                  {d.emoji}
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

      {/* Aivar Kuusk pull quote — full bleed with headshot */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-gradient-to-b from-[color:var(--color-surface-raised)] to-transparent px-6 py-32 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.quoteEyebrow}
        </p>
        <figure className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[160px_minmax(0,1fr)] md:items-start">
          <ImagePlaceholder
            description="Headshot of Aivar Kuusk, founder of Kuusk Events — friendly, professional, against neutral background"
            className="aspect-square w-40 rounded-full"
            showTag={false}
          />
          <div>
            <blockquote
              className="font-medium leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              <span className="text-[color:var(--color-brand-accent)]">"</span>
              {text(locale, aivar.quote)}
              <span className="text-[color:var(--color-brand-accent)]">"</span>
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              — {aivar.name}
              {aivar.company ? ` · ${aivar.company}` : ""} ·{" "}
              {text(locale, aivar.role)}
            </figcaption>
          </div>
        </figure>
      </section>

      {/* Theme gallery */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
              {copy.themesEyebrow}
            </p>
            <h2
              className="font-medium leading-tight tracking-tight"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {copy.themesTitle}
            </h2>
          </div>
          <p
            className="self-end max-w-xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {copy.themesBody}
          </p>
        </div>
        <ThemeGallery />
      </section>

      {/* Selected events */}
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
        <p className="mt-10 max-w-2xl text-sm text-[color:var(--color-text-secondary)]">
          <Link
            href="/tood"
            className="text-[color:var(--color-brand-accent)] underline-offset-4 hover:underline"
          >
            {copy.moreWork}
          </Link>
        </p>
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
