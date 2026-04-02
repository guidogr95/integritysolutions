import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { urlForImage } from '@/lib/sanity/image'
import type { ServiceData } from '@/lib/sanity/types'

type Props = Pick<ServiceData, 'title' | 'description' | 'heroImage'>

export function ServiceHero({ title, description, heroImage }: Props) {
  const imageUrl = heroImage
    ? urlForImage(heroImage).width(1920).height(1080).quality(90).url()
    : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85'

  return (
    <section
      aria-label={`Hero — ${title}`}
      className="relative min-h-[85vh] flex flex-col justify-end bg-[#032D51] overflow-hidden"
    >
      {/* Background */}
      <Image
        src={imageUrl}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
        style={{ opacity: 0.45 }}
      />

      {/* Gradient: dark bottom where text sits, top transparent */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#032D51] via-[#032D51]/65 to-[#032D51]/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#032D51]/70 via-[#032D51]/30 to-transparent"
      />

      {/* Content anchored to bottom */}
      <Container className="relative z-10 pb-16 lg:pb-24 pt-32">
        <div className="flex items-center gap-3 mb-6">
          <div aria-hidden className="w-8 h-[2px] bg-[#F78F1E] shrink-0" />
          <span className="text-[#F78F1E] text-xs font-bold uppercase tracking-[0.22em]">
            Servicios
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-tight mb-6 max-w-3xl">
          {title}
        </h1>

        {description && (
          <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-10">
            {description}
          </p>
        )}

        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-heading font-bold text-sm bg-[#F78F1E] text-white hover:bg-[#E4821A] transition-colors duration-200"
        >
          Solicitar información
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Container>
    </section>
  )
}
