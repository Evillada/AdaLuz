import { SectionForm } from "@/components/admin/SectionForm";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export default async function ContentPage() {
  await requireAdmin();
  const sections = await prisma.pageSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
  });

  return (
    <>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
          Contenido
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Secciones de la página de inicio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-bronze/65">
          Edita los textos, imágenes y orden de las secciones existentes. Las
          claves identifican su lugar en el sitio y no se pueden modificar.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <SectionForm key={section.id} section={section} />
        ))}
      </div>
    </>
  );
}
