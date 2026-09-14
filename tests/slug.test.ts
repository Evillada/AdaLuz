import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("normalizes Spanish text", () => {
    expect(slugify("Velas de Jazmín — Ritual")).toBe("velas-de-jazmin-ritual");
  });
});
