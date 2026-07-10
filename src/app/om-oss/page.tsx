import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Partners } from "@/components/Partners";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { LinkButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Svenljunga Bilcenter är en märkesoberoende bilhandlare på Boråsvägen 16 i Svenljunga. Läs om hur vi arbetar med trygghet, tydlighet och enkel kontakt i varje bilaffär.",
  openGraph: {
    title: "Om Svenljunga Bilcenter",
    description: "En lokal, märkesoberoende bilhandlare byggd på förtroende.",
  },
};

const values = [
  {
    title: "Trygghet",
    body: "Du ska kunna lita på det vi säger om en bil — före, under och efter affären. Vi går igenom varje bil och är öppna med det vi vet.",
    icon: "shield",
  },
  {
    title: "Tydlighet",
    body: "Raka besked om pris, skick och nästa steg. Inga dolda avgifter, inget finstilt som överraskar.",
    icon: "clarity",
  },
  {
    title: "Enkel kontakt",
    body: "Hos oss pratar du direkt med den som faktiskt kan svara. Ring, mejla eller kom förbi — tröskeln ska vara låg.",
    icon: "chat",
  },
] as const;

const valueIconPaths: Record<string, string> = {
  shield: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z M9.5 12l1.8 1.8L15 10",
  clarity: "M5 5h14M5 10h14M5 15h9",
  chat: "M4 5h16v10H8l-4 4V5z",
};

function ValueIcon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-cognac"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={valueIconPaths[name]} />
    </svg>
  );
}

export default function OmOssPage() {
  return (
    <>
      <PageHero
        eyebrow="Om oss"
        title="Om Svenljunga Bilcenter"
        intro="Svenljunga Bilcenter hjälper kunder med trygga och smidiga bilaffärer. Vårt mål är att göra det enkelt att köpa, sälja och hitta rätt bil med personlig service och tydlig kommunikation."
      />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Lokalt förankrade"
            title="En bilhandlare du kan besöka, ringa och lita på"
          />
          <Reveal delay={100}>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                Svenljunga Bilcenter är en märkesoberoende bilhandlare på
                Boråsvägen 16, mitt i Svenljunga i hjärtat av Sjuhärad. Vi
                handlar med alla bilmärken — det betyder att vi kan ge dig ett
                ärligt råd om vilken bil som passar dig, utan att styras av ett
                enda varumärke.
              </p>
              <p>
                Hos oss får du hjälp hela vägen: köp ur vårt lager, inbyte,
                finansiering via Santander och garanti via GarantiPartner. Vill
                du sälja? Du får en fri värdering och vi hämtar bilen där den
                står. Alla våra leveransklara bilar finns dessutom
                utannonserade i vår Blocket-butik.
              </p>
              <p>
                Som lokal handlare möter vi våra kunder igen — på ICA, på macken
                och när det är dags för nästa bil. Den närheten är vår
                viktigaste kvalitetsgaranti: en affär är inte lyckad förrän du
                är nöjd även ett år senare.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gunmetal border-y border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <SectionHeader title="Tre löften i varje affär" />
          <dl className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120} className="md:px-7 md:first:pl-0 md:last:pr-0">
                <ValueIcon name={v.icon} />
                <dt className="font-display mt-4 text-xl font-semibold text-ink">
                  {v.title}
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-muted">
                  {v.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/*
        PRE-LAUNCH CONTENT GAP: this trust page promises "du pratar direkt med
        den som faktiskt kan svara" but shows no owner name or photo. A real
        face/name is the single highest-trust element for a small local dealer.
        Add a real owner/team block here once the dealership supplies a genuine
        photo + name — do NOT use stock imagery or an invented name.
      */}

      {/* Partners & trygghet — real logos */}
      <Partners />

      {/* CTA */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <Reveal>
            <h2 className="font-display text-[2rem] font-semibold text-pearl sm:text-[2.5rem]">
              Kom förbi och säg hej
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pearl/65">
              Du hittar oss på{" "}
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-silver underline decoration-white/30 underline-offset-2 transition-colors hover:text-cognac hover:decoration-cognac"
              >
                {site.address.street} i {site.address.city}
              </a>
              . Kaffet är alltid på.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href="/kontakt" size="lg">
                Kontakta oss
              </LinkButton>
              <LinkButton href="/bilar" variant="outlineOnDark" size="lg">
                Se bilar i lager
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
