import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FadeInSection } from '@/components/ui/Motion'
import type { CtaBannerData } from '@/lib/sanity/types'

interface CtaBannerProps {
  data?: CtaBannerData
  whatsappNumber?: string
}

export function CtaBanner({ data, whatsappNumber }: CtaBannerProps) {
  const heading = data?.heading ?? 'Proteja su empresa antes de que ocurra el problema'
  const ctaText = data?.ctaText ?? 'Solicitar evaluación'
  const ctaHref = data?.ctaHref ?? '/contacto'
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios.`
    : null

  const renderHeading = () => {
    if (!data?.highlightedWord) return heading
    const parts = heading.split(data.highlightedWord)
    if (parts.length < 2) return heading
    return (
      <>
        {parts[0]}
        <span className="text-[#F78F1E]">{data.highlightedWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section aria-label="Llamada a la acción" className="bg-[#032D51] py-20 lg:py-28">
      <Container>
        <FadeInSection y={18}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E]" />
              <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                ¿Listos para comenzar?
              </span>
              <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E]" />
            </div>
            <h2 className="font-heading font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-10">
              {renderHeading()}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={ctaHref} variant="primary" size="lg">
                {ctaText}
              </Button>
              {waHref && (
                <Link
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[6px] font-heading font-semibold text-lg border border-white/25 text-white hover:bg-white/10 hover:border-white/50 transition-colors duration-150"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  WhatsApp
                </Link>
              )}
            </div>
          </div>
        </FadeInSection>
      </Container>
    </section>
  )
}
