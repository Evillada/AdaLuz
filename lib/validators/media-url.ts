import { z } from "zod";

function isHttpUrl(value: string) {
  return z.url().safeParse(value).success;
}

function isLocalUploadPath(value: string) {
  return /^\/uploads\/[A-Za-z0-9._-]+$/.test(value);
}

/** Absolute http(s) URL or local `/uploads/...` path from the admin uploader. */
export const optionalMediaUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z
    .string()
    .trim()
    .refine(
      (value) => isHttpUrl(value) || isLocalUploadPath(value),
      "Ingresa una URL válida o una imagen subida.",
    )
    .optional(),
);
