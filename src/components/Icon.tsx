"use client";
import React, { useEffect } from "react";
import cn from "classnames";

function Icon({ className = "", icon = "", ...props }) {
  useEffect(() => {
    import("@yrobot/svg-inline");
  });
  return (
    <svg-inline
      {...props}
      src={`/icons/${icon}.svg`}
      class={cn("overflow-hidden", className)}
    />
  );
}

export default Icon;
