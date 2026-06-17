'use client'

import { useEffect, useRef, useState } from 'react'

type Settings = Record<string, string>

// ── Reusable upload components ────────────────────────────────────────────────

function VideoUploadSlot({
  label,
  description,
  settingKey,
  value,
  onChange,
}: {
  label: string
  description?: string
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
    <div>
      <h2 className="text-sm font-semibold text-gray-700 mb-1">{label}</h2>
      {description && <p className="text-xs text-gray-400 mb-4">{description}</p>}

      {value && (
        <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-black">
          <video src={value} className="w-full h-full object-cover" muted controls />
        </div>
      )}

      <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleUpload} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-[#016cab] hover:text-[#016cab] transition-all disabled:opacity-50"
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
        {uploading ? 'Uploading...' : value ? 'Replace video' : 'Upload video'}
      </button>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      <p className="text-xs text-gray-400 mt-2">Recommended: MP4, under 50 MB</p>
    </div>
  )
}

const VIMEO_EMBED_URL = (id: string) =>
  `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0`

function VideoEmbedSlot({
  label,
  description,
  settingKey,
  value,
  onChange,
}: {
  label: string
  description?: string
  settingKey: string
  value: string
  onChange: (url: string) => void
}) {
  // Extract video ID from stored URL if already saved
  const savedId = value.match(/vimeo\.com\/video\/(\d+)/)?.[1] ?? ''
  const [videoId, setVideoId] = useState(savedId)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!videoId.trim()) return
    const embedUrl = VIMEO_EMBED_URL(videoId.trim())
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [settingKey]: embedUrl }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      onChange(embedUrl)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 mb-1">{label}</h2>
      {description && <p className="text-xs text-gray-400 mb-4">{description}</p>}

      {value && (
        <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-black">
          <iframe
            src={value}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={videoId}
          onChange={(e) => { setVideoId(e.target.value); setSaved(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Vimeo Video ID (예: 1202071951)"
          className="flex-1 px-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all"
        />
        <button
          onClick={handleSave}
          disabled={saving || !videoId.trim()}
          className="px-4 py-2 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      <p className="text-xs text-gray-400 mt-2">
        Vimeo 영상 URL에서 숫자 ID만 입력하세요. 예: vimeo.com/<strong>1202071951</strong>
      </p>
    </div>
  )
}

function ImageUploadSlot({
  label,
  code,
  settingKey,
  value,
  onChange,
}: {
  label: string
  code?: string
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
        {code && (
          <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded-full">
            {code}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">{label}</p>
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

// ── Page ──────────────────────────────────────────────────────────────────────

const CATEGORY_KEYS = [
  { key: 'product_van_img_url',  label: 'VAN Type',  code: 'VAN' },
  { key: 'product_nose_img_url', label: 'NOSE Type', code: 'NOSE' },
  { key: 'product_esc_img_url',  label: 'ESC Type',  code: 'ESC' },
  { key: 'product_sub_img_url',  label: 'SUB Type',  code: 'SUB' },
]

const VALUES_KEYS = [
  { key: 'values_intelligent_img_url', label: 'Intelligent' },
  { key: 'values_innovative_img_url',  label: 'Innovative' },
  { key: 'values_insightful_img_url',  label: 'Insightful' },
]

export default function DesignsPage() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then(setSettings)
      .finally(() => setLoading(false))
  }, [])

  const update = (key: string) => (url: string) =>
    setSettings((s) => ({ ...s, [key]: url }))

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Designs</h1>
        <p className="text-sm text-gray-400">Manage videos and images displayed on the site.</p>
      </div>

      {/* Hero Video */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <VideoUploadSlot
          label="Hero Video"
          description="Full-screen background video on the homepage hero section."
          settingKey="hero_video_url"
          value={settings.hero_video_url ?? ''}
          onChange={update('hero_video_url')}
        />
      </div>

      {/* CEO Interview Video */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <VideoEmbedSlot
          label="CEO Interview"
          description="Video displayed in the About page CEO section. Paste a Vimeo or YouTube URL."
          settingKey="ceo_video_url"
          value={settings.ceo_video_url ?? ''}
          onChange={update('ceo_video_url')}
        />
      </div>

      {/* Product Category Images */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">Product Category Images</h2>
        <p className="text-xs text-gray-400 mb-4">Images on the homepage product section cards.</p>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORY_KEYS.map(({ key, label, code }) => (
            <ImageUploadSlot
              key={key}
              label={label}
              code={code}
              settingKey={key}
              value={settings[key] ?? ''}
              onChange={update(key)}
            />
          ))}
        </div>
      </div>

      {/* Management Philosophy Images */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">Management Philosophy Images</h2>
        <p className="text-xs text-gray-400 mb-4">Images on the About page management philosophy cards.</p>
        <div className="grid grid-cols-3 gap-4">
          {VALUES_KEYS.map(({ key, label }) => (
            <ImageUploadSlot
              key={key}
              label={label}
              settingKey={key}
              value={settings[key] ?? ''}
              onChange={update(key)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
