import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import InventarioPage from "./Pages/InventarioPage";
import { NuevoProducto } from "./Pages/NuevoProducto";
import ClientesPage from "./Pages/ClientesPage";
import { NuevoCliente } from "./Pages/NuevoCliente";
import ProveedoresPage from "./Pages/ProveedoresPage";
import { NuevoProveedor } from "./Pages/NuevoProveedor";
import { NuevaFactura } from "./Pages/Factura/NuevaFactura";
import FacturasPage from "./Pages/FacturasPage";
const background = "/src/assets/bk.webp";

function App() {
  return (
    <>
      <img src={background} alt="" className="background-image" />
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inventario" element={<InventarioPage />} />
            <Route
              path="/inventario/producto/:id"
              element={<NuevoProducto />}
            />
            <Route path="/inventario/producto" element={<NuevoProducto />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/clientes/cliente/:id" element={<NuevoCliente />} />
            <Route path="/clientes/cliente" element={<NuevoCliente />} />

            <Route path="/proveedores" element={<ProveedoresPage />} />
            <Route
              path="/proveedores/proveedor/:id"
              element={<NuevoProveedor />}
            />
            <Route path="/proveedores/proveedor" element={<NuevoProveedor />} />
            <Route path="/nuevafactura" element={<NuevaFactura />} />

            <Route path="/facturas" element={<FacturasPage />} />
            <Route path="/facturas/factura/:id" element={<NuevaFactura />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
