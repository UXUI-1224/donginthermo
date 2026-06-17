'use client'

import { useEffect, useRef, useState } from 'react'

type Cert = {
  id: string
  name: string
  category: string
  img_url: string | null
  sort_order: number
}

const CATEGORIES = ['International', 'Trade', 'Government', 'Industry']

const CATEGORY_COLORS: Record<string, string> = {
  International: 'bg-blue-50 text-blue-700',
  Trade:         'bg-green-50 text-green-700',
  Government:    'bg-orange-50 text-orange-700',
  Industry:      'bg-purple-50 text-purple-700',
}

// ── Edit Modal ────────────────────────────────────────────────────────────────

function EditModal({
  cert,
  onClose,
  onSaved,
  onDeleted,
}: {
  cert: Cert
  onClose: () => void
  onSaved: (updated: Cert) => void
  onDeleted: (id: string) => void
}) {
  const [name, setName] = useState(cert.name)
  const [category, setCategory] = useState(cert.category)
  const [imgUrl, setImgUrl] = useState(cert.img_url ?? '')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/certifications/${cert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      onSaved({ ...cert, name, category, img_url: imgUrl || null })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`/api/admin/certifications/${cert.id}/image`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) throw new Error((await res.json()).error)
      const { img_url } = await res.json()
      setImgUrl(img_url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemoveImage = async () => {
    if (!imgUrl || !confirm('Remove this image?')) return
    setError('')
    try {
      const res = await fetch(`/api/admin/certifications/${cert.id}/image`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setImgUrl('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to remove image.')
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${cert.name}"? This cannot be undone.`)) return
    setDeleting(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/certifications/${cert.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      onDeleted(cert.id)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete.')
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[480px] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Edit Certification</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Image</label>
            {imgUrl ? (
              <div className="relative group inline-block mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={name}
                  className="w-32 aspect-[3/4] object-cover rounded-lg border border-gray-100"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-32 aspect-[3/4] rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 mb-3 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">No image</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#016cab] hover:text-[#016cab] transition-all disabled:opacity-50"
            >
              {uploading ? (
                <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              )}
              {uploading ? 'Uploading...' : imgUrl ? 'Replace image' : 'Upload image'}
            </button>
            <p className="text-xs text-gray-400 mt-2">Recommended: JPG or PNG, under 5 MB</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Cert[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Cert | null>(null)

  useEffect(() => {
    fetch('/api/admin/certifications')
      .then((r) => r.json())
      .then(setCerts)
      .finally(() => setLoading(false))
  }, [])

  const handleSaved = (updated: Cert) => {
    setCerts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    setEditing(null)
  }

  const handleDeleted = (id: string) => {
    setCerts((prev) => prev.filter((c) => c.id !== id))
    setEditing(null)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Certifications</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage certification records and images</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 w-28">Category</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Image / Name</th>
                <th className="px-5 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="text-center py-16 text-gray-400 text-sm">Loading...</td></tr>
              ) : certs.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-16 text-gray-400 text-sm">No certifications found.</td></tr>
              ) : (
                certs.map((cert) => (
                  <tr key={cert.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${CATEGORY_COLORS[cert.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {cert.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded border border-gray-100 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
                          {cert.img_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={cert.img_url} alt={cert.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-gray-800 whitespace-pre-line text-xs leading-snug">{cert.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setEditing(cert)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-[#016cab] hover:text-[#016cab] transition-all"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <EditModal
          cert={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  )
}
