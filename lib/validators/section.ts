import { z } from "zod";

const optionalText = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().trim().optional(),
);

const optionalUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? undefined : value,
  z.url("Ingresa una URL válida.").optional(),
);

export const SectionSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio."),
  body: z.string().trim().min(1, "El contenido es obligatorio."),
  imageUrl: optionalUrl,
  ctaLabel: optionalText,
  sortOrder: z.coerce
    .number()
    .int("El orden debe ser un número entero.")
    .min(0, "El orden no puede ser negativo."),
});

export type SectionInput = z.input<typeof SectionSchema>;
