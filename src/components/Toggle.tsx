import React from "react";
import cn from "classnames";

function Toggle({
  className = "",
  title,
  alt,
  bottomLeftAlt,
  bottomRightAlt,
  error,
  value,
  onValueChange,
  ...props
}: {
  value?: boolean;
  title?: string;
  alt?: string;
  bottomLeftAlt?: string;
  bottomRightAlt?: string;
  error?: string;
  onValueChange?: (v: string) => void;
} & Omit<Partial<React.InputHTMLAttributes<HTMLInputElement>>, "value">) {
  return (
    <div className={cn("form-control w-full", className)}>
      {(title || alt) && (
        <label className="label">
          <span className="label-text">{title}</span>
          <span className="label-text-alt">{alt}</span>
        </label>
      )}
      <input type="checkbox" className="toggle" {...props} checked={value} />
      {(bottomLeftAlt || bottomRightAlt || error) && (
        <label className="label">
          <span className="label-text-alt">{bottomLeftAlt}</span>
          <span
            className={cn("label-text-alt", {
              "text-error": error,
            })}
          >
            {error ?? bottomRightAlt}
          </span>
        </label>
      )}
    </div>
  );
}

export default Toggle;
