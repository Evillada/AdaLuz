import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

type CatalogEmptyStateProps = {
  whatsappE164: string;
  message: string;
};

export function CatalogEmptyState({
  whatsappE164,
  message,
}: CatalogEmptyStateProps) {
  return (
    <div className="rounded-sm bg-glow/30 px-6 py-14 text-center">
      <h2 className="font-serif text-4xl text-ochre">Próximamente</h2>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-bronze/75">
        Estamos preparando nuevas luces con calma. Si quieres conocer lo que
        está disponible, conversemos.
      </p>
      <WhatsAppLink
        e164={whatsappE164}
        message={message}
        label="Hablar con Adaluz"
        className="mt-7 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.14em] uppercase"
      />
    </div>
  );
}
