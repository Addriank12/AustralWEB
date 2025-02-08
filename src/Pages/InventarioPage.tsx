import { PaginatedTable } from "../Components/PaginatedTable";
import { Column } from "../Components/Table";
import { Producto } from "../Models/Producto";
import { ProductosService } from "../Services/ProductosService";

export default function InventarioPage() {
    const productosService: ProductosService = new ProductosService();

    const columns: Column<Producto>[] = [
        { header: "Nombre", accessor: "nombre" },
        { header: "Precio", accessor: "precio" },
        { header: "Stock", accessor: "stock" }
      ]
    
    return (
        <div>
            <PaginatedTable<Producto> columns={columns} dataService={productosService}/>
        </div>
    )
}