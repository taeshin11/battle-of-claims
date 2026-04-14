import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ClaimsTable from '@/components/ClaimsTable'
import StatsBar from '@/components/StatsBar'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import claims from '@/public/data/claims.json'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Battle of Claims — Wartime Misinformation Tracker | War Claim Verification Database',
  description: 'Searchable database of viral war claims with verification status.',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <span>⚖️</span> Battle of Claims
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-gray-900">Home</Link>
            <Link href={`/${locale}/about`} className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Battle of Claims</h1>
          <p className="text-gray-500 mt-1">Wartime Misinformation Tracker — Searchable database of viral war claims</p>
        </div>
        <StatsBar claims={claims} />
        <AdInContent />
        <ClaimsTable claims={claims} locale={locale} />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Independent war claim verification</p>
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
