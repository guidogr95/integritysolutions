# 03 — Design Direction

## Aesthetic Philosophy: Swiss Functionalism + Corporate Trust

For a corporate security and integrity services company, the design must communicate **trust, authority, and professionalism** above all else. The target audience is HR directors, security managers, and C-suite executives at medium-to-large companies in Ecuador.

### Chosen Direction: "Swiss / International Typographic" with warmth

**Why:** The Swiss style emphasizes objectivity, structure, and precision — exactly the qualities an integrity/polygraph company needs to project. We soften it with the warm orange accent (brand color) to avoid feeling cold or unapproachable.

**Why not others:**
- ~~Scandinavian~~: Too soft/friendly for a security services company
- ~~Brutalist~~: Too aggressive, would undermine trust
- ~~Art Deco~~: Too decorative — wrong industry
- ~~Editorial~~: Content volume is too low for a magazine layout
- ~~Japanese Minimalism~~: Beautiful but would feel too sparse for a company that needs to show authority and evidence of work

---

## Design Principles

### 1. Typography-Led Hierarchy
- **Montserrat** (kept for brand continuity) for headings — use bold/semibold weights, tight letterspacing on large sizes
- **DM Sans** for body text — clean, geometric, modern readability. Superior to Lato for contemporary feel
- Dramatic scale contrast: hero headings at 48-72px, body at 16-18px
- No more than 3 type sizes per section

### 2. Color Usage
- **Navy (#032D51)** as the dominant color — used for large areas, section backgrounds, text
- **Orange (#F78F1E)** as the functional accent — used ONLY for CTAs, active states, key highlights. Never decorative. It earns attention by being rare
- **White/off-white** for breathing space
- Neutral grays for supporting text
- No gradients except subtle ones for depth (navy-to-darker-navy). No orange-to-yellow gradients

### 3. Layout
- Strong column grid (12-column, 1280px max-width)
- Generous whitespace between sections (80-120px vertical rhythm)
- Asymmetric layouts for key sections (e.g., about section: 60/40 split, not 50/50)
- Full-bleed sections alternate with contained sections for rhythm

### 4. Imagery
- Service pages use high-quality, professional photography — not generic stock
- Images are large and dramatic (full-bleed or contained in the grid)
- Client logos in a single-row auto-scrolling marquee (not a paginated carousel)
- Certification logos with subtle grayscale → color on hover

### 5. Motion
- Subtle, purposeful entrance animations (opacity + slight translateY, 300-400ms)
- No flip animations, no bounce, no AOS-style "spectacle" animations
- Smooth scroll behavior
- Hover states with quick transforms (150-200ms)

---

## LLM Design Pitfalls — Active Mitigations

These are the known bad habits of LLM-generated designs that we will explicitly guard against:

| Pitfall | How We Avoid It |
|---------|----------------|
| **Purple/blue gradients on white** | Our palette is navy + orange. No purple anywhere. Gradients only navy-to-darker-navy |
| **Inter/system font defaults** | Montserrat (brand) + DM Sans. Both distinctive, neither generic |
| **Predictable 3-column card grids** | Service pages use varied layouts: full-width features, asymmetric splits, staggered content |
| **Cookie-cutter hero with centered text on gradient** | Hero uses a strong typographic treatment with asymmetric layout, real content, and brand imagery |
| **Excessive border-radius (pill buttons, 20px rounded cards)** | Controlled radius: 8px for cards, 6px for buttons. No pill shapes |
| **All-centered layouts** | Left-aligned text throughout. Centered only for section headings and stats |
| **Bland "corporate blue" look** | Navy is deep and authoritative, contrasted with warm orange. Not the typical SaaS blue |
| **Generic CTA copy** | All CTAs use the existing Spanish content — specific and meaningful |
| **Overuse of shadows** | Shadows used sparingly. Prefer borders and background contrast to create depth |
| **Same layout on every page** | Each service page has a unique hero image and content structure reflecting its content |
| **Too many micro-animations** | Only entrance reveals and hover states. No wiggling icons or bouncing elements |
| **Decorative icons that don't communicate** | Use icons only where they add meaning (stats, benefits list). No decorative blobs or shapes |
| **Fake testimonial sections** | No invented content. Client logos section is real. No fake quotes |
| **Generic stock photography** | Maintain current real photos, recommend professional photoshoot for upgrade |

---

## Page-by-Page Design Notes

### Homepage
1. **Hero**: Full-viewport section. Large typographic headline on the left, brand imagery/abstract on the right. Navy background. Single clear CTA. No slider/carousel — the current 3-slide approach dilutes the message
2. **About**: Asymmetric 60/40 split. Text left, image right. "Expertos en Integridad" heading with orange underline accent
3. **Stats**: Full-width navy bar with three stats in a row. Numbers in large Montserrat bold, labels in DM Sans
4. **Certifications**: Clean horizontal row with grayscale logos. "Avalados por" heading
5. **Mission/Vision/Values**: Three cards with icon, but styled as a horizontal strip — not stacked. Clean borders, no heavy shadows
6. **Services**: Four service cards in a 2×2 grid (desktop), each with image, title, short description, and "Conocer más" link
7. **Client logos**: Auto-scrolling marquee, single row, grayscale → subtle color on hover
8. **CTA Banner**: Full-width orange background with white text. "¿Quieres hablar con uno de nuestros agentes?"
9. **Map/Location**: Two office locations with embedded maps, tabs for Quito/Guayaquil
10. **Footer**: Structured 3-column layout — contact info, services links, social links

### Service Pages (Integrity Report, Polígrafo, AMITAI, Seguridad Vial)
1. **Hero banner**: Full-width image with dark overlay, service name as large heading, short description, and CTA button
2. **Benefits**: Two-column grid with checkmark icons, or a numbered list with strong typography
3. **CTA section**: Reusable full-width banner component
4. For **Seguridad Vial** specifically: training programs in accordion or tab layout (3 programs with details)

### Contact Page
1. **Two-column layout**: Form on left, contact info + map on right
2. **Form**: Clean, labeled inputs. No floating labels (accessibility). Clear submit button in orange
3. **WhatsApp CTA**: Prominent but secondary to the form
4. **Maps**: Tab switcher for Quito/Guayaquil offices

---

## Responsive Strategy

- **Mobile-first** implementation
- **Breakpoints**: 375px (base), 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Navigation: hamburger menu on mobile with slide-out drawer
- Service cards: single column on mobile, 2-column on tablet, 2×2 on desktop
- Stats: stacked vertically on mobile
- Client logos marquee: same on all sizes (auto-scrolling handles it)

## Dark Mode

- Not implementing dark mode for v1. The navy-heavy design already provides visual weight
- Architecture will support it (CSS variables via Tailwind) for future addition

## Accessibility

- WCAG 2.1 AA target
- Orange (#F78F1E) on navy (#032D51) passes AA for large text (contrast ratio ~4.6:1)
- Orange on white does NOT pass — use darker orange (#B96B17) for text-on-white scenarios
- All interactive elements: visible focus rings
- Semantic HTML throughout (nav, main, article, section, footer)
- `aria-label` on icon-only buttons
- Skip-to-content link
