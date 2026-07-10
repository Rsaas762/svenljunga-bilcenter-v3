import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CarCard } from "@/components/CarCard";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";
import { SectionHeader } from "@/components/SectionHeader";
import { LinkButton } from "@/components/ui";
import { carTitle, inStockCars } from "@/lib/cars";
import { formatMileage, formatPrice } from "@/lib/format";
import { hoursConfirmed, hoursFallback, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Din trygga bilaffär i Svenljunga`,
  description:
    "Märkesoberoende bilhandlare i Svenljunga. Se bilar i lager, sälj din bil med fri värdering, finansiering via Santander och garanti via GarantiPartner. Vi köper, säljer och rekonditionerar bilar av alla märken.",
  openGraph: {
    title: `${site.name} — Din trygga bilaffär`,
    description:
      "Vi köper, säljer och hjälper dig hitta rätt bil i Svenljunga med omnejd. Fri värdering och vi hämtar din bil.",
  },
};

const services = [
  {
    title: "Köp ur vårt lager",
    body: "Ett märkesoberoende urval av genomgångna bilar. Ta gärna din nuvarande bil i inbyte som del av köpet.",
    cta: "Se bilar i lager",
    href: "/bilar",
  },
  {
    title: "Sälj din bil till oss",
    body: "Du får en fri värdering utan förpliktelser. Bor du en bit bort hämtar vi bilen där den står.",
    cta: "Sälj din bil",
    href: "/salj-din-bil",
  },
  {
    title: "Finansiering & garanti",
    body: "Förmånlig ränta genom Santander och trygga garantipaket via GarantiPartner — vi hjälper dig hela vägen.",
    cta: "Kontakta oss",
    href: "/kontakt",
  },
];

// Real partner logos on the smoked-silver trust strip (from svenljungabilcenter.se).
const partnerLogos = [
  { name: "Santander Consumer Bank", src: "/partners/santander.png", w: 520, h: 292 },
  { name: "GarantiPartner", src: "/partners/garantipartner.png", w: 360, h: 360 },
  { name: "Blocket", src: "/partners/blocket.png", w: 520, h: 292 },
];

/** Small map-pin glyph reused in the hero and the visit block. */
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Thin stitched cognac-leather seam — a material transition between bands. */
function LeatherSeam() {
  return (
    <div
      aria-hidden="true"
      className="bg-leather h-2.5 border-y border-dashed border-[#f0e2cd]/45"
    />
  );
}

export default function Home() {
  const inStock = inStockCars();
  const lead = inStock[0];
  const rest = inStock.slice(1, 4);

  const instrument = [
    { k: "Bilar i lager", v: String(inStock.length), caption: "i lager just nu", primary: true },
    { k: "Urval", v: "Alla märken", caption: "märkesoberoende" },
    { k: "Värdering", v: "Kostnadsfri", caption: "utan förpliktelser" },
    { k: "Svarstid", v: "~1 arbetsdag", caption: "vi hör av oss", live: true },
  ];

  const leadSpecs = [
    { label: "Årsmodell", value: String(lead.year) },
    { label: "Miltal", value: formatMileage(lead.mileageMil) },
    { label: "Bränsle", value: lead.fuel },
    { label: "Växellåda", value: lead.gearbox },
  ];

  return (
    <>
      {/* ── Hero — full-bleed cinematic showroom ─────────────────── */}
      <section className="bg-titanium relative flex min-h-[88vh] items-end overflow-hidden">
        <Image
          src="/hero/showroom-interior.jpg"
          alt="Svenljunga Bilcenters upplysta bilhall med bilar i lager"
          fill
          priority
          sizes="100vw"
          className="hero-drift object-cover"
        />
        {/* Scrim — darkens the lower-left so the type stays legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,16,19,0.86) 0%, rgba(12,16,19,0.5) 42%, rgba(12,16,19,0.15) 72%, rgba(12,16,19,0.35) 100%), linear-gradient(0deg, rgba(12,16,19,0.92) 2%, rgba(12,16,19,0.2) 40%, transparent 62%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, rgba(0,0,0,0.14) 1px 3px)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-16">
          <p
            className="eyebrow eyebrow-rule rise-in text-silver"
            style={{ animationDelay: "0.05s" }}
          >
            Märkesoberoende bilhandlare · Svenljunga
          </p>
          <h1
            className="font-display rise-in mt-4 max-w-[15ch] text-[2.6rem] font-bold leading-[1.0] tracking-[-0.03em] text-balance text-pearl sm:text-[3.5rem] lg:text-[4.4rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Hitta din nästa bil —{" "}
            <span className="font-medium text-pearl/55">utan krångel.</span>
          </h1>
          <p
            className="rise-in mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-3 sm:text-[1.1875rem]"
            style={{ animationDelay: "0.3s" }}
          >
            Ett genomgånget urval mitt i Svenljunga. Köp, sälj eller ta in din
            bil i inbyte — och få svar av en människa, inte en växel.
          </p>
          <div
            className="rise-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.45s" }}
          >
            <LinkButton href="/bilar" size="lg">
              Se bilar i lager
            </LinkButton>
            <LinkButton href="/salj-din-bil" variant="outline" size="lg">
              Sälj din bil
            </LinkButton>
          </div>
          <p
            className="rise-in mt-7 inline-flex items-center gap-2 text-[0.8rem] text-muted"
            style={{ animationDelay: "0.65s" }}
          >
            <PinIcon className="text-silver" /> {site.address.street},{" "}
            {site.address.zip} {site.address.city}
          </p>
        </div>
      </section>

      {/* ── Instrument cluster — gunmetal binnacle with a gauge ruler ─ */}
      <section className="bg-gunmetal">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="relative">
            {/* Speedometer-style tick ruler across the top of the cluster */}
            <div
              aria-hidden="true"
              className="instr-ruler pointer-events-none absolute inset-x-0 top-0 h-3.5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(198,203,207,0.55) 0 1px, transparent 1px 13px), repeating-linear-gradient(90deg, rgba(198,203,207,0.8) 0 1.5px, transparent 1.5px 65px)",
                backgroundSize: "100% 7px, 100% 13px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 0, 0 0",
                maskImage:
                  "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
              }}
            />
            {/* Cognac redline tick — the one warm marker on the scale */}
            <div
              aria-hidden="true"
              className="instr-redline pointer-events-none absolute top-0 hidden h-3.5 w-0.5 bg-cognac min-[940px]:block"
              style={{ left: "76%", boxShadow: "0 0 8px 1px var(--color-cognac)" }}
            />

            <dl className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[940px]:grid-cols-4">
              {instrument.map((it, i) => (
                <div
                  key={it.k}
                  className={`px-2 pb-8 pt-9 sm:px-8 ${
                    i === 0
                      ? ""
                      : "border-t border-white/10 min-[560px]:border-t-0 min-[560px]:[&:nth-child(3)]:border-t min-[940px]:[&:nth-child(3)]:border-t-0 min-[560px]:border-l min-[560px]:[&:nth-child(odd)]:border-l-0 min-[940px]:border-l min-[940px]:[&:nth-child(odd)]:border-l"
                  }`}
                >
                  <dt className="eyebrow text-[0.66rem] tracking-[0.22em] text-muted">
                    {it.k}
                  </dt>
                  <dd
                    className={`nums font-display mt-3 flex items-center gap-2.5 font-bold tracking-[-0.02em] ${
                      it.primary
                        ? "text-[2.1rem] text-pearl"
                        : "text-[1.5rem] text-silver"
                    }`}
                  >
                    {it.live && (
                      <span
                        aria-hidden="true"
                        className="pulse-live h-2 w-2 shrink-0 rounded-full bg-trust"
                      />
                    )}
                    {it.primary ? <CountUp value={Number(it.v)} /> : it.v}
                  </dd>
                  {/* readout underline — cognac tick on the primary gauge */}
                  <span
                    aria-hidden="true"
                    className={`mt-2.5 block h-px w-9 ${
                      it.primary ? "bg-cognac" : "bg-white/15"
                    }`}
                  />
                  <p className="mt-2.5 text-[0.78rem] text-muted">{it.caption}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Leather seam 1 — under the instrument strip */}
      <LeatherSeam />

      {/* ── Bilar i lager — carbon, featured + grid ──────────────── */}
      <section className="bg-carbon" id="lager">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              onDark
              eyebrow="Bilar i lager"
              title="Genomgångna bilar, redo att köras"
              intro="Alla bilar går igenom vår kontroll innan de säljs. Är du intresserad? Skicka en förfrågan så återkommer vi inom en arbetsdag."
            />
            <Reveal delay={150}>
              <LinkButton href="/bilar" variant="outline">
                Visa alla bilar
              </LinkButton>
            </Reveal>
          </div>

          {lead ? (
            <>
              {/* Featured wide car — the selected pick from stock */}
              <Reveal delay={80} className="reveal-scale mt-11">
                <Link
                  href={`/bilar/${lead.slug}`}
                  aria-label={`${carTitle(lead)} ${lead.year} — ${formatPrice(lead.priceSek)}, se bilen`}
                  className="surface-carbon group grid overflow-hidden rounded-3xl md:grid-cols-[1.15fr_1fr]"
                >
                  <div className="relative min-h-[260px] overflow-hidden md:min-h-[340px]">
                    <Image
                      src={lead.images[0]}
                      alt={`${carTitle(lead)} ${lead.year}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="nums absolute left-4 top-4 rounded-full bg-black/55 px-3.5 py-1.5 text-xs font-medium text-pearl backdrop-blur-md">
                      Utvald ur lagret
                    </span>
                  </div>
                  <div className="flex flex-col p-8 sm:p-11">
                    <p className="eyebrow text-silver">Ur lagret</p>
                    <h3 className="font-display mt-3 text-[1.85rem] font-bold leading-[1.1] text-pearl">
                      {carTitle(lead)}
                    </h3>
                    {lead.variant && (
                      <p className="mt-1 text-[0.95rem] text-ink-3">
                        {lead.variant}
                      </p>
                    )}
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                      {leadSpecs.map((s) => (
                        <div key={s.label}>
                          <dt className="text-[0.78rem] text-muted">{s.label}</dt>
                          <dd className="nums font-display mt-0.5 text-[0.95rem] font-semibold text-ink-2">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                      <span className="nums font-display text-[1.65rem] font-bold whitespace-nowrap text-pearl">
                        {formatPrice(lead.priceSek)}
                      </span>
                      <span className="lnk text-[0.9rem]">
                        Se bilen <span className="arrow">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>

              {/* Grid of the next three */}
              {rest.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((car, i) => (
                    <Reveal key={car.slug} delay={i * 120} className="h-full">
                      <CarCard car={car} priority={false} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Empty state — no cars in stock (failed refresh or all sold) */
            <Reveal className="mt-11">
              <div className="surface-carbon rounded-3xl px-6 py-14 text-center sm:py-16">
                <h3 className="font-display text-[1.5rem] font-bold text-pearl">
                  Nya bilar är på väg in
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  Just nu har vi inga bilar publicerade i lagret. Ring oss så hör
                  vi av oss så snart rätt bil kommer in — eller berätta vad du
                  söker så letar vi åt dig.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <LinkButton href="/hitta-min-bil" size="lg">
                    Be oss hitta din bil
                  </LinkButton>
                  <a
                    href={site.phoneHref}
                    className="nums font-display px-2 text-[1.05rem] font-semibold text-silver hover:text-pearl"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Social proof — real Google reviews before the ask ────── */}
      <Reviews />

      {/* ── Conversion — centred leather plate on titanium ───────── */}
      <section className="bg-titanium" id="salj">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal>
            <div className="bg-leather shadow-card-hover rounded-3xl p-2.5">
              <div
                className="leather-stitch rounded-[1.15rem] px-6 py-11 text-center sm:px-10 sm:py-16"
                style={{ background: "rgba(0,0,0,0.14)" }}
              >
                <p className="text-cream-soft text-[0.95rem] font-medium">
                  Funderar du på att sälja?
                </p>
                <h2 className="font-display text-cream-bright mx-auto mt-2 max-w-[16ch] text-[2rem] font-bold leading-[1.08] sm:text-[2.75rem]">
                  Få en fri värdering av din bil
                </h2>
                <p className="text-cream/90 mx-auto mt-4 max-w-[34rem] leading-relaxed">
                  Skicka in bilens uppgifter så återkommer vi med en första
                  bedömning — utan krångel och utan förpliktelser.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <LinkButton href="/salj-din-bil" variant="leather" size="lg">
                    Få en gratis värdering →
                  </LinkButton>
                  <a
                    href={site.phoneHref}
                    className="nums font-display text-cream-bright px-2 text-[1.05rem] font-bold hover:text-white"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Så hjälper vi dig — gunmetal service cards ───────────── */}
      <section className="bg-gunmetal border-y border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeader
            onDark
            eyebrow="Så hjälper vi dig"
            title="Hela bilaffären på ett ställe"
            intro="Från köp och inbyte till försäljning, finansiering och garanti — vi tar hand om affären från början till slut, tryggt och personligt."
          />
          <div className="mt-11 grid gap-6">
            {/* Primary service — wider, CTA styled as a pill (the money action) */}
            <Reveal>
              <Link
                href={services[0].href}
                className="surface-carbon group grid gap-6 rounded-2xl p-8 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 sm:grid-cols-[1.6fr_1fr] sm:items-center sm:p-10"
              >
                <div>
                  <h3 className="font-display text-[1.5rem] font-bold text-pearl">
                    {services[0].title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                    {services[0].body}
                  </p>
                </div>
                <div className="sm:flex sm:justify-end">
                  <span className="btn-machined inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.9rem] font-semibold">
                    {services[0].cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Supporting services — the pair beneath */}
            <div className="grid gap-6 min-[700px]:grid-cols-2">
              {services.slice(1).map((s, i) => (
                <Reveal key={s.title} delay={i * 120} className="h-full">
                  <Link
                    href={s.href}
                    className="surface-carbon group flex h-full flex-col rounded-2xl p-8 transition-[box-shadow,transform] duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-display text-[1.3rem] font-bold text-pearl">
                      {s.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                    <span className="lnk mt-7 text-[0.9rem]">
                      {s.cta} <span className="arrow">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leather seam 2 — above "Titta in i Svenljunga" */}
      <LeatherSeam />

      {/* ── Besök oss — carbon, showroom + practical info ────────── */}
      <section className="bg-carbon" id="besok">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid items-center gap-11 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-card-hover">
                <Image
                  src="/hero/showroom-branding.jpg"
                  alt="Svenljunga Bilcenters skyltade utställningshall inomhus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeader
                onDark
                title="Titta in i Svenljunga"
                intro="Kom förbi och titta på bilarna i lugn och ro. Vi bjuder på kaffe och ärliga råd — inga påstridiga säljare."
              />
              <Reveal delay={120}>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="eyebrow text-silver">Adress</h3>
                      <p className="mt-2.5 flex items-start gap-2 text-[0.95rem] leading-relaxed text-ink-3">
                        <span className="mt-1 shrink-0 text-silver">
                          <PinIcon />
                        </span>
                        <span>
                          {site.address.street}
                          <br />
                          {site.address.zip} {site.address.city}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h3 className="eyebrow text-silver">Kontakt</h3>
                      <div className="nums mt-1.5 flex flex-col text-[0.95rem] text-ink-3">
                        <a
                          href={site.phoneHref}
                          className="inline-flex w-fit py-1 hover:text-pearl"
                        >
                          {site.phone}
                        </a>
                        <a
                          href={site.emailHref}
                          className="inline-flex w-fit py-1 hover:text-pearl"
                        >
                          {site.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="eyebrow text-silver">Öppettider</h3>
                    {hoursConfirmed ? (
                      <>
                        <ul className="nums mt-3 flex flex-col gap-2.5 text-[0.9rem] text-ink-3">
                          {site.hours.map((h) => (
                            <li
                              key={h.days}
                              className="flex justify-between gap-4 border-b border-white/[0.08] pb-2"
                            >
                              <span className="whitespace-nowrap">{h.days}</span>
                              <span className="whitespace-nowrap text-muted">
                                {h.time}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 inline-flex items-center gap-2 text-[0.8rem] text-muted">
                          <span
                            aria-hidden="true"
                            className="pulse-live h-2 w-2 rounded-full bg-trust"
                          />
                          Svarar normalt inom en arbetsdag
                        </p>
                      </>
                    ) : (
                      <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-3">
                        {hoursFallback}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip — smoked silver, partner logos ───────────── */}
      <section className="bg-smoked border-y border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8">
          <div className="flex flex-col items-center gap-2.5">
            <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {partnerLogos.map((p) => (
                <li
                  key={p.name}
                  className="flex h-11 items-center rounded-lg bg-white/90 px-3.5"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={p.w}
                    height={p.h}
                    className="max-h-7 w-auto max-w-[112px] object-contain grayscale transition duration-300 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
            <span className="eyebrow text-[0.6rem] text-pearl/65">
              Samarbetspartners
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
