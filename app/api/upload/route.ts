import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { auth } from "@/lib/auth";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const IMAGE_EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
} as const;

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

function blobPathname(file: File) {
  const safeName = basename(file.name)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  const extension = IMAGE_EXTENSIONS[file.type as keyof typeof IMAGE_EXTENSIONS];
  const nameWithoutExtension =
    safeName.slice(0, safeName.length - extname(safeName).length) || "image";

  return `uploads/${nameWithoutExtension}${extension}`;
}

async function saveLocally(file: File) {
  const extension = IMAGE_EXTENSIONS[file.type as keyof typeof IMAGE_EXTENSIONS];
  const filename = `${randomUUID()}${extension}`;
  const uploadsDirectory = join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDirectory, { recursive: true });
  await writeFile(
    join(uploadsDirectory, filename),
    new Uint8Array(await file.arrayBuffer()),
  );

  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return errorResponse("No autorizado.", 401);
  }

  let file: FormDataEntryValue | null;

  try {
    file = (await request.formData()).get("file");
  } catch {
    return errorResponse("Selecciona una imagen.", 400);
  }

  if (!(file instanceof File)) {
    return errorResponse("Selecciona una imagen.", 400);
  }

  if (!(file.type in IMAGE_EXTENSIONS)) {
    return errorResponse("Usa una imagen JPEG, PNG o WebP.", 400);
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return errorResponse("La imagen no puede superar 4 MB.", 413);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    if (token) {
      const blob = await put(blobPathname(file), file, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
        token,
      });

      return Response.json({ url: blob.url });
    }

    if (process.env.NODE_ENV !== "production") {
      return Response.json({ url: await saveLocally(file) });
    }
  } catch {
    return errorResponse("No se pudo subir la imagen.", 500);
  }

  return errorResponse("El almacenamiento de imágenes no está configurado.", 503);
}
