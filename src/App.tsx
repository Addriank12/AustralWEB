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
import DashboardPage from "./Pages/DashboardPage";
import ClienteView from "./cliente-app/ClienteView";
import ClientLayout from "./Layout/ClientLayout";
import AuthForm from "./cliente-app/AuthForm";
import AuthLayout from "./Layout/AuthLayout";
import ProductInfo from "./cliente-app/productInfo";
const background = "/src/assets/bk.webp";

function App() {
  return (
    <>
      <img src={background} alt="" className="background-image" />
      <main>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<ClienteView />} />
            <Route path="product/:id" element={<ProductInfo />} />
            
          </Route>
          <Route path="login" element={<AuthLayout />}>
            <Route path="/login" element={<AuthForm />} />
            
          </Route>
          <Route path="admin" element={<Layout />}>
            <Route path="inventario" element={<InventarioPage />} />
            <Route
              path="inventario/producto/:id"
              element={<NuevoProducto />}
            />
            <Route path="inventario/producto" element={<NuevoProducto />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="clientes/cliente/:id" element={<NuevoCliente />} />
            <Route path="clientes/cliente" element={<NuevoCliente />} />

            <Route path="proveedores" element={<ProveedoresPage />} />
            <Route
              path="proveedores/proveedor/:id"
              element={<NuevoProveedor />}
            />
            <Route path="proveedores/proveedor" element={<NuevoProveedor />} />
            <Route path="nuevafactura" element={<NuevaFactura />} />
            <Route path="nuevacompra" element={<NuevaFactura />} />

            <Route path="facturas" element={<FacturasPage />} />
            <Route path="facturas/:id" element={<NuevaFactura />} />

            <Route path="compras" element={<FacturasPage />} />
            <Route path="compras/:id" element={<NuevaFactura />} />

            <Route path="dashboard" element={<DashboardPage />} />
           

          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
