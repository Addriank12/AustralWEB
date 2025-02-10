import { useState, useEffect } from "react";
import { Producto } from "../../Models/Producto";
import { Detalle } from "../../Models/Detalle";
import { ProductosService } from "../../Services/ProductosService";

interface ProductSelectionProps {
  detalles: Detalle[];
  readOnly: boolean;
  option: string,
  onAddDetalle: (detalle: Detalle) => void;
  onUpdateDetalle: (detalle: Detalle) => void;
  onRemoveDetalle: (idProducto: number) => void;
}

export function ProductSelection({
  detalles,
  readOnly,
  option,
  onAddDetalle,
  onUpdateDetalle,
  onRemoveDetalle,
}: ProductSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tipoOperacion: string = option;


  const productosService: ProductosService = new ProductosService();

  // Simula la carga de productos desde una API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchProductos = async () => {
      try {
        const response = await productosService.getPage(1, 10, searchTerm, {
          signal: abortController.signal,
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, [searchTerm]);

  const handleAddDetalle = () => {
    if (selectedProduct && cantidad > 0) {
      // Ajustar el precio si es una compra
      const precio = selectedProduct.precio;
        tipoOperacion === "compra"
      const subtotal = precio * cantidad;

      const newDetalle: Detalle = {
        idProducto: selectedProduct.id!,
        precio,
        cantidad, 
        subtotal,
      };
      onAddDetalle(newDetalle);
      setSelectedProduct(null);
      setCantidad(1);
      setSearchTerm("");
    }
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="bg-[#030711] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Productos</h2>
      {!readOnly && (
        <div className="mb-4">
          

          {/* Buscador de productos */}
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-2xl bg-[#1D283A] p-2 text-white w-full placeholder-gray-400"
          />
          {searchTerm && (
            <ul className="mt-2 border border-gray-700 rounded-lg bg-[#1D283A]">
              {filteredProductos.map((producto) => (
                <li
                  key={producto.id}
                  onClick={() => {
                    setSelectedProduct(producto);
                    setSearchTerm("");
                  }}
                  className="p-2 hover:bg-[#2A3A50] cursor-pointer text-white"
                >
                  {producto.nombre} - ${producto.precio.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1D283A]">
            <th className="p-2 text-left text-white">Producto</th>
            <th className="p-2 text-left text-white">Precio</th>
            <th className="p-2 text-left text-white">Cantidad</th>
            <th className="p-2 text-left text-white">Subtotal</th>
            <th className="p-2 text-left text-white"></th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => {
            const producto = productos.find((p) => p.id === detalle.idProducto);
            if (!producto) return null;

            // Precio y subtotal basados en el detalle actual
            const precio = detalle.precio || producto.precio; // Usamos el precio del detalle si existe
            const subtotal = precio * detalle.cantidad;

            return (
              <tr key={detalle.idProducto} className="border-b border-gray-700">
                <td className="p-2 text-white">{producto.nombre}</td>
                <td className="p-2">
                  <input
                    readOnly={readOnly}
                    type="number"
                    step="0.01"
                    value={precio.toFixed(2)}
                    onChange={(e) => {
                      const nuevoPrecio = parseFloat(e.target.value) || 0;
                      onUpdateDetalle({
                        ...detalle,
                        precio: nuevoPrecio,
                        subtotal: nuevoPrecio * detalle.cantidad,
                      });
                    }}
                    className="w-20 p-1 border rounded bg-[#1D283A] text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    readOnly={readOnly}
                    type="number"
                    value={detalle.cantidad}
                    onChange={(e) => {
                      const nuevaCantidad =
                        Number.parseInt(e.target.value) || 0;
                      onUpdateDetalle({
                        ...detalle,
                        cantidad: nuevaCantidad,
                        subtotal: precio * nuevaCantidad,
                      });
                    }}
                    className="w-20 p-1 border rounded bg-[#1D283A] text-white"
                  />
                </td>
                <td className="p-2 text-white">${subtotal.toFixed(2)}</td>
                <td className="p-2">
                  <button
                    onClick={() => onRemoveDetalle(detalle.idProducto)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
          {!readOnly && (
            <>
              <tr>
                <td className="p-2 text-white">
                  {selectedProduct
                    ? selectedProduct.nombre
                    : "Seleccione un producto"}
                </td>
                <td className="p-2 text-white">
                  {selectedProduct
                    ? `$${(tipoOperacion === "compra"
                        ? selectedProduct.precio
                        : selectedProduct.precio
                      ).toFixed(2)}`
                    : "-"}
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) =>
                      setCantidad(Number.parseInt(e.target.value) || 1)
                    }
                    className="w-20 p-1 border rounded bg-[#1D283A] text-white"
                  />
                </td>
                <td className="p-2 text-white">
                  $
                  {(selectedProduct
                    ? (tipoOperacion === "compra"
                        ? selectedProduct.precio
                        : selectedProduct.precio) * cantidad
                    : 0
                  ).toFixed(2)}
                </td>
                <td className="p-2">
                  <button
                    onClick={handleAddDetalle}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    ➕
                  </button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
