import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email: parsed.data.email },
        });

        if (
          !admin ||
          !(await verifyPassword(parsed.data.password, admin.passwordHash))
        ) {
          return null;
        }

        return { id: admin.id, email: admin.email };
      },
    }),
  ],
  callbacks: {
    authorized({ auth: session, request }) {
      if (request.nextUrl.pathname === "/admin/login") {
        return true;
      }

      return Boolean(session?.user);
    },
  },
});
