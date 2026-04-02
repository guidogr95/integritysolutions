'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error' | 'validation_error'
  message?: string
  fieldErrors?: Partial<Record<'name' | 'phone' | 'email' | 'subject' | 'message', string>>
}

// Simple in-memory rate limiter (per IP, per process — resets on redeploy)
// For production, use a persistent store (Redis/Upstash) or an edge middleware.
const submissionMap = new Map<string, number[]>()
const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const times = (submissionMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (times.length >= MAX_REQUESTS) return true
  submissionMap.set(ip, [...times, now])
  return false
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Rate limiting
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Demasiados intentos. Por favor espera un minuto antes de intentar nuevamente.',
    }
  }

  // Extract fields
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const subject = (formData.get('subject') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  // Server-side validation
  const fieldErrors: ContactFormState['fieldErrors'] = {}

  if (!name || name.length < 2) fieldErrors.name = 'Ingresa tu nombre completo.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = 'Ingresa un correo electrónico válido.'
  if (!subject) fieldErrors.subject = 'Selecciona un tema.'
  if (!message || message.length < 10)
    fieldErrors.message = 'El mensaje debe tener al menos 10 caracteres.'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'validation_error', fieldErrors }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Formulario Web <noreply@integritysolutions.ec>',
      to: 'info@integritysolutions.ec',
      replyTo: email,
      subject: `[Formulario] ${subject} — ${name}`,
      text: `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\nAsunto: ${subject}\n\n${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p>
<p><strong>Teléfono:</strong> ${phone}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Asunto:</strong> ${subject}</p>
<hr>
<p>${message.replace(/\n/g, '<br>')}</p>`,
    })
  } catch {
    return {
      status: 'error',
      message: 'No se pudo enviar el mensaje. Intenta de nuevo o contáctanos por WhatsApp.',
    }
  }

  return {
    status: 'success',
    message: '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.',
  }
}
