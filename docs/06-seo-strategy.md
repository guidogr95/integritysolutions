# 06 — SEO Strategy

Maintaining and improving SEO parity with the current static site.

## Current SEO Inventory

### What the current site has:

| Feature | Current Implementation | Status |
|---------|----------------------|--------|
| Page titles | Static `<title>` tags | ✅ Good titles, keyword-rich |
| Meta descriptions | Static `<meta name="description">` | ✅ Present on all pages |
| Open Graph | `og:title`, `og:description`, `og:site_name` | ⚠️ Missing `og:image` on all pages |
| Twitter Cards | None | ❌ Missing |
| Canonical URLs | None | ❌ Missing |
| JSON-LD (Store) | On index.html, contact.html | ⚠️ Has typo (`aplication/ld+json`), address says "Tena" instead of "Quito" |
| JSON-LD (Breadcrumbs) | On service pages | ✅ Correct |
| Sitemap.xml | Static file, 6 URLs | ✅ Present but stale (2019 dates) |
| Robots.txt | None found | ❌ Missing |
| Favicon | PNG only | ⚠️ Needs multi-size set |
| Google Analytics | UA-115651902-1 | ❌ UA is sunset, needs GA4 migration |
| Viewport | Present | ✅ |
| Language | Not declared (`<html>` missing `lang`) | ❌ Missing `lang="es"` |
| Alt text | Some images have alt, many CSS backgrounds don't | ⚠️ Incomplete |
| Heading hierarchy | Mostly correct | ⚠️ Some pages skip levels |

### Issues to Fix in Migration:

1. **JSON-LD typo**: `type="aplication/ld+json"` (missing 'c') — scripts never parsed
2. **JSON-LD address error**: "Tena, Ecuador" should be "Quito, Ecuador"
3. **Missing og:image** on all pages — critical for social sharing
4. **Missing Twitter Card** meta tags
5. **No canonical URLs** — risk of duplicate content
6. **No robots.txt** — crawlers have no guidance
7. **Stale sitemap** — dates from 2019
8. **Missing lang attribute** — search engines can't confirm language
9. **GA UA sunset** — needs GA4 migration

---

## New SEO Implementation

### 1. Metadata API (Next.js App Router)

Every page will use Next.js `generateMetadata()` to produce SEO tags from Sanity data.

```typescript
// src/app/servicios/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getService(params.slug)
  const siteSettings = await getSiteSettings()

  return {
    title: service.seo?.metaTitle || `${service.title} | ${siteSettings.companyName}`,
    description: service.seo?.metaDescription || service.description,
    openGraph: {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.description,
      images: service.seo?.ogImage
        ? [urlForImage(service.seo.ogImage).width(1200).height(630).url()]
        : siteSettings.defaultSeo?.ogImage
          ? [urlForImage(siteSettings.defaultSeo.ogImage).width(1200).height(630).url()]
          : [],
      siteName: siteSettings.companyName,
      locale: 'es_EC',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.description,
    },
    alternates: {
      canonical: `https://www.integritysolutions.ec/servicios/${params.slug}`,
    },
    robots: service.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}
```

### 2. JSON-LD Structured Data

#### Organization Schema (global, in layout)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Integrity Solutions",
  "url": "https://www.integritysolutions.ec",
  "logo": "https://www.integritysolutions.ec/logo.svg",
  "email": "info@integritysolutions.ec",
  "telephone": "+593995527670",
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Quito",
      "addressCountry": "EC",
      "streetAddress": "Av. De los Shyris N41-151 e Isla Floreana, Edificio AXIOS, Oficina 904"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Guayaquil",
      "addressCountry": "EC",
      "streetAddress": "Av. Francisco de Orellana MZ 101 Solar 2 y Av. Agustín Freire"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/IntegritySolutionsEC",
    "https://www.linkedin.com/company/integrity-solutions-ec/"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:30",
    "closes": "18:00"
  }
}
```

Note: Changed from `Store` to `ProfessionalService` — more accurate for a consulting company.

#### Breadcrumb Schema (service pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.integritysolutions.ec/" },
    { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://www.integritysolutions.ec/servicios" },
    { "@type": "ListItem", "position": 3, "name": "Polígrafo", "item": "https://www.integritysolutions.ec/servicios/poligrafo" }
  ]
}
```

#### Service Schema (service pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Polígrafo",
  "description": "Pruebas poligráficas de rutina, pre empleo y específicas...",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Integrity Solutions"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Ecuador"
  }
}
```

### 3. Dynamic Sitemap

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServiceSlugs()

  const staticPages = [
    { url: 'https://www.integritysolutions.ec', lastModified: new Date(), priority: 1.0 },
    { url: 'https://www.integritysolutions.ec/contacto', lastModified: new Date(), priority: 0.8 },
  ]

  const servicePages = services.map((slug) => ({
    url: `https://www.integritysolutions.ec/servicios/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
```

### 4. Robots.txt

```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.integritysolutions.ec/sitemap.xml',
  }
}
```

### 5. Additional SEO Elements

| Element | Implementation |
|---------|---------------|
| `<html lang="es">` | Set in root layout.tsx |
| Favicon set | Generated from logo: 16, 32, 180, 192, 512px + manifest |
| OG image defaults | Default OG image in siteSettings, overridable per page |
| Twitter card | `summary_large_image` on all pages |
| Canonical URLs | Auto-generated, overridable per page |
| Heading hierarchy | Enforced by component structure (one h1 per page) |
| Image alt text | Required on all `next/image` components; Sanity images have alt field |
| Internal linking | Service cards link to service pages, footer links, breadcrumbs |
| Page speed | Core Web Vitals optimized via Next.js image optimization, static generation |

### 6. URL Structure Migration

| Current URL | New URL | Redirect Needed |
|-------------|---------|-----------------|
| `/index.html` | `/` | 301 redirect |
| `/integrityreport.html` | `/servicios/integrity-report` | 301 redirect |
| `/poligrafo.html` | `/servicios/poligrafo` | 301 redirect |
| `/integritest.html` | `/servicios/amitai-honestidad` | 301 redirect |
| `/seguridadvial.html` | `/servicios/seguridad-vial` | 301 redirect |
| `/contact.html` | `/contacto` | 301 redirect |

Redirects configured in `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/integrityreport.html', destination: '/servicios/integrity-report', permanent: true },
      { source: '/poligrafo.html', destination: '/servicios/poligrafo', permanent: true },
      { source: '/integritest.html', destination: '/servicios/amitai-honestidad', permanent: true },
      { source: '/seguridadvial.html', destination: '/servicios/seguridad-vial', permanent: true },
      { source: '/contact.html', destination: '/contacto', permanent: true },
    ]
  },
}
```

### 7. Google Search Console

- Verify new domain ownership on Vercel
- Submit new sitemap
- Monitor 301 redirects for crawl issues
- Carry over `google5e128371297fad39.html` verification file to `public/`
