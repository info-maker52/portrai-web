"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor — Direction B signature.
 *
 * - Default: 8px white dot tracks tight to mouse
 * - Over interactive elements (a, button, [data-cursor="hover"]): dot
 *   shrinks, an outer ring expands to 40px with brand glow
 * - Hidden on touch devices and when prefers-reduced-motion is set
 *
 * Reads `data-cursor` attribute on the hovered element:
 *   - "hover"    → standard hover state
 *   - "reveal"   → over the hero portrait — bigger ring + brand colour
 *   - "magnetic" → handled by MagneticButton, cursor stays default
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<"none" | "hover" | "reveal">(
    "none",
  );

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner dot — tight tracking
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40, mass: 0.4 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40, mass: 0.4 });

  // Outer ring — looser, lags slightly behind for that satisfying trail
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 30 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reducedMotion) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Walk up the tree to find the nearest interactive ancestor.
      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor]",
      );
      if (!interactive) {
        setHoverState("none");
        return;
      }

      const cursorMode = interactive.dataset.cursor;
      if (cursorMode === "reveal") setHoverState("reveal");
      else setHoverState("hover");
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const isHovering = hoverState !== "none";
  const isReveal = hoverState === "reveal";

  return (
    <>
      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 0 : 1,
          transition: "opacity 200ms",
        }}
      />
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          height: isReveal ? 80 : isHovering ? 40 : 32,
          width: isReveal ? 80 : isHovering ? 40 : 32,
          opacity: isHovering ? 1 : 0.4,
          transition:
            "height 250ms cubic-bezier(0.16, 1, 0.3, 1), width 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms",
        }}
      />
    </>
  );
}
