import React, { useEffect, useState } from "react";
import { ItemCarrito } from "../Models/ItemCarrito";
import { Producto } from "../Models/Producto";
import { Factura } from "../Models/Factura";
import { ProductosService } from "../Services/ProductosService";
import { FacturasService } from "../Services/FacturasService";
import { Cliente } from "../Models/Cliente";
import { Detalle } from "../Models/Detalle";
import { AuthService } from "../Services/AuthService";
import AuthForm from "../Layout/AuthForm";

const ClienteView: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] =
    useState(false);
  const [facturaGenerada, setFacturaGenerada] = useState<Factura | null>(null);
  const [mostrarAuthForm, setMostrarAuthForm] = useState(false);

  const productosService: ProductosService = new ProductosService();
  const facturaService: FacturasService = new FacturasService();

  useEffect(() => {
    // Obtener productos desde el backend
    productosService
      .getPage(1, 10, "")
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error fetching data:", error));

    // Verificar si el cliente ya está autenticado
    const cliente = AuthService.getCurrentCliente();
    if (cliente) {
      setCliente(cliente);
    }
  }, []);

  // Función para manejar el inicio de sesión/registro
  const handleLogin = (cliente: Cliente) => {
    setCliente(cliente);
    setMostrarAuthForm(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    AuthService.logout();
    setCliente(null);
  };

  // Función para añadir un producto al carrito
  const agregarAlCarrito = (producto: Producto) => {
    const itemExistente = carrito.find(
      (item) => item.producto.id === producto.id
    );

    if (itemExistente) {
      // Verificar si hay suficiente stock
      if (itemExistente.cantidad + 1 > producto.stock) {
        alert("No hay suficiente stock disponible.");
        return;
      }
      // Si el producto ya está en el carrito, aumenta la cantidad
      setCarrito(
        carrito.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      // Si el producto no está en el carrito, lo añade
      if (producto.stock < 1) {
        alert("No hay suficiente stock disponible.");
        return;
      }
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.producto.id !== id));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.producto.id === id ? { ...item, cantidad } : item
        )
      );
    }
  };

  // Calcular el total del carrito
  const totalCarrito = carrito.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  // Función para manejar el cambio en los datos del cliente
  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (cliente) {
      setCliente({ ...cliente, [name]: value });
    }
  };

  // Función para generar la factura
  const generarFactura = async () => {
    if (
      !cliente?.nombre ||
      !cliente?.direccion ||
      !cliente?.email ||
      !cliente?.telefono
    ) {
      alert("Por favor, complete todos los datos del cliente.");
      return;
    }

    // Crear los detalles de la factura
    const detalles: Detalle[] = carrito.map((item) => ({
      idProducto: item.producto.id ?? 0,
      precio: item.producto.precio,
      cantidad: item.cantidad,
      subtotal: item.producto.precio * item.cantidad,
    }));

    // Crear la factura
    const factura: Factura = {
      fecha: new Date(),
      total: totalCarrito,
      idCliente: cliente?.id ?? 0,
      pago: {
        metodo: "Efectivo", // Puedes cambiar esto según el método de pago
        monto: totalCarrito,
      },
      detalles: detalles,
      idEmpleado: 0,
    };

    try {
      const response = await facturaService.create(factura);
      setFacturaGenerada(response);
      alert("Factura generada exitosamente.");
      setCarrito([]); // Vaciar el carrito después de generar la factura
    } catch (error) {
      console.error("Error al generar la factura:", error);
      alert("Hubo un error al generar la factura.");
    }
  };

  return (
    <div className="bg-[#030711] p-4 min-h-screen text-white">
      {mostrarAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AuthForm
            onLogin={(cliente) => {
              setCliente(cliente);
              setMostrarAuthForm(false);
            }}
          />
        </div>
      )}
      <div className="flex justify-end mb-4">
        {cliente ? (
          <div className="flex items-center">
            <p className="text-gray-400 mr-4">Bienvenido, {cliente.nombre}</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => setMostrarAuthForm(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-4">Catálogo de Productos</h1>

      {/* Catálogo de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-[#1D283A] p-4 rounded-lg shadow-lg"
          >
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-400">${producto.precio.toFixed(2)}</p>
            <p className="text-gray-400">Stock: {producto.stock}</p>
            <button
              onClick={() => agregarAlCarrito(producto)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Carrito de Compras */}
      <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="text-gray-400">El carrito está vacío.</p>
        ) : (
          <>
            <ul>
              {carrito.map((item) => (
                <li key={item.producto.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.producto.nombre}
                      </h3>
                      <p className="text-gray-400">
                        ${item.producto.precio.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(
                            item.producto.id ?? 0,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 p-2 border rounded-lg bg-[#030711] text-white"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          eliminarDelCarrito(item.producto.id ?? 0)
                        }
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xl font-semibold">
                Total: ${totalCarrito.toFixed(2)}
              </p>
              <button
                onClick={() => setMostrarFormularioCliente(true)}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>

      {/* Formulario del Cliente */}
      {mostrarFormularioCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Datos del Cliente</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-400">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={cliente?.nombre}
                  onChange={handleClienteChange}
                  className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={cliente?.direccion}
                  onChange={handleClienteChange}
                  className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={cliente?.email}
                  onChange={handleClienteChange}
                  className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={cliente?.telefono}
                  onChange={handleClienteChange}
                  className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioCliente(false)}
                  className="mr-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={generarFactura}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Generar Factura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mostrar Factura Generada */}
      {facturaGenerada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Factura Generada</h2>
            <p className="text-gray-400">
              Número de Factura: {facturaGenerada.id}
            </p>
            <p className="text-gray-400">
              Total: ${facturaGenerada.total.toFixed(2)}
            </p>
            <button
              onClick={() => setFacturaGenerada(null)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteView;
