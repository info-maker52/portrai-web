"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./cursorRevealShader";

type CursorRevealHeroProps = {
  /** Optional URL of the "before" portrait image. Falls back to procedural. */
  baseTexture?: string;
  /** Optional URL of the "after / AI styled" portrait image. */
  revealTexture?: string;
  className?: string;
};

/**
 * The hero centerpiece — Direction B's signature.
 * A WebGL shader where the cursor reveals an AI-styled version of a portrait.
 *
 * - Uses placeholder procedural textures until real images are provided.
 * - Falls back to a static (procedural) frame on touch / reduced-motion users.
 * - Mounts only after intersection — defers shader compile until visible to
 *   protect LCP.
 */
export function CursorRevealHero({
  baseTexture,
  revealTexture,
  className,
}: CursorRevealHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  // Defer mounting Three.js until the hero is visible — keeps initial JS
  // execution off the critical path for SEO / LCP.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // keep static fallback for reduced-motion users

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-cursor="reveal"
      className={
        "relative h-full w-full overflow-hidden rounded-md bg-[color:var(--color-surface-raised)] " +
        (className ?? "")
      }
      style={{
        // Provide an immediate visual fallback (gradient) until shader mounts.
        backgroundImage:
          "radial-gradient(circle at 30% 40%, rgba(121, 72, 255, 0.4), transparent 60%), radial-gradient(circle at 70% 60%, rgba(255, 162, 255, 0.3), transparent 60%)",
      }}
    >
      {shouldRender && (
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          style={{ width: "100%", height: "100%" }}
        >
          <RevealMesh
            baseTexture={baseTexture}
            revealTexture={revealTexture}
          />
        </Canvas>
      )}
    </div>
  );
}

function RevealMesh({
  baseTexture,
  revealTexture,
}: {
  baseTexture?: string;
  revealTexture?: string;
}) {
  const { size, gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Mouse positions in UV space (0..1, with y flipped to match shader).
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmoothed = useRef(new THREE.Vector2(0.5, 0.5));

  // Load optional textures.
  const textures = useMemo(() => {
    if (!baseTexture || !revealTexture) return null;
    const loader = new THREE.TextureLoader();
    return {
      base: loader.load(baseTexture),
      reveal: loader.load(revealTexture),
    };
  }, [baseTexture, revealTexture]);

  // Aspect correction — keeps the reveal a circle in any canvas shape.
  const aspect = useMemo(() => {
    const ratio = size.width / size.height;
    return ratio >= 1
      ? new THREE.Vector2(ratio, 1)
      : new THREE.Vector2(1, 1 / ratio);
  }, [size]);

  // Wire mouse input to shader uniforms.
  useEffect(() => {
    const canvas = gl.domElement;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseTarget.current.set(x, y);
    };

    canvas.addEventListener("pointermove", onMove);
    return () => canvas.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state, delta) => {
    if (!matRef.current) return;

    // Smooth the mouse — feels more "liquid" than tight tracking.
    mouseSmoothed.current.lerp(mouseTarget.current, Math.min(1, delta * 6));

    matRef.current.uniforms.uMouse.value = mouseTarget.current;
    matRef.current.uniforms.uMouseSmoothed.value = mouseSmoothed.current;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uAspect.value = aspect;
  });

  return (
    <mesh ref={meshRef} scale={[size.width, size.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTextureBase: { value: textures?.base ?? null },
          uTextureReveal: { value: textures?.reveal ?? null },
          uHasTextures: { value: !!textures },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseSmoothed: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uAspect: { value: aspect },
        }}
      />
    </mesh>
  );
}
