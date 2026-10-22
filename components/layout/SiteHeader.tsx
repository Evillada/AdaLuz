"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

const navigation = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/para-empresas", label: "Empresas" },
  { href: "/contacto", label: "Contacto" },
] as const;

const SCROLL_THRESHOLD = 24;

type SiteHeaderProps = {
  whatsappE164: string;
  instagramUrl: string;
};

export function SiteHeader({
  whatsappE164,
  instagramUrl,
}: SiteHeaderProps) {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const glass = !isHome || scrolled;

  return (
    <header
      data-glass={glass}
      className={`${isHome ? "fixed inset-x-0" : "sticky"} top-0 z-40 transition-[background-color,backdrop-filter] duration-500 ease-out ${
        glass
          ? "bg-[rgba(36,22,13,0.78)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4">
        <Link href="/" aria-label="Adaluz, inicio" className="shrink-0">
          <Logo variant="symbol" className="w-11" />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="order-3 flex w-full flex-wrap justify-center gap-x-7 gap-y-2 text-[0.8rem] tracking-[0.12em] uppercase sm:order-none sm:w-auto"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-cream/85 transition-colors hover:text-glow"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-cream/80 transition-colors hover:text-glow md:inline"
          >
            Instagram
          </a>
          <WhatsAppLink
            e164={whatsappE164}
            label="WhatsApp"
            className="border-b border-glow/60 pb-0.5 text-cream transition-colors hover:border-glow hover:text-glow"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-full h-16 bg-[linear-gradient(180deg,rgba(36,22,13,0.78)_0%,rgba(36,22,13,0.35)_40%,transparent_100%)] transition-opacity duration-500 ${
          glass ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
