import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { PageWhatsAppLink } from "@/components/layout/PageWhatsAppLink";

type SiteFooterProps = {
  whatsappE164: string;
  phoneDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
};

export function SiteFooter({
  whatsappE164,
  phoneDisplay,
  instagramHandle,
  instagramUrl,
}: SiteFooterProps) {
  return (
    <footer className="mt-auto bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" aria-label="Adaluz, inicio">
          <Logo variant="lockup" className="w-24" />
        </Link>
        <p className="max-w-xs font-serif text-lg leading-snug text-muted italic">
          Un toque de luz y de amor en cada rincón de tu casa.
        </p>
        <div className="flex flex-col gap-3 text-sm tracking-wide text-ink-soft">
          <PageWhatsAppLink e164={whatsappE164} className="transition-colors hover:text-gold-ink">
            {`WhatsApp · ${phoneDisplay}`}
          </PageWhatsAppLink>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold-ink"
          >
            {instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
