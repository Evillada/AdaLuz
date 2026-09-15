import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getSiteSettings } from "@/lib/data/settings";

export const revalidate = 60;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteHeader
        whatsappE164={settings.whatsappE164}
        instagramUrl={settings.instagramUrl}
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter
        whatsappE164={settings.whatsappE164}
        phoneDisplay={settings.phone}
        instagramHandle={settings.instagramHandle}
        instagramUrl={settings.instagramUrl}
      />
    </>
  );
}
