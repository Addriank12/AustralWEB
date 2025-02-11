export interface DashboardData {
  totalVentas: number;
  totalCompras: number;
  totalGanancias: number;
  totalClientes: number;
  gananciasPorMes: { mes: string; ganancia: number }[];
}