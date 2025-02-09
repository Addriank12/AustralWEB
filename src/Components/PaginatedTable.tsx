import { useEffect, useState } from "react";
import { Table, type Column } from "./Table";
import { Loading } from "./Loading";
import { GenericService } from "../Services/GenericService";
import Button from "./Button";
import NavigationButton from "./NavigationButton";

type PaginatedTableProps<T> = {
  columns: Column<T>[];
  dataService: GenericService<T>;
  newRoute: string;
};

export function PaginatedTable<T extends object>({
  dataService,
  columns,
  newRoute,
}: PaginatedTableProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const page = await dataService.getPage(
          currentPage,
          itemsPerPage,
          filter,
          {
            signal: abortController.signal,
          }
        );
        setCurrentData(page.data || []);
        setTotalPages(page.totalPages || 0);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error(err);
          setError("Failed to fetch data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 300); // Debounce de 300ms

    return () => {
      abortController.abort(); // Cancela la solicitud si el componente se desmonta
      clearTimeout(debounceTimer); // Limpia el debounce
    };
  }, [currentPage, itemsPerPage, filter]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Loading isOpen={isLoading} />
      <div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-md text-center flex gap-x-3 text-white">
            <input
              id="search"
              value={filter}
              placeholder="Buscar..."
              className="rounded-2xl bg-[#1D283A] p-2"
              onChange={(e) => setFilter(e.target.value)}
            />
            <NavigationButton to={newRoute}>Nuevo</NavigationButton>
          </span>
          <div className="space-x-2 justify-center items-center p-5">
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
              Previous
            </Button>
            <span className="text-sm font-medium text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
        {error && <div className="text-red-500 text-center my-4">{error}</div>}
        <Table<T> data={currentData} columns={columns} />
      </div>
    </>
  );
}
