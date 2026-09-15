"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { revalidatePublic } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import {
  TestimonialSchema,
  type TestimonialInput,
} from "@/lib/validators/testimonial";

type FieldErrors = Partial<Record<keyof TestimonialInput, string[]>>;

export type TestimonialActionState =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

type DeleteActionState =
  | { ok: true; message: string }
  | { ok: false; error: string };

function testimonialValues(formData: FormData) {
  return {
    quote: formData.get("quote"),
    author: formData.get("author"),
    published: formData.get("published"),
    sortOrder: formData.get("sortOrder"),
  };
}

function revalidateTestimonials(): void {
  revalidatePublic();
  revalidatePath("/admin/testimonios");
}

export async function createTestimonial(
  _previousState: TestimonialActionState | undefined,
  formData: FormData,
): Promise<TestimonialActionState> {
  await requireAdmin();
  const parsed = TestimonialSchema.safeParse(testimonialValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.create({
      data: parsed.data,
      select: { id: true },
    });
    revalidateTestimonials();

    return { ok: true, message: "Testimonio creado." };
  } catch {
    return {
      ok: false,
      error: "No pudimos crear el testimonio. Intenta de nuevo.",
    };
  }
}

export async function updateTestimonial(
  id: string,
  _previousState: TestimonialActionState | undefined,
  formData: FormData,
): Promise<TestimonialActionState> {
  await requireAdmin();
  const parsed = TestimonialSchema.safeParse(testimonialValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
      select: { id: true },
    });
    revalidateTestimonials();

    return { ok: true, message: "Testimonio guardado." };
  } catch {
    return {
      ok: false,
      error: "No pudimos guardar el testimonio. Intenta de nuevo.",
    };
  }
}

export async function deleteTestimonial(
  id: string,
  _previousState: DeleteActionState | undefined,
  _formData: FormData,
): Promise<DeleteActionState> {
  await requireAdmin();
  void _previousState;
  void _formData;

  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidateTestimonials();

    return { ok: true, message: "Testimonio eliminado." };
  } catch {
    return {
      ok: false,
      error: "No pudimos eliminar el testimonio. Intenta de nuevo.",
    };
  }
}
