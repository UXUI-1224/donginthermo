import GNB from '@/components/GNB'
import Footer from '@/components/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GNB />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </>
  )
}
