import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PostChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Article/Recruitment Post Bar Chart",
      },
    },
  };
  const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        'December'
      ];
      const data = {
        labels,
        datasets: [
          {
            label: "Article",
            data: [5,10,6,8,9,12,13,7,4,12,6,11],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Recruitment Post",
            data: [9,12,7,5,9,15,20,14,13,19,8,12],
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
  return (
    <div style={{ width: "800px",margin:"auto auto", display:"block", flexDirection:"column",
    marginTop:"50px" }}>
        <Bar options={options} data={data} />
      </div>
  )
}
