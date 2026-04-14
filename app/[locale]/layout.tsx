import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import { FeedbackButton } from '@/components/FeedbackButton'

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
    'indexnow-key': 'battle-of-claims-2025',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Battle of Claims",
              "url": "https://battle-of-claims.vercel.app",
              "description": "Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations",
              "publisher": {
                "@type": "Organization",
                "name": "Battle of Claims",
                "url": "https://battle-of-claims.vercel.app"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://battle-of-claims.vercel.app/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <FeedbackButton siteName="Battle of Claims" siteUrl="https://battle-of-claims.vercel.app" />
      </body>
    </html>
  )
}
