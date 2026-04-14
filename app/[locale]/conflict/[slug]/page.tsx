import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import ClaimsTable from '@/components/ClaimsTable'
import StatsBar from '@/components/StatsBar'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import claims from '@/public/data/claims.json'
import type { Metadata } from 'next'

const CONFLICTS = ['ukraine-russia', 'israel-hamas', 'sudan', 'myanmar']

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CONFLICTS.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace('-', ' ')} Claims — Battle of Claims`,
    description: `All verified and unverified claims from the ${slug.replace('-', ' ')} conflict.`,
  }
}

export default async function ConflictPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!CONFLICTS.includes(slug)) notFound()

  const conflictClaims = claims.filter(c => c.conflict === slug)

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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to all claims</Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{slug.replace('-', ' ')}</h1>
        <p className="text-gray-500 mb-6">{conflictClaims.length} claims in this conflict</p>
        <StatsBar claims={conflictClaims} />
        <ClaimsTable claims={conflictClaims} locale={locale} />
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
