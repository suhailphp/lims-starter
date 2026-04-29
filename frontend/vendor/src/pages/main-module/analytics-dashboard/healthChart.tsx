
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const HealthChart = () => {
  const data = {
    labels: ['01', '05', '08', '10', '12', '15', '18', '20', '22', '25', '28', '30'],
    datasets: [
      {
        label: 'Storage',
        data: [28, 32, 30, 35, 34, 40, 50, 50, 40, 30, 40, 55],
        fill: true,
        backgroundColor: '#A4F6CE',
        borderColor: '#009966',
        tension: 0,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    plugins: { legend: { display: false } },
    scales: {
      y: {
        min: 0,
        max: 60,
        beginAtZero: true,
        display: false,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        display: false,
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return <Line id="health-chart" className="h-14 w-30" data={data} options={options} />;
};

export default HealthChart;