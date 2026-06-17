'use client'

import { useInView } from '@/hooks/useInView'
import CountUp from '@/components/CountUp'

const rdStats = [
  { target: 6,  suffix: '',  label: 'R&D Personnel' },
  { target: 12, suffix: '%', label: 'of Total Workforce' },
  { target: 64, suffix: '%', label: "Bachelor's Degree or Higher" },
  { target: 34, suffix: '%', label: 'of Workforce with Engineering Background' },
]

export default function RDPage() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: textRef, inView: textIn } = useInView()
  const { ref: statsRef, inView: statsIn } = useInView()

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-16 transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">R&D Status</p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">Research &amp; Development</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div
            ref={textRef}
            className={`transition-all duration-700 delay-100 ${textIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
          >
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              Donginthermo operates a dedicated in-house research institute focused on advancing
              transport refrigeration technology. Our engineering team continuously develops
              more efficient, reliable, and environmentally compatible refrigeration systems
              for next-generation commercial vehicles.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              Current R&D focus areas include EV battery-driven refrigeration systems, improved
              thermal efficiency, multi-refrigerant compatibility, and reducing noise and vibration
              in vehicle-mounted units.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {rdStats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-blue-50 rounded-lg p-7 transition-all duration-500 ${statsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  <CountUp target={s.target} suffix={s.suffix} />
                </p>
                <p className="text-gray-500 text-sm leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
