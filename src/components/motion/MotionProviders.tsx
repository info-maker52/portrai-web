"use client";

import { Cursor } from "./Cursor";
import { SmoothScroll } from "./SmoothScroll";

/**
 * Single client component that mounts all page-level motion primitives.
 * Use once in `app/[locale]/layout.tsx`.
 */
export function MotionProviders() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
    </>
  );
}
