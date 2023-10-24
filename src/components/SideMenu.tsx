"use client";
import React from "react";
import cn from "classnames";
import { useClientState } from "@/utils/hooks";
import routes from "@/routes";

function SideMenu() {
  const [path] = useClientState({
    default: routes[0].href,
    getState: () => window.location.pathname,
  });
  return (
    <div className="">
      <ul className="menu p-4">
        {routes.map(({ name, href, disabled = false }) => (
          <li
            key={name}
            className={cn({
              "disabled cursor-not-allowed": disabled,
            })}
          >
            <a
              href={href}
              className={cn("text-lg font-medium", {
                active: path === href,
                "pointer-events-none": disabled,
              })}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
