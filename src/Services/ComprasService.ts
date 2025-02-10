import { Factura } from "../Models/Factura";
import { GenericService } from "./GenericService";

export class ComprasService extends GenericService<Factura> {
    serviceUrl: string = "/api/Compras";

}