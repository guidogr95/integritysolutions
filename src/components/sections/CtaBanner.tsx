import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FadeInSection } from '@/components/ui/Motion'
import type { CtaBannerData } from '@/lib/sanity/types'

interface CtaBannerProps {
  data?: CtaBannerData
}

export function CtaBanner({ data }: CtaBannerProps) {
  const heading = data?.heading ?? '¿Listos para evaluar la integridad de su equipo?'
  const ctaText = data?.ctaText ?? 'Solicitar evaluación'
  const ctaHref = data?.ctaHref ?? '/contacto'

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
            <Button href={ctaHref} variant="primary" size="lg">
              {ctaText}
            </Button>
          </div>
        </FadeInSection>
      </Container>
    </section>
  )
}
