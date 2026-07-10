import type { Metadata } from "next";
import { CarListing } from "@/components/CarListing";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { inStockCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Bilar i lager",
  description:
    "Se begagnade bilar i lager hos Svenljunga Bilcenter. Filtrera på märke, pris, årsmodell och drivmedel. Alla bilar genomgångna innan försäljning.",
  openGraph: {
    title: "Bilar i lager — Svenljunga Bilcenter",
    description:
      "Aktuella bilar i lager hos din lokala bilhandlare i Svenljunga.",
  },
};

export default function BilarPage() {
  return (
    <>
      <PageHero
        eyebrow="Lager"
        title="Bilar i lager"
        intro="Här hittar du aktuella bilar hos Svenljunga Bilcenter. Är du intresserad av en bil eller vill veta mer? Skicka en förfrågan så återkommer vi."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Reveal>
          <CarListing cars={inStockCars()} />
        </Reveal>
      </div>
    </>
  );
}
