import { PublicPageIntro } from "@/components/layout/PublicPageIntro";
import { getSection } from "@/lib/data/sections";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export default async function ContactPage() {
  const [section, settings] = await Promise.all([
    getSection("contact.intro"),
    getSiteSettings(),
  ]);

  return (
    <PublicPageIntro
      eyebrow="Contacto"
      title={section?.title ?? "Conversemos sobre la luz que buscas"}
      body={
        section?.body ??
        "Si quieres elegir una vela, preparar un regalo o explorar una colaboración, estamos al otro lado de WhatsApp."
      }
      whatsappE164={settings.whatsappE164}
      whatsappMessage="Hola Adaluz, quisiera conversar con ustedes."
    />
  );
}
