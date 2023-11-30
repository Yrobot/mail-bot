"use client";
import React from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import { themes, Theme, useTheme } from "@/utils/theme";
import { useMounted } from "@/utils/hooks";

const ThemeOption = ({
  theme,
  setTheme,
  isChecked,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isChecked: boolean;
}) => {
  const mounted = useMounted();
  return (
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
            <Icon
              className={cn("h-3 w-3 shrink-0", {
                invisible: !mounted || !isChecked,
              })}
              icon="check"
            />
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
};

function ThemeSwitcher() {
  const { theme: current, setTheme } = useTheme();
  return (
    <div title="Change Theme" className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost">
        <span className="font-normal">主题</span>
        <Icon icon="arrow-down" className="h-2 w-2 fill-current opacity-60" />
      </div>
      <div className="dropdown-content rounded-box top-px mt-16 max-h-[70vh] w-48 overflow-y-auto bg-base-200 text-base-content shadow">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          {Object.values(themes).map((theme) => (
            <ThemeOption
              theme={theme}
              key={theme}
              setTheme={setTheme}
              isChecked={current === theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
