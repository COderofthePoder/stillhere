import { de, type Copy } from "./de";

export type Locale = "de";

const DICTIONARIES: Record<Locale, Copy> = { de };

export const DEFAULT_LOCALE: Locale = "de";

/** Returns the copy dictionary for a locale. Add fr/it/en by registering a
 * sibling dictionary above; components stay unchanged. */
export function getCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Hook-style reader so components never inline strings. */
export function useCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return getCopy(locale);
}

export type { Copy };
