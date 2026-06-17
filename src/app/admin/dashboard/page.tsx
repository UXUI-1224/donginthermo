import Link from 'next/link'

const cards = [
  {
    label: 'Products',
    description: 'Manage product listings and images',
    href: '/admin/dashboard/products',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
  {
    label: 'Certifications',
    description: 'Manage certification records',
    href: '/admin/dashboard/certifications',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8 ml-11">
        Admin · Welcome to the Donginthermo admin console.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, description, href, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
