export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "adaluz-theme";

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return prefersDark ? "dark" : "light";
}

// Runs before React in <head>; must stay dependency-free ES5 and tolerate blocked storage.
export const themeInitScript = `(function(){var s=null;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var d=false;try{d=matchMedia("(prefers-color-scheme: dark)").matches}catch(e){}var t=s==="light"||s==="dark"?s:d?"dark":"light";document.documentElement.classList.toggle("dark",t==="dark")})()`;

export function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts only for this page view.
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
