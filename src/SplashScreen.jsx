import { useEffect, useRef } from 'react'

export default function SplashScreen({ logo, name, onComplete }) {
  const overlayRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      document.body.style.overflow = ''
      onComplete()
    }

    let removeTimer
    const fadeTimer = setTimeout(() => {
      const el = overlayRef.current
      if (el) el.style.opacity = '0'
      removeTimer = setTimeout(finish, 600)
    }, 2400)

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
        if (doneRef.current) return
        doneRef.current = true
        document.body.style.overflow = ''
        onComplete()
      }}
    >
      <div style={styles.glow} />
      <div style={styles.glowAccent} />
      <div style={styles.center}>
        <div style={styles.logoWrap}>
          <span style={styles.logoRing} />
          <img src={logo} alt={name} style={styles.logo} />
        </div>
        <p style={styles.name}>{name}</p>
        <p style={styles.tagline}>Chinese &amp; Sushi Restaurant</p>
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
    background: 'radial-gradient(ellipse at center, #0f0a08 0%, #060d08 70%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.6s ease',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: '560px',
    height: '560px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(212,168,53,0.12) 0%, transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'splashGlow 4s ease-in-out infinite',
  },
  glowAccent: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(196,30,58,0.18) 0%, transparent 65%)',
    filter: 'blur(70px)',
    pointerEvents: 'none',
    transform: 'translate(160px, -120px)',
    animation: 'splashGlowB 5s ease-in-out infinite',
  },
  center: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
  },
  logoWrap: {
    position: 'relative',
    width: '140px',
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRing: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '1px solid rgba(212, 168, 53, 0.45)',
    opacity: 0,
    animation:
      'splashRing 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards',
  },
  logo: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow:
      '0 0 0 1px rgba(212, 168, 53, 0.35), 0 18px 50px rgba(0, 0, 0, 0.55)',
    opacity: 0,
    animation:
      'splashLogo 1.0s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards',
  },
  name: {
    margin: 0,
    color: '#e2c97a',
    fontFamily: '"Ampersand Fallback", "GFS Galatea", Georgia, "Times New Roman", serif',
    fontSize: '1.4rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    opacity: 0,
    animation: 'splashFade 0.7s ease 0.95s forwards',
  },
  tagline: {
    margin: 0,
    color: 'rgba(245, 240, 232, 0.6)',
    fontFamily: '"Ampersand Fallback", "GFS Galatea", Georgia, "Times New Roman", serif',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    opacity: 0,
    animation: 'splashFade 0.7s ease 1.25s forwards',
  },
  line: {
    display: 'block',
    height: '1px',
    width: 0,
    background:
      'linear-gradient(90deg, transparent, #d4a835 50%, transparent)',
    opacity: 0,
    marginTop: '4px',
    animation: 'splashLine 0.7s ease 1.55s forwards',
  },
}

const css = `
@keyframes splashLogo {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes splashRing {
  0%   { opacity: 0; transform: scale(0.85); }
  60%  { opacity: 1; transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes splashFade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes splashLine {
  from { width: 0;     opacity: 0; }
  to   { width: 96px;  opacity: 0.85; }
}
@keyframes splashGlow {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
  50%      { transform: translate(0, -10px) scale(1.06); opacity: 0.85; }
}
@keyframes splashGlowB {
  0%, 100% { transform: translate(160px, -120px) scale(1); opacity: 1; }
  50%      { transform: translate(160px, -90px) scale(1.08); opacity: 0.7; }
}
`
