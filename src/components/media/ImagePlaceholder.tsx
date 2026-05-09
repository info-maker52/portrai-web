import Image from "next/image";
import { cn } from "@/lib/cn";

type ImagePlaceholderProps = {
  /** What image should eventually go here. Shown as overlay text. */
  description: string;
  /** Optional aspect class (e.g. "aspect-[4/5]"). Defaults to no aspect. */
  className?: string;
  /** Visual style. Default = brand gradient with subtle grid overlay. */
  variant?: "brand" | "dark" | "outline";
  /** Show the "PLACEHOLDER" tag in the corner. Default true. */
  showTag?: boolean;
};

type ResolvedPlaceholderImage = {
  badge?: string;
  initials?: string;
  kind?: "avatar" | "image";
  objectPosition?: string;
  src: string;
};

function resolvePlaceholderImage(
  description: string,
): ResolvedPlaceholderImage | null {
  if (description.includes("Hero photo: PortrAI fotopeegel")) {
    return {
      badge: "Print + digital",
      src: "/images/site/portrait-detail.png",
    };
  }

  if (description.includes("Detail shot illustrating: Elegant aesthetic")) {
    return {
      badge: "Elegant output",
      src: "/images/site/portrait-detail.png",
    };
  }

  if (description.includes("Detail shot illustrating: Animated screen prompts")) {
    return {
      badge: "Animated prompts",
      objectPosition: "55% 44%",
      src: "/images/site/interactive-booth.png",
    };
  }

  if (description.includes("Detail shot illustrating: Faster per guest")) {
    return {
      badge: "High throughput",
      objectPosition: "50% 52%",
      src: "/images/site/event-action.jpg",
    };
  }

  if (description.includes("Detail shot illustrating: Custom branding")) {
    return {
      badge: "Custom branding",
      src: "/images/site/portrait-base.png",
    };
  }

  if (description.includes("Hero photo: PortrAI booth integrated into a brand's trade-show stand")) {
    return {
      badge: "Trade-show ready",
      objectPosition: "50% 52%",
      src: "/images/site/event-action.jpg",
    };
  }

  if (description.includes("Hero photo: PortrAI booth at a recognisable Tallinn venue")) {
    return {
      badge: "Tallinn delivery",
      objectPosition: "50% 52%",
      src: "/images/site/event-action.jpg",
    };
  }

  if (description.includes("Headshot of Aivar Kuusk")) {
    return {
      badge: "Kuusk Events",
      initials: "AK",
      kind: "avatar",
      src: "",
    };
  }

  return null;
}

/**
 * Visible placeholder used wherever the design needs imagery but the
 * real photo / graphic / video isn't available yet.
 *
 * Deliberately marked so it's obvious to anyone reviewing the site that
 * something needs to land here — but styled in brand colours so the page
 * doesn't feel broken to a visitor.
 *
 * Usage:
 *   <ImagePlaceholder
 *     description="Behind-the-scenes shot of the booth in action at MELT"
 *     className="aspect-[16/9] rounded-2xl"
 *   />
 */
export function ImagePlaceholder({
  description,
  className,
  variant = "brand",
  showTag = true,
}: ImagePlaceholderProps) {
  const resolvedImage = resolvePlaceholderImage(description);
  const variantClasses = {
    brand:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(121,72,255,0.32),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,162,255,0.22),transparent_60%),linear-gradient(135deg,#0A1232,#02091E)]",
    dark: "bg-[color:var(--color-surface-raised)]",
    outline: "bg-[color:var(--color-surface-base)]",
  };

  if (resolvedImage) {
    if (resolvedImage.kind === "avatar") {
      return (
        <div
          role="img"
          aria-label={description}
          className={cn(
            "relative overflow-hidden border border-[color:var(--color-stroke-subtle)] bg-[radial-gradient(circle_at_30%_30%,rgba(121,72,255,0.36),transparent_55%),linear-gradient(135deg,#0A1232,#02091E)]",
            className,
          )}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/16 bg-black/28 font-mono text-2xl uppercase tracking-[0.18em] text-white">
              {resolvedImage.initials}
            </span>
            {resolvedImage.badge ? (
              <span className="rounded-full border border-white/16 bg-black/28 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                {resolvedImage.badge}
              </span>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative overflow-hidden border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)]",
          className,
        )}
      >
        <Image
          alt={description}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={resolvedImage.src}
          style={
            resolvedImage.objectPosition
              ? { objectPosition: resolvedImage.objectPosition }
              : undefined
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(2,9,30,0.72)] via-[rgba(2,9,30,0.14)] to-transparent" />
        {resolvedImage.badge ? (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/18 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
            {resolvedImage.badge}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={description}
      className={cn(
        "relative overflow-hidden border border-dashed border-[color:var(--color-stroke-medium)]",
        variantClasses[variant],
        className,
      )}
    >
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Centered description */}
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
        {showTag && (
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
            ◇ Image needed
          </span>
        )}
        <p className="max-w-xs text-sm leading-snug text-white/85">
          {description}
        </p>
      </div>
    </div>
  );
}
