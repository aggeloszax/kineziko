import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from '/fuzhou-garden-logo.jpg'
import { useLanguage } from './context/LanguageContext'
import LanguageToggle from './components/LanguageToggle'
import SplashScreen from './SplashScreen'

// Clean up any persisted splash flags so it always plays on refresh
try {
  ;['splash_seen', 'fz_splash_seen', 'fz_splash_seen_v2', 'fz_splash_seen_v3'].forEach((k) => {
    localStorage.removeItem(k)
    sessionStorage.removeItem(k)
  })
} catch {}

const NAV_IDS = ['about', 'buffet', 'visit']
const PHONE_TEL = 'tel:2109889688'
const MAPS_URL =
  'https://maps.google.com/?q=Λεωφ.+Αγίας+Βαρβάρας+60,+Παλαιό+Φάληρο'
const MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148!2d23.7139632!3d37.9217028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bc2c9e5b0187:0x44c90f58ca6b2cfe!2sFUZHOU%20GARDEN%20%E7%A6%8F%E5%B7%9E%20%E8%8A%B1%E5%9B%AD!5e0!3m2!1sel!2sgr!4v1'

function PhoneIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.05 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function App() {
  const { t, tr, fading } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const rootRef = useRef(null)

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

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const targets = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {!splashDone && (
        <SplashScreen
          logo={logo}
          name="Fuzhou Garden"
          onComplete={() => setSplashDone(true)}
        />
      )}
    <div
      ref={rootRef}
      className="page"
      style={{
        opacity: !splashDone ? 0 : (fading ? 0.4 : 1),
        transition: 'opacity 500ms ease',
      }}
    >
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a
            className="brand"
            href="#top"
            aria-label={t('aria.brand')}
            onClick={() => setMenuOpen(false)}
          >
            <img className="brand-logo" src={logo} alt="" />
            <span className="brand-text">
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
            <span />
          </button>

          <nav className="nav" aria-label={t('aria.primary_nav')}>
            <ul className="nav-list">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-drawer-actions">
              <LanguageToggle />
              <a
                className="btn btn-primary nav-drawer-call"
                href={PHONE_TEL}
                onClick={() => setMenuOpen(false)}
              >
                <PhoneIcon />
                <span>{t('nav.call')}</span>
              </a>
            </div>
          </nav>

          <div className="nav-actions">
            <LanguageToggle />
            <a
              className="btn btn-call"
              href={PHONE_TEL}
              onClick={() => setMenuOpen(false)}
            >
              <PhoneIcon />
              <span>{t('nav.call')}</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-pattern" />
            <div className="hero-vignette" />
            <span className="hero-glyph hero-glyph-1">福</span>
            <span className="hero-glyph hero-glyph-2">福</span>
          </div>
          <div className="hero-inner reveal">
            <p className="eyebrow eyebrow-gold">{t('hero.eyebrow')}</p>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#buffet">
                <span>{t('hero.cta_buffet')}</span>
                <ChevronIcon />
              </a>
              <a className="btn btn-outline" href={PHONE_TEL}>
                <PhoneIcon />
                <span>{t('hero.cta_reserve')}</span>
              </a>
            </div>
          </div>
          <a
            href="#about"
            className="hero-scroll"
            aria-label={t('aria.scroll')}
          >
            <span />
            <span />
            <span />
          </a>
        </section>

        <section className="about section" id="about">
          <div className="about-inner">
            <div className="about-left reveal">
              <p className="eyebrow">{t('about.eyebrow')}</p>
              <h2 className="about-title">{t('about.title')}</h2>
              <div className="ornament" aria-hidden="true">
                <span className="ornament-line" />
                <span className="ornament-mark">福</span>
                <span className="ornament-line" />
              </div>
            </div>
            <div
              className="about-right reveal"
              style={{ '--reveal-delay': '120ms' }}
            >
              {tr.about.paragraphs.map((p, i) => (
                <p key={i} className="about-paragraph">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="buffet section" id="buffet">
          <div className="buffet-inner">
            <div className="section-heading section-heading-compact reveal">
              <p className="eyebrow eyebrow-gold">{t('buffet.eyebrow')}</p>
            </div>

            <div className="buffet-grid">
              {tr.buffet.cards.map((card, i) => (
                <article
                  key={card.id}
                  className="buffet-card reveal"
                  style={{ '--reveal-delay': `${i * 100}ms` }}
                >
                  <header className="buffet-card-header">
                    <h3 className="buffet-days">{card.days}</h3>
                    <p className="buffet-hours">
                      <ClockIcon />
                      <span>{card.hours}</span>
                    </p>
                  </header>

                  <div className="buffet-slots">
                    <span className="buffet-slots-label">
                      {t('buffet.slots_label')}
                    </span>
                    <div className="buffet-slots-list">
                      {card.slots.map((slot) => (
                        <span key={slot} className="buffet-slot">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="buffet-prices">
                    <div className="buffet-price-row">
                      <span className="buffet-price-label">
                        {t('buffet.adult_label')}
                      </span>
                      <strong className="buffet-price-adult">
                        {card.adult}
                        <span>€</span>
                      </strong>
                    </div>
                    <div className="buffet-price-row buffet-price-row-child">
                      <span className="buffet-price-label">
                        {t('buffet.child_label')}
                      </span>
                      <strong className="buffet-price-child">
                        {card.child}
                        <span>€</span>
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="buffet-closed reveal">{t('buffet.closed_note')}</p>
            <p className="buffet-disclaimer reveal">
              {t('buffet.disclaimer')}
            </p>

            <div className="buffet-cta reveal">
              <a
                className="btn btn-primary btn-large"
                href={PHONE_TEL}
                aria-label={t('buffet.cta_aria')}
              >
                <PhoneIcon />
                <span>{t('buffet.cta')}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="visit section" id="visit">
          <div className="visit-inner">
            <div className="visit-info reveal">
              <p className="eyebrow eyebrow-gold">{t('visit.eyebrow')}</p>
              <h2 className="section-title">{t('visit.title')}</h2>

              <div className="visit-details">
                <div className="visit-detail">
                  <span className="visit-detail-label">
                    {t('visit.address_label')}
                  </span>
                  <p>
                    {tr.visit.address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < tr.visit.address.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="visit-detail">
                  <span className="visit-detail-label">
                    {t('visit.phone_label')}
                  </span>
                  <p>
                    <a href={PHONE_TEL}>{t('visit.phone')}</a>
                  </p>
                </div>
                <div className="visit-detail">
                  <span className="visit-detail-label">
                    {t('visit.hours_label')}
                  </span>
                  <p>
                    {tr.visit.hours.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < tr.visit.hours.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <a
                className="btn btn-outline btn-large"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <MapPinIcon />
                <span>{t('visit.directions')}</span>
              </a>
            </div>

            <div
              className="visit-map reveal"
              style={{ '--reveal-delay': '160ms' }}
            >
              <iframe
                title={t('aria.map')}
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#top" aria-label={t('aria.brand')}>
            <img src={logo} alt="" />
            <span>
              <strong>Fuzhou Garden</strong>
              <small>{t('footer.tagline')}</small>
            </span>
          </a>
          <nav className="footer-links" aria-label="Footer navigation">
            {NAV_IDS.map((id) => (
              <a key={id} href={`#${id}`}>
                {t(`nav.${id}`)}
              </a>
            ))}
            <a href={PHONE_TEL}>{t('nav.call')}</a>
          </nav>
          <div className="footer-copy">{t('footer.copyright')}</div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
