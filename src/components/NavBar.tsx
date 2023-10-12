import React from "react";
import Icon from "@/components/Icon";

const config = [
  {
    name: "通道",
    href: "/",
  },
  {
    name: "接口",
    href: "/apis",
  },
  {
    name: "关于",
    href: "/about",
  },
];

function NavBar() {
  return (
    <div className="sticky top-0 bg-base-100">
      <div className="page-content navbar">
        <div className="navbar-start">
          <Icon icon="MB" className="h-12 w-12 select-none" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 px-1 py-0">
            {config.map(({ name, href }) => (
              <li key={name}>
                <a href={href} className="text-lg font-medium">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
}

export default NavBar;
