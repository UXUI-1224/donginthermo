'use client'

import Link from 'next/link'
import { useInView } from '@/hooks/useInView'
import { categoryMeta, type CategoryId, type Product } from '@/data/products'

function Breadcrumb({ category, productName }: { category: CategoryId; productName: string }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
      <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
      <span>/</span>
      <Link href={`/products/${category}`} className="hover:text-blue-500 transition-colors capitalize">
        {categoryMeta[category].label}
      </Link>
      <span>/</span>
      <span className="text-gray-700 font-medium">{productName}</span>
    </nav>
  )
}

export default function ProductDetailClient({
  product,
  siblings,
}: {
  product: Product
  siblings: Product[]
}) {
  const { ref: imageRef, inView: imageIn } = useInView()
  const { ref: contentRef, inView: contentIn } = useInView()
  const { ref: perfRef, inView: perfIn } = useInView()

  const category = product.category as CategoryId
  const hasMode = product.performance.some((p) => p.mode)

  return (
    <>
      {/* ── Hero strip ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Breadcrumb category={category} productName={product.name} />
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {categoryMeta[category].label}
          </p>
          <h1 className="text-gray-900 text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-base mt-3 max-w-lg">{product.tagline}</p>
        </div>
      </section>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Product image */}
            <div
              ref={imageRef}
              className={`transition-all duration-700 ${imageIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            >
              <div className="aspect-[4/3] bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                {product.imgUrl ? (
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-300">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11m0 0L4 7" />
                    </svg>
                    <span className="text-xs tracking-widest uppercase">Product Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Specs + Features */}
            <div
              ref={contentRef}
              className={`transition-all duration-700 delay-100 ${contentIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            >
              {product.specs.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-gray-900 text-lg font-bold mb-4">Specifications</h2>
                  <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
                    {product.specs.map((s) => (
                      <div key={s.label} className="flex items-center px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors">
                        <span className="text-gray-500 text-sm w-1/2 shrink-0">{s.label}</span>
                        <span className="text-gray-900 text-sm font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.features.length > 0 && (
                <div>
                  <h2 className="text-gray-900 text-lg font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <svg className="w-2.5 h-2.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Performance Table ──────────────────────────────────────────────── */}
      {product.performance.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div
              ref={perfRef}
              className={`transition-all duration-700 ${perfIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Performance
              </p>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-2">
                Cooling Capacity
              </h2>
              {product.performanceNote && (
                <p className="text-gray-400 text-sm mb-8">{product.performanceNote}</p>
              )}

              <div className="rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-3 sm:px-5 py-3 sm:py-3.5 text-left font-semibold">Cargo Temp.</th>
                      {hasMode && <th className="px-3 sm:px-5 py-3 sm:py-3.5 text-left font-semibold">Mode</th>}
                      <th className="px-3 sm:px-5 py-3 sm:py-3.5 text-right font-semibold">Watts</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-3.5 text-right font-semibold">kcal/h</th>
                      <th className="px-3 sm:px-5 py-3 sm:py-3.5 text-right font-semibold">BTU/h</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.performance.map((row, i) => (
                      <tr key={i} className="bg-white hover:bg-blue-50 transition-colors">
                        <td className="px-3 sm:px-5 py-3 sm:py-3.5 font-medium text-gray-900">{row.temp}</td>
                        {hasMode && (
                          <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-gray-500">
                            {row.mode && (
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                row.mode === 'ESC'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {row.mode}
                              </span>
                            )}
                          </td>
                        )}
                        <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-right text-gray-700">{row.watts}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-right text-gray-700">{row.kcal}</td>
                        <td className="px-3 sm:px-5 py-3 sm:py-3.5 text-right text-gray-700">{row.btu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related Products ──────────────────────────────────────────────── */}
      {siblings.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h2 className="text-gray-900 text-2xl font-bold mb-8">
              Other {categoryMeta[category].label} Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {siblings.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.category}/${p.id}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors duration-300">
                    {p.imgUrl ? (
                      <img src={p.imgUrl} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11m0 0L4 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold text-sm">{p.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">{p.tagline}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href={`/products/${category}`}
                className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:gap-3 transition-all duration-200"
              >
                ← Back to {categoryMeta[category].label} Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
