"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import routes from "@/routes";

function SideMenu() {
  const pathname = usePathname();
  return (
    <div className="">
      <ul className="menu p-4">
        {routes.map(({ name, href, disabled = false }) => (
          <li
            key={name}
            className={cn("text-lg font-medium", {
              "disabled cursor-not-allowed": disabled,
            })}
          >
            <Link
              href={href}
              className={cn({
                "pointer-events-none": disabled,
                active: pathname === href,
              })}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
