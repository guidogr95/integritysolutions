'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react'
import { Container } from '@/components/ui/Container'
import type { StatData } from '@/lib/sanity/types'

interface StatsCounterProps {
  stats?: StatData[]
}

const fallbackStats: Omit<StatData, '_key'>[] = [
  { number: '50,000+', label: 'Evaluaciones de talento completadas' },
  { number: '7,500+', label: 'Exámenes poligráficos realizados' },
  { number: '150+', label: 'Empresas que confían en nosotros' },
  { number: '18+', label: 'Años en el mercado' },
]

// Parses a stat string like "50,000+" or "7,500+" or "100%" into its numeric value + suffix
function parseStatNumber(raw: string): { value: number; suffix: string; prefix: string } {
  const cleaned = raw.replace(/,/g, '')
  const match = cleaned.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return { value: 0, suffix: raw, prefix: '' }
  return {
    prefix: match[1] ?? '',
    value: parseFloat(match[2] ?? '0'),
    suffix: match[3] ?? '',
  }
}

// Formats a number back with commas for display
function formatNumber(n: number, originalFormatted: string): string {
  if (originalFormatted.includes(',')) {
    return Math.round(n).toLocaleString('en-US')
  }
  return Math.round(n).toString()
}

interface AnimatedStatProps {
  stat: Omit<StatData, '_key'> & { _key?: string }
  index: number
  textClass: string
  labelClass: string
  inView: boolean
}

function AnimatedStat({ stat, index, textClass, labelClass, inView }: AnimatedStatProps) {
  const raw = stat.number ?? ''
  const { value: targetValue, suffix, prefix } = parseStatNumber(raw)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => formatNumber(latest, raw))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, targetValue, {
      duration: 1.8,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [inView, targetValue, count, index])

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className={`py-10 sm:py-0 sm:px-10 lg:px-16 ${textClass}`}
    >
      <p className="font-heading font-extrabold text-white leading-none tracking-tight text-[3.375rem] sm:text-6xl lg:text-7xl">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix && (
          <span className={suffix.includes('+') ? 'text-[#F78F1E]' : ''}>{suffix}</span>
        )}
      </p>
      <p className={`text-white/50 text-sm mt-4 leading-snug max-w-[200px] ${labelClass}`}>
        {stat.label}
      </p>
    </motion.li>
  )
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const items = stats && stats.length > 0 ? stats : fallbackStats
  const firstRow = items.slice(0, 3)
  const fourthStat = items.length > 3 ? items[3] : null

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const colAlign = [
    { text: 'text-left sm:text-left',   label: '' },
    { text: 'text-left sm:text-center', label: 'sm:mx-auto' },
    { text: 'text-left sm:text-right',  label: 'sm:ml-auto' },
  ] as const

  return (
    <section
      ref={sectionRef}
      aria-label="Estadísticas"
      className="bg-[#032D51] py-20 lg:py-28 overflow-hidden"
    >
      <Container>
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {firstRow.map((stat, i) => (
            <AnimatedStat
              key={'_key' in stat ? (stat._key as string) : i}
              stat={stat}
              index={i}
              inView={inView}
              textClass={colAlign[i]?.text ?? ''}
              labelClass={colAlign[i]?.label ?? ''}
            />
          ))}
        </ul>

        {fourthStat && (
          <div className="mt-0 pt-0 sm:mt-12 sm:pt-12 sm:border-t sm:border-white/10">
            <ul role="list" className="flex justify-center">
              <AnimatedStat
                stat={fourthStat}
                index={3}
                inView={inView}
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
