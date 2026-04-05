import { Container } from '@/components/ui/Container'
import { FadeInSection } from '@/components/ui/Motion'
import type { ProcessStepData } from '@/lib/sanity/types'

interface HowWeWorkProps {
  steps?: ProcessStepData[]
}

const fallbackSteps: ProcessStepData[] = [
  {
    _key: '1',
    stepNumber: 1,
    title: 'Solicitud',
    description:
      'Contáctenos por teléfono, correo o WhatsApp. Analizamos sus necesidades y le orientamos hacia el servicio más adecuado para su caso.',
  },
  {
    _key: '2',
    stepNumber: 2,
    title: 'Diseño del proceso',
    description:
      'Definimos conjuntamente el alcance de la evaluación: perfiles, número de candidatos, cronograma y criterios específicos de su industria.',
  },
  {
    _key: '3',
    stepNumber: 3,
    title: 'Evaluación',
    description:
      'Nuestros profesionales certificados aplican los instrumentos seleccionados con rigor técnico, respeto a las personas y total confidencialidad.',
  },
  {
    _key: '4',
    stepNumber: 4,
    title: 'Informe confidencial',
    description:
      'Entregamos un informe detallado y accionable directamente al responsable designado. Sin ambigüedades — solo la información que su empresa necesita para decidir.',
  },
]

export function HowWeWork({ steps }: HowWeWorkProps) {
  const items = steps && steps.length > 0 ? steps : fallbackSteps

  return (
    <section
      aria-label="Cómo trabajamos"
      className="py-24 lg:py-32 bg-white overflow-hidden"
    >
      <Container>
        {/* Header */}
        <FadeInSection y={20}>
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
              <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                El proceso
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight">
              Cómo trabajamos
            </h2>
            <p className="text-[#6B6B6B] text-lg mt-4 max-w-2xl leading-relaxed">
              Un proceso diseñado para ser claro, eficiente y respetuoso — tanto para su empresa como para las personas evaluadas.
            </p>
          </header>
        </FadeInSection>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {items.map((step, index) => (
            <FadeInSection key={step._key} delay={index * 0.1} y={24}>
              <div className="relative flex flex-col h-full p-8 lg:p-10 border border-[#E8E8E6] rounded-none first:rounded-l-2xl last:rounded-r-2xl
                sm:first:rounded-l-2xl sm:first:rounded-r-none sm:last:rounded-r-2xl sm:last:rounded-l-none
                [&:not(:last-child)]:border-r-0
                max-sm:first:rounded-t-2xl max-sm:first:rounded-b-none max-sm:last:rounded-b-2xl max-sm:last:rounded-t-none max-sm:[&:not(:last-child)]:border-b-0
                group hover:bg-[#F9F9F7] transition-colors duration-200">

                {/* Step number */}
                <div className="mb-6">
                  <span
                    aria-hidden
                    className="font-heading font-extrabold text-[#032D51] text-5xl leading-none"
                  >
                    {String(step.stepNumber).padStart(2, '0')}
                  </span>
                </div>

                {/* Orange accent */}
                <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] mb-5" />

                {/* Content */}
                <h3 className="font-heading font-extrabold text-[#032D51] text-xl mb-3">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-[#6B6B6B] text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </Container>
    </section>
  )
}
