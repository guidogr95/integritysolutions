import type { Image } from 'sanity'

// ---------------------------------------------------------------------------
// Primitives / shared
// ---------------------------------------------------------------------------

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

export interface SeoData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImageAsset
  noIndex?: boolean
}

export interface HeroData {
  heading: string
  subheading?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  backgroundImage?: SanityImageAsset
}

export interface BenefitData {
  _key: string
  title: string
  description?: string
}

export interface StatData {
  _key: string
  number: string
  label: string
}

export interface CertificationLogoData {
  _key: string
  name: string
  logo: SanityImageAsset
  url?: string
}

export interface OfficeLocationData {
  _key: string
  city: string
  addressLine1?: string
  addressLine2?: string
  phones?: string[]
  mapEmbedUrl?: string
}

export interface CtaBannerData {
  heading: string
  highlightedWord?: string
  ctaText: string
  ctaHref: string
}

export interface TrainingProgramData {
  _key: string
  title: string
  certification?: string
  targetAudience?: string
  duration?: string
  topics?: string[]
}

export type SocialPlatform = 'facebook' | 'linkedin' | 'instagram' | 'twitter' | 'whatsapp'

export interface SocialLinkData {
  _key: string
  platform: SocialPlatform
  url: string
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export interface SiteSettingsData {
  _id: string
  _type: 'siteSettings'
  logo: SanityImageAsset
  favicon?: SanityImageAsset
  companyName: string
  companyFoundedYear?: number
  email?: string
  whatsappNumber?: string
  offices?: OfficeLocationData[]
  socialLinks?: SocialLinkData[]
  reportsAccessUrl?: string
  defaultSeo?: SeoData
  googleAnalyticsId?: string
  businessHours?: string
}

export interface HomepageData {
  _id: string
  _type: 'homepage'
  hero?: HeroData
  aboutHeading?: string
  aboutText?: string
  aboutImage?: SanityImageAsset
  certificationsHeading?: string
  certifications?: CertificationLogoData[]
  stats?: StatData[]
  mission?: string
  vision?: string
  values?: string
  clientsHeading?: string
  servicesHeading?: string
  ctaBanner?: CtaBannerData
  seo?: SeoData
}

export interface ServiceData {
  _id: string
  _type: 'service'
  title: string
  slug: { current: string }
  description?: string
  shortDescription?: string
  heroImage?: SanityImageAsset
  cardImage?: SanityImageAsset
  benefitsHeading?: string
  benefits?: BenefitData[]
  trainingPrograms?: TrainingProgramData[]
  externalUrl?: string
  partnerLogo?: SanityImageAsset
  ctaBanner?: CtaBannerData
  order?: number
  seo?: SeoData
}

export interface ContactPageData {
  _id: string
  _type: 'contactPage'
  heading?: string
  formSubjectOptions?: string[]
  whatsappCtaText?: string
  seo?: SeoData
}

export interface ClientLogoData {
  _id: string
  _type: 'clientLogo'
  name: string
  logo: SanityImageAsset
  url?: string
  order?: number
}

// ---------------------------------------------------------------------------
// Query result helpers
// ---------------------------------------------------------------------------

/** Service list item (used in homepage cards, navigation, etc.) */
export type ServiceListItem = Pick<
  ServiceData,
  '_id' | 'title' | 'slug' | 'shortDescription' | 'cardImage'
>
