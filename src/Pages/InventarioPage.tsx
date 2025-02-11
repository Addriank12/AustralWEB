import { useState } from "react";
import Button from "../Components/Button";
import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import { Producto } from "../Models/Producto";
import { ProductosService } from "../Services/ProductosService";
import NavigationButton from "../Components/NavigationButton";

export default function InventarioPage() {
    const productosService: ProductosService = new ProductosService();
    const [reload, setReload] = useState(false);

    const columns: Column<Producto>[] = [
        { header: "Nombre", accessor: "nombre" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" },
        { header: "Acciones", accessor: (data) => <div className="flex gap-2">
            <NavigationButton to={`producto/${data.id}`}>
                Editar
            </NavigationButton>
            <Button onClick={() => handleDelete(data.id ?? 0)}>
                Eliminar
            </Button>
        </div> }
    ];

    function handleDelete(id: number) {
        productosService.delete(id).then(() => {
            console.log("Deleted");
            setReload(!reload); // Cambia el estado para forzar la recarga
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="p-5">
            <PaginatedTable<Producto> columns={columns} dataService={productosService} newRoute={"producto"} key={reload.toString()} />
        </div>
    );
}