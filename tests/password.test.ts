import { describe, expect, it } from "vitest";

import { hashPassword, verifyPassword } from "@/lib/password";

describe("password", () => {
  it("verifies a hash", async () => {
    const hash = await hashPassword("secret-pass");

    expect(await verifyPassword("secret-pass", hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });
});
