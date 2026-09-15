import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.url("Ingresa una URL válida.").optional(),
);

export const SettingsSchema = z.object({
  phone: z.string().trim().min(1, "El teléfono es obligatorio."),
  whatsappE164: z
    .string()
    .trim()
    .regex(
      /^\+?[1-9]\d{7,14}$/,
      "Usa el formato internacional, por ejemplo 573001234567.",
    ),
  instagramHandle: z
    .string()
    .trim()
    .min(1, "El usuario de Instagram es obligatorio."),
  instagramUrl: z.url("Ingresa una URL válida de Instagram."),
  seoTitle: z.string().trim().min(1, "El título SEO es obligatorio."),
  seoDescription: z
    .string()
    .trim()
    .min(1, "La descripción SEO es obligatoria."),
  ogImage: optionalUrl,
});

export type SettingsInput = z.input<typeof SettingsSchema>;
