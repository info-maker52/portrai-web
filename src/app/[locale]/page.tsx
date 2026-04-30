import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CursorRevealHero } from "@/components/hero/CursorRevealHero";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ShowcaseMarquee } from "@/components/showcase/ShowcaseMarquee";
import { WorldMap } from "@/components/world/WorldMap";
import {
  faqSeeds,
  featuredProjectSlugs,
  getProject,
  internationalStops,
  partnerNames,
  processSteps,
  testimonialSeeds,
  text,
  type SiteLocale,
} from "@/lib/site-content";

const HOME_COPY: Record<
  SiteLocale,
  {
    sectionTags: {
      hero: string;
      showcase: string;
      awards: string;
      metrics: string;
      partners: string;
      process: string;
      featured: string;
      international: string;
      testimonials: string;
      faq: string;
      cta: string;
    };
    partnerTitle: string;
    partnerSubtitle: string;
    processTitle: string;
    processSubtitle: string;
    featuredTitle: string;
    featuredSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
    metricsIntro: string;
  }
> = {
  en: {
    sectionTags: {
      hero: "(01) AI photo booth",
      showcase: "(02) Motion and image language",
      awards: "(03) Recognition",
      metrics: "(04) Scale",
      partners: "(05) Partner wall",
      process: "(06) Workflow",
      featured: "(07) Case-study structure",
      international: "(08) Reach",
      testimonials: "(09) Proof",
      faq: "(10) Questions",
      cta: "(11) Book",
    },
    partnerTitle: "Selected names first, polished logos later.",
    partnerSubtitle:
      "This wall lets us judge spacing, rhythm, and credibility before final logo files and permissions arrive.",
    processTitle: "The structure now matches the way the work actually unfolds.",
    processSubtitle:
      "We can already shape the narrative flow from first brief to follow-up delivery, even while final copy, logos, and galleries are still being collected.",
    featuredTitle: "Each project type now has a real page shape behind it.",
    featuredSubtitle:
      "These cards are seeded from source notes and local decks so the portfolio architecture can be refined before the final visual assets land.",
    faqTitle: "Questions worth designing for now.",
    faqSubtitle:
      "These are draft-ready FAQ blocks so spacing, accordion rhythm, and scan-ability can be judged before the final wording is approved.",
    metricsIntro:
      "The numbers are still high-level, but the structure around them is now stable enough to support future proof points and campaign-level results.",
  },
  et: {
    sectionTags: {
      hero: "(01) AI fotoboks",
      showcase: "(02) Liikumine ja pildikeel",
      awards: "(03) Tunnustus",
      metrics: "(04) Mastaap",
      partners: "(05) Partnerisein",
      process: "(06) Töövoog",
      featured: "(07) Case-study struktuur",
      international: "(08) Haare",
      testimonials: "(09) Tõestus",
      faq: "(10) Küsimused",
      cta: "(11) Broneeri",
    },
    partnerTitle: "Valitud nimed enne, lihvitud logod hiljem.",
    partnerSubtitle:
      "See sein aitab hinnata spacing'ut, rütmi ja usaldusväärsust enne, kui lõplikud logofailid ja load kohale jõuavad.",
    processTitle: "Struktuur vastab nüüd sellele, kuidas töö päriselt kulgeb.",
    processSubtitle:
      "Saame juba kujundada loo liikumise esimesest briefist kuni järeltegevusteni, isegi kui lõplik copy, logod ja galeriid on veel kogumisel.",
    featuredTitle: "Iga projektitüübi taga on nüüd päris lehestruktuur.",
    featuredSubtitle:
      "Need kaardid on seemendatud allikmaterjalidest ja lokaalsetest deck'idest, et portfoolio arhitektuuri saaks lihvida enne lõplike visuaalide saabumist.",
    faqTitle: "Küsimused, mille jaoks tasub juba praegu disainida.",
    faqSubtitle:
      "Need on draft-valmis FAQ plokid, et hinnata spacing'ut, akordioni rütmi ja skaneeritavust enne lõpliku sõnastuse kinnitamist.",
    metricsIntro:
      "Numbrid on veel kõrgel tasemel, kuid neid ümbritsev struktuur on nüüd piisavalt stabiilne, et sinna hiljem proof point'e ja kampaaniatulemusi lisada.",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: SiteLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageShell>
      <Hero locale={locale} />
      <ShowcaseReel locale={locale} />
      <Awards locale={locale} />
      <Metrics locale={locale} />
      <PartnerWall locale={locale} />
      <Process locale={locale} />
      <FeaturedWork locale={locale} />
      <International locale={locale} />
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
      <CallToAction locale={locale} />
    </PageShell>
  );
}

function Hero({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.hero");
  const tMeta = useTranslations("meta");

  return (
    <section className="relative flex min-h-[80vh] flex-col items-start justify-center gap-8 px-6 py-24 md:min-h-[88vh] md:px-12">
      <SectionTag>{HOME_COPY[locale].sectionTags.hero}</SectionTag>

      <div className="pointer-events-auto absolute right-6 top-1/2 hidden h-[480px] w-[360px] -translate-y-1/2 md:right-12 md:block">
        <CursorRevealHero
          baseTexture="/images/hero/portrait-base.png"
          revealTexture="/images/hero/portrait-reveal.png"
        />
      </div>

      <h1
        className="max-w-4xl font-medium leading-none tracking-tight"
        style={{ fontSize: "var(--text-display-xl)" }}
      >
        {t("headline")}
        <br />
        <span className="bg-gradient-to-r from-[color:var(--color-brand-primary)] via-[color:var(--color-brand-secondary)] to-[color:var(--color-brand-accent)] bg-clip-text text-transparent">
          {t("headlineLine2")}
        </span>
      </h1>

      <p
        className="max-w-xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("leadIn")}
      </p>

      <div className="flex flex-wrap gap-4">
        <MagneticButton>
          <Link
            href="/kontakt"
            className="inline-block rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
          >
            {t("cta")}
          </Link>
        </MagneticButton>
        <MagneticButton strength={8}>
          <Link
            href="/tood"
            className="inline-block rounded-md border border-[color:var(--color-stroke-medium)] bg-transparent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
          >
            {t("ctaSecondary")}
          </Link>
        </MagneticButton>
      </div>

      <p className="mt-8 hidden font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)] md:block">
        {tMeta("tagline")}
      </p>
    </section>
  );
}

function ShowcaseReel({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] py-20">
      <div className="mb-8 flex items-center justify-between px-6 md:px-12">
        <SectionTag>{HOME_COPY[locale].sectionTags.showcase}</SectionTag>
        <Link
          href="/tood"
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 transition-all hover:text-white hover:underline"
        >
          {t("showcase.viewAll")} →
        </Link>
      </div>

      <h2
        className="mb-12 max-w-3xl px-6 font-medium leading-tight tracking-tight md:px-12"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("showcase.title")}
      </h2>

      <ShowcaseMarquee />
    </section>
  );
}

function Awards({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.awards");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.awards}</SectionTag>
      <h2
        className="mb-4 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-12 max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { label: "Booth Mastermind Awards 2025", title: t("best_ai") },
          { label: "Booth Mastermind Awards 2025", title: t("best_newcomer") },
        ].map((award) => (
          <div
            key={award.title}
            className="flex flex-col gap-3 rounded-lg border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8 transition-all hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-soft)]"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
              Award recognition
            </p>
            <p
              className="font-medium leading-tight"
              style={{ fontSize: "var(--text-headline)" }}
            >
              {award.title}
            </p>
            <p className="text-sm text-[color:var(--color-text-tertiary)]">
              {award.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metrics({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.metrics");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.metrics}</SectionTag>
      <p
        className="mb-12 max-w-3xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {HOME_COPY[locale].metricsIntro}
      </p>
      <div className="grid gap-12 md:grid-cols-3">
        {[
          { value: "780K+", label: t("prints") },
          { value: "7", label: t("countries") },
          { value: "200+", label: t("events") },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-2 border-l border-[color:var(--color-brand-primary)] pl-6"
          >
            <p
              className="font-mono font-medium tabular-nums leading-none"
              style={{ fontSize: "var(--text-display-lg)" }}
            >
              {metric.value}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PartnerWall({ locale }: { locale: SiteLocale }) {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.partners}</SectionTag>
      <div className="grid gap-10 md:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {HOME_COPY[locale].partnerTitle}
          </h2>
          <p className="text-[color:var(--color-text-secondary)]">
            {HOME_COPY[locale].partnerSubtitle}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {partnerNames.map((name) => (
            <div
              key={name}
              className="rounded-full border border-[color:var(--color-stroke-medium)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-brand-primary)]/40 hover:text-white"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ locale }: { locale: SiteLocale }) {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.process}</SectionTag>
      <div className="mb-12 max-w-3xl space-y-4">
        <h2
          className="font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {HOME_COPY[locale].processTitle}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {HOME_COPY[locale].processSubtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
          >
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3
              className="mb-4 font-medium leading-tight"
              style={{ fontSize: "var(--text-title)" }}
            >
              {text(locale, step.title)}
            </h3>
            <p className="text-sm leading-7 text-[color:var(--color-text-secondary)]">
              {text(locale, step.body)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork({ locale }: { locale: SiteLocale }) {
  const projects = featuredProjectSlugs
    .map((slug) => getProject(slug))
    .filter(Boolean);

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-12 max-w-3xl space-y-4">
        <SectionTag>{HOME_COPY[locale].sectionTags.featured}</SectionTag>
        <h2
          className="font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          {HOME_COPY[locale].featuredTitle}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {HOME_COPY[locale].featuredSubtitle}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/tood/${project.slug}`}
            className="group flex h-full flex-col gap-5 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-soft)]"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-dashed border-[color:var(--color-stroke-medium)] bg-[radial-gradient(circle_at_top,_rgba(121,72,255,0.18),_transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
              <div className="flex h-full flex-col justify-between p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
                    {project.countryCode} - {project.year}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
                    {project.city}
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                    {text(locale, project.galleryLabel)}
                  </p>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {text(locale, project.summary)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className="font-medium leading-tight tracking-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
                  style={{ fontSize: "var(--text-title)" }}
                >
                  {project.client}
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  {text(locale, project.service)}
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, project.event)}
              </p>
            </div>

            <ul className="space-y-2 border-t border-[color:var(--color-stroke-subtle)] pt-4">
              {project.outcomes.slice(0, 2).map((item) => (
                <li
                  key={item.en}
                  className="flex items-start gap-3 text-sm text-[color:var(--color-text-secondary)]"
                >
                  <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
                    ↳
                  </span>
                  <span>{text(locale, item)}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}

function International({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.international");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.international}</SectionTag>
      <h2
        className="mb-4 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-lg)" }}
      >
        {t("title")}
      </h2>
      <p
        className="mb-12 max-w-2xl text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {t("subtitle")}
      </p>

      <div className="mb-8">
        <WorldMap />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {internationalStops.map((stop) => (
          <div
            key={stop.code}
            className="flex items-start gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-brand-accent)]">
              {stop.code}
            </span>
            <div className="space-y-1">
              <p className="font-medium">{stop.city}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, stop.note)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ locale }: { locale: SiteLocale }) {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.testimonials}</SectionTag>
      <h2
        className="mb-12 max-w-3xl font-medium leading-tight tracking-tight"
        style={{ fontSize: "var(--text-display-md)" }}
      >
        {locale === "en" ? "Proof before polish." : "Tõestus enne viimast lihvi."}
      </h2>

      <div className="grid gap-6 xl:grid-cols-4">
        {testimonialSeeds.map((item) => (
          <figure
            key={item.id}
            className="flex flex-col gap-6 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-brand-accent)]">
              {text(locale, item.status)}
            </p>
            <blockquote
              className="leading-relaxed"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              "{text(locale, item.quote)}"
            </blockquote>
            <figcaption className="mt-auto flex flex-col gap-1 border-t border-[color:var(--color-stroke-subtle)] pt-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {text(locale, item.role)}
              </p>
              {item.company && (
                <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
                  {item.company}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FAQ({ locale }: { locale: SiteLocale }) {
  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-12 max-w-3xl space-y-4">
        <SectionTag>{HOME_COPY[locale].sectionTags.faq}</SectionTag>
        <h2
          className="font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {HOME_COPY[locale].faqTitle}
        </h2>
        <p
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {HOME_COPY[locale].faqSubtitle}
        </p>
      </div>

      <div className="flex flex-col">
        {faqSeeds.map((item) => (
          <details
            key={item.question.en}
            className="group border-b border-[color:var(--color-stroke-subtle)] py-6"
          >
            <summary className="flex cursor-pointer items-baseline justify-between gap-4 font-medium transition-colors hover:text-[color:var(--color-brand-accent)]">
              <span style={{ fontSize: "var(--text-title)" }}>
                {text(locale, item.question)}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-[color:var(--color-text-secondary)]">
              {text(locale, item.answer)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CallToAction({ locale }: { locale: SiteLocale }) {
  const t = useTranslations("home.cta");

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <SectionTag className="mb-6">{HOME_COPY[locale].sectionTags.cta}</SectionTag>
      <div className="flex flex-col items-start gap-8">
        <h2
          className="max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          {t("title")}
        </h2>
        <p
          className="max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {t("subtitle")}
        </p>
        <Link
          href="/kontakt"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-strong)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          {t("button")} →
        </Link>
      </div>
    </section>
  );
}

function SectionTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={
        "font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] " +
        (className ?? "")
      }
    >
      {children}
    </p>
  );
}
