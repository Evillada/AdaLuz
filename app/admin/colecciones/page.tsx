import { CollectionForm } from "@/components/admin/CollectionForm";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export default async function CollectionsAdminPage() {
  await requireAdmin();
  const collections = await prisma.collection.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
          Catálogo
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Colecciones
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-bronze/65">
          Crea, publica y organiza las colecciones que aparecen en el sitio.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        <CollectionForm />

        {collections.length ? (
          collections.map((collection) => (
            <CollectionForm collection={collection} key={collection.id} />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-bronze/20 p-6 text-sm text-bronze/60">
            Aún no hay colecciones.
          </p>
        )}
      </div>
    </>
  );
}
