import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalogImage } from "@/components/catalog/CatalogImage";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { getAvailableProductBySlug } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export default async function ProductPage(
  props: PageProps<"/productos/[slug]">,
) {
  const { slug } = await props.params;
  const [product, settings] = await Promise.all([
    getAvailableProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <section className="px-6 py-24 sm:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-2 md:items-center">
        <CatalogImage imageUrl={product.imageUrl} className="aspect-square" />
        <div>
          <Link
            href={`/colecciones/${product.collection.slug}`}
            className="text-xs font-semibold tracking-[0.2em] text-ochre uppercase"
          >
            {product.collection.name}
          </Link>
          <h1 className="mt-5 font-serif text-5xl leading-none text-ochre sm:text-7xl">
            {product.name}
          </h1>
          <p className="mt-7 text-lg leading-8 text-bronze/80">
            {product.description}
          </p>
          <WhatsAppLink
            e164={settings.whatsappE164}
            label="Consultar disponibilidad"
            message={`Hola Adaluz, quiero información sobre ${product.name}.`}
            className="mt-10 inline-flex border-b border-ochre pb-1 text-sm font-semibold tracking-[0.14em] uppercase"
          />
        </div>
      </div>
    </section>
  );
}
