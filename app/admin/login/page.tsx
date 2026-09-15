import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
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

        <LoginForm action={login} hasError={Boolean(error)} />
      </section>
    </main>
  );
}
