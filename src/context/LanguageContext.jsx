import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

function detectInitialLang() {
  const saved = localStorage.getItem('site_lang')
  if (saved === 'el' || saved === 'en') return saved
  return navigator.language?.startsWith('en') ? 'en' : 'el'
}

export function LanguageProvider({ children }) {
  const [lang, setLangRaw] = useState(detectInitialLang)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next) => {
    if (next === lang) return
    setFading(true)
    setTimeout(() => {
      setLangRaw(next)
      localStorage.setItem('site_lang', next)
      document.documentElement.lang = next
      setTimeout(() => setFading(false), 200)
    }, 200)
  }

  const tr = translations[lang]

  const t = (path) =>
    path.split('.').reduce((o, k) => o?.[k], tr) ?? path

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tr, fading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
