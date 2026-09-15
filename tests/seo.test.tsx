import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const data = vi.hoisted(() => ({
  getSiteSettings: vi.fn(),
  getPublishedCollectionBySlug: vi.fn(),
  getAvailableProductBySlug: vi.fn(),
  listPublishedCollections: vi.fn(),
  listAvailableProducts: vi.fn(),
  getSection: vi.fn(),
  listPublishedTestimonials: vi.fn(),
}));

vi.mock("@/lib/data/settings", () => ({
  getSiteSettings: data.getSiteSettings,
}));
vi.mock("@/lib/data/collections", () => ({
  getPublishedCollectionBySlug: data.getPublishedCollectionBySlug,
  listPublishedCollections: data.listPublishedCollections,
}));
vi.mock("@/lib/data/products", () => ({
  getAvailableProductBySlug: data.getAvailableProductBySlug,
  listAvailableProducts: data.listAvailableProducts,
}));
vi.mock("@/lib/data/sections", () => ({ getSection: data.getSection }));
vi.mock("@/lib/data/testimonials", () => ({
  listPublishedTestimonials: data.listPublishedTestimonials,
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));

import { generateMetadata as generateCollectionMetadata } from "@/app/(public)/colecciones/[slug]/page";
import { generateMetadata as generateCollectionsMetadata } from "@/app/(public)/colecciones/page";
import { generateMetadata as generateContactMetadata } from "@/app/(public)/contacto/page";
import Home, {
  generateMetadata as generateHomeMetadata,
} from "@/app/(public)/page";
import { generateMetadata as generateCorporateMetadata } from "@/app/(public)/para-empresas/page";
import ProductPage, {
  generateMetadata as generateProductMetadata,
} from "@/app/(public)/productos/[slug]/page";
import { generateMetadata as generateAboutMetadata } from "@/app/(public)/nosotros/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { JsonLd } from "@/components/seo/JsonLd";

const settings = {
  id: "default",
  phone: "3113187927",
  whatsappE164: "573113187927",
  instagramHandle: "@velasadaluz",
  instagramUrl: "https://instagram.com/velasadaluz",
  seoTitle: "Adaluz | Velas artesanales en Colombia",
  seoDescription: "Velas artesanales creadas en Colombia.",
  ogImage: "https://cdn.example.com/adaluz-og.jpg",
};

const collection = {
  id: "collection-1",
  slug: "origen",
  name: "Origen",
  tagline: "Volver al centro",
  description: "Notas cálidas para hacer espacio a la calma.",
  coverImageUrl: "https://cdn.example.com/origen.jpg",
  published: true,
  sortOrder: 0,
};

const product = {
  id: "product-1",
  collectionId: collection.id,
  slug: "luz-de-ambar",
  name: "Luz de Ámbar",
  description: "Una vela cálida para cerrar el día con calma.",
  imageUrl: "https://cdn.example.com/ambar.jpg",
  available: true,
  sortOrder: 0,
  collection,
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://adaluz.co/");
  data.getSiteSettings.mockResolvedValue(settings);
  data.getPublishedCollectionBySlug.mockResolvedValue(collection);
  data.getAvailableProductBySlug.mockResolvedValue(product);
  data.listPublishedCollections.mockResolvedValue([collection]);
  data.listAvailableProducts.mockResolvedValue([product]);
  data.getSection.mockResolvedValue(null);
  data.listPublishedTestimonials.mockResolvedValue([]);
});

describe("public metadata", () => {
  it("uses site settings for home metadata and its Open Graph image", async () => {
    const metadata = await generateHomeMetadata();

    expect(metadata.title).toEqual({ absolute: settings.seoTitle });
    expect(metadata.description).toBe(settings.seoDescription);
    expect(metadata.openGraph).toMatchObject({
      locale: "es_CO",
      title: settings.seoTitle,
      images: [settings.ogImage],
    });
  });

  it("uses the brand sheet when no Open Graph image is configured", async () => {
    data.getSiteSettings.mockResolvedValue({ ...settings, ogImage: null });

    const metadata = await generateHomeMetadata();

    expect(metadata.openGraph).toMatchObject({
      images: ["/brand/adaluz-brand-sheet.png"],
    });
  });

  it("gives every static public route a unique Spanish title", async () => {
    const metadata = await Promise.all([
      generateCollectionsMetadata(),
      generateAboutMetadata(),
      generateCorporateMetadata(),
      generateContactMetadata(),
    ]);

    expect(metadata.map(({ title }) => title)).toEqual([
      { absolute: "Colecciones | Adaluz" },
      { absolute: "Nosotros | Adaluz" },
      { absolute: "Velas para empresas | Adaluz" },
      { absolute: "Contacto | Adaluz" },
    ]);
    expect(new Set(metadata.map(({ description }) => description)).size).toBe(4);
  });

  it("uses collection and product fields for entity metadata", async () => {
    const collectionMetadata = await generateCollectionMetadata({
      params: Promise.resolve({ slug: collection.slug }),
      searchParams: Promise.resolve({}),
    });
    const productMetadata = await generateProductMetadata({
      params: Promise.resolve({ slug: product.slug }),
      searchParams: Promise.resolve({}),
    });

    expect(collectionMetadata).toMatchObject({
      title: { absolute: "Origen | Adaluz" },
      description: collection.description,
      openGraph: { images: [collection.coverImageUrl] },
    });
    expect(productMetadata).toMatchObject({
      title: { absolute: "Luz de Ámbar | Adaluz" },
      description: product.description,
      openGraph: { images: [product.imageUrl] },
    });
  });
});

describe("crawl discovery", () => {
  it("builds robots.txt from the public site URL", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://adaluz.co/sitemap.xml",
    });
  });

  it("lists static pages, published collections, and available products", async () => {
    const entries = await sitemap();
    const urls = entries.map(({ url }) => url);

    expect(urls).toEqual([
      "https://adaluz.co",
      "https://adaluz.co/colecciones",
      "https://adaluz.co/nosotros",
      "https://adaluz.co/para-empresas",
      "https://adaluz.co/contacto",
      "https://adaluz.co/colecciones/origen",
      "https://adaluz.co/productos/luz-de-ambar",
    ]);
    expect(data.listPublishedCollections).toHaveBeenCalledOnce();
    expect(data.listAvailableProducts).toHaveBeenCalledOnce();
  });
});

describe("JsonLd", () => {
  it("escapes HTML-significant content in structured data", () => {
    const html = renderToStaticMarkup(
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "</script><script>alert(1)</script>",
        }}
      />,
    );

    expect(html).not.toContain("</script><script>");
    expect(html).toContain("\\u003c/script>");
  });

  it("renders Organization data on home and Product data without offers", async () => {
    const homeHtml = renderToStaticMarkup(await Home());
    const productHtml = renderToStaticMarkup(
      await ProductPage({
        params: Promise.resolve({ slug: product.slug }),
        searchParams: Promise.resolve({}),
      }),
    );

    expect(homeHtml).toContain('"@type":"Organization"');
    expect(productHtml).toContain('"@type":"Product"');
    expect(productHtml).toContain('"@type":"ContactAction"');
    expect(productHtml).not.toContain('"offers"');
  });
});
