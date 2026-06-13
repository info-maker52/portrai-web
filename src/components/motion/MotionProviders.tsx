"use client";

import { Cursor } from "./Cursor";
import { SmoothScroll } from "./SmoothScroll";

/**
 * Single client component that mounts page-level motion primitives.
 * Use once in `app/[locale]/layout.tsx`.
 *
 * The Three.js intro overlay was removed — it blocked mobile LCP and
 * pulled a WebGL dependency into first paint for no conversion benefit.
 */
export function MotionProviders() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
    </>
  );
}
