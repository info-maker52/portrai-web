import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, INSURANCE, SLAS } from "@/lib/contact";
import { formatEur, PACKAGES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "PortrAI — AI-фотобудка для мероприятий в Эстонии",
  description:
    "AI-фотобудка с премией Booth Mastermind 2025. Свадьбы, корпоративы, выставки в Таллинне и по всей Эстонии. Пакеты от 690 €.",
  alternates: {
    canonical: "/ru",
    languages: {
      et: "/",
      en: "/en",
      ru: "/ru",
    },
  },
};

const PHONE = CONTACT.phoneTel;
const WHATSAPP = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Здравствуйте, хочу узнать о PortrAI на мероприятие.",
)}`;

export default function RuHomePage() {
  return (
    <main className="bg-[color:var(--color-surface-base)] text-white">
      {/* Hero */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 pb-16 pt-20 md:px-12 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          PortrAI · AI-фотобудка
        </p>
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--color-brand-primary)]/40 bg-[color:var(--color-brand-primary)]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-brand-accent)]">
          ★ Booth Mastermind Awards 2025 · Las Vegas · Best AI Photo Solution
        </p>
        <h1
          className="mb-6 max-w-4xl font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-display-xl)" }}
        >
          AI-фотобудка, о которой гости говорят ещё месяцы спустя.
        </h1>
        <p
          className="mb-10 max-w-2xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          PortrAI — отмеченная наградами AI-фотобудка из Эстонии. Свадьбы,
          корпоративные вечера, выставки и брендовые активации в Таллинне и
          по всей стране. Каждый гость получает уникальный портрет в
          выбранном стиле — акварель, акрил, неон, ренессанс и ещё девять.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`tel:${PHONE}`}
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)]"
          >
            ☎ Позвонить — {CONTACT.phone}
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
          >
            WhatsApp →
          </a>
          <Link
            href="/ru/kontakty"
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
          >
            Запрос предложения →
          </Link>
        </div>
      </section>

      {/* Что предлагаем */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          Что предлагаем
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          Три формата, одна команда.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "AI-фотобудка",
              body:
                "Главный формат. AI превращает гостя в портрет в выбранном стиле — акварель, акрил, неон, кино, ренессанс и другие.",
            },
            {
              title: "Фотозеркало (fotopeegel)",
              body:
                "Элегантное зеркало в полный рост со встроенной камерой. Идеально для свадеб и премиальных вечеров.",
            },
            {
              title: "Классическая фотобудка",
              body:
                "Привычные четыре кадра в полосу. Простое, быстрое, надёжное решение для дней рождения и семейных праздников.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <h3
                className="font-medium leading-tight"
                style={{ fontSize: "var(--text-title)" }}
              >
                {item.title}
              </h3>
              <p className="text-[color:var(--color-text-secondary)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Пакеты */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          Пакеты
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          Прозрачные цены — от {formatEur(PACKAGES[0].basePrice, "et")}.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col gap-4 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                {pkg.id === "essential"
                  ? "Boks · 3 ч"
                  : pkg.id === "signature"
                    ? "Branded · 5 ч"
                    : "Custom Activation · по запросу"}
              </p>
              <p
                className="font-medium tabular-nums leading-none"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {pkg.customPricing
                  ? "По запросу"
                  : `от ${formatEur(pkg.basePrice, "et")}`}
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {pkg.id === "essential" &&
                  "Небольшие свадьбы, дни рождения и камерные корпоративы до ~100 гостей."}
                {pkg.id === "signature" &&
                  "Полностью брендированный UI, не только стартовый экран. Корпоративные вечера 100–300 гостей."}
                {pkg.id === "studio" &&
                  "Кампания-концепция вокруг AI-фото. Уровень Swedbank / Synlab / Von Fock."}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SLA */}
      <section className="border-b border-[color:var(--color-stroke-subtle)] px-6 py-20 md:px-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
          Что обещаем
        </p>
        <h2
          className="mb-10 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          Конкретные сроки. Никаких сюрпризов.
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: SLAS[0].value, label: "Установка и демонтаж" },
            { value: SLAS[1].value, label: "Цифровые фото готовы" },
            { value: SLAS[2].value, label: "Ответ на запрос" },
            { value: SLAS[3].value, label: "Портретов в час на пике" },
          ].map((sla, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-2xl border border-[color:var(--color-stroke-subtle)] bg-[color:var(--color-surface-raised)] p-5"
            >
              <p
                className="font-mono font-medium tabular-nums leading-none text-white"
                style={{ fontSize: "var(--text-display-md)" }}
              >
                {sla.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-secondary)]">
                {sla.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-[color:var(--color-text-tertiary)]">
          Страхование ответственности до{" "}
          {INSURANCE.amount.toLocaleString("ru-RU")} €.
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 md:px-12">
        <h2
          className="mb-6 max-w-3xl font-medium leading-tight tracking-tight"
          style={{ fontSize: "var(--text-display-lg)" }}
        >
          Расскажите о вашем мероприятии.
        </h2>
        <p
          className="mb-8 max-w-xl text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "var(--text-body-lg)" }}
        >
          Мы вернёмся с предложением в течение 24 часов.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/ru/kontakty"
            className="inline-block rounded-full bg-[color:var(--color-brand-primary)] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[color:var(--color-brand-secondary)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Связаться →
          </Link>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-block rounded-full border border-[color:var(--color-stroke-medium)] px-8 py-4 font-medium text-white transition-colors duration-200 hover:bg-[color:var(--color-surface-raised)]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            {CONTACT.email}
          </a>
        </div>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-text-tertiary)]">
          <Link href="/" className="hover:text-white">
            Eesti
          </Link>{" "}
          ·{" "}
          <Link href="/en" className="hover:text-white">
            English
          </Link>{" "}
          · Русский
        </p>
      </section>
    </main>
  );
}
