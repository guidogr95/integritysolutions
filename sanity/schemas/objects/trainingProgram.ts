import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trainingProgram',
  title: 'Programa de Capacitación',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Programa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'certification',
      title: 'Certificación',
      type: 'string',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Dirigido a',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
    }),
    defineField({
      name: 'topics',
      title: 'Temas',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'targetAudience' },
  },
})
