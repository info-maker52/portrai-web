"use client";

import { motion } from "motion/react";

type Item = {
  client: string;
  category: string;
};

const ITEMS: Item[] = [
  { client: "Postimees", category: "Festival" },
  { client: "Von Fock", category: "Brand activation" },
  { client: "MELT", category: "Innovation forum" },
  { client: "Project [04]", category: "Wedding" },
  { client: "Project [05]", category: "Trade show" },
  { client: "Project [06]", category: "Corporate" },
  { client: "Project [07]", category: "Wedding" },
  { client: "Project [08]", category: "Festival" },
];

/**
 * Infinite horizontal marquee. Pauses on hover.
 * Used on the home page showcase section.
 */
export function ShowcaseMarquee() {
  // Duplicate the list so the second copy lines up seamlessly when the first
  // exits viewport.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="group relative overflow-hidden">
      <motion.div
        className="flex gap-6 px-6 md:px-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
        style={{ width: "max-content" }}
      >
        {loop.map((item, i) => (
          <Tile key={i} item={item} />
        ))}
      </motion.div>
      {/* Side fades to imply continuous loop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-surface-base)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-surface-base)] to-transparent" />
    </div>
  );
}

function Tile({ item }: { item: Item }) {
  return (
    <div
      data-cursor="hover"
      className="group/tile flex aspect-[3/4] w-[280px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-md border border-dashed border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-raised)] p-6 transition-all duration-300 hover:border-[color:var(--color-brand-primary)]/50 hover:shadow-[var(--glow-soft)] md:w-[320px]"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
        {item.category}
      </p>
      <p
        className="font-medium leading-tight"
        style={{ fontSize: "var(--text-headline)" }}
      >
        {item.client}
      </p>
    </div>
  );
}
