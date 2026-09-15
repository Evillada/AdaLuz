"use client";

import type { Product } from "@prisma/client";
import { useActionState } from "react";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  type ProductActionState,
} from "@/app/admin/colecciones/actions";
import { ImageField } from "@/components/admin/ImageField";
import type { ProductInput } from "@/lib/validators/product";

type FieldName = keyof ProductInput;

const inputClassName =
  "mt-2 w-full rounded-lg border border-bronze/20 bg-white/70 px-4 py-3 text-bronze outline-none transition placeholder:text-bronze/35 focus:border-ochre focus:ring-2 focus:ring-ochre/20";

function FieldError({
  errors,
  name,
}: {
  errors?: string[];
  name: FieldName;
}) {
  return errors?.length ? (
    <p className="mt-1 text-sm text-red-700" id={`product-${name}-error`}>
      {errors[0]}
    </p>
  ) : null;
}

export function ProductForm({
  collectionId,
  product,
}: {
  collectionId: string;
  product?: Product;
}) {
  const saveAction = product
    ? updateProduct.bind(null, product.id)
    : createProduct.bind(null, collectionId);
  const removeAction = deleteProduct.bind(null, product?.id ?? "");
  const [state, formAction, pending] = useActionState<
    ProductActionState | undefined,
    FormData
  >(saveAction, undefined);
  const [deleteState, deleteAction, deleting] = useActionState(
    removeAction,
    undefined,
  );
  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <section className="rounded-xl border border-bronze/15 bg-white/45 p-5 sm:p-6">
      <form action={formAction}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ochre">
              {product ? "Editar producto" : "Nuevo producto"}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-bronze">
              {product?.name ?? "Agregar producto"}
            </h2>
          </div>
          <label className="block w-28 text-sm font-medium text-bronze">
            Orden
            <input
              className={inputClassName}
              defaultValue={product?.sortOrder ?? 0}
              min={0}
              name="sortOrder"
              required
              type="number"
            />
            <FieldError errors={fieldErrors?.sortOrder} name="sortOrder" />
          </label>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-5">
            <label className="block text-sm font-medium text-bronze">
              Nombre
              <input
                className={inputClassName}
                defaultValue={product?.name ?? ""}
                name="name"
                required
              />
              <FieldError errors={fieldErrors?.name} name="name" />
            </label>

            <label className="block text-sm font-medium text-bronze">
              Slug
              <input
                className={inputClassName}
                defaultValue={product?.slug ?? ""}
                name="slug"
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                placeholder="Se genera desde el nombre"
              />
              <FieldError errors={fieldErrors?.slug} name="slug" />
            </label>

            <label className="block text-sm font-medium text-bronze">
              Descripción
              <textarea
                className={inputClassName}
                defaultValue={product?.description ?? ""}
                name="description"
                required
                rows={5}
              />
              <FieldError
                errors={fieldErrors?.description}
                name="description"
              />
            </label>

            <label className="inline-flex items-center gap-3 text-sm font-medium text-bronze">
              <input
                className="size-4 accent-ochre"
                defaultChecked={product?.available ?? true}
                name="available"
                type="checkbox"
              />
              Disponible
            </label>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-bronze">
              Imagen del producto
            </p>
            <ImageField defaultUrl={product?.imageUrl} name="imageUrl" />
            <FieldError errors={fieldErrors?.imageUrl} name="imageUrl" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            className="rounded-lg bg-bronze px-5 py-3 text-sm font-semibold text-cream transition hover:bg-bronze/90 disabled:cursor-wait disabled:opacity-60"
            disabled={pending}
            type="submit"
          >
            {pending
              ? "Guardando…"
              : product
                ? "Guardar producto"
                : "Crear producto"}
          </button>
          <p
            aria-live="polite"
            className={`text-sm ${state?.ok ? "text-emerald-800" : "text-red-700"}`}
            role="status"
          >
            {state ? (state.ok ? state.message : state.error) : null}
          </p>
        </div>
      </form>

      {product ? (
        <form
          action={deleteAction}
          className="mt-5 border-t border-bronze/10 pt-5"
          onSubmit={(event) => {
            if (!window.confirm("¿Eliminar este producto?")) {
              event.preventDefault();
            }
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <button
              className="text-sm font-semibold text-red-700 disabled:cursor-wait disabled:opacity-60"
              disabled={deleting}
              type="submit"
            >
              {deleting ? "Eliminando…" : "Eliminar producto"}
            </button>
            <p
              aria-live="polite"
              className={`text-sm ${deleteState?.ok ? "text-emerald-800" : "text-red-700"}`}
              role="status"
            >
              {deleteState
                ? deleteState.ok
                  ? deleteState.message
                  : deleteState.error
                : null}
            </p>
          </div>
        </form>
      ) : null}
    </section>
  );
}
