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
    title: "Velas para empresas | Adaluz",
    description:
      "Velas artesanales y regalos con intención para empresas, equipos, clientes, eventos y celebraciones en Colombia.",
    path: "/para-empresas",
  });
}

export default async function CorporatePage() {
  const [section, settings] = await Promise.all([
    getSection("corporate.intro"),
    getSiteSettings(),
  ]);

  return (
    <PublicPageIntro
      eyebrow="Para empresas"
      title={section?.title ?? "Regalos que dejan una luz encendida"}
      body={
        section?.body ??
        "Creamos detalles con intención para equipos, clientes y celebraciones. Pronto encontrarás aquí nuestras opciones de personalización y acompañamiento."
      }
      whatsappE164={settings.whatsappE164}
      whatsappMessage="Hola Adaluz, quiero cotizar regalos para una empresa."
    />
  );
}
