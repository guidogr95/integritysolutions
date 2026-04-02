import { Target, Eye, Gem } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/ui/Motion'
import type { HomepageData } from '@/lib/sanity/types'

type Props = Pick<HomepageData, 'mission' | 'vision' | 'values'>

export function MissionVisionValues({ mission, vision, values }: Props) {
  const missionText =
    mission ??
    'Verificar la integridad del talento humano, brindando servicios de poligrafía, estudios de seguridad personal, asesoría, consultoría e investigaciones en seguridad privada.'

  const visionText =
    vision ??
    'Minimizar los riesgos relacionados con el talento humano, liderando el mercado con servicios profesionales, confiables y de calidad.'

  const valuesText = values ?? 'Veracidad. Honestidad. Confianza. Compromiso.'

  return (
    <section
      aria-label="Misión, visión y valores"
      className="py-24 lg:py-32 bg-[#F9F9F7]"
    >
      <Container>
        {/* Section header */}
        <FadeInSection y={20}>
          <header className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              Fundamentos
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight">
            Nuestros Principios
          </h2>
          </header>
        </FadeInSection>

        {/* Bento grid: Misión takes left large column, Visión + Valores stack on right */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-4" initialDelay={0.05}>
          {/* Misión — navy, dominant */}
          <StaggerItem className="lg:col-span-5">
            <article className="bg-[#032D51] rounded-2xl p-10 lg:p-12 flex flex-col gap-8 min-h-[340px] h-full">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center self-start">
              <Target className="h-5 w-5 text-[#F78F1E]" aria-hidden />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-2xl mb-4">Misión</h3>
              <p className="text-white/65 text-base leading-relaxed">{missionText}</p>
            </div>
            </article>
          </StaggerItem>

          {/* Right column: Visión + Valores */}
          <StaggerItem className="lg:col-span-7">
            <div className="grid grid-rows-2 gap-4 h-full">
              {/* Visión */}
              <article className="bg-white border border-[#E8E8E6] rounded-2xl p-10 flex flex-col gap-6">
              <div className="w-11 h-11 rounded-xl bg-[#F78F1E]/10 flex items-center justify-center self-start">
                <Eye className="h-5 w-5 text-[#F78F1E]" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-[#032D51] text-2xl mb-3">Visión</h3>
                <p className="text-[#6B6B6B] text-base leading-relaxed">{visionText}</p>
              </div>
              </article>

              {/* Valores */}
              <article className="bg-[#032D51]/5 border border-[#E8E8E6] rounded-2xl p-10 flex flex-col gap-6">
              <div className="w-11 h-11 rounded-xl bg-[#032D51] flex items-center justify-center self-start">
                <Gem className="h-5 w-5 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-[#032D51] text-2xl mb-3">Valores</h3>
                <p className="text-[#6B6B6B] text-base leading-relaxed">{valuesText}</p>
              </div>
              </article>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  )
}
