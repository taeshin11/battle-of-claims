import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Battle of Claims | Real-Time Intelligence',
    template: '%s | Battle of Claims'
  },
  description: 'Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations',
  keywords: 'territorial disputes, border claims, sovereignty conflict, disputed territory, international claims',
  openGraph: {
    type: 'website',
    siteName: 'Battle of Claims',
    title: 'Battle of Claims | Real-Time Intelligence',
    description: 'Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Battle of Claims',
    description: 'Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
