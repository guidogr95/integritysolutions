import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { HashNavLink } from '@/components/ui/HashNavLink'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación" className="bg-[#F8F8F8] border-b border-[#DFDFDF]">
      <Container>
        <ol
          role="list"
          className="flex items-center gap-1 py-3 text-sm text-[#747474]"
        >
          <li>
            <Link
              href="/"
              aria-label="Inicio"
              className="flex items-center hover:text-[#032D51] transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden />
            </Link>
          </li>

          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4 text-[#A6A6A6]" aria-hidden />
                {item.href && !isLast ? (
                  item.href.includes('#') ? (
                    <HashNavLink
                      href={item.href}
                      className="hover:text-[#032D51] transition-colors"
                    >
                      {item.label}
                    </HashNavLink>
                  ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#032D51] transition-colors"
                  >
                    {item.label}
                  </Link>
                  )
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={isLast ? 'text-[#032D51] font-semibold' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
