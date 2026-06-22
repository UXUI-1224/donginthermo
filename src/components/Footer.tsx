import Link from 'next/link'
import { supabase } from '@/lib/supabase'

async function getSiteSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from('site_settings').select('key, value')
  const settings: Record<string, string> = {}
  for (const row of data ?? []) settings[row.key] = row.value ?? ''
  return settings
}

export default async function Footer() {
  const settings = await getSiteSettings()

  const address = settings.address || '(22648) 29, Bonghwa-ro 223 beonan-gil, Seo-gu, Incheon, Korea'
  const phone   = settings.phone   || '+82 032-565-9151'
  const email   = settings.email   || 'topcold@donginthermo.com'
  const copyright = settings.copyright || '© 2026 Donginthermo Co., Ltd. All rights reserved.'

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-bold text-sm tracking-[0.2em] mb-4">DONGINTHERMO</p>
            <p className="text-blue-300 text-sm leading-relaxed">
              Market-leading transport refrigeration technology for commercial vehicles.
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2">Products</p>
            <ul className="space-y-2">
              {[
                { label: 'VAN',  href: '/products/van' },
                { label: 'NOSE', href: '/products/nose' },
                { label: 'ESC',  href: '/products/esc' },
                { label: 'SUB',  href: '/products/sub' },
              ].map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-blue-300 text-sm hover:text-white transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2">Company</p>
            <ul className="space-y-2">
              {[
                { label: 'About',      href: '/about' },
                { label: 'Technology', href: '/technology' },
                { label: 'Contact',    href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-300 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2">Contact</p>
            <address className="not-italic text-blue-300 text-sm space-y-2 leading-relaxed">
              <p>{address}</p>
              <p className="pt-2">{phone}</p>
              <p>{email}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-800">
          <p className="text-blue-400 text-xs">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
