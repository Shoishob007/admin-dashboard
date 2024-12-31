"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashCards from "./components/Dash-Cards";
import {
  DashBarChart,
  DashColumnChart,
  DashDoughnutChart,
  DashLineChart,
} from "./components/Dash-Charts";
import DashTable from "./components/Dash-Table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setData(data.slice(0, 5)));
  }, []);

  return (
    <div>
      <header className="flex h-16 items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
        <DashCards />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg grid items-center gap-4 md:gap-0 grid-cols-1 md:grid-cols-3">
        <DashBarChart />
        <DashDoughnutChart />
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg grid grid-cols-1">
        <div className="h-fit">
          <DashLineChart />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2">
        <div className=" rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-2 text-gray-600 text-center">
            Sales by Employees
          </h2>
          <DashTable data={data} />
        </div>
        <div className="h-fit">
          <DashColumnChart />
        </div>
      </div>
    </div>
  );
}
