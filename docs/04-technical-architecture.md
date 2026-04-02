# 04 — Technical Architecture

## Stack

| Layer | Technology | Version | Justification |
|-------|-----------|---------|---------------|
| Framework | Next.js (App Router) | 14.x or 15.x | SSG/ISR support, Vercel-native, React ecosystem |
| CMS | Sanity v3 | Latest | Real-time preview, structured content, generous free tier, GROQ query language |
| Styling | Tailwind CSS | v4 | Utility-first, design token integration, fast iteration |
| Language | TypeScript | 5.x | Type safety across components and Sanity schemas |
| Hosting | Vercel | — | Native Next.js hosting, edge functions, preview deployments |
| Analytics | Google Analytics 4 | — | Migrate from UA (sunset) |
| Forms | Sanity + server action OR external service | — | See decisions doc |
| Icons | Lucide React | Latest | Consistent, tree-shakable SVG icons |

## Project Structure

```
integrity-solutions/
├── sanity/                        # Sanity Studio (embedded)
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── page.ts            # Generic page schema
│   │   │   ├── service.ts         # Service page schema
│   │   │   ├── siteSettings.ts    # Global settings (logo, contact info, social)
│   │   │   └── clientLogo.ts      # Client logo entries
│   │   ├── objects/
│   │   │   ├── seo.ts             # Reusable SEO fields
│   │   │   ├── hero.ts            # Hero section fields
│   │   │   ├── benefit.ts         # Benefit item
│   │   │   ├── trainingProgram.ts # Seguridad Vial specific
│   │   │   ├── officeLocation.ts  # Office address + map
│   │   │   └── ctaBanner.ts       # CTA banner section
│   │   └── index.ts               # Schema registry
│   ├── lib/
│   │   └── client.ts              # Sanity client config
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, analytics)
│   │   ├── page.tsx               # Homepage
│   │   ├── contacto/
│   │   │   └── page.tsx           # Contact page
│   │   ├── servicios/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx       # Dynamic service pages
│   │   │   └── page.tsx           # Services index (optional)
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts       # Contact form handler
│   │   │   ├── revalidate/
│   │   │   │   └── route.ts       # Sanity webhook for ISR
│   │   │   └── draft/
│   │   │       └── route.ts       # Sanity preview mode
│   │   ├── sitemap.ts             # Dynamic sitemap generation
│   │   ├── robots.ts              # Dynamic robots.txt
│   │   └── not-found.tsx          # 404 page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── CertificationsBar.tsx
│   │   │   ├── MissionVisionValues.tsx
│   │   │   ├── ServiceCards.tsx
│   │   │   ├── ClientMarquee.tsx
│   │   │   ├── CtaBanner.tsx
│   │   │   ├── LocationMaps.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── service/
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── BenefitsList.tsx
│   │   │   └── TrainingPrograms.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionHeading.tsx
│   │       └── Container.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts          # Sanity client
│   │   │   ├── queries.ts         # GROQ queries
│   │   │   ├── types.ts           # TypeScript types for Sanity data
│   │   │   └── image.ts           # Image URL builder
│   │   └── utils.ts               # Shared utilities
│   └── styles/
│       └── globals.css            # Tailwind base + custom properties
├── public/
│   ├── fonts/                     # If self-hosting (prefer Google Fonts)
│   ├── images/
│   │   ├── logo.svg               # Brand logo
│   │   ├── certifications/        # AIPP, SETEC, ASIS, APA logos
│   │   └── og-default.jpg         # Default OG image
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                     # Sanity project ID, dataset, tokens
```

## Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| Homepage | **ISR** (revalidate: 3600) | Content changes infrequently, needs to be fast |
| Service pages | **ISR** (revalidate: 3600) | Same — CMS edits propagate within 1 hour |
| Contact page | **ISR** (revalidate: 3600) | Mostly static, form is client-side |
| Sitemap | **Dynamic** (revalidate: 86400) | Regenerates daily |
| 404 | **Static** | Never changes |

All pages also support **on-demand revalidation** via Sanity webhook → `/api/revalidate` for instant updates when editors hit publish.

## Data Flow

```
Sanity Studio (editor) → Sanity Content Lake → Next.js (GROQ fetch at build/request) → Vercel CDN → User
                                                         ↑
                                              Sanity webhook triggers revalidation
```

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxxx                     # Read token for server-side
SANITY_WEBHOOK_SECRET=xxxxx               # Webhook verification
SANITY_PREVIEW_SECRET=xxxxx               # Preview mode secret
```

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.2",
    "react": "^18.3",
    "react-dom": "^18.3",
    "next-sanity": "^9.0",
    "@sanity/image-url": "^1.0",
    "@sanity/vision": "^3.0",
    "sanity": "^3.0",
    "lucide-react": "^0.400",
    "clsx": "^2.1",
    "tailwind-merge": "^2.0"
  },
  "devDependencies": {
    "typescript": "^5.5",
    "tailwindcss": "^4.0",
    "@tailwindcss/postcss": "^4.0",
    "@types/react": "^18.3",
    "@types/node": "^20"
  }
}
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total bundle (JS) | < 150KB gzipped |

## Image Optimization

- Use `next/image` for all images — automatic WebP/AVIF, lazy loading, responsive srcset
- Sanity images use the Sanity image pipeline (CDN, transforms, hotspot/crop)
- Client logos and certification logos: serve as optimized WebP from `/public` or Sanity
- Hero images: serve at 1920px max-width, with 640/1024/1920 srcset

## Contact Form Approach

- **Server Action** in Next.js handles form submission
- Server-side validation (no client-only validation)
- Options for delivery:
  1. **Email via Resend/SendGrid** — form data sent as email to info@integritysolutions.ec
  2. **Sanity document** — submissions stored in Sanity as a "submission" document type
  3. **Both** — recommended: email + Sanity backup
- WhatsApp CTA: simple `https://wa.me/593995527670` link (no API needed)

## Preview / Draft Mode

- Sanity's `next-sanity` package provides built-in preview support
- Editors can preview draft content before publishing
- Preview mode activated via `/api/draft?secret=xxx&slug=/servicios/poligrafo`
- Visual Editing overlay from `@sanity/visual-editing` for inline editing
