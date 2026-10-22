// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

import { THEME_STORAGE_KEY, resolveTheme, themeInitScript } from "@/lib/theme";

function stubSystem(prefersDark: boolean) {
  vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: prefersDark }));
}

function runInitScript() {
  new Function(themeInitScript)();
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.className = "";
  localStorage.clear();
});

describe("resolveTheme", () => {
  it("prefers a stored choice over the system", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system when nothing valid is stored", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme("sepia", false)).toBe("light");
  });
});

describe("themeInitScript", () => {
  it("applies dark when the system prefers dark", () => {
    stubSystem(true);
    runInitScript();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("lets a stored light choice override a dark system", () => {
    stubSystem(true);
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    runInitScript();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("survives blocked storage and uses the system", () => {
    stubSystem(true);
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
    });
    expect(runInitScript).not.toThrow();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
