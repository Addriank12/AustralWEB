import { SidebarOption } from "./SidebarOption";
import DashboardIcon from "../../assets/dashboard2.svg";
import InventarioIcon from "../../assets/inventario.svg";
import FacturaIcon from "../../assets/factura.svg";
import ClientesIcon from "../../assets/clientes.svg";
import ProveedoresIcon from "../../assets/proveedor.svg";



export function Sidebar() {
  return (
    <div className="sidebar p-5 h-screen w-full bg-opacity-50 bg-black shadow-md">
      <nav className="space-y-2 px-2">
        <SidebarOption
          Icon={DashboardIcon}
          title={"Dashboard"}
          selected={false}
          to={""}
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
          Icon={FacturaIcon}
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
          Icon={ProveedoresIcon}
          title={"Facturas"}
          selected={false}
          to={"facturas"}
        />



      </nav>
    </div>
  );
}