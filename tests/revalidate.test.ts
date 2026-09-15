import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.hoisted(() => vi.fn());

vi.mock("next/cache", () => ({ revalidatePath }));

import { revalidatePublic } from "@/lib/revalidate";

describe("revalidatePublic", () => {
  beforeEach(() => {
    revalidatePath.mockClear();
  });

  it("invalidates every public content entry point", () => {
    revalidatePublic();

    expect(revalidatePath.mock.calls).toEqual([
      ["/"],
      ["/colecciones"],
      ["/nosotros"],
      ["/para-empresas"],
      ["/contacto"],
      ["/sitemap.xml"],
    ]);
  });
});
