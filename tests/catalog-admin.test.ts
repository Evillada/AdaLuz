import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.hoisted(() => vi.fn());
const revalidatePublic = vi.hoisted(() => vi.fn());
const revalidatePath = vi.hoisted(() => vi.fn());
const collectionCreate = vi.hoisted(() => vi.fn());
const collectionUpdate = vi.hoisted(() => vi.fn());
const collectionDelete = vi.hoisted(() => vi.fn());
const productCreate = vi.hoisted(() => vi.fn());
const productUpdate = vi.hoisted(() => vi.fn());
const productDelete = vi.hoisted(() => vi.fn());

vi.mock("@/lib/session", () => ({ requireAdmin }));
vi.mock("@/lib/revalidate", () => ({ revalidatePublic }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("@/lib/db", () => ({
  prisma: {
    collection: {
      create: collectionCreate,
      update: collectionUpdate,
      delete: collectionDelete,
    },
    product: {
      create: productCreate,
      update: productUpdate,
      delete: productDelete,
    },
  },
}));

import {
  createCollection,
  createProduct,
  deleteCollection,
  deleteProduct,
  updateCollection,
  updateProduct,
} from "@/app/admin/colecciones/actions";
import { CollectionSchema } from "@/lib/validators/collection";
import { ProductSchema } from "@/lib/validators/product";

function formData(values: Record<string, string>): FormData {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

const collectionValues = {
  name: "Luz de Luna",
  slug: "",
  tagline: "Calma para tu hogar",
  description: "Una colección inspirada en noches tranquilas.",
  coverImageUrl: "",
  published: "on",
  sortOrder: "2",
};

const productValues = {
  name: "Vela Lunar",
  slug: "",
  description: "Aroma floral y sereno.",
  imageUrl: "",
  available: "on",
  sortOrder: "1",
};

describe("catalog validators", () => {
  it("normalizes collection form values", () => {
    expect(CollectionSchema.parse(collectionValues)).toEqual({
      name: "Luz de Luna",
      slug: undefined,
      tagline: "Calma para tu hogar",
      description: "Una colección inspirada en noches tranquilas.",
      coverImageUrl: undefined,
      published: true,
      sortOrder: 2,
    });
  });

  it("validates product slugs and checkbox defaults", () => {
    const result = ProductSchema.safeParse({
      ...productValues,
      slug: "Slug inválido",
      available: undefined,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.slug).toBeDefined();
    }
    expect(
      ProductSchema.parse({ ...productValues, available: undefined }).available,
    ).toBe(false);
  });
});

describe("catalog actions", () => {
  beforeEach(() => {
    requireAdmin.mockReset().mockResolvedValue({ user: { id: "admin" } });
    revalidatePublic.mockReset();
    revalidatePath.mockReset();
    collectionCreate.mockReset().mockResolvedValue({
      id: "collection-1",
      slug: "luz-de-luna",
    });
    collectionUpdate.mockReset().mockResolvedValue({
      id: "collection-1",
      slug: "luz-de-luna",
    });
    collectionDelete.mockReset().mockResolvedValue({});
    productCreate.mockReset().mockResolvedValue({
      id: "product-1",
      slug: "vela-lunar",
    });
    productUpdate.mockReset().mockResolvedValue({
      id: "product-1",
      slug: "vela-lunar",
    });
    productDelete.mockReset().mockResolvedValue({});
  });

  it("creates a collection with a generated slug and revalidates", async () => {
    await expect(
      createCollection(undefined, formData(collectionValues)),
    ).resolves.toMatchObject({ ok: true });

    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(collectionCreate).toHaveBeenCalledWith({
      data: {
        name: "Luz de Luna",
        slug: "luz-de-luna",
        tagline: "Calma para tu hogar",
        description: "Una colección inspirada en noches tranquilas.",
        coverImageUrl: null,
        published: true,
        sortOrder: 2,
      },
      select: { id: true, slug: true },
    });
    expect(revalidatePublic).toHaveBeenCalledOnce();
  });

  it("surfaces duplicate collection slugs in Spanish", async () => {
    collectionCreate.mockRejectedValue({ code: "P2002" });

    const result = await createCollection(
      undefined,
      formData({ ...collectionValues, slug: "luz-especial" }),
    );

    expect(result).toEqual({
      ok: false,
      error: "Ya existe una colección con ese slug.",
    });
  });

  it("updates and deletes collections by trusted bound ids", async () => {
    await updateCollection(
      "collection-1",
      undefined,
      formData({ ...collectionValues, slug: "luz-renovada" }),
    );
    await deleteCollection("collection-1", undefined, new FormData());

    expect(collectionUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "collection-1" } }),
    );
    expect(collectionDelete).toHaveBeenCalledWith({
      where: { id: "collection-1" },
    });
  });

  it("creates, updates, and deletes products", async () => {
    await createProduct(
      "collection-1",
      undefined,
      formData(productValues),
    );
    await updateProduct(
      "product-1",
      undefined,
      formData({ ...productValues, slug: "vela-renovada" }),
    );
    await deleteProduct("product-1", undefined, new FormData());

    expect(productCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        collectionId: "collection-1",
        slug: "vela-lunar",
      }),
      select: { id: true, slug: true },
    });
    expect(productUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "product-1" } }),
    );
    expect(productDelete).toHaveBeenCalledWith({
      where: { id: "product-1" },
    });
  });
});
