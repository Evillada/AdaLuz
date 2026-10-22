export function buildWhatsAppUrl(e164Digits: string, message?: string): string {
  const base = `https://wa.me/${e164Digits.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_INQUIRY_MESSAGE = "Hola Adaluz, quiero más información.";

export function productInquiryMessage(
  productName: string,
  collectionName: string,
  productUrl: string,
): string {
  return `Hola Adaluz, quiero saber la disponibilidad de la vela ${productName} de la colección ${collectionName}. ${productUrl}`;
}

/** Message for site-wide WhatsApp buttons, based on the page the visitor is on. */
export function pageInquiryMessage(pathname: string, documentTitle: string, pageUrl: string): string {
  const name = documentTitle.split(" | ")[0]?.trim();

  if (name && pathname.startsWith("/productos/")) {
    return `Hola Adaluz, quiero saber la disponibilidad de la vela ${name}. ${pageUrl}`;
  }

  if (name && pathname.startsWith("/colecciones/")) {
    return `Hola Adaluz, quiero conocer las velas de la colección ${name}. ${pageUrl}`;
  }

  return GENERAL_INQUIRY_MESSAGE;
}
