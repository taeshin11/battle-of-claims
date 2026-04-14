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
  title: 'Privacy Policy',
  description: 'Battle of Claims Privacy Policy — how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, cookies, GDPR',
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span>Privacy Policy</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 mb-10">Last updated: April 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">Battle of Claims (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website at battle-of-claims.vercel.app (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Information We Collect</h2>
              <p className="text-slate-600 leading-relaxed mb-3"><strong>Automatically Collected Data:</strong> When you visit our site, we may automatically collect certain information including your browser type, operating system, referring URLs, device information, and pages visited. This is collected through standard server logs and analytics tools.</p>
              <p className="text-slate-600 leading-relaxed"><strong>No Registration Required:</strong> We do not require users to create accounts or provide personal information such as names, email addresses, or payment details to use our platform. We do not intentionally collect personally identifiable information.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Cookies and Tracking Technologies</h2>
              <p className="text-slate-600 leading-relaxed mb-3">We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and serve relevant advertisements. Types of cookies used include:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
                <li><strong>Analytics cookies:</strong> Used by Google Analytics to understand how visitors interact with our site. Data collected is anonymized and aggregated.</li>
                <li><strong>Advertising cookies:</strong> Used by Google AdSense and other ad networks to serve personalized advertisements based on your browsing history and interests.</li>
                <li><strong>Preference cookies:</strong> Store user preferences such as language selection.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">You can control cookie settings through your browser preferences. Blocking certain cookies may affect site functionality.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Google AdSense &amp; Third-Party Advertising</h2>
              <p className="text-slate-600 leading-relaxed mb-3">We use Google AdSense to display advertisements on our site. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>
              <p className="text-slate-600 leading-relaxed mb-3">You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.</p>
              <p className="text-slate-600 leading-relaxed">Google AdSense also uses the DoubleClick cookie to improve ad quality. Learn more about how Google collects and uses data at <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy &amp; Terms</a>.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Google Analytics</h2>
              <p className="text-slate-600 leading-relaxed">We use Google Analytics to analyze traffic patterns and understand how users interact with our site. Google Analytics collects information such as how often users visit the site, what pages they visit, and what other sites they used before coming to our site. We use this information to improve our service. Google Analytics collects only the IP address assigned to you on the date you visit this site, not your name or other identifying information. We do not combine the information collected through Google Analytics with personally identifiable information.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Third-Party Links</h2>
              <p className="text-slate-600 leading-relaxed">Our website may contain links to third-party websites and data sources. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Data Retention &amp; Security</h2>
              <p className="text-slate-600 leading-relaxed">We implement reasonable security measures to protect against unauthorized access to or alteration, disclosure, or destruction of data. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Analytics and server log data is retained for up to 26 months before being automatically deleted.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Children&apos;s Privacy</h2>
              <p className="text-slate-600 leading-relaxed">Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Changes to This Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">10. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">If you have questions or concerns about this Privacy Policy, please contact us at: <strong>contact@battle-of-claims.vercel.app</strong></p>
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
