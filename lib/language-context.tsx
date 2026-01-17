"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (fr: string, ar: string) => string
  dir: "ltr" | "rtl"
  formatPrice: (price: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (fr: string, ar: string) => (language === "fr" ? fr : ar)
  const dir = language === "ar" ? "rtl" : "ltr"

  const formatPrice = (price: number) => {
    if (language === "fr") {
      return `${price.toLocaleString("fr-FR").replace(/,/g, " ")} DH`
    }
    return `${price.toLocaleString("ar-MA").replace(/,/g, ".")} درهم`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
