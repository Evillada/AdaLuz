import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

const navigation = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/para-empresas", label: "Empresas" },
  { href: "/contacto", label: "Contacto" },
] as const;

type SiteHeaderProps = {
  whatsappE164: string;
  instagramUrl: string;
};

export function SiteHeader({
  whatsappE164,
  instagramUrl,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-ochre/15 bg-cream/70 backdrop-blur-md">
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
              className="text-bronze/80 transition-colors hover:text-ochre"
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
            className="hidden text-bronze/75 transition-colors hover:text-ochre md:inline"
          >
            Instagram
          </a>
          <WhatsAppLink
            e164={whatsappE164}
            label="WhatsApp"
            className="border-b border-ochre/40 pb-0.5 text-bronze transition-colors hover:border-ochre hover:text-ochre"
          />
        </div>
      </div>
    </header>
  );
}
