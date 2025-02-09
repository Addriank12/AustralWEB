import Button from "../Components/Button";
import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import NavigationButton from "../Components/NavigationButton";
import { ClientesService } from "../Services/ClientesService";
import { Cliente } from "../Models/Cliente";
import { useState } from "react";

export default function InventarioPage() {
    const clientesService: ClientesService = new ClientesService();
    const [reload, setReload] = useState(false);

    const columns: Column<Cliente>[] = [
        { header: "Nombre", accessor: "nombre" },
        { header: "Teléfono", accessor: "telefono" },
        { header: "Email", accessor: "email" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`cliente/${data.id}`}>
                Editar
            </NavigationButton>
            <Button onClick={() => handleDelete(data.id ?? 0)}>
                Eliminar
            </Button>
        </div> }
    ];

    function handleDelete(id: number) {
        clientesService.delete(id).then(() => {
            console.log("Deleted");
            setReload(!reload); // Cambia el estado para forzar la recarga
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="p-5">
            <PaginatedTable<Cliente> columns={columns} dataService={clientesService} newRoute={"cliente"} key={reload.toString()} />
        </div>
    );
}