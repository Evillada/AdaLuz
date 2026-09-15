import type { Metadata } from "next";

import { PublicPageIntro } from "@/components/layout/PublicPageIntro";
import { getSection } from "@/lib/data/sections";
import { getSiteSettings } from "@/lib/data/settings";
import { createPublicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPublicMetadata({
    settings,
    title: "Nosotros | Adaluz",
    description:
      "Conoce el oficio, la intención y las manos detrás de las velas artesanales Adaluz, creadas en Colombia.",
    path: "/nosotros",
  });
}

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
