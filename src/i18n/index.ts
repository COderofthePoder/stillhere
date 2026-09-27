import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { readLocal, writeLocal } from "@/lib/local-storage";

import { de, type Copy } from "./de";
import { en } from "./en";
import { fr } from "./fr";
import { it } from "./it";

export const LOCALES = ["de", "fr", "it", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  en: "English",
};

const DICTIONARIES: Record<Locale, Copy> = { de, fr, it, en };

export const DEFAULT_LOCALE: Locale = "de";
const STORAGE_KEY = "locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function getCopy(locale: Locale = DEFAULT_LOCALE): Copy {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

type LocaleState = { locale: Locale; setLocale: (next: Locale) => void };

const LocaleContext = createContext<LocaleState>({ locale: DEFAULT_LOCALE, setLocale: () => {} });

/** Locale is chosen on the device only; the browser language is the first guess. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readLocal<string>(STORAGE_KEY);
    if (isLocale(stored)) return setLocaleState(stored);
    const guess = navigator.language?.slice(0, 2).toLowerCase();
    if (isLocale(guess)) setLocaleState(guess);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeLocal(STORAGE_KEY, next);
  }, []);

  return createElement(LocaleContext.Provider, { value: { locale, setLocale } }, children);
}

export function useLocale(): LocaleState {
  return useContext(LocaleContext);
}

/** Hook-style reader so components never inline strings. */
export function useCopy(): Copy {
  return getCopy(useContext(LocaleContext).locale);
}

export type { Copy };
