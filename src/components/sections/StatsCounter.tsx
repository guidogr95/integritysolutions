import { Container } from '@/components/ui/Container'
import type { StatData } from '@/lib/sanity/types'

interface StatsCounterProps {
  stats?: StatData[]
}

const fallbackStats: Omit<StatData, '_key'>[] = [
  { number: '50,000+', label: 'Reportes de integridad evaluados' },
  { number: '7,500+', label: 'Pruebas de polígrafo aplicadas' },
  { number: '150+', label: 'Clientes corporativos' },
]

export function StatsCounter({ stats }: StatsCounterProps) {
  const items = stats && stats.length > 0 ? stats : fallbackStats

  const firstRow = items.slice(0, 3)
  const fourthStat = items.length > 3 ? items[3] : null

  // Per-column alignment: always left on mobile, diverge at sm+
  const colAlign = [
    { text: 'text-left sm:text-left',   label: '' },
    { text: 'text-left sm:text-center', label: 'sm:mx-auto' },
    { text: 'text-left sm:text-right',  label: 'sm:ml-auto' },
  ] as const

  function StatItem({
    stat,
    i,
    textClass,
    labelClass,
  }: {
    stat: (typeof items)[number]
    i: number
    textClass: string
    labelClass: string
  }) {
    const num = stat.number ?? ''
    const hasPlus = num.endsWith('+')
    const displayNum = hasPlus ? num.slice(0, -1) : num
    return (
      <li
        key={'_key' in stat ? (stat._key as string) : i}
        className={`animate-stat-pop py-10 sm:py-0 sm:px-10 lg:px-16 ${textClass}`}
        style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'both' }}
      >
        <p className="font-heading font-extrabold text-white leading-none tracking-tight text-[3.375rem] sm:text-6xl lg:text-7xl">
          {displayNum}
          {hasPlus && <span className="text-[#F78F1E]">+</span>}
        </p>
        <p className={`text-white/50 text-sm mt-4 leading-snug max-w-[200px] ${labelClass}`}>
          {stat.label}
        </p>
      </li>
    )
  }

  return (
    <section aria-label="Estadísticas" className="bg-[#032D51] py-20 lg:py-28 overflow-hidden">
      <Container>
        {/* Row 1: up to 3 stats — left / center / right aligned */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {firstRow.map((stat, i) => (
            <StatItem
              key={'_key' in stat ? (stat._key as string) : i}
              stat={stat}
              i={i}
              textClass={colAlign[i]?.text ?? ''}
              labelClass={colAlign[i]?.label ?? ''}
            />
          ))}
        </ul>

        {/* Row 2: 4th stat centered in its own row */}
        {fourthStat && (
          <div className="mt-0 pt-0 sm:mt-12 sm:pt-12 sm:border-t sm:border-white/10">
            <ul role="list" className="flex justify-center">
              <StatItem
                stat={fourthStat}
                i={3}
                textClass="text-left sm:text-center"
                labelClass="sm:mx-auto"
              />
            </ul>
          </div>
        )}
      </Container>
    </section>
  )
}
