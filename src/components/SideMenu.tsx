import React from "react";

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

function SideMenu() {
  return (
    <div className="">
      <ul className="menu p-4">
        {config.map(({ name, href }) => (
          <li key={name}>
            <a href={href} className="text-lg font-medium">
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
