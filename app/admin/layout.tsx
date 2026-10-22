import type { ReactNode } from "react";

import { AdminNav } from "@/components/admin/AdminNav";
import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return <div className="theme-light min-h-dvh bg-[#f8f3ea]">{children}</div>;
  }

  return (
    <div className="theme-light min-h-dvh bg-[#f8f3ea] lg:flex">
      <AdminNav />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
