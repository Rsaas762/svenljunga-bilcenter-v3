---
target: bilar/[slug]
total_score: 34
p0_count: 0
p1_count: 3
timestamp: 2026-07-04T23-17-26Z
slug: src-app-bilar-slug-page-tsx
---
Method: dual-agent (A: design/conversion review + live browser · B: deterministic detector + measured browser evidence)

# Critique — /bilar/[slug] (car detail — the buy-conversion surface)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Honest sending/sent/error states; POST 200. |
| 2 | Match System / Real World | 4 | Native dealer Swedish, sv-SE price/"mil". |
| 3 | User Control and Freedom | 3 | Breadcrumb back; only 3 static photos, no lightbox/zoom. |
| 4 | Consistency and Standards | 4 | Shared ui.tsx fields/buttons; matches sitewide. |
| 5 | Error Prevention | 3 | Client validation; loose phone regex. |
| 6 | Recognition Rather Than Recall | 3 | Success names the car; but price/CTA not co-visible on mobile. |
| 7 | Flexibility and Efficiency | 2 | No sticky mobile CTA, no tel: in main content, no anchor jump. |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely restrained, premium, uncluttered. |
| 9 | Error Recovery | 4 | Inline role=alert, focus to first invalid, cognac-visible. |
| 10 | Help and Documentation | 3 | Finance/inbyte note helpful; no hours/visit cue on the decision surface. |
| **Total** | | **34/40** | **Strong (buy-conversion drags it below excellent)** |

## Anti-Patterns Verdict
PASS — clean and restrained. No eyebrow-spam, no 01/02/03, no gradient text, no glassmorphism, no side-stripe, no invented stats/ratings. The spec block is an honest <dl> definition list, NOT a row of identical icon-cards (real trap avoided). Features are a plain bulleted list, not "feature cards." One machined-silver CTA; leather correctly withheld (that's reserved for the sell CTA). Cognac ≈3% (focus ring + required asterisk). Real Blocket data/photos/prices; the Blocket outbound link is de-emphasised and rel="noopener noreferrer" target=_blank.
Deterministic scan: detect.mjs exit 0, ZERO findings; no console/network errors; all 3 car photos load via next/image (blocketcdn); POST /api/leads 200; bogus slug 404s; a second slug renders consistently; no 375px overflow. But B measured: spec LABELS contrast 4.29:1 at 12px (< 4.5 AA fail; A independently ~3.4:1), and the price uses font-variant-numeric:normal + white-space:normal (not tabular, not nowrap) — protected only by sv-SE nbsp, against the DESIGN.md "prices tabular + never wrap" rule.

## Overall Impression
A restrained, premium, honest detail page that's strong on trust and form UX — but it under-serves its ONE job on the audience that matters most. This is the buy-conversion surface and the audience is mostly mobile, yet on mobile the price sits ~1.5 screens down and the "Jag är intresserad" CTA ~3 screens down, with the sticky price rail existing only at >=1024px. The biggest opportunity is making the price + contact reachable at a glance on a phone. Two smaller but real issues: sold cars keep a fully live buy page, and the strongest trust facts hide in prose.

## What's Working
1. Success-state personalisation + phone fallback (LeadFormShell.tsx:76) — names the exact car ("…om Volvo V90 2020…") and gives a working tel: link. Textbook peak-end reassurance.
2. Honest spec <dl>, not icon-card slop (page.tsx:132) with excellent value contrast (price/values #eff2f3 on #22272c ≈ 13.4:1).
3. Accessible form — cognac 2px focus ring (#c98a5c), inline role=alert errors, autoComplete on all fields, 58px submit / 51px inputs (≥44px).

## Priority Issues
**[P1] Mobile has no above-the-fold price or "intresserad" CTA, and no sticky/anchor.** The sticky price+CTA rail exists only at lg: >=1024px (page.tsx:119); on mobile the price is ~1.5 screens down and the submit ~3 screens down (page 3343px tall). The primary audience must hunt for the two most decision-critical things on the whole page. Fix: for <lg, add a sticky bottom bar (compact price + "Intresserad" anchoring to #intresse + a phone icon), OR surface a compact price + primary CTA directly under the title above the gallery. Command: /impeccable adapt (or layout).

**[P1] Sold cars keep a fully live, indexable buy page with a working interest form.** [slug]/page.tsx never reads car.inStock (only the listing grid filters on it); generateStaticParams builds every car. A sold car shows a price + live "Jag är intresserad" form with no "Såld/Reserverad" state — a trust hit, wasted leads, and an indexable dead page. Fix: when !car.inStock, show a "Såld" badge, swap the form for a "Hitta min bil / bevaka liknande" CTA, and set robots:noindex. Command: /impeccable harden.

**[P1] No tappable tel: on the decision surface before submit.** Zero tel: links in <main>; the phone in the finance note (page.tsx:161) is plain text. A hesitant mobile buyer who'd rather call ("is it still available?") has nothing tappable until AFTER submitting. Fix: make {site.phone} a tel: link (site.phoneHref) in the finance note and/or add a "Ring oss" outline button beside the form CTA. Command: /impeccable clarify (or harden).

**[P2] Strongest trust facts are buried in prose.** "Besiktad till 2027-01-31" and "Komplett servicebok" — the #1 used-car trust cues — sit mid-sentence in a keyword-stuffed Blocket description (cars.ts:36), not as scannable spec fields. Fix: add a "Besiktigad t.o.m." (and optionally "Servicebok") row to the spec <dl>. A single structured inspection-date row next to the price materially raises trust. Command: /impeccable layout (data + a spec row).

**[P2] Spec labels fail AA contrast; price isn't tabular/no-wrap.** Spec labels (text-silver/60, 12px uppercase) = 4.29:1 (< 4.5). Price has font-variant-numeric:normal and white-space:normal. Fix: bump labels to /75 (~5:1+); add `nums whitespace-nowrap` to the price per the design rule. Command: /impeccable audit (or polish).

## Persona Red Flags
- Jordan (first-timer): lands on a gorgeous photo, scrolls 1.5 screens to find the price, 3 to find the contact; wants to just call to ask "still available?" but the phone isn't tappable pre-submit; only reassured after committing.
- Casey (distracted mobile): nothing pinned — no persistent price or CTA to catch one-handed; if interrupted, must re-find both on return.
- Riley (stress-tester): SOLD car → full live page + working form, no "Såld" badge (P1). Fiat 500 → "Utrustning i urval" with a single bullet duplicating the variant (looks empty/broken); variant string "…Farthållare,Ny kamrem" missing a space. Long V90 variant wraps to 2 lines, no overflow (good). Empty submit clean.

## Minor Observations
- Blocket outbound link is correctly de-emphasised (silver/70, 12px, underlined, rel=noopener) so it doesn't feel like a marketplace — but it still hands your hottest lead to the one place competitors' cars are one tap away. Minor accepted leak.
- Gallery is 1 hero + 2 static thumbnails, no lightbox/zoom on a high-value purchase — buyers can't inspect condition closely without leaving to Blocket.
- Description renders as a single run-on Blocket paragraph (no terminal period on the V90) — a light typographic cleanup would lift the premium feel.
- Breadcrumb + Blocket text links are ~16-17px tall (below 44px) — inline text-link targets, lower severity.
- next/image hygiene good (priority on hero only, thumbs lazy).
- Redundant "MÄRKE: Volvo" spec cell duplicates the H1 — 5 clean facts would read better (P3).

## Questions to Consider
1. If the price is the one number that decides everything, why does the mobile buyer scroll past three photos and a spec list to see it — and six sections to act on it?
2. You de-emphasised the Blocket link beautifully so it doesn't feel like a marketplace — so why keep sending your hottest lead to the one place competitors' cars are one tap away?
3. A used-car buyer's #1 question is "is it roadworthy and cared-for?" — the answer exists ("Besiktad till 2027", "servicebok"), so why is it hidden in a run-on sentence instead of a proud spec field beside the price?
