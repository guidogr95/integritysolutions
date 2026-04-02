'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import type { OfficeLocationData } from '@/lib/sanity/types'

interface LocationMapsProps {
  offices?: OfficeLocationData[]
}

export function LocationMaps({ offices }: LocationMapsProps) {
  const [activeTab, setActiveTab] = useState(0)

  if (!offices || offices.length === 0) return null

  const activeOffice = offices[activeTab]

  return (
    <section aria-label="Ubicaciones" className="py-20 lg:py-28 bg-[#F8F8F8] overflow-x-hidden">
      <Container>
        <SectionHeading accent className="mb-10">
          Nuestras Oficinas
        </SectionHeading>

        {/* Tabs */}
        <div role="tablist" aria-label="Seleccionar ciudad" className="flex gap-2 mb-6">
          {offices.map((office, i) => (
            <button
              key={office._key}
              role="tab"
              id={`tab-${office._key}`}
              aria-selected={i === activeTab}
              aria-controls={`panel-${office._key}`}
              onClick={() => setActiveTab(i)}
              className={cn(
                'px-5 py-2.5 rounded-[6px] text-sm font-semibold transition-colors duration-150',
                i === activeTab
                  ? 'bg-[#032D51] text-white'
                  : 'bg-white border border-[#DFDFDF] text-[#747474] hover:border-[#032D51] hover:text-[#032D51]',
              )}
            >
              {office.city}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeOffice._key}`}
          aria-labelledby={`tab-${activeOffice._key}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Office info */}
          <div className="bg-white rounded-[8px] border border-[#DFDFDF] p-8">
            <h3 className="font-heading font-bold text-[#032D51] text-xl mb-4">
              {activeOffice.city}
            </h3>
            {activeOffice.addressLine1 && (
              <p className="text-[#3F3F3F] mb-1">{activeOffice.addressLine1}</p>
            )}
            {activeOffice.addressLine2 && (
              <p className="text-[#3F3F3F] mb-4">{activeOffice.addressLine2}</p>
            )}
            {activeOffice.phones && activeOffice.phones.length > 0 && (
              <div className="space-y-1">
                {activeOffice.phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-[#F78F1E] hover:text-[#E4821A] font-semibold transition-colors"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Map embed */}
          {activeOffice.mapEmbedUrl && (
            <div className="rounded-[8px] overflow-hidden border border-[#DFDFDF] aspect-video lg:aspect-auto min-h-[300px]">
              <iframe
                src={activeOffice.mapEmbedUrl}
                title={`Mapa oficina ${activeOffice.city}`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
