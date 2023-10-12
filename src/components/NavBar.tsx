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
    <div className="bg-base-100">
      <div className="navbar page-content">
        <div className="navbar-start">
          <Icon icon="MB" className="select-none w-12 h-12" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 py-0 space-x-2">
            {config.map(({ name, href }) => (
              <li key={name}>
                <a href={href} className="font-medium text-lg">
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
