import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EarningsChart = ({ projects }) => {
  const [chartData, setChartData] = useState(null);

  const processPaymentData = (projects) => {
    const monthlyEarnings = {};
    projects.forEach((project) => {
      const month = new Date(project.dueDate).toLocaleString("default", { month: "long" });
      const amount = project.payment.amount;
      if (monthlyEarnings[month]) {
        monthlyEarnings[month] += amount;
      } else {
        monthlyEarnings[month] = amount;
      }
    });
    return monthlyEarnings;
  };

  const generateChartData = () => {

    const earnings = processPaymentData(projects);

    const labels = Object.keys(earnings);
    const dataValues = Object.values(earnings);

    return {
      labels: labels,
      datasets: [
        {
          label: "Earnings ($)",
          data: dataValues,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          barThickness: 30,
          hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        },
      ],
    };
  };

  useEffect(() => {
    const data = generateChartData();
    setChartData(data);
  }, [projects]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  return <div>{chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}</div>;
};

export default EarningsChart;
