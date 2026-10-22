"use client";

import { useEffect, useLayoutEffect } from "react";

import { applyTheme, readStoredTheme, resolveTheme, storeTheme } from "@/lib/theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function ThemeToggle({ className = "" }: { className?: string }) {
  // React's dev remount resets <html> attributes set by the inline script.
  useLayoutEffect(() => {
    applyTheme(resolveTheme(readStoredTheme(), matchMedia(DARK_QUERY).matches));
  }, []);

  useEffect(() => {
    const query = matchMedia(DARK_QUERY);
    const followSystem = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    query.addEventListener("change", followSystem);
    return () => query.removeEventListener("change", followSystem);
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo claro y oscuro"
      className={`flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-gold-ink ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden h-[18px] w-[18px] dark:block" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
