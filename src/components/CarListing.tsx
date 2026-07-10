"use client";

import { useEffect, useMemo, useState } from "react";
import type { Car } from "@/lib/types";
import { CarCard } from "./CarCard";
import { LinkButton } from "./ui";

type Sort = "nyast" | "pris-lag" | "pris-hog" | "mil-lag";

const PRICE_STEPS = [100000, 150000, 200000, 250000, 300000];
const sekFmt = new Intl.NumberFormat("sv-SE");

const selectCls =
  "w-full min-h-[44px] appearance-none rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-3 pr-9 text-sm text-ink transition-colors focus:border-cognac focus:outline-none focus:ring-2 focus:ring-cognac/30 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%239aa2a8%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22/%3E%3C/svg%3E')] bg-[position:right_0.9rem_center] bg-no-repeat";

export function CarListing({ cars }: { cars: Car[] }) {
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [sort, setSort] = useState<Sort>("nyast");
  // `hydrated` gates the URL-sync effect so it never wipes params before the
  // initial read has restored them from the URL.
  const [hydrated, setHydrated] = useState(false);

  // Restore filters from the URL on mount (deep-links, refresh, back).
  // Reading the URL (a browser API) once on mount is the legitimate exception to
  // set-state-in-effect: it syncs from an external system rather than deriving
  // state, and keeps /bilar statically rendered (no server searchParams).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    setBrand(p.get("marke") ?? "");
    setMaxPrice(p.get("pris") ?? "");
    setMinYear(p.get("ar") ?? "");
    setFuel(p.get("drivmedel") ?? "");
    setGearbox(p.get("vaxel") ?? "");
    const s = p.get("sort");
    if (s === "pris-lag" || s === "pris-hog" || s === "mil-lag") setSort(s);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Reflect the active filters back into the URL so a filtered view is
  // shareable, bookmarkable, and survives refresh. replaceState (not push)
  // keeps history clean — we don't want a back-entry per keystroke.
  useEffect(() => {
    if (!hydrated) return;
    const p = new URLSearchParams();
    if (brand) p.set("marke", brand);
    if (maxPrice) p.set("pris", maxPrice);
    if (minYear) p.set("ar", minYear);
    if (fuel) p.set("drivmedel", fuel);
    if (gearbox) p.set("vaxel", gearbox);
    if (sort !== "nyast") p.set("sort", sort);
    const qs = p.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname,
    );
  }, [hydrated, brand, maxPrice, minYear, fuel, gearbox, sort]);

  const brands = useMemo(
    () => [...new Set(cars.map((c) => c.brand))].sort(),
    [cars],
  );
  const fuels = useMemo(
    () => [...new Set(cars.map((c) => c.fuel))].sort(),
    [cars],
  );
  const years = useMemo(
    () => [...new Set(cars.map((c) => c.year))].sort((a, b) => a - b),
    [cars],
  );

  const filtered = useMemo(() => {
    const list = cars.filter(
      (c) =>
        (!brand || c.brand === brand) &&
        (!maxPrice || c.priceSek <= Number(maxPrice)) &&
        (!minYear || c.year >= Number(minYear)) &&
        (!fuel || c.fuel === fuel) &&
        (!gearbox || c.gearbox === gearbox),
    );
    switch (sort) {
      case "pris-lag":
        return list.sort((a, b) => a.priceSek - b.priceSek);
      case "pris-hog":
        return list.sort((a, b) => b.priceSek - a.priceSek);
      case "mil-lag":
        return list.sort((a, b) => a.mileageMil - b.mileageMil);
      default:
        return list.sort((a, b) => b.year - a.year);
    }
  }, [cars, brand, maxPrice, minYear, fuel, gearbox, sort]);

  const hasFilters = Boolean(brand || maxPrice || minYear || fuel || gearbox);

  function clearFilters() {
    setBrand("");
    setMaxPrice("");
    setMinYear("");
    setFuel("");
    setGearbox("");
  }

  return (
    <div>
      {/* Filter bar — five narrowing filters (Sortera lives by the result count) */}
      <div className="surface-plate rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <label htmlFor="filter-marke" className="mb-1 block text-xs font-medium text-muted">
              Märke
            </label>
            <select
              id="filter-marke"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={selectCls}
            >
              <option value="">Alla märken</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-pris" className="mb-1 block text-xs font-medium text-muted">
              Pris
            </label>
            <select
              id="filter-pris"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={selectCls}
            >
              <option value="">Alla priser</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  Max {sekFmt.format(p)} kr
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-ar" className="mb-1 block text-xs font-medium text-muted">
              Årsmodell
            </label>
            <select
              id="filter-ar"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className={selectCls}
            >
              <option value="">Alla år</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y} eller nyare
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-drivmedel" className="mb-1 block text-xs font-medium text-muted">
              Drivmedel
            </label>
            <select
              id="filter-drivmedel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className={selectCls}
            >
              <option value="">Alla</option>
              {fuels.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-vaxellada" className="mb-1 block text-xs font-medium text-muted">
              Växellåda
            </label>
            <select
              id="filter-vaxellada"
              value={gearbox}
              onChange={(e) => setGearbox(e.target.value)}
              className={selectCls}
            >
              <option value="">Alla</option>
              <option value="Automat">Automat</option>
              <option value="Manuell">Manuell</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trust cue — bring the "genomgången, en riktig människa" promise to where buyers decide */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-cognac)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Alla bilar genomgångna innan försäljning
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="pulse-live h-1.5 w-1.5 rounded-full bg-trust" />
          Svar av en människa, inte en växel
        </span>
      </div>

      {/* Result count + sort + clear */}
      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" role="status">
          {filtered.length === 1
            ? "1 bil matchar"
            : `${filtered.length} bilar matchar`}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="sortering" className="text-xs font-medium text-muted">
            Sortera
          </label>
          <select
            id="sortering"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className={`${selectCls} w-auto min-w-[10rem]`}
          >
            <option value="nyast">Nyast först</option>
            <option value="pris-lag">Lägst pris</option>
            <option value="pris-hog">Högst pris</option>
            <option value="mil-lag">Lägst miltal</option>
          </select>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 text-sm font-medium text-silver transition-colors hover:border-white/40 hover:text-pearl"
            >
              Rensa filter
            </button>
          )}
        </div>
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => (
            <CarCard key={car.slug} car={car} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="surface-plate mt-6 rounded-2xl border-dashed p-12 text-center">
          <h3 className="font-display text-xl font-semibold text-ink">
            Ingen bil matchade dina filter
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Lagret byts ut löpande. Berätta vad du letar efter så håller vi
            utkik och hör av oss när rätt bil dyker upp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton href="/hitta-min-bil" variant="primary">
              Be oss hitta din bil
            </LinkButton>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-pearl transition-colors hover:border-white/45"
            >
              Rensa filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
