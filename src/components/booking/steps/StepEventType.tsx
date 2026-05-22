"use client";

import { useLocale } from "next-intl";
import {
  useBookingFlow,
  type BookingEventType,
} from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

/**
 * Step 1 — "What kind of event?"
 *
 * Six tap cards. Picking one stores the value AND advances after a
 * 320 ms pause — long enough for the visitor to see their choice
 * register (purple border + glow), short enough that the flow doesn't
 * feel laggy.
 */

type Option = {
  id: BookingEventType;
  label: string;
  hint: string;
};

const OPTIONS: Record<SiteLocale, Option[]> = {
  en: [
    {
      id: "brand",
      label: "Brand activation / campaign",
      hint: "Concept-driven work — booth, widget, or both",
    },
    {
      id: "corporate",
      label: "Corporate party",
      hint: "Annual party, summer day, jõulupidu",
    },
    {
      id: "wedding",
      label: "Wedding",
      hint: "Spring 2026 onwards · ICON 2",
    },
    {
      id: "private",
      label: "Birthday / private event",
      hint: "Smaller groups, fast setup",
    },
    {
      id: "tradeshow",
      label: "Trade show / conference",
      hint: "Lead capture + branded stand",
    },
    {
      id: "other",
      label: "Something else",
      hint: "Tell us what you have in mind",
    },
  ],
  et: [
    {
      id: "brand",
      label: "Brändi-aktivatsioon / kampaania",
      hint: "Kontseptsiooni-põhine töö — boks, widget või mõlemad",
    },
    {
      id: "corporate",
      label: "Firmapidu",
      hint: "Aastapidu, suvepäev, jõulupidu",
    },
    {
      id: "wedding",
      label: "Pulm",
      hint: "Alates kevad 2026 · ICON 2",
    },
    {
      id: "private",
      label: "Sünnipäev / eraüritus",
      hint: "Väiksem grupp, kiire setup",
    },
    {
      id: "tradeshow",
      label: "Mess / konverents",
      hint: "Leadide kogumine + bränditud stand",
    },
    {
      id: "other",
      label: "Midagi muud",
      hint: "Räägi mida sa mõtled",
    },
  ],
};

const COPY = {
  en: {
    question: "What kind of event?",
    hint: "Pick the closest one — we adjust the follow-up.",
  },
  et: {
    question: "Mis tüüpi üritus?",
    hint: "Vali kõige sobivam — kohendame järgmised küsimused.",
  },
} as const;

export function StepEventType() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, setField, goNext } = useBookingFlow();
  const options = OPTIONS[locale];
  const copy = COPY[locale];

  function pick(id: BookingEventType) {
    setField("eventType", id);
    // Short delay so the selected state is visible before advancing.
    window.setTimeout(() => goNext(), 320);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2
          className="leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            fontWeight: 400,
          }}
        >
          {copy.question}
        </h2>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          {copy.hint}
        </p>
      </div>

      <div className="grid gap-3">
        {options.map((opt) => {
          const selected = state.eventType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => pick(opt.id)}
              className={[
                "flex flex-col items-start gap-1 rounded-2xl border p-5 text-left transition-all duration-200",
                selected
                  ? "border-[color:var(--color-brand-primary)] bg-[color:var(--color-brand-primary)]/12 shadow-[var(--glow-soft)]"
                  : "border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] hover:border-[color:var(--color-stroke-medium)] hover:bg-[color:var(--color-surface-high)]",
              ].join(" ")}
            >
              <span
                className={[
                  "font-medium leading-tight",
                  selected ? "text-white" : "text-white",
                ].join(" ")}
                style={{ fontSize: "var(--text-title)" }}
              >
                {opt.label}
              </span>
              <span className="text-sm text-[color:var(--color-text-secondary)]">
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
