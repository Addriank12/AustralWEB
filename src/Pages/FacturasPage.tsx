import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import NavigationButton from "../Components/NavigationButton";
import { useState } from "react";
import { FacturasService } from "../Services/FacturasService";
import { Factura } from "../Models/Factura";

export default function FacturasPage() {
    const facturaService: FacturasService = new FacturasService();
    const [reload, setReload] = useState(false);

    const columns: Column<Factura>[] = [
        { header: "Cliente", accessor: (data) => data.idClienteNavigation?.nombre },
        { header: "Fecha", accessor: "fecha" },
        { header: "Total", accessor: "total" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`factura/${data.id}`}>
                Ver
            </NavigationButton>
        </div> }
    ];

    return (
        <div className="p-5">
            <PaginatedTable<Factura> columns={columns} dataService={facturaService} newRoute={"/nuevafactura"} key={reload.toString()} />
        </div>
    );
}