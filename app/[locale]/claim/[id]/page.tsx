import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import StatusBadge from '@/components/StatusBadge'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import claims from '@/public/data/claims.json'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    claims.map((c) => ({ locale, id: c.id }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const claim = claims.find(c => c.id === id)
  if (!claim) return {}
  return {
    title: `${claim.claim.slice(0, 60)}... | Battle of Claims`,
    description: claim.summary,
  }
}

export default async function ClaimPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const claim = claims.find(c => c.id === id)
  if (!claim) notFound()

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
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to all claims</Link>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl font-bold text-gray-900">{claim.claim}</h1>
            <StatusBadge status={claim.status} />
          </div>
          <p className="text-gray-600 mb-4">{claim.summary}</p>
          <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
            <div>
              <span className="text-gray-400">Date</span>
              <p className="font-medium">{claim.date}</p>
            </div>
            <div>
              <span className="text-gray-400">Conflict</span>
              <p className="font-medium">
                <Link href={`/${locale}/conflict/${claim.conflict}`} className="text-blue-600 hover:underline">
                  {claim.conflict.replace('-', ' ')}
                </Link>
              </p>
            </div>
            <div>
              <span className="text-gray-400">Source</span>
              <p className="font-medium">
                <a href={claim.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {claim.source}
                </a>
              </p>
            </div>
            <div>
              <span className="text-gray-400">Tags</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {claim.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
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
