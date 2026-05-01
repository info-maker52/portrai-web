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

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[color:var(--color-surface-base)]",
        className,
      )}
    >
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
        src={cover.src}
        style={cover.objectPosition ? { objectPosition: cover.objectPosition } : undefined}
      />
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
