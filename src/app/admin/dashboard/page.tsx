import Link from 'next/link'

const sections = [
  {
    title: 'Content',
    cards: [
      { label: 'Products', description: 'Manage product listings and images', href: '/admin/dashboard/products', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg> },
      { label: 'Certifications', description: 'Manage certification records', href: '/admin/dashboard/certifications', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
    ],
  },
  {
    title: 'Settings',
    cards: [
      { label: 'Designs', description: 'Manage hero video and category images', href: '/admin/dashboard/settings/designs', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
      { label: 'Basic', description: 'Configure company information', href: '/admin/dashboard/settings/basic', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
      { label: 'Admin', description: 'Admin account information', href: '/admin/dashboard/settings/admin', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    ],
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#016cab]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8 ml-11">Admin · Welcome to the Donginthermo admin console.</p>

      <div className="flex flex-col gap-8">
        {sections.map(({ title, cards }) => (
          <div key={title}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map(({ label, description, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">{icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
