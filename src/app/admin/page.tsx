'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isActive = id.length > 0 && password.length > 0

  const handleLogin = async () => {
    if (!isActive || loading) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Login failed.')
      }
    } catch {
      setError('A network error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel */}
      <div className="hidden md:flex md:w-[42%] bg-[#014f82] flex-col justify-end p-12 lg:p-16">
        <div className="mb-12">
          <h1 className="text-white text-2xl lg:text-3xl font-bold tracking-wide mb-3">
            DONGINTHERMO
          </h1>
          <p className="text-white/70 text-base font-medium mb-4">
            Admin Console
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Manage products, certifications,<br />
            and site content in one place.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-16 md:py-0">
        <div className="w-full max-w-[380px]">
          {/* Mobile brand */}
          <div className="md:hidden mb-10 text-center">
            <h1 className="text-[#014f82] text-2xl font-bold tracking-wide">
              DONGINTHERMO
            </h1>
            <p className="text-gray-400 text-sm mt-1">Admin Console</p>
          </div>

          <h2 className="text-[#111827] text-2xl font-bold mb-1">Sign in</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in with your admin account</p>

          <div className="flex flex-col gap-5">
            {/* ID field */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your admin ID"
                autoComplete="username"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder:text-gray-300 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
              />
              <p className="text-xs text-gray-400 mt-1.5">Enter your registered admin ID</p>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-[#111827] placeholder:text-gray-300 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Enter the password you set up</p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500 -mt-1">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={!isActive || loading}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-1
                ${isActive && !loading
                  ? 'bg-[#016cab] hover:bg-[#015689] text-white cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
