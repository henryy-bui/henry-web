export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "en" ? "vi" : "en";
}

// Plain codes, no flag emoji — the switcher was the last splash of color in
// the nav, and the two branches below it rendered the same string anyway.
export function getLocaleDisplayName(locale: Locale): string {
  return locale === "en" ? "EN" : "VI";
}
