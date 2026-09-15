import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => vi.fn());
const put = vi.hoisted(() => vi.fn());
const mkdir = vi.hoisted(() => vi.fn());
const writeFile = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({ auth }));
vi.mock("@vercel/blob", () => ({ put }));
vi.mock("node:fs/promises", () => ({ mkdir, writeFile }));

import { POST } from "@/app/api/upload/route";

function uploadRequest(file?: File) {
  const formData = new FormData();
  if (file) {
    formData.set("file", file);
  }

  return new Request("http://localhost/api/upload", {
    method: "POST",
    body: formData,
  });
}

describe("POST /api/upload", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    auth.mockReset().mockResolvedValue({ user: { id: "admin" } });
    put.mockReset();
    mkdir.mockReset().mockResolvedValue(undefined);
    writeFile.mockReset().mockResolvedValue(undefined);
  });

  it("rejects uploads without an admin session", async () => {
    auth.mockResolvedValue(null);

    const response = await POST(
      uploadRequest(new File(["image"], "lamp.png", { type: "image/png" })),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "No autorizado.",
    });
    expect(put).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it.each([
    {
      label: "missing files",
      file: undefined,
      status: 400,
      error: "Selecciona una imagen.",
    },
    {
      label: "unsupported file types",
      file: new File(["text"], "notes.txt", { type: "text/plain" }),
      status: 400,
      error: "Usa una imagen JPEG, PNG o WebP.",
    },
    {
      label: "images over 4 MB",
      file: new File([new Uint8Array(4 * 1024 * 1024 + 1)], "large.jpg", {
        type: "image/jpeg",
      }),
      status: 413,
      error: "La imagen no puede superar 4 MB.",
    },
  ])("rejects $label", async ({ file, status, error }) => {
    const response = await POST(uploadRequest(file));

    expect(response.status).toBe(status);
    await expect(response.json()).resolves.toEqual({ error });
    expect(put).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it("uploads a valid image to Vercel Blob when a token is configured", async () => {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "test-token");
    put.mockResolvedValue({
      url: "https://blob.example/lamp.webp",
      downloadUrl: "https://blob.example/lamp.webp?download=1",
      pathname: "uploads/lamp.webp",
      contentType: "image/webp",
      contentDisposition: 'inline; filename="lamp.webp"',
      etag: "etag",
    });
    const file = new File(["image"], "Lámpara Sala.webp", {
      type: "image/webp",
    });

    const response = await POST(uploadRequest(file));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      url: "https://blob.example/lamp.webp",
    });
    expect(put).toHaveBeenCalledWith(
      "uploads/Lmpara-Sala.webp",
      file,
      expect.objectContaining({
        access: "public",
        addRandomSuffix: true,
        contentType: "image/webp",
        token: "test-token",
      }),
    );
    expect(writeFile).not.toHaveBeenCalled();
  });

  it("writes to public/uploads when the token is missing outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");

    const response = await POST(
      uploadRequest(new File(["image"], "../lamp.png", { type: "image/png" })),
    );
    const body = (await response.json()) as { url: string };

    expect(response.status).toBe(200);
    expect(body.url).toMatch(/^\/uploads\/[a-f0-9-]+\.png$/);
    expect(mkdir).toHaveBeenCalledWith(
      expect.stringMatching(/public\/uploads$/),
      { recursive: true },
    );
    expect(writeFile).toHaveBeenCalledWith(
      expect.stringMatching(/public\/uploads\/[a-f0-9-]+\.png$/),
      expect.any(Uint8Array),
    );
    expect(put).not.toHaveBeenCalled();
  });

  it("does not use the local fallback in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", "");

    const response = await POST(
      uploadRequest(new File(["image"], "lamp.png", { type: "image/png" })),
    );

    expect(response.status).toBe(503);
    expect(writeFile).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
  });
});
