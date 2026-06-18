'use client'

import { useEffect, useRef, useState } from 'react'

type Trademark = {
  id: string
  name: string
  lat: number
  lon: number
  img_url: string | null
  sort_order: number
}

// ── Add Modal ─────────────────────────────────────────────────────────────────

function AddModal({
  onClose,
  onAdded,
}: {
  onClose: () => void
  onAdded: (tm: Trademark) => void
}) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = async () => {
    if (!name.trim()) { setError('Country name is required.'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/trademarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      onAdded(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[400px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Add Country</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Country Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="e.g. United States"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Coordinates are auto-detected via the country name.
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={saving}
            className="px-5 py-2 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Edit Modal ─────────────────────────────────────────────────────────────────

function EditModal({
  tm,
  onClose,
  onSaved,
  onDeleted,
}: {
  tm: Trademark
  onClose: () => void
  onSaved: (updated: Trademark) => void
  onDeleted: (id: string) => void
}) {
  const [name, setName] = useState(tm.name)
  const [imgUrl, setImgUrl] = useState(tm.img_url ?? '')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/trademarks/${tm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      onSaved({ ...tm, name, img_url: imgUrl || null })
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
      const ext = file.name.split('.').pop()
      const path = `${tm.id}.${ext}`

      const signRes = await fetch('/api/admin/sign-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket: 'trademark-images', path }),
      })
      if (!signRes.ok) throw new Error((await signRes.json()).error)
      const { signedUrl, publicUrl } = await signRes.json()

      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })
      if (!uploadRes.ok) throw new Error('Storage upload failed')

      const res = await fetch(`/api/admin/trademarks/${tm.id}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: publicUrl }),
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
      const res = await fetch(`/api/admin/trademarks/${tm.id}/image`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setImgUrl('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to remove image.')
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${tm.name}"? This cannot be undone.`)) return
    setDeleting(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/trademarks/${tm.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      onDeleted(tm.id)
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
          <h2 className="font-semibold text-gray-900">Edit Trademark</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Country Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
            />
          </div>

          {/* Coordinates (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Coordinates</label>
            <div className="flex gap-2">
              <div className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
                <span className="text-gray-400 text-xs mr-1">Lat</span>{tm.lat.toFixed(4)}
              </div>
              <div className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
                <span className="text-gray-400 text-xs mr-1">Lon</span>{tm.lon.toFixed(4)}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">Coordinates are set automatically and cannot be edited.</p>
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

export default function TrademarksPage() {
  const [trademarks, setTrademarks] = useState<Trademark[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Trademark | null>(null)

  useEffect(() => {
    fetch('/api/admin/trademarks')
      .then((r) => r.json())
      .then(setTrademarks)
      .finally(() => setLoading(false))
  }, [])

  const handleAdded = (tm: Trademark) => {
    setTrademarks((prev) => [...prev, tm])
    setShowAdd(false)
  }

  const handleSaved = (updated: Trademark) => {
    setTrademarks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setEditing(null)
  }

  const handleDeleted = (id: string) => {
    setTrademarks((prev) => prev.filter((t) => t.id !== id))
    setEditing(null)
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Trademarks</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage trademark countries and certificate images</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#016cab] hover:bg-[#015689] text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Country
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Image / Country</th>
                <th className="hidden sm:table-cell text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 w-52">Coordinates</th>
                <th className="px-5 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="text-center py-16 text-gray-400 text-sm">Loading...</td></tr>
              ) : trademarks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <p className="text-gray-400 text-sm mb-3">No trademark countries yet.</p>
                    <button
                      onClick={() => setShowAdd(true)}
                      className="text-sm text-[#016cab] hover:underline font-medium"
                    >
                      Add your first country
                    </button>
                  </td>
                </tr>
              ) : (
                trademarks.map((tm) => (
                  <tr key={tm.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded border border-gray-100 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
                          {tm.img_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={tm.img_url} alt={tm.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="md:text-sm text-xs font-medium text-gray-800">{tm.name}</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-5 py-3">
                      <span className="text-xs text-gray-500 font-mono">
                        {tm.lat.toFixed(3)}, {tm.lon.toFixed(3)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setEditing(tm)}
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

      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onAdded={handleAdded} />
      )}

      {editing && (
        <EditModal
          tm={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  )
}
