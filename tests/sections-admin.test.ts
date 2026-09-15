import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.hoisted(() => vi.fn());
const update = vi.hoisted(() => vi.fn());
const revalidatePublic = vi.hoisted(() => vi.fn());

vi.mock("@/lib/session", () => ({ requireAdmin }));
vi.mock("@/lib/db", () => ({
  prisma: { pageSection: { update } },
}));
vi.mock("@/lib/revalidate", () => ({ revalidatePublic }));

import {
  saveSection,
  updateSection,
} from "@/app/admin/contenido/actions";
import { SectionSchema } from "@/lib/validators/section";

const validSection = {
  title: "La luz que acompaña tu vida",
  body: "Creamos velas para convertir lo cotidiano en ritual.",
  imageUrl: "",
  ctaLabel: "Encuentra tu luz",
  sortOrder: 0,
};

describe("SectionSchema", () => {
  it("normalizes optional empty values and numeric form values", () => {
    expect(
      SectionSchema.parse({
        ...validSection,
        ctaLabel: " ",
        sortOrder: "2",
      }),
    ).toEqual({
      ...validSection,
      imageUrl: undefined,
      ctaLabel: undefined,
      sortOrder: 2,
    });
  });

  it("rejects missing copy, invalid URLs, and non-integer ordering", () => {
    const result = SectionSchema.safeParse({
      ...validSection,
      title: " ",
      imageUrl: "not-a-url",
      sortOrder: "1.5",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
      expect(result.error.flatten().fieldErrors.imageUrl).toBeDefined();
      expect(result.error.flatten().fieldErrors.sortOrder).toBeDefined();
    }
  });

  it("accepts local upload paths from the admin uploader", () => {
    expect(
      SectionSchema.parse({
        ...validSection,
        imageUrl: "/uploads/a1b2c3d4-e5f6.webp",
      }).imageUrl,
    ).toBe("/uploads/a1b2c3d4-e5f6.webp");
  });
});

describe("section actions", () => {
  beforeEach(() => {
    requireAdmin.mockReset().mockResolvedValue({ user: { id: "admin" } });
    update.mockReset().mockResolvedValue({});
    revalidatePublic.mockReset();
  });

  it("authorizes, updates an existing section by id, and revalidates", async () => {
    await expect(updateSection("section-1", validSection)).resolves.toEqual({
      ok: true,
    });

    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledWith({
      where: { id: "section-1" },
      data: {
        ...validSection,
        imageUrl: null,
      },
    });
    expect(revalidatePublic).toHaveBeenCalledOnce();
  });

  it("returns field errors without writing invalid form data", async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      ...validSection,
      title: "",
      sortOrder: "invalid",
    })) {
      formData.set(key, String(value));
    }

    const result = await saveSection("section-1", undefined, formData);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors?.title).toBeDefined();
      expect(result.fieldErrors?.sortOrder).toBeDefined();
    }
    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(update).not.toHaveBeenCalled();
  });
});
