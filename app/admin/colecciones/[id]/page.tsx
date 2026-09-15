import Link from "next/link";
import { notFound } from "next/navigation";

import { CollectionForm } from "@/components/admin/CollectionForm";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export default async function CollectionDetailAdminPage(
  props: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await props.params;
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      products: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <>
      <header>
        <Link
          className="text-sm font-semibold text-ochre underline-offset-4 hover:underline"
          href="/admin/colecciones"
        >
          ← Volver a colecciones
        </Link>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-bronze">
          {collection.name}
        </h1>
        <p className="mt-3 text-sm leading-6 text-bronze/65">
          Edita la colección y administra sus productos.
        </p>
      </header>

      <div className="mt-8">
        <CollectionForm collection={collection} />
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl font-semibold text-bronze">
          Productos
        </h2>

        {collection.products.length ? (
          <div className="mt-5 overflow-x-auto rounded-xl border border-bronze/15 bg-white/45">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-bronze/15 text-bronze/60">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nombre</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                  <th className="px-4 py-3 font-semibold">Orden</th>
                </tr>
              </thead>
              <tbody>
                {collection.products.map((product) => (
                  <tr
                    className="border-b border-bronze/10 last:border-0"
                    key={product.id}
                  >
                    <td className="px-4 py-3 font-medium text-bronze">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-bronze/65">
                      {product.slug}
                    </td>
                    <td className="px-4 py-3 text-bronze/65">
                      {product.available ? "Disponible" : "No disponible"}
                    </td>
                    <td className="px-4 py-3 text-bronze/65">
                      {product.sortOrder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-bronze/60">
            Esta colección aún no tiene productos.
          </p>
        )}

        <div className="mt-6 space-y-6">
          <ProductForm collectionId={collection.id} />
          {collection.products.map((product) => (
            <ProductForm
              collectionId={collection.id}
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}
