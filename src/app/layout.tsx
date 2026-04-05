import type { Metadata } from 'next'
import { Montserrat, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/sanity/queries'
import { SanityLive } from '@/lib/sanity/live'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionOverlay } from '@/components/providers/PageTransitionOverlay'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import type { SiteSettingsData } from '@/lib/sanity/types'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.integritysolutions.ec'),
  title: {
    default: 'Integrity Solutions — Evaluación de Integridad del Talento Humano',
    template: '%s | Integrity Solutions',
  },
  description:
    'Empresa ecuatoriana especializada en evaluación de integridad del talento humano mediante polígrafo, Integrity Report y AMITAI® Honestidad.',
  keywords: [
    'policiesógrafo Ecuador',
    'pruebas poligráficas Quito',
    'pruebas poligráficas Guayaquil',
    'verificación de antecedentes Ecuador',
    'Integrity Report',
    'evaluación de integridad',
    'AMITAI honestidad',
    'estudios de seguridad personal',
    'investigación de fraudes',
    'preempleo Ecuador',
    'integridad del talento humano',
  ],
  openGraph: {
    siteName: 'Integrity Solutions',
    locale: 'es_EC',
    type: 'website',
    url: 'https://www.integritysolutions.ec',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: '5e128371297fad39',
  },
  alternates: {
    canonical: 'https://www.integritysolutions.ec',
  },
}

function buildOrganizationJsonLd(siteSettings: SiteSettingsData | null) {
  const offices =
    siteSettings?.offices?.map((o) => ({
      '@type': 'PostalAddress',
      addressLocality: o.city,
      addressCountry: 'EC',
      streetAddress: [o.addressLine1, o.addressLine2].filter(Boolean).join(', '),
    })) ?? []

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteSettings?.companyName ?? 'Integrity Solutions',
    url: 'https://www.integritysolutions.ec',
    logo: 'https://www.integritysolutions.ec/logo.svg',
    email: siteSettings?.email ?? 'vguevara@integritysolutions.ec',
    telephone: siteSettings?.whatsappNumber ? `+${siteSettings.whatsappNumber}` : '+593995527670',
    address: offices.length > 0 ? offices : undefined,
    openingHours: siteSettings?.businessHours,
    sameAs: siteSettings?.socialLinks?.map((s) => s.url) ?? [],
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings()
  const orgJsonLd = buildOrganizationJsonLd(siteSettings)

  return (
    <html data-scroll-behavior="smooth" lang="es" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="bg-white text-[#3F3F3F]">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido principal
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        <PageTransitionOverlay />

        <SmoothScrollProvider>
          <Header siteSettings={siteSettings} />

          <main id="main-content">{children}</main>

          <Footer siteSettings={siteSettings} />
        </SmoothScrollProvider>
        <SanityLive />
        <WhatsAppButton phoneNumber={siteSettings?.whatsappNumber} />

        {siteSettings?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteSettings.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
