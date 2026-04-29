import React, { useRef, useMemo } from 'react';
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
import type { ChartOptions } from 'chart.js';
import type { ScriptableContext } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PerformanceDayChartProps {
  height?: number; // adjustable height in px
}

const PerformanceDayChart: React.FC<PerformanceDayChartProps> = () => {
  const chartRef = useRef<ChartJS<'line', number[], string>>(null);

  const labels = useMemo(() => ['2:00', '6:00', '10:00', '14:00', '18:00', '20:00', '24:00'], []);

  const data: ChartData<'line'> = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Inference',
        data: [20, 20, 22, 25, 28, 25, 28],
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return undefined; // <-- return undefined instead of null
          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, '#AB62FF');
          gradient.addColorStop(1, '#FFFFFF');
          return gradient;
        },
        tension: 0,
        borderWidth: 0,
        pointRadius: 0,
      },
      {
        label: 'Accuracy',
        data: [30, 30, 32, 35, 38, 35, 38],
        fill: true,
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return undefined; // <-- return undefined instead of null
          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, '#009966');
          gradient.addColorStop(1, '#FFFFFF');
          return gradient;
        },
        tension: 0,
        borderWidth: 0,
        pointRadius: 0,
      },
    ],
  }), [labels]);

  const options: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
        beginAtZero: true,
        border: { display: false },
        grid: { display: false },
        ticks: {
          stepSize: 20,
          font: { size: 11 },
          callback: (value) => (value === 0 ? 0 : `${Number(value) / 10}k`),
        },
        offset: false,
      },
      x: {
        grid: { display: true },
        offset: false,
      },
    },
  }), []);

  return (
    <div id="performance-day-chart" className="h-70! min-h-77!">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default PerformanceDayChart;