import { useEffect, useState } from "react";
import { ClientesService } from "../../Services/ClientesService";
import { ProveedoresService } from "../../Services/ProveedoresService";
import { Person } from "../../Models/Person";

export function CustomerSelection({
  onSelect,
  customer,
  option,
}: {
  onSelect: (value: Person) => void;
  customer?: Person | null;
  option: string;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Person[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Person | null>(
    null
  );
  const [readOnly, setReadOnly] = useState(false);

  const clientesService = new ClientesService();
  const proveedoresService = new ProveedoresService();

  useEffect(() => {
    if (customer) {
      setSelectedCustomer(customer);
      setReadOnly(true);
      return;
    }
    const abortController = new AbortController();

    const fetchCustomers = async () => {
      try {
        if (option === "compra") {
          const page = await proveedoresService.getPage(1, 10, searchTerm, {
            signal: abortController.signal,
          });
          setCustomers(page.data);
        } else {
          const page = await clientesService.getPage(1, 10, searchTerm, {
            signal: abortController.signal,
          });
          setCustomers(page.data);
        }

        setError(null); // Limpia el error si la solicitud es exitosa
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error(err);
          setError("Failed to fetch customers. Please try again later.");
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCustomers();
    }, 300); // Debounce de 300ms

    return () => {
      abortController.abort(); // Cancela la solicitud si el componente se desmonta
      clearTimeout(debounceTimer); // Limpia el debounce
    };
  }, [searchTerm, customer, option]);

  return (
    <div className="bg-[#030711] p-4 rounded-lg shadow-lg">
      {option === "compra" ? (
        <h2 className="text-xl font-semibold mb-4 text-white">Proveedor</h2>
      ) : (
        <h2 className="text-xl font-semibold mb-4 text-white">Cliente</h2>
      )}
      <div className="relative">
        <button
          disabled={readOnly}
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-2 border rounded-2xl bg-[#1D283A] text-white"
        >
          {selectedCustomer
            ? selectedCustomer.nombre
            : "Seleccione un cliente..."}
          <span className="ml-2">▼</span>
        </button>

        {open && (
          <div className="absolute w-full mt-1 border rounded-2xl bg-[#1D283A] shadow-lg z-10">
            <input
              readOnly={readOnly}
              type="text"
              placeholder="Buscar Cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border-b rounded-t-2xl bg-[#1D283A] text-white placeholder-gray-400"
            />
            <ul className="max-h-60 overflow-y-auto">
              {error ? (
                <li className="p-2 text-red-400">{error}</li>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <li
                    key={customer.id}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      onSelect(customer);
                      setOpen(false);
                    }}
                    className={`p-2 cursor-pointer hover:bg-[#2A3A50] text-white ${
                      selectedCustomer?.id === customer.id ? "bg-[#3A4B60]" : ""
                    }`}
                  >
                    {customer.nombre}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-400">
                  No se encontraron clientes.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
