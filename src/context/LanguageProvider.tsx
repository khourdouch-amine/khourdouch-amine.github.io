import { useState, type ReactNode } from 'react'
import { LanguageContext } from './LanguageContext'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
