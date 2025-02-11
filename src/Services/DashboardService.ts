import { DashboardData } from "../Models/DashboardData";
import { GenericService } from "./GenericService";

export class DashboardService extends GenericService<DashboardData> {
    serviceUrl: string = "/api/dashboard";

}
