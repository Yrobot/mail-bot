import Icon from "@/components/Icon";

function ListEmpty({
  title,
  tips,
  children,
}: {
  title: string;
  tips?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-[60vh] min-h-[300px] flex-col items-center justify-center">
      <Icon className="h-12 w-12" icon="database" />
      <h3 className="mt-2">{title}</h3>
      <p className="tips mt-1">{tips}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

export default ListEmpty;
