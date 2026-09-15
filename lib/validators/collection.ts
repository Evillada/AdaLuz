import { z } from "zod";

const optionalSlug = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z
    .string()
    .trim()
    .min(1, "El slug es obligatorio.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Usa solo minúsculas, números y guiones.",
    )
    .optional(),
);

const optionalUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.url("Ingresa una URL válida.").optional(),
);

const checkbox = z.preprocess(
  (value) => value === true || value === "on" || value === "true",
  z.boolean(),
);

export const CollectionSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio."),
  slug: optionalSlug,
  tagline: z.string().trim().min(1, "La frase corta es obligatoria."),
  description: z.string().trim().min(1, "La descripción es obligatoria."),
  coverImageUrl: optionalUrl,
  published: checkbox,
  sortOrder: z.coerce
    .number()
    .int("El orden debe ser un número entero.")
    .min(0, "El orden no puede ser negativo."),
});

export type CollectionInput = z.input<typeof CollectionSchema>;
