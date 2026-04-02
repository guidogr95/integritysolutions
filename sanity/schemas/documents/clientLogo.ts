import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: 'Logo de Cliente',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL del sitio web (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
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
    select: { title: 'name', media: 'logo' },
  },
})
