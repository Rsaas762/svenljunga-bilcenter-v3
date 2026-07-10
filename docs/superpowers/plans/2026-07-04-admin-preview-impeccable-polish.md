# Admin Preview Presentation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the integration preview into a guided, owner-ready Wednesday presentation without adding real integration behavior.

**Architecture:** Preserve the isolated App Router route and its local-only client state. Recompose the server page into an executive narrative and the client component into a cohesive demo command surface. Extend existing source-contract tests for hierarchy, safety, motion, and terminology.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner.

## Global Constraints

- No external marketplace calls, scraping, credentials, or persistence.
- No changes to public inventory data or `/bilar` behavior.
- Preserve the existing gray/silver/carbon design language and restrained cognac.
- Keep all simulated values and actions clearly labeled as mock data.
- Respect reduced motion and use explicit transition properties.

---

### Task 1: Lock the presentation contract

**Files:**
- Modify: `tests/integration-preview.test.mjs`

**Interfaces:**
- Produces: failing assertions for the owner presentation hierarchy and audit fixes.

- [ ] Add contract assertions for the demo anchor, presenter guide, phased roadmap, Swedish flow labels, reduced-motion handling, focus treatment, and explicit transitions.
- [ ] Run the focused test and verify it fails against the current page.

### Task 2: Recompose the server page

**Files:**
- Modify: `src/app/admin-preview/integrationer/page.tsx`

**Interfaces:**
- Consumes: `IntegrationPreviewClient`.
- Produces: executive masthead, presenter guide, phased roadmap, Swedish flows, recommendation, and grouped requirements.

- [ ] Implement the new page hierarchy while retaining every required status and checklist item.
- [ ] Keep `robots` exclusion and existing public-inventory link.

### Task 3: Refine the demo command surface

**Files:**
- Modify: `src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx`

**Interfaces:**
- Produces: local-only import demo, grouped metrics, sample vehicles, and accessible focus navigation.

- [ ] Replace the loose dashboard cards with one command surface.
- [ ] Add reduced-motion-aware section navigation and explicit button transitions.
- [ ] Preserve deterministic mock values and zero published ads.

### Task 4: Resolve shared audit findings

**Files:**
- Modify: `src/components/ui.tsx`
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Produces: unchanged visual behavior with explicit transitioned properties.

- [ ] Replace `transition-all` in touched shared primitives with specific transition properties.
- [ ] Run the focused tests and lint.

### Task 5: Verify and redeploy

**Files:**
- Modify only files implicated by verification findings.

**Interfaces:**
- Produces: responsive, verified local and Vercel preview builds.

- [ ] Verify 375px and 1440px layouts, mock actions, focus, and console output.
- [ ] Run focused tests, lint, and production build.
- [ ] Create a new Vercel preview deployment and report its access-protection state accurately.

