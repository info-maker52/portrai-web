"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

type LocaleCopy = {
  sent: string;
  sendAnother: string;
  messageHint: string;
  selectEventType: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    eventLocation: string;
    guestCount: string;
    message: string;
  };
  eventTypeOptions: Array<{ value: string; label: string }>;
};

const FORM_COPY: Record<"et" | "en", LocaleCopy> = {
  en: {
    sent: "Sent",
    sendAnother: "Send another",
    messageHint:
      "Loose answers are fine. We can shape the final concept together later.",
    selectEventType: "Select event type",
    placeholders: {
      name: "Reijo Pullai",
      email: "hello@company.com",
      phone: "+372 5555 5555",
      eventLocation: "Tallinn, Tartu, Helsinki...",
      guestCount: "120",
      message:
        "What kind of event is it, what should it feel like, and what should guests want to share afterwards?",
    },
    eventTypeOptions: [
      { value: "corporate", label: "Corporate event" },
      { value: "trade-show", label: "Trade show / conference" },
      { value: "festival", label: "Festival / public event" },
      { value: "wedding", label: "Wedding / private event" },
      { value: "custom", label: "Custom activation" },
    ],
  },
  et: {
    sent: "Saadetud",
    sendAnother: "Saada uus",
    messageHint:
      "Vabamas vormis vastused on okei. Lõpliku kontseptsiooni saame hiljem koos paika lihvida.",
    selectEventType: "Vali ürituse tüüp",
    placeholders: {
      name: "Reijo Pullai",
      email: "tere@ettevote.ee",
      phone: "+372 5555 5555",
      eventLocation: "Tallinn, Tartu, Helsinki...",
      guestCount: "120",
      message:
        "Mis tüüpi sündmusega on tegu, millist tunnet tahad luua ja mida külalised pärast jagada võiksid?",
    },
    eventTypeOptions: [
      { value: "corporate", label: "Firmaüritus" },
      { value: "trade-show", label: "Mess / konverents" },
      { value: "festival", label: "Festival / avalik sündmus" },
      { value: "wedding", label: "Pulm / privaatne sündmus" },
      { value: "custom", label: "Erilahendus" },
    ],
  },
};

export function BookingForm() {
  const t = useTranslations("contact.form");
  const locale = (useLocale() as "et" | "en") ?? "en";
  const copy = FORM_COPY[locale];
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
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/5 p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-brand-accent)]">
          {copy.sent}
        </p>
        <p className="text-lg">{t("success")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-white hover:underline"
        >
          {copy.sendAnother} →
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          name="name"
          label={t("name")}
          type="text"
          placeholder={copy.placeholders.name}
          required
        />
        <Field
          name="email"
          label={t("email")}
          type="email"
          placeholder={copy.placeholders.email}
          required
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          name="phone"
          label={t("phone")}
          type="tel"
          placeholder={copy.placeholders.phone}
        />
        <SelectField
          name="eventType"
          label={t("eventType")}
          placeholder={copy.selectEventType}
          options={copy.eventTypeOptions}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field name="eventDate" label={t("eventDate")} type="date" />
        <Field
          name="eventLocation"
          label={t("eventLocation")}
          type="text"
          placeholder={copy.placeholders.eventLocation}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          name="guestCount"
          label={t("guestCount")}
          type="number"
          placeholder={copy.placeholders.guestCount}
        />
      </div>

      <FieldArea
        name="message"
        label={t("message")}
        placeholder={copy.placeholders.message}
        hint={copy.messageHint}
        required
      />

      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-danger)]">
          {t("error")}
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
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
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
        placeholder={placeholder}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  options,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="border-b border-[color:var(--color-stroke-medium)] bg-[color:var(--color-surface-base)] px-0 py-3 text-lg text-white transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldArea({
  name,
  label,
  placeholder,
  hint,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
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
        rows={6}
        required={required}
        placeholder={placeholder}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-lg text-white transition-colors duration-200 placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
      {hint && (
        <span className="text-sm text-[color:var(--color-text-tertiary)]">
          {hint}
        </span>
      )}
    </label>
  );
}
