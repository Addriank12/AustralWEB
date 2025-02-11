import { DashboardData } from "../Models/DashboardData";
import { Factura } from "../Models/Factura";
import { GenericService } from "./GenericService";

export class DashboardService extends GenericService<DashboardData> {
    serviceUrl: string = "/api/dashboard";

}
