"use client";
import React from "react";
import cn from "classnames";
import { useClientState } from "@/utils/hooks";

const config = [
  {
    name: "邮箱",
    href: "/",
  },
  {
    name: "接口",
    href: "/apis",
  },
  {
    name: "消息",
    href: "/messages",
  },
  {
    name: "关于",
    href: "/about",
  },
];

function SideMenu() {
  const [path] = useClientState({
    default: config[0].href,
    getState: () => window.location.pathname,
  });
  return (
    <div className="">
      <ul className="menu p-4">
        {config.map(({ name, href }) => (
          <li key={name}>
            <a
              href={href}
              className={cn("text-lg font-medium", {
                active: path === href,
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
