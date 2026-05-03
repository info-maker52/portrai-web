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
  const variantClasses = {
    brand:
      "bg-[radial-gradient(circle_at_30%_30%,rgba(121,72,255,0.32),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,162,255,0.22),transparent_60%),linear-gradient(135deg,#0A1232,#02091E)]",
    dark: "bg-[color:var(--color-surface-raised)]",
    outline: "bg-[color:var(--color-surface-base)]",
  };

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
