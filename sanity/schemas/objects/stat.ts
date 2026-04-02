import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stat',
  title: 'Estadística',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Número',
      type: 'string',
      description: 'Ej: 50,000+ o 11',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      description: 'Ej: Reportes de integridad evaluados',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'number', subtitle: 'label' },
  },
})
