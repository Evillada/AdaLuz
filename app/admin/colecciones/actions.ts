"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { revalidatePublic } from "@/lib/revalidate";
import { requireAdmin } from "@/lib/session";
import { slugify } from "@/lib/slug";
import {
  CollectionSchema,
  type CollectionInput,
} from "@/lib/validators/collection";
import { ProductSchema, type ProductInput } from "@/lib/validators/product";

type CollectionFieldErrors = Partial<
  Record<keyof CollectionInput, string[]>
>;
type ProductFieldErrors = Partial<Record<keyof ProductInput, string[]>>;

export type CollectionActionState =
  | { ok: true; message: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: CollectionFieldErrors;
    };

export type ProductActionState =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: ProductFieldErrors };

type DeleteActionState =
  | { ok: true; message: string }
  | { ok: false; error: string };

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

function revalidateCatalog(): void {
  revalidatePublic();
  revalidatePath("/admin/colecciones");
  revalidatePath("/admin/colecciones/[id]", "page");
  revalidatePath("/colecciones/[slug]", "page");
  revalidatePath("/productos/[slug]", "page");
}

function collectionValues(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    coverImageUrl: formData.get("coverImageUrl"),
    published: formData.get("published"),
    sortOrder: formData.get("sortOrder"),
  };
}

function productValues(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    available: formData.get("available"),
    sortOrder: formData.get("sortOrder"),
  };
}

export async function createCollection(
  _previousState: CollectionActionState | undefined,
  formData: FormData,
): Promise<CollectionActionState> {
  await requireAdmin();
  const parsed = CollectionSchema.safeParse(collectionValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const slug = parsed.data.slug ?? slugify(parsed.data.name);
  if (!slug) {
    return { ok: false, error: "No pudimos generar un slug válido." };
  }

  try {
    await prisma.collection.create({
      data: {
        ...parsed.data,
        slug,
        coverImageUrl: parsed.data.coverImageUrl ?? null,
      },
      select: { id: true, slug: true },
    });
    revalidateCatalog();

    return { ok: true, message: "Colección creada." };
  } catch (error) {
    return {
      ok: false,
      error: isUniqueConstraintError(error)
        ? "Ya existe una colección con ese slug."
        : "No pudimos crear la colección. Intenta de nuevo.",
    };
  }
}

export async function updateCollection(
  id: string,
  _previousState: CollectionActionState | undefined,
  formData: FormData,
): Promise<CollectionActionState> {
  await requireAdmin();
  const parsed = CollectionSchema.safeParse(collectionValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const slug = parsed.data.slug ?? slugify(parsed.data.name);
  if (!slug) {
    return { ok: false, error: "No pudimos generar un slug válido." };
  }

  try {
    await prisma.collection.update({
      where: { id },
      data: {
        ...parsed.data,
        slug,
        coverImageUrl: parsed.data.coverImageUrl ?? null,
      },
      select: { id: true, slug: true },
    });
    revalidateCatalog();

    return { ok: true, message: "Colección guardada." };
  } catch (error) {
    return {
      ok: false,
      error: isUniqueConstraintError(error)
        ? "Ya existe una colección con ese slug."
        : "No pudimos guardar la colección. Intenta de nuevo.",
    };
  }
}

export async function deleteCollection(
  id: string,
  _previousState: DeleteActionState | undefined,
  _formData: FormData,
): Promise<DeleteActionState> {
  await requireAdmin();
  void _previousState;
  void _formData;

  try {
    await prisma.collection.delete({ where: { id } });
    revalidateCatalog();

    return { ok: true, message: "Colección eliminada." };
  } catch {
    return {
      ok: false,
      error: "No pudimos eliminar la colección. Intenta de nuevo.",
    };
  }
}

export async function createProduct(
  collectionId: string,
  _previousState: ProductActionState | undefined,
  formData: FormData,
): Promise<ProductActionState> {
  await requireAdmin();
  const parsed = ProductSchema.safeParse(productValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const slug = parsed.data.slug ?? slugify(parsed.data.name);
  if (!slug) {
    return { ok: false, error: "No pudimos generar un slug válido." };
  }

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        collectionId,
        slug,
        imageUrl: parsed.data.imageUrl ?? null,
      },
      select: { id: true, slug: true },
    });
    revalidateCatalog();

    return { ok: true, message: "Producto creado." };
  } catch (error) {
    return {
      ok: false,
      error: isUniqueConstraintError(error)
        ? "Ya existe un producto con ese slug."
        : "No pudimos crear el producto. Intenta de nuevo.",
    };
  }
}

export async function updateProduct(
  id: string,
  _previousState: ProductActionState | undefined,
  formData: FormData,
): Promise<ProductActionState> {
  await requireAdmin();
  const parsed = ProductSchema.safeParse(productValues(formData));

  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const slug = parsed.data.slug ?? slugify(parsed.data.name);
  if (!slug) {
    return { ok: false, error: "No pudimos generar un slug válido." };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        slug,
        imageUrl: parsed.data.imageUrl ?? null,
      },
      select: { id: true, slug: true },
    });
    revalidateCatalog();

    return { ok: true, message: "Producto guardado." };
  } catch (error) {
    return {
      ok: false,
      error: isUniqueConstraintError(error)
        ? "Ya existe un producto con ese slug."
        : "No pudimos guardar el producto. Intenta de nuevo.",
    };
  }
}

export async function deleteProduct(
  id: string,
  _previousState: DeleteActionState | undefined,
  _formData: FormData,
): Promise<DeleteActionState> {
  await requireAdmin();
  void _previousState;
  void _formData;

  try {
    await prisma.product.delete({ where: { id } });
    revalidateCatalog();

    return { ok: true, message: "Producto eliminado." };
  } catch {
    return {
      ok: false,
      error: "No pudimos eliminar el producto. Intenta de nuevo.",
    };
  }
}
