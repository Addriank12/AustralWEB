import React, { useEffect, useState } from "react";
import { Table, type Column } from "./Table";
import { Loading } from "./Loading";
import { GenericService } from "../Services/GenericService";

type PaginatedTableProps<T> = {
  columns: Column<T>[];
  dataService: GenericService<T>;
};

export function PaginatedTable<T>({
  dataService,
  columns,
}: PaginatedTableProps<T>) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const [filter, setFilter] = useState("");
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setIsLoading(true);
    dataService
      .getPage(currentPage, itemsPerPage, filter)
      .then((page) => setCurrentData(page.Data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [currentPage, itemsPerPage, filter]);

  return (
    <>
      <Loading isOpen={isLoading} />
      <div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            <label htmlFor="search">Buscar:</label>
            <input id="search" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <Table data={currentData} columns={columns} />
      </div>
    </>
  );
}
