"use client";
import { ThemeProvider } from "next-themes";
import { themeArr } from "@/utils/theme";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={themeArr}
      defaultTheme={themeArr[0]}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  );
}

export default Provider;
