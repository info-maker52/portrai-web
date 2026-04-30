import { defineRouting } from "next-intl/routing";

/**
 * i18n routing config.
 * - Estonian is the default locale, served at `/`
 * - English is served at `/en`
 * - Add more locales here later if needed (e.g. fi, de)
 */
export const routing = defineRouting({
  locales: ["et", "en"],
  defaultLocale: "et",
  localePrefix: "as-needed", // ET at /, EN at /en/...
});

export type Locale = (typeof routing.locales)[number];
