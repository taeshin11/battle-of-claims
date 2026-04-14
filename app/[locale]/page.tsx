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
  title: 'Battle of Claims | Real-Time Conflict Intelligence',
  description: 'Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations',
  keywords: 'territorial disputes, border claims, sovereignty conflict, disputed territory, international claims',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const total = claims.length
  const falseCount = claims.filter((c: any) => c.status === 'false').length
  const unverifiedCount = claims.filter((c: any) => c.status === 'unverified').length

  return (
    <>
      {/* Dark Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              <Link href={`/${locale}`} className="text-lg font-bold tracking-tight hover:text-purple-400 transition-colors">
                Battle of Claims
              </Link>
              <span className="hidden sm:block text-xs text-slate-500 font-normal">Wartime Misinformation Tracker</span>
              <span className="hidden sm:block text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-0.5">LIVE</span>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Link href={`/${locale}`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-colors">
                Home
              </Link>
              <Link href={`/${locale}/about`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <AdHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest mb-3">
                <span className="w-4 h-px bg-purple-500"></span>
                Misinformation Tracker
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Battle of Claims</h1>
              <p className="text-slate-300 text-base max-w-xl leading-relaxed">
                Track viral war claims. See what&apos;s true, false, or unverified. Independent verification database for wartime propaganda.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-bold text-purple-400">{total}</div>
                <div className="text-xs text-slate-400 mt-0.5">Total Claims</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-bold text-red-400">{falseCount}</div>
                <div className="text-xs text-slate-400 mt-0.5">Debunked</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-bold text-slate-400">{unverifiedCount}</div>
                <div className="text-xs text-slate-400 mt-0.5">Unverified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 bg-zinc-50 min-h-screen">
        <StatsBar claims={claims} />
        <AdInContent />
        <ClaimsTable claims={claims} locale={locale} />
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-semibold text-sm">Battle of Claims</div>
              <div className="text-xs text-slate-500 mt-1">Data for informational purposes only.</div>
            </div>
            <VisitorCounter />
          </div>
          <div className="max-w-7xl mx-auto pt-6 mt-6 border-t border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <p className="text-center text-xs text-slate-500">© {new Date().getFullYear()} Battle of Claims. All rights reserved. Data is for informational purposes only.</p>
          </div>
        </div>
      </footer>

      <AdMobileSticky />
    </>
  )
}
