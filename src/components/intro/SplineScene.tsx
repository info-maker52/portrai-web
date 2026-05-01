"use client";

import { Suspense, lazy, useState } from "react";

/**
 * Spline scene wrapper for the intro screen.
 *
 * Loads a `.splinecode` scene URL from prod.spline.design via
 * @splinetool/react-spline. Spline handles its own WebGL rendering,
 * cursor parallax, and animations — that's the whole point of using
 * it instead of hand-coding Three.js.
 *
 * - Lazy-loaded — Spline runtime is ~600KB, deferred until visible
 * - Fades in on load (no flash of empty canvas)
 * - On load failure or while loading, the parent's gradient backdrop
 *   shows through so the screen never looks broken
 *
 * Set `NEXT_PUBLIC_SPLINE_SCENE_URL` in `.env.local` (or Vercel env)
 * to point at any scene from spline.design — the URL ends in
 * `.splinecode`. See `.env.example` for instructions.
 */

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  sceneUrl: string;
  className?: string;
  onLoad?: () => void;
};

export function SplineScene({
  sceneUrl,
  className,
  onLoad,
}: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={"relative h-full w-full " + (className ?? "")}
      data-cursor="reveal"
    >
      <Suspense fallback={null}>
        {!errored && (
          <Spline
            scene={sceneUrl}
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
            onError={() => setErrored(true)}
            style={{
              width: "100%",
              height: "100%",
              opacity: loaded ? 1 : 0,
              transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        )}
      </Suspense>

      {/* Subtle "loading" indicator that disappears once the scene is in. */}
      {!loaded && !errored && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            ● loading scene
          </span>
        </div>
      )}
    </div>
  );
}
