import { z } from "zod";

function isHttpUrl(value: string) {
  return z.url().safeParse(value).success;
}

function isLocalMediaPath(value: string) {
  return /^\/(uploads|reference)\/[A-Za-z0-9._-]+$/.test(value);
}

/** Absolute http(s) URL, local `/uploads/...`, or curated `/reference/...` path. */
export const optionalMediaUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z
    .string()
    .trim()
    .refine(
      (value) => isHttpUrl(value) || isLocalMediaPath(value),
      "Ingresa una URL válida o una imagen subida.",
    )
    .optional(),
);
