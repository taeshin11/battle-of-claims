import { MetadataRoute } from 'next'
import claims from '@/public/data/claims.json'

const BASE_URL = 'https://battle-of-claims.vercel.app'
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt']
const conflicts = ['ukraine-russia', 'israel-hamas', 'sudan', 'myanmar']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({ url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 })
    entries.push({ url: `${BASE_URL}/${locale}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 })
    for (const slug of conflicts) {
      entries.push({ url: `${BASE_URL}/${locale}/conflict/${slug}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 })
    }
    for (const claim of claims) {
      entries.push({ url: `${BASE_URL}/${locale}/claim/${claim.id}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 })
    }
  }

  return entries
}
