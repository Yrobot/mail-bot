import cn from "classnames";

function Tooltip({
  tip = "",
  className,
  children,
}: {
  tip?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative">
      {children}
      {tip && (
        <span
          className={cn(
            "tooltip-popup invisible group-hover:visible",
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
