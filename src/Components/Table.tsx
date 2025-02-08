import type React from "react"

export type Column<T> = {
  header: string
  accessor: keyof T | ((data: T) => React.ReactNode)
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
}

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                {typeof column.accessor === "function"
                  ? column.accessor(row)
                  : (row[column.accessor] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

