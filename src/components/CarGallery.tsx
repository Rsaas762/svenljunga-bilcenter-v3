"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Car photo gallery with an accessible lightbox. The hero + thumbnails are
 * buttons that open a native <dialog> (focus-trapped, Esc-closable) so a buyer
 * can inspect condition up close. Arrow keys page through; reduced-motion safe.
 */
export function CarGallery({
  images,
  title,
  year,
  sold,
}: {
  images: string[];
  title: string;
  year: number;
  sold?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  const open = useCallback((i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={`Förstora bilder på ${title} ${year}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-3xl bg-carbon shadow-card focus-visible:outline-none"
      >
        <Image
          src={images[0]}
          alt={`${title} ${year}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
        />
        {/* soft grounding shadow at the base so the car sits in showroom light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
        />
        {sold && (
          <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-pearl backdrop-blur-sm">
            Såld
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-pearl backdrop-blur-sm transition-colors group-hover:bg-black/70">
          <svg
            aria-hidden="true"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
          </svg>
          {count} bilder
        </span>
      </button>

      {count > 1 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {images.slice(1, 3).map((src, i) => (
            <button
              type="button"
              key={src + i}
              onClick={() => open(i + 1)}
              aria-label={`Förstora bild ${i + 2} av ${count}`}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-carbon focus-visible:outline-none"
            >
              <Image
                src={src}
                alt={`${title} — bild ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`Bilder på ${title} ${year}`}
        className="lightbox m-auto w-full max-w-5xl bg-transparent p-4 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-carbon">
          <Image
            src={images[active]}
            alt={`${title} ${year} — bild ${active + 1} av ${count}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="nums rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-pearl">
            {active + 1} / {count}
          </span>
          <div className="flex items-center gap-2">
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Föregående bild"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-pearl transition-colors hover:border-white/40 hover:bg-white/[0.12]"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Nästa bild"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-pearl transition-colors hover:border-white/40 hover:bg-white/[0.12]"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Stäng bildvisaren"
              className="grid h-11 min-w-11 place-items-center rounded-full bg-white/90 px-4 text-sm font-semibold text-[#20252a] transition-colors hover:bg-white"
            >
              Stäng
            </button>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                type="button"
                key={`thumb-${src}-${i}`}
                onClick={() => setActive(i)}
                aria-label={`Visa bild ${i + 1} av ${count}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative aspect-[16/10] h-14 shrink-0 overflow-hidden rounded-lg transition focus-visible:outline-none ${
                  i === active
                    ? "ring-2 ring-cognac"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="90px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}
