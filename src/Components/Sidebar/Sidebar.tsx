import { SidebarOption } from "./SidebarOption";
import DashboardIcon from "../../assets/dashboard2.svg";
import InventarioIcon from "../../assets/inventario.svg";
import FacturaIcon from "../../assets/factura.svg";
import ClientesIcon from "../../assets/clientes.svg";
import ProveedoresIcon from "../../assets/proveedor.svg";



export function Sidebar() {
  return (
    <div className="sidebar bg-[#36363A] p-5 h-screen w-full">
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
          to={""}
        />
        <SidebarOption
          Icon={ClientesIcon}
          title={"Clientes"}
          selected={false}
          to={""}
        />
        <SidebarOption
          Icon={ProveedoresIcon}
          title={"Proveedores"}
          selected={false}
          to={""}
        />
      </nav>
    </div>
  );
}