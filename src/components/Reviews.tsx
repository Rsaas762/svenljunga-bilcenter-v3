import { Reveal } from "./Reveal";
import { reviewsConfirmed, site } from "@/lib/site";

/** Cognac rating stars — warm accent, on-brand (no gold). */
function Stars({ n }: { n: number }) {
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${n} av 5 stjärnor`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < n ? "var(--color-cognac)" : "none"}
          stroke="var(--color-cognac)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * "Det kunderna säger" — real Google reviews as social proof, placed just
 * before the conversion moment. Hides entirely unless real reviews exist.
 */
export function Reviews() {
  if (!reviewsConfirmed) return null;
  const r = site.reviews;

  return (
    <section className="bg-gunmetal border-y border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div className="max-w-xl">
            <h2 className="font-display text-[2rem] font-semibold leading-[1.12] text-balance text-pearl sm:text-[2.5rem]">
              Det kunderna säger om oss
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-pearl/70 sm:text-lg">
              Många reser långt och flera kommer tillbaka för nästa bil. Här är
              några riktiga röster från Google.
            </p>
          </div>

          {/* Real aggregate rating badge — links out to the Google profile */}
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-plate hover-cognac group flex items-center gap-4 rounded-2xl px-5 py-4 hover:-translate-y-0.5"
          >
            <span className="nums font-display text-[2.4rem] font-bold leading-none text-pearl">
              {r.rating}
            </span>
            <span className="block">
              <Stars n={5} />
              <span className="nums mt-1 block text-xs text-muted">
                {r.count} recensioner på Google{" "}
                <span
                  aria-hidden="true"
                  className="inline-block text-silver transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </span>
            </span>
          </a>
        </div>

        <Reveal delay={100}>
          <div className="mt-11 grid gap-5 sm:grid-cols-2">
            {r.items.map((it) => (
              <figure
                key={it.author}
                className="surface-plate flex h-full flex-col rounded-2xl p-6 sm:p-7"
              >
                <Stars n={it.stars} />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-3">
                  “{it.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-baseline gap-2 border-t border-white/10 pt-4">
                  <span className="text-sm font-semibold text-pearl">
                    {it.author}
                  </span>
                  <span className="text-xs text-muted">· {it.timeAgo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
