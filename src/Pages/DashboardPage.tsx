import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Loading } from "../Components/Loading";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Definir la interfaz para los datos del dashboard
interface DashboardData {
  totalVentas: number;
  totalCompras: number;
  totalGanancias: number;
  totalClientes: number;
  gananciasPorMes: { mes: string; ganancia: number }[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Fetch data from the backend
    fetch("https://localhost:7035/api/dashboard")
      .then((response) => response.json())
      .then((data: DashboardData) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <Loading isOpen={true}/>;
  }

  // Datos para la gráfica de ganancias por mes
  const chartData = {
    labels: data.gananciasPorMes.map((item) => item.mes),
    datasets: [
      {
        label: "Ganancias por Mes",
        data: data.gananciasPorMes.map((item) => item.ganancia),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ganancias por Mes",
      },
    },
  };

  return (
    <div className="h-screen p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Total Ventas</h2>
          <p className="text-gray-400">{data.totalVentas}</p>
        </div>
        <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Total Compras</h2>
          <p className="text-gray-400">{data.totalCompras}</p>
        </div>
        <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Total Ganancias</h2>
          <p className="text-gray-400">${data.totalGanancias}</p>
        </div>
        <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Total Clientes</h2>
          <p className="text-gray-400">{data.totalClientes}</p>
        </div>
      </div>

      {/* Gráfica de ganancias por mes */}
      <div className="bg-[#1D283A]  p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Ganancias por Mes
        </h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
