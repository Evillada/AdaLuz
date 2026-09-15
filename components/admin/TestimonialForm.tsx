"use client";

import type { Testimonial } from "@prisma/client";
import { useActionState } from "react";

import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
  type TestimonialActionState,
} from "@/app/admin/testimonios/actions";
import type { TestimonialInput } from "@/lib/validators/testimonial";

type FieldName = keyof TestimonialInput;

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
    <p className="mt-1 text-sm text-red-700" id={`testimonial-${name}-error`}>
      {errors[0]}
    </p>
  ) : null;
}

export function TestimonialForm({
  testimonial,
}: {
  testimonial?: Testimonial;
}) {
  const saveAction = testimonial
    ? updateTestimonial.bind(null, testimonial.id)
    : createTestimonial;
  const removeAction = deleteTestimonial.bind(null, testimonial?.id ?? "");
  const [state, formAction, pending] = useActionState<
    TestimonialActionState | undefined,
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
              {testimonial ? "Editar testimonio" : "Nuevo testimonio"}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-bronze">
              {testimonial?.author ?? "Crear testimonio"}
            </h2>
          </div>

          <label className="block w-28 text-sm font-medium text-bronze">
            Orden
            <input
              className={inputClassName}
              defaultValue={testimonial?.sortOrder ?? 0}
              min={0}
              name="sortOrder"
              required
              type="number"
            />
            <FieldError errors={fieldErrors?.sortOrder} name="sortOrder" />
          </label>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block text-sm font-medium text-bronze">
            Testimonio
            <textarea
              className={inputClassName}
              defaultValue={testimonial?.quote ?? ""}
              name="quote"
              required
              rows={4}
            />
            <FieldError errors={fieldErrors?.quote} name="quote" />
          </label>

          <label className="block text-sm font-medium text-bronze">
            Autor
            <input
              className={inputClassName}
              defaultValue={testimonial?.author ?? ""}
              name="author"
              required
            />
            <FieldError errors={fieldErrors?.author} name="author" />
          </label>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-bronze">
            <input
              className="size-4 accent-ochre"
              defaultChecked={testimonial?.published ?? false}
              name="published"
              type="checkbox"
            />
            Publicado
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            className="rounded-lg bg-bronze px-5 py-3 text-sm font-semibold text-cream transition hover:bg-bronze/90 disabled:cursor-wait disabled:opacity-60"
            disabled={pending}
            type="submit"
          >
            {pending
              ? "Guardando…"
              : testimonial
                ? "Guardar testimonio"
                : "Crear testimonio"}
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

      {testimonial ? (
        <form
          action={deleteAction}
          className="mt-5 border-t border-bronze/10 pt-5"
          onSubmit={(event) => {
            if (!window.confirm("¿Eliminar este testimonio?")) {
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
              {deleting ? "Eliminando…" : "Eliminar testimonio"}
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
