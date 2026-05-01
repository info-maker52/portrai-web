"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * 3D parallax world for the intro / enter screen — Unseen.co style.
 *
 * A small constellation of geometric primitives floating in dark space,
 * lit by brand-purple and pink point lights. The camera tilts and offsets
 * with the cursor, creating a deep parallax effect. Shapes drift and
 * rotate gently on their own.
 *
 * Distinct from the CursorRevealHero which is a 2D shader on the home
 * page. This component is purely the immersive entry moment.
 *
 * - Lazy-mounts on intersection (LCP-safe)
 * - Static gradient fallback on touch / reduced-motion
 * - Listens to the WINDOW (not the wrapper) so the scene reacts to the
 *   cursor anywhere on the intro screen
 */
export function IntroScene({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    setShouldMount(true);
  }, []);

  useEffect(() => {
    if (!shouldMount) return;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    /* ---------- renderer ---------- */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x02091e, 1);

    /* ---------- scene + camera ---------- */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x02091e, 7, 22);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    /* ---------- lighting ---------- */
    scene.add(new THREE.AmbientLight(0x231541, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.45);
    keyLight.position.set(2, 4, 6);
    scene.add(keyLight);

    const purplePoint = new THREE.PointLight(0x7948ff, 2.4, 18, 1.6);
    purplePoint.position.set(-4, 2, 3);
    scene.add(purplePoint);

    const pinkPoint = new THREE.PointLight(0xffa2ff, 1.6, 16, 1.6);
    pinkPoint.position.set(4.5, -1, 2.5);
    scene.add(pinkPoint);

    const accentPoint = new THREE.PointLight(0x8764ff, 1.4, 18, 1.4);
    accentPoint.position.set(0, 3, -3);
    scene.add(accentPoint);

    /* ---------- shapes ---------- */
    const animatedShapes: Array<{
      mesh: THREE.Mesh;
      rotSpeed: THREE.Vector3;
      floatPhase: number;
      floatAmp: number;
      basePos: THREE.Vector3;
    }> = [];

    const addShape = (
      mesh: THREE.Mesh,
      basePos: [number, number, number],
      rotSpeed: [number, number, number] = [0.05, 0.08, 0.03],
      floatAmp = 0.15,
    ) => {
      mesh.position.set(...basePos);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      scene.add(mesh);
      animatedShapes.push({
        mesh,
        rotSpeed: new THREE.Vector3(...rotSpeed),
        floatPhase: Math.random() * Math.PI * 2,
        floatAmp,
        basePos: new THREE.Vector3(...basePos),
      });
    };

    // Hero icosahedron — the dominant centerpiece
    addShape(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.6, 1),
        new THREE.MeshStandardMaterial({
          color: 0x141c44,
          emissive: 0x4a2cc9,
          emissiveIntensity: 0.5,
          roughness: 0.18,
          metalness: 0.85,
        }),
      ),
      [-3.2, 0.4, -1.5],
      [0.04, 0.06, 0.02],
      0.18,
    );

    // Bright pink sphere
    addShape(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.55, 0),
        new THREE.MeshStandardMaterial({
          color: 0xffa2ff,
          emissive: 0xffa2ff,
          emissiveIntensity: 0.95,
          roughness: 0.4,
          metalness: 0.1,
        }),
      ),
      [3.4, 1.6, 0.5],
      [0.1, 0.12, 0.05],
      0.25,
    );

    // Wide torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.13, 16, 80),
      new THREE.MeshStandardMaterial({
        color: 0x141c44,
        emissive: 0xffa2ff,
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.95,
      }),
    );
    torus.rotation.set(0.4, 0.3, 0);
    addShape(torus, [2.2, -1.8, -2.5], [0.03, 0.05, 0.02], 0.12);

    // Floating cubes
    const cubeGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const cubeMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x0a1232,
        emissive: 0x7948ff,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x141c44,
        emissive: 0x8764ff,
        emissiveIntensity: 0.22,
        roughness: 0.25,
        metalness: 0.75,
      }),
    ];
    [
      [-1.4, -2.2, 1.2],
      [4.6, 0.2, -1.8],
      [-4.8, -1.4, 0.6],
      [1.6, 2.4, -2.2],
    ].forEach((pos, i) => {
      addShape(
        new THREE.Mesh(cubeGeo, cubeMaterials[i % cubeMaterials.length]!),
        pos as [number, number, number],
        [0.06 + i * 0.02, 0.08 + i * 0.01, 0.04],
        0.1 + i * 0.04,
      );
    });

    // Small pink dot near top
    addShape(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.22, 0),
        new THREE.MeshStandardMaterial({
          color: 0xffa2ff,
          emissive: 0xffa2ff,
          emissiveIntensity: 1.2,
        }),
      ),
      [-2.0, 2.6, 1.2],
      [0.08, 0.08, 0.08],
      0.3,
    );

    /* ---------- floor grid ---------- */
    const grid = new THREE.GridHelper(40, 40, 0x7948ff, 0x141c44);
    grid.position.y = -3.2;
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.35;
    scene.add(grid);

    /* ---------- particle field ---------- */
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 32 - 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0xffa2ff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ---------- pointer state ---------- */
    const pointerTarget = { x: 0, y: 0 };
    const pointerSmoothed = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove);

    /* ---------- size ---------- */
    const setSize = () => {
      const w = Math.max(2, wrapper.clientWidth);
      const h = Math.max(2, wrapper.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(wrapper);

    /* ---------- animation loop ---------- */
    let prevTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      const t = now / 1000;
      prevTime = now;

      // Smooth pointer.
      const lerp = Math.min(1, dt * 4);
      pointerSmoothed.x += (pointerTarget.x - pointerSmoothed.x) * lerp;
      pointerSmoothed.y += (pointerTarget.y - pointerSmoothed.y) * lerp;

      // Camera parallax — translates AND tilts very slightly.
      camera.position.x = pointerSmoothed.x * 1.8;
      camera.position.y = pointerSmoothed.y * 1.2 + 0.2;
      camera.position.z = 8 - Math.abs(pointerSmoothed.x) * 0.4;
      camera.lookAt(
        pointerSmoothed.x * 0.4,
        pointerSmoothed.y * 0.3,
        0,
      );

      // Shape rotation + float.
      animatedShapes.forEach((s, i) => {
        s.mesh.rotation.x += s.rotSpeed.x * dt * 6;
        s.mesh.rotation.y += s.rotSpeed.y * dt * 6;
        s.mesh.rotation.z += s.rotSpeed.z * dt * 6;
        s.mesh.position.y =
          s.basePos.y + Math.sin(t * 0.6 + s.floatPhase) * s.floatAmp;
        // subtle horizontal drift driven by mouse to reinforce parallax
        s.mesh.position.x =
          s.basePos.x - pointerSmoothed.x * 0.2 * (i % 3 === 0 ? -1 : 1);
      });

      // Particle slow drift.
      particles.rotation.y = t * 0.018;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      cubeGeo.dispose();
      cubeMaterials.forEach((m) => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      (grid.material as THREE.LineBasicMaterial).dispose();
      grid.geometry.dispose();
      renderer.dispose();
    };
  }, [shouldMount]);

  return (
    <div
      ref={wrapperRef}
      className={
        "relative h-full w-full overflow-hidden bg-[color:var(--color-surface-base)] " +
        (className ?? "")
      }
      style={{
        // Always-visible fallback gradient (touch / reduced motion / pre-mount)
        backgroundImage:
          "radial-gradient(circle at 22% 28%, rgba(121, 72, 255, 0.30), transparent 55%), radial-gradient(circle at 76% 72%, rgba(255, 162, 255, 0.20), transparent 55%), radial-gradient(circle at 50% 100%, rgba(135, 100, 255, 0.16), transparent 60%)",
      }}
    >
      {shouldMount && (
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-hidden
        />
      )}
    </div>
  );
}
