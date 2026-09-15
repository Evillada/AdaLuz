import Link from "next/link";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const sections = [
  {
    href: "/admin/contenido",
    title: "Contenido",
    description: "Edita los textos e imágenes de las páginas públicas.",
  },
  {
    href: "/admin/colecciones",
    title: "Colecciones",
    description: "Organiza las colecciones y sus productos.",
  },
  {
    href: "/admin/testimonios",
    title: "Testimonios",
    description: "Administra las historias visibles en el sitio.",
  },
  {
    href: "/admin/ajustes",
    title: "Ajustes",
    description: "Actualiza contacto, redes sociales y datos SEO.",
  },
] as const;

export default async function AdminPage() {
  await requireAdmin();

  const [collections, products] = await Promise.all([
    prisma.collection.count(),
    prisma.product.count(),
  ]);

  return (
    <>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
          Resumen
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Panel de administración
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-bronze/65">
          Gestiona la información que mantiene vivo el sitio de Adaluz.
        </p>
      </header>

      <section aria-label="Estado del catálogo" className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-bronze/15 bg-white/55 p-5">
          <p className="text-sm text-bronze/60">Colecciones</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-bronze">
            {collections}
          </p>
        </article>
        <article className="rounded-xl border border-bronze/15 bg-white/55 p-5">
          <p className="text-sm text-bronze/60">Productos</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-bronze">
            {products}
          </p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            className="rounded-xl border border-bronze/15 bg-white/35 p-5 transition hover:border-ochre/50 hover:bg-white/65"
            href={section.href}
            key={section.href}
          >
            <h2 className="font-serif text-2xl font-semibold text-bronze">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-bronze/65">
              {section.description}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
