# 08 — Decisions & Rationale

Every key decision in this plan, the strongest alternative considered, and why the choice was made.

---

## 1. Next.js App Router vs Pages Router

**Decision**: App Router (Next.js 14+)

**Alternative**: Pages Router (more mature, larger community knowledge base)

**Why App Router wins**:
- Server Components reduce client-side JS significantly (important for performance)
- Built-in `generateMetadata()` is cleaner than `next/head` for SEO
- Built-in `sitemap.ts` and `robots.ts` — no plugin needed
- App Router is the direction Next.js is investing in; Pages Router is maintenance-mode
- ISR and on-demand revalidation work natively
- This is a greenfield project — no migration burden

**Risk**: App Router has more edge cases with caching behavior. Mitigated by keeping the app mostly server-rendered (few client components).

---

## 2. Sanity v3 vs Other CMS Options

**Decision**: Sanity v3

**Alternatives considered**:
- **Contentful**: Strong but expensive at scale, less flexible content modeling
- **Strapi**: Self-hosted complexity, not ideal for Vercel
- **Payload CMS**: Good but less ecosystem integration with Next.js
- **WordPress (headless)**: Too heavy, hosting complexity, security surface area
- **MDX files in repo**: No CMS UI for non-technical editors

**Why Sanity wins**:
- Generous free tier (3 users, 500K API requests/month) — more than enough for this site
- Structured content with GROQ is more powerful than REST-based CMS APIs
- Real-time collaboration and preview mode built in
- `next-sanity` package provides first-class Next.js integration
- Content is hosted (Content Lake) — no database to manage
- Spanish Studio labels are easy to configure
- Image pipeline (CDN, transforms, hotspot crop) built in

**Risk**: Vendor lock-in on content storage. Mitigated by Sanity's export tools and the fact that content volume is small (~10 documents).

---

## 3. Tailwind CSS v4 vs Other Styling

**Decision**: Tailwind CSS v4

**Alternatives considered**:
- **CSS Modules**: More isolation but slower iteration, no design token system
- **styled-components / Emotion**: Runtime CSS-in-JS has performance cost
- **Vanilla CSS with custom properties**: Full control but slow to build
- **shadcn/ui**: Good component library but would add heavy overhead for a 6-page site

**Why Tailwind wins**:
- Utility-first matches the Swiss/functional design philosophy (precise, systematic)
- CSS variables via `@theme` directive integrate perfectly with brand tokens
- Zero-runtime — all CSS is compiled at build time
- v4 is a significant improvement (CSS-first config, no JS config file needed)
- Excellent responsive utilities (`sm:`, `md:`, `lg:`) match the breakpoint strategy
- Small final CSS bundle (only used utilities are included)

**Risk**: Tailwind v4 is newer — some ecosystem tools may lag. Mitigated by the fact that the class-based API is stable.

---

## 4. ISR vs SSG vs SSR

**Decision**: ISR with on-demand revalidation

**Alternatives**:
- **Full SSG (static export)**: Fastest but requires redeploy for content changes
- **Full SSR**: Freshest content but slower TTFB, higher compute cost
- **Client-side fetching**: Poor SEO, loading spinners

**Why ISR wins**:
- Content changes infrequently (maybe weekly) — stale-while-revalidate is perfect
- Pages are served from CDN (fast TTFB) but update within seconds of CMS publish
- On-demand revalidation via Sanity webhook means editors see changes instantly
- No redeploy needed for content updates
- Vercel's ISR implementation is the most mature

**Risk**: Cache invalidation bugs. Mitigated by using a strict revalidation webhook setup with secret validation.

---

## 5. Embedded Sanity Studio vs Separate Deployment

**Decision**: Embedded (at `/studio` route within the Next.js app)

**Alternative**: Separate Sanity Studio deployed to `studio.integritysolutions.ec`

**Why embedded wins**:
- Single deployment, single repo — simpler infrastructure
- Preview mode integration is straightforward (same domain, no CORS)
- Studio is behind Sanity auth — no additional auth layer needed
- Fewer DNS records to manage
- For a small editorial team (1-3 editors), this is the right tradeoff

**Risk**: Studio adds ~2MB to the build — but it's a separate route only loaded when editors navigate to `/studio`. Does not affect public page performance.

---

## 6. Monospace Hero Slider vs Static Hero

**Decision**: Static hero with single strong message

**Alternative**: Keep the current 3-slide carousel

**Why static hero wins**:
- Carousels have poor usability — most users only see the first slide
- Multiple messages dilute the impact; one strong statement is more effective
- Fewer moving parts = faster load, less JS, better LCP
- The three current slides can be reorganized: slide 1 content becomes the hero, slide 2 content goes to the services section, slide 3 content goes to the CTA banner
- This is a known UX best practice, not a subjective choice

**Risk**: Client may want a carousel. Content is CMS-managed, so a carousel could be added later if needed.

---

## 7. Contact Form Backend: Server Action + Email

**Decision**: Next.js Server Action + Resend (email API)

**Alternatives**:
- **Formspree/Netlify Forms**: Third-party dependency, branding in free tier
- **Sanity document only**: No email notification — editors must check CMS
- **Custom Nodemailer**: Self-managed SMTP — configuration complexity
- **Google Forms embed**: Poor UX, no design control

**Why Server Action + Resend wins**:
- Server Action keeps form logic colocated with the page
- Resend has a generous free tier (100 emails/day, more than enough)
- No client-side JS required for form submission (progressive enhancement)
- Server-side validation prevents bypass
- Email goes directly to inbox — no CMS check needed
- Optionally save to Sanity as backup

**Risk**: Resend rate limits or deliverability. Mitigated by also providing a WhatsApp CTA as a fallback channel.

---

## 8. URL Structure: `/servicios/[slug]` vs Flat URLs

**Decision**: Nested under `/servicios/`

**Alternative**: Flat URLs like `/poligrafo`, `/integrity-report`

**Why nested wins**:
- Clear information architecture (services are a category)
- Better for future scalability (add more services without polluting root)
- Breadcrumbs are semantically correct
- Dynamic routing in Next.js (`[slug]`) allows new services from CMS without code changes
- SEO: topical relevance grouping

**Risk**: Longer URLs. Mitigated by 301 redirects from old flat URLs preserving all existing SEO equity.

---

## 9. Schema Type: `ProfessionalService` vs `Store`

**Decision**: `ProfessionalService` (schema.org)

**Alternative**: Keep `Store` from current site

**Why ProfessionalService wins**:
- Integrity Solutions is a consulting/service company, not a retail store
- `ProfessionalService` is the correct schema type for this business
- Better search result features (knowledge panel, service listings)
- The current `Store` schema was likely a mistake

---

## 10. No Dark Mode for v1

**Decision**: Skip dark mode, architect for future support

**Alternative**: Ship dark mode from day one

**Why skip wins**:
- Corporate B2B site — visitors primarily browse during business hours on work devices
- Navy-heavy design already provides visual contrast (not an all-white page)
- Adding dark mode doubles QA effort for every component
- Tailwind CSS variables make adding it later straightforward
- v1 priority is content parity and visual quality, not feature expansion

---

## 11. Client Logo Marquee vs Grid/Carousel

**Decision**: CSS-only auto-scrolling marquee

**Alternative**: Static grid (current site uses a paginated grid)

**Why marquee wins**:
- 27 logos is too many for a static grid — would dominate the page
- Auto-scroll is passive (no user interaction needed) and displays all logos
- CSS-only implementation (no JS) — zero performance cost
- Marquee is a widely used modern pattern for client logos
- Graceful degradation: if CSS animation doesn't load, logos display as a wrapped row

---

## 12. Google Fonts vs Self-Hosting Fonts

**Decision**: Google Fonts (via `next/font/google`)

**Alternative**: Self-host font files (current approach)

**Why Google Fonts wins**:
- `next/font` automatically optimizes fonts: preloads, eliminates CLS, self-hosts at build time
- Despite the name, `next/font/google` downloads fonts at build time and serves them from the same domain — no external requests at runtime
- Automatic subsetting for the characters actually used
- Zero maintenance — no TTF files to manage
- Better than the current self-hosted approach in every way

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|-----------|
| Should we support multilingual (English)? | No for v1. Architecture supports i18n (App Router nested routes) but content is Spanish-only |
| Do we need a blog? | Not in scope. Sanity supports it if needed later |
| Do we need user authentication? | No. Sanity Studio has its own auth |
| What email service for contact form? | Resend (free tier sufficient, simple API) |
| Do we need CAPTCHA on the form? | Rate limiting + honeypot field. If spam becomes an issue, add hCaptcha (privacy-friendly) |
| "Acceso Informes" — keep or rebuild? | Keep as external link (OneDrive). Make the URL editable in siteSettings |
