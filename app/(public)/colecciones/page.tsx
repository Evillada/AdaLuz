import type { Metadata } from "next";
import Link from "next/link";

import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogImage } from "@/components/catalog/CatalogImage";
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
    <section className="band-cream section-blend px-6 py-24 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.24em] text-ochre uppercase">
          Colecciones
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-none text-ochre sm:text-7xl">
          Una luz para cada forma de vivir
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-bronze/80">
          Aromas, atmósferas y objetos creados para acompañar tus rituales.
        </p>

        <div className="mt-16">
          {collections.length === 0 ? (
            <CatalogEmptyState
              whatsappE164={settings.whatsappE164}
              message="Hola Adaluz, quiero conocer sus colecciones."
            />
          ) : (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {collections.map((collection) => (
                <article key={collection.id} className="group">
                  <CatalogImage
                    imageUrl={collection.coverImageUrl}
                    className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <h2 className="mt-7 font-serif text-3xl text-ochre">
                    {collection.name}
                  </h2>
                  <p className="mt-2 text-bronze/75">{collection.tagline}</p>
                  <Link
                    href={`/colecciones/${collection.slug}`}
                    className="mt-5 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.12em] uppercase"
                  >
                    Descubrir
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
