# Bogstedt-restraint redesign (v3, site-wide)

**Date:** 2026-07-11 · **Approach:** hybrid (shared-component fix + full browser walk) · **Approved by:** owner (Momo), decisions captured via brainstorm Q&A + visual companion mockups.

## Goal

Keep the v3 dark automotive identity (titanium/gunmetal/carbon, Manrope + Instrument Sans, Swedish copy) but adopt bogstedtbil.se's *restraint*: fewer accents, calmer section cadence, inventory closer to the top. No light-theme change. Whole site in scope.

## Locked decisions

| Decision | Choice |
|---|---|
| Theme | Dark stays; borrow Bogstedt's composure, not its palette |
| Scope | All 8 routes + shared components |
| Hero | Stays 100svh; fixed via content order, not height |
| Cognac | Option A — sell-CTA only (+ focus rings, + admin-preview chip as internal marker) |
| Hero/instrument | Mockup option 1 — fold trust facts into hero, delete instrument cluster |
| Eyebrows | Drop on all in-page SectionHeaders; PageHero keeps its eyebrow (subpage wayfinding). `.eyebrow`-styled *labels* (footer columns, Öppettider/Samarbetspartners strip labels, Besök info labels) stay — labels ≠ kickers |

## 1. Accent budget (site-wide)

**Keeps cognac:** leather sell-CTA (plate + `leather` button variant), all `:focus-visible` rings and `has-[:focus-visible]` card rings, Admin-preview chip dot.

**Loses cognac:**
- `LeatherSeam` component in `page.tsx`: deleted (both usages). Sections meet on existing hairline borders.
- `surface-carbon:hover` box-shadow (globals.css): cognac ring/glow → quiet silver ring + soft elevation (keep transition + `@media (hover:hover)` guard).
- `btn-cognac` removed from `btnBase` (ui.tsx); the utility deleted from globals.css. Buttons keep their machined/outline styles + existing depth shadows.
- `hover-cognac` utility: Reviews badge switches to a neutral `ring-white/20`-style hover; utility deleted.
- Home pillar top-ticks `bg-cognac` → `bg-white/15`.
- Instrument redline + primary-gauge cognac tick: gone with the cluster (delete `.instr-ruler`/`.instr-redline` CSS + keyframes and their reduced-motion entries).
- /tjanster point-list dashes `bg-cognac` → `bg-white/25`.
- /vanliga-fragor answer tick `bg-cognac` → `bg-white/15`.
- /bilar/[slug] price readout-tick `bg-cognac` → `bg-white/15`.
- CarGallery lightbox active-thumb `ring-cognac` (selection state, not focus) → `ring-silver`.
- Header desktop active-link `decoration-cognac` → `decoration-silver` (hover hint `decoration-cognac/40` → `decoration-white/30`).
- Reviews stars `text-cognac` → `text-cream`.
- Grep sweep for any remaining `cognac` outside the keep-list (CarListing, forms, om-oss, kontakt, salj-din-bil, hitta-min-bil) and convert to the neutral equivalents above.

## 2. Home page restructure

- **Hero (photo, type, 100svh unchanged):**
  - Frosted live badge top-right — "18 bilar i lager" from `inStockCars().length`, same chip material as year badges (`bg-black/45 backdrop-blur ring-1 ring-white/10`), offset below the fixed header (~`top-24`), hidden if stock is 0.
  - Trust row under the CTAs: "Alla märken · Fri värdering · Svar inom ~1 arbetsdag" (one slim muted line; address pin line stays after it).
  - Scroll cue shows on all viewports (remove `hidden lg:`).
- **Instrument cluster section: deleted** — the `instrument` array, CountUp usage, gauge markup, and its CSS. (`CountUp.tsx` file remains; unused is harmless.)
- **Featured car card:** drop the "Ur lagret" eyebrow (duplicates the "Utvald ur lagret" badge).
- **New flow:** hero → öppettider strip → Bilar i lager → pillars → reviews → sell-CTA → services → besök → contact → partners. (Both leather seams removed.)

## 3. Site-wide eyebrow pass

Remove the `eyebrow` prop from every in-page `SectionHeader` call site across all routes (home "Bilar i lager", tjanster "Runt själva affären", and any on om-oss/kontakt/salj-din-bil/hitta-min-bil/bilar). `SectionHeader` keeps the prop (PageHero-adjacent uses may want it later); `PageHero` untouched.

## 4. Verification & delivery

1. Browser walk all routes (/, /bilar, /bilar/[slug], /salj-din-bil, /hitta-min-bil, /tjanster, /vanliga-fragor, /om-oss, /kontakt) at desktop + mobile: no cognac outside keep-list, no layout breaks, no console errors, no horizontal overflow.
2. Reduced-motion spot check (scroll cue, hero drift fallbacks still intact).
3. `tsc --noEmit`, `eslint --max-warnings=0`, `next build`.
4. Fresh dual-agent `/impeccable critique` on home; target ≥33/40 (was 31).
5. Ships as its own commit (pre-redesign work committed separately at d7eac8d); push + redeploy to the `svenljunga-bilcenter-v3` Vercel project (v1/v2 untouched).

## Out of scope

Light theme, nav restructure, new pages, DESIGN.md sidecar regeneration, admin-preview area redesign, watermark removal (owner explicitly keeps it), hero height changes.
