import { useEffect, useMemo, useState } from 'react'
import './App.css'
import SplashScreen from './SplashScreen'
import logo from '/fuzhou-garden-logo.jpg'
import { useLanguage } from './context/LanguageContext'
import LanguageToggle from './components/LanguageToggle'

const NAV_IDS = ['about', 'menu', 'reviews', 'contact']

function InstagramIcon() {
  return (
    <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="phone-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.05 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function WokVisual() {
  const { t } = useLanguage()
  return (
    <div className="premium-wok-scene" aria-label={t('hero.note')}>
      <div className="wok-outer-glow" />
      <div className="wok-frame">
        <div className="wok-inner">
          <svg className="baozi-svg" viewBox="0 0 400 400" role="img" aria-labelledby="baozi-title">
            <title id="baozi-title">{t('baozi_title')}</title>
            <defs>
              <radialGradient id="baoziSurface" cx="38%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#faf6f0" />
                <stop offset="32%" stopColor="#f0e8dc" />
                <stop offset="66%" stopColor="#e0d0be" />
                <stop offset="100%" stopColor="#d4c4b0" />
              </radialGradient>
              <linearGradient id="parchmentGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f5f0e8" />
                <stop offset="100%" stopColor="#ede6d8" />
              </linearGradient>
              <radialGradient id="subSurface" cx="50%" cy="84%" r="56%">
                <stop offset="0%" stopColor="#ffb89a" stopOpacity="0.14" />
                <stop offset="55%" stopColor="#ffb89a" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffb89a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatGlowAmber" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff8c42" stopOpacity="0.09" />
                <stop offset="60%" stopColor="#ff8c42" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ff8c42" stopOpacity="0" />
              </radialGradient>
              <filter id="baoziTexture" x="-4%" y="-4%" width="108%" height="108%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="12" result="noise" />
                <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
                <feComponentTransfer in="grayNoise" result="subtleNoise">
                  <feFuncA type="table" tableValues="0 0.03" />
                </feComponentTransfer>
                <feBlend mode="overlay" in="subtleNoise" in2="SourceGraphic" />
              </filter>
              <filter id="specularBlur" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="parchShadow" x="-14%" y="-25%" width="128%" height="170%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.36" />
              </filter>
              <filter id="steamBlur">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>

            <ellipse cx="200" cy="334" rx="98" ry="22" fill="url(#heatGlowAmber)" />

            <g filter="url(#parchShadow)">
              <rect x="112" y="276" width="176" height="50" rx="3" fill="url(#parchmentGrad)" />
              <line x1="162" y1="277" x2="160" y2="325" stroke="rgba(172,152,128,0.2)" strokeWidth="0.8" />
              <line x1="238" y1="277" x2="240" y2="325" stroke="rgba(172,152,128,0.2)" strokeWidth="0.8" />
            </g>

            <ellipse cx="200" cy="280" rx="88" ry="11" fill="rgba(0,0,0,0.22)" />

            <path
              className="baozi-dome"
              d="M 116 276 C 107 252 104 210 114 174 C 124 142 146 122 174 114 C 186 110 194 108 202 108 C 212 108 222 113 238 124 C 258 140 276 164 284 196 C 292 225 292 260 288 276 C 256 291 144 291 116 276 Z"
              fill="url(#baoziSurface)"
              filter="url(#baoziTexture)"
            />
            <path
              d="M 116 276 C 107 252 104 210 114 174 C 124 142 146 122 174 114 C 186 110 194 108 202 108 C 212 108 222 113 238 124 C 258 140 276 164 284 196 C 292 225 292 260 288 276 C 256 291 144 291 116 276 Z"
              fill="url(#subSurface)"
            />
            <ellipse
              className="baozi-specular"
              cx="165" cy="162" rx="46" ry="28"
              fill="#ffffff" fillOpacity="0.62"
              filter="url(#specularBlur)"
              transform="rotate(-22 165 162)"
            />

            <g stroke="rgba(168,144,114,0.66)" fill="none" strokeLinecap="round">
              <path d="M 202 112 Q 188 123 174 146" strokeWidth="1.9" />
              <path d="M 202 112 Q 184 116 168 130" strokeWidth="1.7" />
              <path d="M 202 112 Q 182 109 168 113" strokeWidth="1.5" />
              <path d="M 202 112 Q 190 104 178 102" strokeWidth="1.3" />
              <path d="M 202 112 Q 196 103 192 97" strokeWidth="1.1" />
              <path d="M 202 112 Q 208 104 213 98" strokeWidth="1.1" />
              <path d="M 202 112 Q 215 107 226 106" strokeWidth="1.3" />
              <path d="M 202 112 Q 220 111 235 120" strokeWidth="1.5" />
              <path d="M 202 112 Q 220 121 230 138" strokeWidth="1.7" />
            </g>
            <circle cx="202" cy="112" r="3.8" fill="rgba(148,120,90,0.75)" />

            <g filter="url(#steamBlur)">
              <path className="steam-wisp steam-wisp-1" d="M 186 104 C 177 83 196 64 181 44 C 170 30 175 20 173 12" />
              <path className="steam-wisp steam-wisp-2" d="M 200 100 C 217 79 192 58 211 38 C 222 24 215 14 209 6" />
              <path className="steam-wisp steam-wisp-3" d="M 216 105 C 231 85 213 65 230 46 C 241 32 236 22 233 14" />
              <path className="steam-wisp steam-wisp-4" d="M 194 107 C 181 87 198 68 179 50 C 167 36 173 25 171 16" />
            </g>
          </svg>
        </div>
      </div>
      <div className="hero-note">
        <span>{t('hero.note')}</span>
      </div>
    </div>
  )
}

function App() {
  const { t, tr, fading } = useLanguage()

  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('splash_seen') === '1'
  )
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('starters')

  const menuCategories = tr.menu.categories
  const activeMenuItems = useMemo(
    () => menuCategories[activeCategory]?.items ?? [],
    [menuCategories, activeCategory]
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  const tickerItems = [...tr.ticker, ...tr.ticker]

  return (
    <>
      {!splashDone && (
        <SplashScreen logo={logo} name="Fuzhou Garden" onComplete={() => setSplashDone(true)} />
      )}
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <div style={{ opacity: fading ? 0.3 : 1, transition: 'opacity 0.2s ease' }}>

        <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
          <a className="brand" href="#top" aria-label={t('aria.brand_home')}>
            <img className="brand-logo" src="/fuzhou-garden-logo.jpg" alt="" />
            <span>
              <strong>Fuzhou Garden</strong>
              <small>Chinese &amp; Sushi Restaurant</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={t('aria.toggle_nav')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>

          <nav className="site-nav" aria-label={t('aria.primary_nav')}>
            {NAV_IDS.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {t(`nav.${id}`)}
              </a>
            ))}
            <span className="nav-actions">
              <LanguageToggle />
              <a className="nav-call" href="tel:+30210XXXXXXX" onClick={() => setMenuOpen(false)}>
                <PhoneIcon />
                <span>{t('nav.call')}</span>
              </a>
              <a
                className="nav-action"
                href="https://www.instagram.com/fuzhou.garden"
                target="_blank"
                rel="noreferrer"
                aria-label={t('aria.instagram')}
              >
                <InstagramIcon />
              </a>
            </span>
          </nav>
        </header>

        <main id="top">
          <section className="hero section-pad">
            <div className="hero-copy">
              <p className="eyebrow">{t('hero.badge')}</p>
              <h1>{t('hero.title')}</h1>
              <p className="hero-text">{t('hero.description')}</p>
              <div className="hero-actions">
                <a className="button primary" href="#menu">{t('hero.cta_menu')}</a>
                <a className="button secondary" href="#contact">{t('hero.cta_visit')}</a>
              </div>
            </div>
            <div className="hero-visual">
              <WokVisual />
            </div>
          </section>

          <section className="ticker" aria-label={t('aria.specialties')}>
            <div>
              {tickerItems.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </section>

          <section className="about section-pad" id="about">
            <div>
              <p className="eyebrow">{t('about.eyebrow')}</p>
              <h2>{t('about.title')}</h2>
            </div>
            <div className="about-body">
              <p>{t('about.body')}</p>
              <div className="highlight-grid">
                {tr.highlights.map(([title, text]) => (
                  <article className="highlight" key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="menu section-pad" id="menu">
            <div className="section-heading">
              <p className="eyebrow">{t('menu.eyebrow')}</p>
              <h2>{t('menu.title')}</h2>
            </div>
            <div className="menu-shell">
              <div className="tabs" role="tablist" aria-label={t('aria.menu_categories')}>
                {Object.entries(menuCategories).map(([id, cat]) => (
                  <button
                    className={activeCategory === id ? 'active' : ''}
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === id}
                    onClick={() => setActiveCategory(id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="menu-list">
                {activeMenuItems.map(([name, description, price]) => (
                  <article className="menu-card" key={name}>
                    <div>
                      <h3>{name}</h3>
                      <p>{description}</p>
                    </div>
                    <strong>{price}€</strong>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="experience section-pad">
            {tr.experience.map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </section>

          <section className="reviews section-pad" id="reviews">
            <div className="section-heading">
              <p className="eyebrow">{t('reviews.eyebrow')}</p>
              <h2>{t('reviews.title')}</h2>
            </div>
            <div className="review-grid">
              {tr.reviews.items.map(([author, quote]) => (
                <article className="review" key={author}>
                  <div className="stars">★★★★★</div>
                  <p>{quote}</p>
                  <strong>{author}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="contact" id="contact">
            <div className="contact-panel section-pad">
              <p className="eyebrow">{t('contact.eyebrow')}</p>
              <h2>{t('contact.address')}</h2>
              <div className="contact-grid">
                <div>
                  <span>{t('contact.hours_label')}</span>
                  <p>
                    {tr.contact.hours.map((line, i) => (
                      <span key={i}>{line}{i < tr.contact.hours.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
                <div>
                  <span>{t('contact.reserve_label')}</span>
                  <p>
                    <a href="tel:+30210XXXXXXX">{t('contact.call_table')}</a>
                    <br />
                    <a href="https://www.instagram.com/fuzhou.garden" target="_blank" rel="noreferrer">@fuzhou.garden</a>
                  </p>
                </div>
              </div>
              <a
                className="button primary"
                href="https://www.google.com/maps/dir//FUZHOU+GARDEN+%E7%A6%8F%E5%B7%9E+%E8%8A%B1%E5%9B%AD,+Leof.+Agias+Varvaras+60,+Paleo+Faliro+175+63"
                target="_blank"
                rel="noreferrer"
              >
                {t('contact.directions')}
              </a>
            </div>
            <iframe
              title={t('aria.map')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148!2d23.7139632!3d37.9217028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bc2c9e5b0187:0x44c90f58ca6b2cfe!2sFUZHOU%20GARDEN%20%E7%A6%8F%E5%B7%9E%20%E8%8A%B1%E5%9B%AD!5e0!3m2!1sel!2sgr!4v1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-main">
            <a className="footer-brand" href="#top" aria-label={t('aria.brand_home')}>
              <img src="/fuzhou-garden-logo.jpg" alt="" />
              <span>
                <strong>Fuzhou Garden</strong>
                <small>{t('footer.tagline')}</small>
              </span>
            </a>
            <div className="footer-columns">
              <div>
                <span className="footer-label">{t('footer.visit_label')}</span>
                <p>
                  {tr.footer.address.map((line, i) => (
                    <span key={i}>{line}{i < tr.footer.address.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
              <div>
                <span className="footer-label">{t('footer.hours_label')}</span>
                <p>
                  {tr.footer.hours.map((line, i) => (
                    <span key={i}>{line}{i < tr.footer.hours.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
              <div>
                <span className="footer-label">{t('footer.reserve_label')}</span>
                <p>
                  <a href="tel:+30210XXXXXXX">{t('footer.call_table')}</a>
                  <br />
                  <a href="https://www.instagram.com/fuzhou.garden" target="_blank" rel="noreferrer">@fuzhou.garden</a>
                </p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t('footer.copyright')}</span>
            <span>{t('footer.location')}</span>
          </div>
        </footer>

        </div>
      </div>
    </>
  )
}

export default App
