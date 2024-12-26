import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export function DashBarChart() {
  const barChartData = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1} Jul`),
    datasets: [
      {
        label: "Revenue",
        data: [40, 60, 45, 80, 50, 90, 70, 100, 85, 120, 95, 110],
        backgroundColor: "#4ADE80",
      },
      {
        label: "Gross Margin",
        data: [30, 50, 40, 70, 45, 80, 65, 95, 75, 110, 85, 100],
        backgroundColor: "#60A5FA",
      },
    ],
  };
  return (
    <>
      <div className="max-w-full md:col-span-2">
        <h2 className="text-lg font-semibold mb-2 text-gray-600">
          Product Sales
        </h2>
        <Bar data={barChartData} />
      </div>
    </>
  );
}

export function DashDoughnutChart() {
  const doughnutChartData = {
    labels: ["Living Room", "Bedroom", "Kitchen", "Office", "Kids"],
    datasets: [
      {
        data: [25, 20, 15, 25, 15],
        backgroundColor: [
          "#4ADE80",
          "#60A5FA",
          "#FBBF24",
          "#F87171",
          "#A78BFA",
        ],
      },
    ],
  };

  return (
    <>
      <div
        className="bg-white rounded-lg max-w-full text-center"
        style={{ alignContent: "center" }}
      >
        <h2 className="text-lg font-semibold text-gray-600 text-center">
          Sales by Product Category
        </h2>
        <Doughnut data={doughnutChartData} style={{ padding: "2rem" }} />
      </div>
    </>
  );
}

export function DashLineChart() {
  const lineChartData = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1} Jul`),
    datasets: [
      {
        label: "Net Profit",
        data: [20, 40, 30, 60, 50, 70, 55, 90, 65, 98, 75, 95],
        borderColor: "#F87171",
        backgroundColor: "rgba(248, 113, 113, 0.3)",
        fill: true,
      },
    ],
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-2 text-gray-600 text-center">
        Net Profit
      </h2>
      <Line data={lineChartData} style={{ height: "90%" }} />
    </>
  );
}
