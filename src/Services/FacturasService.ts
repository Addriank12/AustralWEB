import { Factura } from "../Models/Factura";
import { GenericService } from "./GenericService";

export class FacturasService extends GenericService<Factura> {
  serviceUrl: string = "/api/Factura";

}
