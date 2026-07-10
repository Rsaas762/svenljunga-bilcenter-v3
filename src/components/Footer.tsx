import Link from "next/link";
import { Logo } from "./Logo";
import { hoursConfirmed, navigation, site } from "@/lib/site";

const socialLinks = [
  {
    label: "Facebook",
    href: site.social.facebook,
    // simple glyph
    path: "M13.5 9H15V6.5h-1.9C11 6.5 10 7.7 10 9.6V11H8.5v2.5H10V19h2.5v-5.5h1.8l.4-2.5h-2.2V9.7c0-.5.2-.7.8-.7z",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 8.9A3.1 3.1 0 1 0 12 15.1 3.1 3.1 0 0 0 12 8.9zm0 5.1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15.6 6H8.4A2.4 2.4 0 0 0 6 8.4v7.2A2.4 2.4 0 0 0 8.4 18h7.2a2.4 2.4 0 0 0 2.4-2.4V8.4A2.4 2.4 0 0 0 15.6 6zm1.3 9.6c0 .7-.6 1.3-1.3 1.3H8.4c-.7 0-1.3-.6-1.3-1.3V8.4c0-.7.6-1.3 1.3-1.3h7.2c.7 0 1.3.6 1.3 1.3v7.2zm-1-6.9a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0z",
  },
];

export function Footer() {
  return (
    <footer className="bg-carbon border-t border-white/10 text-pearl">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-pearl/60">
              Din lokala, märkesoberoende bilhandlare i Svenljunga. Vi köper,
              säljer och rekonditionerar bilar av alla märken — tryggt,
              tydligt och personligt.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} på ${s.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-pearl/20 text-pearl/70 transition-colors hover:border-pearl/50 hover:text-pearl"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href={site.social.blocket}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center rounded-full border border-pearl/20 px-3.5 text-xs font-semibold text-pearl/70 transition-colors hover:border-pearl/50 hover:text-pearl"
              >
                Blocket-butik
              </a>
            </div>
          </div>

          <nav aria-label="Sidfotsmeny">
            <h2 className="eyebrow text-silver">Sidor</h2>
            <ul className="mt-3 space-y-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex py-1 text-sm text-pearl/70 transition-colors hover:text-pearl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-silver">Kontakt</h2>
            <ul className="mt-3 space-y-0.5 text-sm text-pearl/70">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex py-1 transition-colors hover:text-pearl"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="inline-flex py-1 transition-colors hover:text-pearl"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1">
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-silver">Öppettider</h2>
            {hoursConfirmed ? (
              <ul className="mt-4 space-y-2.5 text-sm text-pearl/70">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="text-pearl/50">{h.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-pearl/70">
                Ring gärna innan besök på{" "}
                <a
                  href={site.phoneHref}
                  className="text-pearl transition-colors hover:text-silver"
                >
                  {site.phone}
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-pearl/10 pt-6 text-xs text-pearl/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Alla rättigheter
            förbehållna.
          </p>
          <p>
            <span className="pulse-live mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-trust align-middle" />
            Svarar normalt inom en arbetsdag
          </p>
        </div>
      </div>
    </footer>
  );
}
