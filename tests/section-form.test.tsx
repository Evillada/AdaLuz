// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/admin/contenido/actions", () => ({
  saveSection: vi.fn(),
}));

import { SectionForm } from "@/components/admin/SectionForm";

const reactTestEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean;
};
reactTestEnvironment.IS_REACT_ACT_ENVIRONMENT = true;

const section = {
  id: "hero",
  key: "home.hero",
  title: "La luz que acompaña tu vida",
  body: "Creamos velas para convertir lo cotidiano en ritual.",
  imageUrl: "https://example.com/hero.jpg",
  ctaLabel: "Encuentra tu luz",
  sortOrder: 0,
  updatedAt: new Date("2026-09-14"),
};

describe("SectionForm", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
  });

  it("edits section content without exposing its seeded key", async () => {
    await act(async () => {
      root.render(<SectionForm section={section} />);
    });

    expect(container.textContent).toContain("home.hero");
    expect(container.querySelector('input[name="key"]')).toBeNull();
    expect(
      container.querySelector<HTMLInputElement>('input[name="title"]')
        ?.value,
    ).toBe(section.title);
    expect(
      container.querySelector<HTMLTextAreaElement>('textarea[name="body"]')
        ?.value,
    ).toBe(section.body);
    expect(
      container.querySelector<HTMLInputElement>('input[name="imageUrl"]')
        ?.value,
    ).toBe(section.imageUrl);
    expect(
      container.querySelector<HTMLInputElement>('input[name="ctaLabel"]')
        ?.value,
    ).toBe(section.ctaLabel);
    expect(
      container.querySelector<HTMLInputElement>('input[name="sortOrder"]')
        ?.value,
    ).toBe("0");
  });
});
