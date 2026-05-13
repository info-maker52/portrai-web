import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Контакты — PortrAI AI-фотобудка",
  description:
    "Свяжитесь с PortrAI: запрос предложения по AI-фотобудке для свадьбы, корпоратива или выставки в Эстонии. Ответ в течение 24 часов.",
  alternates: {
    canonical: "/ru/kontakty",
    languages: {
      et: "/kontakt",
      en: "/en/kontakt",
      ru: "/ru/kontakty",
    },
  },
};

const WHATSAPP = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Здравствуйте, хочу узнать о PortrAI на мероприятие.",
)}`;

export default function RuContactPage() {
  return (
    <main className="bg-[color:var(--color-surface-base)] text-white">
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 pb-12 pt-20 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          Контакты
        </p>
        <h1
          className="mb-6 max-w-4xl font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          Расскажите о мероприятии — ответим в течение 24 часов.
        </h1>
      </section>

      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <form action={`mailto:${CONTACT.email}`} method="post" encType="text/plain" className="flex max-w-2xl flex-col gap-6">
          <Field name="name" label="Ваше имя" required />
          <Field name="email" label="E-mail" type="email" required />
          <Field name="phone" label="Телефон (по желанию)" type="tel" />
          <Field name="event_type" label="Тип мероприятия (свадьба, корпоратив, выставка...)" />
          <Field name="event_date" label="Дата мероприятия" type="date" />
          <Field name="event_location" label="Место (город, заведение)" />
          <Field name="guest_count" label="Количество гостей" type="number" />
          <FieldArea name="message" label="Расскажите подробнее" />
          <button
            type="submit"
            className="self-start rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)]"
          >
            Отправить →
          </button>
          <p className="text-xs text-[color:var(--color-text-tertiary)]">
            Форма откроет ваш почтовый клиент с письмом на {CONTACT.email}.
            Если предпочитаете — напишите напрямую или позвоните.
          </p>
        </form>
      </section>

      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          Прямые контакты
        </p>
        <ul className="flex flex-col gap-3 text-[color:var(--color-text-secondary)]">
          <li>
            E-mail:{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-white underline-offset-4 hover:underline"
            >
              {CONTACT.email}
            </a>
          </li>
          <li>
            Телефон:{" "}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="text-white underline-offset-4 hover:underline"
            >
              {CONTACT.phone}
            </a>
          </li>
          <li>
            WhatsApp:{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 hover:underline"
            >
              Открыть чат →
            </a>
          </li>
          <li>Часы работы: пн–пт 09:00 — 18:00</li>
          <li>Адрес: Таллинн, Эстония</li>
        </ul>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          <Link href="/" className="hover:text-white">
            Eesti
          </Link>{" "}
          ·{" "}
          <Link href="/en" className="hover:text-white">
            English
          </Link>{" "}
          ·{" "}
          <Link href="/ru" className="hover:text-white">
            Русский
          </Link>
        </p>
      </section>
    </main>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-brand-accent)]">*</span>
        )}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}

function FieldArea({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
        {label}
      </span>
      <textarea
        name={name}
        rows={5}
        className="border-b border-[color:var(--color-stroke-medium)] bg-transparent px-0 py-3 text-base text-white transition-colors duration-200 focus:border-[color:var(--color-brand-primary)] focus:outline-none"
      />
    </label>
  );
}
