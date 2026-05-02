import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
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
    workEyebrow: "(06) Recent events",
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
    workEyebrow: "(06) Hiljutised üritused",
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

    ctaTitle: "Teeme sinu üritusest selle, millest räägitakse.",
    ctaBody: "Räägi meile kuupäev ja meeleolu. Saadame pakkumise 24 tunni jooksul.",
    ctaButton: "Broneeri PortrAI",
  },
} as const;

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

  return (
    <PageShell>
      {/* Hero */}
      <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
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
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="text-2xl text-[color:var(--color-brand-accent)]">
                {d.emoji}
              </p>
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {d.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Aivar Kuusk pull quote — full bleed */}
      <section className="border-t border-[color:var(--color-stroke-subtle)] bg-gradient-to-b from-[color:var(--color-surface-raised)] to-transparent px-6 py-32 md:px-12">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          {copy.quoteEyebrow}
        </p>
        <figure className="mx-auto max-w-5xl">
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
        </figure>
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
          {copy.processSteps.map((s) => (
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
