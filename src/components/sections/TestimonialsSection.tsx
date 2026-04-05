import { Container } from '@/components/ui/Container'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/ui/Motion'
import type { TestimonialData } from '@/lib/sanity/types'

interface TestimonialsSectionProps {
  testimonials?: TestimonialData[]
}

const fallbackTestimonials: TestimonialData[] = [
  {
    _key: '1',
    quote:
      'Gracias a Integrity Solutions identificamos inconsistencias críticas en el perfil de tres candidatos a puestos financieros que, de no haber sido detectadas, habrían representado un riesgo significativo para nuestra organización. El proceso fue profesional, ágil y completamente confidencial.',
    authorRole: 'Director de Recursos Humanos',
    authorCompany: 'Empresa del sector bancario',
    isAnonymized: true,
  },
  {
    _key: '2',
    quote:
      'Llevamos más de cinco años trabajando con ellos para el proceso de preempleo de nuestros conductores y operadores logísticos. La combinación de polígrafo y verificación de antecedentes nos ha permitido reducir considerablemente los incidentes internos.',
    authorRole: 'Gerente de Seguridad',
    authorCompany: 'Empresa del sector logístico',
    isAnonymized: true,
  },
  {
    _key: '3',
    quote:
      'El test AMITAI nos dio una perspectiva que la entrevista tradicional no puede ofrecer. Hemos mejorado la calidad de nuestras contrataciones y reducido la rotación en puestos de alto impacto. Lo recomendamos ampliamente para cualquier empresa que tome en serio su talento humano.',
    authorRole: 'Gerente General',
    authorCompany: 'Empresa del sector retail',
    isAnonymized: true,
  },
]

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items =
    testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <section
      aria-label="Testimonios de clientes"
      className="py-24 lg:py-32 bg-[#F9F9F7] overflow-hidden"
    >
      <Container>
        {/* Header */}
        <FadeInSection y={20}>
          <header className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
              <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                Lo que dicen nuestros clientes
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight">
              Confianza construida<br className="hidden sm:block" /> caso a caso
            </h2>
          </header>
        </FadeInSection>

        {/* Testimonial cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initialDelay={0.05}
        >
          {items.map((t) => {
            const displayName = t.isAnonymized ? null : t.authorName
            const attribution = [t.authorRole, t.authorCompany]
              .filter(Boolean)
              .join(' — ')

            return (
              <StaggerItem key={t._key}>
                <figure className="flex flex-col justify-between bg-white border border-[#E8E8E6] rounded-2xl p-8 h-full shadow-sm hover:shadow-md hover:border-[#F78F1E]/30 transition-all duration-200">
                  {/* Decorative quote mark */}
                  <div
                    aria-hidden
                    className="font-heading font-extrabold text-[#F78F1E]/20 text-7xl leading-none select-none mb-4 -mt-2"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="flex-1">
                    <p className="text-[#3F3F3F] text-base leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>
                  {/* Author */}
                  <figcaption className="mt-6 pt-5 border-t border-[#E8E8E6]">
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder — orange circle with initials */}
                      <div
                        aria-hidden
                        className="w-9 h-9 rounded-full bg-[#F78F1E]/15 flex items-center justify-center shrink-0"
                      >
                        <span className="text-[#F78F1E] text-xs font-bold">
                          {displayName
                            ? displayName
                                .split(' ')
                                .slice(0, 2)
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()
                            : t.authorRole?.[0]?.toUpperCase() ?? 'C'}
                        </span>
                      </div>
                      <div>
                        {displayName && (
                          <p className="font-heading font-bold text-[#032D51] text-sm leading-tight">
                            {displayName}
                          </p>
                        )}
                        {attribution && (
                          <p className="text-[#6B6B6B] text-xs leading-snug mt-0.5">
                            {attribution}
                          </p>
                        )}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </section>
  )
}
