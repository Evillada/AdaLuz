import Link from "next/link";

import { signOut } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/contenido", label: "Contenido" },
  { href: "/admin/colecciones", label: "Colecciones" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/ajustes", label: "Ajustes" },
] as const;

export function AdminNav() {
  async function logout() {
    "use server";

    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <aside className="border-b border-bronze/15 bg-[#eee3d1] lg:min-h-dvh lg:w-64 lg:border-r lg:border-b-0">
      <div className="flex h-full flex-col px-5 py-6 lg:sticky lg:top-0 lg:min-h-dvh lg:px-7 lg:py-9">
        <Link className="font-serif text-2xl font-semibold text-bronze" href="/admin">
          Adaluz
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bronze/55">
          Administración
        </p>

        <nav aria-label="Administración" className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:mt-10 lg:flex-col">
          {links.map((link) => (
            <Link
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-bronze/75 transition hover:bg-white/50 hover:text-bronze"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form action={logout} className="mt-4 lg:mt-auto">
          <button
            className="rounded-lg px-3 py-2 text-left text-sm font-medium text-bronze/65 transition hover:bg-white/50 hover:text-bronze"
            type="submit"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
