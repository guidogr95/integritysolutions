'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { X, Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { label: 'Integrity Report', href: '/servicios/integrity-report' },
  { label: 'Polígrafo', href: '/servicios/poligrafo' },
  { label: 'AMITAI® Honestidad', href: '/servicios/amitai-honestidad' },
  { label: 'Seguridad Vial', href: '/servicios/seguridad-vial' },
]

interface NavigationProps {
  reportsAccessUrl?: string
}

export function Navigation({ reportsAccessUrl }: NavigationProps) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <nav aria-label="Navegación principal">
      <ul className="hidden lg:flex items-center gap-0.5" role="list">
        <li>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#F78F1E] transition-colors duration-150"
          >
            Inicio
          </Link>
        </li>

        <li ref={dropdownRef} className="relative">
          <button
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            onClick={() => setServicesOpen((v) => !v)}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#F78F1E] transition-colors duration-150"
          >
            Servicios
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
              aria-hidden
            />
          </button>

          {servicesOpen && (
            <ul
              role="list"
              className="absolute top-full left-0 mt-2 w-60 rounded-xl bg-white border border-[#E8E8E6] py-2 shadow-xl shadow-black/8 z-50"
            >
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#2D2D2D] hover:text-[#F78F1E] hover:bg-[#F9F9F7] transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {reportsAccessUrl && (
          <li>
            <a
              href={reportsAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#F78F1E] transition-colors duration-150"
            >
              Acceso Informes
            </a>
          </li>
        )}

        <li className="ml-3">
          <Link
            href="/contacto"
            className="px-5 py-2.5 rounded-lg text-sm font-bold bg-[#032D51] text-white hover:bg-[#1C4990] transition-colors duration-150"
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  )
}

// ---------------------------------------------------------------------------
// Mobile Menu
// ---------------------------------------------------------------------------

interface MobileMenuProps {
  reportsAccessUrl?: string
}

export function MobileMenu({ reportsAccessUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-[#032D51] hover:text-[#F78F1E] transition-colors"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      <div
        role="dialog"
        aria-label="Menú de navegación"
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#E8E8E6]">
          <span className="font-heading font-bold text-[#032D51] text-base">Menú</span>
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:bg-[#F9F9F7] hover:text-[#032D51] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 py-5">
          <ul role="list" className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#2D2D2D] hover:bg-[#F9F9F7] hover:text-[#032D51] transition-colors"
              >
                Inicio
              </Link>
            </li>

            <li>
              <button
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#2D2D2D] hover:bg-[#F9F9F7] hover:text-[#032D51] transition-colors"
              >
                Servicios
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
              {servicesOpen && (
                <ul role="list" className="ml-4 mt-1 space-y-1 border-l-2 border-[#E8E8E6] pl-3">
                  {services.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-sm text-[#6B6B6B] hover:bg-[#F9F9F7] hover:text-[#032D51] transition-colors"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {reportsAccessUrl && (
              <li>
                <a
                  href={reportsAccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#2D2D2D] hover:bg-[#F9F9F7] hover:text-[#032D51] transition-colors"
                >
                  Acceso Informes
                </a>
              </li>
            )}

            <li className="pt-3">
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold bg-[#032D51] text-white hover:bg-[#1C4990] transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
