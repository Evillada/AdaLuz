import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { primaryButtonClass } from "@/components/ui/styles";

type CatalogEmptyStateProps = {
  whatsappE164: string;
  message: string;
};

export function CatalogEmptyState({ whatsappE164, message }: CatalogEmptyStateProps) {
  return (
    <div className="rounded-[2rem] bg-surface px-6 py-14 text-center">
      <h2 className="font-serif text-4xl text-ink">Próximamente</h2>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-ink-soft">
        Estamos preparando nuevas luces con calma. Si quieres conocer lo que
        está disponible, conversemos.
      </p>
      <WhatsAppLink
        e164={whatsappE164}
        message={message}
        label="Hablar con Adaluz"
        className={`mt-8 ${primaryButtonClass}`}
      />
    </div>
  );
}
