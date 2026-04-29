// ContentChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ContentChart: React.FC = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 5, 6, 8, 5, 10, 8],
        backgroundColor: '#8723FF',
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
         borderSkipped: false,
      },
      {
        label: 'Dataset 2',
        data: [8, 6, 10, 5, 5, 5, 5],
        backgroundColor: '#AA7DFF',
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
         borderSkipped: false,
      },
      {
        label: 'Dataset 3',
        data: [10, 10, 5, 5, 5, 5, 5],
        backgroundColor: '#C5ACFF',
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
         borderSkipped: false,
      },
      {
        label: 'Dataset 4',
        data: [10, 8, 10, 5, 5, 5, 5],
        backgroundColor: '#DED1FF',
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
         borderSkipped: false,
      },
      {
        label: 'Dataset 5',
        data: [5, 6, 10, 5, 5, 5, 5],
        backgroundColor: '#EDE6FF',
        borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
         borderSkipped: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            label += (context.parsed.y * 1000).toLocaleString();
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        min: 0,
        max: 50,
        ticks: {
          stepSize: 10,
          font: { size: 11 },
          callback: function (value: any) {
            return value === 0 ? 0 : value + 'k';
          },
        },
        grid: { display: true },
      },
      x: {
        stacked: true,
        barPercentage: 0.5,
        ticks: { font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div id="content-chart" className="h-80" >
      <Bar data={data} options={options} />
    </div>
  );
};

export default ContentChart;