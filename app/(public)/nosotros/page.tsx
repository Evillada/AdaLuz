import { PublicPageIntro } from "@/components/layout/PublicPageIntro";
import { getSection } from "@/lib/data/sections";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export default async function AboutPage() {
  const [section, settings] = await Promise.all([
    getSection("about.intro"),
    getSiteSettings(),
  ]);

  return (
    <PublicPageIntro
      eyebrow="Nosotros"
      title={section?.title ?? "Creamos luz para darle presencia a la vida"}
      body={
        section?.body ??
        "Adaluz es un oficio hecho de aroma, materia y tiempo. Muy pronto compartiremos la historia completa de las manos y la intención detrás de cada vela."
      }
      whatsappE164={settings.whatsappE164}
      whatsappMessage="Hola Adaluz, quiero conocer más sobre la marca."
    />
  );
}
