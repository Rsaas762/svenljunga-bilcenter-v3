import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/CarGallery";
import { InterestForm } from "@/components/forms/InterestForm";
import { LinkButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { cars, carTitle, getCar } from "@/lib/cars";
import { formatMileage, formatPrice } from "@/lib/format";
import { site, hoursConfirmed, hoursFallback } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  const title = `${carTitle(car)} ${car.year}`;
  const description = `${title} — ${formatMileage(car.mileageMil)}, ${car.fuel}, ${car.gearbox}. ${formatPrice(car.priceSek)} hos ${site.name} i Svenljunga.`;
  return {
    title: car.inStock ? title : `${title} (Såld)`,
    description,
    // A sold car keeps its page (shareable / no dead link) but leaves the index.
    robots: car.inStock ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      images: [{ url: car.images[0] }],
    },
  };
}

const specLabel = "text-xs font-medium uppercase tracking-wider text-silver/75";
const specValue = "mt-1 font-medium text-pearl";

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const title = carTitle(car);
  const sold = !car.inStock;

  const specs = [
    { label: "Årsmodell", value: String(car.year) },
    { label: "Mätarställning", value: formatMileage(car.mileageMil) },
    { label: "Drivmedel", value: car.fuel },
    { label: "Växellåda", value: car.gearbox },
    { label: "Kaross", value: car.bodyType },
    ...(car.inspectedUntil
      ? [{ label: "Besiktigad t.o.m.", value: car.inspectedUntil }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 lg:pb-16 lg:pt-32">
      <nav aria-label="Brödsmulor" className="mb-6 text-sm text-muted">
        <Link href="/bilar" className="transition-colors hover:text-silver">
          Bilar i lager
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-ink">
          {title} {car.year}
        </span>
      </nav>

      {/* Headline: title + price up top so the decision-critical info is
          visible immediately on mobile, not a screen and a half down. */}
      <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {sold && (
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-silver">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-silver/70"
              />
              Såld
            </span>
          )}
          <h1 className="font-display text-3xl font-semibold tracking-tight text-pearl sm:text-4xl">
            {title}{" "}
            <span className="text-pearl/55">{car.year}</span>
          </h1>
          {car.variant && (
            <p className="mt-1.5 max-w-xl text-sm text-silver/80">
              {car.variant}
            </p>
          )}
        </div>
        <div className="shrink-0">
          <p className="nums font-display whitespace-nowrap text-3xl font-semibold text-pearl sm:text-4xl">
            {formatPrice(car.priceSek)}
          </p>
          {/* cognac readout-tick — echoes the home instrument cluster's primary
              reading, marking the price as the decision number */}
          <span aria-hidden="true" className="mt-2 block h-px w-9 bg-cognac" />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* ── Gallery + description ── */}
        <div className="relative">
          {/* Soft silver showroom glow pooling behind the gallery */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-[58%]"
            style={{
              background:
                "radial-gradient(52% 56% at 46% 34%, rgba(198,203,207,0.11), transparent 72%)",
            }}
          />
          <Reveal>
            <CarGallery
              images={car.images}
              title={title}
              year={car.year}
              sold={sold}
            />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display mt-10 text-2xl font-semibold text-ink">
              Om bilen
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              {car.description}
            </p>

            {car.features.length > 0 && (
              <>
                <h3 className="font-display mt-8 text-lg font-semibold text-ink">
                  Utrustning i urval
                </h3>
                <ul className="mt-3 grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-2">
                  {car.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-ink/80"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>

        {/* ── Specs + interest form / sold CTA ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal delay={150}>
            <div className="surface-carbon rounded-3xl p-7">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className={specLabel}>{s.label}</dt>
                    <dd className={`${specValue} ${s.label === "Besiktigad t.o.m." ? "nums" : ""}`}>
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {!sold && (
                <p className="mt-6 rounded-xl bg-white/10 px-4 py-3 text-xs leading-relaxed text-silver/80">
                  Finansiering och inbyte? Det löser vi — nämn det i meddelandet
                  eller ring{" "}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-silver underline decoration-white/30 underline-offset-2 transition-colors hover:text-cognac hover:decoration-cognac"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
              )}

              {car.blocketUrl && (
                <a
                  href={car.blocketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-medium text-silver/70 underline underline-offset-4 hover:text-pearl"
                >
                  Se annonsen på Blocket ↗
                </a>
              )}
            </div>
          </Reveal>

          {/* Visit / test-drive — real hours + tappable phone + directions */}
          <Reveal delay={200}>
            <div className="surface-plate mt-6 rounded-3xl p-7">
              <h2 className="font-display text-lg font-semibold text-ink">
                Vill du provköra?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Välkommen till {site.address.street} i {site.address.city}.
                {hoursConfirmed
                  ? " Ring så ser vi till att bilen står redo."
                  : ` ${hoursFallback}`}
              </p>
              {hoursConfirmed && (
                <dl className="mt-4 space-y-1.5 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="nums font-medium text-ink-2">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <LinkButton href={site.phoneHref} variant="outline" size="md">
                  Ring {site.phone}
                </LinkButton>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-silver underline underline-offset-4 transition-colors hover:text-pearl"
                >
                  Hitta hit ↗
                </a>
              </div>
            </div>
          </Reveal>

          {sold ? (
            <Reveal delay={250}>
              <div className="surface-plate-strong mt-6 rounded-3xl p-7">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Den här bilen är såld
                </h2>
                <p className="mb-6 mt-1.5 text-sm leading-relaxed text-muted">
                  Men lagret byts ut löpande. Berätta vad du letar efter så hör
                  vi av oss när rätt bil dyker upp — eller se vad vi har inne
                  just nu.
                </p>
                <div className="flex flex-wrap gap-3">
                  <LinkButton href="/hitta-min-bil" variant="primary" size="md">
                    Be oss hitta din bil
                  </LinkButton>
                  <LinkButton href="/bilar" variant="outline" size="md">
                    Se bilar i lager
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={250}>
              <div
                id="intresse"
                className="surface-plate-strong mt-6 scroll-mt-24 rounded-3xl p-7"
              >
                <h2 className="font-display text-xl font-semibold text-ink">
                  Jag är intresserad
                </h2>
                <p className="mb-6 mt-1.5 text-sm text-muted">
                  Skicka en förfrågan så återkommer vi — normalt inom en
                  arbetsdag.
                </p>
                <InterestForm
                  carSlug={car.slug}
                  carLabel={`${title} ${car.year}`}
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Mobile sticky action bar — keeps price + the primary action reachable
          one-handed throughout the scroll. Hidden on lg where the rail sticks. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-page/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0">
            <p className="nums whitespace-nowrap font-display text-lg font-semibold text-pearl">
              {formatPrice(car.priceSek)}
            </p>
            <p className="truncate text-[0.7rem] text-muted">
              {title} {car.year}
            </p>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a
              href={site.phoneHref}
              aria-label={`Ring ${site.name}`}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-pearl transition-colors hover:border-white/40"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            {sold ? (
              <LinkButton href="/hitta-min-bil" variant="primary" size="md">
                Hitta din nästa bil
              </LinkButton>
            ) : (
              <LinkButton href="#intresse" variant="primary" size="md">
                Jag är intresserad
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
