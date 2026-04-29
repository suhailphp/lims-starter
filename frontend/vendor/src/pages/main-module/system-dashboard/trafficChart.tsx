import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TrafficChart: React.FC = () => {
  const data: ChartData<'bar', number[], string> = useMemo(() => ({
    labels: ['Progress Overview'],
    datasets: [
      {
        label: 'Upload Percentage',
        data: [50],
        backgroundColor: '#7A13F0',
        stack: 'Stack 0',
        borderRadius: {
          topLeft: 8,
          bottomLeft: 8,
          topRight: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: 'Download Percentage',
        data: [35],
        backgroundColor: '#C5ACFF',
        stack: 'Stack 0',
      },
      {
        label: 'Ideal Time',
        data: [15],
        backgroundColor: '#DED1FF',
        stack: 'Stack 0',
      },
    ],
  }), []);

  const options: ChartOptions<'bar'> = useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        max: 100,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.x !== null) label += context.parsed.x + '%';
            return label;
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
        borderWidth: 0,
      },
    },
  }), []);

  return <Bar id="traffic-chart" data={data} options={options} height={90}/>;
};

export default TrafficChart;