import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogImage } from "@/components/catalog/CatalogImage";
import { PageTransition } from "@/components/motion/PageTransition";
import { bodyClass, eyebrowClass, textLinkClass } from "@/components/ui/styles";
import { getPublishedCollectionBySlug } from "@/lib/data/collections";
import { getSiteSettings } from "@/lib/data/settings";
import { createPublicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(
  props: PageProps<"/colecciones/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const [collection, settings] = await Promise.all([
    getPublishedCollectionBySlug(slug),
    getSiteSettings(),
  ]);

  if (!collection) {
    notFound();
  }

  return createPublicMetadata({
    settings,
    title: `${collection.name} | Adaluz`,
    description: collection.description,
    path: `/colecciones/${collection.slug}`,
    image: collection.coverImageUrl,
  });
}

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
    <PageTransition>
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <p className={eyebrowClass}>Colección</p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-7xl">
              {collection.name}
            </h1>
            <p className="mt-4 font-serif text-2xl text-muted italic">{collection.tagline}</p>
            <div className="gold-rule mx-auto mt-7" />
            <p className={`mx-auto mt-7 max-w-2xl ${bodyClass}`}>{collection.description}</p>
          </div>

          <div className="mt-16">
            {collection.products.length === 0 ? (
              <CatalogEmptyState
                whatsappE164={settings.whatsappE164}
                message={`Hola Adaluz, quiero conocer la colección ${collection.name}.`}
              />
            ) : (
              <div className="grid gap-14 text-center md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {collection.products.map((product) => (
                  <article key={product.id} className="group">
                    <CatalogImage
                      imageUrl={product.imageUrl}
                      className="mx-auto aspect-[4/5] w-[min(70vw,18rem)] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <h2 className="mt-8 font-serif text-3xl text-ink">{product.name}</h2>
                    <p className="mx-auto mt-3 max-w-sm leading-7 text-ink-soft">{product.description}</p>
                    <Link href={`/productos/${product.slug}`} className={`mt-5 ${textLinkClass}`}>
                      Conocer
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
