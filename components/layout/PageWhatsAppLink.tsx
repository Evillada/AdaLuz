"use client";

import type { MouseEvent, ReactNode } from "react";

import { buildWhatsAppUrl, GENERAL_INQUIRY_MESSAGE, pageInquiryMessage } from "@/lib/whatsapp";

type PageWhatsAppLinkProps = {
  e164: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** WhatsApp link whose message names the candle or collection on the current page. */
export function PageWhatsAppLink({ e164, className, children, ...rest }: PageWhatsAppLinkProps) {
  // The page title is only final after navigation, so the message is built at tap time.
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = buildWhatsAppUrl(
      e164,
      pageInquiryMessage(location.pathname, document.title, location.href),
    );
  }

  return (
    <a
      href={buildWhatsAppUrl(e164, GENERAL_INQUIRY_MESSAGE)}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
