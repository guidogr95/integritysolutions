import type { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/lib/sanity/queries'

const BASE_URL = 'https://www.integritysolutions.ec'

export const revalidate = 86400 // regenerate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllServiceSlugs()

  const serviceUrls: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/servicios/${slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...serviceUrls,
  ]
}
