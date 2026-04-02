import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { ClientLogoData } from '@/lib/sanity/types'

interface ClientMarqueeProps {
  heading?: string
  clients: ClientLogoData[]
}

export function ClientMarquee({ heading, clients }: ClientMarqueeProps) {
  if (!clients || clients.length === 0) return null

  // Duplicate for seamless loop
  const items = [...clients, ...clients]

  return (
    <section aria-label="Clientes" className="py-20 lg:py-24 bg-[#F9F9F7] overflow-hidden">
      <Container>
        <div className="flex items-center gap-3 mb-12">
          <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
          <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
            {heading ?? 'Empresas que confían en nosotros'}
          </span>
        </div>
      </Container>

      {/* Marquee — CSS-only, no JS */}
      <div aria-hidden className="relative flex overflow-hidden" role="presentation">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9F9F7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9F9F7] to-transparent z-10 pointer-events-none" />

        <ul
          role="list"
          className="flex shrink-0 gap-12 pr-12 animate-marquee"
          aria-label="Logos de clientes"
        >
          {items.map((client, i) => {
            const logoUrl = urlForImage(client.logo).width(160).height(70).url()
            return (
              <li
                key={`${client._id}-${i}`}
                className="shrink-0 flex items-center"
              >
                {client.url ? (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={client.name}
                    tabIndex={-1}
                    className="block opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Image
                      src={logoUrl}
                      alt={client.name}
                      width={160}
                      height={64}
                      className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                ) : (
                  <Image
                    src={logoUrl}
                    alt={client.name}
                    width={160}
                    height={64}
                    className="h-14 w-auto object-contain grayscale opacity-50"
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
