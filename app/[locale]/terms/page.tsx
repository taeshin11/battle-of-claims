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
  title: 'Terms of Service',
  description: 'Battle of Claims Terms of Service — the rules and conditions governing use of our platform.',
  keywords: 'terms of service, terms of use, user agreement, legal',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using Battle of Claims ("the Service") at battle-of-claims.vercel.app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service following any such modification constitutes your acceptance of the modified terms.'
  },
  {
    title: '2. Description of Service',
    content: 'Battle of Claims is a free, publicly accessible web platform that analyzes territorial disputes, boundary conflicts, and competing sovereignty claims between nations. The Service is provided for informational and educational purposes only. We do not charge fees for access and require no user registration.'
  },
  {
    title: '3. Disclaimer of Warranties',
    content: 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not warrant that the data presented is complete, accurate, current, or free of errors. Conflict data is inherently uncertain, rapidly changing, and subject to interpretation. ALL DATA ON THIS PLATFORM IS FOR INFORMATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE MILITARY ADVICE, LEGAL ADVICE, FINANCIAL ADVICE, OR PROFESSIONAL INTELLIGENCE ANALYSIS. Users should independently verify information before making decisions based on it.'
  },
  {
    title: '4. Limitation of Liability',
    content: 'TO THE FULLEST EXTENT PERMITTED BY LAW, BATTLE OF CLAIMS AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE. Our total liability for any claim arising out of or relating to the Service shall not exceed $0 (zero dollars), as the Service is provided entirely free of charge.'
  },
  {
    title: '5. Accuracy and Timeliness of Information',
    content: 'We strive to present accurate, up-to-date information from reliable sources. However, conflict data is dynamic and contested. We make no guarantees about the timeliness, accuracy, completeness, or suitability of information on this platform for any particular purpose. The Service aggregates and presents data from third-party sources, and we are not responsible for errors or omissions in those underlying sources.'
  },
  {
    title: '6. Intellectual Property',
    content: 'The design, layout, and original written content of Battle of Claims are protected by copyright. Underlying conflict data may be subject to the licenses and terms of the original data sources (such as ACLED, SIPRI, or UN agencies). You may reference and cite information from this platform for non-commercial, educational, or journalistic purposes, provided you attribute the source appropriately. Systematic scraping, automated bulk downloading, or republishing substantial portions of our data for commercial purposes without permission is prohibited.'
  },
  {
    title: '7. Prohibited Uses',
    content: 'You agree not to use the Service to: (a) engage in any activity that is illegal under applicable law; (b) attempt to gain unauthorized access to any portion of the Service or its related systems; (c) systematically harvest data from the Service using automated tools without our permission; (d) use the Service to spread disinformation, propaganda, or deliberately misleading interpretations of conflict data; (e) interfere with or disrupt the integrity or performance of the Service.'
  },
  {
    title: '8. Third-Party Content and Links',
    content: 'The Service may display advertising served by third parties (including Google AdSense) and may contain links to external websites. We are not responsible for the content, privacy practices, or accuracy of third-party sites. The inclusion of any link does not imply endorsement by Battle of Claims of the linked site. Third-party advertisers are responsible for the content of their ads, and we are not liable for any claims arising from advertising content.'
  },
  {
    title: '9. Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through good-faith negotiation before any legal action is taken.'
  },
  {
    title: '10. Contact',
    content: 'For questions about these Terms of Service, please contact us at contact@battle-of-claims.vercel.app.'
  }
]

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span>Terms of Service</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500 mb-10">Last updated: April 2025</p>

          <div className="space-y-6">
            {sections.map(({ title, content }) => (
              <section key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
              </section>
            ))}
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
