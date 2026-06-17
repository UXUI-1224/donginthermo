'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const nav = [
  {
    section: 'Home',
    items: [
      {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    section: 'Content',
    items: [
      {
        label: 'Products',
        href: '/admin/dashboard/products',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
        ),
      },
      {
        label: 'Certifications',
        href: '/admin/dashboard/certifications',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
    ],
  },
]

function Sidebar({ collapsed, onCollapse }: { collapsed: boolean; onCollapse: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <aside
      className={`hidden md:flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-200 shrink-0 ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
        {!collapsed && (
          <span className="text-[#016cab] font-bold text-sm tracking-wider truncate">
            DONGINTHERMO
          </span>
        )}
        <button
          onClick={onCollapse}
          className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-4">
        {nav.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                {section}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {items.map(({ label, href, icon }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 text-[#016cab]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={collapsed ? label : undefined}
                  >
                    <span className={active ? 'text-[#016cab]' : 'text-gray-400'}>{icon}</span>
                    {!collapsed && <span>{label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-gray-100 px-3 py-3 flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm text-gray-600 truncate">Admin</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          title="Sign out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  )
}

function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <>
      <header className="md:hidden flex items-center justify-between h-14 px-4 bg-white border-b border-gray-100">
        <span className="text-[#016cab] font-bold text-sm tracking-wider">DONGINTHERMO</span>
        <button onClick={() => setOpen(true)} className="text-gray-500 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="relative w-[260px] bg-white h-full flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
              <span className="text-[#016cab] font-bold text-sm tracking-wider">DONGINTHERMO</span>
              <button onClick={() => setOpen(false)} className="text-gray-400 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 py-4 px-2 flex flex-col gap-4">
              {nav.map(({ section, items }) => (
                <div key={section}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">{section}</p>
                  <div className="flex flex-col gap-0.5">
                    {items.map(({ label, href, icon }) => {
                      const active = pathname === href
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-2.5 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                            active ? 'bg-blue-50 text-[#016cab]' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className={active ? 'text-[#016cab]' : 'text-gray-400'}>{icon}</span>
                          {label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Admin</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed((v) => !v)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
