'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { submitContactForm, type ContactFormState } from '@/app/contacto/actions'

interface ContactFormProps {
  subjectOptions?: string[]
  whatsappNumber?: string
  whatsappCtaText?: string
}

const initialState: ContactFormState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="primary" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Enviando…' : 'Enviar mensaje'}
    </Button>
  )
}

export function ContactForm({
  subjectOptions = ['Cotización', 'Información general'],
  whatsappNumber,
  whatsappCtaText,
}: ContactFormProps) {
  const ctaLabel = whatsappCtaText || 'Contacto WhatsApp'
  const [state, formAction] = useActionState(submitContactForm, initialState)

  const fieldError = (field: keyof NonNullable<ContactFormState['fieldErrors']>) =>
    state.fieldErrors?.[field]

  return (
    <div className="space-y-6">
      {state.status === 'success' && (
        <div
          role="alert"
          className="rounded-[8px] bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
        >
          {state.message}
        </div>
      )}

      {state.status === 'error' && (
        <div
          role="alert"
          className="rounded-[8px] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#032D51] mb-1.5">
            Nombre completo <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-describedby={fieldError('name') ? 'name-error' : undefined}
            className={cn(
              'block w-full rounded-[6px] border px-4 py-3 text-sm text-[#3F3F3F] placeholder:text-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#F78F1E] focus:border-transparent transition',
              fieldError('name') ? 'border-red-400' : 'border-[#DFDFDF]',
            )}
            placeholder="Tu nombre"
          />
          {fieldError('name') && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {fieldError('name')}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#032D51] mb-1.5">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="block w-full rounded-[6px] border border-[#DFDFDF] px-4 py-3 text-sm text-[#3F3F3F] placeholder:text-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#F78F1E] focus:border-transparent transition"
            placeholder="+593 99 999 9999"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#032D51] mb-1.5">
            Correo electrónico <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
            className={cn(
              'block w-full rounded-[6px] border px-4 py-3 text-sm text-[#3F3F3F] placeholder:text-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#F78F1E] focus:border-transparent transition',
              fieldError('email') ? 'border-red-400' : 'border-[#DFDFDF]',
            )}
            placeholder="tu@empresa.com"
          />
          {fieldError('email') && (
            <p id="email-error" role="alert" className="mt-xs text-xs text-red-600">
              {fieldError('email')}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[#032D51] mb-1.5">
            Tema <span aria-hidden className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            aria-describedby={fieldError('subject') ? 'subject-error' : undefined}
            className={cn(
              'block w-full rounded-[6px] border px-4 py-3 text-sm text-[#3F3F3F] focus:outline-none focus:ring-2 focus:ring-[#F78F1E] focus:border-transparent transition bg-white',
              fieldError('subject') ? 'border-red-400' : 'border-[#DFDFDF]',
            )}
            defaultValue=""
          >
            <option value="" disabled>
              Seleccionar tema
            </option>
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {fieldError('subject') && (
            <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600">
              {fieldError('subject')}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#032D51] mb-1.5">
            Mensaje <span aria-hidden className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            aria-describedby={fieldError('message') ? 'message-error' : undefined}
            className={cn(
              'block w-full rounded-[6px] border px-4 py-3 text-sm text-[#3F3F3F] placeholder:text-[#A6A6A6] focus:outline-none focus:ring-2 focus:ring-[#F78F1E] focus:border-transparent transition resize-y',
              fieldError('message') ? 'border-red-400' : 'border-[#DFDFDF]',
            )}
            placeholder="¿En qué podemos ayudarte?"
          />
          {fieldError('message') && (
            <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
              {fieldError('message')}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <SubmitButton />

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-[6px] text-lg font-semibold font-heading tracking-wide text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              {ctaLabel}
              {/* WhatsApp official icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          )}
        </div>
      </form>
    </div>
  )
}
