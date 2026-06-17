'use client'

import { useEffect, useCallback } from 'react'

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function Lightbox({ src, alt, onClose, onPrev, onNext }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev?.()
    if (e.key === 'ArrowRight') onNext?.()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image frame */}
      <div
        className="relative z-10 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', maxWidth: '90vw' }}
      >
        <div
          className="bg-white rounded-md shadow-2xl p-3 md:p-4"
          style={{ maxHeight: '85vh', maxWidth: '85vw' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block rounded object-contain"
            style={{ maxHeight: 'calc(85vh - 2rem)', maxWidth: 'calc(85vw - 2rem)' }}
          />
        </div>
        {alt && (
          <p className="mt-3 text-white/70 text-sm font-medium text-center px-4">{alt}</p>
        )}
      </div>

      {/* Next button */}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
