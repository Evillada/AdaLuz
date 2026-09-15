import type { SiteSettings } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function getSiteSettings(): Promise<SiteSettings> {
  return prisma.siteSettings.findUniqueOrThrow({
    where: { id: "default" },
  });
}
