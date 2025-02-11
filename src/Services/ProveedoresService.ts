import { Proveedor } from "../Models/Proveedor";
import { GenericService } from "./GenericService";

export class ProveedoresService extends GenericService<Proveedor> {
    serviceUrl: string = "/api/Proveedores";

}