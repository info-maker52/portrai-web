import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import {
  getProjectCoverMedia,
  getProjectGalleryMedia,
  type ProjectGalleryMediaItem,
} from "@/lib/project-media";
import { buildPageMetadata, localizedSitePath } from "@/lib/seo";
import {
  getNextProject,
  getProject,
  projects,
  text,
  type PlaceholderProject,
  type SiteLocale,
} from "@/lib/site-content";

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ["et", "en"].map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: SiteLocale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const galleryImage = getProjectGalleryMedia(project.slug)?.items[0]?.src;
  const coverImage = getProjectCoverMedia(project.slug).src;

  return buildPageMetadata({
    title: `${project.client} | ${text(locale, project.event)} | PortrAI`,
    description: text(locale, project.summary),
    locale,
    ogImage: galleryImage ?? coverImage ?? "/images/site/interactive-booth.png",
    path: localizedSitePath(locale, `/tood/${slug}`),
  });
}

export default async function ProjectPage({
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
      <ProjectHero locale={locale} project={project} />
      <ProjectSnapshot locale={locale} project={project} />
      <ProjectGallery locale={locale} project={project} />
      <NextProject locale={locale} slug={project.slug} />
    </PageShell>
  );
}

function ProjectHero({
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
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] transition-colors hover:text-white"
      >
        {"<-"} {t("back")}
      </Link>

      <div className="mb-10 grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <div className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
            {project.city} - {project.countryCode} - {project.year}
          </p>
          <h1
            className="max-w-5xl font-medium leading-none tracking-tight"
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
          {project.awards && project.awards.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.awards.map((award) => (
                <span
                  key={award.en}
                  className="rounded-full border border-[color:var(--color-brand-primary)]/35 bg-[color:var(--color-brand-primary)]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-brand-accent)]"
                >
                  {text(locale, award)}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 self-end rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5">
          <Fact
            label={locale === "en" ? "Event" : "Uritus"}
            value={text(locale, project.event)}
          />
          <Fact
            label={locale === "en" ? "Service" : "Teenus"}
            value={text(locale, project.service)}
          />
          <Fact
            label={locale === "en" ? "Location" : "Asukoht"}
            value={`${project.city}, ${project.countryCode}`}
          />
          <Fact
            label={locale === "en" ? "Year" : "Aasta"}
            value={project.year}
          />
        </div>
      </div>

      <ProjectCoverImage
        className="aspect-[16/9] rounded-[28px] border border-[color:var(--color-stroke-subtle)]"
        imageClassName="scale-[1.01]"
        locale={locale}
        priority
        project={project}
        sizes="100vw"
      >
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
          <div className="rounded-full border border-white/14 bg-black/28 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/76 backdrop-blur-sm">
            {text(locale, project.service)}
          </div>
          <div className="max-w-xl rounded-2xl border border-white/10 bg-[rgba(2,9,30,0.46)] px-4 py-3 text-right text-xs leading-5 text-white/72 backdrop-blur-sm md:text-sm">
            {text(locale, project.galleryLabel)}
          </div>
        </div>
      </ProjectCoverImage>
    </section>
  );
}

function ProjectSnapshot({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const labels =
    locale === "en"
      ? {
          snapshot: "Overview",
          built: "Included",
          worked: "What it delivered",
          metrics: "Key numbers",
        }
      : {
          snapshot: "Projekti ulevaade",
          built: "Mis selle sisse laks",
          worked: "Miks see toimis",
          metrics: "Valitud signaalid",
        };

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_420px]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]">
              {labels.snapshot}
            </p>
            <p
              className="max-w-4xl font-medium leading-tight text-white"
              style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}
            >
              {text(locale, project.brief)}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-[color:var(--color-text-secondary)] md:text-base">
              {text(locale, project.solution)}
            </p>
          </div>

          {project.metrics.length > 0 ? (
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
                {labels.metrics}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <article
                    key={metric.label.en}
                    className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5"
                  >
                    <p
                      className="font-mono leading-none text-white"
                      style={{ fontSize: "var(--text-display-sm)" }}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text-secondary)]">
                      {text(locale, metric.label)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4">
          <DetailCard
            title={labels.built}
            items={project.deliverables.map((item) => text(locale, item))}
          />
          <DetailCard
            title={labels.worked}
            items={project.outcomes.map((item) => text(locale, item))}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectGallery({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  const galleryMedia = getProjectGalleryMedia(project.slug);
  const labels =
    locale === "en"
      ? {
          visuals: "Gallery",
          context: "At a glance",
          focus: "Concept and setup",
          notes: "Highlights",
        }
      : {
          visuals: "Valitud visuaalid",
          context: "Kontekst",
          focus: "Loovsuund",
          notes: "Projektimarkmed",
        };

  const contextItems = [
    text(locale, project.event),
    `${project.city}, ${project.countryCode}`,
    project.year,
  ];
  const focusItems = [text(locale, project.service), text(locale, project.solution)];
  const noteItems =
    project.awards && project.awards.length > 0
      ? project.awards.map((award) => text(locale, award))
      : [text(locale, project.galleryLabel)];

  return (
    <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
      <div className="mb-8 space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)]">
          {labels.visuals}
        </p>
        <p className="max-w-3xl text-sm leading-7 text-[color:var(--color-text-secondary)] md:text-base">
          {galleryMedia
            ? text(locale, galleryMedia.description)
            : text(locale, project.summary)}
        </p>
      </div>

      {galleryMedia ? (
        <div className="grid gap-4 lg:grid-cols-12">
          <GalleryTile
            className="aspect-[4/5] rounded-[24px] border border-[color:var(--color-stroke-subtle)] lg:col-span-5"
            item={galleryMedia.items[0]}
            locale={locale}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {galleryMedia.items.slice(1).map((item) => (
              <GalleryTile
                key={item.src}
                className="aspect-[4/3] rounded-[24px] border border-[color:var(--color-stroke-subtle)]"
                item={item}
                locale={locale}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
              />
            ))}
          </div>
        </div>
      ) : (
        <ProjectCoverImage
          className="aspect-[16/9] rounded-[24px] border border-[color:var(--color-stroke-subtle)]"
          imageClassName="scale-[1.02]"
          locale={locale}
          project={project}
          sizes="100vw"
        />
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <DetailCard title={labels.context} items={contextItems} />
        <DetailCard title={labels.focus} items={focusItems} />
        <DetailCard title={labels.notes} items={noteItems} />
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[color:var(--color-stroke-subtle)] pb-4 last:border-b-0 last:pb-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-white">{value}</p>
    </div>
  );
}

function DetailCard({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  return (
    <article className="rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-[color:var(--color-text-secondary)]"
          >
            <span className="mt-1 font-mono text-xs text-[color:var(--color-brand-accent)]">
              {"->"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function GalleryTile({
  className,
  item,
  locale,
  priority,
  sizes,
}: {
  className?: string;
  item: ProjectGalleryMediaItem;
  locale: SiteLocale;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[color:var(--color-surface-base)] ${className ?? ""}`}
    >
      <Image
        alt={text(locale, item.alt)}
        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        fill
        priority={priority}
        sizes={sizes}
        src={item.src}
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.1)] via-transparent to-transparent" />
    </div>
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
        className="group flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
      >
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] group-hover:text-white">
            {t("next")}
          </span>
          <p
            className="font-medium leading-tight tracking-tight transition-colors group-hover:text-[color:var(--color-brand-accent)]"
            style={{ fontSize: "var(--text-display-md)" }}
          >
            {next.client}
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-[color:var(--color-text-secondary)] md:text-right">
          {text(locale, next.event)}
        </p>
      </Link>
    </section>
  );
}
