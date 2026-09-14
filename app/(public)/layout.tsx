import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const whatsappE164 = "573113187927";
const instagramUrl = "https://instagram.com/velasadaluz";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader
        whatsappE164={whatsappE164}
        instagramUrl={instagramUrl}
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter
        whatsappE164={whatsappE164}
        phoneDisplay="3113187927"
        instagramHandle="@velasadaluz"
        instagramUrl={instagramUrl}
      />
    </>
  );
}
