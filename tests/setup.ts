import { vi } from "vitest";

// `ViewTransition` only exists in the canary React bundled by Next.js, not in the `react` package Vitest resolves.
vi.mock("@/components/motion/PageTransition", () => ({
  PageTransition: ({ children }: { children: unknown }) => children,
}));
