"use client";

import { useState } from "react";

const mockCars = [
  {
    make: "Volvo",
    model: "XC60 T6 Recharge",
    year: "2021",
    price: "419 900 kr",
    source: "Blocket",
    reference: "BLK-1042",
    status: "Redo att visas",
    warning: false,
  },
  {
    make: "Volkswagen",
    model: "Passat Alltrack",
    year: "2020",
    price: "289 900 kr",
    source: "Bytbil",
    reference: "BYT-7781",
    status: "Redo att visas",
    warning: false,
  },
  {
    make: "Audi",
    model: "A4 Avant 40 TDI",
    year: "2019",
    price: "259 900 kr",
    source: "Blocket",
    reference: "BLK-1088",
    status: "Behöver granskas",
    warning: true,
  },
] as const;

const primaryButton =
  "btn-machined inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-[#20252a] transition-[filter,transform,box-shadow] duration-200 hover:brightness-105 active:translate-y-px";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.035] px-5 text-sm font-semibold text-pearl transition-[background-color,border-color,color,transform] duration-200 hover:border-white/40 hover:bg-white/[0.07] active:translate-y-px";
const textButton =
  "inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-silver transition-colors duration-200 hover:text-pearl";

export function IntegrationPreviewClient() {
  const [importTested, setImportTested] = useState(false);
  const [showCars, setShowCars] = useState(false);

  function testImport() {
    setImportTested(true);
  }

  function resetDemo() {
    setImportTested(false);
    setShowCars(false);
  }

  function showRequirements() {
    const target = document.getElementById("integrationskrav");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target?.focus();
    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      id="demo"
      aria-labelledby="mock-dashboard-title"
      className="scroll-mt-24 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <div>
          <p className="eyebrow text-silver">Demonstration</p>
          <h2
            id="mock-dashboard-title"
            className="mt-3 font-display text-3xl font-semibold text-pearl sm:text-4xl"
          >
            Prova ett framtida lagerflöde
          </h2>
        </div>
        <p className="max-w-2xl text-muted lg:justify-self-end">
          Kör en lokal testsynk, visa hur bilarna kan se ut och samla sedan
          underlaget som krävs för en riktig koppling.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#171c20] shadow-[0_28px_60px_-32px_rgba(0,0,0,0.85)]">
        <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.025] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${importTested ? "bg-trust shadow-[0_0_14px_rgba(63,152,87,0.75)]" : "bg-cognac shadow-[0_0_14px_rgba(201,138,92,0.55)]"}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-pearl">
                {importTested ? "Simulerad import klar" : "Redo för testimport"}
              </p>
              <p className="text-xs text-muted">
                {importTested
                  ? "18 poster lästa · 2 behöver granskas"
                  : "Ingen extern anslutning · endast mockdata"}
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cognac/35 bg-cognac/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#e8b58f]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-cognac"
              aria-hidden="true"
            />
            Mockdata
          </span>
        </div>

        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Testpanel
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-pearl">
              Importera utan att röra det riktiga lagret
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Testet läser en fast uppsättning provdata i webbläsaren. Inget
              sparas och inga marknadsplatser kontaktas.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={testImport} className={primaryButton}>
                {importTested ? "Kör testimport igen" : "Testa import"}
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCars((current) => !current)}
                className={secondaryButton}
                aria-expanded={showCars}
                aria-controls="importerade-bilar"
              >
                {showCars
                  ? "Dölj importerade bilar"
                  : "Förhandsvisa importerade bilar"}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
              <button
                type="button"
                onClick={showRequirements}
                className={textButton}
              >
                Visa krav för riktig integration
                <span aria-hidden="true" className="ml-2">
                  ↓
                </span>
              </button>
              {(importTested || showCars) && (
                <button
                  type="button"
                  onClick={resetDemo}
                  className={`${textButton} text-muted hover:text-pearl`}
                >
                  Återställ demo
                </button>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              <Metric
                label="Senaste synk"
                value={importTested ? "Nyss" : "Inte körd"}
                detail={importTested ? "Simulerad import klar" : "Väntar på test"}
              />
              <Metric
                label="Antal importerade bilar"
                value={importTested ? "18" : "0"}
                detail="Mockade lagerposter"
              />
              <Metric
                label="Antal publicerade annonser"
                value="0"
                detail="Ej tillgängligt utan API"
                locked
              />
              <Metric
                label="Antal fel/varningar"
                value={importTested ? "2" : "0"}
                detail={
                  importTested
                    ? "Bildtext saknas · pris ska kontrolleras"
                    : "Inga tester körda"
                }
                warning={importTested}
              />
            </div>
          </div>
        </div>

        <div aria-live="polite">
          {importTested && (
            <div
              role="status"
              className="flex items-start gap-3 border-t border-trust/20 bg-trust/[0.075] px-5 py-4 text-sm text-[#a9d9b5] sm:px-6"
            >
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-trust"
                aria-hidden="true"
              />
              <p>
                <strong className="font-semibold text-[#c7ebcf]">
                  Simulerad import klar.
                </strong>{" "}
                18 mockposter lästes in, 16 godkändes direkt och 2 behöver
                granskas.
              </p>
            </div>
          )}
        </div>
      </div>

      <div id="importerade-bilar" hidden={!showCars} className="mt-10">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold text-pearl">
              Exempel på importerade bilar
            </h3>
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-cognac">
            Endast mockdata
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mockCars.map((car) => (
            <article
              key={`${car.make}-${car.model}`}
              className="surface-carbon overflow-hidden rounded-2xl"
            >
              <div className="relative flex aspect-[16/7.5] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_100%,rgba(201,138,92,0.16),transparent_54%),linear-gradient(145deg,#363c42,#171b1f)]">
                <CarSilhouette />
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-silver backdrop-blur-sm">
                  Mockbil
                </span>
                <span
                  className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold ${
                    car.warning
                      ? "border-cognac/35 bg-[#2d2119]/85 text-[#e8b58f]"
                      : "border-trust/30 bg-[#14251a]/85 text-[#a9d9b5]"
                  }`}
                >
                  {car.status}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {car.year} · Förhandsvisning
                </p>
                <h4 className="mt-2 font-display text-lg font-semibold text-pearl">
                  {car.make} {car.model}
                </h4>
                <p className="nums mt-4 text-xl font-semibold text-pearl">
                  {car.price}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs text-muted">
                  <span>{car.source}</span>
                  <span translate="no" className="nums">
                    {car.reference}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  detail,
  locked = false,
  warning = false,
}: {
  label: string;
  value: string;
  detail: string;
  locked?: boolean;
  warning?: boolean;
}) {
  return (
    <article className="min-h-36 bg-[#11161a] p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted">{label}</p>
        {locked && <LockIcon />}
      </div>
      <p
        className={`nums mt-5 font-display text-3xl font-semibold ${warning ? "text-[#e8b58f]" : "text-pearl"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-fog">{detail}</p>
    </article>
  );
}

function LockIcon() {
  return (
    <svg
      aria-label="Kräver API-access"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CarSilhouette() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 86"
      className="w-3/4 max-w-56 text-silver/55"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 59h160l-7-21-32-8-19-17H78L57 34l-20 5-7 20Z" />
      <path d="M70 32h87M83 14l-6 18m53-18 18 18" />
      <circle cx="65" cy="61" r="13" fill="#1a1f23" />
      <circle cx="164" cy="61" r="13" fill="#1a1f23" />
      <path d="M18 59h184" opacity=".45" />
    </svg>
  );
}
