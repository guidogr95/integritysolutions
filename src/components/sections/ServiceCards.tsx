import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { ServiceListItem } from '@/lib/sanity/types'

interface ServiceCardsProps {
  heading?: string
  services: ServiceListItem[]
}

export function ServiceCards({ heading, services }: ServiceCardsProps) {
  return (
    <section id="servicios" aria-label="Nuestros servicios" className="py-24 lg:py-32 bg-white">
      <Container>
        {/* Header */}
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              Especializaciones
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight">
            {heading ?? 'Nuestros servicios'}
          </h2>

          {/* Keyword pills — each links to the relevant service */}
          <div className="flex flex-wrap gap-2 mt-6">
            {([
              { label: 'Verificación de antecedentes', href: '/servicios/integrity-report' },
              { label: 'Pruebas poligráficas',         href: '/servicios/poligrafo' },
              { label: 'Test de integridad laboral',   href: '/servicios/amitai-honestidad' },
              { label: 'Investigación de fraudes',     href: '/servicios/poligrafo' },
              { label: 'AMITAI® Honestidad',           href: '/servicios/amitai-honestidad' },
              { label: 'Seguridad Vial',               href: '/servicios/seguridad-vial' },
              { label: 'Pre empleo',                   href: '/servicios/integrity-report' },
              { label: 'Fuga de información',          href: '/servicios/poligrafo' },
            ] as const).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#F78F1E]/25 bg-[#F78F1E]/6 text-[#F78F1E] text-xs font-semibold tracking-wide hover:bg-[#F78F1E]/15 hover:border-[#F78F1E]/50 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </header>

        {/* 2×2 grid of numbered dark cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const imageUrl = service.cardImage
              ? urlForImage(service.cardImage).width(720).height(540).quality(85).url()
              : `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=720&q=80`

            return (
              <article
                key={service._id}
                className="group relative overflow-hidden rounded-2xl bg-[#032D51] min-h-[320px] lg:min-h-[360px]"
              >
                {/* Background image */}
                <Image
                  src={imageUrl}
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ opacity: 0.3 }}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />

                {/* Gradient */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#032D51] via-[#032D51]/50 to-transparent group-hover:from-[#032D51] group-hover:via-[#032D51]/60 transition-all duration-500"
                />

                {/* Content */}
                <div className="relative z-10 p-8 lg:p-9 flex flex-col justify-between h-full">
                  {/* Service number */}
                  <span
                    aria-hidden
                    className="font-heading font-extrabold text-white/15 text-6xl leading-none select-none"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="mt-auto">
                    <h3 className="font-heading font-extrabold text-white text-2xl mb-2 leading-tight">
                      {service.title}
                    </h3>
                    {service.shortDescription && (
                      <p className="text-white/60 text-sm leading-relaxed mb-6">
                        {service.shortDescription}
                      </p>
                    )}
                    <Link
                      href={`/servicios/${service.slug.current}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-white/25 pb-0.5 hover:text-[#F78F1E] hover:border-[#F78F1E] transition-colors duration-200"
                    >
                      Conocer más
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
