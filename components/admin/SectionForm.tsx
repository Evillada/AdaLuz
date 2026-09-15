"use client";

import type { PageSection } from "@prisma/client";
import { useActionState } from "react";

import {
  saveSection,
  type SectionActionState,
} from "@/app/admin/contenido/actions";
import { ImageField } from "@/components/admin/ImageField";
import type { SectionInput } from "@/lib/validators/section";

type FieldName = keyof SectionInput;

const inputClassName =
  "mt-2 w-full rounded-lg border border-bronze/20 bg-white/70 px-4 py-3 text-bronze outline-none transition placeholder:text-bronze/35 focus:border-ochre focus:ring-2 focus:ring-ochre/20";

function FieldError({
  errors,
  name,
}: {
  errors?: string[];
  name: FieldName;
}) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p className="mt-1 text-sm text-red-700" id={`${name}-error`}>
      {errors[0]}
    </p>
  );
}

export function SectionForm({ section }: { section: PageSection }) {
  const saveSectionWithId = saveSection.bind(null, section.id);
  const [state, formAction, pending] = useActionState<
    SectionActionState | undefined,
    FormData
  >(saveSectionWithId, undefined);
  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form
      action={formAction}
      className="rounded-xl border border-bronze/15 bg-white/45 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ochre">
            Clave fija
          </p>
          <h2 className="mt-1 font-mono text-sm font-semibold text-bronze">
            {section.key}
          </h2>
        </div>
        <label className="block w-28 text-sm font-medium text-bronze">
          Orden
          <input
            aria-describedby="sortOrder-error"
            className={inputClassName}
            defaultValue={section.sortOrder}
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
            Título
            <input
              aria-describedby="title-error"
              className={inputClassName}
              defaultValue={section.title}
              name="title"
              required
            />
            <FieldError errors={fieldErrors?.title} name="title" />
          </label>

          <label className="block text-sm font-medium text-bronze">
            Contenido
            <textarea
              aria-describedby="body-error"
              className={inputClassName}
              defaultValue={section.body}
              name="body"
              required
              rows={5}
            />
            <FieldError errors={fieldErrors?.body} name="body" />
          </label>

          <label className="block text-sm font-medium text-bronze">
            Texto del botón (opcional)
            <input
              aria-describedby="ctaLabel-error"
              className={inputClassName}
              defaultValue={section.ctaLabel ?? ""}
              name="ctaLabel"
            />
            <FieldError errors={fieldErrors?.ctaLabel} name="ctaLabel" />
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-bronze">
            Imagen (opcional)
          </p>
          <ImageField
            defaultUrl={section.imageUrl}
            name="imageUrl"
          />
          <FieldError errors={fieldErrors?.imageUrl} name="imageUrl" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          className="rounded-lg bg-bronze px-5 py-3 text-sm font-semibold text-cream transition hover:bg-bronze/90 disabled:cursor-wait disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? "Guardando…" : "Guardar sección"}
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
  );
}
