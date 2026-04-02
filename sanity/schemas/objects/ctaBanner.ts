import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaBanner',
  title: 'Banner CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedWord',
      title: 'Palabra Destacada (opcional)',
      type: 'string',
      description: 'Una palabra del título que se resaltará visualmente.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Botón',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'Enlace del Botón',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
