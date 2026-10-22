import type { Metadata } from "next";

import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";
import { CollectionsTeaserSection } from "@/components/home/CollectionsTeaserSection";
import { EssenceSection } from "@/components/home/EssenceSection";
import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { TrustSection } from "@/components/home/TrustSection";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedCollections } from "@/lib/data/collections";
import { getSection } from "@/lib/data/sections";
import { getSiteSettings } from "@/lib/data/settings";
import { listPublishedTestimonials } from "@/lib/data/testimonials";
import { createPublicMetadata, getSiteUrl } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPublicMetadata({
    settings,
    title: settings.seoTitle,
    description: settings.seoDescription,
    path: "/",
  });
}

export default async function Home() {
  const [
    settings,
    hero,
    value,
    collectionsSection,
    craft,
    gift,
    trust,
    closing,
    collections,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getSection("home.hero"),
    getSection("home.value"),
    getSection("home.collections"),
    getSection("home.craft"),
    getSection("home.gift"),
    getSection("home.trust"),
    getSection("home.closing"),
    listPublishedCollections(),
    listPublishedTestimonials(),
  ]);

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Adaluz",
          url: getSiteUrl(),
          description: settings.seoDescription,
          logo: settings.ogImage ?? undefined,
          sameAs: [settings.instagramUrl],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: `+${settings.whatsappE164}`,
            contactType: "customer service",
            availableLanguage: "Spanish",
          },
        }}
      />
      <HeroSection
        title={hero?.title ?? "La luz que acompaña tu vida"}
        slogan="En Adaluz nos encanta que cada rincón de tu casa tenga un toque de luz y de amor."
        body={
          hero?.body ??
          "Creamos velas para convertir lo cotidiano en ritual y guardar en la memoria aquello que merece permanecer."
        }
        imageUrl={hero?.imageUrl ?? undefined}
        primaryCta={{ label: "Ver las velas", href: "/colecciones" }}
        whatsapp={{
          e164: settings.whatsappE164,
          label: "Escríbenos por WhatsApp",
          message: "Hola Adaluz, quiero encontrar una vela para mi ritual.",
        }}
      />
      <EssenceSection
        eyebrow="Nuestra esencia"
        title={value?.title ?? "Amor hecho luz"}
        body={
          value?.body ??
          "Cada vela nace de un gesto de cariño: hacia ti, hacia tu casa o hacia alguien que quieres."
        }
      />
      <CollectionsTeaserSection
        eyebrow="Colecciones"
        title={collectionsSection?.title ?? "Elige tu luz"}
        body={
          collectionsSection?.body ??
          "Cada colección interpreta una manera de sentir la luz: serena, cercana o celebratoria."
        }
        items={collections.map((collection) => ({
          title: collection.name,
          body: collection.tagline,
          imageUrl: collection.coverImageUrl ?? undefined,
          href: `/colecciones/${collection.slug}`,
        }))}
        cta={{ label: "Ver todas las colecciones", href: "/colecciones" }}
      />
      <StorySection
        eyebrow="Oficio"
        title={craft?.title ?? "Hechas despacio, para encenderse sin prisa"}
        body={
          craft?.body ??
          "Trabajamos cada vela en pequeños lotes, cuidando la mezcla, el aroma y el acabado. La mano detrás del objeto también hace parte de su luz."
        }
        imageUrl={craft?.imageUrl ?? undefined}
      />
      <StorySection
        reverse
        eyebrow="Regalos y empresas"
        title={gift?.title ?? "Para quienes regalan luz"}
        body={
          gift?.body ??
          "Creamos obsequios para equipos, clientes y celebraciones que quieren decir algo verdadero: gracias, bienvenidos, seguimos juntos."
        }
        imageUrl={gift?.imageUrl ?? undefined}
        cta={{
          label: gift?.ctaLabel ?? "Conoce las opciones para empresas",
          href: "/para-empresas",
        }}
      />
      <TrustSection
        eyebrow="Experiencia Adaluz"
        title={trust?.title ?? "Luz que permanece en la memoria"}
        body={
          trust?.body ??
          "Historias de personas que eligieron Adaluz para acompañar momentos importantes."
        }
        testimonials={testimonials.map((testimonial) => ({
          quote: testimonial.quote,
          attribution: testimonial.author,
        }))}
      />
      <ClosingCtaSection
        title={closing?.title ?? "Hagamos luz juntos"}
        body={
          closing?.body ??
          "Cuéntanos qué momento quieres acompañar y te ayudaremos a encontrar la vela indicada."
        }
        cta={{
          e164: settings.whatsappE164,
          label: closing?.ctaLabel ?? "Escríbenos",
          message: "Hola Adaluz, quiero elegir una vela.",
        }}
      />
    </PageTransition>
  );
}
