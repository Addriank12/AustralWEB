import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
};

type TableProps<T extends object> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  emptyMessage?: string;
} & React.HTMLAttributes<HTMLTableElement>;

export function Table<T extends object>({
  data,
  columns,
  className,
  emptyMessage = "No data available",
  ...rest
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <table
        className="min-w-full divide-y divide-gray-700"
        aria-label="Table of data"
        {...rest}
      >
        <thead className="bg-[#1D283A]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`header-${index}`}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#2A3B5A] divide-y divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="hover:bg-[#3B4A6B]">
              {columns.map((column, columnIndex) => (
                <td
                  key={`cell-${rowIndex}-${columnIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                >
                  {typeof column.accessor === "function"
                    ? column.accessor(row)
                    : (row[column.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}