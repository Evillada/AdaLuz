import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.hoisted(() => vi.fn());
const findMany = vi.hoisted(() => vi.fn());

vi.mock("@/lib/session", () => ({ requireAdmin }));
vi.mock("@/lib/db", () => ({
  prisma: { pageSection: { findMany } },
}));
vi.mock("@/components/admin/SectionForm", () => ({
  SectionForm: ({ section }: { section: { id: string; key: string } }) => (
    <article data-section-id={section.id}>{section.key}</article>
  ),
}));

import ContentPage from "@/app/admin/contenido/page";

const sections = [
  {
    id: "hero",
    key: "home.hero",
    title: "Hero",
    body: "Historia",
    imageUrl: null,
    ctaLabel: "Ver más",
    sortOrder: 0,
    updatedAt: new Date("2026-09-14"),
  },
  {
    id: "value",
    key: "home.value",
    title: "Valor",
    body: "Pausa",
    imageUrl: null,
    ctaLabel: null,
    sortOrder: 1,
    updatedAt: new Date("2026-09-14"),
  },
];

describe("admin content page", () => {
  beforeEach(() => {
    requireAdmin.mockReset().mockResolvedValue({ user: { id: "admin" } });
    findMany.mockReset().mockResolvedValue(sections);
  });

  it("authorizes and lists existing sections in stable order", async () => {
    const html = renderToStaticMarkup(await ContentPage());

    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(findMany).toHaveBeenCalledWith({
      orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
    });
    expect(html).toContain("home.hero");
    expect(html).toContain("home.value");
    expect(html).not.toContain('name="key"');
  });
});
