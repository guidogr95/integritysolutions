'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { FadeInSection } from '@/components/ui/Motion'
import type { FaqItemData } from '@/lib/sanity/types'

interface FaqSectionProps {
  items?: FaqItemData[]
}

const fallbackFaqs: FaqItemData[] = [
  {
    _key: '1',
    question: '¿Es legal la prueba de polígrafo en Ecuador?',
    answer:
      'Sí. En Ecuador, la aplicación del polígrafo está permitida en procesos de preempleo y en investigaciones internas corporativas, siempre que exista consentimiento informado y escrito del evaluado. Nuestros protocolos cumplen con la legislación ecuatoriana vigente y los estándares internacionales de la American Polygraph Association (APA).',
  },
  {
    _key: '2',
    question: '¿Cuánto tiempo tarda una evaluación?',
    answer:
      'Depende del servicio seleccionado. Un examen poligráfico de preempleo toma entre 90 y 120 minutos por persona. La verificación de antecedentes (Integrity Report) se entrega en un plazo de 3 a 5 días hábiles. El test AMITAI puede completarse en línea en aproximadamente 45 minutos. Para volúmenes grandes de candidatos, diseñamos un cronograma personalizado.',
  },
  {
    _key: '3',
    question: '¿Cómo se protege la confidencialidad de los resultados?',
    answer:
      'Los informes son entregados exclusivamente al responsable designado por la empresa contratante, mediante canales seguros. Ningún resultado es compartido con terceros sin autorización expresa. Nuestros profesionales están sujetos a estrictos acuerdos de confidencialidad y el manejo de datos cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador.',
  },
  {
    _key: '4',
    question: '¿Se puede aplicar el polígrafo a empleados actuales?',
    answer:
      'Sí. Además de los procesos de preempleo, aplicamos exámenes poligráficos en investigaciones de fraude, robo, filtración de información, y otras situaciones donde es necesario establecer la verdad dentro de un equipo de trabajo. Esta modalidad también cuenta con protocolos de consentimiento y cumple la misma rigurosidad técnica que los procesos de contratación.',
  },
  {
    _key: '5',
    question: '¿Qué es el AMITAI y por qué es diferente a otros tests?',
    answer:
      'AMITAI® es un test psicométrico desarrollado y validado en 16 países para evaluar la propensión a la deshonestidad laboral. A diferencia de los tests de personalidad genéricos, fue diseñado específicamente para contextos corporativos y mide factores de riesgo concretos: tendencia al fraude, robo, falsedad en el historial y actitud ante las normas. Es especialmente útil para puestos con acceso a información sensible, manejo de dinero o posiciones de confianza.',
  },
  {
    _key: '6',
    question: '¿En qué sectores trabajan habitualmente?',
    answer:
      'Trabajamos con empresas de todos los sectores: banca y finanzas, logística y transporte, retail, tecnología, salud, manufactura y sector público. Nuestros servicios se adaptan a los requisitos específicos de cada industria — por ejemplo, para empresas con flotas contamos con programas de Seguridad Vial certificados por SETEC, y para entidades financieras aplicamos protocolos reforzados de verificación de antecedentes.',
  },
  {
    _key: '7',
    question: '¿Cómo solicito una cotización?',
    answer:
      'Puede contactarnos directamente por WhatsApp, por teléfono o a través del formulario de contacto en este sitio. Le responderemos en un plazo máximo de 24 horas hábiles con una propuesta adaptada a sus necesidades y el tamaño de su empresa.',
  },
]

export function FaqSection({ items }: FaqSectionProps) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const faqs = items && items.length > 0 ? items : fallbackFaqs

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      aria-label="Preguntas frecuentes"
      className="py-24 lg:py-32 bg-[#F9F9F7] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — sticky header */}
          <FadeInSection className="lg:col-span-4" y={20}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
                <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
                  FAQ
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-[#032D51] text-4xl sm:text-5xl leading-tight mb-6">
                Preguntas frecuentes
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed">
                ¿Tiene dudas sobre nuestros servicios? Aquí encontrará respuestas a las preguntas más comunes que recibimos de nuestros clientes.
              </p>
            </div>
          </FadeInSection>

          {/* Right column — accordion */}
          <FadeInSection className="lg:col-span-8" delay={0.1} y={20}>
            <div
              role="list"
              className="divide-y divide-[#E8E8E6] border-t border-[#E8E8E6]"
            >
              {faqs.map((faq) => {
                const isOpen = openKey === faq._key
                return (
                  <div key={faq._key} role="listitem">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenKey(isOpen ? null : faq._key)}
                      className="flex w-full items-start justify-between gap-4 py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F78F1E] focus-visible:ring-inset rounded-sm"
                    >
                      <span className="font-heading font-bold text-[#032D51] text-base sm:text-lg leading-snug group-hover:text-[#F78F1E] transition-colors duration-150">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#032D51]/6 flex items-center justify-center text-[#032D51] group-hover:bg-[#F78F1E]/10 group-hover:text-[#F78F1E] transition-colors duration-150"
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#6B6B6B] text-base leading-relaxed pb-6 max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </FadeInSection>
        </div>
      </Container>
    </section>
  )
}
