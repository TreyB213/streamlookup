# Design Brief — Streaming Hub

**Direction**: Premium streaming service with Netflix-style content discovery, hero-featured titles, and cinematic red-on-black contrast.

**Tone**: Cinematic dark-only theater aesthetic with bold theater red primary and warm cinema gold accents. Immersive, focused, premium OTT.

**Differentiation**: Red glow hover states on poster cards create marquee cinema effect; full-width hero with gradient overlay prevents blank render; smooth scale-up animations on card interaction.

**Palette**
| Token | OKLCH | Role |
| --- | --- | --- |
| Background | 0.12 0 0 | Deep black theater ambient |
| Foreground | 0.97 0 0 | Crisp white text |
| Card | 0.16 0 0 | Poster containers |
| Primary (Red) | 0.48 0.22 16 | CTAs, hover glow, focus states |
| Secondary (Gold) | 0.65 0.12 62 | Accents, section labels |
| Muted | 0.25 0 0 | Borders, disabled states |
| Input | 0.19 0 0 | Form field backgrounds |

**Typography**
- Display: Space Grotesk — hero titles, section headers (text-4xl md:text-6xl, font-bold)
- Body: General Sans — descriptions, card metadata, UI labels (text-sm md:text-base)
- Mono: Geist Mono — IMDb IDs, server names

**Elevation & Depth**: Card backgrounds with subtle shadows; red glow on hover creates visual depth; gradient overlays on hero image prevent text collision.

**Structural Zones**
| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | Card (0.16), sticky | Border divider | Logo, search, IMDb input |
| Hero | Image + red/black gradient | None | Featured title, metadata |
| Content Rows | Background (0.12) | None | Title + horizontal cards |
| Card | Card (0.16) | Soft border | Poster image, red glow on hover |
| Footer | Muted (0.25) | Border divider | Attribution, links |

**Spacing & Rhythm**: Section gaps 2–3rem. Card grid gaps 1rem. Hero padding 3rem. Dense navigation, spacious content.

**Component Patterns**
- Poster Cards: rounded-lg, bg-card, glow-red-hover, scale-on-hover
- Hero Section: gradient-hero, full-width, absolute-overlay text
- Search Input: bg-input, red focus ring, placeholder muted foreground
- Server Dropdown: bg-card, text-foreground, red ring on focus

**Motion**
- Entrance: fade-in 0.4s, slide-up 0.5s on content rows
- Hover: scale 1.05 with red glow 0.3s smooth
- Decorative: fade-in on modal overlays

**Constraints**
- Dark-only, no light mode
- No generic blue defaults — theater red mandatory
- Hero gradient fallback prevents blank render on missing images
- All focus states use primary red ring (oklch 0.48 0.22 16)

**Signature Detail**: Red marquee glow on poster hover — cinematic theater lobby aesthetic.
