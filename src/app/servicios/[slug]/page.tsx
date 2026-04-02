import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllServiceSlugs, getService, getSiteSettings } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ServiceHero } from '@/components/service/ServiceHero'
import { BenefitsList } from '@/components/service/BenefitsList'
import { TrainingPrograms } from '@/components/service/TrainingPrograms'
import { CtaBanner } from '@/components/sections/CtaBanner'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map(({ slug }) => ({ slug: slug.current }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [service, siteSettings] = await Promise.all([
    getService(slug),
    getSiteSettings(),
  ])

  if (!service) return {}

  const seo = service.seo
  const title = seo?.metaTitle ?? `${service.title} | ${siteSettings?.companyName ?? 'Integrity Solutions'}`
  const description = seo?.metaDescription ?? service.description

  const ogImageUrl = seo?.ogImage
    ? urlForImage(seo.ogImage).width(1200).height(630).url()
    : service.heroImage
      ? urlForImage(service.heroImage).width(1200).height(630).url()
      : undefined

  return {
    title,
    description,
    keywords: [
      service.title,
      'integridad del talento humano Ecuador',
      'Integrity Solutions',
      ...(service.seo?.metaTitle ? [service.seo.metaTitle] : []),
    ],
    openGraph: {
      title,
      description: description ?? undefined,
      images: ogImageUrl ? [ogImageUrl] : [],
      locale: 'es_EC',
      type: 'website',
      url: `https://www.integritysolutions.ec/servicios/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
    },
    alternates: {
      canonical: `https://www.integritysolutions.ec/servicios/${slug}`,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) notFound()

  const hasTrainingPrograms =
    service.trainingPrograms && service.trainingPrograms.length > 0

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.integritysolutions.ec',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: 'https://www.integritysolutions.ec/#servicios',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.integritysolutions.ec/servicios/${slug}`,
      },
    ],
  }

  // JSON-LD Service schema
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description ?? undefined,
    url: `https://www.integritysolutions.ec/servicios/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Integrity Solutions',
      url: 'https://www.integritysolutions.ec',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Ecuador',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/#servicios' },
          { label: service.title },
        ]}
      />

      <ServiceHero
        title={service.title}
        description={service.description}
        heroImage={service.heroImage}
      />

      {service.benefits && service.benefits.length > 0 && (
        <BenefitsList
          heading={service.benefitsHeading}
          benefits={service.benefits}
        />
      )}

      {hasTrainingPrograms && (
        <TrainingPrograms programs={service.trainingPrograms!} />
      )}

      <CtaBanner data={service.ctaBanner} />
    </>
  )
}
