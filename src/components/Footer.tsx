import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-bold text-sm tracking-[0.2em] mb-4">DONGINTHERMO</p>
            <p className="text-blue-300 text-sm leading-relaxed">
              Market-leading transport refrigeration technology for commercial vehicles.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Products</p>
            <ul className="space-y-3">
              {[
                { label: 'VAN', href: '/products/van' },
                { label: 'NOSE', href: '/products/nose' },
                { label: 'ESC', href: '/products/esc' },
                { label: 'SUB', href: '/products/sub' },
              ].map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-blue-300 text-sm hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Company</p>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Technology', href: '/technology' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-300 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-5">Contact</p>
            <address className="not-italic text-blue-300 text-sm space-y-2 leading-relaxed">
              <p>29, Bonghwa-ro 223beonan-gil,</p>
              <p>Seo-gu, Incheon 22648, Korea</p>
              <p className="pt-2">+82-32-565-9151</p>
              <p>topcold@donginthermo.com</p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-800">
          <p className="text-blue-400 text-xs">
            © 2026 Donginthermo Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
