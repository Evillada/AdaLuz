import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

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
    <footer className="mt-auto border-t border-ochre/20 bg-bronze text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-10 text-center sm:flex-row sm:text-left">
        <Link href="/" aria-label="Adaluz, inicio">
          <Logo variant="lockup" className="w-24 brightness-0 invert" />
        </Link>

        <div className="flex flex-col gap-2 text-sm">
          <WhatsAppLink
            e164={whatsappE164}
            label={phoneDisplay}
            className="transition-colors hover:text-glow"
          />
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-glow"
          >
            {instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
