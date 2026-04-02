import type { Metadata } from 'next'
import { Mail, Phone } from 'lucide-react'
import { getContactPage, getSiteSettings } from '@/lib/sanity/queries'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/sections/ContactForm'
import { LocationMaps } from '@/components/sections/LocationMaps'

export async function generateMetadata(): Promise<Metadata> {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ])

  const seo = contactPage?.seo ?? siteSettings?.defaultSeo
  const title =
    seo?.metaTitle ??
    `Contacto | ${siteSettings?.companyName ?? 'Integrity Solutions'}`
  const description =
    seo?.metaDescription ??
    'Contáctanos para cotizar nuestros servicios de evaluación de integridad: polígrafo, Integrity Report, AMITAI y Seguridad Vial.'

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: 'https://www.integritysolutions.ec/contacto',
    },
  }
}

export default async function ContactoPage() {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ])

  return (
    <>
      {/* Page hero */}
      <section className="relative bg-[#032D51] py-20 lg:py-28 overflow-hidden">
        {/* Decorative background grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#F78F1E 1px, transparent 1px), linear-gradient(90deg, #F78F1E 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Orange accent blob */}
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#F78F1E]/10 blur-3xl"
        />
        <Container className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              Contacto
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-white text-5xl sm:text-6xl leading-tight">
            {contactPage?.heading ?? 'Contáctanos'}
          </h1>
          
        </Container>
      </section>

      {/* Main content */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form — 3/5 */}
            <div className="lg:col-span-3">
              <h2 className="font-heading font-extrabold text-[#032D51] text-2xl mb-8">
                Envíanos un mensaje
              </h2>
              <ContactForm
                subjectOptions={contactPage?.formSubjectOptions ?? undefined}
                whatsappNumber={siteSettings?.whatsappNumber}
                whatsappCtaText={contactPage?.whatsappCtaText}
              />
            </div>

            {/* Contact info — 2/5 */}
            <div className="lg:col-span-2">
              <h2 className="font-heading font-extrabold text-[#032D51] text-2xl mb-8">
                Información de contacto
              </h2>

              <div className="space-y-6">
                {siteSettings?.email && (
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 shrink-0 mt-0.5 text-[#F78F1E]" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-[#032D51] mb-0.5">Email</p>
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="text-sm text-[#747474] hover:text-[#F78F1E] transition-colors"
                      >
                        {siteSettings.email}
                      </a>
                    </div>
                  </div>
                )}

                {siteSettings?.offices?.map((office) => (
                  <div key={office._key} className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 mt-0.5 text-[#F78F1E]" aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-[#032D51] mb-0.5">
                        {office.city}
                      </p>
                      {office.addressLine1 && (
                        <p className="text-sm text-[#747474]">{office.addressLine1}</p>
                      )}
                      {office.addressLine2 && (
                        <p className="text-sm text-[#747474]">{office.addressLine2}</p>
                      )}
                      {office.phones?.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="block text-sm text-[#747474] hover:text-[#F78F1E] transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LocationMaps offices={siteSettings?.offices} />
    </>
  )
}
