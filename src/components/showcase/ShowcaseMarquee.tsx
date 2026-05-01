"use client";

import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ProjectCoverImage } from "@/components/work/ProjectCoverImage";
import { projects, text, type SiteLocale } from "@/lib/site-content";

/**
 * Infinite horizontal marquee. Pauses on hover.
 * Used on the home page showcase section.
 */
export function ShowcaseMarquee({ locale }: { locale: SiteLocale }) {
  const loop = [...projects, ...projects];

  return (
    <div className="group relative overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        className="flex gap-6 px-6 md:px-12"
        style={{ width: "max-content" }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {loop.map((project, i) => (
          <Tile key={`${project.slug}-${i}`} locale={locale} project={project} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-surface-base)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-surface-base)] to-transparent" />
    </div>
  );
}

function Tile({
  locale,
  project,
}: {
  locale: SiteLocale;
  project: (typeof projects)[number];
}) {
  return (
    <Link
      data-cursor="hover"
      href={`/tood/${project.slug}`}
      className="group/tile block w-[280px] flex-shrink-0 rounded-[26px] border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/50 hover:shadow-[var(--glow-soft)] md:w-[320px]"
    >
      <ProjectCoverImage
        className="aspect-[4/5] rounded-[26px]"
        imageClassName="group-hover/tile:scale-[1.04]"
        locale={locale}
        overlayClassName="bg-gradient-to-t from-[rgba(2,9,30,0.96)] via-[rgba(2,9,30,0.28)] to-transparent"
        project={project}
        sizes="(max-width: 768px) 280px, 320px"
      >
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/16 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/74 backdrop-blur-sm">
              {project.countryCode} - {project.year}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-brand-accent)]">
              {project.city}
            </span>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
              {text(locale, project.service)}
            </p>
            <div className="space-y-2">
              <p
                className="font-medium leading-tight text-white"
                style={{ fontSize: "var(--text-headline)" }}
              >
                {project.client}
              </p>
              <p className="max-w-[22ch] text-sm leading-6 text-white/78">
                {text(locale, project.event)}
              </p>
            </div>
          </div>
        </div>
      </ProjectCoverImage>
    </Link>
  );
}
