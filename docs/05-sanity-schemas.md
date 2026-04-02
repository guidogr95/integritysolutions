# 05 — Sanity CMS Schemas

All schemas for the Sanity content model. These map directly to the current site content and enable full editorial control.

---

## Schema Overview

```
Documents (top-level)
├── siteSettings        (singleton) — logo, company info, social links, global SEO
├── homepage            (singleton) — homepage sections content
├── service             (collection) — service pages
├── contactPage         (singleton) — contact page content
└── clientLogo          (collection) — client logos for marquee

Objects (reusable)
├── seo                 — meta title, description, OG image, noindex
├── hero                — heading, subheading, description, CTA, background image
├── benefit             — icon, title, description
├── stat                — number, label
├── certificationLogo   — name, logo image, url
├── officeLocation      — city, address lines, phone, map embed URL
├── ctaBanner           — heading, highlighted word, CTA text, CTA link
├── trainingProgram     — title, certification, target audience, duration, topics
├── navLink             — label, url, isExternal
└── socialLink          — platform, url
```

---

## Document Schemas

### `siteSettings` (singleton)

```typescript
// sanity/schemas/documents/siteSettings.ts
export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    // Branding
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'companyName',
      title: 'Nombre de la Empresa',
      type: 'string',
      initialValue: 'Integrity Solutions',
    }),
    defineField({
      name: 'companyFoundedYear',
      title: 'Año de Fundación',
      type: 'number',
      description: 'Se usa para calcular "X años de experiencia" dinámicamente',
    }),

    // Contact Info
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato internacional sin + (ej: 593995527670)',
    }),
    defineField({
      name: 'offices',
      title: 'Oficinas',
      type: 'array',
      of: [{ type: 'officeLocation' }],
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),

    // External Links
    defineField({
      name: 'reportsAccessUrl',
      title: 'URL Acceso Informes',
      type: 'url',
      description: 'Enlace externo para "Acceso Informes" en la navegación',
    }),

    // Global SEO Defaults
    defineField({
      name: 'defaultSeo',
      title: 'SEO por Defecto',
      type: 'seo',
      description: 'Se usa cuando una página no tiene su propio SEO configurado',
    }),

    // Analytics
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'Ej: G-XXXXXXXXXX',
    }),

    // Structured Data
    defineField({
      name: 'businessHours',
      title: 'Horario de Atención',
      type: 'string',
      description: 'Ej: Lun-Sáb 08:30-18:00',
    }),
  ],
})
```

### `homepage` (singleton)

```typescript
// sanity/schemas/documents/homepage.ts
export default defineType({
  name: 'homepage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),

    // About Section
    defineField({
      name: 'aboutHeading',
      title: 'Título Sección Nosotros',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texto Sección Nosotros',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'aboutImage',
      title: 'Imagen Sección Nosotros',
      type: 'image',
      options: { hotspot: true },
    }),

    // Certifications
    defineField({
      name: 'certificationsHeading',
      title: 'Título Certificaciones',
      type: 'string',
      initialValue: 'Avalados por',
    }),
    defineField({
      name: 'certifications',
      title: 'Certificaciones',
      type: 'array',
      of: [{ type: 'certificationLogo' }],
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (Rule) => Rule.max(4),
    }),

    // Mission / Vision / Values
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'string',
    }),

    // Clients Section
    defineField({
      name: 'clientsHeading',
      title: 'Título Sección Clientes',
      type: 'string',
      initialValue: 'Confiados por los Grandes',
    }),

    // Services Section
    defineField({
      name: 'servicesHeading',
      title: 'Título Sección Servicios',
      type: 'string',
      initialValue: 'Nuestros servicios',
    }),

    // CTA Banner
    defineField({
      name: 'ctaBanner',
      title: 'Banner de Contacto',
      type: 'ctaBanner',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
```

### `service` (collection)

```typescript
// sanity/schemas/documents/service.ts
export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      description: 'Texto principal que aparece en el hero de la página del servicio',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      rows: 2,
      description: 'Resumen que aparece en la tarjeta de servicio en la página de inicio',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cardImage',
      title: 'Imagen de Tarjeta',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen que aparece en la tarjeta de servicio en la página de inicio',
    }),

    // Benefits
    defineField({
      name: 'benefitsHeading',
      title: 'Título de Ventajas',
      type: 'string',
      initialValue: 'Ventajas',
    }),
    defineField({
      name: 'benefits',
      title: 'Ventajas',
      type: 'array',
      of: [{ type: 'benefit' }],
    }),

    // Training Programs (specific to Seguridad Vial)
    defineField({
      name: 'trainingPrograms',
      title: 'Programas de Capacitación',
      type: 'array',
      of: [{ type: 'trainingProgram' }],
      description: 'Solo para Seguridad Vial — los programas de capacitación ofrecidos',
      hidden: ({ document }) => !document?.title?.toString().toLowerCase().includes('seguridad'),
    }),

    // External Link (specific to AMITAI)
    defineField({
      name: 'externalUrl',
      title: 'Enlace Externo',
      type: 'url',
      description: 'Enlace a sitio externo del servicio (ej: amitai.com)',
    }),
    defineField({
      name: 'partnerLogo',
      title: 'Logo del Socio/Partner',
      type: 'image',
      description: 'Logo del socio del servicio (ej: AMITAI logo)',
    }),

    // CTA
    defineField({
      name: 'ctaBanner',
      title: 'Banner de Contacto',
      type: 'ctaBanner',
    }),

    // Order
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Orden en la lista de servicios (menor = primero)',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
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
    select: { title: 'title', media: 'cardImage' },
  },
})
```

### `contactPage` (singleton)

```typescript
// sanity/schemas/documents/contactPage.ts
export default defineType({
  name: 'contactPage',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      initialValue: 'Contáctanos',
    }),
    defineField({
      name: 'formSubjectOptions',
      title: 'Opciones de Tema del Formulario',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Cotización', 'Información general'],
    }),
    defineField({
      name: 'whatsappCtaText',
      title: 'Texto del Botón de WhatsApp',
      type: 'string',
      initialValue: 'Contactar por WhatsApp',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
```

### `clientLogo` (collection)

```typescript
// sanity/schemas/documents/clientLogo.ts
export default defineType({
  name: 'clientLogo',
  title: 'Logos de Clientes',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
```

---

## Object Schemas

### `seo`

```typescript
// sanity/schemas/objects/seo.ts
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Título',
      type: 'string',
      description: 'Título que aparece en la pestaña del navegador y resultados de Google. Máximo 60 caracteres.',
      validation: (Rule) => Rule.max(70).warning('Los títulos mayores a 60 caracteres pueden cortarse en Google'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Descripción',
      type: 'text',
      rows: 3,
      description: 'Descripción que aparece en resultados de Google. Máximo 160 caracteres.',
      validation: (Rule) => Rule.max(170).warning('Las descripciones mayores a 160 caracteres pueden cortarse'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen Open Graph',
      type: 'image',
      description: 'Imagen que aparece al compartir en redes sociales. Tamaño recomendado: 1200x630px',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Indexar',
      type: 'boolean',
      description: 'Marcar para excluir esta página de motores de búsqueda',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL Canónica',
      type: 'url',
      description: 'Solo si esta página es una copia de otra. Dejar vacío normalmente.',
    }),
  ],
})
```

### `hero`

```typescript
// sanity/schemas/objects/hero.ts
export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título Principal', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'ctaText', title: 'Texto del Botón', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'Enlace del Botón', type: 'string' }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de Fondo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
```

### `benefit`

```typescript
// sanity/schemas/objects/benefit.ts
export default defineType({
  name: 'benefit',
  title: 'Ventaja',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Texto', type: 'string' }),
  ],
  preview: {
    select: { title: 'text' },
  },
})
```

### `stat`

```typescript
// sanity/schemas/objects/stat.ts
export default defineType({
  name: 'stat',
  title: 'Estadística',
  type: 'object',
  fields: [
    defineField({ name: 'number', title: 'Número', type: 'string', description: 'Ej: 50000' }),
    defineField({ name: 'suffix', title: 'Sufijo', type: 'string', description: 'Ej: +' }),
    defineField({ name: 'label', title: 'Etiqueta', type: 'string' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'number' },
  },
})
```

### `certificationLogo`

```typescript
// sanity/schemas/objects/certificationLogo.ts
export default defineType({
  name: 'certificationLogo',
  title: 'Logo de Certificación',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'url', title: 'Enlace (opcional)', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
```

### `officeLocation`

```typescript
// sanity/schemas/objects/officeLocation.ts
export default defineType({
  name: 'officeLocation',
  title: 'Ubicación de Oficina',
  type: 'object',
  fields: [
    defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
    defineField({ name: 'addressLines', title: 'Dirección (líneas)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'phones', title: 'Teléfonos', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'URL del Mapa (embed)',
      type: 'url',
      description: 'URL de Google Maps embed',
    }),
    defineField({
      name: 'mapCoordinates',
      title: 'Coordenadas',
      type: 'geopoint',
      description: 'Alternativa al embed: coordenadas para mapa interactivo',
    }),
  ],
  preview: {
    select: { title: 'city' },
  },
})
```

### `ctaBanner`

```typescript
// sanity/schemas/objects/ctaBanner.ts
export default defineType({
  name: 'ctaBanner',
  title: 'Banner CTA',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Texto', type: 'string', description: 'Texto del banner' }),
    defineField({ name: 'highlightedWord', title: 'Palabra Resaltada', type: 'string', description: 'Palabra que se resalta en naranja' }),
    defineField({ name: 'ctaText', title: 'Texto del Botón', type: 'string', initialValue: 'CONTÁCTANOS' }),
    defineField({ name: 'ctaLink', title: 'Enlace del Botón', type: 'string', initialValue: '/contacto' }),
  ],
})
```

### `trainingProgram`

```typescript
// sanity/schemas/objects/trainingProgram.ts
export default defineType({
  name: 'trainingProgram',
  title: 'Programa de Capacitación',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Nombre del Programa', type: 'string' }),
    defineField({ name: 'certifiedBy', title: 'Certificado por', type: 'string' }),
    defineField({ name: 'certificationLogo', title: 'Logo Certificación', type: 'image' }),
    defineField({ name: 'targetAudience', title: 'Dirigido a', type: 'string' }),
    defineField({ name: 'duration', title: 'Duración', type: 'string' }),
    defineField({
      name: 'topics',
      title: 'Temario',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'duration' },
  },
})
```

### `socialLink`

```typescript
// sanity/schemas/objects/socialLink.ts
export default defineType({
  name: 'socialLink',
  title: 'Red Social',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Google Business', value: 'google' },
          { title: 'WhatsApp', value: 'whatsapp' },
        ],
      },
    }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
})
```

### `navLink`

```typescript
// sanity/schemas/objects/navLink.ts
export default defineType({
  name: 'navLink',
  title: 'Enlace de Navegación',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Texto', type: 'string' }),
    defineField({ name: 'url', title: 'URL', type: 'string' }),
    defineField({ name: 'isExternal', title: 'Es enlace externo', type: 'boolean', initialValue: false }),
  ],
})
```

---

## GROQ Queries (key examples)

### Homepage Data
```groq
*[_type == "homepage"][0] {
  hero,
  aboutHeading,
  aboutText,
  aboutImage,
  certificationsHeading,
  certifications,
  stats,
  mission,
  vision,
  values,
  clientsHeading,
  servicesHeading,
  ctaBanner,
  seo
}
```

### All Services (for homepage cards + sitemap)
```groq
*[_type == "service"] | order(order asc) {
  title,
  slug,
  shortDescription,
  cardImage,
  seo
}
```

### Single Service Page
```groq
*[_type == "service" && slug.current == $slug][0] {
  title,
  slug,
  description,
  heroImage,
  benefitsHeading,
  benefits,
  trainingPrograms,
  externalUrl,
  partnerLogo,
  ctaBanner,
  seo
}
```

### Site Settings (global)
```groq
*[_type == "siteSettings"][0] {
  logo,
  companyName,
  companyFoundedYear,
  email,
  whatsappNumber,
  offices,
  socialLinks,
  reportsAccessUrl,
  defaultSeo,
  googleAnalyticsId,
  businessHours
}
```

### Client Logos
```groq
*[_type == "clientLogo"] | order(order asc) {
  name,
  logo
}
```

---

## Sanity Studio Customization

### Structure
- Group singletons at the top: "Sitio" → Site Settings, Homepage, Contact Page
- "Servicios" → list of service documents
- "Clientes" → client logo management

### Studio Labels (Spanish)
All field titles and descriptions are in Spanish for editor comfort.

### Validation Rules
- SEO metaTitle: max 70 chars (warning at 60)
- SEO metaDescription: max 170 chars (warning at 160)
- Service slug: required, auto-generated from title
- Stats: max 4 items
- Required fields: service title, slug, client logo name + image
