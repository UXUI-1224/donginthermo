export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Admin</h1>
      <p className="text-sm text-gray-400 mb-8">Admin account information.</p>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-50">
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin ID</label>
          <div className="px-3.5 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-500 bg-gray-50">
            donginthermo
          </div>
        </div>
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="px-3.5 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-500 bg-gray-50 tracking-widest">
            ••••••••••••
          </div>
        </div>
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <div className="px-3.5 py-2.5 border border-gray-100 rounded-lg text-sm bg-gray-50">
            <span className="inline-block px-2 py-0.5 bg-blue-50 text-[#016cab] text-xs font-semibold rounded-full">ROOT</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Admin credentials are managed via environment variables. To change them, update <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">ADMIN_ID</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">ADMIN_PASSWORD</code>, and <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">ADMIN_SESSION_SECRET</code> in your Vercel project settings.
      </p>
    </div>
  )
}
