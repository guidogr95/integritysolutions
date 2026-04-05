import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Cita',
      type: 'text',
      rows: 4,
      description: 'El testimonio del cliente.',
      validation: (Rule) => Rule.required().min(20).max(400),
    }),
    defineField({
      name: 'authorName',
      title: 'Nombre del Autor',
      type: 'string',
      description: 'Nombre completo o dejar en blanco si será anónimo.',
    }),
    defineField({
      name: 'authorRole',
      title: 'Cargo del Autor',
      type: 'string',
      description: 'Ej: Director de Recursos Humanos',
    }),
    defineField({
      name: 'authorCompany',
      title: 'Empresa o Sector',
      type: 'string',
      description: 'Ej: "Empresa del sector bancario" o nombre real si no es anónimo.',
    }),
    defineField({
      name: 'isAnonymized',
      title: '¿Mostrar de forma anónima?',
      type: 'boolean',
      description: 'Si está activo, el nombre del autor se ocultará.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'authorRole', subtitle: 'authorCompany', description: 'quote' },
    prepare({ title, subtitle }) {
      return { title: title ?? 'Testimonio', subtitle }
    },
  },
})
