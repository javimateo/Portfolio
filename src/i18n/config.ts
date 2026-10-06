export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

// Any user-facing text that changes with the language.
export type Localized<T = string> = Record<Locale, T>;

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Spanish lives at the root ("/"), English under "/en".
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

// Remembers an explicit choice so the proxy stops guessing from Accept-Language.
export const LOCALE_COOKIE = "lang";
