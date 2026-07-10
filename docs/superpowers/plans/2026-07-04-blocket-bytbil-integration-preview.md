# Blocket & Bytbil Integration Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a safe, interactive Swedish preview of a future Blocket/Bytbil inventory connection without external calls or changes to the existing inventory.

**Architecture:** Add one isolated App Router page and one small client component for deterministic mock interactions. Keep all real inventory, APIs, and navigation unchanged. Protect the safety contract with source tests and document the production path separately.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

## Global Constraints

- Do not scrape Blocket or Bytbil.
- Do not use unofficial APIs or add credentials.
- Do not claim real import or publishing capability.
- Do not change `/bilar`, its data, or the existing lead API.
- All prototype data and interactions must be labeled as mock-only.
- Use Swedish UI and the existing gray/silver theme.

---

### Task 1: Lock the preview contract

**Files:**
- Create: `tests/integration-preview.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run test:integration-preview`, a deterministic source contract.

- [ ] Write tests for the route title, warning, three modes and statuses, dashboard labels, complete owner checklist, recommendation, both flows, and absence of external network code.
- [ ] Add the test script.
- [ ] Run the test and verify it fails because the preview files do not exist.

### Task 2: Build the isolated preview page

**Files:**
- Create: `src/app/admin-preview/integrationer/page.tsx`
- Create: `src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx`

**Interfaces:**
- `IntegrationPreviewClient` consumes no props and owns browser-local demo state only.
- The page exports metadata and renders the full Swedish prototype.

- [ ] Implement the route shell, preview banner, mode cards, dashboard, owner checklist, recommendation, and flow diagrams.
- [ ] Implement local-only import simulation, sample-car toggle, and requirements focus action.
- [ ] Run the focused test until it passes.

### Task 3: Document the production boundary

**Files:**
- Create: `docs/BLOCKET_BYTBIL_INTEGRATION_PREVIEW.md`

**Interfaces:**
- Produces: owner/developer handoff documentation covering the mock boundary and official integration path.

- [ ] Document what the preview demonstrates, mock-only elements, API requirements, scraping risks, production path, owner questions, and future options.
- [ ] Re-run the focused test and lint.

### Task 4: Browser and production verification

**Files:**
- Modify only files implicated by verification findings.

**Interfaces:**
- Produces: verified route without regressions to the public inventory.

- [ ] Start the real website on a separate localhost port.
- [ ] Verify all three mock actions, responsive presentation, keyboard focus, and no browser warnings/errors.
- [ ] Verify `/bilar` still renders.
- [ ] Run `npm run test:integration-preview`, `npm run lint`, and `npm run build`.

### Task 5: Add the presentation-only Admin tab

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `tests/integration-preview.test.mjs`

**Interfaces:**
- Produces: desktop and mobile Admin navigation linking to `/admin-preview/integrationer` without changing the shared footer navigation or sitemap.

- [ ] Add a failing source contract for the Admin route, Preview label, active route prefix, and footer/sitemap exclusion.
- [ ] Add the distinct Admin tab to desktop and mobile header navigation.
- [ ] Verify the active state, responsive fit, and destination in the browser.
- [ ] Re-run the focused tests, lint, and production build.
