import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  e164: string;
  label?: string;
  message?: string;
  className?: string;
};

export function WhatsAppLink({
  e164,
  label = "Escribir por WhatsApp",
  message,
  className,
}: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl(e164, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
