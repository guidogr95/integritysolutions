import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'officeLocation',
  title: 'Oficina',
  type: 'object',
  fields: [
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Dirección Línea 1',
      type: 'string',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Dirección Línea 2',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Teléfonos',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL del Mapa (iframe src)',
      type: 'url',
      description: 'URL de Google Maps para incrustar en la página.',
    }),
  ],
  preview: {
    select: { title: 'city', subtitle: 'addressLine1' },
  },
})
