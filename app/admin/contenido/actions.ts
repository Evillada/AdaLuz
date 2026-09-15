"use server";

import { prisma } from "@/lib/db";
import { revalidatePublic } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import {
  SectionSchema,
  type SectionInput,
} from "@/lib/validators/section";

type FieldErrors = Partial<Record<keyof SectionInput, string[]>>;

export type SectionActionState =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

async function persistSection(
  id: string,
  section: ReturnType<typeof SectionSchema.parse>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await prisma.pageSection.update({
      where: { id },
      data: {
        ...section,
        imageUrl: section.imageUrl ?? null,
        ctaLabel: section.ctaLabel ?? null,
      },
    });
    revalidatePublic();

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No pudimos guardar esta sección. Intenta de nuevo.",
    };
  }
}

export async function updateSection(
  id: string,
  input: SectionInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const parsed = SectionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos marcados." };
  }

  return persistSection(id, parsed.data);
}

export async function saveSection(
  id: string,
  _previousState: SectionActionState | undefined,
  formData: FormData,
): Promise<SectionActionState> {
  await requireAdmin();

  const parsed = SectionSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    imageUrl: formData.get("imageUrl"),
    ctaLabel: formData.get("ctaLabel"),
    sortOrder: formData.get("sortOrder"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await persistSection(id, parsed.data);

  return result.ok
    ? { ok: true, message: "Sección guardada." }
    : { ok: false, error: result.error };
}
