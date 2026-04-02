import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Título',
      type: 'string',
      description: 'Título para motores de búsqueda. Máximo 60 caracteres.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción para motores de búsqueda. Máximo 160 caracteres.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen Open Graph',
      type: 'image',
      description: 'Imagen para redes sociales. Tamaño recomendado: 1200×630px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'No indexar',
      type: 'boolean',
      description: 'Marcar si no quieres que esta página aparezca en buscadores.',
      initialValue: false,
    }),
  ],
})
