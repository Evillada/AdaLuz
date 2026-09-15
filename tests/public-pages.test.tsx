import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const data = vi.hoisted(() => ({
  getSiteSettings: vi.fn(),
  getSection: vi.fn(),
  listPublishedCollections: vi.fn(),
  getPublishedCollectionBySlug: vi.fn(),
  getAvailableProductBySlug: vi.fn(),
  listPublishedTestimonials: vi.fn(),
}));

vi.mock("@/lib/data/settings", () => ({
  getSiteSettings: data.getSiteSettings,
}));
vi.mock("@/lib/data/sections", () => ({ getSection: data.getSection }));
vi.mock("@/lib/data/collections", () => ({
  listPublishedCollections: data.listPublishedCollections,
  getPublishedCollectionBySlug: data.getPublishedCollectionBySlug,
}));
vi.mock("@/lib/data/products", () => ({
  getAvailableProductBySlug: data.getAvailableProductBySlug,
}));
vi.mock("@/lib/data/testimonials", () => ({
  listPublishedTestimonials: data.listPublishedTestimonials,
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));

import CollectionPage from "@/app/(public)/colecciones/[slug]/page";
import CollectionsPage from "@/app/(public)/colecciones/page";
import ContactPage from "@/app/(public)/contacto/page";
import Home from "@/app/(public)/page";
import CorporatePage from "@/app/(public)/para-empresas/page";
import ProductPage from "@/app/(public)/productos/[slug]/page";
import AboutPage from "@/app/(public)/nosotros/page";

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

const collection = {
  id: "collection-1",
  slug: "origen",
  name: "Origen",
  tagline: "Volver al centro",
  description: "Notas cálidas para hacer espacio a la calma.",
  coverImageUrl: null,
  published: true,
  sortOrder: 0,
};

const homeSections = {
  "home.hero": {
    id: "hero",
    key: "home.hero",
    title: "Hero desde Postgres",
    body: "Historia principal desde la base de datos.",
    imageUrl: null,
    ctaLabel: "Encuentra tu luz",
    sortOrder: 0,
    updatedAt: new Date("2026-09-14"),
  },
  "home.value": {
    id: "value",
    key: "home.value",
    title: "Una llama cambia el tiempo",
    body: "Una pausa guardada en Postgres.",
    imageUrl: null,
    ctaLabel: null,
    sortOrder: 1,
    updatedAt: new Date("2026-09-14"),
  },
  "home.craft": {
    id: "craft",
    key: "home.craft",
    title: "Oficio desde Postgres",
    body: "Hechas en pequeños lotes.",
    imageUrl: null,
    ctaLabel: null,
    sortOrder: 2,
    updatedAt: new Date("2026-09-14"),
  },
  "home.gift": {
    id: "gift",
    key: "home.gift",
    title: "Regalos desde Postgres",
    body: "Detalles para equipos.",
    imageUrl: null,
    ctaLabel: "Conoce las opciones",
    sortOrder: 3,
    updatedAt: new Date("2026-09-14"),
  },
  "home.closing": {
    id: "closing",
    key: "home.closing",
    title: "Cierre desde Postgres",
    body: "Conversemos sobre tu momento.",
    imageUrl: null,
    ctaLabel: "Hablar con Adaluz",
    sortOrder: 4,
    updatedAt: new Date("2026-09-14"),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  data.getSiteSettings.mockResolvedValue(settings);
  data.getSection.mockImplementation(
    async (key: keyof typeof homeSections) => homeSections[key] ?? null,
  );
  data.listPublishedCollections.mockResolvedValue([collection]);
  data.listPublishedTestimonials.mockResolvedValue([
    {
      id: "testimonial-1",
      quote: "Testimonio desde Postgres",
      author: "Mariana · Medellín",
      published: true,
      sortOrder: 0,
    },
  ]);
});

describe("Home", () => {
  it("renders sections, collections, testimonials, and settings from data access", async () => {
    const html = renderToStaticMarkup(await Home());

    expect(html).toContain('data-stage="hero-media"');
    expect(html.match(/<section/g)).toHaveLength(7);
    expect(html).toContain("Hero desde Postgres");
    expect(html).toContain("Origen");
    expect(html).toContain("Testimonio desde Postgres");
    expect(html).toContain('href="https://wa.me/573113187927');
  });
});

describe("Public catalog", () => {
  it("shows a calm WhatsApp empty state when no collections are published", async () => {
    data.listPublishedCollections.mockResolvedValue([]);

    const html = renderToStaticMarkup(await CollectionsPage());

    expect(html).toContain("Próximamente");
    expect(html).toContain('href="https://wa.me/573113187927');
  });

  it("renders a published collection with available products and cream fallbacks", async () => {
    data.getPublishedCollectionBySlug.mockResolvedValue({
      ...collection,
      products: [
        {
          id: "product-1",
          collectionId: collection.id,
          slug: "luz-de-ambar",
          name: "Luz de Ámbar",
          description: "Una vela cálida.",
          imageUrl: null,
          available: true,
          sortOrder: 0,
        },
      ],
    });

    const html = renderToStaticMarkup(
      await CollectionPage({
        params: Promise.resolve({ slug: "origen" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(html).toContain("Origen");
    expect(html).toContain("Luz de Ámbar");
    expect(html).toContain('data-placeholder="cream"');
    expect(html).toContain('href="/productos/luz-de-ambar"');
  });

  it("404s for a missing or unpublished collection", async () => {
    data.getPublishedCollectionBySlug.mockResolvedValue(null);

    await expect(
      CollectionPage({
      params: Promise.resolve({ slug: "origen" }),
      searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrow("404");
  });

  it("renders an available product from a published collection", async () => {
    data.getAvailableProductBySlug.mockResolvedValue({
      id: "product-1",
      collectionId: collection.id,
      slug: "luz-de-ambar",
      name: "Luz de Ámbar",
      description: "Una vela cálida.",
      imageUrl: null,
      available: true,
      sortOrder: 0,
      collection,
    });

    const html = renderToStaticMarkup(
      await ProductPage({
        params: Promise.resolve({ slug: "luz-de-ambar" }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(html).toContain("Luz de Ámbar");
    expect(html).toContain("Origen");
    expect(html).toContain('data-placeholder="cream"');
  });
});

describe("Content pages", () => {
  it.each([
    ["nosotros", AboutPage],
    ["para empresas", CorporatePage],
    ["contacto", ContactPage],
  ])("renders %s with DB settings for contact", async (_route, Page) => {
    const html = renderToStaticMarkup(await Page());

    expect(html).toContain("<h1");
    expect(html).toContain('href="https://wa.me/573113187927');
  });
});
