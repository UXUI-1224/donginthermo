'use client'

import { useEffect, useState } from 'react'

const FIELDS = [
  { key: 'company_name', label: 'Company name', placeholder: 'Dongin Thermo Co., Ltd.' },
  { key: 'address',      label: 'Address',      placeholder: '29, Bonghwa-ro 223beonan-gil, Seo-gu, Incheon 22648, Korea' },
  { key: 'phone',        label: 'Phone',        placeholder: '+82-32-565-9151' },
  { key: 'email',        label: 'Email',        placeholder: 'topcold@donginthermo.com' },
  { key: 'copyright',   label: 'Copyright',    placeholder: '© 2026 Donginthermo Co., Ltd. All rights reserved.' },
]

export default function BasicSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then(setValues)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const payload: Record<string, string> = {}
      for (const { key } of FIELDS) payload[key] = values[key] ?? ''
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Basic settings</h1>
      <p className="text-sm text-gray-400 mb-8">Manage site footer and company information.</p>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-50">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="px-6 py-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
              value={values[key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      <div className="flex justify-end mt-5">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  )
}
