import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAdmin = vi.hoisted(() => vi.fn());
const update = vi.hoisted(() => vi.fn());
const revalidatePublic = vi.hoisted(() => vi.fn());

vi.mock("@/lib/session", () => ({ requireAdmin }));
vi.mock("@/lib/db", () => ({
  prisma: { siteSettings: { update } },
}));
vi.mock("@/lib/revalidate", () => ({ revalidatePublic }));

import {
  saveSiteSettings,
  updateSiteSettings,
} from "@/app/admin/ajustes/actions";
import { SettingsSchema } from "@/lib/validators/settings";

const validSettings = {
  phone: "+57 300 123 4567",
  whatsappE164: "+573001234567",
  instagramHandle: "@adaluz",
  instagramUrl: "https://instagram.com/adaluz",
  seoTitle: "Adaluz",
  seoDescription: "Iluminación artesanal para espacios con intención.",
  ogImage: "",
};

describe("SettingsSchema", () => {
  it("normalizes optional empty image values", () => {
    expect(SettingsSchema.parse(validSettings).ogImage).toBeUndefined();
  });

  it("accepts the digit-only WhatsApp format used by public links", () => {
    expect(
      SettingsSchema.safeParse({
        ...validSettings,
        whatsappE164: "573001234567",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid public contact links", () => {
    const result = SettingsSchema.safeParse({
      ...validSettings,
      whatsappE164: "not-a-number",
      instagramUrl: "instagram",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.whatsappE164).toBeDefined();
      expect(result.error.flatten().fieldErrors.instagramUrl).toBeDefined();
    }
  });
});

describe("settings actions", () => {
  beforeEach(() => {
    requireAdmin.mockReset().mockResolvedValue({ user: { id: "admin" } });
    update.mockReset().mockResolvedValue({});
    revalidatePublic.mockReset();
  });

  it("authorizes, updates the singleton, and revalidates public pages", async () => {
    await expect(updateSiteSettings(validSettings)).resolves.toEqual({
      ok: true,
    });

    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledWith({
      where: { id: "default" },
      data: { ...validSettings, ogImage: null },
    });
    expect(revalidatePublic).toHaveBeenCalledOnce();
  });

  it("returns inline field errors without writing invalid data", async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries({
      ...validSettings,
      whatsappE164: "invalid",
    })) {
      formData.set(key, value);
    }

    const result = await saveSiteSettings(undefined, formData);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors?.whatsappE164).toBeDefined();
    }
    expect(requireAdmin).toHaveBeenCalledOnce();
    expect(update).not.toHaveBeenCalled();
  });
});
