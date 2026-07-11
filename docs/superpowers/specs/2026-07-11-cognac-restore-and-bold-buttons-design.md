# Cognac restore + bold "sweep" buttons (v3)

**Date:** 2026-07-11 · **Register:** brand · **Approved:** owner, via brainstorm + visual-companion picks (cognac = C "full", buttons = C "dynamic sweep", refined to silver-at-rest).

## Context

Partially reverses the cognac axis of the 2026-07-11 restraint pass (`2026-07-11-bogstedt-restraint-redesign-design.md`, shipped, 35/40). Owner now wants the warm accent back site-wide **and** bigger/bolder/more dynamic buttons. The restraint pass's *structural* wins stay (no instrument cluster, hero stock badge, dropped eyebrows, alternating bands) — only cognac usage + the button system change.

## 1. Restore cognac (the "full" look)

Re-add cognac everywhere the restraint pass neutralized it. Keep every non-cognac structural change intact.

- **Leather seams:** restore the `LeatherSeam` component in `page.tsx` and place two on the home page at band transitions (after the öppettider strip → before "Bilar i lager"; and before "Besök oss"). Thin cognac-leather divider with the dashed cream stitch (original markup).
- **`surface-carbon:hover`** (globals.css): revert to cognac ring + glow + inner tint + deep shadow (original), replacing the quiet silver ring.
- **`hover-ring` → `hover-cognac`:** restore the cognac hover utility (rename back); Reviews badge uses it again.
- **Reviews stars:** `text-cream`/cream fill → back to `var(--color-cognac)` (fill + stroke).
- **Decorative ticks → cognac:** home pillar top-ticks, /tjanster point-list dashes, /vanliga-fragor answer tick, /bilar/[slug] price readout-tick (all `bg-white/15|25` → `bg-cognac`).
- **Header:** desktop active-link underline `decoration-silver` → `decoration-cognac`; hover hint `decoration-white/30` → `decoration-cognac/40`.
- **CarGallery** lightbox active thumb `ring-silver` → `ring-cognac`.
- **Required-field asterisk** (ui.tsx) `text-silver` → `text-cognac`.
- **Unchanged (already cognac):** `:focus-visible`/`:focus` rings, `::selection`, Admin-preview chip, leather sell-CTA.

Net: cognac is the site-wide warm accent again, not just the sell-CTA.

## 2. Bold "sweep" button system (ui.tsx + globals.css)

Bigger, heavier, squared, with cognac motion on hover — machined-silver identity kept **at rest**.

**Base (`btnBase`):** add `rounded-lg` (was `rounded-full`), `font-bold`, `uppercase`, `tracking-[0.03em]`. Wrap children in `<span className="relative z-[1]">` in both `LinkButton` and `Button` so the sweep layer sits behind the label.

**Sizes (bumped):**
- `md`: `px-7 py-3.5 text-[0.95rem]` (was `px-6 py-3 text-[0.9rem]`)
- `lg`: `px-9 py-4.5 text-[1.02rem]` → use `px-9 py-[1.05rem] text-[1.02rem]` (was `px-8 py-4 text-base`)

**New `@utility btn-sweep`** (globals.css): `position:relative; overflow:hidden; isolation:isolate;` with a cognac-leather `::after` (`inset:0; background:linear-gradient(180deg,#a8683d,#7c4d2c); transform:translateX(-101%); transition:transform .32s cubic-bezier(.2,.7,.2,1); z-index:0;`). `@media (hover:hover){ &:hover::after{transform:translateX(0)} &:hover{color:var(--color-cream)} }`. Reduced-motion: `&::after{transition:none}` (instant fill on hover, no wipe).

**Variants:**
- **primary:** `btn-machined btn-sweep text-[#20252a]` + `active:translate-y-px`. Silver plate at rest; cognac wipes across on hover; label → cream. (Drops the old `hover:brightness-105`.)
- **leather:** keep `bg-leather text-cream border border-cognac-deep/50 shadow-card hover:brightness-110 active:translate-y-px` — already warm, no sweep; inherits the new size + `rounded-lg` + uppercase. (Sliding arrow is per-call via existing `→` in label; no code change needed.)
- **outline:** `border border-white/25 bg-white/[0.04] text-pearl hover:border-cognac/50 hover:bg-cognac/[0.06] hover:text-white` (adds cognac hover); inherits size/corners.
- **outlineOnDark / dark:** inherit new base (squared, uppercase, size); dark keeps `surface-carbon` (which itself regains cognac hover from §1).

**Header CTA** ("Sälj din bil", hand-rolled, not `LinkButton`): align to the new language — `rounded-lg`, uppercase, `btn-machined btn-sweep` with a wrapped label span, bumped padding.

## 3. Verify & deliver

- Browser walk all routes desktop + mobile: sweep animates on primary hover (and is instant under reduced-motion), leather/outline adopt the new size/corners, cognac restored (seams, card hover, stars, ticks) with no layout break, no horizontal overflow, uppercase labels don't overflow their buttons at any breakpoint.
- `tsc` / `eslint` / `next build` clean (`rm -rf .next` first; restart preview after per the known Turbopack gotcha).
- Ships as one commit; push + redeploy to `svenljunga-bilcenter-v3` (v1/v2 untouched).

## Out of scope

Reverting any non-cognac restraint change (instrument cluster stays gone, eyebrows stay dropped, hero badge stays); hero height/watermark (owner-locked); light theme; new pages.

## Open risk

Uppercase on every button is the one thing to watch in the browser walk — if long labels ("Sälj eller byt in din bil", "Fråga oss om finansiering") read shouty or wrap, fall back to sentence case on `outline`/`dark` variants and keep uppercase only on `primary` + `leather` (the loud CTAs).
