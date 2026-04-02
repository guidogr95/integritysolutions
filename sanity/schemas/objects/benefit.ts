import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'benefit',
  title: 'Ventaja',
  type: 'object',
  fields: [
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
    select: { title: 'title' },
  },
})
