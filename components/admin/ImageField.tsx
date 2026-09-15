"use client";

import { useState, type ChangeEvent } from "react";

export type ImageFieldProps = {
  name: string;
  defaultUrl?: string | null;
  onUploaded?: (url: string) => void;
};

type UploadResponse = {
  error?: string;
  url?: string;
};

export function ImageField({
  name,
  defaultUrl = null,
  onUploaded,
}: ImageFieldProps) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as UploadResponse;

      if (!response.ok || !result.url) {
        throw new Error(result.error || "No se pudo subir la imagen.");
      }

      setUrl(result.url);
      onUploaded?.(result.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo subir la imagen.",
      );
    } finally {
      setUploading(false);
      input.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <input name={name} type="hidden" value={url} />

      <div className="flex min-h-44 items-center justify-center overflow-hidden rounded-xl border border-bronze/15 bg-cream">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Vista previa de la imagen"
            className="h-48 w-full object-cover"
            src={url}
          />
        ) : (
          <span className="text-sm text-bronze/45">Sin imagen</span>
        )}
      </div>

      <label className="inline-flex cursor-pointer items-center rounded-lg bg-bronze px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-bronze/90 has-[:disabled]:cursor-wait has-[:disabled]:opacity-60">
        {uploading ? "Subiendo…" : "Seleccionar imagen"}
        <input
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={uploading}
          onChange={handleChange}
          type="file"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
