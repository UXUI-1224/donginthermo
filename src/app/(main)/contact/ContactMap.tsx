'use client'

import { useEffect, useRef } from 'react'

const CENTER = { lat: 37.61169807202707, lng: 126.6324142773692 }

const MAP_STYLES = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
]

const PIN_SVG = `
  <svg width="22" height="32" viewBox="0 0 22 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 21 11 21s11-12.75 11-21C22 4.925 17.075 0 11 0z" fill="#EA4335"/>
    <circle cx="11" cy="11" r="4.5" fill="white"/>
  </svg>
`

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const google = (window as any).google
      if (!containerRef.current || !google) return

      const map = new google.maps.Map(containerRef.current, {
        center: CENTER,
        zoom: 18,
        styles: MAP_STYLES,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })

      // Custom OverlayView: pin + label (no bubble)
      class PinLabel extends google.maps.OverlayView {
        private el: HTMLDivElement | null = null

        onAdd() {
          this.el = document.createElement('div')
          this.el.style.cssText = 'position:absolute;display:flex;align-items:flex-start;gap:6px;pointer-events:none;'
          this.el.innerHTML = `
            ${PIN_SVG}
            <span style="font-size:16px;font-weight:700;color:#EA4335;margin-top:2px;white-space:nowrap;text-shadow:0 1px 3px rgba(255,255,255,0.9),0 0 6px rgba(255,255,255,0.9);">
              DONGINTHERMO CO., LTD.
            </span>
          `
          this.getPanes().overlayLayer.appendChild(this.el)
        }

        draw() {
          if (!this.el) return
          const point = this.getProjection().fromLatLngToDivPixel(
            new google.maps.LatLng(CENTER.lat, CENTER.lng)
          )
          if (!point) return
          // pin tip anchored to coordinate
          this.el.style.left = `${point.x}px`
          this.el.style.top = `${point.y - 32}px`
        }

        onRemove() {
          this.el?.remove()
          this.el = null
        }
      }

      const overlay = new PinLabel()
      overlay.setMap(map)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).google) {
      initMap()
      return
    }

    const existingScript = document.getElementById('gmap-script')
    if (existingScript) {
      existingScript.addEventListener('load', initMap)
      return () => existingScript.removeEventListener('load', initMap)
    }

    const script = document.createElement('script')
    script.id = 'gmap-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=en`
    script.async = true
    script.addEventListener('load', initMap)
    document.head.appendChild(script)
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Custom info card */}
      <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md px-4 py-3 max-w-[240px] pointer-events-none">
        <p className="text-[16px] font-bold text-gray-900 leading-snug">
          DONGINTHERMO CO., LTD.
        </p>
        <p className="text-[14px] text-gray-500 leading-relaxed mt-1">
          (22648) <br /> Bonghwa-ro 223 beonan-gil,<br />
          Seo-gu, Incheon, Korea
        </p>
      </div>
    </div>
  )
}
