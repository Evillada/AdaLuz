export function buildWhatsAppUrl(e164Digits: string, message?: string): string {
  const base = `https://wa.me/${e164Digits.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
