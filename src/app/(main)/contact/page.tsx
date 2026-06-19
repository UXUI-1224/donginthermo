'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'

// ---------------------------------------------------------------------------
// Page Hero
// ---------------------------------------------------------------------------
function PageHero() {
  return (
    <section className="pt-32 pb-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Contact
        </p>
        <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight max-w-xl">
          Get in Touch
          <br />
          With Our Team
        </h1>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Contact Info + Map
// ---------------------------------------------------------------------------
function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[#016cab]">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        {href ? (
          <a href={href} className="text-gray-800 text-sm leading-relaxed hover:text-[#016cab] transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-gray-800 text-sm leading-relaxed">{value}</p>
        )}
      </div>
    </div>
  )
}

function ContactInfoSection() {
  const { ref: infoRef, inView: infoIn } = useInView()
  const { ref: mapRef, inView: mapIn } = useInView()

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Contact info */}
          <div
            ref={infoRef}
            className={`lg:col-span-2 flex flex-col gap-8 transition-all duration-700 ${
              infoIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div>
              <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                Find Us
              </p>
              <h2 className="text-gray-900 text-2xl md:text-3xl font-bold leading-snug">
                Headquartered
                <br />
                in Incheon, Korea
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <InfoItem
                label="Address"
                value="29, Bonghwa-ro 223beonan-gil, Seo-gu, Incheon 22648, Korea"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
              <InfoItem
                label="Phone"
                value="+82-32-565-9151"
                href="tel:+82325659151"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
              <InfoItem
                label="Email"
                value="topcold@donginthermo.com"
                href="mailto:topcold@donginthermo.com"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <InfoItem
                label="Business Hours"
                value="Mon – Fri, 09:00 – 18:00 KST"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Right: Map */}
          <div
            ref={mapRef}
            className={`lg:col-span-3 transition-all duration-700 delay-150 ${
              mapIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[420px] w-full">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.5946435170595!2d126.6324142773692!3d37.61169807202707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c80f4738a3b03%3A0xe2e518306db24ff!2zKOyjvCnrj5nsnbjsjajrqqggKERPTkdJTiBUSEVSTU8gQ08uLCBMVEQuKQ!5e0!3m2!1sen!2skr!4v1781763201194!5m2!1sen!2skr" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Contact Form
// ---------------------------------------------------------------------------
const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Product Information',
  'Technical Support',
  'Partnership & OEM',
  'Export & Distribution',
  'Other',
]

function FormSection() {
  const { ref: sectionRef, inView: sectionIn } = useInView({ threshold: 0.1 })

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch { /* ignore — alert still shows */ }
    setSubmitting(false)
    alert('메일을 보냈습니다.')
    setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
  }

  const inputCls =
    'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#016cab] focus:ring-2 focus:ring-[#016cab]/10 transition-all bg-white'

  return (
    <section className="py-28 bg-gray-50">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left: Text */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              sectionIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Send a Message
            </p>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-snug mb-8">
              How Can We
              <br />
              Help You?
            </h2>
            <div className="flex flex-col gap-5 text-sm text-gray-500 leading-relaxed">
              <p>
                Whether you have a question about our products, need technical support, or are exploring partnership opportunities — our team is here to help.
              </p>
              <p>
                We typically respond within one business day.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className={`lg:col-span-3 flex flex-col gap-4 transition-all duration-700 delay-150 ${
              sectionIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
          {/* Name + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Name <span className="text-blue-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="John Smith"
                value={form.name}
                onChange={set('name')}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                value={form.company}
                onChange={set('company')}
                className={inputCls}
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email <span className="text-blue-500">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={set('email')}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+82-10-0000-0000"
                value={form.phone}
                onChange={set('phone')}
                className={inputCls}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Subject <span className="text-blue-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={form.subject}
                onChange={set('subject')}
                className={`${inputCls} appearance-none pr-10 cursor-pointer`}
              >
                <option value="" disabled>Select a topic</option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Message <span className="text-blue-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              placeholder="Tell us about your inquiry..."
              value={form.message}
              onChange={set('message')}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-400">
              <span className="text-blue-500">*</span> Required fields
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-[#016cab] hover:bg-[#015689] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          </div>
          </form>

        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ContactPage() {
  return (
    <>
      <PageHero />
      <ContactInfoSection />
      <FormSection />
    </>
  )
}
