import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Paso del Proceso',
  type: 'object',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Número de Paso',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'stepNumber' },
    prepare({ title, subtitle }) {
      return { title: `${subtitle ?? '?'}. ${title ?? 'Paso'}` }
    },
  },
})
