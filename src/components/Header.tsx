"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { navigation } from "@/lib/site";

// Shorter desktop labels so the bar breathes (the "Sälj din bil" action
// lives in the machined CTA, so it's not repeated in the nav).
const desktopNav = [
  { href: "/", label: "Hem" },
  { href: "/bilar", label: "Bilar" },
  { href: "/hitta-min-bil", label: "Hitta bil" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const adminPreviewHref = "/admin-preview/integrationer";

/**
 * Always-dark header bar with the site's signature graphite gradient
 * (from svenljungabilcenter.se), so the silver-gradient logo sits on
 * its native backdrop exactly like the original artwork.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === adminPreviewHref) return pathname.startsWith("/admin-preview");
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header
      className={`bg-graphite-gradient fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-shadow duration-300 ${
        scrolled && !open ? "shadow-lg shadow-ink/25" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[4.75rem]">
        <Logo />

        {/* Desktop nav — short labels, generous spacing */}
        <nav aria-label="Huvudmeny" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-[0.9rem] font-medium underline-offset-8 transition-colors hover:text-white ${
                    isActive(item.href)
                      ? "text-white underline decoration-cognac decoration-2"
                      : "text-pearl/75 decoration-transparent hover:underline hover:decoration-cognac/40"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={adminPreviewHref}
                aria-current={isActive(adminPreviewHref) ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                  isActive(adminPreviewHref)
                    ? "border-cognac/60 bg-cognac/12 text-white"
                    : "border-white/15 bg-white/[0.04] text-pearl/80 hover:border-cognac/45 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cognac" aria-hidden="true" />
                <span>Admin</span>
                <span className="hidden rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[0.58rem] uppercase tracking-[0.12em] text-silver xl:inline">Preview</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/salj-din-bil"
            className="btn-machined rounded-full px-6 py-2.5 text-[0.9rem] font-semibold text-[#20252a] transition-[filter,transform,box-shadow] duration-200 hover:brightness-105"
          >
            Sälj din bil
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilmeny"
          aria-label={open ? "Stäng menyn" : "Öppna menyn"}
          className="relative z-50 flex h-11 w-11 items-center justify-center text-pearl lg:hidden"
        >
          <span className="sr-only">{open ? "Stäng" : "Meny"}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 rounded bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 rounded bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        id="mobilmeny"
        className={`bg-graphite-gradient-v fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Mobilmeny"
          className="flex h-full flex-col justify-center px-8"
        >
          <ul className="space-y-2">
            {navigation.map((item, i) => (
              <li
                key={item.href}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={`transition-[opacity,transform] duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-display block py-2 text-3xl font-medium tracking-tight ${
                    isActive(item.href) ? "text-silver" : "text-pearl"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              style={{ transitionDelay: open ? `${80 + navigation.length * 45}ms` : "0ms" }}
              className={`mt-4 border-t border-white/15 pt-4 transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href={adminPreviewHref}
                onClick={() => setOpen(false)}
                aria-current={isActive(adminPreviewHref) ? "page" : undefined}
                className={`font-display flex items-center gap-3 py-2 text-2xl font-medium tracking-tight ${
                  isActive(adminPreviewHref) ? "text-[#e8b58f]" : "text-pearl"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-cognac" aria-hidden="true" />
                <span>Admin</span>
                <span className="rounded-full border border-cognac/30 bg-cognac/10 px-2 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#e8b58f]">Preview</span>
              </Link>
            </li>
          </ul>
          <div
            className={`mt-10 border-t border-pearl/15 pt-8 transition-[opacity,transform] delay-300 duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/salj-din-bil"
              onClick={() => setOpen(false)}
              className="btn-machined inline-block rounded-full px-7 py-3.5 text-base font-semibold text-[#20252a]"
            >
              Sälj din bil — få en värdering
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
