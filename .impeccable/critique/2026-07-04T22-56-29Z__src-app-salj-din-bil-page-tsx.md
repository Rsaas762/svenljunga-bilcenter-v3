---
target: salj-din-bil
total_score: 35
p0_count: 0
p1_count: 2
timestamp: 2026-07-04T22-56-29Z
slug: src-app-salj-din-bil-page-tsx
---
Method: dual-agent (A: design/conversion review + live browser · B: deterministic detector + measured browser evidence)

# Critique — /salj-din-bil (Sälj din bil — the site's highest-value lead form)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | "Skickar…" pending + disabled button, role=status success, role=alert server error. |
| 2 | Match System / Real World | 4 | Plain warm Swedish, "mil" not km, "Så går det till". |
| 3 | User Control and Freedom | 3 | No reset/return from success; no draft persistence on server error. |
| 4 | Consistency and Standards | 4 | Shared field system; autoComplete set correctly. |
| 5 | Error Prevention | 3 | inputMode=numeric on year/mileage, but year validates length only ("abcd" passes); no regnr/phone masking. |
| 6 | Recognition Rather Than Recall | 4 | Placeholder examples "T.ex. Volvo/XC60/2019". |
| 7 | Flexibility and Efficiency | 3 | regnr shortcut offered but unused; all fields hand-keyed. |
| 8 | Aesthetic and Minimalist Design | 3 | 11 fields (~1639px, 2 viewports on mobile) is heavy for a *free* valuation. |
| 9 | Error Recovery | 4 | Inline per-field errors, focus moves to first invalid, clear messages. |
| 10 | Help and Documentation | 3 | "Bra att veta" + phone fallback; no where-the-lead-goes / privacy detail. |
| **Total** | | **35/40** | **Good / strong** |

## Anti-Patterns Verdict
Clean — PASS. No eyebrow-on-every-section (two neutral-silver fieldset legends, not decoration), no gradient text, no side-stripe callouts (surface-plate uses a machined top edge), no invented stats. The "Så går det till" 1/2/3 is a legitimate semantic <ol> stepper, not banned section scaffolding. Cognac stays within 3% (required asterisk + focus rings). Labels are high-contrast (14:1), avoiding the muted-label trap.
Deterministic scan: detect.mjs exit 0, ZERO findings; no console/network errors; POST /api/leads → 200 (verified twice). But B measured TWO WCAG AA text-contrast fails: input placeholder fog #7f888e = 3.80:1, and the dropzone "JPG eller PNG" hint = 4.02:1 (both < 4.5:1). All touch targets ≥44px (inputs 51px, submit 58px). No mobile overflow.

## Overall Impression
A well-built, honest, accessible lead form that scores strong — but it is the ONE page the entire design system reserves its single leather-cognac conversion moment for, and that moment is missing: the submit CTA is the generic machined-silver button with a transactional "Skicka in" label. The biggest opportunity isn't fixing a bug — it's making the highest-intent action on the whole site actually feel like the warm, human moment the brand promises. Secondary: two small contrast misses and a photo field that quietly drops what the owner uploads.

## What's Working
1. **Trust microcopy at the submit moment** (LeadFormShell.tsx:118) — "Inga nyhetsbrev, ingen delning med tredje part" directly under the CTA is exactly the reassurance an anxious seller needs at peak-end.
2. **Honest, well-built states** — real POST to /api/leads (200), disabled button guards double-submit, role=status success / role=alert server error, focus moves to first invalid field. Empty submit → 6 clean inline errors with aria-invalid + aria-describedby.
3. **FileField is honest by construction** — dropzone shows selected names; code only sends photoNames, doesn't fake a binary upload.

## Priority Issues
**[P1] The one leather conversion CTA is missing — this is the page it's reserved for.** Submit button renders the machined-silver primary variant (gradient #f5f7f8→#bdc4c9, contrast 8.76:1). DESIGN.md §Components: "Leather (conversion only)… used once, at the sell/valuation CTA. Never a general button style." The site's single warm moment should live here and doesn't. Fix: add a `leather` button variant to ui.tsx (cognac-deep #b77949 field + cream #f3e5d4 text, cognac focus ring) and use it for this submit. Command: /impeccable polish (or colorize).

**[P1] CTA label contradicts the prescribed brand voice.** submitLabel = "Skicka in bilen — få en värdering" (SellCarForm.tsx:19). PRODUCT.md prescribes "Få en gratis värdering", not "Skicka"; "Skicka in bilen" is transactional and slightly odd (you're not sending the car). Fix: "Få en gratis värdering" / "Få min värdering — utan förpliktelser." Command: /impeccable clarify.

**[P2] Photo dropzone over-promises and silently drops the bytes.** Hint (SellCarForm.tsx:126) says photos give "en snabbare och mer träffsäker värdering", but only photoNames reach the server (no storage backend; FileField.tsx:8-13). The owner believes they sent images; the dealer gets filenames like IMG_2381.jpg — an honesty gap at the point of highest intent on a "every claim is real" site. Fix: until storage is wired, soften the copy ("nämn gärna att du har foton så hämtar vi dem när vi hörts av") or hide the field. Command: /impeccable clarify (or harden to wire real upload).

**[P2] Two muted texts fail WCAG AA contrast.** Input placeholder fog #7f888e = 3.80:1, dropzone "JPG eller PNG" hint = 4.02:1 (both < 4.5:1). Labels are fine (14:1); placeholders/hints are the miss. Fix: bump placeholder + the format hint one step toward ink (e.g. muted #9aa2a8 gives ~5.8:1). Command: /impeccable audit (or polish).

**[P2] Inline validation errors aren't announced to screen readers.** The 6 error <p>s carry aria-describedby but no role="alert"/aria-live, so a SR user only reaches them via the focus move, not an announcement. Fix: add role="alert" (or an aria-live region) to the field error text. Command: /impeccable harden.

## Persona Red Flags
- Jordan (non-technical owner): 6 required fields before any hint of a valuation number; must hand-type brand/model/year that the reg number (which copy calls "räcker långt") already implies. Real completion friction.
- Casey (distracted, one-handed mobile): form ~1639px / 2 viewports, all single-column; long scroll to a non-sticky submit. Reachable but a long journey; phone fallback (the bail-out) doesn't look tappable — muted #9aa2a8, no underline.
- Riley (stress-tester): double-submit guarded; empty submit clean. But year passes on length only, so "abcd"/"20" validate; fuel/gearbox cast `as never` in buildLead.

## Minor Observations
- Phone tel: link reads like body text (muted, no underline) in both "Bra att veta" and the success panel — give it the underline or the one cognac treatment.
- year validates length only (SellCarForm.tsx:26) — add a numeric/range check.
- fuel/gearbox cast `as never` in buildLead (:40-41) — type the union.
- Success panel offers no return/"skicka en till" path.
- ProcessSteps number badges use backdrop-blur-sm + bg-white/10 — borderline glassmorphism but subtle and localized; acceptable.

## Questions to Consider
1. If "registreringsnumret räcker långt," why is reg optional and unused while four fields are required and hand-keyed? Would a reg-plus-phone minimal path convert far better?
2. This is the one page the design system reserves its single leather-cognac moment for — and it's spending it on a silver button and a "Skicka in" label. If the highest-intent CTA on the site isn't the warm moment, where is that moment ever earned?
3. The dropzone invites photos it can't receive. On a site whose first principle is "every claim is real," is a field that looks complete but drops the user's contribution more honest, or less, than not shipping it?
