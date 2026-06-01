import Link from 'next/link'

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
// VIDEO PLACEHOLDER
// To replace with a real video:
//   1. Upload your video file to Supabase Storage
//      → Supabase Dashboard > Storage > Create bucket (e.g. "assets") > Upload file
//      → Set bucket to "Public" to get a public URL
//   2. Copy the public URL (looks like: https://<project>.supabase.co/storage/v1/object/public/assets/hero.mp4)
//   3. Add  src="<paste URL here>"  to the <video> element below
//   4. You can then remove or reduce the opacity of the gradient overlay div
// ---------------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-blue-900">
      {/* Video — swap src="" with Supabase public URL when ready */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src=""
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-xl">
          <p className="text-blue-300 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Transport Refrigeration Technology
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Keeping Cold
            <br />
            on Every Road.
          </h1>
          <p className="text-blue-100/70 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
            Donginthermo delivers market-leading refrigeration solutions for commercial
            vehicles, trusted by logistics companies worldwide.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/products/van"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm tracking-wide px-7 py-3.5 transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
  { value: '20+', label: 'Years of Experience' },
  { value: '30+', label: 'Product Models' },
  { value: '6', label: 'Language Markets' },
  { value: '100+', label: 'Partner Companies' },
]

function CompanySection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <p className="text-blue-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              About Donginthermo
            </p>
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
          <div className="grid grid-cols-2 gap-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="bg-blue-50 p-8 rounded-lg">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
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
// TODO: Replace placeholder milestones with real company history
const milestones = [
  { year: '2000', title: 'Company Founded', desc: 'Donginthermo established in Incheon, Korea, with a focus on transport refrigeration.' },
  { year: '2005', title: 'First Product Line', desc: 'Launched the DM-050 series for small commercial delivery vehicles.' },
  { year: '2010', title: 'International Expansion', desc: 'Began exporting products to Southeast Asian and Middle Eastern markets.' },
  { year: '2015', title: 'Diesel Engine Series', desc: 'Introduced the DS-series high-capacity diesel engine-driven refrigeration units.' },
  { year: '2020', title: 'EV Technology R&D', desc: 'Launched research and development program for EV battery-driven refrigeration systems.' },
  { year: '2024', title: 'Global Market Presence', desc: 'Products and documentation available in six languages for international customers.' },
]

function HistorySection() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <p className="text-blue-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Company History
          </p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">Our Journey</h2>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-100 space-y-10">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              {/* Dot */}
              <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-gray-50" />

              <div className="flex items-baseline gap-4 mb-1">
                <span className="text-blue-500 text-sm font-bold tabular-nums">{m.year}</span>
                <span className="text-gray-900 font-semibold">{m.title}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-[4.5rem]">{m.desc}</p>
            </div>
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
  { count: '15+', label: 'Patents Registered' },
  { count: '8+', label: 'Utility Models' },
  { count: '10+', label: 'Certifications' },
  { count: '3+', label: 'International Standards' },
]

function IPSection() {
  return (
    <section className="py-28 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-blue-200 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Intellectual Property
            </p>
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
          <div className="grid grid-cols-2 gap-4">
            {ipItems.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 border border-white/10 rounded-lg p-8"
              >
                <p className="text-4xl font-bold text-white mb-2">{item.count}</p>
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
const products = [
  {
    code: 'VAN',
    href: '/products/van',
    title: 'Van Type',
    desc: 'Compact rooftop refrigeration units engineered for van-type delivery vehicles.',
  },
  {
    code: 'NOSE',
    href: '/products/nose',
    title: 'Nose Mount',
    desc: 'High-capacity front-mounted units for medium and large refrigerated trucks.',
  },
  {
    code: 'ESC',
    href: '/products/esc',
    title: 'Electric Standby',
    desc: 'Hybrid systems with electric standby connection for all-day temperature control.',
  },
  {
    code: 'SUB',
    href: '/products/sub',
    title: 'Sub-Zero',
    desc: 'Deep-freeze capable units for pharmaceuticals and specialty cold chain transport.',
  },
]

function ProductsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-blue-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Our Products
            </p>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
              Solutions by Category
            </h2>
          </div>
          <Link
            href="/products/van"
            className="hidden md:inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link
              key={p.code}
              href={p.href}
              className="group block bg-gray-50 hover:bg-blue-600 rounded-lg p-8 transition-all duration-300"
            >
              <div className="w-11 h-11 bg-blue-100 group-hover:bg-blue-500 rounded-md flex items-center justify-center mb-6 transition-colors">
                <span className="text-blue-600 group-hover:text-white text-[10px] font-bold tracking-widest">
                  {p.code}
                </span>
              </div>
              <p className="text-gray-900 group-hover:text-white font-semibold text-lg mb-2 transition-colors">
                {p.title}
              </p>
              <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">
                {p.desc}
              </p>
              <div className="mt-6 flex items-center gap-1 text-blue-500 group-hover:text-blue-200 text-sm font-medium transition-colors">
                Learn More
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      <HeroSection />
      <CompanySection />
      <HistorySection />
      <IPSection />
      <ProductsSection />
    </>
  )
}
