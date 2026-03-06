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

export function getLocaleDisplayName(
  locale: Locale,
  displayLocale: Locale = locale
): string {
  if (displayLocale === "vi") {
    return locale === "en" ? "🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN" : "🇻🇳 VI";
  }

  return locale === "en" ? "🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN" : "🇻🇳 VI";
}
