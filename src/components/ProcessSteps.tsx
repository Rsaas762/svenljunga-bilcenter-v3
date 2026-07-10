import { Reveal } from "./Reveal";

/**
 * Vertical numbered timeline. Lives in narrow sidebar columns, so it
 * deliberately stacks instead of using a grid — a 3-column grid here
 * squeezed each card to ~110px on desktop and text overflowed the frames.
 */
export function ProcessSteps({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <Reveal as="li" key={step.title} delay={i * 120}>
            <div className="relative flex gap-5 pb-8">
              {/* number + connecting line */}
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-base font-semibold text-pearl shadow-card backdrop-blur-sm"
                >
                  {i + 1}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="mt-2 w-px flex-1 bg-white/15"
                  />
                )}
              </div>
              <div className="pt-1.5">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
