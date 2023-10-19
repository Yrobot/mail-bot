import React from "react";
import cn from "classnames";

function Input({
  className = "",
  title,
  alt,
  bottomLeftAlt,
  bottomRightAlt,
  error,
  onValueChange,
  ...props
}: {
  title?: string;
  alt?: string;
  bottomLeftAlt?: string;
  bottomRightAlt?: string;
  error?: string;
  onValueChange?: (v: string) => void;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <div className={cn("form-control w-full", className)}>
      {(title || alt) && (
        <label className="label">
          <span className="label-text">{title}</span>
          <span className="label-text-alt">{alt}</span>
        </label>
      )}
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        {...props}
      />
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

export default Input;
