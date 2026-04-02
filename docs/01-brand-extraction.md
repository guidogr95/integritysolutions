# 01 — Brand Extraction

Everything that must be preserved from the current website.

## Logo

- **Primary logo**: `images/temp/logo.svg` (SVG — vector, scalable)
- **Fallbacks**: `images/temp/logo.png`, `images/temp/logo@2x.png`, `images/temp/logohd.jpg`
- **Path**: The SVG is the canonical asset to carry forward
- **Favicon**: `images/favicon.png` — needs to be regenerated as multi-size favicon set (16, 32, 180, 192, 512px)

## Color Palette

### Primary Colors (MUST preserve)

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Brand Orange** | `#F78F1E` | `rgb(247, 143, 30)` | Primary accent, CTAs, active states, borders, highlights |
| **Brand Navy** | `#032D51` | `rgb(3, 45, 81)` | Headings, text accents, section backgrounds |

### Derived Orange Scale (from current CSS)

| Variant | Hex | Usage |
|---------|-----|-------|
| Lighter | `#FF9E00` | Button gradient start |
| Base | `#F78F1E` | Primary |
| Hover | `#E4821A` | Hover state |
| Darker | `#DA7E1C` | Darker hover |
| Dark | `#B96B17` | Tab backgrounds |

### Derived Navy/Blue Scale (from current CSS)

| Variant | Hex/RGBA | Usage |
|---------|----------|-------|
| Medium | `#2054A7` | Mobile menu backgrounds |
| Dark | `#1C4990` | Submenu backgrounds |
| Darker | `#113161` | Nested submenus |
| Deepest | `rgb(2, 0, 36)` | Gradient anchors |

### Neutral Palette (current)

| Role | Hex | Usage |
|------|-----|-------|
| Near-black text | `#3F3F3F` | Body text |
| Medium gray | `#747474` | Secondary text |
| Light gray | `#A6A6A6` | Muted/tertiary text |
| Border gray | `#DFDFDF` | Borders, dividers |
| Off-white | `#EBEBEB` | Shadows, light backgrounds |
| White | `#FFFFFF` | Backgrounds |

## Typography

### Current Font Stack

| Font | Weight | Use | Source |
|------|--------|-----|--------|
| **Montserrat** | Regular | Headings (h1, h2, h3) | Self-hosted TTF |
| **Lato** | Regular | Body text, UI | Self-hosted TTF |
| **Signika** | — | Buttons, alternate text | CSS reference |
| **Merriweather** | Light | Article text (serif) | Self-hosted TTF |

### Recommendation for Redesign

- **Keep Montserrat** for headings — it's recognized and fits the brand
- **Replace Lato** with a more distinctive body font (see Design Direction doc)
- **Drop Signika and Merriweather** — simplify to a 2-font system
- Load via Google Fonts (better caching, no self-hosting maintenance)

## Image Assets to Migrate

### Certification Logos (preserve as-is)
- `images/aipp.png` — AIPP (Asociación Internacional de Profesionales en Poligrafía)
- `images/setec.png`, `images/setec2.png` — SETEC certification
- `images/asis.png` — ASIS International
- `images/apa.png` — APA (American Polygraph Association)

### Client Logos (27 individual + sprite)
- `images/client01.png` through `images/client27.png`
- These should be migrated to Sanity as uploadable assets

### Section Icons
- `images/mission.png`, `images/vision.png`, `images/values.png`
- Replace with modern SVG icons or Lucide/Heroicons in the redesign

### Service Page Cover Images
- `images/temp/intreportcover.jpg` — Integrity Report
- `images/temp/polygraph.jpg` — Poligrafo
- `images/temp/integritestcover.jpg` — IntegriTest
- `images/temp/seguridadvcover.jpg` — Seguridad Vial
- `images/temp/amitai.png` — AMITAI logo
- Consider replacing with higher-quality, modern imagery

### Homepage Images
- `images/hr.jpg` — "About us" section
- `images/temp/92-1.jpg` through `92-6.jpg` — Service card headers
- `images/temp/call1.jpg` through `call4.jpg` — CTA section backgrounds
- `images/temp/card4img1.jpg` through `card4img3.jpg` — Card images

### Social Links

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/IntegritySolutionsEC |
| LinkedIn | https://www.linkedin.com/company/integrity-solutions-ec/ |
| Google Business | http://integrity-solutions.negocio.site/ |
| Email | info@integritysolutions.ec |
| WhatsApp | Linked in contact page |

## Contact Information

### Quito Office
- Edificio AXIOS, Oficina 904
- Av. De los Shyris N41-151 e Isla Floreana

### Guayaquil Office
- Av. Francisco de Orellana MZ 101 Solar 2 y Av. Agustín Freire

### Phone Numbers
- +593 995 527 670
- +593 995 527 732
- (02) 513 3970

### Business Hours
- Monday–Saturday: 08:30–18:00
- Sunday: Closed
