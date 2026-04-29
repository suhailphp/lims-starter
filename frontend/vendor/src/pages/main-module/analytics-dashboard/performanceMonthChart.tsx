import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ScriptableContext } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PerformanceMonthChartProps {
  height?: number; // adjustable chart height in px
}

const PerformanceMonthChart: React.FC<PerformanceMonthChartProps> = () => {
  const labels = useMemo(() => ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'], []);

  const data: ChartData<'line'> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Inference',
          data: [28, 25, 28, 25, 28],
          fill: true,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return undefined; // Type-safe
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
          data: [38, 35, 38, 35, 38],
          fill: true,
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return undefined; // Type-safe
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
    }),
    [labels]
  );

  const options: ChartOptions<'line'> = useMemo(
    () => ({
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
        x: { grid: { display: true }, offset: false },
      },
    }),
    []
  );

  return (
    <div id="performance-month-chart"
                className="h-70! min-h-77!">
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceMonthChart;