---
target: src/app/page.tsx (home)
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-07-10T16-28-06Z
slug: src-app-page-tsx
---
Method: dual-agent (A: abebb42259aadb26e · B: ac99db9f9c3f0e0a6)

# Critique — Home page (src/app/page.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live dots, count-up, hover/focus all present; no inventory-freshness signal |
| 2 | Match System / Real World | 4 | Swedish throughout, human copy, coherent automotive metaphors — exemplary |
| 3 | User Control and Freedom | 3 | Clean links, reduced-motion honored; hero drift/count-up can't be paused (gated) |
| 4 | Consistency and Standards | 3 | Eyebrow usage inconsistent; Reviews re-implements SectionHeader by hand |
| 5 | Error Prevention | 3 | Empty-inventory state excellent; form validation present |
| 6 | Recognition Rather Than Recall | 3 | Prices/specs on cards; instrument abbreviations take a beat to parse |
| 7 | Flexibility and Efficiency | 3 | tel:/maps links, inputMode keyboards, multiple entry points |
| 8 | Aesthetic and Minimalist Design | 3 | Eyebrow density + double photo overlays + two cognac seams push decorative |
| 9 | Error Recovery | 3 | role=alert field errors, empty state; submit-error UX not in this file |
| 10 | Help and Documentation | 3 | FAQ in nav, phone x5, hours, address — right-sized |
| **Total** | | **31/40** | **Good — strong, ship-worthy with polish** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** Deterministic detector: **0 findings, exit 0** on both page.tsx and CarCard.tsx. None of the absolute bans appear — no gradient text, no 01/02/03 scaffolding, no side-stripe borders, no default glassmorphism panel, no invented stats (honesty gates actively refuse). Motion is deliberately diversified (instr-wipe, hero-drift, pulse-live, scroll-cue, CountUp, reveal-scale), not a uniform reflex.

The remaining tells are "over-crafted reflex," not "generic": eyebrow-on-nearly-every-section, the instrument cluster's hero-metric *silhouette* (content dodges the trap), the per-photo watermark badge, and cognac sprayed wide enough to lose its "one 3% moment."

## What's Working

1. **A committed material world, not a theme** — carbon weave, layered-gradient speedometer, hero-drift, machined card edges are load-bearing brand decisions. Biggest reason it escapes the SaaS/marketplace read.
2. **Honesty infrastructure in code** — hoursConfirmed/reviewsConfirmed/statsConfirmed gates + the empty-inventory state that converts dead stock into a lead. Operationalizes trygg/tydlig.
3. **Reassurance engineered at decision points** — social proof before the ask, "svar av en människa" repeated at hero+contact, no-obligation valuation framing.

## Priority Issues

**[P1] Inventory buried below full-height hero + hours strip + instrument cluster.** On mobile the first car is ~2-3 viewports down; a used-car dealer's primary job is "show me cars." Fix: trim hero to ~82-88svh and/or surface a jump to inventory. Command: `layout`.

**[P1] Cognac discipline diluted.** The "one ~3% warm moment" currently fires on two full-width leather seams, the instrument redline, gauge underline, pillar ticks, every card/button hover glow, review stars, focus rings, and the leather CTA. The two seams also sit at only 2 of ~6 transitions (arbitrary). Fix: pull cognac out of the structural seams; keep the leather texture exclusive to the valuation CTA. Command: `quieter`.

**[P2] Self-watermarking inventory photos.** Every card stamps the SB logo + a year chip = two overlays per photo, on your own domain where anti-scrape doesn't apply. (Note: added at explicit user request — a committed choice, but flagged for legibility/grid-calm cost.) Fix: reduce prominence or reserve for exported images. Command: `quieter`/`polish`.

**[P2] Eyebrow-on-nearly-every-section.** Silver uppercase kickers lead hero, hours, inventory, pillars, services, contact. The named AI-slop cadence; flattens sections into one rhythm. Fix: drop eyebrows on 2-3 sections, open on the headline (Reviews already does). Command: `distill`/`typeset`.

**[P3] Scroll cue inverted; smallest text lowest-contrast.** The "Scrolla" cue is desktop-only (`hidden lg:flex`) — but desktop has the *least* severe fold; mobile (worst fold, majority platform) gets no cue. Instrument dt labels (0.66rem, muted, 0.22em) + captions (0.78rem muted) are the least legible text. Fix: show cue on mobile or shorten hero; bump instrument captions toward ink-3/silver. Command: `clarify`/`harden`.

## Persona Red Flags

**Jordan (first-timer):** instrument reads as abstract dashboard (no verbs on "Urval/Alla märken"); must scroll past hero+hours+gauge before one car; two equal-weight hero CTAs leave a buyer unsteered.

**Riley (stress tester):** touch users never see the second photo (crossfade is hover-only); long featured-card titles could wrap in the fixed 2-col spec grid; header nav sits over the lightest part of the hero (top scrim ~transparent).

**Casey (distracted mobile):** fullscreen hero + no mobile scroll cue = nothing signals cars below; instrument labels hard to glance-read in daylight. Credit: phone number appears 5x — tap-to-call always in reach.

## Minor Observations

- Copy: "fri värdering" (H2) vs "gratis värdering" (button) — pick one word.
- Reviews.tsx re-implements SectionHeader by hand (divergence risk, source of eyebrow inconsistency).
- Partner logos grayscale→color on hover only — stay gray on mobile (majority), muting the trust signal.
- Page ends on the cool partner-logo strip; a warm/human note would serve peak-end better.
- surface-carbon cognac hover glow on every card + button + reviews badge dilutes the accent further.

## Questions to Consider

1. If a visitor could scroll only once, would they know you sell cars — or see a promise and a speedometer of abstractions first?
2. Cognac is your one warm signal firing in ~8 places. Which single cognac moment would you keep if you could keep only one?
3. You watermark your own cars on your own site. Who is that badge for — the customer, or the fear of a stolen photo?
