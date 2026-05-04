import { useEffect, useRef } from 'react'

export const SPLASH_KEY = 'fz_splash_seen_v3'

export default function SplashScreen({ logo, name, onComplete }) {
  const overlayRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    console.log('[Splash] mounted')
    document.body.style.overflow = 'hidden'

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      console.log('[Splash] finishing, persisting flag')
      try {
        localStorage.setItem(SPLASH_KEY, '1')
      } catch {}
      document.body.style.overflow = ''
      onComplete()
    }

    let removeTimer
    const fadeTimer = setTimeout(() => {
      const el = overlayRef.current
      if (el) el.style.opacity = '0'
      removeTimer = setTimeout(finish, 500)
    }, 2200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={styles.overlay}
      onClick={() => {
        // Allow user to skip by clicking
        if (doneRef.current) return
        doneRef.current = true
        try {
          localStorage.setItem(SPLASH_KEY, '1')
        } catch {}
        document.body.style.overflow = ''
        onComplete()
      }}
    >
      <div style={styles.glow} />
      <div style={styles.center}>
        <img src={logo} alt={name} style={styles.logo} />
        <p style={styles.name}>{name}</p>
        <span style={styles.line} />
      </div>
      <style>{css}</style>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    background: '#060d08',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.5s ease',
    cursor: 'pointer',
  },
  glow: {
    position: 'absolute',
    width: '480px',
    height: '480px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(212,168,53,0.08) 0%, transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  center: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  logo: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    opacity: 0,
    animation:
      'splashLogo 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards',
  },
  name: {
    margin: 0,
    color: '#d4a835',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '0.82rem',
    fontWeight: 400,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    opacity: 0,
    animation: 'splashFade 0.6s ease 0.8s forwards',
  },
  line: {
    display: 'block',
    height: '1px',
    width: 0,
    background: '#d4a835',
    opacity: 0.6,
    animation: 'splashLine 0.5s ease 1.1s forwards',
  },
}

const css = `
@keyframes splashLogo {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes splashFade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes splashLine {
  from { width: 0;    opacity: 0; }
  to   { width: 60px; opacity: 0.6; }
}
`
