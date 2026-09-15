import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/data/settings";
import { requireAdmin } from "@/lib/session";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSiteSettings();

  return (
    <>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">
          Ajustes
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-bronze">
          Datos del sitio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-bronze/65">
          Mantén al día la información de contacto, redes sociales y
          presentación del sitio en buscadores.
        </p>
      </header>

      <SettingsForm settings={settings} />
    </>
  );
}
