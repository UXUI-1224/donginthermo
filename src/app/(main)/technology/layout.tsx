export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-blue-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Technology
          </p>
          <h1 className="text-gray-900 text-4xl md:text-5xl font-bold leading-tight max-w-xl">
            Striving to Be a Leader
            <br />
            with Advanced Technology
          </h1>
        </div>
      </section>

      {children}
    </>
  )
}
