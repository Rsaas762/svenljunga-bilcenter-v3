# Blocket & Bytbil Integration Preview Design

## Purpose

Create an owner-friendly Swedish prototype at `/admin-preview/integrationer` that explains a possible future Blocket/Bytbil inventory connection without implying that any real integration exists.

## Architecture

The preview is an isolated App Router page. Static explanatory content stays in the server page while a focused client component owns the three local-only demo actions. No existing inventory component, route, API handler, or data source changes.

The mock import is deterministic and browser-local: pressing “Testa import” changes the displayed mock metrics and status text but performs no network request and writes no persistent data. “Förhandsvisa importerade bilar” toggles three clearly labeled sample cars. “Visa krav för riktig integration” moves focus to the owner-requirements section.

## Visual Direction

Use the current dark gray, smoked-silver, carbon, and machined-metal design language. The page remains calm and editorial rather than resembling a dense SaaS dashboard. Status pills distinguish what can be built now from capabilities that require official API access.

The main header includes a dedicated **Admin** tab on desktop and mobile. A restrained cognac dot and visible **Preview** label distinguish it from production navigation, and the tab is active for every `/admin-preview/*` route. The link is intentionally excluded from the footer and sitemap.

## Content and Safety Boundaries

- Show all three requested modes with exact Swedish statuses.
- Display the preview warning prominently at the top and a persistent “Mockdata” label around simulated metrics.
- Explain both import and future publishing flows using responsive cards and arrows.
- Include the complete owner checklist and recommend Blocket/Bytbil as the initial source of truth.
- Do not scrape, call external services, add credentials, persist data, or modify the public inventory.
- Never present mock counts or actions as live account information.

## Verification

Source-contract tests verify the route copy, modes, statuses, checklist, flow labels, no external requests, and preservation of the public inventory route. Browser checks cover the three local interactions, responsive layout, console output, and route accessibility. Lint and a production build complete the verification.
