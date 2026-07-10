---
target: admin-preview/integrationer
total_score: 32
p0_count: 0
p1_count: 2
timestamp: 2026-07-04T22-19-28Z
slug: src-app-admin-preview-integrationer-page-tsx
---
Method: dual-agent (A: design review + live browser · B: deterministic detector + browser evidence)

# Critique — /admin-preview/integrationer (owner integration-pitch, mock data, noindex)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Status dot cognac→trust, aria-live role=status, all metrics update live. |
| 2 | Match System / Real World | 4 | Plain warm Swedish, owner-legible. |
| 3 | User Control and Freedom | 2 | Import is a one-way latch — no Reset to return to the pristine "Inte körd" state. |
| 4 | Consistency and Standards | 3 | Strong, but breaks its own DESIGN.md contract (side-stripe, 01/02/03). |
| 5 | Error Prevention | 4 | Nothing destructive; repeated clicks idempotent. |
| 6 | Recognition Rather Than Recall | 3 | Four unrelated number ladders; "1 av 3" implies a wizard that isn't enforced. |
| 7 | Flexibility and Efficiency | 3 | Nice "Visa krav" focus-jump; no reset offsets it. |
| 8 | Aesthetic and Minimalist Design | 2 | Six eyebrows + four numbered ladders + side-stripe = decorative density above the register line. |
| 9 | Error Recovery | 3 | Mock "2 behöver granskas" illustrative, not actionable (fine for a demo). |
| 10 | Help and Documentation | 4 | The "Så visar du sidan" presenter aside is smart inline documentation. |
| **Total** | | **32/40** | **Good** |

## Anti-Patterns Verdict
70% disciplined, 30% scaffolded. Faithful material system, tabular nums, neutral silver eyebrows, machined edges; honesty is layered (5 "mockdata / ingen extern anslutning" reassurances). But it trips TWO verbatim DESIGN.md Don'ts + leans on a third:
- **Side-stripe accent border** — `page.tsx:311-314`, a 4px×537px cognac gradient bar on the recommendation card. Banned verbatim; alone busts the ~3% cognac budget on that card.
- **False "1 av 3 / 2 av 3" wizard** — `IntegrationPreviewClient.tsx:73,213`: promises a 3-step sequence with no "3 av 3" and no enforced order.
- **Eyebrow-on-nearly-every-section** — six neutral eyebrows.
Deterministic scan: detect.mjs exit 0, ZERO findings; no console/network errors; all contrast 5.0–16.2:1 (thinnest: text-fog 4.54–5.04:1 on plate); touch targets 44/48/54px; no 375px overflow; import + toggle + aria-live all verified working. The detector MISSED the side-stripe (it's an abs-positioned gradient div, not border-left) — the design review caught it.

## Overall Impression
A genuinely polished, on-brand, technically clean pitch page whose only real problems are self-inflicted register slips: it violates its own design contract in two named ways and wears the costume of a wizard without the mechanics. Fix the side-stripe, the false counter, and add a reset, and this is an easy ship. Biggest opportunity: spend the cognac budget on the safety reassurance (the thing that earns owner trust), not a decorative bar.

## What's Working
1. Textbook live status: aria-live=polite wrapping role=status, status dot color+glow, all four metrics recompute on import (0→18/0/2). Accessible and honest.
2. The "Visa krav" button moves focus to #integrationskrav (tabIndex=-1) and respects reduced-motion — a keyboard-correct deep link.
3. Honesty is unambiguous and layered — 5 "mockdata / no external connection" reassurances bracket the interaction; future phases explicitly gated behind "kräver API".

## Priority Issues
**[P1] Remove the banned side-stripe accent border.** page.tsx:311-314 — 4px×537px cognac gradient bar on the recommendation card. DESIGN.md bans it verbatim; it repeats cognac down 537px and pushes the card toward fashion-boutique tone at the exact trust moment. Fix: delete the stripe div; the card already has border-cognac/25, or use a single machined top-edge. Command: /impeccable quieter.
**[P1] Kill the false "1 av 3 / 2 av 3" wizard counter.** IntegrationPreviewClient.tsx:73,213 — promises a 3-step flow that doesn't exist (no 3 av 3; step 3 is an unlabeled text button) and adds a fifth competing number ladder. Fix: drop the "· N av 3" suffix, or make it real and state-gated. Command: /impeccable clarify.
**[P2] Add a Reset/Nollställ control.** IntegrationPreviewClient.tsx:46-51 — import is one-way; a presenter can't show the "before" twice and the owner can't return to pristine. Fix: ghost "Återställ demo" button setting importTested=false; showCars=false. Command: /impeccable harden.
**[P3] Thin the 01/02/03 scaffolding.** Four numbered ladders. Keep the ones that are a genuine ordered procedure (RecommendationStep 1/2/3; presenter <ol> order via semantics), drop the decorative corner numerals on the roadmap cards (phases already carry meaning) and the requirement groups (categories, not a sequence). Command: /impeccable distill.
**[P3] Reduce eyebrow count from six to ≤3.** Drop eyebrows on the Flow and Requirements sections (their h2s are self-explanatory). Command: /impeccable typeset.

## Persona Red Flags
- Jordan (non-technical owner): "Demonstration · 1 av 3" makes them hunt for a step 3 and feel they missed something; four unrelated number ladders read as "this is complicated" when the flow is simple. Reassurance itself is excellent for Jordan.
- Riley (stress-tester): toggled cars 5× + re-ran import 2× — no broken state, aria-expanded correct, metrics stable. Only gap: no reset to pristine.
- Casey (mobile 375px): no overflow, Flow diagram stacks cleanly with ↓ connectors, targets 44–48px. The Admin pill is desktop-only (≥1024px); on mobile it lives in the overlay menu — reachable, not broken.

## Minor Observations
- Data coherence checks out: "18 poster · 2 behöver granskas" vs "16 godkändes + 2 = 18" — consistent.
- text-fog is the thinnest contrast margin on the page (4.54–5.04:1 on plate); passes AA but watch it if that surface ever darkens.
- translate="no" on the reference codes (BLK-1042) is a nice touch.
- Breadcrumb "Admin" is plain text (no admin index) — correct.

## Questions to Consider
1. For a non-technical owner, does the "Synkmotor / Officiellt API" flow diagram build trust or quietly signal "you'll need to keep paying a developer"? Would "vi sköter tekniken" convert better?
2. Is this a guided demo or a scannable pitch? The "1 av 3" costume says wizard; the mechanics say pitch — pick one.
3. If cognac is the "one human moment," shouldn't it live on the safety reassurance rather than a decorative bar?
