import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children, labelledById = 'modal-title' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const onBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={onBackdropMouseDown}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h2 id={labelledById} className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  )
}
