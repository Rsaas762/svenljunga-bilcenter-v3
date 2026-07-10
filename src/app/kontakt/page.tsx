import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { hoursConfirmed, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta Svenljunga Bilcenter — Boråsvägen 16 i Svenljunga, 0325-124 12, info@svenljungabilcenter.se. Vi svarar normalt inom en arbetsdag.",
  openGraph: {
    title: "Kontakta Svenljunga Bilcenter",
    description: "Ring, mejla eller skicka ett meddelande — vi hjälper dig vidare.",
  },
};

/*
  Google's key-less iframe embed (maps.google.com…&output=embed) refuses to
  render in some browsers, so the map is a styled link-out card instead.
  To embed an interactive map later: share → "Bädda in en karta" on Google
  Maps for the dealership and paste the generated <iframe> here.
*/

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kontakta oss"
        intro="Har du frågor om en bil, vill sälja din bil eller letar efter något särskilt? Hör av dig så hjälper vi dig vidare."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact facts */}
          <div className="space-y-6">
            <Reveal>
              <div className="surface-plate rounded-2xl p-7">
                <h2 className="eyebrow text-brand">Ring eller mejla</h2>
                <a
                  href={site.phoneHref}
                  className="font-display mt-3 block text-2xl font-semibold text-ink hover:text-brand"
                >
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="mt-0.5 inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-silver"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="surface-plate rounded-2xl p-7">
                <h2 className="eyebrow text-brand">Besöksadress</h2>
                <address className="mt-3 text-sm not-italic leading-relaxed text-muted">
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </address>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex min-h-11 items-center text-sm font-medium text-silver underline-offset-4 hover:underline"
                >
                  Vägbeskrivning ↗
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="surface-plate rounded-2xl p-7">
                <h2 className="eyebrow text-brand">Öppettider</h2>
                {hoursConfirmed ? (
                  <dl className="mt-3 space-y-2 text-sm">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4">
                        <dt className="text-ink">{h.days}</dt>
                        <dd className="text-muted">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Ring oss gärna innan besök så ser vi till att rätt person
                    finns på plats och att bilen du är intresserad av är
                    framme.
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-carbon group relative block overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-125"
              >
                {/* stylized road motif */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 160"
                  className="absolute inset-0 h-full w-full opacity-[0.16]"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path
                    d="M-20 140 C 80 120, 120 60, 200 70 S 340 30, 420 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="26"
                  />
                  <path
                    d="M-20 140 C 80 120, 120 60, 200 70 S 340 30, 420 10"
                    fill="none"
                    stroke="#27252d"
                    strokeWidth="2.5"
                    strokeDasharray="10 12"
                  />
                </svg>
                <div className="relative">
                  <p className="eyebrow text-silver">Hitta hit</p>
                  <p className="font-display mt-2 text-xl font-semibold text-pearl">
                    {site.address.street}, {site.address.city}
                  </p>
                  <p className="mt-1 text-sm text-pearl/60">
                    Du hittar oss på Boråsvägen, mitt i Svenljunga.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 btn-machined rounded-full px-5 py-2.5 text-sm font-semibold text-[#20252a] transition hover:brightness-105">
                    Öppna i Google Maps
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Quick form */}
          <Reveal delay={100}>
            <div className="surface-plate-strong rounded-3xl p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Skicka ett meddelande
              </h2>
              <p className="mb-7 mt-2 text-sm text-muted">
                Tre fält, sen är det klart. Vi återkommer normalt inom en
                arbetsdag.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
