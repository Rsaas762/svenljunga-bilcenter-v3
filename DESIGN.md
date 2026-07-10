---
name: Svenljunga Bilcenter
description: Dark automotive craft — smoked titanium, gunmetal, carbon fibre, one restrained cognac-leather moment.
colors:
  page: "#0c1013"
  carbon: "#23272b"
  panel: "#1b2025"
  ink: "#eff2f3"
  ink-2: "#dfe4e7"
  ink-3: "#c4ccd1"
  muted: "#9aa2a8"
  fog: "#7f888e"
  mist: "#363c42"
  silver: "#c6cbcf"
  silver-mist: "#aeb6bc"
  cognac: "#c98a5c"
  cognac-deep: "#b77949"
  cream: "#f3e5d4"
  trust: "#3f9857"
  danger: "#e06a5f"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.24em"
rounded:
  sm: "4px"
  md: "0.75rem"
  lg: "1rem"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "clamp(4rem, 9vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.silver}"
    textColor: "#20252a"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "#0c101322"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-leather:
    backgroundColor: "{colors.cognac-deep}"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  card-carbon:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0px"
  input:
    backgroundColor: "#ffffff0d"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Svenljunga Bilcenter

## 1. Overview

**Creative North Star: "The Lit Showroom After Hours"**

This is the dealership at night — the lights are low, the metal of the cars
catches a single sheen, and one warm lamp glows over the desk where a real
person still answers. The whole system is dark automotive craft: smoked-titanium
heroes, gunmetal informational bands, carbon-fibre cards and footer, a
graphite/silver header, and exactly one warm cognac-leather moment at the point
of conversion. The materials are genuinely present — you can read the brushed
grain, the carbon weave, the machined top edge on every raised surface — but they
are disciplined, never theatrical. The only true colour on the page is the clean
photography of the real stock.

The tone is *trygg, tydlig, personlig* (safe, clear, personal). Dark, but warm
and human — the darkness reads as a serious, well-run local shop, not a cold
luxury boutique or a neon-rimmed car ad. Density is generous: long line lengths,
big section breathing room, tabular figures for every price and mileage so the
numbers line up like an instrument cluster. Nothing shouts. Trust is earned by
specificity — real logo, real inventory, real address — not by gloss.

This system explicitly rejects the generic SaaS landing (Inter-for-everything,
purple/blue gradients, hero-metric template, eyebrow-on-every-section), the
faceless marketplace clone, the over-leathered fashion-luxury boutique, the
fake-luxury car-ad gloss (neon rim-light renders, shouting hero type), and every
AI-slop tell (gradient text, default glassmorphism, 01/02/03 scaffolding,
side-stripe accents, invented stats).

**Key Characteristics:**
- Dark by conviction — deepest surface `#0c1013`, light primary text `#eff2f3`.
- Real materials with a machined top edge, never flat "dark-mode gray".
- Cognac warmth held to ≈3%: focus rings, one seam, one leather CTA.
- Photography is the only saturated colour; textures never sit over photos.
- Tabular numerals everywhere numbers matter; Manrope + Instrument Sans.

## 2. Colors

A near-black graphite base layered with brushed-metal greys, lifted by a single
warm cognac accent and one living-green status dot.

### Primary
- **Cognac** (`#c98a5c`): The one warm voice. Focus halos on every interactive
  element, the required-field asterisk, text selection, the material seam
  (`LeatherSeam`), and the single leather conversion CTA. Never a section
  background, never on every card.
- **Cognac Deep** (`#b77949`): The pressed/active state of cognac and the leather
  button base; pairs with `cream` text.

### Secondary
- **Silver** (`#c6cbcf`) / **Silver Mist** (`#aeb6bc`): Machined-button faces,
  card arrows, hairline highlights, the header wordmark sheen. This is "metal",
  not an accent — it carries no brand emotion, only craft.
- **Trust Green** (`#3f9857`): A single living status light (e.g. "svarar
  normalt inom en arbetsdag" dots). Used as a small dot, never as fill or text.

### Neutral
- **Page** (`#0c1013`): The deepest background; the void behind every section.
- **Carbon** (`#23272b`) / **Panel** (`#1b2025`): Raised content surfaces —
  vehicle cards, form containers, floating hero card.
- **Ink** (`#eff2f3`): Primary body and heading text. **Ink-2 / Ink-3**
  (`#dfe4e7` / `#c4ccd1`): stepped-down headings and strong secondary text.
- **Muted** (`#9aa2a8`): Secondary text and neutral eyebrows/rules — *not* cognac.
- **Fog** (`#7f888e`): Tertiary text and captions. Not for form placeholders — at
  ~3.8:1 on the field surface it misses AA; placeholders use **Muted** instead.
- **Mist** (`#363c42`): Hairline borders and dividers on dark surfaces.

### Named Rules
**The 3% Cognac Rule.** The cognac accent appears on ≤3-5% of any screen: focus
rings, one seam, one CTA. Its rarity is the entire point — the moment it becomes
a section background or a per-card arrow colour, the warmth is spent and the page
tips into a fashion-luxury boutique. Metal (silver) carries structure; cognac
carries the one human moment.

**The Neutral-Eyebrow Rule.** Eyebrows and section rules use `muted` silver-grey
(`#9aa2a8`), never cognac. Warmth is a destination (the CTA), not a decoration
sprinkled across headings.

## 3. Typography

**Display Font:** Manrope (with ui-sans-serif, system-ui fallback)
**Body Font:** Instrument Sans (with ui-sans-serif, system-ui fallback)

**Character:** A contrast pairing on the geometric-vs-humanist axis. Manrope is
tight, confident, and mechanical — right for headings and instrument-style
labels. Instrument Sans is warmer and more open for running Swedish copy, so the
page reads like a person talking, not a spec sheet. Headings run at `-0.02em`
with `text-wrap: balance`.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 4rem)`, 1.05): Hero headline only. One
  per page. Ceiling stays well under the shout line.
- **Headline** (700, `clamp(1.75rem, 3.5vw, 2.5rem)`, 1.15): Section headings.
- **Title** (600, `1.25rem`, 1.3): Card titles, vehicle names, subsection heads.
- **Body** (400, `1rem`, 1.65): Running copy, capped at 65–75ch. Instrument Sans.
- **Label / Eyebrow** (600, `0.72rem`, `0.24em`, uppercase): Neutral silver
  eyebrows that echo the wordmark's wide tracking. Used sparingly, not per section.

### Named Rules
**The Instrument-Cluster Rule.** Every price, mileage, and year uses tabular
figures (`font-variant-numeric: tabular-nums`, the `nums` utility) and prices
never wrap. Numbers should line up column-to-column like a dashboard readout.

## 4. Elevation

A hybrid system: depth comes first from **material and a machined top edge**, and
only secondarily from soft shadow. Every raised surface (carbon card, plate
panel, floating hero card) carries a bright `1.5px` top border
(`rgba(255,255,255,0.4–0.5)`) that reads as a milled metal lip catching light,
plus a full `1px` hairline at `rgba(255,255,255,0.10–0.12)`. Shadows are deep,
soft, and low-spread — they sit the surface on the dark void without a visible
hard edge. There is no light-mode "card-on-white" elevation; on this page depth
is metal catching light, not a drop shadow.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 14px 28px -16px rgb(0 0 0 / 0.6)`): Default lift
  for carbon vehicle cards and panels.
- **Card hover** (`box-shadow: 0 26px 44px -22px rgb(0 0 0 / 0.7)`): Deeper,
  softer pool on hover — the surface rises, it does not glow.
- **Machined button** (`box-shadow: 0 5px 12px rgb(0 0 0 / 0.4), inset 0 1px #fff`):
  The inset white line is the milled top of the silver plate.

### Named Rules
**The Machined-Edge Rule.** Elevation is signalled by the bright top border
(the milled lip), not by a glow or a coloured ring. If a raised surface has no
`border-top` highlight, it looks like flat dark-mode gray — that's the failure.

## 5. Components

### Buttons
- **Shape:** Fully pill (`rounded-full`).
- **Primary (machined silver):** A milled bright plate —
  `linear-gradient(#f5f7f8, #bdc4c9 58%, #dce1e4)`, dark ink text (`#20252a`),
  `inset 0 1px #fff` top highlight. Padding `12px 24px` (md) / `16px 32px` (lg).
- **Hover / Focus:** `brightness(1.05)` on hover, `translateY(1px)` on active;
  cognac focus halo from the global rule.
- **Outline (ghost on dark):** `border-white/25` on a `bg-white/[0.04]` wash,
  brightening to `border-white/45` on hover. For secondary actions.
- **Leather (conversion only):** `bg-leather` cognac field with `cream` text —
  used once, at the sell/valuation CTA. Never a general button style.

### Cards / Containers
- **Corner Style:** `1rem` (`rounded-lg`) for vehicle cards.
- **Background:** `surface-carbon` (woven carbon weave) for vehicle cards;
  `surface-plate` / `surface-plate-strong` (`#1b2025` / `#1d2329`) for content
  and form panels and the floating hero card.
- **Border:** Full `1px rgba(255,255,255,0.10–0.12)` hairline plus the machined
  `1.5px` top edge (see Elevation).
- **Shadow Strategy:** Card-rest at rest, card-hover on hover. Never nested cards.
- **Image:** Vehicle photo sits in a `bg-carbon` placeholder; year badge is
  `bg-black/55`, price is `nums` and never wraps.

### Inputs / Fields
- **Style:** `bg-white/[0.05]` on a `border-white/15` hairline, `rounded-xl`,
  light `ink` text, `muted` placeholder (AA-safe, ≥4.5:1).
- **Focus:** Border shifts to `cognac`, background lifts to `bg-white/[0.08]`,
  plus the global cognac focus ring. Required asterisk is cognac.
- **Error:** `border-danger` (`#e06a5f`) with a described error message below.
- **File upload:** Custom dark drag/click dropzone (binary storage is a future
  backend; only file names are captured today).

### Navigation
- **Header:** `bg-graphite-gradient` (`#1d2024 → #27252d → #4b4d54`) bar, real
  accessible `<Link>`s with short labels, generous `gap-9` spacing, machined
  silver CTA. Not carbon — the header is the one graphite/silver moment up top.

### Signature: The Instrument Dial
A hero-only SVG arc in cognac (`.dial-arc`) that draws once on load
(`draw-arc`, 1.6s), echoing a car's instrument cluster. Freezes drawn under
`prefers-reduced-motion`. One per page, hero only.

## 6. Do's and Don'ts

### Do:
- **Do** keep cognac at ≈3-5%: focus rings, one seam, one leather CTA. Everything
  else structural is silver/metal or neutral grey.
- **Do** give every raised surface a bright `1.5px` machined top edge; that lip,
  not a shadow, is how depth reads on this dark page.
- **Do** use tabular figures (`nums`) for every price, mileage, and year, and keep
  prices on one line.
- **Do** let the real vehicle photography be the only saturated colour; keep it
  clean, and never lay a texture over a photo.
- **Do** ship an already-visible default and enhance with reveals; provide a
  `prefers-reduced-motion` fallback for every animation (reveals, hero drift,
  dial draw).
- **Do** use neutral silver-grey (`#9aa2a8`) for eyebrows and rules.

### Don't:
- **Don't** build a **generic SaaS landing**: no Inter-for-everything, no
  purple/blue gradients, no hero-metric template, no eyebrow-on-every-section.
- **Don't** turn this into a **faceless marketplace** (a Blocket/Bilweb clone);
  it is a dealer with a face, address, and phone.
- **Don't** drift **fashion / luxury-goods**: no over-leathering. Cognac stays
  ≈3%; leather is one moment, not a theme.
- **Don't** do **fake-luxury car-ad gloss**: no neon rim-light hero renders, no
  shouting hero type, no manufactured hype.
- **Don't** ship **AI-slop tells**: no gradient text, no default glassmorphism,
  no 01/02/03 numbered section scaffolding, no side-stripe accent borders, no
  invented stats/reviews/hours/certifications.
- **Don't** let a raised surface go flat: a card with no machined top edge just
  reads as 2020-era dark-mode gray. If it looks flat, the top border is missing.
- **Don't** put cognac on every card arrow or as a section fill — the moment it
  repeats, the warmth is spent.
