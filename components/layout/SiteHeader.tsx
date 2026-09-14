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
    <header className="border-b border-ochre/20 bg-cream/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4">
        <Link href="/" aria-label="Adaluz, inicio" className="shrink-0">
          <Logo variant="symbol" className="w-10" />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="order-3 flex w-full flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:order-none sm:w-auto"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ochre"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition-colors hover:text-ochre md:inline"
          >
            Instagram
          </a>
          <WhatsAppLink
            e164={whatsappE164}
            label="WhatsApp"
            className="border-b border-ochre/50 transition-colors hover:text-ochre"
          />
        </div>
      </div>
    </header>
  );
}
