import type { Metadata } from 'next'
import { getSiteSettings, getHomepage, getAllServices, getClientLogos } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { Hero } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/AboutSection'
import { CertificationsBar } from '@/components/sections/CertificationsBar'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { MissionVisionValues } from '@/components/sections/MissionVisionValues'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { ClientMarquee } from '@/components/sections/ClientMarquee'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { LocationMaps } from '@/components/sections/LocationMaps'

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, siteSettings] = await Promise.all([getHomepage(), getSiteSettings()])
  const seo = homepage?.seo ?? siteSettings?.defaultSeo

  const ogImageUrl = seo?.ogImage
    ? urlForImage(seo.ogImage).width(1200).height(630).url()
    : undefined

  return {
    title: seo?.metaTitle ?? 'Integrity Solutions — Evaluación de Integridad del Talento Humano',
    description:
      seo?.metaDescription ??
      'Empresa ecuatoriana especializada en evaluación de integridad del talento humano mediante polígrafo, Integrity Report, AMITAI y Seguridad Vial.',
    openGraph: {
      title: seo?.metaTitle ?? 'Integrity Solutions',
      description: seo?.metaDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
      url: 'https://www.integritysolutions.ec',
    },
    alternates: {
      canonical: 'https://www.integritysolutions.ec',
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function HomePage() {
  const [siteSettings, homepage, services, clientLogos] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
    getAllServices(),
    getClientLogos(),
  ])

  return (
    <>
      <Hero hero={homepage?.hero} siteSettings={siteSettings} />

      <AboutSection
        aboutHeading={homepage?.aboutHeading}
        aboutText={homepage?.aboutText}
        aboutImage={homepage?.aboutImage}
      />

      <CertificationsBar
        heading={homepage?.certificationsHeading}
        certifications={homepage?.certifications}
      />

      <StatsCounter stats={homepage?.stats} />

      <MissionVisionValues
        mission={homepage?.mission}
        vision={homepage?.vision}
        values={homepage?.values}
      />

      <ServiceCards heading={homepage?.servicesHeading} services={services} />

      <ClientMarquee heading={homepage?.clientsHeading} clients={clientLogos} />

      <CtaBanner data={homepage?.ctaBanner} />

      <LocationMaps offices={siteSettings?.offices} />
    </>
  )
}
