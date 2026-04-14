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
  title: 'How to Use & FAQ',
  description: 'Learn how to use Battle of Claims effectively. Frequently asked questions about our data, methodology, and features.',
  keywords: 'territorial disputes, border claims, sovereignty conflict, disputed territory, international claims, how to use, FAQ, guide, help',
}

const faqs = [
  {
    q: 'What is Battle of Claims and who is it for?',
    a: 'Battle of Claims is a free, publicly accessible intelligence platform that analyzes territorial disputes, boundary conflicts, and competing sovereignty claims between nations. It is designed for journalists, researchers, policy analysts, students, NGO workers, and anyone with a professional or personal interest in understanding global conflict dynamics. No registration or payment is required to access any feature of the platform.'
  },
  {
    q: 'Where does the data on this platform come from?',
    a: 'Our data is sourced from a combination of publicly available datasets and reports including the Armed Conflict Location & Event Data Project (ACLED), Stockholm International Peace Research Institute (SIPRI), Uppsala Conflict Data Program (UCDP), United Nations agencies, official government sources, and verified open-source intelligence. Each data entry aims to cite its primary source where possible.'
  },
  {
    q: 'How frequently is the data updated?',
    a: 'Data update frequency varies by category. Breaking conflict events and active frontline data are updated as new verified information becomes available, typically within 24-48 hours of an event. Statistical summaries and aggregate figures are reviewed and updated on a weekly or monthly basis. The "last updated" timestamp on each data section indicates when that specific data was most recently refreshed.'
  },
  {
    q: 'Is this platform free to use? Are there any premium features?',
    a: 'Battle of Claims is entirely free to use. We believe conflict intelligence should be accessible to everyone, not just those with institutional subscriptions. We sustain the platform through advertising revenue. There are no paywalls, premium tiers, or registration requirements. All data visible on the platform is fully accessible to all visitors.'
  },
  {
    q: 'Can I use or cite data from Battle of Claims in my research or reporting?',
    a: 'You are welcome to reference and cite data from Battle of Claims in your work, provided you credit the platform and, where available, the original primary source. We recommend always cross-referencing our data against primary sources for academic or professional publications. If you are a journalist, researcher, or organization interested in a data partnership or bulk data access, please contact us at contact@battle-of-claims.vercel.app.'
  }
]

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-purple-800 flex items-center gap-2">
            Battle of Claims
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <span className="mx-2">/</span>
            <span>How to Use &amp; FAQ</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use Battle of Claims</h1>
          <p className="text-xl text-slate-600 mb-10">A guide to navigating the platform and getting the most from our conflict intelligence data.</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
            <div className="grid gap-4">
              {[
                { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage to get a high-level overview of current conflict activity. The main dashboard displays key metrics, recent events, and interactive visualizations that update regularly.' },
                { step: '2', title: 'Filter & Drill Down', desc: 'Use the filter controls to narrow data by region, date range, conflict type, or severity level. Click on any event, country, or data point to access detailed information and sourced reports.' },
                { step: '3', title: 'Track Changes Over Time', desc: 'Use the timeline and historical views to understand how conflicts evolve. Bookmark specific pages or use our RSS-style update sections to stay current on developments that matter to you.' }
              ].map(({ step, title, desc }) => (
                <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                    <p className="text-slate-600 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>
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
