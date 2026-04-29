import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const CostChart: React.FC = () => {
  // Ref to the Chart instance (not canvas)
  const chartRef = useRef<ChartJS<'bar' | 'line', number[], string> | null>(null);

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'API Usage',
        data: [300, 200, 210, 100, 200, 180, 250, 310, 150, 100, 200, 210],
        borderColor: '#D97F06',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        pointRadius: 6,
      },
      {
        type: 'bar' as const,
        label: 'Cost',
        data: [490, 290, 300, 200, 300, 270, 300, 500, 400, 200, 300, 260],
        borderRadius: 6,
        borderSkipped: false,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return '#7A13F0';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#7A13F0');
          gradient.addColorStop(1, 'rgba(255,255,255,0)');
          return gradient;
        },
      },
    ],
  };

const options: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutQuart', // ✅ Use exact string from Chart.js type
    delay: (context) => {
      // context is of type ChartAnimationContext<'bar' | 'line'>
      if (context.type === 'data') {
        return context.dataIndex * 60;
      }
      return 0;
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 500,
      beginAtZero: true,
      ticks: { stepSize: 100, font: { size: 11 } },
      border: { display: false },
      grid: { color: '#f0f0f0' },
    },
    x: { grid: { display: false } },
  },
};

  return <Chart id="cost-chart" className="h-58!" ref={chartRef} data={data} options={options} type="bar" />;
};

export default CostChart;