import type { Metadata } from "next";
import { Instrument_Sans, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Clean geometric-humanist display face for headings — confident and
// Scandinavian without the SaaS-generic feel of Inter/Geist.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Bilhandlare i Svenljunga. Vi hjälper dig köpa, sälja och hitta rätt bil — tryggt, tydligt och personligt.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
