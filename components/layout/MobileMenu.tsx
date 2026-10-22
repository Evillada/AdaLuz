"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigation } from "@/components/layout/navigation";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

type MobileMenuProps = {
  whatsappE164: string;
  instagramUrl: string;
};

export function MobileMenu({ whatsappE164, instagramUrl }: MobileMenuProps) {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn !== null && openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="flex h-10 w-10 items-center justify-center text-ink"
      >
        <span aria-hidden="true" className="relative block h-2.5 w-5">
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-gold-line/30 bg-paper px-6 pt-2 pb-8 shadow-[0_24px_40px_-30px_rgba(36,22,13,0.5)]"
        >
          <nav aria-label="Menú móvil" className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-gold-line/20 py-4 font-serif text-2xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <WhatsAppLink
              e164={whatsappE164}
              label="WhatsApp"
              className="border-b border-gold-line pb-0.5 text-ink"
            />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft"
            >
              Instagram
            </a>
          </div>
        </div>
      )}
    </>
  );
}
