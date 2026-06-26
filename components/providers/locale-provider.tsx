"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, defaultLocale } from "@/lib/i18n/dictionary";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Initialize language from localStorage on client-side mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("p2c_locale") as Locale;
    if (savedLocale === "en" || savedLocale === "vi" || savedLocale === "hk") {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("p2c_locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
