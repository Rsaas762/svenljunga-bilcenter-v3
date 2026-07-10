import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { site } from "@/lib/site";

/**
 * The dealership's real partners (from svenljungabilcenter.se): Santander
 * financing, GarantiPartner warranties, Blocket marketplace. Logos are
 * grayscale by default — keeping the section calm and monochrome — and
 * bloom to full colour on hover/focus.
 */
type Partner = {
  name: string;
  role: string;
  src: string;
  /** intrinsic aspect for next/image */
  w: number;
  h: number;
  href?: string;
};

const partners: Partner[] = [
  {
    name: "Santander Consumer Bank",
    role: "Finansiering",
    src: "/partners/santander.png",
    w: 520,
    h: 292,
  },
  {
    name: "GarantiPartner",
    role: "Garanti",
    src: "/partners/garantipartner.png",
    w: 360,
    h: 360,
  },
  {
    name: "Blocket",
    role: "Vårt lager",
    src: "/partners/blocket.png",
    w: 520,
    h: 292,
    href: site.social.blocket,
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  const inner = (
    <>
      <span className="flex h-14 items-center justify-center">
        <Image
          src={partner.src}
          alt={partner.name}
          width={partner.w}
          height={partner.h}
          className="max-h-14 w-auto max-w-[150px] object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      </span>
      <span className="mt-4 block border-t border-white/10 pt-3 text-center">
        <span className="eyebrow block text-[0.62rem] text-brand">
          {partner.role}
        </span>
        <span className="mt-1 block text-sm font-medium text-ink">
          {partner.name}
        </span>
      </span>
    </>
  );

  const cls =
    "surface-plate group flex h-full flex-col justify-center rounded-2xl p-6";

  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} transition-transform duration-300 hover:-translate-y-1`}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Partners() {
  return (
    <section className="border-y border-white/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeader
          align="center"
          eyebrow="Trygghet hela vägen"
          title="Starka partners bakom varje affär"
          intro="Vi samarbetar med etablerade aktörer så att finansiering, garanti och ett uppdaterat lager finns på plats redan när du hittar rätt bil."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className="h-full">
              <PartnerCard partner={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
