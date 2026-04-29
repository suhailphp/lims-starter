
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ResourceChart = () => {
  const data = {
    labels: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'GPU',
        data: [10, 15, 10, 13, 18, 8, 10, 20, 15, 28, 25, 18],
        fill: true,
        backgroundColor: '#FFEDD4',
        borderColor: '#F54900',
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: 'Memory',
        data: [15, 20, 22, 30, 28, 40, 50, 45, 60, 32, 50, 40],
        fill: true,
        backgroundColor: '#D0FBE4',
        borderColor: '#009966',
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: 'CPU',
        data: [23, 30, 26, 35, 38, 50, 65, 75, 70, 60, 75, 80],
        fill: true,
        backgroundColor: '#EDE6FF',
        borderColor: '#7A13F0',
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
        border: { display: false },
        grid: { display: false },
        ticks: {
          stepSize: 20,
          font: { size: 11 },
        },
        offset: false,
      },
      x: {
        grid: { display: true },
        offset: false,
      },
    },
  };

  return <Line id="resource-chart" className="h-60!" data={data} options={options} />;
};

export default ResourceChart;