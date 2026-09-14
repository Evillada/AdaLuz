import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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
