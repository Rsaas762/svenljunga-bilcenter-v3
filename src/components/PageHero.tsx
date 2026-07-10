import { Reveal } from "./Reveal";

/** Shared intro band for subpages. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-titanium border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 lg:pb-16 lg:pt-36">
        <Reveal>
          <p className="eyebrow eyebrow-rule text-silver">{eyebrow}</p>
          <h1 className="font-display mt-3 max-w-3xl text-[2.25rem] font-semibold leading-[1.08] text-balance text-ink sm:text-[3rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
