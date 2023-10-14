"use client";
import { useEffect } from "react";
import { useLocalStorageState } from "ahooks";

export enum themes {
  "dark" = "dark",
  "light" = "light",
  "lofi" = "lofi",
}

export type Theme = `${themes}`;

export const useTheme = () => {
  const [theme = `${themes.lofi}`, setTheme] =
    useLocalStorageState<Theme>("USER_SET_THEME");

  useEffect(() => {
    if (theme) {
      document
        ?.getElementsByTagName("html")?.[0]
        ?.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return { theme, setTheme };
};
