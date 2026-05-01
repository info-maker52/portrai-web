"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  compositeFragmentShader,
  screenVertexShader,
  trailFragmentShader,
} from "./cursorRevealShader";

type CursorRevealHeroProps = {
  /** "Before" portrait (optional). Falls back to procedural if missing. */
  baseTexture?: string;
  /** "After / AI styled" portrait (optional). */
  revealTexture?: string;
  /** Show the bottom-left "MOVE" hint chip + frame chrome. Default true. */
  showChrome?: boolean;
  className?: string;
};

/**
 * Cursor-reveal hero — Lorenzo template style, properly implemented.
 *
 * Architecture: raw Three.js (no R3F overhead). Two ping-pong render
 * targets accumulate a trail mask each frame; a composite pass blends
 * base → reveal using the trail and adds liquid displacement near the
 * cursor.
 *
 * - Lazy-mounts on intersection to protect LCP.
 * - Disabled on touch devices and prefers-reduced-motion (static fallback).
 * - Cleans up everything on unmount.
 *
 * If `baseTexture` / `revealTexture` aren't provided the shader uses
 * procedural placeholders (greyscale noise + brand gradient) so the
 * effect ships before real photos arrive.
 */
export function CursorRevealHero({
  baseTexture,
  revealTexture,
  showChrome = true,
  className,
}: CursorRevealHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  // Defer Three.js until the wrapper is visible AND motion is allowed.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return;

    if (!("IntersectionObserver" in window)) {
      setShouldMount(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldMount) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    /* ---------- renderer ---------- */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    /* ---------- ping-pong render targets ---------- */
    const rtOptions: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let rtA = new THREE.WebGLRenderTarget(2, 2, rtOptions);
    let rtB = new THREE.WebGLRenderTarget(2, 2, rtOptions);

    /* ---------- shared geometry + camera ---------- */
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
    const geometry = new THREE.PlaneGeometry(1, 1);

    /* ---------- trail accumulation pass ---------- */
    const trailMaterial = new THREE.ShaderMaterial({
      vertexShader: screenVertexShader,
      fragmentShader: trailFragmentShader,
      uniforms: {
        uPrev: { value: null },
        uMouseSmoothed: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseActive: { value: 0 },
        uAspect: { value: new THREE.Vector2(1, 1) },
        uDecay: { value: 0.987 },
        uSplatRadius: { value: 0.075 },
        uSplatStrength: { value: 0.4 },
      },
    });
    const trailScene = new THREE.Scene();
    trailScene.add(new THREE.Mesh(geometry, trailMaterial));

    /* ---------- composite pass ---------- */
    const loader = new THREE.TextureLoader();
    const onTex = (t: THREE.Texture) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
    };
    const baseTex = baseTexture
      ? loader.load(baseTexture, onTex)
      : null;
    const revealTex = revealTexture
      ? loader.load(revealTexture, onTex)
      : null;
    if (baseTex) onTex(baseTex);
    if (revealTex) onTex(revealTex);

    const compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: screenVertexShader,
      fragmentShader: compositeFragmentShader,
      uniforms: {
        uTrail: { value: null },
        uTextureBase: { value: baseTex },
        uTextureReveal: { value: revealTex },
        uHasTextures: { value: !!(baseTex && revealTex) },
        uMouseSmoothed: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseActive: { value: 0 },
        uTime: { value: 0 },
        uAspect: { value: new THREE.Vector2(1, 1) },
      },
    });
    const compositeScene = new THREE.Scene();
    compositeScene.add(new THREE.Mesh(geometry, compositeMaterial));

    /* ---------- pointer state ---------- */
    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const mouseSmoothed = new THREE.Vector2(0.5, 0.5);
    let mouseActive = 0;
    let mouseActiveTarget = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseTarget.set(
        Math.max(0, Math.min(1, x)),
        Math.max(0, Math.min(1, y)),
      );
      mouseActiveTarget = 1;
    };
    const onLeave = () => {
      mouseActiveTarget = 0;
    };
    wrapper.addEventListener("pointerenter", onMove);
    wrapper.addEventListener("pointermove", onMove);
    wrapper.addEventListener("pointerleave", onLeave);
    wrapper.addEventListener("pointercancel", onLeave);

    /* ---------- size handling ---------- */
    const setSize = () => {
      const w = Math.max(2, wrapper.clientWidth);
      const h = Math.max(2, wrapper.clientHeight);
      renderer.setSize(w, h, false);
      rtA.setSize(w, h);
      rtB.setSize(w, h);
      const ratio = w / h;
      const aspect =
        ratio >= 1
          ? new THREE.Vector2(ratio, 1)
          : new THREE.Vector2(1, 1 / ratio);
      trailMaterial.uniforms.uAspect.value = aspect;
      compositeMaterial.uniforms.uAspect.value = aspect;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(wrapper);

    /* ---------- animation loop ---------- */
    let useA = true;
    let prevTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      // Smooth pointer + active.
      mouseSmoothed.lerp(mouseTarget, Math.min(1, dt * 8));
      mouseActive += (mouseActiveTarget - mouseActive) * Math.min(1, dt * 6);

      // Trail pass.
      const prevRT = useA ? rtB : rtA;
      const curRT = useA ? rtA : rtB;
      trailMaterial.uniforms.uPrev.value = prevRT.texture;
      trailMaterial.uniforms.uMouseSmoothed.value = mouseSmoothed;
      trailMaterial.uniforms.uMouseActive.value = mouseActive;
      renderer.setRenderTarget(curRT);
      renderer.render(trailScene, camera);

      // Composite pass.
      compositeMaterial.uniforms.uTrail.value = curRT.texture;
      compositeMaterial.uniforms.uMouseSmoothed.value = mouseSmoothed;
      compositeMaterial.uniforms.uMouseActive.value = mouseActive;
      compositeMaterial.uniforms.uTime.value += dt;
      renderer.setRenderTarget(null);
      renderer.render(compositeScene, camera);

      useA = !useA;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrapper.removeEventListener("pointerenter", onMove);
      wrapper.removeEventListener("pointermove", onMove);
      wrapper.removeEventListener("pointerleave", onLeave);
      wrapper.removeEventListener("pointercancel", onLeave);
      rtA.dispose();
      rtB.dispose();
      trailMaterial.dispose();
      compositeMaterial.dispose();
      geometry.dispose();
      baseTex?.dispose();
      revealTex?.dispose();
      renderer.dispose();
    };
  }, [shouldMount, baseTexture, revealTexture]);

  return (
    <div
      ref={wrapperRef}
      data-cursor="reveal"
      className={
        "relative h-full w-full overflow-hidden rounded-md bg-[color:var(--color-surface-raised)] " +
        (className ?? "")
      }
      style={{
        // Always-visible fallback so the area never looks empty before mount
        // or for users with reduced motion / touch.
        backgroundImage:
          "radial-gradient(circle at 30% 40%, rgba(121, 72, 255, 0.45), transparent 60%), radial-gradient(circle at 70% 60%, rgba(255, 162, 255, 0.32), transparent 60%)",
      }}
    >
      {shouldMount && (
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-hidden
        />
      )}
      {showChrome && (
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
          <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-accent)]" />
          Move cursor
        </div>
      )}
    </div>
  );
}
