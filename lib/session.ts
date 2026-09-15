import { redirect } from "next/navigation";
import type { Session } from "next-auth";

import { auth } from "@/lib/auth";

export async function requireAdmin(): Promise<Session> {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return session;
}
