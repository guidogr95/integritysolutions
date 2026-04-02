'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Navigation, MobileMenu } from '@/components/layout/Navigation'
import { urlForImage } from '@/lib/sanity/image'
import type { SiteSettingsData } from '@/lib/sanity/types'

interface HeaderProps {
  siteSettings: SiteSettingsData
}

export function Header({ siteSettings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoUrl = siteSettings?.logo
    ? urlForImage(siteSettings.logo).width(200).height(60).url()
    : null

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled ? 'shadow-[0_1px_0_0_#E8E8E6]' : 'shadow-none',
      )}
    >
      <Container as="div" className="flex items-center justify-between h-[72px]">
        <Link
          href="/"
          aria-label={`${siteSettings?.companyName ?? 'Integrity Solutions'} — Inicio`}
          className="shrink-0"
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteSettings?.companyName ?? 'Integrity Solutions'}
              width={160}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="font-heading font-bold text-[#032D51] text-xl">
              {siteSettings?.companyName ?? 'Integrity Solutions'}
            </span>
          )}
        </Link>

        <Navigation reportsAccessUrl={siteSettings?.reportsAccessUrl} />
        <MobileMenu reportsAccessUrl={siteSettings?.reportsAccessUrl} />
      </Container>
    </header>
  )
}
