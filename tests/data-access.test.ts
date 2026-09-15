import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  siteSettings: {
    findUniqueOrThrow: vi.fn(),
  },
  pageSection: {
    findUnique: vi.fn(),
  },
  collection: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
  },
  product: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
  },
  testimonial: {
    findMany: vi.fn(),
  },
}));

vi.mock("@/lib/db", () => ({ prisma: db }));

import {
  getPublishedCollectionBySlug,
  listPublishedCollections,
} from "@/lib/data/collections";
import {
  getAvailableProductBySlug,
  listAvailableProducts,
} from "@/lib/data/products";
import { getSection } from "@/lib/data/sections";
import { getSiteSettings } from "@/lib/data/settings";
import { listPublishedTestimonials } from "@/lib/data/testimonials";

describe("public data access", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the singleton site settings record", async () => {
    const settings = {
      id: "default",
      phone: "3113187927",
      whatsappE164: "573113187927",
      instagramHandle: "@velasadaluz",
      instagramUrl: "https://instagram.com/velasadaluz",
      seoTitle: "Adaluz",
      seoDescription: "Velas artesanales",
      ogImage: null,
    };
    db.siteSettings.findUniqueOrThrow.mockResolvedValue(settings);

    await expect(getSiteSettings()).resolves.toEqual(settings);
    expect(db.siteSettings.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: "default" },
    });
  });

  it("returns a section by its unique content key", async () => {
    db.pageSection.findUnique.mockResolvedValue(null);

    await expect(getSection("home.hero")).resolves.toBeNull();
    expect(db.pageSection.findUnique).toHaveBeenCalledWith({
      where: { key: "home.hero" },
    });
  });

  it("lists only published collections in editorial order", async () => {
    db.collection.findMany.mockResolvedValue([]);

    await expect(listPublishedCollections()).resolves.toEqual([]);
    expect(db.collection.findMany).toHaveBeenCalledWith({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  });

  it("loads a published collection with only available products", async () => {
    db.collection.findFirst.mockResolvedValue(null);

    await expect(getPublishedCollectionBySlug("origen")).resolves.toBeNull();
    expect(db.collection.findFirst).toHaveBeenCalledWith({
      where: { slug: "origen", published: true },
      include: {
        products: {
          where: { available: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  });

  it("requires an available product with a published parent", async () => {
    db.product.findFirst.mockResolvedValue(null);

    await expect(getAvailableProductBySlug("luz-de-ambar")).resolves.toBeNull();
    expect(db.product.findFirst).toHaveBeenCalledWith({
      where: {
        slug: "luz-de-ambar",
        available: true,
        collection: { published: true },
      },
      include: { collection: true },
    });
  });

  it("lists only available products in published collections", async () => {
    db.product.findMany.mockResolvedValue([]);

    await expect(listAvailableProducts()).resolves.toEqual([]);
    expect(db.product.findMany).toHaveBeenCalledWith({
      where: {
        available: true,
        collection: { published: true },
      },
      orderBy: { sortOrder: "asc" },
    });
  });

  it("filters unpublished testimonials and keeps editorial order", async () => {
    db.testimonial.findMany.mockResolvedValue([
      {
        id: "published",
        quote: "Una luz hermosa",
        author: "Ana",
        published: true,
        sortOrder: 1,
      },
      {
        id: "draft",
        quote: "Aún no visible",
        author: "Eva",
        published: false,
        sortOrder: 2,
      },
    ]);

    await expect(listPublishedTestimonials()).resolves.toEqual([
      {
        id: "published",
        quote: "Una luz hermosa",
        author: "Ana",
        published: true,
        sortOrder: 1,
      },
    ]);
    expect(db.testimonial.findMany).toHaveBeenCalledWith({
      orderBy: { sortOrder: "asc" },
    });
  });
});
