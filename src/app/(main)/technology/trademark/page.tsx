'use client'

import dynamic from 'next/dynamic'
import { useInView } from '@/hooks/useInView'
import CountUp from '@/components/CountUp'

const TrademarkMap = dynamic(() => import('@/components/TrademarkMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[440px] bg-gray-50 rounded-xl border border-gray-100 animate-pulse" />
  ),
})

export default function TrademarkPage() {
  const { ref: headRef, inView: headIn } = useInView()

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-12 transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Trademark
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full">
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
              Overseas Trademark
              <br />
              Registration Status
            </h2>
            <p className="text-blue-600 text-5xl font-bold sm:mb-1 shrink-0">
              <CountUp target={12} /><span className="text-2xl ml-1 text-gray-400">countries</span>
            </p>
          </div>
        </div>

        <TrademarkMap />
      </div>
    </div>
  )
}
