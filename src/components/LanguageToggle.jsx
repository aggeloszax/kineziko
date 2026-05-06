import { useLanguage } from '../context/LanguageContext'

function FlagGR() {
  return (
    <svg
      className="flag"
      viewBox="0 0 27 18"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="27" height="18" fill="#0d5eaf" />
      <rect y="2" width="27" height="2" fill="#fff" />
      <rect y="6" width="27" height="2" fill="#fff" />
      <rect y="10" width="27" height="2" fill="#fff" />
      <rect y="14" width="27" height="2" fill="#fff" />
      <rect width="10" height="10" fill="#0d5eaf" />
      <rect x="4" width="2" height="10" fill="#fff" />
      <rect y="4" width="10" height="2" fill="#fff" />
    </svg>
  )
}

function FlagUK() {
  return (
    <svg
      className="flag"
      viewBox="0 0 60 30"
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id="lt-uk-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#lt-uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#lt-uk-clip)"
        />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

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
        <FlagGR />
        <span>ΕΛ</span>
      </button>
      <button
        type="button"
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        <FlagUK />
        <span>EN</span>
      </button>
    </div>
  )
}
