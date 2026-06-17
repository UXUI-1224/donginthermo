'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import type { CertRow } from '@/lib/db'
import Lightbox from '@/components/Lightbox'

const categoryColor: Record<string, string> = {
  International: 'bg-blue-100 text-blue-700',
  Trade:         'bg-green-100 text-green-700',
  Government:    'bg-orange-100 text-orange-700',
  Industry:      'bg-purple-100 text-purple-700',
}

function CertCard({
  cert,
  index,
  visible,
  onClick,
}: {
  cert: CertRow
  index: number
  visible: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-500 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      {/* Image area — 3:4 ratio */}
      <div className="aspect-[3/4] bg-gray-50 group-hover:bg-blue-50 transition-colors flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {cert.img_url ? (
          <img src={cert.img_url} alt={cert.name} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="w-16 h-20 bg-white rounded shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-1.5 mb-3">
              <div className="w-8 h-0.5 bg-gray-200 rounded" />
              <div className="w-10 h-0.5 bg-gray-200 rounded" />
              <div className="w-10 h-0.5 bg-gray-200 rounded" />
              <div className="w-6 h-0.5 bg-gray-200 rounded" />
              <div className="w-8 h-4 bg-blue-100 rounded mt-1" />
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryColor[cert.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {cert.category}
            </span>
          </>
        )}
      </div>
      {/* Name */}
      <div className="px-4 py-3">
        <p className="text-gray-700 text-xs font-medium leading-snug whitespace-pre-line">{cert.name}</p>
      </div>
    </div>
  )
}

export default function CertGrid({ certifications }: { certifications: CertRow[] }) {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Only certs with images are navigable in lightbox
  const withImage = certifications.filter((c) => c.img_url)

  const openLightbox = (cert: CertRow) => {
    const idx = withImage.findIndex((c) => c.id === cert.id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + withImage.length) % withImage.length : null))
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % withImage.length : null))

  const activeCert = lightboxIndex !== null ? withImage[lightboxIndex] : null

  return (
    <>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={headRef}
            className={`mb-16 transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Certifications
            </p>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
              Domestic &amp; International
              <br />
              Certification Status
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                visible={gridIn}
                onClick={() => cert.img_url && openLightbox(cert)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeCert && (
        <Lightbox
          src={activeCert.img_url!}
          alt={activeCert.name}
          onClose={() => setLightboxIndex(null)}
          onPrev={withImage.length > 1 ? prev : undefined}
          onNext={withImage.length > 1 ? next : undefined}
        />
      )}
    </>
  )
}
