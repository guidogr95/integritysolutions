import { Container } from '@/components/ui/Container'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/ui/Motion'
import {
  Landmark,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Cpu,
  HeartPulse,
  Building2,
  Factory,
} from 'lucide-react'

const industries = [
  { label: 'Banca y Finanzas', Icon: Landmark },
  { label: 'Seguros', Icon: ShieldCheck },
  { label: 'Logística y Transporte', Icon: Truck },
  { label: 'Retail', Icon: ShoppingBag },
  { label: 'Tecnología', Icon: Cpu },
  { label: 'Salud', Icon: HeartPulse },
  { label: 'Sector Público', Icon: Building2 },
  { label: 'Manufactura', Icon: Factory },
]

export function IndustriesSection() {
  return (
    <section
      aria-label="Sectores que atendemos"
      className="py-20 lg:py-24 bg-[#032D51] overflow-hidden"
    >
      <Container>
        {/* Header */}
        <FadeInSection y={20}>
          <header className="mb-12 lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
                <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                  Sectores
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-white text-4xl sm:text-5xl leading-tight">
                Trabajamos con los sectores<br className="hidden sm:block" /> más exigentes del Ecuador
              </h2>
            </div>
            <p className="text-white/50 text-sm mt-4 lg:mt-0 lg:max-w-xs leading-relaxed lg:text-right">
              Cada industria tiene sus propios riesgos. Nuestras evaluaciones se adaptan a las necesidades específicas de su sector.
            </p>
          </header>
        </FadeInSection>

        {/* Industry grid */}
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          initialDelay={0.05}
        >
          {industries.map(({ label, Icon }) => (
            <StaggerItem key={label}>
              <div className="flex flex-col items-start gap-4 p-6 rounded-xl border border-white/8 bg-white/4 hover:bg-white/8 hover:border-white/15 transition-colors duration-200 cursor-default group">
                <div
                  aria-hidden
                  className="w-10 h-10 rounded-lg bg-[#F78F1E]/10 flex items-center justify-center group-hover:bg-[#F78F1E]/20 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-[#F78F1E]" aria-hidden />
                </div>
                <p className="font-heading font-bold text-white text-sm leading-tight">
                  {label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}
