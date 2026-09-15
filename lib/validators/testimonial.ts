import { z } from "zod";

const checkbox = z.preprocess(
  (value) => value === true || value === "on" || value === "true",
  z.boolean(),
);

export const TestimonialSchema = z.object({
  quote: z.string().trim().min(1, "El testimonio es obligatorio."),
  author: z.string().trim().min(1, "El autor es obligatorio."),
  published: checkbox,
  sortOrder: z.coerce
    .number()
    .int("El orden debe ser un número entero.")
    .min(0, "El orden no puede ser negativo."),
});

export type TestimonialInput = z.input<typeof TestimonialSchema>;
