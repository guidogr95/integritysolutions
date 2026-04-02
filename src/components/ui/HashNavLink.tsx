'use client'

import { useRouter, usePathname } from 'next/navigation'

interface HashNavLinkProps {
  href: string // e.g. "/#servicios"
  className?: string
  children: React.ReactNode
}

/**
 * Navigates to a page and then smoothly scrolls to a hash section.
 * Required because Next.js client-side navigation doesn't trigger
 * the browser's native hash scroll, and overflow-x:hidden on body
 * also blocks it.
 */
export function HashNavLink({ href, className, children }: HashNavLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const [path, hash] = href.split('#')
    const targetPath = path || '/'

    const scrollToHash = () => {
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (pathname === targetPath) {
      // Already on the right page — just scroll
      scrollToHash()
    } else {
      // Navigate first, then scroll after the page renders
      router.push(targetPath)
      // Give the page a frame to mount before scrolling
      const interval = setInterval(() => {
        const el = hash ? document.getElementById(hash) : null
        if (el) {
          clearInterval(interval)
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
      // Give up after 2 seconds
      setTimeout(() => clearInterval(interval), 2000)
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
