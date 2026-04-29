import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register core elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin for the pointer
const gaugePointerPlugin = {
  id: 'gaugePointer',
  afterDatasetsDraw(chart: any) {
    const { ctx, chartArea: { width, height },  options: chartOptions } = chart;
    ctx.save();

    const totalSegments = 25;
    const percentage = 50; // Example value
    const filledSegments = Math.round((percentage / 100) * totalSegments);

    const rotation = (chartOptions.rotation || 0) * Math.PI / 180;
    const circumference = (chartOptions.circumference || 360) * Math.PI / 180;

    const centerX = width / 2;
    const centerY = height / 2;

    const meta = chart.getDatasetMeta(0);
    const outerRadius = meta.data[0].outerRadius;
    const pointerRadius = outerRadius + 5;

    const endAngleForPointer = rotation + (circumference / totalSegments) * filledSegments;

    const tipX = centerX + Math.cos(endAngleForPointer) * pointerRadius;
    const tipY = centerY + Math.sin(endAngleForPointer) * pointerRadius;

    ctx.beginPath();
    ctx.translate(tipX, tipY);
    ctx.rotate(endAngleForPointer + Math.PI / 2);

    const pointerSize = 10;
    ctx.moveTo(0, 0);
    ctx.lineTo(-pointerSize / 2, -pointerSize);
    ctx.lineTo(pointerSize / 2, -pointerSize);
    ctx.closePath();
    ctx.fillStyle = '#5711F6';
    ctx.fill();

    ctx.restore();
  },
};

const StorageRequestChart: React.FC = () => {
  const totalSegments = 25;
  const percentage = 50;
  const filledSegments = Math.round((percentage / 100) * totalSegments);

  const data: ChartData<'doughnut', number[], string> = useMemo(() => ({
    datasets: [
      {
        data: Array(totalSegments).fill(1),
        backgroundColor: Array(totalSegments).fill(0).map((_, i) =>
          i < filledSegments ? '#7A13F0' : '#F3F4F6'
        ),
        borderWidth: 0,
        borderRadius: 12,
        spacing: 60,
        cutout: '60%',
      },
    ],
  }), [filledSegments]);

  const options: ChartOptions<'doughnut'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    rotation: -140,
    circumference: 280,
    layout: { padding: { bottom: 0 } },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  }), []);

  return <Doughnut id="storage-request" className="h-48 mx-auto w-full" data={data} options={options} plugins={[gaugePointerPlugin]} />;
};

export default StorageRequestChart;