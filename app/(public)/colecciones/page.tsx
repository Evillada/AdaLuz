import type { Metadata } from "next";
import Link from "next/link";

import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogImage } from "@/components/catalog/CatalogImage";
import { PageTransition } from "@/components/motion/PageTransition";
import { bodyClass, eyebrowClass, textLinkClass } from "@/components/ui/styles";
import { listPublishedCollections } from "@/lib/data/collections";
import { getSiteSettings } from "@/lib/data/settings";
import { createPublicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPublicMetadata({
    settings,
    title: "Colecciones | Adaluz",
    description:
      "Descubre colecciones de velas artesanales creadas en Colombia para acompañar tus rituales, espacios y momentos.",
    path: "/colecciones",
  });
}

export default async function CollectionsPage() {
  const [collections, settings] = await Promise.all([
    listPublishedCollections(),
    getSiteSettings(),
  ]);

  return (
    <PageTransition>
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <p className={eyebrowClass}>Colecciones</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-7xl">
              Una luz para cada forma de vivir
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl ${bodyClass}`}>
              Aromas, atmósferas y objetos creados para acompañar tus rituales.
            </p>
          </div>

          <div className="mt-16">
            {collections.length === 0 ? (
              <CatalogEmptyState
                whatsappE164={settings.whatsappE164}
                message="Hola Adaluz, quiero conocer sus colecciones."
              />
            ) : (
              <div className="grid gap-14 text-center md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {collections.map((collection) => (
                  <article key={collection.id} className="group">
                    <CatalogImage
                      imageUrl={collection.coverImageUrl}
                      className="mx-auto aspect-[4/5] w-[min(70vw,18rem)] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <h2 className="mt-8 font-serif text-3xl text-ink">{collection.name}</h2>
                    <p className="mt-2 font-serif text-muted italic">{collection.tagline}</p>
                    <Link href={`/colecciones/${collection.slug}`} className={`mt-5 ${textLinkClass}`}>
                      Descubrir
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
