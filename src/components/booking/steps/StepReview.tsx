"use client";

import { useLocale } from "next-intl";
import {
  useBookingFlow,
  type BookingStep,
} from "../BookingFlowProvider";
import type { SiteLocale } from "@/lib/site-content";

/**
 * Step 7 — Review.
 *
 * Summary of every captured field. Each row has an inline "edit" link
 * that jumps back to that step without losing later answers. Submit
 * button triggers the actual POST.
 */

const COPY = {
  en: {
    question: "Looks right?",
    hint: "Hit send and we'll reply within 3 business hours.",
    submit: "Send",
    sending: "Sending…",
    edit: "edit",
    rows: {
      "event-type": "Event",
      date: "When",
      location: "Where",
      guests: "Guests",
      message: "Notes",
      contact: "Contact",
    } as Record<BookingStep, string>,
    flexible: "Flexible",
    empty: "—",
    eventTypeLabels: {
      brand: "Brand activation",
      corporate: "Corporate party",
      wedding: "Wedding",
      private: "Birthday / private",
      tradeshow: "Trade show",
      other: "Something else",
    } as Record<string, string>,
  },
  et: {
    question: "Kõik klapib?",
    hint: "Vajuta saada ja vastame 3 töötunni jooksul.",
    submit: "Saada",
    sending: "Saadan…",
    edit: "muuda",
    rows: {
      "event-type": "Üritus",
      date: "Millal",
      location: "Kus",
      guests: "Külalisi",
      message: "Märkused",
      contact: "Kontakt",
    } as Record<BookingStep, string>,
    flexible: "Paindlik",
    empty: "—",
    eventTypeLabels: {
      brand: "Brändi-aktivatsioon",
      corporate: "Firmapidu",
      wedding: "Pulm",
      private: "Sünnipäev / eraüritus",
      tradeshow: "Mess",
      other: "Midagi muud",
    } as Record<string, string>,
  },
} as const;

export function StepReview() {
  const locale = (useLocale() as SiteLocale) ?? "et";
  const { state, goToStep, submit } = useBookingFlow();
  const copy = COPY[locale];

  const rows: Array<{
    step: BookingStep;
    label: string;
    value: string;
    show: boolean;
  }> = [
    {
      step: "event-type",
      label: copy.rows["event-type"],
      value: copy.eventTypeLabels[state.eventType] ?? copy.empty,
      show: true,
    },
    {
      step: "date",
      label: copy.rows.date,
      value:
        state.eventDate === "flexible"
          ? copy.flexible
          : state.eventDate || copy.empty,
      show: true,
    },
    {
      step: "location",
      label: copy.rows.location,
      value: state.eventLocation || copy.empty,
      show: true,
    },
    {
      step: "guests",
      label: copy.rows.guests,
      value: state.guestCount ? `${state.guestCount}` : copy.empty,
      show: state.guestCount !== null,
    },
    {
      step: "message",
      label: copy.rows.message,
      value: state.message || copy.empty,
      show: state.message.trim().length > 0,
    },
    {
      step: "contact",
      label: copy.rows.contact,
      value: [state.name, state.email, state.phone, state.company]
        .filter(Boolean)
        .join(" · "),
      show: true,
    },
  ];

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

      <dl className="flex flex-col divide-y divide-[color:var(--color-stroke-subtle)]">
        {rows
          .filter((r) => r.show)
          .map((row) => (
            <div
              key={row.step}
              className="flex items-start justify-between gap-4 py-4"
            >
              <div className="flex flex-1 flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
                  {row.label}
                </dt>
                <dd className="text-sm text-white whitespace-pre-wrap">
                  {row.value}
                </dd>
              </div>
              <button
                type="button"
                onClick={() => goToStep(row.step)}
                className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
              >
                {copy.edit}
              </button>
            </div>
          ))}
      </dl>

      {state.status === "error" && state.errorMessage && (
        <p className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-danger)]">
          {state.errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={() => submit()}
        disabled={state.status === "submitting"}
        className="self-start rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)] disabled:cursor-not-allowed disabled:opacity-60"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {state.status === "submitting" ? copy.sending : `${copy.submit} →`}
      </button>
    </div>
  );
}
