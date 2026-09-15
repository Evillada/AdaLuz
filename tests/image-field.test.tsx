// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ImageField } from "@/components/admin/ImageField";

const reactTestEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean;
};
reactTestEnvironment.IS_REACT_ACT_ENVIRONMENT = true;

describe("ImageField", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("renders an empty preview and a hidden value for the parent form", async () => {
    await act(async () => {
      root.render(<ImageField name="heroImage" />);
    });

    expect(container.textContent).toContain("Sin imagen");
    expect(
      container.querySelector<HTMLInputElement>('input[type="hidden"]')?.name,
    ).toBe("heroImage");
    expect(
      container.querySelector<HTMLInputElement>('input[type="hidden"]')?.value,
    ).toBe("");
  });

  it("stores and previews the URL returned by the upload API", async () => {
    const onUploaded = vi.fn();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ url: "/uploads/lamp.png" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await act(async () => {
      root.render(<ImageField name="heroImage" onUploaded={onUploaded} />);
    });

    const fileInput = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    const file = new File(["image"], "lamp.png", { type: "image/png" });
    Object.defineProperty(fileInput, "files", { value: [file] });

    await act(async () => {
      fileInput?.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/upload",
      expect.objectContaining({ method: "POST", body: expect.any(FormData) }),
    );
    expect(
      container.querySelector<HTMLInputElement>('input[type="hidden"]')?.value,
    ).toBe("/uploads/lamp.png");
    expect(
      container
        .querySelector<HTMLImageElement>("img")
        ?.src.endsWith("/uploads/lamp.png"),
    ).toBe(true);
    expect(onUploaded).toHaveBeenCalledWith("/uploads/lamp.png");
  });

  it("shows upload errors without clearing sibling form fields", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: "Archivo inválido." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await act(async () => {
      root.render(
        <form>
          <input defaultValue="Borrador" name="title" />
          <ImageField name="heroImage" />
        </form>,
      );
    });

    const sibling = container.querySelector<HTMLInputElement>(
      'input[name="title"]',
    );
    const fileInput = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    if (sibling) {
      sibling.value = "Edición sin guardar";
    }
    Object.defineProperty(fileInput, "files", {
      value: [new File(["text"], "notes.txt", { type: "text/plain" })],
    });

    await act(async () => {
      fileInput?.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      "Archivo inválido.",
    );
    expect(sibling?.value).toBe("Edición sin guardar");
  });
});
