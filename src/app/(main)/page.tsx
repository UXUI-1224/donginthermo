'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from '@/hooks/useInView'

// ---------------------------------------------------------------------------
// CountUp — animates a number from 0 to `target` when `active` is true
// ---------------------------------------------------------------------------
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView<HTMLSpanElement>()
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 1400
    const steps = 60
    const interval = duration / steps
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
// VIDEO PLACEHOLDER
// To replace with a real video:
//   1. Supabase Dashboard → Storage → Create bucket (e.g. "assets", Public)
//   2. Upload your video file
//   3. Copy the public URL:
//      https://<project-id>.supabase.co/storage/v1/object/public/assets/hero.mp4
//   4. Add  src="<paste URL here>"  to the <video> element below
//   5. Remove or reduce opacity of the gradient overlay once video is in place
// ---------------------------------------------------------------------------
function HeroSection({ videoUrl }: { videoUrl: string }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-blue-900">
      {videoUrl && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <iframe
            src={videoUrl}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'max(100%, calc(100vh * 16 / 9))',                                                            
              height: 'max(100%, calc(100vw * 9 / 16))',                                                           
              transform: 'translate(-50%, -50%) scale(1.4)', // Scale up to cover letterboxing on wider screens
              border: 'none',
            }}
            allow="autoplay; fullscreen"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent" />
      
      {/* Content — entrance animation on mount */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <h1
            className={`text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Keeping Cold
            <br />
            on Every Road.
          </h1>
          <p
            className={`text-blue-100/70 text-base lg:text-lg leading-relaxed mb-10 max-w-md transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Donginthermo delivers market-leading refrigeration solutions for commercial
            vehicles, trusted by logistics companies worldwide.
          </p>
          <div
            className={`flex items-center gap-6 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              href="/about"
              className="inline-block bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-medium text-sm tracking-wide px-7 py-3.5 transition-all duration-200"
            >
              About Us
            </Link>
          </div>
        </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Company Intro Section
// ---------------------------------------------------------------------------
const companyStats = [
  { value: 20, suffix: '+', label: 'Years of Experience' },
  { value: 30, suffix: '+', label: 'Product Models' },
  { value: 6, suffix: '', label: 'Language Markets' },
  { value: 100, suffix: '+', label: 'Partner Companies' },
]

function CompanySection() {
  const { ref: textRef, inView: textIn } = useInView()
  const { ref: statsRef, inView: statsIn } = useInView()

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight mb-6">
              A Specialist in
              <br />
              Transport Refrigeration
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              Donginthermo is a leading manufacturer of transport refrigeration and
              air-conditioning systems for commercial vehicles. With decades of engineering
              expertise, we serve logistics, food delivery, and specialized transport
              sectors across Korea and international markets.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              Our product line covers van-type, diesel engine-driven, and EV-compatible
              refrigeration units — built to operate reliably in the most demanding
              conditions.
            </p>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-4"
          >
            {companyStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-blue-50 p-6 sm:p-8 rounded-lg transition-all duration-500 ${
                  statsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: statsIn ? `${i * 80}ms` : '0ms' }}
              >
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// History Section
// ---------------------------------------------------------------------------
const milestones = [
  { date: '2022. 04', title: 'Acquired ATP certificate', founded: false },
  { date: '2012. 05', title: 'R&D center established', founded: false },
  { date: '2010. 01', title: 'CE certified', founded: false },
  { date: '2001. 07', title: 'ISO 9001 certified, TopCold brand launched', founded: false },
  { date: '2000. 03', title: "KIA Motor Co., Ltd.'s OEM supplier", founded: false },
  { date: '1989. 04', title: 'DONGIN THERMO CO., LTD. established', founded: true },
]

function HistoryItem({ milestone, index }: { milestone: typeof milestones[number]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-600 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Dot */}
      <div
        className={`absolute -left-[31px] top-1.5 rounded-full ring-4 ring-gray-50 transition-all duration-500 ${
          milestone.founded
            ? 'w-4 h-4 -left-[33px] bg-blue-600 ring-blue-100 scale-100'
            : inView ? 'w-3 h-3 bg-blue-400 scale-100' : 'w-3 h-3 bg-blue-200 scale-75'
        }`}
        style={{ transitionDelay: `${index * 60 + 200}ms` }}
      />
      <div className="flex items-baseline gap-4">
        <span className={`text-sm font-bold tabular-nums shrink-0 ${milestone.founded ? 'text-blue-600' : 'text-blue-400'}`}>
          {milestone.date}
        </span>
        <span className={`leading-relaxed ${milestone.founded ? 'text-gray-900 font-bold text-base' : 'text-gray-700 font-medium text-sm'}`}>
          {milestone.title}
        </span>
      </div>
    </div>
  )
}

function HistorySection() {
  const { ref: headRef, inView: headIn } = useInView()

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-8 transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">Our Journey</h2>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-100 space-y-10">
          {milestones.map((m, i) => (
            <HistoryItem key={m.date} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Intellectual Property Section
// ---------------------------------------------------------------------------
// TODO: Replace with real IP numbers
const ipItems = [
  { count: 15, suffix: '+', label: 'Patents Registered' },
  { count: 8, suffix: '+', label: 'Utility Models' },
  { count: 10, suffix: '+', label: 'Certifications' },
  { count: 3, suffix: '+', label: 'International Standards' },
]

function IPSection() {
  const { ref: textRef, inView: textIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()

  return (
    <section className="py-28 bg-blue-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
              Technology
              <br />
              Protected and Proven
            </h2>
            <p className="text-blue-100/80 text-base leading-relaxed">
              Donginthermo&apos;s proprietary technologies are backed by a robust portfolio of
              patents, utility models, and international certifications — ensuring quality
              and reliability you can depend on.
            </p>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4"
          >
            {ipItems.map((item, i) => (
              <div
                key={item.label}
                className={`bg-white/10 border border-white/10 rounded-lg p-6 sm:p-8 hover:bg-white/20 transition-all duration-500 ${
                  gridIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-4xl font-bold text-white mb-2">
                  <CountUp target={item.count} suffix={item.suffix} />
                </p>
                <p className="text-blue-200 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Products Section
// ---------------------------------------------------------------------------
const PRODUCT_CATEGORIES = [
  { code: 'VAN',  href: '/products/van',  title: 'Van Type',  settingKey: 'product_van_img_url' },
  { code: 'NOSE', href: '/products/nose', title: 'Nose Type', settingKey: 'product_nose_img_url' },
  { code: 'ESC',  href: '/products/esc',  title: 'ESC Type',  settingKey: 'product_esc_img_url' },
  { code: 'SUB',  href: '/products/sub',  title: 'Sub Type',  settingKey: 'product_sub_img_url' },
]

function ProductsSection({ categoryImages }: { categoryImages: Record<string, string> }) {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`flex items-end justify-between mb-8 transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
              Our Solutions & Products
            </h2>
          </div>
          <Link
            href="/products/van"
            className="hidden md:inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors group"
          >
            View All
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PRODUCT_CATEGORIES.map((p, i) => {
            const imgUrl = categoryImages[p.settingKey] ?? ''
            return (
            <Link
              key={p.code}
              href={p.href}
              className={`group relative block rounded-xl overflow-hidden aspect-[3/4] transition-all duration-500 ${
                gridIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Background image */}
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-blue-900" />
              )}

              {/* Dim overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-white/0 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                {/* Title + arrow */}
                <div className="flex items-center justify-between">
                  <p className="text-black group-hover:text-blue-600 text-xl font-bold leading-tight">{p.title}</p>
                  <div className="w-8 h-8 rounded-full bg-black/10 group-hover:bg-blue-600 group-hover:translate-x-1 transition-transform duration-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CTA Banner Section  (based on Figma node 2:2)
// ---------------------------------------------------------------------------
function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-16 px-6 lg:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-10 py-20 text-center transition-all duration-700 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-blue-900 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Ready to upgrade
              <br />
              your cold chain?
            </h2>
            <p className="text-blue-700/70 text-base leading-relaxed max-w-md mx-auto mb-10">
              Contact Donginthermo to find the right refrigeration solution for your fleet.
              Our engineers are ready to help.
            </p>
            <Link
              href="/products/van"
              className="inline-flex items-center gap-2 border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-medium text-sm tracking-wide px-8 py-3.5 rounded-full transition-all duration-200 group"
            >
              View Products
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Home() {
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  return (
    <>
      <HeroSection videoUrl={settings.hero_video_url ?? ''} />
      <CompanySection />
      <HistorySection />
      <IPSection />
      <ProductsSection categoryImages={settings} />
      <CTASection />
    </>
  )
}
