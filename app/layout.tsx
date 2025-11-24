import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { SiteHeader } from '@/components/site-header'
import { ImpersonationBanner } from '@/components/admin/impersonation-banner'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Colibria Bug Tracker',
  description: 'Simple and efficient bug tracking for your projects',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <SiteHeader />
        <ImpersonationBanner />
        <main className="container py-6">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
