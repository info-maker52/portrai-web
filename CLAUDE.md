@AGENTS.md

# CLAUDE.md — guidance for Claude Code working on this repo

> Read this first when opening this repo.

## Project context

This is the new **PortrAI** website — migration from Wix.
- Production target: `portrai.ee` (currently still on Wix)
- Staging target: `portrai.cloud` (Namecheap → Vercel DNS)
- Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, next-intl, Vercel
- Design direction: **B — Studio Lab** (cursor-reveal hero, editorial frame, dark + purple)
- Brand palette: `#7948FF` purple / `#FFA2FF` pink / `#02091E` dark
- Locales: `et` (default at `/`), `en` (at `/en/...`)

## Source-of-truth docs (live in sibling folder)

| Doc | Path |
|---|---|
| Master plan | `C:/Users/Reijo/.claude/plans/i-want-to-migrate-crispy-ritchie.md` |
| Task handoff | `C:/Users/Reijo/Desktop/New PAGE/TASKS.md` |
| Design tokens spec | `C:/Users/Reijo/Desktop/New PAGE/design/tokens.md` |
| Reference synthesis | `C:/Users/Reijo/Desktop/New PAGE/design/references-from-reijo.md` |
| 3 directions (B chosen) | `C:/Users/Reijo/Desktop/New PAGE/design/3-directions.md` |
| Keyword candidates | `C:/Users/Reijo/Desktop/New PAGE/seo/keywords-candidates.md` |
| Brand assets (logo etc.) | `C:/Users/Reijo/Desktop/New PAGE/brand/` |
| Case studies & content (when delivered) | `C:/Users/Reijo/Desktop/New PAGE/case-studies/` |

## Repo conventions

### File structure
```
src/
├── app/
│   ├── layout.tsx                 — root <html>, fonts only
│   ├── globals.css                — Tailwind v4 + @theme tokens
│   └── [locale]/
│       ├── layout.tsx             — NextIntlClientProvider + metadata
│       ├── page.tsx               — home
│       ├── design/page.tsx        — token preview (Stage 2 sign-off)
│       ├── teenused/page.tsx      — services (TODO)
│       ├── tood/page.tsx          — work index (TODO)
│       ├── tood/[slug]/page.tsx   — case study (TODO)
│       ├── blog/page.tsx          — blog index (TODO)
│       ├── blog/[slug]/page.tsx   — blog post (TODO)
│       └── kontakt/page.tsx       — contact (TODO)
├── components/                    — reusable components (TODO)
│   ├── motion/                    — cursor, magnetic button, page transition
│   ├── hero/                      — cursor-reveal portrait shader
│   └── ...
├── content/                       — MDX case studies + blog posts (TODO)
├── i18n/
│   ├── routing.ts
│   ├── navigation.ts              — locale-aware <Link>
│   └── request.ts
├── lib/
│   ├── cn.ts                      — Tailwind className merger
│   └── seo.ts                     — metadata + schema helpers
├── messages/                      — locale strings (et.json, en.json)
└── middleware.ts                  — next-intl routing
```

### Conventions
- Always use the `Link` from `@/i18n/navigation`, never `next/link` directly. Locale switching depends on it.
- Always use `cn()` from `@/lib/cn` for className composition.
- Design tokens are referenced via `var(--color-*)` and `var(--text-*)`. Don't hardcode hex.
- Server components by default. Add `"use client"` only when the component uses hooks, browser APIs, or motion (Framer Motion / GSAP).
- Translations live in `messages/{locale}.json`. Use `useTranslations("namespace")` (sync, server-OK after `setRequestLocale`) or `getTranslations({ locale, namespace })` (async).
- Localised pages call `setRequestLocale(locale)` at the top of the page component for static rendering.

### Direction B — what to remember
- The hero is a cursor-reveal portrait shader (Phase 5). Until then, the homepage is a placeholder.
- Cursor itself is a custom component (Phase 5) — magnetic on interactive elements.
- Editorial nav: numbered `01 / 02 / 03 / 04` in mono.
- Purple is precious — used as accent on CTAs, cursor trail, active states. Not a backdrop.
- Motion respects `prefers-reduced-motion`.

## Useful commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

Visit `http://localhost:3000/design` (or `/en/design`) for the token sign-off page.

## What NOT to do
- Don't add UI libraries without asking (no Material UI, Chakra, etc.) — design tokens are the system.
- Don't add a CMS — content is MDX in repo.
- Don't introduce a database — booking form goes through SMTP, not a DB.
- Don't break the locale routing — every page lives under `[locale]/`.
- Don't commit `.env.local` or `SECRETS.local.txt`.
