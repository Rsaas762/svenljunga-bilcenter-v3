---
target: bilar
total_score: 32
p0_count: 1
p1_count: 3
timestamp: 2026-07-04T01-43-18Z
slug: src-app-bilar-page-tsx
---
Method: dual-agent (A: design review + live browser · B: deterministic detector + browser evidence)

# Critique — /bilar Inventory Listing

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | role="status" live count ("18 bilar matchar") + instant client-side filtering. |
| 2 | Match System / Real World | 4 | Plain Swedish ("eller nyare", "Lägst miltal"). |
| 3 | User Control and Freedom | 3 | "Rensa filter" is a 20px grey text link; no per-filter remove chips. |
| 4 | Consistency and Standards | 2 | Empty-state CTA uses undefined bg-brand grey pill, not the machined-silver system button. |
| 5 | Error Prevention | 3 | Filters silently combine to zero results (BMW+Bensin) with no pre-hint. |
| 6 | Recognition Rather Than Recall | 4 | All options visible in native selects, labels above each. |
| 7 | Flexibility and Efficiency | 3 | Good sort; no URL-state/shareable filtered views. |
| 8 | Aesthetic and Minimalist Design | 3 | Handsome, but 6-dropdown wall is heavy for an 18-car lot. |
| 9 | Error Recovery | 3 | Empty state warm, but its primary CTA fails contrast. |
| 10 | Help and Documentation | 3 | Intro copy sets expectations; no inline "how buying works". |
| **Total** | | **32/40** | **Good, with fixable defects** |

## Anti-Patterns Verdict
**Not AI slop.** Clears the DESIGN.md Don'ts: no gradient text, no glassmorphism, no 01/02/03 scaffolding, no side-stripe borders, no invented stats. Material depth is genuine and verified live — filter panel and every card carry the machined 1.5px top edge (rgba(255,255,255,0.42–0.5)) + card-rest shadow; not flat dark-mode gray. Neutral-eyebrow rule holds ("LAGER" is #9aa2a8, not cognac). Cognac genuinely rare.
**Deterministic scan:** detect.mjs exit 0 — ZERO findings across page + both components. Console: no errors. Network: 18/18 car images load through next/image, no failures. Contrast: no body text below 4.5:1 (measured 5.28–16.98:1). Mobile 375px: no horizontal overflow. The build is technically clean.
The one slop-adjacent risk is the **6-dropdown filter wall** — the "faceless marketplace / Blocket clone" silhouette the brand explicitly rejects — saved only by material treatment, not layout.

## Overall Impression
A genuinely well-built, on-brand listing that the deterministic layer passes cleanly. The defects are not craft failures — they're a handful of specific, fixable UX/consistency holes, all clustered at two moments: the **filter bar** (over-built for 18 cars) and the **empty state / focus affordances** (where the design system quietly isn't applied). Biggest opportunity: bring the brand's "one human, not a marketplace" thesis down to the listing itself — trust cue near the cars, and a proper CTA when the lot fails you.

## What's Working
1. **Verified material depth.** The hardest DESIGN.md rule (machined top edge, not flat gray) is correct on both the filter panel and cards.
2. **Excellent dark-palette contrast.** ink 16.98:1, muted 7.38:1, fog 5.29:1 — all AA, several AAA. The "≥4.5:1 on dark" claim holds under measurement.
3. **Honest IA.** role="status" count, real Blocket inventory, tabular price/mileage, one h1, whole-card stretched link with aria-hidden decorative arrow, long variant names truncated gracefully.

## Priority Issues

**[P0] Empty-state primary CTA fails contrast AND the design system.** CarListing.tsx:218 — "Be oss hitta din bil" uses `bg-brand` (#9aa2a8) + text-white = measured **2.59:1** (needs 4.5:1); hover `bg-brand-2` resolves to nothing. It's a flat grey pill, not the machined-silver plate the system mandates. This is the reassurance CTA at the exact "the lot failed me" peak-end moment — it looks disabled and is unreadable. Fix: use LinkButton variant="primary" (or the leather CTA — this is a real conversion moment); delete the dead bg-brand/bg-brand-2/text-brand classes. Command: /impeccable polish (or /impeccable colorize).

**[P1] Card focus ring is on the wrong box.** CarCard.tsx:9,26 — the article is overflow-hidden and the stretched link sets focus-visible:outline-none, so the global cognac :focus-visible ring fires only around the TITLE TEXT, not the card the link activates. Keyboard users get a small ring on the words, not the 18-card target they're navigating. Fix: move the visible cognac ring to the article via group-focus-within (ring-2 ring-cognac ring-offset-2 ring-offset-page). Command: /impeccable polish.

**[P1] Six filter controls for 18 cars (cognitive overload).** CarListing.tsx:71 — 6 simultaneous dropdowns (Märke, Pris, Årsmodell, Drivmedel, Växellåda, Sortera) for a lot you can scroll in seconds. Violates the >4-options rule and the "faceless marketplace" Don't. Fix: collapse to Märke/Pris/Sortera with a "Fler filter" disclosure for the rest; split Sortera out from the narrowing filters. Command: /impeccable layout (or /impeccable distill).

**[P1] "Rensa filter" reset is a 20px grey text link.** CarListing.tsx:190 — 20px tall, #9aa2a8 (same as surrounding labels), no button affordance; below the ≥44px promise and the hardest-to-hit escape from a zero-result dead end. Fix: real ≥44px hit area, subtle outlined-button treatment. Command: /impeccable layout.

**[P2] Filter selects are 42px tall (below the 44px touch-target promise).** CarListing.tsx:13 (py-2.5) — measured 42px on desktop AND mobile, 2px under the stated bar; these are the primary mobile controls. Fix: py-3 or min-h-[44px]. Command: /impeccable adapt.

## Persona Red Flags
**Casey (distracted-mobile) + local Sjuhärad phone buyer (project persona):** Hits a six-dropdown wall before seeing one car; selects at 42px slightly under thumb-comfort; no trust anchor ("besiktad/genomgången", response-time dot) near the cars — the reassurance the brand promises is stranded in the footer.
**Riley (stress-tester):** BMW+Bensin → 0 results (all BMWs are Diesel) → empty state with an unreadable 2.59:1 grey CTA that looks disabled. Tabs the grid and the focus ring hugs only the title text, not the card.
**Jordan (first-timer):** Mostly served, but price is Max-only in fixed 50k steps — a rough-budget buyer ("about 100k") can't express it and may not realise "Max 100 000 kr" excludes anything just over.

## Minor Observations
- Sort is conflated into the filter grid as a 6th "filter" — conventionally sits apart by the result count.
- Blocket images flash as large light-grey blocks before paint (no blur placeholder) — briefly inverts the dark aesthetic; consider placeholder="blur"/shimmer.
- Empty-state uses border-dashed with no border width/color alongside it — verify the dashed border actually renders.
- No trust cue ("Alla bilar genomgångna" from the meta description) appears on the page itself, only in metadata/footer.
- "LAGER" eyebrow clips under the sticky header at some scroll offsets (cosmetic).

## Questions to Consider
1. For an 18-car lot, is a filter bar the right primitive at all — or would one "Sortera" control + scannable cards convert a distracted local buyer better than six dropdowns that make the page feel like Blocket (the thing the brand rejects)?
2. The thesis is "one human, not a faceless marketplace" — so why does the listing, where buyers actually decide, carry no face, no response-time dot, no "besiktad" reassurance, while the footer hoards all of it?
3. bg-brand/text-brand/bg-brand-2 silently resolve to muted grey (one to nothing) — if the system has no "brand" colour, why do these tokens exist, and where else are they rendering primary actions as disabled-looking grey?
