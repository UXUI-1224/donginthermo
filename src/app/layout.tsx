import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import GNB from '@/components/GNB'
import Footer from '@/components/Footer'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Donginthermo — Transport Refrigeration Technology',
  description:
    'Donginthermo is a leading manufacturer of transport refrigeration and air-conditioning systems for commercial vehicles.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="flex flex-col min-h-screen">
        <GNB />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
