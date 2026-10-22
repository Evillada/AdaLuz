// @vitest-environment jsdom
import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: {
    href: string;
    children: ReactNode;
    onClick?: () => void;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
      {...rest}
    >
      {children}
    </a>
  ),
}));

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  document.documentElement.className = "";
  localStorage.clear();
  navigation.pathname = "/";
});

describe("ThemeToggle", () => {
  it("switches theme and remembers the choice", () => {
    act(() => root.render(<ThemeToggle />));
    const button = container.querySelector("button")!;

    act(() => button.click());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    act(() => button.click());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("still renders and toggles when matchMedia throws", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => {
        throw new Error("unsupported");
      }),
    );

    act(() => root.render(<ThemeToggle />));
    act(() => container.querySelector("button")!.click());

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

describe("MobileMenu", () => {
  function renderMenu() {
    act(() =>
      root.render(
        <MobileMenu
          whatsappE164="573113187927"
          instagramUrl="https://instagram.com/velasadaluz"
        />,
      ),
    );
    return container.querySelector<HTMLButtonElement>("button[aria-controls]")!;
  }

  it("opens with the navigation and closes when a link is tapped", () => {
    const toggle = renderMenu();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector("#mobile-menu")).toBeNull();

    act(() => toggle.click());
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const link = container.querySelector<HTMLAnchorElement>('#mobile-menu a[href="/nosotros"]')!;
    expect(link).not.toBeNull();

    act(() => link.click());
    expect(container.querySelector("#mobile-menu")).toBeNull();
  });

  it("closes with the Escape key", () => {
    const toggle = renderMenu();
    act(() => toggle.click());

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(container.querySelector("#mobile-menu")).toBeNull();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("closes when the route changes another way", () => {
    const toggle = renderMenu();
    act(() => toggle.click());

    navigation.pathname = "/colecciones";
    renderMenu();

    expect(container.querySelector("#mobile-menu")).toBeNull();
  });
});
