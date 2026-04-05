'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { HeroData, SiteSettingsData } from '@/lib/sanity/types'

// Shared expo-out ease
const ease = [0.22, 1, 0.36, 1] as const

// Staggered entrance: each child fades + slides up
const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

// Stats strip slightly later
const statsVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.85 } },
}

interface HeroProps {
  hero?: HeroData
  siteSettings: SiteSettingsData
}

export function Hero({ hero, siteSettings }: HeroProps) {
  const foundedYear = siteSettings?.companyFoundedYear ?? 2003
  const yearsExperience = new Date().getFullYear() - foundedYear

  // TODO: upload a proper hero image in Sanity Studio (Homepage → Hero → Background Image).
  // The current Sanity asset is only 192×197px and renders blurry when stretched.
  // Until then, the high-res Unsplash photo is used as the background.
  const backgroundUrl = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop&auto=format&q=95'

  const heading = hero?.heading ?? 'Sepa con certeza\nquién trabaja\ncon usted'

  // Use only the first sentence of the description to keep hero tight
  const rawDesc = hero?.description ?? 'Evaluaciones certificadas de integridad del talento humano — respaldadas por APA, AIPP y ASIS. Más de una década protegiendo organizaciones ecuatorianas.'
  const subtext = rawDesc.includes('.') ? rawDesc.split('.')[0] + '.' : rawDesc

  const ctaText = hero?.ctaText ?? 'Conocer nuestros servicios'
  const ctaHref = hero?.ctaHref ?? '#nosotros'

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[92vh] flex flex-col justify-center bg-[#032D51] overflow-hidden"
    >
      {/* Background image — animates in at natural opacity */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={backgroundUrl}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
        />
      </motion.div>

      {/* Left-heavy gradient so text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#032D51]/95 via-[#032D51]/70 to-[#032D51]/20"
      />
      {/* Bottom darkening */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#032D51]/85 via-transparent to-transparent"
      />

      {/* Content — staggered entrance */}
      <Container className="relative z-10 py-24 lg:py-32">
        <motion.div
          className="max-w-3xl"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
            <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
              {hero?.subheading ?? 'Integrity Solutions® Ecuador'}
            </span>
          </motion.div>

          {/* Headline — each line staggers independently */}
          <h1 className="font-heading font-extrabold text-white leading-[1.0] tracking-tight mb-6 text-5xl sm:text-6xl lg:text-7xl">
            {heading.split('\n').map((line, i) => (
              <motion.span key={i} variants={itemVariants} className="block">
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
          >
            {subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-heading font-bold text-sm bg-[#F78F1E] text-white hover:bg-[#E4821A] transition-colors duration-200"
            >
              Solicitar evaluación
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-heading font-bold text-sm border border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-colors duration-200"
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Micro-stats strip at bottom */}
      <motion.div
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10"
      >
        <Container>
          <ul
            role="list"
            className="flex flex-wrap gap-x-8 gap-y-4 py-6"
            aria-label="Estadísticas clave"
          >
            <li>
              <p className="font-heading font-extrabold text-white text-xl leading-none">50,000<span className="text-[#F78F1E]">+</span></p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">Evaluaciones</p>
            </li>
            <li aria-hidden className="hidden sm:block w-px bg-white/15" />
            <li>
              <p className="font-heading font-extrabold text-white text-xl leading-none">150<span className="text-[#F78F1E]">+</span></p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">Clientes corporativos</p>
            </li>
            <li aria-hidden className="hidden sm:block w-px bg-white/15" />
            <li>
              <p className="font-heading font-extrabold text-white text-xl leading-none">{yearsExperience}<span className="text-[#F78F1E]">+</span></p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">Años de experiencia</p>
            </li>
          </ul>
        </Container>
      </motion.div>
    </section>
  )
}

