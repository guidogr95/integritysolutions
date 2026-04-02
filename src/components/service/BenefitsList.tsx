import { Container } from '@/components/ui/Container'
import type { BenefitData } from '@/lib/sanity/types'

interface BenefitsListProps {
  heading?: string
  benefits: BenefitData[]
}

export function BenefitsList({ heading = 'Ventajas', benefits }: BenefitsListProps) {
  if (!benefits || benefits.length === 0) return null

  return (
    <section aria-label="Ventajas" className="py-24 lg:py-32 bg-[#F9F9F7]">
      <Container>
        {/* Section header */}
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              Por qué elegirnos
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight">
            {heading}
          </h2>
        </header>

        {/* Numbered benefit cards */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {benefits.map((benefit, i) => (
            <li
              key={benefit._key}
              className="bg-white border border-[#E8E8E6] rounded-2xl p-8 hover:border-[#F78F1E]/30 hover:shadow-md transition-all duration-200"
            >
              <span
                aria-hidden
                className="font-heading font-extrabold text-[#F78F1E]/20 text-5xl leading-none block mb-4 select-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading font-bold text-[#032D51] text-lg mb-2 leading-snug">
                {benefit.title}
              </h3>
              {benefit.description && (
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
