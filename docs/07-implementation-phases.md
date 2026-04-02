# 07 — Implementation Phases

## Phase Overview

| Phase | Name | Tasks | Estimated Effort |
|-------|------|-------|-----------------|
| 0 | Project Setup | Scaffold Next.js, Sanity, Tailwind, Vercel | Small |
| 1 | Design System | Tailwind config, tokens, base components | Medium |
| 2 | Sanity CMS | Schemas, studio config, seed content | Medium |
| 3 | Layout & Navigation | Header, footer, mobile menu, layout | Medium |
| 4 | Homepage | All homepage sections | Large |
| 5 | Service Pages | Dynamic routing, service page template | Medium |
| 6 | Contact Page | Form, maps, server action | Medium |
| 7 | SEO & Performance | Metadata, JSON-LD, sitemap, redirects, analytics | Medium |
| 8 | Polish & QA | Cross-browser, responsive, accessibility, performance | Medium |
| 9 | Migration | DNS, redirects, Vercel deployment, monitoring | Small |

---

## Phase 0: Project Setup

### Tasks

- [ ] **0.1** Initialize Next.js project with TypeScript and App Router
  ```bash
  npx create-next-app@latest integrity-solutions --typescript --tailwind --app --src-dir
  ```
- [ ] **0.2** Install and configure Sanity Studio (embedded in `/sanity`)
  ```bash
  npm install sanity next-sanity @sanity/image-url @sanity/vision
  ```
- [ ] **0.3** Configure Tailwind CSS v4 with brand tokens (see Phase 1)
- [ ] **0.4** Set up project on Vercel — connect GitHub repo
- [ ] **0.5** Create Sanity project at sanity.io, get project ID
- [ ] **0.6** Configure environment variables (`.env.local`)
- [ ] **0.7** Set up basic folder structure per architecture doc
- [ ] **0.8** Install additional dependencies: `lucide-react`, `clsx`, `tailwind-merge`
- [ ] **0.9** Configure `next.config.ts` with image domains (Sanity CDN)
- [ ] **0.10** Create initial Git commit on `redesign` branch

### Dependencies
- None (first phase)

### Deliverable
- Running Next.js dev server with empty pages and Sanity Studio accessible at `/studio`

---

## Phase 1: Design System

### Tasks

- [ ] **1.1** Configure Tailwind with brand color tokens
  ```css
  /* globals.css */
  @theme {
    --color-brand-orange: #F78F1E;
    --color-brand-navy: #032D51;
    --color-brand-orange-hover: #E4821A;
    --color-brand-orange-dark: #B96B17;
    --color-navy-medium: #2054A7;
    --color-navy-dark: #1C4990;
    --color-navy-deeper: #113161;
    --color-text-primary: #3F3F3F;
    --color-text-secondary: #747474;
    --color-text-muted: #A6A6A6;
    --color-border: #DFDFDF;
    --color-bg-light: #F8F8F8;
  }
  ```
- [ ] **1.2** Configure Google Fonts: Montserrat (headings) + DM Sans (body)
- [ ] **1.3** Set up typography scale in Tailwind config
- [ ] **1.4** Build `Container` component (max-w-7xl with padding)
- [ ] **1.5** Build `Button` component (primary orange, secondary navy, outline variants)
- [ ] **1.6** Build `SectionHeading` component (h2 with optional accent underline)
- [ ] **1.7** Set up globals.css with base styles (html, body, selections, focus rings)
- [ ] **1.8** Create `cn()` utility (clsx + tailwind-merge)

### Dependencies
- Phase 0 complete

### Deliverable
- Design tokens, 3 base components, consistent typography rendering

---

## Phase 2: Sanity CMS

### Tasks

- [ ] **2.1** Create all object schemas: `seo`, `hero`, `benefit`, `stat`, `certificationLogo`, `officeLocation`, `ctaBanner`, `trainingProgram`, `socialLink`, `navLink`
- [ ] **2.2** Create document schemas: `siteSettings`, `homepage`, `service`, `contactPage`, `clientLogo`
- [ ] **2.3** Configure `sanity.config.ts` with custom desk structure (singletons grouped)
- [ ] **2.4** Register all schemas in schema index
- [ ] **2.5** Create TypeScript types for all Sanity document types
- [ ] **2.6** Create Sanity client configuration (`lib/sanity/client.ts`)
- [ ] **2.7** Create image URL builder utility (`lib/sanity/image.ts`)
- [ ] **2.8** Write GROQ queries for: site settings, homepage, single service, all services, client logos, contact page (`lib/sanity/queries.ts`)
- [ ] **2.9** Seed initial content into Sanity:
  - Site settings (logo, contact info, social links)
  - Homepage content (all sections from content inventory)
  - 4 service documents (Integrity Report, Polígrafo, AMITAI, Seguridad Vial)
  - Contact page content
  - 27 client logos
- [ ] **2.10** Verify Studio is accessible and all fields render correctly

### Dependencies
- Phase 0 complete

### Deliverable
- Fully populated Sanity Studio with all content from current site

---

## Phase 3: Layout & Navigation

### Tasks

- [ ] **3.1** Build root layout (`app/layout.tsx`) — font loading, metadata defaults, analytics script
- [ ] **3.2** Build `Header` component — logo, desktop navigation, social links
- [ ] **3.3** Build `Navigation` component — menu items from hardcoded routes (services dropdown)
- [ ] **3.4** Build `MobileMenu` component — hamburger toggle, slide-out drawer, service submenu
- [ ] **3.5** Build `Footer` component — 3-column: contact info, services links, social icons
- [ ] **3.6** Fetch `siteSettings` in root layout and pass to header/footer
- [ ] **3.7** Add skip-to-content link for accessibility
- [ ] **3.8** Test responsive behavior at all breakpoints

### Dependencies
- Phase 1 (design system components)
- Phase 2 (Sanity client + siteSettings query)

### Deliverable
- Shared layout with header, footer, and responsive navigation on all pages

---

## Phase 4: Homepage

### Tasks

- [ ] **4.1** Build `Hero` section — full-viewport, typographic headline, CTA, background
- [ ] **4.2** Build `AboutSection` — asymmetric layout with image and text
- [ ] **4.3** Build `CertificationsBar` — horizontal row of grayscale logos
- [ ] **4.4** Build `StatsCounter` — three stats in a row with animated counting
- [ ] **4.5** Build `MissionVisionValues` — three horizontal cards
- [ ] **4.6** Build `ClientMarquee` — auto-scrolling logo strip (CSS animation, no JS)
- [ ] **4.7** Build `ServiceCards` — 2×2 grid linking to service pages
- [ ] **4.8** Build `CtaBanner` — full-width orange banner with CTA
- [ ] **4.9** Build `LocationMaps` — tabbed Quito/Guayaquil maps
- [ ] **4.10** Wire homepage to Sanity data (fetch in page.tsx server component)
- [ ] **4.11** Implement entrance animations (CSS only or subtle framer-motion)
- [ ] **4.12** Test full homepage responsive behavior

### Dependencies
- Phase 3 (layout)
- Phase 2 (homepage content in Sanity)

### Deliverable
- Complete homepage rendering all content from Sanity CMS

---

## Phase 5: Service Pages

### Tasks

- [ ] **5.1** Create dynamic route `app/servicios/[slug]/page.tsx`
- [ ] **5.2** Implement `generateStaticParams()` to pre-render all service pages
- [ ] **5.3** Build `ServiceHero` — full-width image with overlay, title, description, CTA
- [ ] **5.4** Build `BenefitsList` — two-column grid of benefits with check icons
- [ ] **5.5** Build `TrainingPrograms` — accordion/tab layout for Seguridad Vial
- [ ] **5.6** Include reusable `CtaBanner` at bottom of each service page
- [ ] **5.7** Add breadcrumb navigation component
- [ ] **5.8** Handle AMITAI-specific content (partner logo, external link)
- [ ] **5.9** Wire to Sanity data via GROQ query
- [ ] **5.10** Test all 4 service pages with their specific content

### Dependencies
- Phase 3 (layout)
- Phase 2 (service content in Sanity)

### Deliverable
- All 4 service pages rendering dynamically from CMS

---

## Phase 6: Contact Page

### Tasks

- [ ] **6.1** Build `ContactForm` component — name, phone, email, subject dropdown, message
- [ ] **6.2** Create server action or API route for form submission
- [ ] **6.3** Implement form validation (server-side primary, client-side progressive enhancement)
- [ ] **6.4** Set up email delivery (Resend or SendGrid) to info@integritysolutions.ec
- [ ] **6.5** Add WhatsApp CTA button (direct wa.me link)
- [ ] **6.6** Integrate map tabs (Quito/Guayaquil) using office data from Sanity
- [ ] **6.7** Add success/error states for form submission
- [ ] **6.8** Add rate limiting to form submission endpoint
- [ ] **6.9** Wire page to Sanity data (contact page + site settings for phone/address)

### Dependencies
- Phase 3 (layout)
- Phase 2 (contact page + siteSettings in Sanity)

### Deliverable
- Working contact page with form submission and map

---

## Phase 7: SEO & Performance

### Tasks

- [ ] **7.1** Implement `generateMetadata()` on all pages (from Sanity SEO fields)
- [ ] **7.2** Add JSON-LD structured data: Organization (layout), Breadcrumbs (services), Service (services)
- [ ] **7.3** Create dynamic `sitemap.ts` with all pages
- [ ] **7.4** Create `robots.ts`
- [ ] **7.5** Configure 301 redirects in `next.config.ts` (old URLs → new URLs)
- [ ] **7.6** Generate favicon set from logo (16, 32, 180, 192, 512px)
- [ ] **7.7** Copy `google5e128371297fad39.html` to `public/` for Search Console verification
- [ ] **7.8** Set up GA4 (either via `next/script` or Google Tag Manager)
- [ ] **7.9** Set up on-demand ISR revalidation webhook (`/api/revalidate`)
- [ ] **7.10** Configure Sanity webhook to call revalidation endpoint on publish
- [ ] **7.11** Set up Sanity preview/draft mode for editors
- [ ] **7.12** Run Lighthouse audit and fix any issues below target scores
- [ ] **7.13** Add `<html lang="es">` to root layout
- [ ] **7.14** Verify all images have alt text
- [ ] **7.15** Test OG images render correctly (use Facebook/Twitter debuggers)

### Dependencies
- Phases 4, 5, 6 complete (all pages built)

### Deliverable
- All SEO features functional, Lighthouse scores > 90 performance, > 95 accessibility

---

## Phase 8: Polish & QA

### Tasks

- [ ] **8.1** Cross-browser testing: Chrome, Firefox, Safari, Edge (desktop + mobile)
- [ ] **8.2** Responsive testing at: 375, 640, 768, 1024, 1280, 1440px
- [ ] **8.3** Accessibility audit: keyboard navigation, screen reader, focus management
- [ ] **8.4** Test contact form end-to-end (submission → email received)
- [ ] **8.5** Test all 301 redirects
- [ ] **8.6** Test Sanity CMS editing → content update visible on site (revalidation)
- [ ] **8.7** Test preview/draft mode for editors
- [ ] **8.8** Performance: check bundle size, unused JS, image sizes
- [ ] **8.9** Fix any hover/touch interaction issues on mobile
- [ ] **8.10** Final visual polish pass: spacing, alignment, typography consistency

### Dependencies
- Phase 7 complete

### Deliverable
- Production-ready site passed all QA checks

---

## Phase 9: Migration & Launch

### Tasks

- [ ] **9.1** Set up Vercel production deployment (connect main branch)
- [ ] **9.2** Configure custom domain (integritysolutions.ec) on Vercel
- [ ] **9.3** Set up SSL (automatic via Vercel)
- [ ] **9.4** Configure DNS records (point domain to Vercel)
- [ ] **9.5** Deploy to production
- [ ] **9.6** Verify all redirects work with live domain
- [ ] **9.7** Submit updated sitemap to Google Search Console
- [ ] **9.8** Monitor Search Console for crawl errors for 1-2 weeks
- [ ] **9.9** Verify GA4 is receiving data
- [ ] **9.10** Hand off Sanity Studio access to content editors
- [ ] **9.11** Create brief editor guide for Sanity CMS usage

### Dependencies
- Phase 8 complete

### Deliverable
- Live, production website at integritysolutions.ec

---

## Dependency Graph

```
Phase 0 (Setup)
   ├── Phase 1 (Design System)
   │      └── Phase 3 (Layout)
   │             ├── Phase 4 (Homepage)
   │             ├── Phase 5 (Service Pages)
   │             └── Phase 6 (Contact Page)
   │                    └── Phase 7 (SEO & Perf)
   │                           └── Phase 8 (QA)
   │                                  └── Phase 9 (Launch)
   └── Phase 2 (Sanity CMS)
          ├── Phase 3 (Layout) [siteSettings]
          ├── Phase 4 (Homepage) [homepage data]
          ├── Phase 5 (Service Pages) [service data]
          └── Phase 6 (Contact Page) [contact data]
```

**Note**: Phases 1 and 2 can be worked in parallel after Phase 0. Phases 4, 5, and 6 can be worked in parallel after Phase 3.
