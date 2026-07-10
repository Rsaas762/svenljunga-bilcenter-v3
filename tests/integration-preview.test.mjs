import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("preview route clearly labels the integration as a preview", async () => {
  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  assert.match(page, /Blocket & Bytbil-koppling/);
  assert.match(
    page,
    /Förhandsvisning — riktig synk kräver API-access från Blocket\/Bytbil eller integrationspartner\./,
  );
  assert.match(page, /Mockdata/);
  assert.match(page, /Öppna nuvarande billager/);
});

test("all three integration modes use the approved status language", async () => {
  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  for (const copy of [
    "Manuell lagerhantering",
    "Kan byggas direkt",
    "Import från Blocket/Bytbil",
    "Kräver API eller partnerkoppling",
    "Tvåvägssynk",
    "Kräver officiell publicerings-API och kontoåtkomst",
  ]) {
    assert.match(page, new RegExp(copy));
  }
});

test("the mock dashboard and owner checklist cover the requested decisions", async () => {
  const client = await read(
    "src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx",
  );
  for (const label of [
    "Senaste synk",
    "Antal importerade bilar",
    "Antal publicerade annonser",
    "Antal fel/varningar",
    "Testa import",
    "Förhandsvisa importerade bilar",
    "Visa krav för riktig integration",
  ]) {
    assert.match(client, new RegExp(label));
  }

  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  for (const item of [
    "Blocket företagskonto",
    "Information om nuvarande annonspaket",
    "Om de använder Bytbil",
    "Om de har API/export-access",
    "Kontaktperson hos Blocket/Bytbil eller integrationspartner",
    "Exempel på en befintlig annons",
    "Beslut om källa: Blocket/Bytbil eller hemsidan ska vara huvudlager",
  ]) {
    assert.match(page, new RegExp(item));
  }
});

test("both technical flows use owner-friendly Swedish labels", async () => {
  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  for (const step of [
    "Synkmotor",
    "Hemsidans lager",
    "Publik bilsida",
    "Hemsidans admin",
    "Datakontroll",
    "Officiellt API",
    "Publicerade annonser",
  ]) {
    assert.match(page, new RegExp(step));
  }
  assert.match(page, /Blocket\/Bytbil bör vara huvudlager i första fasen/);
});

test("page guides the owner through a phased presentation", async () => {
  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  for (const copy of [
    "Starta demonstrationen",
    "Så visar du sidan",
    "Nu",
    "Nästa",
    "Senare",
    "Konto & avtal",
    "Teknik & åtkomst",
    "Beslut & ansvar",
  ]) {
    assert.match(page, new RegExp(copy));
  }
  assert.match(page, /href="#demo"/);
});

test("preview contains no external integration calls and preserves public inventory", async () => {
  const client = await read(
    "src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx",
  );
  assert.doesNotMatch(client, /fetch\s*\(|axios|https?:\/\//);
  await access(new URL("../src/app/bilar/page.tsx", import.meta.url));
});

test("requirements navigation moves focus before starting smooth scrolling", async () => {
  const client = await read(
    "src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx",
  );
  const focusAt = client.indexOf("target?.focus();");
  const scrollAt = client.indexOf("target?.scrollIntoView");
  assert.ok(focusAt >= 0, "requirements section should receive keyboard focus");
  assert.ok(scrollAt > focusAt, "focus should be set before smooth scrolling starts");
  assert.match(client, /prefers-reduced-motion/);
});

test("touched interface files avoid transition-all and retain visible focus", async () => {
  for (const path of [
    "src/app/admin-preview/integrationer/page.tsx",
    "src/app/admin-preview/integrationer/IntegrationPreviewClient.tsx",
    "src/components/Header.tsx",
    "src/components/ui.tsx",
  ]) {
    assert.doesNotMatch(await read(path), /transition-all/);
  }
  const page = await read("src/app/admin-preview/integrationer/page.tsx");
  assert.doesNotMatch(page, /outline-none/);
  assert.match(page, /focus-visible:ring/);
});

test("header exposes a clearly labeled Admin preview tab without public-index navigation", async () => {
  const header = await read("src/components/Header.tsx");
  assert.match(header, /\/admin-preview\/integrationer/);
  assert.match(header, />Admin</);
  assert.match(header, />Preview</);
  assert.match(header, /pathname\.startsWith\("\/admin-preview"\)/);

  const site = await read("src/lib/site.ts");
  assert.doesNotMatch(site, /Admin.*admin-preview/);

  const sitemap = await read("src/app/sitemap.ts");
  assert.doesNotMatch(sitemap, /admin-preview/);
});

test("documentation explains the mock and production boundaries", async () => {
  const doc = await read("docs/BLOCKET_BYTBIL_INTEGRATION_PREVIEW.md");
  for (const heading of [
    "Vad förhandsvisningen demonstrerar",
    "Vad som endast är mockdata",
    "Varför officiell API-access krävs",
    "Varför scraping inte rekommenderas",
    "Rekommenderad produktionsväg",
    "Frågor till ägaren",
    "Framtida implementationsalternativ",
  ]) {
    assert.match(doc, new RegExp(heading));
  }
});
