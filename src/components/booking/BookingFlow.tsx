"use client";

import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  STEP_ORDER,
  useBookingFlow,
  visibleSteps,
  type BookingStep,
} from "./BookingFlowProvider";
import { StepContact } from "./steps/StepContact";
import { StepDate } from "./steps/StepDate";
import { StepEventType } from "./steps/StepEventType";
import { StepGuests } from "./steps/StepGuests";
import { StepLocation } from "./steps/StepLocation";
import { StepMessage } from "./steps/StepMessage";
import { StepReview } from "./steps/StepReview";
import { RESPONSE_PROMISE } from "@/lib/copy";
import type { SiteLocale } from "@/lib/site-content";
import { text } from "@/lib/site-content";
import { useFocusTrap } from "@/lib/useFocusTrap";

/**
 * The booking sheet UI. Mounted once at the locale layout level.
 * Reads isOpen + step state from BookingFlowProvider and renders the
 * sheet conditionally.
 *
 * Right-side panel on desktop (~480px); full-screen on mobile. Step
 * transitions are horizontal slides. Closes on Escape (handled by
 * provider), backdrop click, or close button.
 */

const COPY = {
  en: {
    close: "Close",
    back: "Back",
    next: "Next",
    skip: "Skip",
    successHeadline: "Got it.",
    successBody:
      "We received your brief. Expect a reply with a quote and 2–3 dates we can hold.",
    successClose: "Close",
  },
  et: {
    close: "Sulge",
    back: "Tagasi",
    next: "Edasi",
    skip: "Jäta vahele",
    successHeadline: "Saime kätte.",
    successBody:
      "Sinu brief jõudis kohale. Tuleme tagasi pakkumise ja 2–3 vaba kuupäevaga.",
    successClose: "Sulge",
  },
} as const;

/** Steps where Next should be disabled until a required field is set. */
function isStepValid(step: BookingStep, state: {
  eventType: string;
  name: string;
  email: string;
  consent: boolean;
}): boolean {
  const contactComplete =
    state.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) &&
    state.consent;
  switch (step) {
    case "event-type":
      return state.eventType.length > 0;
    case "contact":
      return contactComplete;
    case "review":
      // Review re-validates everything required (incl. GDPR consent).
      return state.eventType.length > 0 && contactComplete;
    default:
      return true;
  }
}

/** Localized step labels for the screen-reader progress announcement. */
const STEP_LABELS: Record<SiteLocale, Record<BookingStep, string>> = {
  en: {
    "event-type": "Event type",
    date: "Date",
    location: "Location",
    guests: "Guests",
    message: "Details",
    contact: "Contact",
    review: "Review",
  },
  et: {
    "event-type": "Ürituse tüüp",
    date: "Kuupäev",
    location: "Asukoht",
    guests: "Külalised",
    message: "Detailid",
    contact: "Kontakt",
    review: "Ülevaade",
  },
};

/** Optional steps where Skip is shown. */
const SKIPPABLE: ReadonlySet<BookingStep> = new Set([
  "date",
  "location",
  "guests",
  "message",
]);

export function BookingFlow() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const copy = COPY[locale];
  const { isOpen, state, close, goNext, goBack, reset } = useBookingFlow();
  const panelRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => visibleSteps(state.eventType), [state.eventType]);
  const currentIdx = steps.indexOf(state.step);
  const isFirst = currentIdx === 0;
  const isLast = state.step === "review";

  const valid = isStepValid(state.step, state);
  const skippable = SKIPPABLE.has(state.step);

  // Reset on close after a small delay — gives the slide-out animation
  // time to complete before the state visually changes back to step 1.
  const resetOnNextOpenRef = useRef(false);
  useEffect(() => {
    if (!isOpen && state.status === "success") {
      // After a successful submit, reset on next open so the visitor
      // doesn't see their previous brief.
      resetOnNextOpenRef.current = true;
    }
  }, [isOpen, state.status]);

  useEffect(() => {
    if (isOpen && resetOnNextOpenRef.current) {
      resetOnNextOpenRef.current = false;
      reset();
    }
  }, [isOpen, reset]);

  // Focus the panel when opened so screen readers announce it.
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  // Trap Tab focus inside the sheet while open; restore to trigger on close.
  useFocusTrap(panelRef, isOpen);

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  // Render the current step.
  const StepComponent: Record<BookingStep, () => React.ReactElement> = {
    "event-type": StepEventType,
    date: StepDate,
    location: StepLocation,
    guests: StepGuests,
    message: StepMessage,
    contact: StepContact,
    review: StepReview,
  };

  const ActiveStep = StepComponent[state.step];

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={handleClose}
        className={[
          "fixed inset-0 z-[60] bg-[rgba(2,9,30,0.7)] backdrop-blur-sm transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* Sheet panel — full-screen on mobile, right-side panel desktop */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          locale === "en" ? "Book PortrAI" : "Broneeri PortrAI"
        }
        tabIndex={-1}
        className={[
          "fixed inset-0 z-[70] flex flex-col bg-[color:var(--color-surface-base)] outline-none transition-transform duration-[320ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          "md:inset-y-0 md:left-auto md:right-0 md:w-[min(560px,100vw)] md:border-l md:border-[color:var(--color-stroke-subtle)] md:shadow-[-12px_0_60px_-30px_rgba(0,0,0,0.6)]",
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full",
        ].join(" ")}
      >
        {/* Header — progress dots + close */}
        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--color-stroke-subtle)] px-6 py-5 md:px-8">
          <div className="flex items-center gap-1.5" aria-hidden>
            {STEP_ORDER.map((stepName) => {
              const visible = steps.includes(stepName);
              const stepIdx = steps.indexOf(stepName);
              const isPast = visible && stepIdx <= currentIdx;
              const isCurrent = visible && stepName === state.step;
              if (!visible) return null;
              return (
                <span
                  key={stepName}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    isCurrent
                      ? "w-6 bg-[color:var(--color-brand-accent)]"
                      : isPast
                        ? "w-1.5 bg-[color:var(--color-brand-primary)]"
                        : "w-1.5 bg-[color:var(--color-stroke-medium)]",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label={copy.close}
            className="rounded-full border border-[color:var(--color-stroke-medium)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
          >
            {copy.close}
          </button>

          {/* Screen-reader-only progress announcement. */}
          {state.status !== "success" && currentIdx >= 0 && (
            <p className="sr-only" aria-live="polite">
              {locale === "en"
                ? `Step ${currentIdx + 1} of ${steps.length}: ${STEP_LABELS[locale][state.step]}`
                : `Samm ${currentIdx + 1} / ${steps.length}: ${STEP_LABELS[locale][state.step]}`}
            </p>
          )}
        </div>

        {/* Step content — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-10 md:px-10 md:py-12">
          {state.status === "success" ? (
            <SuccessScreen
              headline={copy.successHeadline}
              body={copy.successBody}
              closeLabel={copy.successClose}
              onClose={handleClose}
              slaPromise={text(locale, RESPONSE_PROMISE)}
            />
          ) : (
            <ActiveStep />
          )}
        </div>

        {/* Footer — back / skip / next. Hidden on success state. */}
        {state.status !== "success" && (
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-base)] px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
            <button
              type="button"
              onClick={goBack}
              disabled={isFirst}
              className="rounded-full border border-[color:var(--color-stroke-medium)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[color:var(--color-surface-raised)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← {copy.back}
            </button>
            <div className="flex items-center gap-3">
              {skippable && (
                <button
                  type="button"
                  onClick={goNext}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
                >
                  {copy.skip}
                </button>
              )}
              {!isLast && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!valid}
                  className="rounded-full bg-[color:var(--color-brand-primary)] px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[color:var(--color-brand-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copy.next} →
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function SuccessScreen({
  headline,
  body,
  slaPromise,
  closeLabel,
  onClose,
}: {
  headline: string;
  body: string;
  slaPromise: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
        ✓
      </p>
      <h2
        className="leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 400,
        }}
      >
        {headline}
      </h2>
      <p
        className="text-[color:var(--color-text-secondary)]"
        style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.65 }}
      >
        {body}
      </p>
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
        <span aria-hidden>★</span>
        {slaPromise}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="self-start rounded-full border border-[color:var(--color-stroke-medium)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[color:var(--color-surface-raised)]"
      >
        {closeLabel}
      </button>
    </div>
  );
}
