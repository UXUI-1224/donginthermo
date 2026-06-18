'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'

// ---------------------------------------------------------------------------
// Page Hero
// ---------------------------------------------------------------------------
function PageHero() {
  return (
    <section className="pt-32 pb-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          About Donginthermo
        </p>
        <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight max-w-xl">
          Building Trust Through
          <br />
          Engineering Excellence
        </h1>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CEO Interview Section
// ---------------------------------------------------------------------------
// VIDEO PLACEHOLDER
// To replace with real CEO interview video:
//   1. Supabase Dashboard → Storage → bucket (e.g. "assets", Public)
//   2. Upload the video file
//   3. Copy the public URL and add to src="" below
// ---------------------------------------------------------------------------
function CEOSection({ videoUrl }: { videoUrl: string }) {
  const { ref: videoRef, inView: videoIn } = useInView()
  const { ref: textRef, inView: textIn } = useInView()

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Video */}
          <div
            ref={videoRef}
            className={`relative aspect-video rounded-xl overflow-hidden bg-blue-900 transition-all duration-700 ${
              videoIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/50 text-xs tracking-widest uppercase">CEO Interview</p>
              </div>
            )}
          </div>

          {/* Right: Text */}
          <div
            ref={textRef}
            className={`transition-all duration-700 delay-150 ${
              textIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
              CEO Message
            </p>
            <blockquote className="text-gray-900 text-xl md:text-2xl font-medium leading-relaxed mb-8 border-l-4 border-blue-500 pl-6">
              &ldquo;Our goal is to become a leading brand both in the domestic and overseas
              market — driven by frontier technology and an unwavering commitment to
              reliability.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">CJ</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">C.Y. Jung</p>
                <p className="text-gray-400 text-xs mt-0.5">CEO, Donginthermo Co., Ltd.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Company History Section
// ---------------------------------------------------------------------------
const milestoneGroups = [
  {
    decade: "2020's",
    items: [
      { date: '2022. 04', title: 'Acquired ATP certificate' },
      { date: '2021. 06', title: 'Acquired ROHS certificate' },
      { date: '2020. 08', title: 'Trademark application in 30 overseas countries' },
      { date: '2020. 01', title: 'Selected as a Youth-friendly Small Giant' },
    ],
  },
  {
    decade: "2010's",
    items: [
      { date: '2019. 06', title: 'Selected as a Global hidden champion company' },
      { date: '2017. 10', title: 'Certification of national root enterprise' },
      { date: '2017. 10', title: 'Selected Gyeonggi province promising company' },
      { date: '2016. 10', title: 'Selected Gazelle Firm from SBC' },
      { date: '2016. 03', title: "Selected as a faithful taxpayer on 14th Taxpayers' Day" },
      { date: '2016. 02', title: 'Technology cooperation with Lumikko' },
      { date: '2016. 01', title: 'Selected as an Export Excellence Company' },
      { date: '2015. 04', title: 'Selected Gazelle Firm from SBC' },
      { date: '2014. 06', title: 'Selected as an Inno-Biz from Incheon-city' },
      { date: '2014. 03', title: "Selected as a faithful taxpayer on Taxpayers' Day" },
      { date: '2013. 08', title: 'Trademark application in 20 countries' },
      { date: '2012. 11', title: 'Certified as a Visionary Enterprise of Incheon, Korea' },
      { date: '2012. 05', title: 'R&D center established' },
      { date: '2010. 01', title: 'CE certified' },
    ],
  },
  {
    decade: "2000's",
    items: [
      { date: '2007. 06', title: 'Venture company certified (Korea Technology Finance Corporation)' },
      { date: '2007. 03', title: 'Selected as an Inno-Biz' },
      { date: '2004. 04', title: 'Technical cooperation and an Exclusive distributorship in Korea signed with Denso' },
      { date: '2001. 07', title: 'ISO 9001 certified, TopCold brand launched' },
      { date: '2000. 03', title: "KIA Motor Co., Ltd.'s OEM supplier" },
    ],
  },
]

function HistoryGroup({
  group,
}: {
  group: (typeof milestoneGroups)[number]
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div ref={ref} className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-0">
      {/* Decade label */}
      <div className="pt-1">
        <span className={`text-blue-500 text-sm font-bold tracking-wide transition-all duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          {group.decade}
        </span>
      </div>

      {/* Items */}
      <div className="border-l-2 border-gray-100 pl-8 pb-12">
        {group.items.map((item, i) => (
          <div
            key={`${item.date}-${i}`}
            className={`relative mb-5 last:mb-0 transition-all duration-500 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: `${Math.min(i * 40, 300)}ms` }}
          >
            {/* Dot */}
            <div className={`absolute -left-[37px] top-[5px] w-2 h-2 rounded-full transition-all duration-500 ${inView ? 'bg-blue-400' : 'bg-gray-200'}`}
              style={{ transitionDelay: `${Math.min(i * 40, 300)}ms` }}
            />
            <div className="flex items-baseline gap-4">
              <span className="text-gray-400 text-xs tabular-nums shrink-0 w-16">{item.date}</span>
              <span className="text-gray-700 text-sm leading-relaxed">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistorySection() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: foundedRef, inView: foundedIn } = useInView()

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-16 transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Company History
          </p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
            Over Three Decades
            <br />
            of Innovation
          </h2>
        </div>

        <div className="max-w-3xl">
          {milestoneGroups.map((g) => (
            <HistoryGroup key={g.decade} group={g} />
          ))}

          {/* Founding entry */}
          <div
            ref={foundedRef}
            className={`grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-0 transition-all duration-700 ${
              foundedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div />
            <div className="border-l-2 border-blue-200 pl-8 pb-2">
              <div className="relative">
                <div className="absolute -left-[39px] top-[5px] w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="flex items-baseline gap-4">
                  <span className="text-gray-400 text-xs tabular-nums shrink-0 w-16">1989. 04</span>
                  <span className="text-gray-900 text-sm font-semibold">DONGIN THERMO CO., LTD. established</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Management Values Section
// ---------------------------------------------------------------------------
const VALUES_BASE = [
  {
    title: 'Intelligent',
    desc: 'Leading technology in a highly growing refrigeration industry. Investing in human resources — the origin of technology.',
    settingKey: 'values_intelligent_img_url',
  },
  {
    title: 'Innovative',
    desc: 'Innovative solution provider in a rapidly changing business field. Distinguished technical competence for customer satisfaction.',
    settingKey: 'values_innovative_img_url',
  },
  {
    title: 'Insightful',
    desc: 'Presenting directions of development with keen insight. Future-oriented growth with customers.',
    settingKey: 'values_insightful_img_url',
  },
]

function ValuesSection({ images }: { images: Record<string, string> }) {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headRef}
          className={`mb-16 transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Management Philosophy
          </p>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold">
            We Are Creating Innovation
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES_BASE.map((v, i) => {
            const imgUrl = images[v.settingKey] ?? ''
            return (
              <div
                key={v.title}
                className={`group relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-500 ${
                  gridIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-blue-900" />
                )}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-white text-xl font-bold mb-2">{v.title}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  return (
    <>
      <PageHero />
      <CEOSection videoUrl={settings.ceo_video_url ?? ''} />
      <HistorySection />
      <ValuesSection images={settings} />
    </>
  )
}
