import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navItems = [
  ['about', 'About'],
  ['menu', 'Menu'],
  ['reviews', 'Reviews'],
  ['contact', 'Visit'],
]

const menu = {
  starters: {
    label: 'Starters',
    items: [
      ['Spring Rolls', 'Crisp vegetable rolls, sweet chili, fresh herbs', '6.50'],
      ['Handmade Gyoza', 'Pork, cabbage, ginger, soy dipping sauce', '7.50'],
      ['Fried Wonton', 'Shrimp wonton, plum sauce, sesame', '7.00'],
      ['Fuzhou Salad', 'Lotus root, greens, tofu, toasted sesame dressing', '6.00'],
    ],
  },
  soups: {
    label: 'Soups',
    items: [
      ['Wonton Soup', 'Chicken broth, shrimp wonton, spring onion', '7.00'],
      ['Hot & Sour', 'Tofu, mushroom, egg, black vinegar, white pepper', '6.50'],
      ['Tom Yum Prawns', 'Lemongrass, galangal, chili, lime leaf', '8.00'],
      ['Miso Soup', 'Silken tofu, wakame, scallion', '4.00'],
    ],
  },
  mains: {
    label: 'Mains',
    items: [
      ['Peking Duck', 'Pancakes, cucumber, scallion, hoisin', '22.00'],
      ['Kung Pao Chicken', 'Cashew, pepper, chili, dark soy glaze', '11.50'],
      ['Beef & Broccoli', 'Tender beef, oyster sauce, wok greens', '13.00'],
      ['Mapo Tofu', 'Soft tofu, doubanjiang, aromatic chili oil', '10.00'],
    ],
  },
  noodles: {
    label: 'Noodles & Rice',
    items: [
      ['Chicken Lo Mein', 'Egg noodles, seasonal vegetables, soy', '9.50'],
      ['Special Fried Rice', 'Egg, shrimp, pork, vegetables, scallion', '10.00'],
      ['Pad Thai', 'Rice noodles, prawns, tamarind, peanut', '11.00'],
      ['Fuzhou Ramen', 'Pork broth, noodles, egg, chashu', '12.00'],
    ],
  },
}

const highlights = [
  ['Wok-fired', 'High heat, fast service, deep aroma.'],
  ['Fresh daily', 'Seafood, vegetables, broths and sauces prepared in house.'],
  ['Paleo Faliro', 'Warm dining room on Leof. Agias Varvaras 60.'],
]

const reviews = [
  ['Maria K.', 'The dumplings taste handmade and the wonton soup is exactly what I want on a quiet evening.'],
  ['Nikos P.', 'Consistent food, kind service, and the Peking duck is the table favorite every time.'],
  ['Elena T.', 'Elegant, relaxed, and very fair for the quality. This became our neighborhood Chinese spot.'],
]

function InstagramIcon() {
  return (
    <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" />
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
  return (
    <div className="premium-wok-scene" aria-label="Signature wok presentation">
      <div className="wok-outer-glow" />
      <div className="wok-frame">
        <div className="wok-inner">
          <svg className="premium-wok" viewBox="0 0 520 520" role="img" aria-labelledby="wok-title">
            <title id="wok-title">Premium cast iron wok with rising steam</title>
            <defs>
              <radialGradient id="wokBowlGradient" cx="50%" cy="58%" r="62%">
                <stop offset="0%" stopColor="#050505" />
                <stop offset="38%" stopColor="#1a1a1a" />
                <stop offset="70%" stopColor="#252525" />
                <stop offset="100%" stopColor="#2d2d2d" />
              </radialGradient>
              <radialGradient id="wokDepthGradient" cx="50%" cy="66%" r="47%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.72" />
                <stop offset="45%" stopColor="#0b0b0b" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#2d2d2d" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatGlow" cx="50%" cy="66%" r="34%">
                <stop offset="0%" stopColor="#ff6b2b" stopOpacity="0.22" />
                <stop offset="52%" stopColor="#ff6b2b" stopOpacity="0.11" />
                <stop offset="100%" stopColor="#ff6b2b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rimLacquer" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#cc2200" />
                <stop offset="54%" stopColor="#c0311a" />
                <stop offset="100%" stopColor="#8b1500" />
              </linearGradient>
              <linearGradient id="rimHighlight" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="24%" stopColor="#ffffff" stopOpacity="0.72" />
                <stop offset="56%" stopColor="#d4a835" stopOpacity="0.86" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="handleMetal" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#4b4b4b" />
                <stop offset="55%" stopColor="#181818" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
              <filter id="wokShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="24" stdDeviation="18" floodColor="#000000" floodOpacity="0.48" />
              </filter>
              <filter id="wokTexture" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0.11" />
                </feComponentTransfer>
                <feBlend mode="overlay" in2="SourceGraphic" />
              </filter>
              <filter id="steamBlur">
                <feGaussianBlur stdDeviation="0.45" />
              </filter>
            </defs>

            <g className="wok-steam" filter="url(#steamBlur)">
              <path className="steam-wisp steam-wisp-1" d="M220 222 C195 185 246 157 220 116 C204 91 220 70 238 54" />
              <path className="steam-wisp steam-wisp-2" d="M262 220 C290 183 238 152 270 110 C290 84 278 64 260 44" />
              <path className="steam-wisp steam-wisp-3" d="M303 225 C334 190 287 158 316 122 C338 95 326 75 342 55" />
              <path className="steam-wisp steam-wisp-4" d="M180 236 C158 202 193 176 175 142 C160 113 177 91 194 76" />
            </g>

            <g className="wok-body" filter="url(#wokShadow)">
              <path
                className="wok-handle wok-handle-left"
                d="M74 290 C39 286 22 268 25 244 C28 224 48 214 78 222 C93 226 99 242 93 257 C88 271 83 280 74 290Z"
              />
              <path
                className="wok-handle wok-handle-right"
                d="M446 290 C481 286 498 268 495 244 C492 224 472 214 442 222 C427 226 421 242 427 257 C432 271 437 280 446 290Z"
              />
              <ellipse className="wok-rim-shadow" cx="260" cy="279" rx="187" ry="63" />
              <path className="wok-bowl" d="M78 264 C103 399 171 459 260 459 C349 459 417 399 442 264 C391 309 130 309 78 264Z" />
              <ellipse className="wok-cast-iron" cx="260" cy="264" rx="184" ry="70" />
              <ellipse className="wok-depth" cx="260" cy="278" rx="139" ry="46" />
              <ellipse className="wok-heat" cx="260" cy="306" rx="96" ry="34" />
              <ellipse className="wok-texture" cx="260" cy="276" rx="166" ry="59" filter="url(#wokTexture)" />
              <path className="wok-rim" d="M77 262 C113 214 407 214 443 262 C413 314 107 314 77 262Z" />
              <path className="wok-rim-inner" d="M106 263 C136 236 384 236 414 263 C384 291 136 291 106 263Z" />
              <path className="wok-specular" d="M133 247 C197 219 320 218 387 244" />
              <path className="wok-specular-small" d="M170 282 C217 298 303 300 350 281" />
            </g>
          </svg>
        </div>
      </div>
      <div className="hero-note">
        <span>Wok-fired kitchen</span>
      </div>
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('starters')

  const activeMenu = useMemo(() => menu[activeCategory], [activeCategory])

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

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Fuzhou Garden home">
          <img className="brand-logo" src="/fuzhou-garden-logo.jpg" alt="" />
          <span>
            <strong>Fuzhou Garden</strong>
            <small>Chinese kitchen</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <span className="nav-actions">
            <a className="nav-call" href="tel:+30210XXXXXXX" onClick={() => setMenuOpen(false)}>
              <PhoneIcon />
              <span>Call</span>
            </a>
            <a
              className="nav-action"
              href="https://www.instagram.com/fuzhou.garden"
              target="_blank"
              rel="noreferrer"
              aria-label="Fuzhou Garden on Instagram"
            >
              <InstagramIcon />
            </a>
          </span>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">Paleo Faliro · Athens</p>
            <h1>Premium Chinese dining with a warm neighborhood soul.</h1>
            <p className="hero-text">
              Traditional Fuzhou-inspired cooking, handmade starters, wok classics, and calm hospitality in
              the heart of Paleo Faliro.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#menu">View menu</a>
              <a className="button secondary" href="#contact">Plan a visit</a>
            </div>
          </div>

          <div className="hero-visual">
            <WokVisual />
          </div>
        </section>

        <section className="ticker" aria-label="Restaurant specialties">
          <div>
            <span>Dim sum</span>
            <span>Wonton soup</span>
            <span>Peking duck</span>
            <span>Fresh noodles</span>
            <span>Fried rice</span>
            <span>Kung pao</span>
            <span>Dim sum</span>
            <span>Wonton soup</span>
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div>
            <p className="eyebrow">The house</p>
            <h2>Built for generous tables, clean flavors, and repeat visits.</h2>
          </div>
          <div className="about-body">
            <p>
              Fuzhou Garden brings together polished service and comforting Chinese cooking: fragrant broths,
              crisp textures, balanced sauces, and dishes made to share.
            </p>
            <div className="highlight-grid">
              {highlights.map(([title, text]) => (
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
            <p className="eyebrow">Menu</p>
            <h2>House favorites, edited for easy choosing.</h2>
          </div>

          <div className="menu-shell">
            <div className="tabs" role="tablist" aria-label="Menu categories">
              {Object.entries(menu).map(([id, category]) => (
                <button
                  className={activeCategory === id ? 'active' : ''}
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === id}
                  onClick={() => setActiveCategory(id)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="menu-list">
              {activeMenu.items.map(([name, description, price]) => (
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
          <article>
            <span>01</span>
            <h3>Elegant without feeling stiff.</h3>
            <p>Warm light, calm spacing, and focused content make the page feel more premium on every screen.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Responsive by design.</h3>
            <p>The navigation, menu tabs, cards, and contact area adapt cleanly from desktop to phone.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Fast React structure.</h3>
            <p>Repeated content now comes from arrays, making future menu and copy updates much easier.</p>
          </article>
        </section>

        <section className="reviews section-pad" id="reviews">
          <div className="section-heading">
            <p className="eyebrow">Reviews</p>
            <h2>What guests come back for.</h2>
          </div>
          <div className="review-grid">
            {reviews.map(([author, quote]) => (
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
            <p className="eyebrow">Visit us</p>
            <h2>Leof. Agias Varvaras 60, Paleo Faliro.</h2>
            <div className="contact-grid">
              <div>
                <span>Hours</span>
                <p>Mon-Fri 12:00-23:00<br />Sat 12:00-24:00<br />Sun 12:00-23:00</p>
              </div>
              <div>
                <span>Reserve</span>
                <p><a href="tel:+30210XXXXXXX">Call for a table</a><br /><a href="https://www.instagram.com/fuzhou.garden" target="_blank" rel="noreferrer">@fuzhou.garden</a></p>
              </div>
            </div>
            <a className="button primary" href="https://www.google.com/maps/dir//FUZHOU+GARDEN+%E7%A6%8F%E5%B7%9E+%E8%8A%B1%E5%9B%AD,+Leof.+Agias+Varvaras+60,+Paleo+Faliro+175+63" target="_blank" rel="noreferrer">
              Open directions
            </a>
          </div>
          <iframe
            title="Fuzhou Garden location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148!2d23.7139632!3d37.9217028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bc2c9e5b0187:0x44c90f58ca6b2cfe!2sFUZHOU%20GARDEN%20%E7%A6%8F%E5%B7%9E%20%E8%8A%B1%E5%9B%AD!5e0!3m2!1sel!2sgr!4v1"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="footer-brand" href="#top" aria-label="Fuzhou Garden home">
            <img src="/fuzhou-garden-logo.jpg" alt="" />
            <span>
              <strong>Fuzhou Garden</strong>
              <small>Premium Chinese kitchen</small>
            </span>
          </a>

          <div className="footer-columns">
            <div>
              <span className="footer-label">Visit</span>
              <p>Leof. Agias Varvaras 60<br />Paleo Faliro, Athens</p>
            </div>
            <div>
              <span className="footer-label">Hours</span>
              <p>Mon-Fri 12:00-23:00<br />Sat 12:00-24:00<br />Sun 12:00-23:00</p>
            </div>
            <div>
              <span className="footer-label">Reserve</span>
              <p><a href="tel:+30210XXXXXXX">Call for a table</a><br /><a href="https://www.instagram.com/fuzhou.garden" target="_blank" rel="noreferrer">@fuzhou.garden</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>(c) 2026 Fuzhou Garden</span>
          <span>Paleo Faliro - Athens</span>
        </div>
      </footer>
    </>
  )
}

export default App
