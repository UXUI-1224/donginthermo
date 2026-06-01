'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const productLinks = [
  { label: 'VAN', href: '/products/van' },
  { label: 'NOSE', href: '/products/nose' },
  { label: 'ESC', href: '/products/esc' },
  { label: 'SUB', href: '/products/sub' },
]

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Technology', href: '/technology' },
  { label: 'Contact', href: '/contact' },
]

export default function GNB() {
  const [scrolled, setScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
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
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                  transparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Products
                <svg
                  className={`w-3 h-3 mt-px transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white shadow-xl rounded-lg overflow-hidden min-w-[140px] border border-gray-100">
                  {productLinks.map((p) => (
                    <Link
                      key={p.label}
                      href={p.href}
                      className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  transparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
