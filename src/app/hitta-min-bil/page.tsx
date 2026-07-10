import type { Metadata } from "next";
import { FindCarForm } from "@/components/forms/FindCarForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Hitta min bil",
  description:
    "Låt Svenljunga Bilcenter hitta din nästa bil. Berätta vad du söker — märke, budget och önskemål — så håller vi utkik och hör av oss när rätt bil dyker upp.",
  openGraph: {
    title: "Hitta min bil — Svenljunga Bilcenter",
    description:
      "Berätta vad du letar efter så hjälper vi dig hitta rätt bil.",
  },
};

const examples = [
  "”En automatkombi under 200 000 kr med dragkrok”",
  "”Liten och snål stadsbil till körkortsfärsk 18-åring”",
  "”SUV med hög sittposition, gärna hybrid, max 8 000 mil”",
];

export default function HittaMinBilPage() {
  return (
    <>
      <PageHero
        eyebrow="Vi håller utkik åt dig"
        title="Letar du efter en specifik bil?"
        intro="Berätta vad du söker, vilken budget du har och vilka önskemål som är viktigast. Vi hjälper dig hålla utkik efter rätt bil."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Så funkar det
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Hittar du inte rätt bil i vårt lager? Vi köper löpande in
                bilar och har ett brett kontaktnät i branschen. Beskriv vad
                du letar efter — så hör vi av oss när något som stämmer
                dyker upp, istället för att du ska behöva bevaka annonser
                varje kväll.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="surface-plate mt-8 rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Du behöver inte veta exakt modell
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Beskriv gärna behovet med egna ord, till exempel:
                </p>
                <ul className="mt-3 space-y-2 text-sm italic leading-relaxed text-ink/70">
                  {examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="surface-plate-strong rounded-3xl p-7 sm:p-9">
              <FindCarForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
