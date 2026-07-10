import type { Metadata } from "next";
import { SellCarForm } from "@/components/forms/SellCarForm";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sälj din bil",
  description:
    "Sälj din bil tryggt och enkelt till Svenljunga Bilcenter. Fri värdering, vi köper alla bilmärken och hämtar bilen där den står. Snabbt svar utan förpliktelser.",
  openGraph: {
    title: "Sälj din bil — Svenljunga Bilcenter",
    description:
      "Fri värdering, snabbt svar. Vi köper bilar av alla märken och hämtar bilen där den står.",
  },
};

export default function SaljDinBilPage() {
  return (
    <>
      <PageHero
        eyebrow="Fri värdering · Vi hämtar bilen"
        title="Sälj din bil till oss"
        intro="Vi är märkesoberoende och köper bilar av alla märken. Fyll i uppgifterna om din bil så återkommer vi med en fri värdering — och blir det affär hämtar vi bilen där den står."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Så går det till
              </h2>
            </Reveal>
            <div className="mt-6">
              <ProcessSteps
                steps={[
                  {
                    title: "Skicka in bilens uppgifter",
                    body: "Formuläret tar ett par minuter. Registreringsnumret räcker långt.",
                  },
                  {
                    title: "Vi går igenom informationen",
                    body: "Vi tittar på uppgifterna och gör en första bedömning av bilens värde.",
                  },
                  {
                    title: "Vi kontaktar dig med nästa steg",
                    body: "Du får ett tydligt besked — och bestämmer själv om du vill gå vidare.",
                  },
                ]}
              />
            </div>
            <Reveal delay={200}>
              <div className="surface-plate mt-8 rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Bra att veta
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li>• Värderingen är kostnadsfri och utan förpliktelser.</li>
                  <li>• Vi är märkesoberoende och köper alla bilmärken.</li>
                  <li>• Vi hämtar upp bilen vid överenskommen plats.</li>
                  <li>
                    • Hellre prata direkt? Ring oss på{" "}
                    <a
                      href={site.phoneHref}
                      className="font-semibold text-silver underline decoration-white/30 underline-offset-2 transition-colors hover:text-cognac hover:decoration-cognac"
                    >
                      {site.phone}
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="surface-plate-strong rounded-3xl p-7 sm:p-9">
              <SellCarForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
