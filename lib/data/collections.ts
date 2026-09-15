import type { Collection, Product } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function listPublishedCollections(): Promise<Collection[]> {
  return prisma.collection.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublishedCollectionBySlug(
  slug: string,
): Promise<(Collection & { products: Product[] }) | null> {
  return prisma.collection.findFirst({
    where: { slug, published: true },
    include: {
      products: {
        where: { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}
