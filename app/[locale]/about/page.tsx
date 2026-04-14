import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'About — Battle of Claims',
  description: 'About the Battle of Claims wartime misinformation tracking project.',
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <span>⚖️</span> Battle of Claims
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 prose prose-gray">
        <h1>About Battle of Claims</h1>
        <p>Battle of Claims is an independent database tracking viral wartime claims and their verification status. We aggregate fact-checks from credible international organizations, investigative journalists, and official government sources.</p>
        <h2>Verification Standards</h2>
        <p>Claims are categorized as: <strong>True</strong> (confirmed by multiple credible sources), <strong>False</strong> (definitively debunked), <strong>Misleading</strong> (contains partial truth but lacks context), or <strong>Unverified</strong> (insufficient evidence to determine).</p>
        <h2>Disclaimer</h2>
        <p>This database is for informational purposes. War information is inherently uncertain and subject to change. We update entries as new evidence emerges.</p>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-end">
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
