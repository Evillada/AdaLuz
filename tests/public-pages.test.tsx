import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import CollectionPage from "@/app/(public)/colecciones/[slug]/page";
import CollectionsPage from "@/app/(public)/colecciones/page";
import ContactPage from "@/app/(public)/contacto/page";
import Home from "@/app/(public)/page";
import CorporatePage from "@/app/(public)/para-empresas/page";
import ProductPage from "@/app/(public)/productos/[slug]/page";
import AboutPage from "@/app/(public)/nosotros/page";

describe("Home", () => {
  it("presents the seven-part brand story and future hero media stage", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('data-stage="hero-media"');
    expect(html.match(/<section/g)).toHaveLength(7);
    expect(html).toContain("La luz en la vida");
    expect(html).toContain("Colecciones");
    expect(html).toContain("Oficio");
    expect(html).toContain("Para quienes regalan luz");
    expect(html).toContain("Confianza");
    expect(html).toContain("Hagamos luz juntos");
    expect(html).toContain('href="/para-empresas"');
    expect(html).toContain('href="https://wa.me/573113187927');
  });
});

describe("Public route stubs", () => {
  it.each([
    ["colecciones", CollectionsPage],
    ["nosotros", AboutPage],
    ["para empresas", CorporatePage],
    ["contacto", ContactPage],
  ])("renders %s with an H1 and WhatsApp contact", (_route, Page) => {
    const html = renderToStaticMarkup(<Page />);

    expect(html).toContain("<h1");
    expect(html).toContain('href="https://wa.me/573113187927');
  });

  it("uses the collection slug in its placeholder", async () => {
    const page = await CollectionPage({
      params: Promise.resolve({ slug: "origen" }),
      searchParams: Promise.resolve({}),
    });
    const html = renderToStaticMarkup(page);

    expect(html).toContain("origen");
    expect(html).toContain("<h1");
  });

  it("uses the product slug in its placeholder", async () => {
    const page = await ProductPage({
      params: Promise.resolve({ slug: "luz-de-casa" }),
      searchParams: Promise.resolve({}),
    });
    const html = renderToStaticMarkup(page);

    expect(html).toContain("luz-de-casa");
    expect(html).toContain("<h1");
  });
});
