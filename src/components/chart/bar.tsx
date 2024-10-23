import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { useDetectDarkMode } from "../../lib/hooks/use-darkmode";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  chartData: ChartData<"bar", (number | [number, number] | null)[], unknown>,
  title?: string,
}
const BarChart: React.FC<BarChartProps> = ({ chartData, title }) => {
  const isDarkMode = useDetectDarkMode();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          tickBorderDash: [5, 5],
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
        zeroLineColor: "transparent",
      },
      x: {
        zeroLineColor: "transparent",
        grid: {
          tickBorderDash: [5, 5],
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
      }
    },
    plugins: {
      legend: {
        disable: true,
        display: false
      },
      title: {
        display: false,
        text: title,
      },
    },
  };

  return <Bar className="max-w-full dark:!text-white" data={chartData} options={options} />;
};

export default BarChart;
