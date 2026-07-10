"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string };

/**
 * Crossfading hero slideshow with a slow Ken Burns drift on the active
 * slide. Auto-advances, pauses on hover/focus, and (per
 * prefers-reduced-motion) stops both the drift and the autoplay while
 * keeping the pagination dots for manual control.
 */
export function HeroSlideshow({
  slides,
  caption,
  intervalMs = 5500,
}: {
  slides: Slide[];
  caption?: ReactNode;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  // Explicit play/pause (WCAG 2.2.2) — persists across hover, unlike the ref.
  const [playing, setPlaying] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || slides.length <= 1 || !playing) return;
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, slides.length, intervalMs, playing]);

  const autoplays = !reduced && slides.length > 1;

  return (
    <div
      className="group absolute inset-0"
      role="group"
      aria-roledescription="bildspel"
      aria-label="Bilder från Svenljunga Bilcenter"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            aria-hidden={!active}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ opacity: active ? 1 : 0 }}
          >
            <div
              className="relative h-full w-full"
              style={
                active && !reduced
                  ? {
                      animation: `hero-kenburns ${intervalMs + 1400}ms ease-out both`,
                    }
                  : undefined
              }
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* legibility gradient for the caption + dots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent"
      />

      {caption && (
        <p className="font-display absolute bottom-4 left-5 right-24 text-sm font-medium text-pearl/95">
          {caption}
        </p>
      )}

      {/* pagination dots + play/pause */}
      {slides.length > 1 && (
        <div className="absolute bottom-2.5 right-2.5 flex items-center">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Visa bild ${i + 1} av ${slides.length}`}
              aria-current={i === index}
              className="grid h-11 w-8 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-pearl" : "w-2 bg-pearl/50 hover:bg-pearl/80"
                }`}
              />
            </button>
          ))}
          {autoplays && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausa bildspelet" : "Spela bildspelet"}
              aria-pressed={!playing}
              className="ml-0.5 grid h-11 w-11 place-items-center text-pearl/70 transition-colors hover:text-pearl"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
