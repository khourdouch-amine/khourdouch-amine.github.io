import { createContext } from 'react'

export type Language = 'EN' | 'FR'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
