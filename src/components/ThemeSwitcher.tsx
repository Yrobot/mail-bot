"use client";
import React from "react";
import Icon from "@/components/Icon";

enum themes {
  "dark" = "dark",
  "light" = "light",
  "lofi" = "lofi",
}

type Theme = `${themes}`;

export const setTheme = (theme: Theme) => {
  document?.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
};

const ThemeOption = ({ theme }: { theme: Theme }) => (
  <button
    className="overflow-hidden rounded-lg text-left outline-base-content"
    data-set-theme={theme}
    onClick={() => setTheme(theme)}
  >
    <span
      data-theme={theme}
      className="block w-full cursor-pointer bg-base-100 font-sans text-base-content"
    >
      <span className="grid grid-cols-5 grid-rows-3">
        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
          {/* <Icon className="h-3 w-3 shrink-0" icon="check" /> */}
          <span className="flex-grow text-sm">{theme}</span>
          <span
            className="flex h-full flex-shrink-0 flex-wrap gap-1"
            data-svelte-h="svelte-dkjulf"
          >
            <span className="w-2 rounded bg-primary"></span>
            <span className="w-2 rounded bg-secondary"></span>
            <span className="w-2 rounded bg-accent"></span>
            <span className="w-2 rounded bg-neutral"></span>
          </span>
        </span>
      </span>
    </span>
  </button>
);

function ThemeSwitcher() {
  return (
    <div title="Change Theme" className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost">
        <span className="font-normal">Theme</span>
        <Icon icon="arrow-down" className="h-2 w-2 fill-current opacity-60" />
      </div>
      <div className="dropdown-content rounded-box top-px mt-16 max-h-[70vh] w-40 overflow-y-auto bg-base-200 text-base-content shadow">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {Object.values(themes).map((theme) => (
            <ThemeOption theme={theme} key={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
