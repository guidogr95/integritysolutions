import { sanityFetch as _sanityFetch } from './live'
import { client } from './client'
import type {
  SiteSettingsData,
  HomepageData,
  ServiceData,
  ServiceListItem,
  ContactPageData,
  ClientLogoData,
} from './types'
import { groq } from 'next-sanity'

// Typed wrapper: sanityFetch from next-sanity/live infers return type from the
// QueryString generic, but we manage our own types. This wrapper accepts our
// known data types and casts internally.
async function sanityFetch<T>(options: { query: string; tags?: string[] }): Promise<{ data: T }> {
  const result = await (_sanityFetch as (o: { query: string; tags?: string[] }) => Promise<{ data: unknown }>)(options)
  return result as { data: T }
}

// ---------------------------------------------------------------------------
// Fragments
// ---------------------------------------------------------------------------

const seoFragment = groq`
  seo {
    metaTitle,
    metaDescription,
    ogImage { asset, hotspot, crop, alt },
    noIndex
  }
`

const ctaBannerFragment = groq`
  ctaBanner {
    heading,
    highlightedWord,
    ctaText,
    ctaHref
  }
`

const imageFragment = groq`{ asset, hotspot, crop, alt }`

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  _type,
  logo ${imageFragment},
  favicon ${imageFragment},
  companyName,
  companyFoundedYear,
  email,
  whatsappNumber,
  offices[] {
    _key,
    city,
    addressLine1,
    addressLine2,
    phones,
    mapEmbedUrl
  },
  socialLinks[] {
    _key,
    platform,
    url
  },
  reportsAccessUrl,
  ${seoFragment},
  googleAnalyticsId,
  businessHours
}`

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const { data } = await sanityFetch<SiteSettingsData>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })
  return data
}

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

const homepageQuery = groq`*[_type == "homepage"][0] {
  _id,
  _type,
  hero {
    heading,
    subheading,
    description,
    ctaText,
    ctaHref,
    backgroundImage ${imageFragment}
  },
  aboutHeading,
  aboutText,
  aboutImage ${imageFragment},
  certificationsHeading,
  certifications[] {
    _key,
    name,
    logo ${imageFragment},
    url
  },
  stats[] { _key, number, label },
  mission,
  vision,
  values,
  clientsHeading,
  servicesHeading,
  ${ctaBannerFragment},
  ${seoFragment}
}`

export async function getHomepage(): Promise<HomepageData> {
  const { data } = await sanityFetch<HomepageData>({
    query: homepageQuery,
    tags: ['homepage'],
  })
  return data
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

const allServicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  cardImage ${imageFragment}
}`

export async function getAllServices(): Promise<ServiceListItem[]> {
  const { data } = await sanityFetch<ServiceListItem[]>({
    query: allServicesQuery,
    tags: ['service'],
  })
  return data
}

const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  description,
  shortDescription,
  heroImage ${imageFragment},
  cardImage ${imageFragment},
  benefitsHeading,
  benefits[] { _key, title, description },
  trainingPrograms[] {
    _key,
    title,
    certification,
    targetAudience,
    duration,
    topics
  },
  externalUrl,
  partnerLogo ${imageFragment},
  ${ctaBannerFragment},
  order,
  ${seoFragment}
}`

export async function getService(slug: string): Promise<ServiceData> {
  // Use client.fetch for parameterized queries — defineLive's sanityFetch
  // does not forward params to the GROQ runtime in next-sanity v12
  return client.fetch<ServiceData>(
    serviceQuery,
    { slug },
    { next: { tags: [`service:${slug}`, 'service'] } },
  )
}

const allServiceSlugsQuery = groq`*[_type == "service"] { slug }`

export async function getAllServiceSlugs(): Promise<Array<{ slug: { current: string } }>> {
  // Must use plain client.fetch — sanityFetch calls draftMode() which is
  // forbidden inside generateStaticParams (build-time, no HTTP request context)
  return client.fetch<Array<{ slug: { current: string } }>>(
    allServiceSlugsQuery,
    {},
    { next: { tags: ['service'] } },
  )
}

// ---------------------------------------------------------------------------
// Contact Page
// ---------------------------------------------------------------------------

const contactPageQuery = groq`*[_type == "contactPage"][0] {
  _id,
  _type,
  heading,
  formSubjectOptions,
  whatsappCtaText,
  ${seoFragment}
}`

export async function getContactPage(): Promise<ContactPageData> {
  const { data } = await sanityFetch<ContactPageData>({
    query: contactPageQuery,
    tags: ['contactPage'],
  })
  return data
}

// ---------------------------------------------------------------------------
// Client Logos
// ---------------------------------------------------------------------------

const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc) {
  _id,
  _type,
  name,
  logo ${imageFragment},
  url,
  order
}`

export async function getClientLogos(): Promise<ClientLogoData[]> {
  const { data } = await sanityFetch<ClientLogoData[]>({
    query: clientLogosQuery,
    tags: ['clientLogo'],
  })
  return data
}
