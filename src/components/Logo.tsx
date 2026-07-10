import Image from "next/image";
import Link from "next/link";

/**
 * The dealership's real logo (silver SB monogram + wordmark), sourced
 * from their site and keyed to a transparent background so it sits
 * cleanly on the dark graphite header/footer. Both call sites are dark,
 * which is what this silver artwork is designed for.
 */
export function Logo({ className = "" }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Svenljunga Bilcenter — till startsidan"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/sb-logo.png"
        alt="Svenljunga Bilcenter"
        width={1000}
        height={229}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
