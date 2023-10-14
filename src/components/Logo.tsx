import React from "react";
import Icon from "@/components/Icon";

function Logo({ icon = true, text = true }) {
  return (
    <div className="inline-flex select-none items-center justify-center space-x-2">
      {icon && <Icon icon="MB" className="h-8 w-8 select-none" />}
      {text && (
        <span className="text-2xl font-bold tracking-tight">Mail-Bot</span>
      )}
    </div>
  );
}

export default Logo;
