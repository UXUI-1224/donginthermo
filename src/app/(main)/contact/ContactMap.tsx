'use client'

import { useEffect, useRef } from 'react'

const CENTER = { lat: 37.61169807202707, lng: 126.6324142773692 }

const MAP_STYLES = [
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
]

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = (window as any).google

    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const google = (window as any).google
      if (!containerRef.current || !google) return
      const map = new google.maps.Map(containerRef.current, {
        center: CENTER,
        zoom: 16,
        styles: MAP_STYLES,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })
      new google.maps.Marker({
        position: CENTER,
        map,
        title: 'DONGINTHERMO CO., LTD.',
      })
    }

    if (g) {
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

  return <div ref={containerRef} className="w-full h-full" />
}
