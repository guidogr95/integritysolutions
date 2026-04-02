import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { projectId, dataset, apiVersion } from './lib/client'

// Singleton document types — appear as single items, not lists
const singletonTypes = new Set(['siteSettings', 'homepage', 'contactPage'])

export default defineConfig({
  name: 'integrity-solutions',
  title: 'Integrity Solutions',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Singletons
            S.listItem()
              .title('Configuración del Sitio')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Página de Inicio')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('Página de Contacto')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            // Collections
            S.documentTypeListItem('service').title('Servicios'),
            S.documentTypeListItem('clientLogo').title('Logos de Clientes'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Prevent creating more than one document for singletons
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((doc) => !singletonTypes.has(doc.templateId))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
      }
      return prev
    },
  },
})
