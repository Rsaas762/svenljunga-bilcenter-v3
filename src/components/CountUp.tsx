"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// Runs the layout effect before paint on the client (so the number starts at 0
// with no flash) while falling back to useEffect during SSR (no warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts up to `value` once on mount — the instrument gauge settling on its
 * reading. SSR renders the final value (so no-JS and hydration both show it);
 * the animation only kicks in on the client when motion is allowed.
 */
export function CountUp({
  value,
  durationMs = 900,
  delayMs = 500,
  className,
}: {
  value: number;
  durationMs?: number;
  delayMs?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(0);
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start - delayMs;
      if (elapsed >= 0) {
        const p = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
        setDisplay(Math.round(eased * value));
        if (p >= 1) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, delayMs]);

  return <span className={className}>{display}</span>;
}
