"use client";

import type { SiteSettings } from "@prisma/client";
import { useActionState } from "react";

import {
  saveSiteSettings,
  type SettingsActionState,
} from "@/app/admin/ajustes/actions";
import type { SettingsInput } from "@/lib/validators/settings";

type FieldName = keyof SettingsInput;

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

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<
    SettingsActionState | undefined,
    FormData
  >(saveSiteSettings, undefined);
  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="mt-8 space-y-8">
      <fieldset className="grid gap-5 rounded-xl border border-bronze/15 bg-white/45 p-5 sm:grid-cols-2 sm:p-6">
        <legend className="px-2 font-serif text-xl font-semibold text-bronze">
          Contacto y redes
        </legend>

        <label className="block text-sm font-medium text-bronze">
          Teléfono visible
          <input
            aria-describedby="phone-error"
            className={inputClassName}
            defaultValue={settings.phone}
            name="phone"
            required
          />
          <FieldError errors={fieldErrors?.phone} name="phone" />
        </label>

        <label className="block text-sm font-medium text-bronze">
          WhatsApp internacional
          <input
            aria-describedby="whatsappE164-error"
            className={inputClassName}
            defaultValue={settings.whatsappE164}
            name="whatsappE164"
            placeholder="+573001234567"
            required
          />
          <FieldError
            errors={fieldErrors?.whatsappE164}
            name="whatsappE164"
          />
        </label>

        <label className="block text-sm font-medium text-bronze">
          Usuario de Instagram
          <input
            aria-describedby="instagramHandle-error"
            className={inputClassName}
            defaultValue={settings.instagramHandle}
            name="instagramHandle"
            placeholder="@adaluz"
            required
          />
          <FieldError
            errors={fieldErrors?.instagramHandle}
            name="instagramHandle"
          />
        </label>

        <label className="block text-sm font-medium text-bronze">
          URL de Instagram
          <input
            aria-describedby="instagramUrl-error"
            className={inputClassName}
            defaultValue={settings.instagramUrl}
            name="instagramUrl"
            required
            type="url"
          />
          <FieldError errors={fieldErrors?.instagramUrl} name="instagramUrl" />
        </label>
      </fieldset>

      <fieldset className="grid gap-5 rounded-xl border border-bronze/15 bg-white/45 p-5 sm:p-6">
        <legend className="px-2 font-serif text-xl font-semibold text-bronze">
          Posicionamiento y enlaces
        </legend>

        <label className="block text-sm font-medium text-bronze">
          Título SEO
          <input
            aria-describedby="seoTitle-error"
            className={inputClassName}
            defaultValue={settings.seoTitle}
            name="seoTitle"
            required
          />
          <FieldError errors={fieldErrors?.seoTitle} name="seoTitle" />
        </label>

        <label className="block text-sm font-medium text-bronze">
          Descripción SEO
          <textarea
            aria-describedby="seoDescription-error"
            className={inputClassName}
            defaultValue={settings.seoDescription}
            name="seoDescription"
            required
            rows={4}
          />
          <FieldError
            errors={fieldErrors?.seoDescription}
            name="seoDescription"
          />
        </label>

        <label className="block text-sm font-medium text-bronze">
          Imagen para compartir (opcional)
          <input
            aria-describedby="ogImage-error"
            className={inputClassName}
            defaultValue={settings.ogImage ?? ""}
            name="ogImage"
            placeholder="https://..."
            type="url"
          />
          <FieldError errors={fieldErrors?.ogImage} name="ogImage" />
        </label>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <button
          className="rounded-lg bg-bronze px-5 py-3 text-sm font-semibold text-cream transition hover:bg-bronze/90 disabled:cursor-wait disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending ? "Guardando…" : "Guardar ajustes"}
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
