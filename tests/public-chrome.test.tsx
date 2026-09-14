import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import PublicLayout from "@/app/(public)/layout";

describe("WhatsAppLink", () => {
  it("opens a message in a new secure tab", () => {
    const html = renderToStaticMarkup(
      <WhatsAppLink
        e164="+57 311 318 7927"
        message="Hola Adaluz"
        label="WhatsApp"
      />,
    );

    expect(html).toContain(
      'href="https://wa.me/573113187927?text=Hola%20Adaluz"',
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain(">WhatsApp</a>");
  });
});

describe("SiteHeader", () => {
  it("renders the home logo, public navigation, and WhatsApp link", () => {
    const html = renderToStaticMarkup(
      <SiteHeader
        whatsappE164="573113187927"
        instagramUrl="https://instagram.com/velasadaluz"
      />,
    );

    expect(html).toContain('href="/"');
    expect(html).toContain('href="/colecciones"');
    expect(html).toContain('href="/nosotros"');
    expect(html).toContain('href="/para-empresas"');
    expect(html).toContain('href="/contacto"');
    expect(html).toContain('href="https://wa.me/573113187927"');
  });
});

describe("SiteFooter", () => {
  it("renders the brand and contact defaults", () => {
    const html = renderToStaticMarkup(
      <SiteFooter
        whatsappE164="573113187927"
        phoneDisplay="3113187927"
        instagramHandle="@velasadaluz"
        instagramUrl="https://instagram.com/velasadaluz"
      />,
    );

    expect(html).toContain("WhatsApp · 3113187927");
    expect(html).toContain("@velasadaluz");
    expect(html).toContain('href="https://instagram.com/velasadaluz"');
    expect(html).toContain('href="https://wa.me/573113187927"');
  });
});

describe("PublicLayout", () => {
  it("wires public navigation and contact destinations", () => {
    const html = renderToStaticMarkup(
      <PublicLayout params={Promise.resolve({})}>
        <p>Contenido</p>
      </PublicLayout>,
    );

    expect(html).toContain('href="/colecciones"');
    expect(html).toContain('href="/nosotros"');
    expect(html).toContain('href="/para-empresas"');
    expect(html).toContain('href="/contacto"');
    expect(html).toContain('href="https://wa.me/573113187927"');
    expect(html).toContain('href="https://instagram.com/velasadaluz"');
  });
});
