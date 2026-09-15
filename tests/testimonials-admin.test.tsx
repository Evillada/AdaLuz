import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.hoisted(() => vi.fn());
const revalidatePublic = vi.hoisted(() => vi.fn());
const revalidatePath = vi.hoisted(() => vi.fn());
const testimonialCreate = vi.hoisted(() => vi.fn());
const testimonialUpdate = vi.hoisted(() => vi.fn());
const testimonialDelete = vi.hoisted(() => vi.fn());
const testimonialFindMany = vi.hoisted(() => vi.fn());

vi.mock("@/lib/session", () => ({ requireAdmin }));
vi.mock("@/lib/revalidate", () => ({ revalidatePublic }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("@/lib/db", () => ({
  prisma: {
    testimonial: {
      create: testimonialCreate,
      update: testimonialUpdate,
      delete: testimonialDelete,
      findMany: testimonialFindMany,
    },
  },
}));
vi.mock("@/components/admin/TestimonialForm", () => ({
  TestimonialForm: ({
    testimonial,
  }: {
    testimonial?: { id: string; author: string };
  }) => (
    <article data-testimonial-id={testimonial?.id}>
      {testimonial?.author ?? "Nuevo testimonio"}
    </article>
  ),
}));

import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/app/admin/testimonios/actions";
import TestimonialsAdminPage from "@/app/admin/testimonios/page";
import { TestimonialSchema } from "@/lib/validators/testimonial";

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

const values = {
  quote: "Una luz que transforma cada rincón.",
  author: "María P.",
  published: "on",
  sortOrder: "2",
};

describe("testimonial validator", () => {
  it("normalizes testimonial form values and checkbox defaults", () => {
    expect(TestimonialSchema.parse(values)).toEqual({
      quote: "Una luz que transforma cada rincón.",
      author: "María P.",
      published: true,
      sortOrder: 2,
    });
    expect(
      TestimonialSchema.parse({ ...values, published: undefined }).published,
    ).toBe(false);
  });

  it("rejects blank quotes and negative ordering", () => {
    const result = TestimonialSchema.safeParse({
      ...values,
      quote: " ",
      sortOrder: "-1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.quote).toBeDefined();
      expect(result.error.flatten().fieldErrors.sortOrder).toBeDefined();
    }
  });
});

describe("testimonial actions", () => {
  beforeEach(() => {
    requireAdmin.mockReset().mockResolvedValue({ user: { id: "admin" } });
    revalidatePublic.mockReset();
    revalidatePath.mockReset();
    testimonialCreate.mockReset().mockResolvedValue({ id: "testimonial-1" });
    testimonialUpdate.mockReset().mockResolvedValue({ id: "testimonial-1" });
    testimonialDelete.mockReset().mockResolvedValue({});
  });

  it("creates a validated testimonial and revalidates admin and public pages", async () => {
    await expect(
      createTestimonial(undefined, formData(values)),
    ).resolves.toEqual({
      ok: true,
      message: "Testimonio creado.",
    });

    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(testimonialCreate).toHaveBeenCalledWith({
      data: {
        quote: "Una luz que transforma cada rincón.",
        author: "María P.",
        published: true,
        sortOrder: 2,
      },
      select: { id: true },
    });
    expect(revalidatePublic).toHaveBeenCalledOnce();
    expect(revalidatePath).toHaveBeenCalledWith("/admin/testimonios");
  });

  it("updates and deletes testimonials by trusted bound ids", async () => {
    await updateTestimonial(
      "testimonial-1",
      undefined,
      formData({ ...values, published: "" }),
    );
    await deleteTestimonial("testimonial-1", undefined, new FormData());

    expect(testimonialUpdate).toHaveBeenCalledWith({
      where: { id: "testimonial-1" },
      data: expect.objectContaining({ published: false }),
      select: { id: true },
    });
    expect(testimonialDelete).toHaveBeenCalledWith({
      where: { id: "testimonial-1" },
    });
  });

  it("returns field errors without writing invalid data", async () => {
    const result = await createTestimonial(
      undefined,
      formData({ ...values, author: "" }),
    );

    expect(result).toMatchObject({
      ok: false,
      error: "Revisa los campos marcados.",
    });
    expect(testimonialCreate).not.toHaveBeenCalled();
  });
});

describe("testimonials admin page", () => {
  it("authorizes and lists testimonials in editorial order", async () => {
    testimonialFindMany.mockResolvedValue([
      {
        id: "testimonial-1",
        quote: values.quote,
        author: values.author,
        published: true,
        sortOrder: 2,
      },
    ]);

    const html = renderToStaticMarkup(await TestimonialsAdminPage());

    expect(requireAdmin).toHaveBeenCalled();
    expect(testimonialFindMany).toHaveBeenCalledWith({
      orderBy: [{ sortOrder: "asc" }, { author: "asc" }],
    });
    expect(html).toContain("Nuevo testimonio");
    expect(html).toContain("María P.");
  });
});
