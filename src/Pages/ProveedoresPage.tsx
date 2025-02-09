import { useState } from "react";
import Button from "../Components/Button";
import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import NavigationButton from "../Components/NavigationButton";
import { ProveedoresService } from "../Services/ProveedoresService";
import { Proveedor } from "../Models/Proveedor";

export default function ProveedoresPage() {
    const proveedoresService: ProveedoresService = new ProveedoresService();
    const [reload, setReload] = useState(false);

    const columns: Column<Proveedor>[] = [
        { header: "Nombre", accessor: "nombre" },
        { header: "Teléfono", accessor: "telefono" },
        { header: "Dirección", accessor: "direccion" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`proveedor/${data.id}`}>
                Editar
            </NavigationButton>
            <Button onClick={() => handleDelete(data.id ?? 0)}>
                Eliminar
            </Button>
        </div> }
    ];

    function handleDelete(id: number) {
        proveedoresService.delete(id).then(() => {
            console.log("Deleted");
            setReload(!reload); // Cambia el estado para forzar la recarga
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="p-5">
            <PaginatedTable<Proveedor> columns={columns} dataService={proveedoresService} newRoute={"proveedor"} key={reload.toString()} />
        </div>
    );
}