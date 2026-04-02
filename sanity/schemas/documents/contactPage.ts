import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      initialValue: 'Contáctanos',
    }),
    defineField({
      name: 'formSubjectOptions',
      title: 'Opciones de Tema del Formulario',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Cotización', 'Información general', 'Soporte'],
    }),
    defineField({
      name: 'whatsappCtaText',
      title: 'Texto del Botón de WhatsApp',
      type: 'string',
      initialValue: 'Contactar por WhatsApp',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
