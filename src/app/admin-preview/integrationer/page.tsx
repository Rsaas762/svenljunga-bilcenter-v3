import type { Metadata } from "next";
import Link from "next/link";
import { IntegrationPreviewClient } from "./IntegrationPreviewClient";

export const metadata: Metadata = {
  title: "Blocket & Bytbil-koppling",
  description:
    "Förhandsvisning av en möjlig framtida lagerkoppling för Svenljunga Bilcenter.",
  robots: { index: false, follow: false },
};

const roadmap = [
  {
    number: "01",
    phase: "Nu",
    title: "Manuell lagerhantering",
    description:
      "Ägaren lägger till och uppdaterar bilar direkt i hemsidans admin.",
    status: "Kan byggas direkt",
    tone: "ready",
  },
  {
    number: "02",
    phase: "Nästa",
    title: "Import från Blocket/Bytbil",
    description:
      "Bilar som läggs upp på Blocket/Bytbil visas automatiskt på hemsidan.",
    status: "Kräver API eller partnerkoppling",
    tone: "next",
  },
  {
    number: "03",
    phase: "Senare",
    title: "Tvåvägssynk",
    description:
      "Bilar som läggs till på hemsidan kan också publiceras till Blocket/Bytbil.",
    status: "Kräver officiell publicerings-API och kontoåtkomst",
    tone: "locked",
  },
] as const;

const requirementGroups = [
  {
    number: "01",
    title: "Konto & avtal",
    items: [
      "Blocket företagskonto",
      "Information om nuvarande annonspaket",
      "Om de använder Bytbil",
    ],
  },
  {
    number: "02",
    title: "Teknik & åtkomst",
    items: [
      "Om de har API/export-access",
      "Kontaktperson hos Blocket/Bytbil eller integrationspartner",
      "Exempel på en befintlig annons",
    ],
  },
  {
    number: "03",
    title: "Beslut & ansvar",
    items: [
      "Beslut om källa: Blocket/Bytbil eller hemsidan ska vara huvudlager",
    ],
  },
] as const;

export default function IntegrationPreviewPage() {
  return (
    <div className="overflow-x-hidden bg-page">
      <section className="bg-titanium relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(circle_at_50%_36%,rgba(201,138,92,0.12),transparent_38%),linear-gradient(105deg,transparent,rgba(255,255,255,0.025))] lg:block"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <nav
            aria-label="Brödsmulor"
            className="mb-8 flex items-center gap-2 text-sm text-muted"
          >
            <Link href="/" className="transition-colors hover:text-pearl">
              Startsida
            </Link>
            <span aria-hidden="true">/</span>
            <span>Admin</span>
            <span aria-hidden="true">/</span>
            <span className="text-silver">Integrationer</span>
          </nav>

          <div
            className="rounded-2xl border border-cognac/35 bg-[#251b15]/80 px-4 py-3.5 shadow-card backdrop-blur-sm sm:px-5"
            role="note"
          >
            <div className="flex items-start gap-3">
              <PreviewIcon />
              <div className="min-w-0">
                <p className="font-semibold leading-snug text-[#f0cfb5]">
                  Förhandsvisning — riktig synk kräver API-access från Blocket/Bytbil eller integrationspartner.
                </p>
                <p className="mt-1 text-sm text-[#cba98e]">
                  Allt på sidan är Mockdata. Inga externa tjänster kontaktas.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-rule text-silver">
                Admin preview · Integrationer
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] text-pearl sm:text-5xl lg:text-[3.75rem]">
                Blocket & Bytbil-koppling
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver-mist">
                En tydlig väg från dagens manuella lager till automatisk import
                — och först därefter möjlig publicering åt andra hållet.
              </p>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Status">
                <StatusChip label="Mockdata" tone="warm" />
                <StatusChip label="Ingen extern anslutning" />
                <StatusChip label="API krävs för synk" />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#demo"
                  className="btn-machined inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-[#20252a] transition-[filter,transform,box-shadow] duration-200 hover:brightness-105 active:translate-y-px"
                >
                  Starta demonstrationen
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  href="#rekommendation"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.035] px-6 text-sm font-semibold text-pearl transition-[background-color,border-color,color] duration-200 hover:border-white/40 hover:bg-white/[0.07]"
                >
                  Se rekommenderad väg
                </a>
              </div>
            </div>

            <aside className="surface-plate overflow-hidden rounded-2xl">
              <div className="border-b border-white/10 bg-white/[0.025] px-5 py-4">
                <p className="eyebrow text-silver">Så visar du sidan</p>
              </div>
              <ol className="divide-y divide-white/10 px-5">
                <PresenterStep
                  number="01"
                  title="Testa en import"
                  body="Visa hur lagret och varningarna uppdateras."
                />
                <PresenterStep
                  number="02"
                  title="Öppna provbilarna"
                  body="Förklara vilken information som kan följa med."
                />
                <PresenterStep
                  number="03"
                  title="Samla besluten"
                  body="Gå igenom vad som behövs för riktig åtkomst."
                />
              </ol>
              <p className="border-t border-white/10 px-5 py-3 text-xs text-fog">
                Ingen riktig koppling är aktiverad.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="roadmap-title"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <h2
              id="roadmap-title"
              className="mt-3 font-display text-3xl font-semibold text-pearl sm:text-4xl"
            >
              En trygg väg från nu till senare
            </h2>
          </div>
          <p className="max-w-2xl text-muted lg:justify-self-end">
            Vi börjar där nyttan är tydlig och risken låg. Varje fas får en
            egen ansvarig datakälla och ett tydligt godkännande innan nästa.
          </p>
        </div>

        <div className="surface-plate-strong relative mt-10 overflow-hidden rounded-3xl p-3 sm:p-4 lg:p-5">
          <div
            aria-hidden="true"
            className="absolute left-[17%] right-[17%] top-[4.65rem] hidden h-px bg-[linear-gradient(90deg,rgba(63,152,87,0.65),rgba(201,138,92,0.55),rgba(255,255,255,0.12))] lg:block"
          />
          <div className="relative grid gap-3 lg:grid-cols-3">
            {roadmap.map((mode) => (
              <article
                key={mode.number}
                className={`flex min-h-64 flex-col rounded-2xl border p-5 sm:p-6 ${
                  mode.tone === "ready"
                    ? "border-trust/30 bg-trust/[0.055]"
                    : mode.tone === "next"
                      ? "border-cognac/30 bg-cognac/[0.045]"
                      : "border-white/10 bg-black/10"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-semibold uppercase tracking-[0.15em] ${
                      mode.tone === "ready"
                        ? "border-trust/35 bg-trust/10 text-[#a9d9b5]"
                        : mode.tone === "next"
                          ? "border-cognac/35 bg-cognac/10 text-[#e8b58f]"
                          : "border-white/10 bg-white/[0.03] text-silver"
                    }`}
                  >
                    {mode.phase}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold text-pearl">
                  {mode.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {mode.description}
                </p>
                <p
                  className={`mt-auto border-t pt-5 text-sm font-semibold ${
                    mode.tone === "ready"
                      ? "border-trust/20 text-[#a9d9b5]"
                      : "border-white/10 text-[#e8b58f]"
                  }`}
                >
                  {mode.status}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 bg-carbon">
        <IntegrationPreviewClient />
      </div>

      <section
        aria-labelledby="flow-title"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="max-w-3xl">
          <h2
            id="flow-title"
            className="mt-3 font-display text-3xl font-semibold text-pearl sm:text-4xl"
          >
            Samma lager, tydligt ansvar
          </h2>
          <p className="mt-4 text-muted">
            Första flödet läser in data. Det andra skriver ut data och kräver
            därför betydligt mer åtkomst, kontroll och ansvar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          <Flow
            title="Rekommenderad första fas"
            badge="Import · läsflöde"
            steps={[
              "Blocket/Bytbil",
              "Synkmotor",
              "Hemsidans lager",
              "Publik bilsida",
            ]}
          />
          <Flow
            title="Möjlig senare fas"
            badge="Publicering · skrivflöde"
            steps={[
              "Hemsidans admin",
              "Datakontroll",
              "Officiellt API",
              "Publicerade annonser",
            ]}
            muted
          />
        </div>
      </section>

      <section
        id="rekommendation"
        aria-labelledby="recommendation-title"
        className="scroll-mt-28 border-y border-white/10 bg-gunmetal"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-20">
          <div className="lg:pr-8">
            <p className="eyebrow text-silver">Rekommenderad lösning</p>
            <h2
              id="recommendation-title"
              className="mt-3 font-display text-3xl font-semibold text-pearl sm:text-4xl"
            >
              En huvudkälla först. Mindre risk, enklare vardag.
            </h2>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-cognac/25 bg-[#1b2025] p-6 shadow-card sm:p-8">
            <p className="text-xl font-semibold text-pearl">
              Blocket/Bytbil bör vara huvudlager i första fasen.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Hemsidan importerar och visar lagret i ett snabbt,
              varumärkesanpassat gränssnitt. Personalen slipper
              dubbelregistrering och risken för olika pris eller status minskar.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <RecommendationStep number="1" label="Bekräfta åtkomst" />
              <RecommendationStep number="2" label="Pilotera import" />
              <RecommendationStep number="3" label="Utvärdera publicering" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="integrationskrav"
        tabIndex={-1}
        aria-labelledby="requirements-title"
        className="scroll-mt-28 rounded-2xl focus-visible:ring-2 focus-visible:ring-cognac/70 focus-visible:ring-offset-4 focus-visible:ring-offset-page"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2
                id="requirements-title"
                className="mt-3 font-display text-3xl font-semibold text-pearl sm:text-4xl"
              >
                Vad behöver vi från Svenljunga Bilcenter?
              </h2>
              <p className="mt-4 text-muted">
                Svaren avgör vad som är möjligt, vem som kan ge officiell
                åtkomst och vilket system som ska äga lagret.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {requirementGroups.map((group) => (
                <article
                  key={group.title}
                  className="surface-plate rounded-2xl p-5"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-display font-semibold text-pearl">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-2"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cognac"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#101418]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-display text-lg font-semibold text-pearl">
              Förhandsvisningen påverkar inte billagret.
            </p>
            <p className="mt-1 text-sm text-muted">
              Ingen import, publicering eller extern anslutning är aktiv.
            </p>
          </div>
          <Link
            href="/bilar"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-pearl transition-[background-color,border-color,color] duration-200 hover:border-white/40 hover:bg-white/[0.06]"
          >
            Öppna nuvarande billager
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatusChip({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "warm";
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-xs font-semibold ${
        tone === "warm"
          ? "border-cognac/35 bg-cognac/10 text-[#e8b58f]"
          : "border-white/15 bg-white/[0.035] text-silver"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === "warm" ? "bg-cognac" : "bg-silver/45"}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function PresenterStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4 py-4">
      <span className="nums mt-0.5 text-xs font-semibold text-cognac">
        {number}
      </span>
      <div>
        <p className="text-sm font-semibold text-pearl">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
      </div>
    </li>
  );
}

function Flow({
  title,
  badge,
  steps,
  muted = false,
}: {
  title: string;
  badge: string;
  steps: readonly string[];
  muted?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-5 sm:p-6 ${
        muted
          ? "border-white/10 bg-white/[0.02]"
          : "border-trust/20 bg-trust/[0.035]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-pearl">
          {title}
        </h3>
        <span
          className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
            muted
              ? "border-white/10 text-muted"
              : "border-trust/30 bg-trust/10 text-[#9ed1aa]"
          }`}
        >
          {badge}
        </span>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch">
        {steps.map((step, index) => (
          <div key={step} className="contents">
            <div
              className={`flex min-h-20 items-center justify-center rounded-xl border px-3 text-center text-sm font-semibold ${
                muted
                  ? "border-white/10 bg-white/[0.025] text-silver-mist"
                  : "border-white/15 bg-white/[0.045] text-pearl"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className="flex items-center justify-center text-base text-fog"
                aria-hidden="true"
              >
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function RecommendationStep({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <span className="nums text-xs font-semibold text-cognac">{number}</span>
      <p className="mt-2 text-sm font-medium text-ink-2">{label}</p>
    </div>
  );
}

function PreviewIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-cognac"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 2.8 19a1.4 1.4 0 0 0 1.2 2h16a1.4 1.4 0 0 0 1.2-2L12 3Z" />
      <path d="M12 8v6m0 3h.01" />
    </svg>
  );
}
