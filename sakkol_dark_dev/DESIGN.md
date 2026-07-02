---
name: Sakkol Dark Dev
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#cdc6b5'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#969081'
  outline-variant: '#4b473a'
  surface-tint: '#d8c683'
  primary: '#ffffff'
  on-primary: '#3a3000'
  primary-container: '#f5e29c'
  on-primary-container: '#71642b'
  inverse-primary: '#6b5e25'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#303030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f5e29c'
  primary-fixed-dim: '#d8c683'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#52460f'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  meta:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  section-v-desktop: 100px
  section-v-mobile: 64px
  card-padding: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for the high-end developer portfolio niche, balancing technical precision with a premium, editorial aesthetic. The brand personality is sophisticated, confident, and meticulously organized, targeting recruiters and collaborators in the high-growth tech space.

The visual style is a fusion of **Corporate Modern** and **Minimalism**. It relies on high-quality typography, generous white space (or "dark space"), and a strict monochromatic base punctuated by a single, warm accent. The interface avoids unnecessary decorative elements, opting instead for structural integrity, clear information hierarchy, and subtle tactile details like 1px hairlines to define depth without clutter.

## Colors

The palette is anchored in deep charcoal and obsidian tones to reduce eye strain and provide a canvas for code and high-resolution project imagery. 

- **Primary (Accent):** #F5E29C is a soft cream-gold used sparingly to guide the eye toward conversion points and key categories.
- **Backgrounds:** The base layer uses #1B1B1B. Component surfaces and cards use #232323 to create a subtle lift from the background.
- **Borders & Dividers:** A consistent #3A3A3A is used for all structural hairlines, ensuring a crisp, architecturally-sound layout.
- **Typography:** Pure white is reserved for headings and active states, while #B8B8B8 provides optimal readability for long-form body text.

## Typography

The typography system utilizes a high-contrast pairing between the geometric, technical character of **Sora** and the utilitarian clarity of **Inter**. 

Headlines use Sora with tight letter-spacing to create a "locked-in," professional appearance. Section eyebrows (labels) are set in uppercase Inter with wide tracking to serve as clear structural markers. Body copy is optimized for readability with a generous 1.6 line-height, ensuring technical documentation and case studies are easy to digest.

## Layout & Spacing

This design system uses a **Fixed Grid** model on desktop and a fluid model on mobile devices.

- **Desktop:** 12-column grid with a 1200px max-width, 24px gutters, and 40px side margins.
- **Tablet:** 8-column grid with 32px side margins.
- **Mobile:** 4-column fluid grid with 20px side margins.

The spacing rhythm is intentional and generous. Vertical section padding ranges from 80px to 120px to give content "room to breathe," reflecting a high-end editorial sensibility. Internal component spacing follows a strictly linear scale based on 8px increments.

## Elevation & Depth

In this design system, depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows.

- **Level 0 (Base):** #1B1B1B.
- **Level 1 (Cards/Surfaces):** #232323 with a 1px solid border of #3A3A3A.
- **Interaction:** Hover states on interactive cards may increase the border brightness to #505050 or introduce a subtle 1px glow using the primary accent color.

Avoid drop shadows unless used for absolute-positioned elements like dropdown menus or modals, in which case use a highly diffused, 20% opacity black shadow.

## Shapes

The shape language is "Soft-Square." It avoids the extreme roundness of consumer-facing social apps in favor of a more structured, architectural feel.

- **Standard Elements (Inputs/Small Buttons):** 6px corner radius.
- **Containers & Cards:** 16px corner radius.
- **Icon Enclosures:** 8px corner radius.

Consistent stroke weights of 1px for borders and 1.5px for icons are mandatory to maintain the "blueprint" technical aesthetic.

## Components

### Buttons
- **Primary:** Solid #F5E29C fill with #1B1B1B text. 6px radius. Bold Inter font.
- **Secondary:** Transparent background with 1px #FFFFFF border. White text. 6px radius.
- **Ghost:** No border or fill. White or #B8B8B8 text.

### Cards
Cards are the primary container for projects and blog posts. They feature a #232323 background, 16px radius, and 1px #3A3A3A border. Internal padding should be a minimum of 32px.

### Chips / Tags
Used for technical skills. Small, 4px radius, #232323 background with #3A3A3A border. Text is #B8B8B8 in the `meta` typography style. If a tag is "highlighted," use the primary accent color for the text and border.

### Input Fields
Dark backgrounds (#1B1B1B), 1px #3A3A3A borders, and 6px radius. Focus states should transition the border color to the primary accent (#F5E29C).

### Icons
Use outline-only icons (Feather or Phosphor style). Stroke weight should be 1.5px. Icons should always be centered within their containers or aligned precisely with text baselines.