import React from "react";
import { Bar, Doughnut, Line, Col } from "react-chartjs-2";

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
        borderColor: "#10b981",
        backgroundColor: "rgba(4, 120, 87, 0.3)",
        fill: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    drawActiveElementsOnTop: false
  };

  return (
    <div style={{height:"50%"}}>
      <h2 className="text-lg font-semibold mb-2 text-gray-600 text-center">
        Net Profit
      </h2>
      <Line data={lineChartData} options={options} />
    </div>
  );
}

export function DashColumnChart() {
  const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      name:"Ken",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      name:"Abdul Halim",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      name:"Monserrat",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      name:"Silas",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      name:"Carmella",
      email: "carmella@hotmail.com",
    },
  ];

  const columnChartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Transaction Amount ($)",
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => {
          switch (item.status) {
            case "success":
              return "#4ADE80";
            case "processing":
              return "#FBBF24";
            case "failed":
              return "#F87171";
            default:
              return "#60A5FA";
          }
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1.25,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Amount: $${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: "Users",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg max-w-full px-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-600 text-center">
        Transaction Amount by User
      </h2>
      <Bar data={columnChartData} options={options} />
    </div>
  );
}