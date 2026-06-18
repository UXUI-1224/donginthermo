'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const technologyLinks = [
  { label: 'R&D Status',           href: '/technology/rd' },
  { label: 'Intellectual Property', href: '/technology/ip' },
  { label: 'Certifications',        href: '/technology/cert' },
  { label: 'Trademark',             href: '/technology/trademark' },
]

const productLinks = [
  { label: 'VAN',  href: '/products/van' },
  { label: 'NOSE', href: '/products/nose' },
  { label: 'ESC',  href: '/products/esc' },
  { label: 'SUB',  href: '/products/sub' },
]

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 mt-px transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function GNB() {
  const [scrolled, setScrolled] = useState(false)
  const [techOpen, setTechOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTechOpen, setMobileTechOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const transparent = isHome && !scrolled && !mobileOpen

  const btnCls = `flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
    transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-blue-600'
  }`

  const dropdownCls = (open: boolean) =>
    `absolute top-full right-0 pt-2 min-w-[200px] transition-all duration-200 origin-top ${
      open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
    }`

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-transparent'
            : 'bg-white backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`font-bold text-sm tracking-[0.2em] transition-colors ${
                transparent ? 'text-white' : 'text-blue-900'
              }`}
            >
              DONGINTHERMO
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">

              {/* About */}
              <Link
                href="/about"
                className={`text-sm font-medium tracking-wide transition-colors ${
                  transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                About
              </Link>

              {/* Technology Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTechOpen(true)}
                onMouseLeave={() => setTechOpen(false)}
              >
                <button className={btnCls}>
                  Technology
                  <DropdownChevron open={techOpen} />
                </button>
                <div className={dropdownCls(techOpen)}>
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                    {technologyLinks.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button className={btnCls}>
                  Products
                  <DropdownChevron open={productsOpen} />
                </button>
                <div className={dropdownCls(productsOpen)}>
                  <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                    {productLinks.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </nav>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden flex flex-col justify-center items-center w-5 h-5 gap-1.5 rounded-lg transition-colors ${
                transparent ? 'text-white' : 'text-gray-600'
              }`}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />

        {/* Drawer */}
        <div
          className={`absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="px-6 py-4 flex flex-col">
            {/* About */}
            <Link
              href="/about"
              className="py-4 text-sm font-medium text-gray-800 border-b border-gray-50 hover:text-blue-600 transition-colors"
            >
              About
            </Link>

            {/* Technology accordion */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setMobileTechOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                Technology
                <DropdownChevron open={mobileTechOpen} />
              </button>
              {mobileTechOpen && (
                <div className="pb-2 flex flex-col pl-4">
                  {technologyLinks.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="py-2.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products accordion */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                Products
                <DropdownChevron open={mobileProductsOpen} />
              </button>
              {mobileProductsOpen && (
                <div className="pb-2 flex flex-col pl-4">
                  {productLinks.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="py-2.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
