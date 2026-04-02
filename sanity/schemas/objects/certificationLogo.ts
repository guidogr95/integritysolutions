import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificationLogo',
  title: 'Logo de Certificación',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
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
      title: 'URL (opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
