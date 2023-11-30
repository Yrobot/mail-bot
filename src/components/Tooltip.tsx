import cn from "classnames";

function Tooltip({
  tip = "",
  className,
  children,
}: {
  tip?: string | React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative">
      {children}
      {tip && (
        <span
          className={cn(
            "tooltip-popup invisible max-w-md group-hover:visible",
            className,
          )}
        >
          {tip}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
