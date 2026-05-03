import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-toggle" role="group" aria-label="Language selection">
      <button
        type="button"
        className={`lang-btn${lang === 'el' ? ' active' : ''}`}
        onClick={() => setLang('el')}
        aria-pressed={lang === 'el'}
      >
        ΕΛ
      </button>
      <button
        type="button"
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
