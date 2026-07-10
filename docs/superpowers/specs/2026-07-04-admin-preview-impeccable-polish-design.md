# Admin Preview Presentation Polish Design

## Objective

Turn `/admin-preview/integrationer` into a confident owner-facing presentation for Wednesday while preserving its mock-only status and the existing Svenljunga Bilcenter material system.

## Experience Direction

The page should feel like a guided product conversation, not a dense SaaS dashboard. The visual rhythm moves through five deliberate beats: executive overview, phased roadmap, interactive demonstration, technical flow, and decision checklist. Cognac remains a restrained guide color; silver, graphite, and carbon carry the interface.

## Page Hierarchy

1. **Executive masthead** — page title, short business outcome, clear preview disclaimer, three safety/status chips, and a “Starta demonstrationen” anchor.
2. **Presenter guide** — a compact three-step card explaining exactly how to demonstrate the mock to the owner.
3. **Phased roadmap** — one connected Phase 1 → Phase 2 → Phase 3 composition labeled “Nu”, “Nästa”, and “Senare”, replacing three unrelated cards.
4. **Demo command surface** — one cohesive control panel with the primary mock-import action, quieter secondary actions, a clear sync state, and grouped metrics.
5. **Imported-car preview** — realistic but unmistakably mock vehicle records with source identifiers and validation state.
6. **Technical flows** — Swedish labels throughout: “Synkmotor”, “Hemsidans lager”, “Publik bilsida”, “Datakontroll”, “Officiellt API”, and “Publicerade annonser”.
7. **Recommendation and owner input** — recommendation first, then requirements grouped into account, technical, and decision categories.

## Interaction and Accessibility

- All mock interactions remain browser-local and deterministic.
- “Starta demonstrationen” deep-links to the demo surface.
- Programmatic requirements navigation moves focus and respects `prefers-reduced-motion`.
- Dynamic import results use polite live regions.
- Buttons list transitioned properties explicitly; no `transition-all` in touched interface files.
- Focus targets retain a visible focus treatment.
- The page remains responsive at 375px and 1440px with no horizontal overflow.

## Safety Boundaries

- Keep the exact preview/API-access warning visible above the fold.
- Label mock metrics, sample vehicles, and sync results as mock data.
- Never call an external API, scrape a marketplace, persist credentials, or alter `/bilar`.
- Keep “published ads” at zero and explain why.
- Retain `robots: { index: false, follow: false }` and exclude the route from the sitemap.

## Verification

Source-contract tests verify the approved hierarchy, Swedish flow terminology, safety copy, explicit transition policy, reduced-motion behavior, and public-inventory isolation. Browser QA verifies the guided demo actions, focus behavior, responsive layout, and clean console. Lint and production build complete the gate.

