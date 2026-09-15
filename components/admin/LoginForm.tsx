"use client";

import { useFormStatus } from "react-dom";

type LoginFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  hasError: boolean;
};

export function LoginSubmitButtonView({
  pending,
}: {
  pending: boolean;
}) {
  return (
    <button
      aria-disabled={pending}
      className="w-full rounded-full bg-bronze px-5 py-3 font-semibold text-cream transition hover:bg-bronze/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ochre"
      disabled={pending}
      type="submit"
    >
      {pending ? "Ingresando…" : "Ingresar"}
    </button>
  );
}

function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return <LoginSubmitButtonView pending={pending} />;
}

export function LoginForm({ action, hasError }: LoginFormProps) {
  return (
    <form action={action} className="mt-8 space-y-5">
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

      {hasError ? (
        <p aria-live="polite" className="text-sm text-red-700" role="alert">
          Credenciales inválidas
        </p>
      ) : null}

      <LoginSubmitButton />
    </form>
  );
}
