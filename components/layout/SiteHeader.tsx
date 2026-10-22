import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PageWhatsAppLink } from "@/components/layout/PageWhatsAppLink";

type SiteHeaderProps = {
  whatsappE164: string;
  instagramUrl: string;
};

export function SiteHeader({ whatsappE164, instagramUrl }: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" aria-label="Adaluz, inicio" className="shrink-0">
          <Logo variant="symbol" className="w-9" />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 text-[0.75rem] tracking-[0.18em] uppercase md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft transition-colors hover:text-gold-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 text-sm md:flex">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft transition-colors hover:text-gold-ink"
          >
            Instagram
          </a>
          <PageWhatsAppLink
            e164={whatsappE164}
            className="border-b border-gold-line pb-0.5 text-ink transition-colors hover:text-gold-ink"
          >
            WhatsApp
          </PageWhatsAppLink>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu whatsappE164={whatsappE164} instagramUrl={instagramUrl} />
        </div>
      </div>
    </header>
  );
}
