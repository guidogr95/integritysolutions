import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import { FadeInSection } from '@/components/ui/Motion'
import type { HomepageData } from '@/lib/sanity/types'

type Props = Pick<HomepageData, 'aboutHeading' | 'aboutText' | 'aboutImage'>

export function AboutSection({ aboutHeading, aboutText, aboutImage }: Props) {
  const imageUrl = aboutImage
    ? urlForImage(aboutImage).width(900).height(1100).quality(90).url()
    : 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85'

  const paragraphs = aboutText
    ? aboutText.split('\n\n').filter(Boolean)
    : [
        'Somos la empresa ecuatoriana de referencia en evaluación de integridad del talento humano. Con más de 18 años de trayectoria, ayudamos a organizaciones del sector privado y público a tomar decisiones de contratación fundamentadas, prevenir el fraude interno y reducir los riesgos derivados del talento humano.',
        'Nuestros profesionales cuentan con certificaciones internacionales de la American Polygraph Association (APA), la Asociación Internacional de Profesionales en Poligrafía (AIPP) y ASIS International — los mismos estándares que exigen las empresas más exigentes del mundo.',
      ]

  return (
    <section
      id="nosotros"
      aria-label="Sobre nosotros"
      className="py-24 lg:py-32 bg-white overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text — left */}
          <FadeInSection>
            <div className="flex items-center gap-3 mb-6">
              <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
              <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                Sobre nosotros
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight tracking-tight mb-8">
              {aboutHeading ?? 'Expertos en Integridad'}
            </h2>

            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[#6B6B6B] text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Quick metrics */}
            <div className="mt-10 pt-10 border-t border-[#E8E8E6] grid grid-cols-3 gap-6">
              <div>
                <p className="font-heading font-extrabold text-[#032D51] text-3xl leading-none">18+</p>
                <p className="text-[#6B6B6B] text-sm mt-1.5">Años de trayectoria</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-[#032D51] text-3xl leading-none">4</p>
                <p className="text-[#6B6B6B] text-sm mt-1.5">Servicios especializados</p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-[#032D51] text-3xl leading-none">150+</p>
                <p className="text-[#6B6B6B] text-sm mt-1.5">Clientes corporativos</p>
              </div>
            </div>
          </FadeInSection>

          {/* Image — right */}
          <FadeInSection delay={0.15} y={20} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#032D51]/15">
              <Image
                src={imageUrl}
                alt="Equipo Integrity Solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative corner accent */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[#F78F1E]/10 -z-10"
            />
          </FadeInSection>
        </div>
      </Container>
    </section>
  )
}
