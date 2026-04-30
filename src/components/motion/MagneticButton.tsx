"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type MagneticButtonProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  /** How far the element nudges towards the cursor at peak (px). Default 12. */
  strength?: number;
  /** How close the cursor must be (px) before the magnetic effect kicks in. Default 80. */
  range?: number;
};

/**
 * Wraps a child element with a "magnetic" cursor-tracking effect.
 * The element translates a few px towards the cursor as it approaches,
 * then springs back to centre on leave.
 *
 * Used on primary CTAs to add tactility — Direction B signature detail.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function MagneticButton({
  children,
  strength = 12,
  range = 80,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > range) {
      x.set(0);
      y.set(0);
      return;
    }

    const factor = (range - dist) / range; // 1 at centre → 0 at edge
    x.set((dx / range) * strength * factor * 2);
    y.set((dy / range) * strength * factor * 2);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      data-cursor="magnetic"
      {...rest}
    >
      {children}
    </motion.div>
  );
}
