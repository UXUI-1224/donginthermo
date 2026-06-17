'use client'

import { useInView } from '@/hooks/useInView'
import CountUp from '@/components/CountUp'

const ipStats = [
  { target: 7,  label: 'Patents',            sub: 'Registered' },
  { target: 62, label: 'Design Rights',       sub: 'Registered' },
  { target: 24, label: 'Overseas Trademarks', sub: 'Registered' },
  { target: 5,  label: 'Domestic Trademarks', sub: 'Registered' },
  { target: 6,  label: 'IP Rights',           sub: 'Registered' },
]

export default function IPPage() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-16 transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Intellectual Property
          </p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
            Intellectual Property
            <br />
            Rights Status
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {ipStats.map((s, i) => (
            <div
              key={s.label}
              className={`bg-white rounded-xl border border-gray-100 p-7 text-center transition-all duration-500 hover:border-blue-200 hover:shadow-sm ${gridIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <p className="text-4xl font-bold text-blue-600 mb-1">
                <CountUp target={s.target} />
              </p>
              <p className="text-gray-800 text-sm font-semibold mb-1">{s.label}</p>
              <p className="text-gray-400 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
