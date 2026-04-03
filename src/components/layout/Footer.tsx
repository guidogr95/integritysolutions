import Link from 'next/link'
import { Facebook, Linkedin, Instagram, Twitter, MessageCircle, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import type { SiteSettingsData, SocialPlatform } from '@/lib/sanity/types'

interface FooterProps {
  siteSettings: SiteSettingsData
}

const serviceLinks = [
  { label: 'Integrity Report', href: '/servicios/integrity-report' },
  { label: 'Polígrafo', href: '/servicios/poligrafo' },
  { label: 'AMITAI® Honestidad', href: '/servicios/amitai-honestidad' },
]

const socialIconMap: Record<SocialPlatform, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4" aria-hidden />,
  linkedin: <Linkedin className="h-4 w-4" aria-hidden />,
  instagram: <Instagram className="h-4 w-4" aria-hidden />,
  twitter: <Twitter className="h-4 w-4" aria-hidden />,
  whatsapp: <MessageCircle className="h-4 w-4" aria-hidden />,
}

export function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#032D51]">
      <Container as="div" className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <p className="font-heading font-extrabold text-white text-lg mb-3">
              {siteSettings?.companyName ?? 'Integrity Solutions'}
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Evaluación de integridad del talento humano en Ecuador.
            </p>
            {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 && (
              <ul role="list" className="flex gap-2">
                {siteSettings.socialLinks.map((social) => (
                  <li key={social._key}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 text-white/60 hover:bg-[#F78F1E] hover:text-white transition-colors duration-200"
                    >
                      {socialIconMap[social.platform.toLowerCase() as SocialPlatform] ?? <MessageCircle className="h-4 w-4" aria-hidden />}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">
              Servicios
            </p>
            <ul role="list" className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-1 lg:col-span-2">
            <p className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">
              Contacto
            </p>
            <div className="space-y-4">
              {siteSettings?.offices?.map((office) => (
                <div key={office._key} className="text-sm leading-relaxed">
                  <p className="font-semibold text-white/80 mb-1">{office.city}</p>
                  {office.addressLine1 && <p className="text-white/45">{office.addressLine1}</p>}
                  {office.addressLine2 && <p className="text-white/45">{office.addressLine2}</p>}
                  {office.phones?.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-white/45 hover:text-[#F78F1E] transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              ))}
              {siteSettings?.email && (
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center gap-2 text-white/45 text-sm hover:text-[#F78F1E] transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteSettings.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/8">
        <Container as="div" className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {currentYear} Integrity Solutions. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs">
            Ecuador
          </p>
        </Container>
      </div>
    </footer>
  )
}
