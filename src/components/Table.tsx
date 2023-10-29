import React from "react";

function Table<T>({
  columns,
  data,
  rowKey = "id" as keyof T,
}: {
  columns: {
    title?: string;
    key: Extract<keyof T, string | number> | string;
    render?: (value: any, row: T) => React.ReactNode;
    as?: "th" | "td";
  }[];
  data: T[];
  rowKey?: keyof T;
}) {
  const header = (
    <>
      {columns.map(({ title, key }) => (
        <th key={key}>{title}</th>
      ))}
    </>
  );
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[rowKey] as string}>
            {columns.map(
              ({
                key,
                render = (v, _) => {
                  if (v instanceof Date) return v.toLocaleString();
                  if (v instanceof Object) return `${v}`;
                  return v;
                },
                as: As = "td",
              }) => (
                <As key={key}>{render(row[key as keyof T], row)}</As>
              ),
            )}
          </tr>
        ))}
      </tbody>
      {/* foot */}
      <tfoot>
        <tr>{header}</tr>
      </tfoot>
    </table>
  );
}

export default Table;
