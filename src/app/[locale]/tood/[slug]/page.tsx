import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import {
  getNextProject,
  getProject,
  projects,
  text,
  type PlaceholderProject,
  type ProjectMetric,
  type SiteLocale,
} from "@/lib/site-content";

const DEFAULT_METRICS: ProjectMetric[] = [
  {
    value: "TBD",
    label: {
      en: "Primary KPI",
      et: "Peamine KPI",
    },
  },
  {
    value: "TBD",
    label: {
      en: "Guest-flow target",
      et: "Külalisteekonna siht",
    },
  },
  {
    value: "TBD",
    label: {
      en: "Follow-up value",
      et: "Järelkasutuse väärtus",
    },
  },
];

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["et", "en"].map((locale) => ({ locale, slug: project.slug })),
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: SiteLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);

  if (!project) {
    return (
      <PageShell>
        <section className="px-6 py-32 md:px-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            404
          </p>
          <h1
            className="mt-4 font-medium"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {locale === "en" ? "Project not found." : "Projekti ei leitud."}
          </h1>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <CaseStudyHero locale={locale} project={project} />
      <Narrative locale={locale} project={project} />
      <Results locale={locale} project={project} />
      <Gallery locale={locale} project={project} />
      <PullQuote locale={locale} project={project} />
      <NextProject locale={locale} slug={project.slug} />
    </PageShell>
  );
}

function CaseStudyHero({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const t = useTranslations("caseStudy");

  return (
    <section className="px-6 pb-12 pt-20 md:px-12 md:pt-32">
      <Link
        href="/tood"
        className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
      >
        ← {t("back")}
      </Link>

      <div className="mb-12 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_360px]">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {project.countryCode} - {project.city} - {project.year}
          </p>
          <h1
            className="font-medium leading-none tracking-tight"
            style={{ fontSize: "var(--text-display-xl)" }}
          >
            {project.client}
          </h1>
          <p
            className="max-w-3xl text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {text(locale, project.summary)}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-6 self-end rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6 font-mono text-xs uppercase tracking-wider md:grid-cols-1">
          <Meta label={t("client")} value={project.client} />
          <Meta label={t("event")} value={text(locale, project.event)} />
          <Meta label={t("year")} value={project.year} />
          <Meta label={t("service")} value={text(locale, project.service)} />
        </dl>
      </div>

      <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-dashed border-[color:var(--color-stroke-medium)] bg-[radial-gradient(circle_at_top,_rgba(121,72,255,0.2),_transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="self-start rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            {text(locale, project.service)}
          </div>
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
              {text(locale, project.galleryLabel)}
            </p>
            <p className="max-w-xl text-sm text-[color:var(--color-text-secondary)]">
              {text(locale, project.brief)}
            </p>
          </div>
        </div>
      </div>

      {project.awards && project.awards.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.awards.map((award) => (
            <p
              key={award.en}
              className="rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]"
            >
              {text(locale, award)}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[color:var(--color-text-tertiary)]">{label}</dt>
      <dd className="text-white">{value}</dd>
    </div>
  );
}

function Narrative({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const headings =
    locale === "en"
      ? { brief: "Brief", challenge: "Challenge", solution: "Solution" }
      : { brief: "Brief", challenge: "Väljakutse", solution: "Lahendus" };

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-6 xl:grid-cols-3">
        <NarrativeCard
          title={headings.brief}
          body={text(locale, project.brief)}
        />
        <NarrativeCard
          title={headings.challenge}
          body={text(locale, project.challenge)}
        />
        <NarrativeCard
          title={headings.solution}
          body={text(locale, project.solution)}
        />
      </div>
    </section>
  );
}

function NarrativeCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
        {title}
      </p>
      <p className="text-[color:var(--color-text-secondary)]">{body}</p>
    </article>
  );
}

function Results({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const metrics = project.metrics.length > 0 ? project.metrics : DEFAULT_METRICS;
  const labels =
    locale === "en"
      ? { metrics: "(01) Results framework", deliverables: "Deliverables", outcomes: "What this page should eventually prove" }
      : { metrics: "(01) Tulemusteraamistik", deliverables: "Deliverables", outcomes: "Mida see leht peaks lõpuks tõestama" };

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <p className="mb-10 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {labels.metrics}
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label.en}
            className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
          >
            <p
              className="mb-2 font-mono leading-none"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              {metric.value}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
              {text(locale, metric.label)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 xl:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {labels.deliverables}
          </p>
          <ul className="space-y-3">
            {project.deliverables.map((item) => (
              <li
                key={item.en}
                className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
              >
                <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
                  ↳
                </span>
                <span>{text(locale, item)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {labels.outcomes}
          </p>
          <ul className="space-y-3">
            {project.outcomes.map((item) => (
              <li
                key={item.en}
                className="flex items-start gap-3 text-[color:var(--color-text-secondary)]"
              >
                <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
                  ↳
                </span>
                <span>{text(locale, item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const title =
    locale === "en"
      ? "(02) Gallery scaffold"
      : "(02) Galerii struktuur";

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-8 flex items-center justify-between gap-6">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {title}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          {text(locale, project.galleryLabel)}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        {[
          { col: "md:col-span-8", aspect: "aspect-[3/2]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-4", aspect: "aspect-[3/4]" },
          { col: "md:col-span-12", aspect: "aspect-[2/1]" },
        ].map((cell, index) => (
          <div
            key={index}
            className={`${cell.col} ${cell.aspect} flex items-end justify-start rounded-2xl border border-dashed border-[color:var(--color-stroke-medium)] bg-[radial-gradient(circle_at_top,_rgba(121,72,255,0.14),_transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-4`}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
              {project.client} - slot {String(index + 1).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullQuote({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  if (!project.quote) return null;

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-32 md:px-12">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
          {locale === "en" ? "(03) Quote slot" : "(03) Tsitaadiplokk"}
        </p>
        <figure className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
            {text(locale, project.quote.status)}
          </p>
          <blockquote
            className="max-w-4xl font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            "{text(locale, project.quote.quote)}"
          </blockquote>
          <figcaption className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
            - {project.quote.name}, {text(locale, project.quote.role)}
            {project.quote.company ? `, ${project.quote.company}` : ""}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function NextProject({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: string;
}) {
  const t = useTranslations("caseStudy");
  const next = getNextProject(slug);

  if (!next) return null;

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <Link
        href={`/tood/${next.slug}`}
        className="group flex items-baseline justify-between gap-6"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] group-hover:text-white">
          {t("next")}
        </span>
        <span
          className="font-medium leading-tight tracking-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          {next.client} →
        </span>
      </Link>
      <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
        {text(locale, next.event)}
      </p>
    </section>
  );
}
