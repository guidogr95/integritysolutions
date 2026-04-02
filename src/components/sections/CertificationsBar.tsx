import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/ui/Motion'
import type { CertificationLogoData } from '@/lib/sanity/types'

interface CertificationsBarProps {
  heading?: string
  certifications?: CertificationLogoData[]
}

const fallbackCertifications = [
  { _key: 'aipp', name: 'AIPP', logo: null, url: null },
  { _key: 'setec', name: 'SETEC', logo: null, url: null },
  { _key: 'asis', name: 'ASIS International', logo: null, url: null },
  { _key: 'apa', name: 'APA', logo: null, url: null },
]

export function CertificationsBar({
  heading = 'Avalados por',
  certifications,
}: CertificationsBarProps) {
  const items =
    certifications && certifications.length > 0 ? certifications : fallbackCertifications

  return (
    <section
      aria-label="Certificaciones"
      className="py-12 lg:py-16 bg-white border-y border-[#E8E8E6]"
    >
      <Container>
        <FadeInSection y={16}>
          <p className="text-center font-heading font-bold text-[#A6A6A6] text-xs uppercase tracking-[0.2em] mb-10">
            {heading}
          </p>
        </FadeInSection>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6"
          staggerDelay={0.07}
          initialDelay={0.1}
        >
          {items.map((cert) => {
            const imageUrl =
              cert.logo ? urlForImage(cert.logo).height(160).url() : null

            const inner = (
              <>
                {imageUrl ? (
                  <div className="relative h-20 w-full">
                    <Image
                      src={imageUrl}
                      alt={cert.name}
                      fill
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 640px) 45vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center">
                    <span className="font-heading font-bold text-[#A6A6A6] text-base tracking-wide text-center">
                      {cert.name}
                    </span>
                  </div>
                )}
                <span className="text-[10px] font-bold text-[#A6A6A6] uppercase tracking-[0.15em] text-center mt-1">
                  {cert.name}
                </span>
              </>
            )

            return (
              <StaggerItem key={cert._key} className="list-none">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={cert.name}
                    className="flex flex-col items-center gap-2 bg-white border border-[#E8E8E6] rounded-2xl px-6 py-8 opacity-70 hover:opacity-100 hover:border-[#F78F1E]/30 hover:shadow-md transition-all duration-200"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex flex-col items-center gap-2 bg-white border border-[#E8E8E6] rounded-2xl px-6 py-8 opacity-70 hover:opacity-100 hover:border-[#F78F1E]/30 hover:shadow-md transition-all duration-200">
                    {inner}
                  </div>
                )}
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
