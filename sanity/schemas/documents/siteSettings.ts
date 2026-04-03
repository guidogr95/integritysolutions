import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    // Branding
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'companyName',
      title: 'Nombre de la Empresa',
      type: 'string',
      initialValue: 'Integrity Solutions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyFoundedYear',
      title: 'Año de Fundación',
      type: 'number',
      description: 'Se usa para calcular "X años de experiencia" dinámicamente.',
      initialValue: 2013,
    }),

    // Contact
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'vguevara@integritysolutions.ec',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato internacional sin + (ej: 593995527670)',
      initialValue: '593995527670',
    }),
    defineField({
      name: 'offices',
      title: 'Oficinas',
      type: 'array',
      of: [{ type: 'officeLocation' }],
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),

    // Navigation
    defineField({
      name: 'reportsAccessUrl',
      title: 'URL Acceso Informes',
      type: 'url',
      description: 'Enlace externo para "Acceso Informes" en la navegación.',
    }),

    // Global SEO
    defineField({
      name: 'defaultSeo',
      title: 'SEO por Defecto',
      type: 'seo',
    }),

    // Analytics
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'Ej: G-XXXXXXXXXX',
    }),

    // Structured Data
    defineField({
      name: 'businessHours',
      title: 'Horario de Atención',
      type: 'string',
      description: 'Ej: Lun-Sáb 08:30-18:00',
    }),
  ],
  preview: {
    select: { title: 'companyName', media: 'logo' },
  },
})
