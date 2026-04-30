"use client";

import { motion, type Variants } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts. */
  delay?: number;
  /** Direction the element travels FROM. */
  from?: "bottom" | "top" | "left" | "right" | "none";
};

const variants: Record<NonNullable<RevealProps["from"]>, Variants> = {
  bottom: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  top: {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * Reveals its children when scrolled into view. Used to give the page
 * a sense of progressive disclosure — Direction B "reveal-based" interaction.
 *
 * Respects prefers-reduced-motion (motion's whileInView already does).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      variants={variants[from]}
    >
      {children}
    </motion.div>
  );
}
