# Integrity Solutions — Website Migration Plan

## Project Summary

Migrate the current static HTML/CSS/JS website for Integrity Solutions (an Ecuadorian corporate integrity and polygraph services company) to a modern **Next.js + Sanity CMS** stack hosted on **Vercel**. The redesign maintains all existing content (in Spanish), the brand colors, and the logo — while delivering a fully modernized, professional, and trustworthy visual identity.

## Current State

| Aspect | Current |
|--------|---------|
| Stack | Static HTML, vanilla CSS, jQuery 3.4.1 |
| Pages | 6 (index, contact, integrityreport, poligrafo, integritest, seguridadvial) |
| CMS | None — all content hardcoded |
| Hosting | Unknown (domain: integritysolutions.ec) |
| SEO | Static meta tags, Open Graph, JSON-LD (Store schema, Breadcrumbs) |
| Analytics | Google Analytics UA-115651902-1 |
| Fonts | Montserrat, Lato, Signika, Merriweather (self-hosted TTF) |
| Language | Spanish |

## Target State

| Aspect | Target |
|--------|--------|
| Stack | Next.js 14+ (App Router), Sanity v3, TypeScript |
| CMS | Sanity Studio (embedded or standalone) |
| Hosting | Vercel |
| SEO | Dynamic from CMS (meta, OG, JSON-LD, sitemap) |
| Analytics | Google Analytics 4 (via next/script or GTM) |
| Fonts | Google Fonts (Montserrat + modern pairing) |
| Language | Spanish (with i18n-ready architecture) |
| Design System | Tailwind CSS v4 |

## Document Index

| File | Purpose |
|------|---------|
| [01-brand-extraction.md](01-brand-extraction.md) | Colors, logo, typography, brand assets preserved from the current site |
| [02-content-inventory.md](02-content-inventory.md) | Full content extracted from every page |
| [03-design-direction.md](03-design-direction.md) | Aesthetic philosophy, design system, LLM pitfalls to avoid |
| [04-technical-architecture.md](04-technical-architecture.md) | Next.js, Sanity, Vercel setup and project structure |
| [05-sanity-schemas.md](05-sanity-schemas.md) | All CMS schemas, SEO configuration, content modeling |
| [06-seo-strategy.md](06-seo-strategy.md) | SEO parity plan and improvements |
| [07-implementation-phases.md](07-implementation-phases.md) | Phased task breakdown with dependencies |
| [08-decisions-and-rationale.md](08-decisions-and-rationale.md) | Key decisions made and why |
