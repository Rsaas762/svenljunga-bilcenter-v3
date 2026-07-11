import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LinkButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vanliga frågor",
  description:
    "Svar på det vi oftast får frågor om: inbyte, värdering, finansiering, garanti och hur det går till att köpa eller sälja bil hos Svenljunga Bilcenter.",
  openGraph: {
    title: "Vanliga frågor — Svenljunga Bilcenter",
    description:
      "Inbyte, värdering, finansiering och garanti — här är svaren på de vanligaste frågorna.",
  },
};

/**
 * Every answer is grounded in verified facts (site.ts / the dealership's
 * published positioning). Where details vary per car or per affär, the
 * answer says so and points to a human — never inventing specifics.
 */
const faqs = [
  {
    q: "Kan jag ta med min nuvarande bil i inbyte?",
    a: "Ja, gärna. Vi värderar din bil kostnadsfritt och räknar av värdet direkt mot priset på din nästa bil. Ta med registreringsbevis och samtliga nycklar när det blir affär, så går det smidigt.",
  },
  {
    q: "Vad kostar en värdering?",
    a: "Ingenting. Värderingen är alltid kostnadsfri och utan förpliktelser — du bestämmer själv om du vill gå vidare efter vårt besked.",
  },
  {
    q: "Köper ni alla bilmärken?",
    a: "Ja. Vi är märkesoberoende och köper, säljer och byter in bilar av alla märken.",
  },
  {
    q: "Hur går det till när jag säljer min bil till er?",
    a: "Du skickar in bilens uppgifter via formuläret på Sälj din bil — registreringsnumret räcker långt. Vi går igenom informationen, gör en första bedömning och återkommer med ett tydligt besked, normalt inom en arbetsdag. Blir det affär och du bor en bit bort hämtar vi bilen där den står.",
  },
  {
    q: "Erbjuder ni finansiering?",
    a: "Ja, genom vårt samarbete med Santander Consumer Bank. Vi hjälper dig med ansökan i butiken och du får besked om månadskostnad innan du bestämmer dig.",
  },
  {
    q: "Har bilarna garanti?",
    a: "Garantier på våra bilar tecknas via GarantiPartner. Exakt vad som gäller varierar mellan bilar, så vi går alltid igenom villkoren för just den bil du är intresserad av — innan köpet.",
  },
  {
    q: "Är bilarna genomgångna innan försäljning?",
    a: "Ja. Varje bil kontrolleras och rekonditioneras innan den ställs ut i hallen. Har du frågor om en specifik bils historik eller skick är det bara att fråga — vi svarar ärligt.",
  },
  {
    q: "Kan ni hjälpa mig hitta en bil ni inte har i lager?",
    a: "Ja. Berätta vad du söker via Hitta min bil så letar vi åt dig genom våra kanaler. Det kostar inget och du förbinder dig inte till något.",
  },
  {
    q: "Var finns ni och när har ni öppet?",
    a: `Du hittar oss på ${site.address.street} i ${site.address.city}. Vi har öppet ${site.hours[0].days.toLowerCase()} ${site.hours[0].time}, ${site.hours[1].days.toLowerCase()} ${site.hours[1].time} och ${site.hours[2].days.toLowerCase()} ${site.hours[2].time}. Ring gärna på ${site.phone} om du vill vara säker på att rätt person är på plats.`,
  },
] as const;

/** FAQPage structured data so the questions can surface in Google. */
function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function VanligaFragorPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHero
        eyebrow="Vanliga frågor"
        title="Frågor & svar"
        intro="Här har vi samlat det vi oftast får frågor om. Hittar du inte ditt svar? Ring oss — det går fortast så."
      />

      <section className="bg-carbon">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="space-y-3.5">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i, 4) * 70}>
                <details className="surface-plate group rounded-2xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h2 className="font-display text-[1.05rem] font-semibold leading-snug text-pearl">
                      {f.q}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="relative block h-4 w-4 shrink-0 text-silver transition-transform duration-300 group-open:rotate-45"
                    >
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <span
                      aria-hidden="true"
                      className="mb-4 block h-px w-9 bg-cognac"
                    />
                    <p className="text-[0.9375rem] leading-relaxed text-ink-3">
                      {f.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Closing pointer — the "har vi missat något?" move */}
          <Reveal delay={150}>
            <div className="mt-12 text-center">
              <h2 className="font-display text-[1.35rem] font-bold text-pearl">
                Har vi missat något?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Inga frågor är för små. Ring{" "}
                <a
                  href={site.phoneHref}
                  className="nums font-semibold text-silver hover:text-pearl"
                >
                  {site.phone}
                </a>{" "}
                eller skicka ett meddelande så svarar vi — normalt inom en
                arbetsdag.
              </p>
              <div className="mt-6">
                <LinkButton href="/kontakt" size="lg">
                  Kontakta oss
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
