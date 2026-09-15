import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogImage } from "@/components/catalog/CatalogImage";
import { getPublishedCollectionBySlug } from "@/lib/data/collections";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export default async function CollectionPage(
  props: PageProps<"/colecciones/[slug]">,
) {
  const { slug } = await props.params;
  const [collection, settings] = await Promise.all([
    getPublishedCollectionBySlug(slug),
    getSiteSettings(),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <section className="px-6 py-24 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.24em] text-ochre uppercase">
          Colección
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-none text-ochre sm:text-7xl">
          {collection.name}
        </h1>
        <p className="mt-5 font-serif text-2xl text-bronze/80">
          {collection.tagline}
        </p>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-bronze/75">
          {collection.description}
        </p>

        <div className="mt-16">
          {collection.products.length === 0 ? (
            <CatalogEmptyState
              whatsappE164={settings.whatsappE164}
              message={`Hola Adaluz, quiero conocer la colección ${collection.name}.`}
            />
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {collection.products.map((product) => (
                <article key={product.id}>
                  <CatalogImage
                    imageUrl={product.imageUrl}
                    className="aspect-square"
                  />
                  <h2 className="mt-6 font-serif text-3xl text-ochre">
                    {product.name}
                  </h2>
                  <p className="mt-3 leading-7 text-bronze/75">
                    {product.description}
                  </p>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="mt-5 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.12em] uppercase"
                  >
                    Conocer
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
