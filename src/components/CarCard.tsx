import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/types";
import { carTitle } from "@/lib/cars";
import { formatMileage, formatPrice } from "@/lib/format";

export function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  return (
    <article className="surface-carbon group relative flex min-w-0 flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:brightness-[1.15] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cognac has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page">
      <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
        <Image
          src={car.images[0]}
          alt={`${carTitle(car)} ${car.year}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="nums absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-pearl backdrop-blur-sm">
          {car.year}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-pearl">
          <Link
            href={`/bilar/${car.slug}`}
            className="rounded-sm outline-none focus-visible:shadow-none"
          >
            {/* Stretched link — makes the whole card clickable */}
            <span className="absolute inset-0" aria-hidden="true" />
            {carTitle(car)}
          </Link>
        </h3>
        {car.variant && (
          <p className="mt-0.5 truncate text-sm text-silver/80">{car.variant}</p>
        )}

        <ul className="nums mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-silver/70">
          <li>{formatMileage(car.mileageMil)}</li>
          <li aria-hidden="true" className="text-white/25">•</li>
          <li>{car.fuel}</li>
          <li aria-hidden="true" className="text-white/25">•</li>
          <li>{car.gearbox}</li>
        </ul>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <p className="nums font-display text-xl font-semibold whitespace-nowrap text-pearl">
            {formatPrice(car.priceSek)}
          </p>
          <span
            aria-hidden="true"
            className="shrink-0 text-sm font-medium text-silver transition-transform duration-300 group-hover:translate-x-1"
          >
            Se bilen →
          </span>
        </div>
      </div>
    </article>
  );
}
