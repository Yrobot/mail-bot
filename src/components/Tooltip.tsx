function Tooltip({
  tip = "",
  children,
}: {
  tip?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative">
      {children}
      {tip && (
        <span className="tooltip-popup invisible group-hover:visible">
          {tip}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
