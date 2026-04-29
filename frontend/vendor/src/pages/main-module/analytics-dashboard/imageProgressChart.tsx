import React, { useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

interface ImageProgressProps {
  totalDots?: number;
  percentageCompleted?: number;
  height?: number; // adjustable height in px
}

const ImageProgress: React.FC<ImageProgressProps> = ({
  totalDots = 15,
  percentageCompleted = 95,
}) => {
  const chartRef = useRef<ChartJS<'scatter', { x: number; y: number }[], unknown>>(null);

  // Generate data points and colors
  const generateChartData = (dots: number, percent: number) => {
    const points = [];
    const colors = [];
    const completedDots = Math.round((percent / 100) * dots);
    for (let i = 0; i < dots; i++) {
      points.push({ x: i + 1, y: 1 });
      colors.push(i < completedDots ? '#7A13F0' : '#E5E7EB');
    }
    return { points, colors };
  };

  const data: ChartData<'scatter'> = useMemo(() => {
    const progress = generateChartData(totalDots, percentageCompleted);
    return {
      datasets: [
        {
          data: progress.points,
          backgroundColor: progress.colors,
          pointRadius: 6,
          pointHoverRadius: 6,
          showLine: false,
        },
      ],
    };
  }, [totalDots, percentageCompleted]);

  const options: ChartOptions<'scatter'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        display: false,
        min: 0.7,
        max: totalDots + 0.3,
      },
      y: {
        display: false,
        min: 0.95,
        max: 1.05,
      },
    },
    layout: {
      padding: 0,
    },
  }), [totalDots]);



  return (
    <div id="image-progress" className="h-7">
      <Scatter ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ImageProgress;