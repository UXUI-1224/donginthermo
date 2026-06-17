'use client'

import { useEffect, useRef, useState } from 'react'

type Settings = Record<string, string>

const CATEGORY_KEYS = [
  { key: 'product_van_img_url',  label: 'VAN',  code: 'VAN' },
  { key: 'product_nose_img_url', label: 'NOSE', code: 'NOSE' },
  { key: 'product_esc_img_url',  label: 'ESC',  code: 'ESC' },
  { key: 'product_sub_img_url',  label: 'SUB',  code: 'SUB' },
]

function UploadImageSlot({
  label,
  code,
  settingKey,
  value,
  onChange,
}: {
  label: string
  code: string
  settingKey: string
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('key', settingKey)
      const res = await fetch('/api/admin/settings/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error)
      const { url } = await res.json()
      onChange(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      {/* Image preview */}
      <div className="aspect-[4/3] bg-gray-50 relative">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">No image</span>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded-full">
          {code}
        </span>
      </div>

      {/* Controls */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">{label} Type</p>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-[#016cab] hover:text-[#016cab] transition-all disabled:opacity-50"
        >
          {uploading ? (
            <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {uploading ? 'Uploading...' : 'Upload image'}
        </button>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}

export default function DesignsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [videoUploading, setVideoUploading] = useState(false)
  const [videoError, setVideoError] = useState('')
  const [videoSaving, setVideoSaving] = useState(false)
  const videoFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then(setSettings)
      .finally(() => setLoading(false))
  }, [])

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setVideoUploading(true)
    setVideoError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('key', 'hero_video_url')
      const res = await fetch('/api/admin/settings/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).error)
      const { url } = await res.json()
      setSettings((s) => ({ ...s, hero_video_url: url }))
    } catch (e) {
      setVideoError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setVideoUploading(false)
      if (videoFileRef.current) videoFileRef.current.value = ''
    }
  }

  const handleSaveVideoUrl = async () => {
    setVideoSaving(true)
    setVideoError('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero_video_url: settings.hero_video_url ?? '' }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
    } catch (e) {
      setVideoError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setVideoSaving(false)
    }
  }

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Designs</h1>
      <p className="text-sm text-gray-400 mb-8">Manage hero video and homepage category images.</p>

      {/* Hero Video */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">Hero Video</h2>
        <p className="text-xs text-gray-400 mb-4">Video displayed in the homepage hero section.</p>

        {settings.hero_video_url && (
          <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-black">
            <video src={settings.hero_video_url} className="w-full h-full object-cover" muted controls />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Video URL</label>
            <input
              value={settings.hero_video_url ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, hero_video_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <input ref={videoFileRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
            <button
              onClick={() => videoFileRef.current?.click()}
              disabled={videoUploading}
              className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500 hover:border-[#016cab] hover:text-[#016cab] transition-all disabled:opacity-50"
            >
              {videoUploading ? (
                <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              )}
              {videoUploading ? 'Uploading...' : 'Upload video'}
            </button>
            <button
              onClick={handleSaveVideoUrl}
              disabled={videoSaving}
              className="px-4 py-2 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {videoSaving ? 'Saving...' : 'Save URL'}
            </button>
          </div>
          {videoError && <p className="text-xs text-red-500">{videoError}</p>}
          <p className="text-xs text-gray-400">Recommended: MP4, under 50 MB</p>
        </div>
      </div>

      {/* Product Category Images */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">Product Category Images</h2>
        <p className="text-xs text-gray-400 mb-4">Images displayed on the homepage product section cards.</p>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORY_KEYS.map(({ key, label, code }) => (
            <UploadImageSlot
              key={key}
              label={label}
              code={code}
              settingKey={key}
              value={settings[key] ?? ''}
              onChange={(url) => setSettings((s) => ({ ...s, [key]: url }))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
