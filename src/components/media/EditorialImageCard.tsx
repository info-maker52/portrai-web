import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  text,
  type LocalizedText,
  type SiteLocale,
} from "@/lib/site-content";

export type EditorialImageAsset = {
  alt: LocalizedText;
  badge?: LocalizedText;
  mode?: "cover" | "contain";
  objectPosition?: string;
  src: string;
};

type EditorialImageCardProps = {
  asset: EditorialImageAsset;
  className?: string;
  imageClassName?: string;
  locale: SiteLocale;
  overlayClassName?: string;
  priority?: boolean;
  sizes: string;
};

export function EditorialImageCard({
  asset,
  className,
  imageClassName,
  locale,
  overlayClassName,
  priority,
  sizes,
}: EditorialImageCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]",
        className,
      )}
    >
      <Image
        alt={text(locale, asset.alt)}
        className={cn(
          asset.mode === "contain" ? "object-contain p-6 md:p-8" : "object-cover",
          imageClassName,
        )}
        fill
        priority={priority}
        sizes={sizes}
        src={asset.src}
        style={asset.objectPosition ? { objectPosition: asset.objectPosition } : undefined}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.72)] via-[rgba(2,9,30,0.16)] to-transparent",
          overlayClassName,
        )}
      />
      {asset.badge ? (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/18 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
          {text(locale, asset.badge)}
        </span>
      ) : null}
    </div>
  );
}
