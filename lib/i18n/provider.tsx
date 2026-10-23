"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { dictionaries, type DictKey, type Lang } from "./dictionaries";

type I18nContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: DictKey) => string;
  locale: (ar: string | null | undefined, en: string | null | undefined) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // Reading localStorage must happen after hydration to keep SSR markup stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(stored === "en" ? "en" : "ar");
    // Do not write the default back to storage before the stored value is read
    // (Strict Mode deliberately runs effects twice in development).
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, hydrated]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((current) => (current === "ar" ? "en" : "ar")),
    [],
  );

  const t = useCallback(
    (key: DictKey) => dictionaries[lang][key] ?? dictionaries.ar[key] ?? key,
    [lang],
  );

  const locale = useCallback(
    (ar: string | null | undefined, en: string | null | undefined) => {
      if (lang === "ar") return ar || en || "";
      return en || ar || "";
    },
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang,
      t,
      locale,
    }),
    [lang, setLang, toggleLang, t, locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within LanguageProvider");
  return context;
}
