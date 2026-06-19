'use client'

import { useEffect, useState } from 'react'

type Message = {
  id: number
  name: string
  company: string | null
  email: string
  phone: string | null
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  reply: string | null
  replied_at: string | null
  created_at: string
}

const STATUS_LABEL: Record<Message['status'], string> = {
  unread: 'Unread',
  read: 'Read',
  replied: 'Replied',
}

const STATUS_CLS: Record<Message['status'], string> = {
  unread: 'bg-blue-50 text-blue-600',
  read: 'bg-gray-100 text-gray-500',
  replied: 'bg-green-50 text-green-600',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function DetailModal({
  msg,
  onClose,
  onUpdated,
}: {
  msg: Message
  onClose: () => void
  onUpdated: (updated: Message) => void
}) {
  const [reply, setReply] = useState(msg.reply ?? '')
  const [saving, setSaving] = useState(false)

  // Mark as read on open
  useEffect(() => {
    if (msg.status === 'unread') {
      fetch(`/api/admin/messages/${msg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' }),
      }).then(() => onUpdated({ ...msg, status: 'read' }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReply = async () => {
    setSaving(true)
    const now = new Date().toISOString()
    await fetch(`/api/admin/messages/${msg.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply, status: 'replied', replied_at: now }),
    })
    setSaving(false)
    onUpdated({ ...msg, reply, status: 'replied', replied_at: now })

    const mailtoUrl = `mailto:${msg.email}?subject=Re%3A%20${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(reply)}`
    window.open(mailtoUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${STATUS_CLS[msg.status]}`}>
                {STATUS_LABEL[msg.status]}
              </span>
              <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
            </div>
            <h2 className="font-semibold text-gray-900 text-base truncate">{msg.subject}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Sender info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Name</p>
              <p className="text-gray-800">{msg.name}</p>
            </div>
            {msg.company && (
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Company</p>
                <p className="text-gray-800">{msg.company}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
              <a href={`mailto:${msg.email}`} className="text-[#016cab] hover:underline">{msg.email}</a>
            </div>
            {msg.phone && (
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                <a href={`tel:${msg.phone}`} className="text-gray-800 hover:text-[#016cab]">{msg.phone}</a>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-xl px-4 py-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>

          {/* Reply area */}
          <div>
            <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Reply
            </label>
            <textarea
              rows={5}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all resize-none"
            />
            {msg.replied_at && (
              <p className="text-xs text-gray-400 mt-1">
                Last replied {formatDate(msg.replied_at)}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleReply}
            disabled={saving || !reply.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-[#016cab] hover:bg-[#015689] disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? (
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            {saving ? 'Saving...' : 'Send Reply'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [viewing, setViewing] = useState<Message | null>(null)

  useEffect(() => {
    fetch('/api/admin/messages')
      .then((r) => r.json())
      .then(setMessages)
      .finally(() => setLoading(false))
  }, [])

  const handleUpdated = (updated: Message) => {
    setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
    setViewing(updated)
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-400 mt-0.5">Contact form submissions from visitors</p>
        </div>
        {unreadCount > 0 && (
          <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">From</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Subject</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden lg:table-cell w-40">Date</th>
                <th className="px-5 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400 text-sm">Loading...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-gray-400 text-sm">No messages yet.</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => setViewing(msg)}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    {/* From */}
                    <td className="px-5 py-3.5">
                      <p className={`${msg.status === 'unread' ? 'font-bold' : 'font-medium'} text-gray-900 text-sm`}>
                        {msg.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{msg.email}</p>
                    </td>

                    {/* Subject */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className={`text-sm line-clamp-1 ${msg.status === 'unread' ? 'text-gray-900 font-semibold' : 'text-gray-500 font-normal'}`}>
                        {msg.subject}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className={`text-xs ${msg.status === 'unread' ? 'text-gray-700 font-semibold' : 'text-gray-400'}`}>
                        {formatDate(msg.created_at)}
                      </span>
                    </td>

                    {/* Open */}
                    <td className="px-5 py-3.5 text-right">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {viewing && (
        <DetailModal
          msg={viewing}
          onClose={() => setViewing(null)}
          onUpdated={handleUpdated}
        />
      )}
    </>
  )
}
