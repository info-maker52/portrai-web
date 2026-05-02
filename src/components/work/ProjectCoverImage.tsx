import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getProjectCoverMedia } from "@/lib/project-media";
import {
  text,
  type PlaceholderProject,
  type SiteLocale,
} from "@/lib/site-content";

type ProjectCoverImageProps = {
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  locale: SiteLocale;
  overlayClassName?: string;
  priority?: boolean;
  project: PlaceholderProject;
  sizes: string;
};

export function ProjectCoverImage({
  children,
  className,
  imageClassName,
  locale,
  overlayClassName,
  priority,
  project,
  sizes,
}: ProjectCoverImageProps) {
  const cover = getProjectCoverMedia(project.slug);
  const isAbstract = cover.kind === "abstract";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[color:var(--color-surface-base)]",
        className,
      )}
    >
      {isAbstract ? (
        <>
          <span className="sr-only">{text(locale, cover.alt)}</span>
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#efe2d6_0%,#f8f2ea_34%,#d8e3ef_68%,#b8c7d8_100%)]" />
            <div className="absolute inset-x-[10%] top-0 h-full skew-x-[-10deg] bg-[linear-gradient(180deg,rgba(175,53,57,0.12),rgba(175,53,57,0))]" />
            <div className="absolute inset-y-0 left-[16%] w-[18%] border-x border-white/35 bg-white/16 backdrop-blur-[1px]" />
            <div className="absolute inset-y-0 right-[18%] w-[14%] border-x border-white/26 bg-[rgba(31,72,120,0.12)]" />
            <div className="absolute bottom-[10%] left-[8%] h-28 w-28 rounded-full bg-[rgba(175,53,57,0.18)] blur-2xl" />
            <div className="absolute right-[12%] top-[14%] h-40 w-40 rounded-full bg-[rgba(58,108,158,0.18)] blur-3xl" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_90px)] opacity-40" />
          </div>
        </>
      ) : (
        <Image
          alt={text(locale, cover.alt)}
          className={cn(
            "transition-transform duration-700 ease-out",
            cover.mode === "contain" ? "object-contain p-6 md:p-8" : "object-cover",
            imageClassName,
          )}
          fill
          priority={priority}
          sizes={sizes}
          src={cover.src ?? ""}
          style={cover.objectPosition ? { objectPosition: cover.objectPosition } : undefined}
        />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.92)] via-[rgba(2,9,30,0.18)] to-[rgba(2,9,30,0.02)]",
          overlayClassName,
        )}
      />
      {children}
    </div>
  );
}
