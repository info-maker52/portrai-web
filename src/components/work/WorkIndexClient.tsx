"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import {
  projects,
  text,
  type PlaceholderProject,
  type SiteLocale,
} from "@/lib/site-content";

/**
 * Track filter for /tood — aligns with the two-path IA: ALL · MARKETING · EVENTS.
 *
 * The map below classifies each project. Marketing = lead-gen / brand
 * activation / campaign. Events = engagement-led, fun-event activations.
 * MELT is the only events-side case in the current portfolio; the rest
 * are marketing campaigns (Postimees, Von Fock, Telia, Swedbank, OIXIO).
 */
type Track = "marketing" | "events";

const PROJECT_TRACK: Record<string, Track> = {
  "von-fock": "marketing",
  "laulupidu-postimees": "marketing",
  "telia-rohekusimustik": "marketing",
  "swedbank-unistused": "marketing",
  "oixio-ebs-ai-oppenoustaja": "marketing",
  melt: "events",
};

type FilterKey = "all" | Track;

export function WorkIndexClient({ locale }: { locale: SiteLocale }) {
  const [active, setActive] = useState<FilterKey>("all");

  const labels =
    locale === "en"
      ? { all: "All", marketing: "Marketing", events: "Events" }
      : { all: "Kõik", marketing: "Turundus", events: "Peod" };

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: "all", label: labels.all },
    { key: "marketing", label: labels.marketing },
    { key: "events", label: labels.events },
  ];

  const visibleProjects = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => PROJECT_TRACK[p.slug] === active);
  }, [active]);

  const intro =
    locale === "en"
      ? "A selection of launches, conferences, trade-fair activations, and event installations — built around branded AI portraits."
      : "Valik lansseerimisi, konverentse, messiaktivatsioone ja ürituste installatsioone — kõik ehitatud bränditud AI-portreede ümber.";

  return (
    <>
      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-8 md:px-12">
        <div className="mb-6 max-w-2xl text-[color:var(--color-text-secondary)]">
          {intro}
        </div>

        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const count =
              filter.key === "all"
                ? projects.length
                : projects.filter(
                    (p) => PROJECT_TRACK[p.slug] === filter.key,
                  ).length;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                className={
                  "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-all " +
                  (active === filter.key
                    ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)] text-white"
                    : "border-[color:var(--color-stroke-medium)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-stroke-strong)] hover:text-white")
                }
              >
                {filter.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[color:var(--color-stroke-subtle)] px-6 py-12 md:px-12">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} locale={locale} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: PlaceholderProject;
}) {
  return (
    <Link
      href={`/tood/${project.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/40 hover:shadow-[var(--glow-soft)]"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
          {project.countryCode} - {project.year}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
          {project.city}
        </p>
      </div>

      <ProjectCoverImage
        className="aspect-[4/5] rounded-xl"
        imageClassName="group-hover:scale-[1.04]"
        locale={locale}
        project={project}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      >
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="self-start rounded-full border border-white/16 bg-black/28 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/76 backdrop-blur-sm">
            {text(locale, project.service)}
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-white/62">
              {text(locale, project.galleryLabel)}
            </p>
            <p className="max-w-[24ch] text-sm leading-6 text-white/80">
              {text(locale, project.summary)}
            </p>
          </div>
        </div>
      </ProjectCoverImage>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            className="font-medium leading-tight tracking-tight"
            style={{ fontSize: "var(--text-title)" }}
          >
            {project.client}
          </h2>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-tertiary)]">
            {project.countryCode}
          </p>
        </div>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {text(locale, project.event)}
        </p>
      </div>

      <ul className="mt-auto space-y-2 border-t border-[color:var(--color-stroke-subtle)] pt-4">
        {project.deliverables.slice(0, 2).map((item) => (
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
  );
}
