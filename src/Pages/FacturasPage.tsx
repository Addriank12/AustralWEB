import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import NavigationButton from "../Components/NavigationButton";
import { FacturasService } from "../Services/FacturasService";
import { Factura } from "../Models/Factura";
import { useLocation } from "react-router-dom";
import { ComprasService } from "../Services/ComprasService";

export default function FacturasPage() {
    
    const location = useLocation();

    const columnsFC: Column<Factura>[] = [
        { header: "Cliente", accessor: (data) => data.idClienteNavigation?.nombre },
        { header: "Fecha", accessor: "fecha" },
        { header: "Total", accessor: "total" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`${data.id}`}>
                Ver
            </NavigationButton>
        </div> }
    ];

    const columnsC: Column<Factura>[] = [
        { header: "Proveedor", accessor: (data) => data.idProveedorNavigation?.nombre },
        { header: "Fecha", accessor: "fecha" },
        { header: "Total", accessor: "total" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`${data.id}`}>
                Ver
            </NavigationButton>
        </div> }
    ];

    return (
        <div className="p-5">
            {location.pathname === "/admin/facturas" ? (
            <PaginatedTable<Factura> columns={columnsFC} dataService={new FacturasService} newRoute={"/nuevafactura"}  />
            ) : (
            <PaginatedTable<Factura> columns={columnsC} dataService={new ComprasService} newRoute={"/nuevacompra"} />
            )}
        </div>
    );
}