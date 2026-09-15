import type { Collection, Product } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function getAvailableProductBySlug(
  slug: string,
): Promise<(Product & { collection: Collection }) | null> {
  return prisma.product.findFirst({
    where: {
      slug,
      available: true,
      collection: { published: true },
    },
    include: { collection: true },
  });
}
