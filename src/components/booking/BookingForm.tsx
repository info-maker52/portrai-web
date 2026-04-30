"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Client-side booking form.
 * Submits JSON to /api/booking (serverless route → Gmail SMTP).
 *
 * Input styling: borderless underlined fields à la the v0 newsletter
 * template Reijo flagged. Single-column on mobile, two-column for paired
 * fields on desktop.
 */
export function BookingForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Request failed");
      }

      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/5 p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
          ✓ Saadetud
        </p>
        <p className="text-lg">{t("success")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
        >
          Saada uus →
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      {/* Honeypot — hidden from users but bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <Field name="name" label={t("name")} type="text" required />
      <Field name="email" label={t("email")} type="email" required />
      <Field name="phone" label={t("phone")} type="tel" />

      <div className="grid gap-8 md:grid-cols-2">
        <Field name="eventType" label={t("eventType")} type="text" />
        <Field name="eventDate" label={t("eventDate")} type="date" />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field name="eventLocation" label={t("eventLocation")} type="text" />
        <Field name="guestCount" label={t("guestCount")} type="number" />
      </div>

      <FieldArea name="message" label={t("message")} required />

      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-danger)]">
          ✗ {t("error")}
          {errorMessage && (
            <span className="ml-2 normal-case text-[color:var(--color-text-tertiary)]">
              ({errorMessage})
            </span>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-md bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)] hover:shadow-[var(--glow-medium)] disabled:cursor-not-allowed disabled:opacity-60"
        style={{ fontSize: "var(--text-body-lg)" }}
      >
        {submitting ? "..." : `${t("submit")} →`}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-brand-accent)]">*</span>
        )}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function FieldArea({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-brand-accent)]">*</span>
        )}
      </span>
      <textarea
        name={name}
        rows={5}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}
