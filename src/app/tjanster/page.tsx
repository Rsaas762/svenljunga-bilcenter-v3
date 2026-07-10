import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { LinkButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tjänster & tillval",
  description:
    "Finansiering via Santander, garanti via GarantiPartner, inbyte med fri värdering och rekonditionering. Allt för en trygg bilaffär hos Svenljunga Bilcenter.",
  openGraph: {
    title: "Tjänster & tillval — Svenljunga Bilcenter",
    description:
      "Finansiering, garanti, inbyte och rekond — vi hjälper dig hela vägen genom bilaffären.",
  },
};

/**
 * The two big "tillval" — each backed by a REAL, named partner.
 * Copy stays conservative: terms vary per car, so we promise a genomgång,
 * never specific rates, coverage or package contents.
 */
const mainServices = [
  {
    title: "Finansiering",
    partner: "via Santander Consumer Bank",
    logo: { src: "/partners/santander.png", w: 520, h: 292 },
    body: "Vill du dela upp betalningen? Vi samarbetar med Santander Consumer Bank och hjälper dig med hela ansökan på plats i butiken. Du får ett tydligt besked om månadskostnad innan du bestämmer dig — och kan så klart kombinera finansieringen med ett inbyte.",
    points: [
      "Vi hjälper dig med ansökan i butiken",
      "Besked innan du bestämmer dig",
      "Går att kombinera med inbyte",
    ],
  },
  {
    title: "Garanti",
    partner: "via GarantiPartner",
    logo: { src: "/partners/garantipartner.png", w: 360, h: 360 },
    body: "Trygghet ska inte ta slut när du kör hem. Garantierna på våra bilar tecknas via GarantiPartner, och vad som gäller varierar mellan bilar. Därför går vi alltid igenom villkoren för just den bil du är intresserad av — innan köpet, inte efter.",
    points: [
      "Garanti via GarantiPartner",
      "Vi går igenom villkoren för din bil",
      "Tydliga besked innan köp",
    ],
  },
] as const;

/** The everyday services around the affair itself. */
const supportServices = [
  {
    title: "Inbyte",
    body: "Ta med din nuvarande bil när du köper — du får en fri värdering och priset räknas av direkt mot din nästa bil.",
    cta: { label: "Sälj eller byt in din bil", href: "/salj-din-bil" },
  },
  {
    title: "Rekonditionering",
    body: "Varje bil i lagret rekonditioneras innan försäljning. Vi hjälper även dig som vill fräscha upp din egen bil — hör av dig så berättar vi mer.",
    cta: { label: "Kontakta oss", href: "/kontakt" },
  },
  {
    title: "Vi hämtar bilen",
    body: "Säljer du din bil till oss och bor en bit bort? Vi hämtar bilen där den står, vid en tid som passar dig.",
    cta: { label: "Få en fri värdering", href: "/salj-din-bil" },
  },
  {
    title: "Hitta min bil",
    body: "Hittar du inte rätt bil i lagret? Berätta vad du söker så letar vi åt dig — märkesoberoende och utan förpliktelser.",
    cta: { label: "Be oss hitta din bil", href: "/hitta-min-bil" },
  },
] as const;

export default function TjansterPage() {
  return (
    <>
      <PageHero
        eyebrow="Tjänster & tillval"
        title="Allt för en trygg bilaffär — på ett ställe"
        intro="Köpet är bara en del av affären. Finansiering, garanti, inbyte och rekond ordnar vi också — så att du slipper hålla i trådarna själv."
      />

      {/* ── Finansiering & garanti — the two partner-backed tillval ── */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-2">
            {mainServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="h-full">
                <article className="surface-carbon flex h-full flex-col rounded-3xl p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-[1.6rem] font-bold text-pearl">
                        {s.title}
                      </h2>
                      <p className="mt-1 text-[0.85rem] text-muted">
                        {s.partner}
                      </p>
                    </div>
                    <span className="flex h-11 shrink-0 items-center rounded-lg bg-white/90 px-3.5">
                      <Image
                        src={s.logo.src}
                        alt={s.partner.replace("via ", "")}
                        width={s.logo.w}
                        height={s.logo.h}
                        className="max-h-7 w-auto max-w-[104px] object-contain"
                      />
                    </span>
                  </div>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-3">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-[0.9rem] text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-px w-4 shrink-0 bg-white/25"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <LinkButton href="/kontakt" variant="outline">
                      Fråga oss om {s.title.toLowerCase()}
                    </LinkButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Runt själva affären — supporting services ─────────────── */}
      <section className="bg-gunmetal border-y border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <SectionHeader
            onDark
            title="Det praktiska tar vi hand om"
            intro="Inbyte, rekond, hämtning eller en bil vi inte har inne ännu — säg till, så löser vi det."
          />
          <div className="mt-11 grid gap-6 sm:grid-cols-2">
            {supportServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="h-full">
                <div className="surface-carbon flex h-full flex-col rounded-2xl p-8">
                  <h3 className="font-display text-[1.25rem] font-bold text-pearl">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <Link href={s.cta.href} className="lnk mt-6 text-[0.9rem]">
                    {s.cta.label} <span className="arrow">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + kontakt pointer ─────────────────────────────────── */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <div className="surface-plate-strong flex flex-col items-start gap-6 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="font-display text-[1.5rem] font-bold text-pearl">
                  Undrar du över något?
                </h2>
                <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                  Svaren på det vi oftast får frågor om har vi samlat på ett
                  ställe. Hittar du inte ditt svar är det bara att ringa{" "}
                  <a
                    href={site.phoneHref}
                    className="nums font-semibold text-silver hover:text-pearl"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
              </div>
              <LinkButton href="/vanliga-fragor" size="lg">
                Se vanliga frågor
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
