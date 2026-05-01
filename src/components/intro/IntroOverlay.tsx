"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { IntroScene } from "@/components/intro/IntroScene";

const STORAGE_KEY = "portrai-intro-seen";
const SHOW_AGAIN_AFTER_MS = 12 * 60 * 60 * 1000;

const OVERLAY_COPY = {
  en: {
    buttonLabel: "Enter site",
    descriptor: "Interactive portrait engine, Tallinn",
    hint: "Move the scene once you enter",
    menuLabel: "Entry sequence",
  },
  et: {
    buttonLabel: "Sisene",
    descriptor: "Interaktiivne portreemootor, Tallinn",
    hint: "Liiguta stseeni parast sisenemist",
    menuLabel: "Sissejuhatav kiht",
  },
} as const;

export function IntroOverlay() {
  const tIntro = useTranslations("intro");
  const locale = (useLocale() as "et" | "en") ?? "en";
  const copy = OVERLAY_COPY[locale];
  const [show, setShow] = useState<null | boolean>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dismissedRef = useRef(false);
  const letters = "PORTRAI".split("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const search = new URLSearchParams(window.location.search);
    if (search.get("skip-intro") === "1") {
      setShow(false);
      return;
    }

    const seenAt = window.localStorage.getItem(STORAGE_KEY);
    if (seenAt) {
      const ts = Number.parseInt(seenAt, 10);
      if (Number.isFinite(ts) && Date.now() - ts < SHOW_AGAIN_AFTER_MS) {
        setShow(false);
        return;
      }
    }

    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (show === false) {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  function dismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }

    setShow(false);
  }

  if (show === null) return null;

  const fastFade = reducedMotion;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-label={copy.menuLabel}
          className="fixed inset-0 z-[200] overflow-hidden bg-[color:var(--color-surface-base)]"
          initial={{ opacity: 1 }}
          exit={fastFade ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
          transition={{
            duration: fastFade ? 0.15 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="absolute inset-0">
            <IntroScene className="h-full !rounded-none !border-0 !shadow-none" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.0) 22%, rgba(255,255,255,0.04) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundPosition: "center center",
              backgroundSize: "clamp(32px, 3vw, 54px) clamp(32px, 3vw, 54px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] top-[14%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          <motion.p
            className="pointer-events-none absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.22em] text-white/45 md:left-12 md:top-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: fastFade ? 0 : 0.5, duration: 0.35 }}
          >
            (00) - {tIntro("loading")}
          </motion.p>

          <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 md:flex md:flex-col md:gap-1">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="font-mono text-[clamp(1.1rem,2vw,1.75rem)] uppercase tracking-[0.35em] text-white/65"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: fastFade ? 0 : 0.15 + index * 0.05,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <div className="pointer-events-none flex h-full flex-col items-center justify-center">
            <motion.div
              className="relative flex max-w-4xl flex-col items-center gap-4 px-6 text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: fastFade ? 0 : 0.35,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.h1
                className="font-mono uppercase text-[clamp(2.5rem,8vw,6rem)] leading-none text-white"
                initial={
                  fastFade
                    ? { opacity: 1, letterSpacing: "0.22em" }
                    : { opacity: 0, letterSpacing: "0.02em" }
                }
                animate={{ opacity: 1, letterSpacing: "0.22em" }}
                transition={{
                  duration: fastFade ? 0.15 : 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                PortrAI
              </motion.h1>

              <motion.p
                className="max-w-xl text-balance text-sm uppercase tracking-[0.28em] text-white/55 md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: fastFade ? 0 : 0.8,
                  duration: 0.4,
                }}
              >
                {copy.descriptor}
              </motion.p>
            </motion.div>

            <motion.div
              className="pointer-events-auto absolute bottom-12 flex flex-col items-center gap-5 md:bottom-14"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: fastFade ? 0 : 1.2,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={dismiss}
                  className="group flex items-center justify-center gap-3 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)]"
                >
                  <span className="block h-2 w-2 rounded-full bg-[color:var(--color-brand-accent)] transition-transform group-hover:scale-125" />
                  {copy.buttonLabel} {"->"}
                </button>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                * {copy.hint}
              </p>
            </motion.div>

            <motion.p
              className="pointer-events-none absolute bottom-6 right-6 font-mono text-xs uppercase tracking-[0.22em] text-white/40 md:bottom-10 md:right-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: fastFade ? 0 : 1.25, duration: 0.35 }}
            >
              live
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
