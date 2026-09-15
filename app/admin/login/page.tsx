import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

async function login(formData: FormData) {
  "use server";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=invalid-credentials");
    }

    throw error;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-ochre/30 bg-cream/90 p-8 shadow-xl shadow-bronze/10">
        <p className="font-serif text-sm uppercase tracking-[0.25em] text-ochre">
          Adaluz
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Administración
        </h1>
        <p className="mt-3 text-sm text-bronze/70">
          Ingresa con las credenciales de administración.
        </p>

        <form action={login} className="mt-8 space-y-5">
          <label className="block text-sm font-medium">
            Correo electrónico
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-bronze/20 bg-white/70 px-4 py-3 outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/20"
              name="email"
              required
              type="email"
            />
          </label>

          <label className="block text-sm font-medium">
            Contraseña
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-bronze/20 bg-white/70 px-4 py-3 outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/20"
              name="password"
              required
              type="password"
            />
          </label>

          {error ? (
            <p aria-live="polite" className="text-sm text-red-700" role="alert">
              El correo o la contraseña no son válidos.
            </p>
          ) : null}

          <button
            className="w-full rounded-full bg-bronze px-5 py-3 font-semibold text-cream transition hover:bg-bronze/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}
