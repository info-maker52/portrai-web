"use client";

import { Cursor } from "./Cursor";
import { SmoothScroll } from "./SmoothScroll";
import { IntroOverlay } from "@/components/intro/IntroOverlay";

/**
 * Single client component that mounts page-level motion primitives
 * plus the intro overlay (shown on first visit / once per 12h).
 * Use once in `app/[locale]/layout.tsx`.
 */
export function MotionProviders() {
  return (
    <>
      <IntroOverlay />
      <SmoothScroll />
      <Cursor />
    </>
  );
}
