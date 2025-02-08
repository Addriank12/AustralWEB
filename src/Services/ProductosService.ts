import { Producto } from "../Models/Producto";
import { GenericService } from "./GenericService";

export class ProductosService extends GenericService<Producto> {
    serviceUrl: string = "/api/Productos";

}