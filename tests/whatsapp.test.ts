import { describe, it, expect } from "vitest";
import {
  buildWhatsAppUrl,
  pageInquiryMessage,
  productInquiryMessage,
} from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds wa.me link", () => {
    expect(buildWhatsAppUrl("573113187927")).toBe("https://wa.me/573113187927");
  });
  it("appends encoded message", () => {
    expect(buildWhatsAppUrl("573113187927", "Hola Adaluz")).toBe(
      "https://wa.me/573113187927?text=Hola%20Adaluz",
    );
  });
});

describe("productInquiryMessage", () => {
  it("names the candle, its collection and links to it", () => {
    expect(
      productInquiryMessage("Luz de Ámbar", "Origen", "https://adaluz.co/productos/luz-de-ambar"),
    ).toBe(
      "Hola Adaluz, quiero saber la disponibilidad de la vela Luz de Ámbar de la colección Origen. https://adaluz.co/productos/luz-de-ambar",
    );
  });
});

describe("pageInquiryMessage", () => {
  const url = "https://adaluz.co/x";

  it("names the candle on a product page", () => {
    expect(pageInquiryMessage("/productos/luz-de-ambar", "Luz de Ámbar | Adaluz", url)).toBe(
      `Hola Adaluz, quiero saber la disponibilidad de la vela Luz de Ámbar. ${url}`,
    );
  });

  it("names the collection on a collection page", () => {
    expect(pageInquiryMessage("/colecciones/origen", "Origen | Adaluz", url)).toBe(
      `Hola Adaluz, quiero conocer las velas de la colección Origen. ${url}`,
    );
  });

  it("falls back to a general message elsewhere", () => {
    expect(pageInquiryMessage("/", "Adaluz | Velas artesanales", url)).toBe(
      "Hola Adaluz, quiero más información.",
    );
  });
});
