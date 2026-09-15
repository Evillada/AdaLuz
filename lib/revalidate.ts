import { revalidatePath } from "next/cache";

const publicPaths = [
  "/",
  "/colecciones",
  "/nosotros",
  "/para-empresas",
  "/contacto",
  "/sitemap.xml",
] as const;

export function revalidatePublic(): void {
  for (const path of publicPaths) {
    revalidatePath(path);
  }
}
