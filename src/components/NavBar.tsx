import React from "react";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const config = [
  {
    content: <ThemeSwitcher />,
    key: "theme",
  },
  {
    content: (
      <a
        href="https://github.com/Yrobot/mail-bot"
        className="btn btn-ghost"
        target="_blank"
      >
        <Icon icon="github" className="h-6 w-6" />
      </a>
    ),
    key: "github",
  },
];

function NavBar() {
  return (
    <div className="sticky top-0 z-30 bg-base-100">
      <div className="navbar px-8">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-end">
          <ul className="flex items-center justify-center space-x-2">
            {config.map(({ content, key }) => (
              <li key={key}>{content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
