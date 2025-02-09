import { Cliente } from "../Models/Cliente";
import { GenericService } from "./GenericService";

export class ClientesService extends GenericService<Cliente> {
    serviceUrl: string = "/api/Clientes";

}