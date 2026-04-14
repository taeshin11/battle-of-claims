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
  title: 'About Us',
  description: 'Learn about Battle of Claims — our mission, methodology, and commitment to transparent conflict intelligence.',
  keywords: 'territorial disputes, border claims, sovereignty conflict, disputed territory, international claims, about us, conflict intelligence platform',
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span>About Us</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Battle of Claims</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">Analyzing territorial disputes, boundary conflicts, and competing sovereignty claims between nations</p>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Battle of Claims was built on a single conviction: that access to timely, accurate conflict intelligence should not be limited to governments, think tanks, or expensive subscription services. We believe that journalists, researchers, policy analysts, students, and engaged citizens all deserve access to the same quality of information to understand the world&apos;s most pressing security challenges.</p>
              <p className="text-slate-600 leading-relaxed">In a world where armed conflicts shape economies, displace populations, and determine the course of history, we are committed to making conflict data accessible, transparent, and useful for anyone who needs it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">What We Track</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Battle of Claims provides analysis of territorial disputes, boundary conflicts, and competing sovereignty claims between nations. Our platform aggregates, verifies, and presents this data in a format designed for clarity and usability, so users can quickly understand the current situation and track changes over time.</p>
              <p className="text-slate-600 leading-relaxed">We cover active conflicts across multiple regions, providing data visualizations, timelines, and detailed analysis that contextualizes raw numbers within broader geopolitical realities.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Data Sources &amp; Methodology</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Our data is compiled from a range of publicly available sources including: official government reports and military briefings, United Nations agencies (OCHA, UNHCR, WFP), established academic conflict databases (ACLED, SIPRI, Uppsala Conflict Data Program), verified open-source intelligence (OSINT) from credentialed researchers, and reporting from internationally recognized news organizations.</p>
              <p className="text-slate-600 leading-relaxed">We prioritize source transparency and where possible, cross-reference multiple sources before publishing figures. Where sources disagree, we aim to present the range of estimates rather than a single contested figure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Why This Matters</h2>
              <p className="text-slate-600 leading-relaxed">Conflict data is inherently sensitive and often politically contested. We recognize this complexity and strive to present information in a factual, non-partisan manner. Our goal is not to advocate for any particular political position, but to ensure that accurate information is available to support informed discussion, humanitarian response, and evidence-based policy. The numbers we track represent real human lives — and that responsibility guides everything we do.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Team &amp; Background</h2>
              <p className="text-slate-600 leading-relaxed mb-4">The platform was developed by a team of data engineers, journalists, and security researchers passionate about making conflict intelligence accessible to the public. Our backgrounds span open-source intelligence (OSINT), data visualization, and international security studies.</p>
              <p className="text-slate-600 leading-relaxed">We are not affiliated with any government, military organization, or political group. Our work is funded entirely through advertising revenue, which allows us to remain independent and freely accessible to all.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">How We Differ From Traditional Media</h2>
              <p className="text-slate-600 leading-relaxed mb-4">Traditional news media covers conflicts reactively — a story today, silence tomorrow. Battle of Claims provides continuous, structured monitoring that persists beyond news cycles. Where newspapers provide narrative, we provide data. Where TV coverage provides emotion, we provide quantified context.</p>
              <p className="text-slate-600 leading-relaxed">Our structured data format also makes it easy for researchers to track trends over time, compare conflicts across regions, and identify patterns that would be invisible in unstructured reporting.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Contact Us</h2>
              <p className="text-slate-600">For inquiries, corrections, or partnership opportunities, please reach out at <span className="text-purple-600 font-medium">contact@battle-of-claims.vercel.app</span>. We welcome feedback from researchers, journalists, and organizations working in conflict-affected areas.</p>
            </section>
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
