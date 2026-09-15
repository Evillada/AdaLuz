import type { MetadataRoute } from "next";

import { listPublishedCollections } from "@/lib/data/collections";
import { listAvailableProducts } from "@/lib/data/products";
import { absoluteUrl } from "@/lib/seo";

const staticPages = [
  "/",
  "/colecciones",
  "/nosotros",
  "/para-empresas",
  "/contacto",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([
    listPublishedCollections(),
    listAvailableProducts(),
  ]);

  return [
    ...staticPages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...collections.map((collection) => ({
      url: absoluteUrl(`/colecciones/${collection.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/productos/${product.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
