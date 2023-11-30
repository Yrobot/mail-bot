"use client";
import { useTheme as useNextTheme } from "next-themes";

export enum themes {
  "dark" = "dark",
  "light" = "light",
  "lofi" = "lofi",
}

export type Theme = `${themes}`;

export const themeArr: Theme[] = Object.values(themes);

export const useTheme = useNextTheme;
