"use server";

import { prisma } from "@/lib/db";
import { revalidatePublic } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import {
  SettingsSchema,
  type SettingsInput,
} from "@/lib/validators/settings";

type FieldErrors = Partial<Record<keyof SettingsInput, string[]>>;

export type SettingsActionState =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

async function persistSettings(
  settings: ReturnType<typeof SettingsSchema.parse>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await prisma.siteSettings.update({
      where: { id: "default" },
      data: {
        ...settings,
        ogImage: settings.ogImage ?? null,
      },
    });
    revalidatePublic();

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No pudimos guardar los ajustes. Intenta de nuevo.",
    };
  }
}

export async function updateSiteSettings(
  input: SettingsInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const parsed = SettingsSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos marcados." };
  }

  return persistSettings(parsed.data);
}

export async function saveSiteSettings(
  _previousState: SettingsActionState | undefined,
  formData: FormData,
): Promise<SettingsActionState> {
  await requireAdmin();

  const parsed = SettingsSchema.safeParse({
    phone: formData.get("phone"),
    whatsappE164: formData.get("whatsappE164"),
    instagramHandle: formData.get("instagramHandle"),
    instagramUrl: formData.get("instagramUrl"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    ogImage: formData.get("ogImage"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await persistSettings(parsed.data);

  return result.ok
    ? { ok: true, message: "Ajustes guardados." }
    : { ok: false, error: result.error };
}
