import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),

    // About
    defineField({
      name: 'aboutHeading',
      title: 'Título Sección Nosotros',
      type: 'string',
      initialValue: 'Expertos en Integridad',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texto Sección Nosotros',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'aboutImage',
      title: 'Imagen Sección Nosotros',
      type: 'image',
      options: { hotspot: true },
    }),

    // Certifications
    defineField({
      name: 'certificationsHeading',
      title: 'Título Certificaciones',
      type: 'string',
      initialValue: 'Avalados por',
    }),
    defineField({
      name: 'certifications',
      title: 'Certificaciones',
      type: 'array',
      of: [{ type: 'certificationLogo' }],
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (Rule) => Rule.max(4),
    }),

    // Mission / Vision / Values
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'string',
    }),

    // Clients
    defineField({
      name: 'clientsHeading',
      title: 'Título Sección Clientes',
      type: 'string',
      initialValue: 'Confiados por los Grandes',
    }),

    // Services
    defineField({
      name: 'servicesHeading',
      title: 'Título Sección Servicios',
      type: 'string',
      initialValue: 'Nuestros servicios',
    }),

    // CTA Banner
    defineField({
      name: 'ctaBanner',
      title: 'Banner de Contacto',
      type: 'ctaBanner',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
