import React from "react";

function Table<
  T extends {
    key: string | number;
  },
>({
  columns,
  data,
}: {
  columns: {
    title?: string;
    key: Extract<keyof T, string | number> | string;
    render?: (value: any, row: T) => React.ReactNode;
    as?: "th" | "td";
  }[];
  data: (T & {
    [key: string]: unknown;
  })[];
}) {
  const header = (
    <>
      {columns.map(({ title, key }) => (
        <th key={key}>{title}</th>
      ))}
    </>
  );
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.key}>
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
                  <As key={key}>{render(row[key], row)}</As>
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
    </div>
  );
}

export default Table;
