"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
  DashDoughnutChart,
  DashLineChart,
} from "./components/Dash-Charts";
import DashTable from "./components/Dash-Table";
import VerticalNavbar from "@/components/VerticalNavbar";

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
    <div className="min-h-screen bg-gray-100">
      <SidebarProvider>
        <div className="flex flex-col md:flex-row w-full">
          <AppSidebar />
          <div className="flex-1 w-full p-4">
            <VerticalNavbar />

            <header className="flex h-16 items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <DashCards />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg grid items-center grid-cols-1 md:grid-cols-3">
              <DashBarChart />
              <DashDoughnutChart />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg h-fit">
                <h2 className="text-lg font-semibold mb-2 text-gray-600 text-center">
                  Sales by Countries
                </h2>
                <DashTable data={data} />
              </div>
              <div className="md:col-span-2">
                <DashLineChart />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8"></div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
