'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import type { TrainingProgramData } from '@/lib/sanity/types'

interface TrainingProgramsProps {
  programs: TrainingProgramData[]
}

export function TrainingPrograms({ programs }: TrainingProgramsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!programs || programs.length === 0) return null

  return (
    <section aria-label="Programas de capacitación" className="py-24 lg:py-32 bg-white">
      <Container>
        {/* Section header */}
        <header className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              Capacitación
            </span>
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
          </div>
          <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl">
            Programas de Capacitación
          </h2>
        </header>

        <div className="space-y-3 max-w-3xl mx-auto">
          {programs.map((program, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={program._key}
                className={cn(
                  'rounded-2xl border transition-colors duration-200',
                  isOpen
                    ? 'bg-[#032D51] border-[#032D51]'
                    : 'bg-white border-[#E8E8E6] hover:border-[#032D51]/30',
                )}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <h3
                    className={cn(
                      'font-heading font-semibold text-base',
                      isOpen ? 'text-white' : 'text-[#032D51]',
                    )}
                  >
                    {program.title}
                  </h3>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180 text-[#F78F1E]' : 'text-[#6B6B6B]',
                    )}
                    aria-hidden
                  />
                </button>

                {isOpen && (
                  <div className="px-7 pb-7 border-t border-white/10">
                    <dl className="mt-5 space-y-3 text-sm">
                      {program.certification && (
                        <div className="flex gap-3">
                          <dt className="font-semibold text-white/70 w-28 shrink-0">
                            Certificación:
                          </dt>
                          <dd className="text-white/85">{program.certification}</dd>
                        </div>
                      )}
                      {program.targetAudience && (
                        <div className="flex gap-3">
                          <dt className="font-semibold text-white/70 w-28 shrink-0">
                            Dirigido a:
                          </dt>
                          <dd className="text-white/85">{program.targetAudience}</dd>
                        </div>
                      )}
                      {program.duration && (
                        <div className="flex gap-3">
                          <dt className="font-semibold text-white/70 w-28 shrink-0">
                            Duración:
                          </dt>
                          <dd className="text-white/85">{program.duration}</dd>
                        </div>
                      )}
                      {program.topics && program.topics.length > 0 && (
                        <div>
                          <dt className="font-semibold text-white/70 mb-2">Temas:</dt>
                          <dd>
                            <ul role="list" className="space-y-1.5">
                              {program.topics.map((topic) => (
                                <li key={topic} className="flex items-start gap-2 text-white/80">
                                  <span
                                    aria-hidden
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F78F1E]"
                                  />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
