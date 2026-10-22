import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalogImage } from "@/components/catalog/CatalogImage";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import { bodyClass, eyebrowClass, primaryButtonClass } from "@/components/ui/styles";
import { getAvailableProductBySlug } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";
import { absoluteUrl, createPublicMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const revalidate = 60;

export async function generateMetadata(
  props: PageProps<"/productos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const [product, settings] = await Promise.all([
    getAvailableProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  return createPublicMetadata({
    settings,
    title: `${product.name} | Adaluz`,
    description: product.description,
    path: `/productos/${product.slug}`,
    image: product.imageUrl,
  });
}

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
    <PageTransition>
      <section className="px-6 py-20 sm:py-28">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.imageUrl ?? undefined,
            url: absoluteUrl(`/productos/${product.slug}`),
            brand: {
              "@type": "Brand",
              name: "Adaluz",
            },
            category: product.collection.name,
            potentialAction: {
              "@type": "ContactAction",
              target: buildWhatsAppUrl(
                settings.whatsappE164,
                `Hola Adaluz, quiero información sobre ${product.name}.`,
              ),
            },
          }}
        />
        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 text-center md:grid-cols-2 md:gap-20 md:text-left">
          <CatalogImage
            imageUrl={product.imageUrl}
            className="mx-auto aspect-[4/5] w-[min(72vw,22rem)]"
          />
          <div>
            <Link href={`/colecciones/${product.collection.slug}`} className={eyebrowClass}>
              {product.collection.name}
            </Link>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
              {product.name}
            </h1>
            <div className="gold-rule mx-auto mt-7 md:mx-0" />
            <p className={`mt-7 ${bodyClass}`}>{product.description}</p>
            <WhatsAppLink
              e164={settings.whatsappE164}
              label="Consultar disponibilidad"
              message={`Hola Adaluz, quiero información sobre ${product.name}.`}
              className={`mt-10 ${primaryButtonClass}`}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
