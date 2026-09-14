import { Logo } from "@/components/brand/Logo";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 text-bronze">
      <div className="flex flex-col items-center text-center">
        <Logo variant="lockup" className="w-48" />
        <h1 className="mt-8 font-serif text-4xl font-medium text-ochre">
          Adaluz
        </h1>
        <p className="mt-2 text-lg">Velas que iluminan tus momentos.</p>
      </div>
    </main>
  );
}
