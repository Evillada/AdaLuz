import type { Testimonial } from "@prisma/client";

import { onlyPublished } from "@/lib/data/published";
import { prisma } from "@/lib/db";

export async function listPublishedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return onlyPublished(testimonials);
}
