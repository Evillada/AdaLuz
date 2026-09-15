import type { PageSection } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function getSection(key: string): Promise<PageSection | null> {
  return prisma.pageSection.findUnique({ where: { key } });
}
