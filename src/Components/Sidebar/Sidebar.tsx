import { SidebarOption } from "./SidebarOption";
import DashboardIcon from "../../assets/dashboard2.svg";
import InventarioIcon from "../../assets/inventario.svg";
import FacturaIcon from "../../assets/factura.svg";
import ClientesIcon from "../../assets/clientes.svg";
import ProveedoresIcon from "../../assets/proveedor.svg";
import ComprasIcon from "../../assets/compras.svg";
import FacturasIcon from "../../assets/facturas.svg";

export function Sidebar() {
  return (
    <div className="sidebar p-5 h-screen w-64 bg-gray-900 bg-opacity-90 shadow-lg">
      <nav className="space-y-2">
        <SidebarOption
          Icon={DashboardIcon}
          title={"Dashboard"}
          selected={false}
          to={"dashboard"}
        />
        <SidebarOption
          Icon={InventarioIcon}
          title={"Inventario"}
          selected={false}
          to={"inventario"}
        />
        <SidebarOption
          Icon={FacturaIcon}
          title={"Nueva Factura"}
          selected={false}
          to={"nuevafactura"}
        />
        <SidebarOption
          Icon={ComprasIcon}
          title={"Nueva Compra"}
          selected={false}
          to={"nuevacompra"}
        />
        <SidebarOption
          Icon={ClientesIcon}
          title={"Clientes"}
          selected={false}
          to={"clientes"}
        />
        <SidebarOption
          Icon={ProveedoresIcon}
          title={"Proveedores"}
          selected={false}
          to={"proveedores"}
        />
        <SidebarOption
          Icon={FacturasIcon}
          title={"Facturas"}
          selected={false}
          to={"facturas"}
        />
        <SidebarOption
          Icon={FacturasIcon}
          title={"Compras"}
          selected={false}
          to={"compras"}
        />
      </nav>
    </div>
  );
}