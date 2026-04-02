import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Texto principal del hero de la página del servicio.',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      rows: 2,
      description: 'Resumen para la tarjeta de servicio en la página de inicio.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cardImage',
      title: 'Imagen de Tarjeta',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen para la tarjeta en la página de inicio.',
    }),

    // Benefits
    defineField({
      name: 'benefitsHeading',
      title: 'Título de Ventajas',
      type: 'string',
      initialValue: 'Ventajas',
    }),
    defineField({
      name: 'benefits',
      title: 'Ventajas',
      type: 'array',
      of: [{ type: 'benefit' }],
    }),

    // Training Programs (Seguridad Vial specific)
    defineField({
      name: 'trainingPrograms',
      title: 'Programas de Capacitación',
      type: 'array',
      of: [{ type: 'trainingProgram' }],
      description: 'Solo para Seguridad Vial.',
      hidden: ({ document }) =>
        !document?.title?.toString().toLowerCase().includes('seguridad'),
    }),

    // External Link (AMITAI specific)
    defineField({
      name: 'externalUrl',
      title: 'Enlace Externo',
      type: 'url',
      description: 'Enlace a sitio del socio/partner (ej: amitai.com).',
    }),
    defineField({
      name: 'partnerLogo',
      title: 'Logo del Socio/Partner',
      type: 'image',
      options: { hotspot: true },
    }),

    // CTA
    defineField({
      name: 'ctaBanner',
      title: 'Banner de Contacto',
      type: 'ctaBanner',
    }),

    // Order
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Menor número = primero.',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Orden de visualización',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'cardImage' },
  },
})
