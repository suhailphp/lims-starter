import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AgentChartProps {
  height?: number; // optional adjustable height
}

const AgentChart: React.FC<AgentChartProps> = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Active', 'Idle', 'Training', 'Failed'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#7A13F0', '#C5ACFF', '#DED1FF', '#EDE6FF'],
        borderWidth: 4,
        borderColor: '#fff',
        borderRadius: 15,
        // cutout: '70%',
        hoverBorderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    rotation: -90,
    circumference: 360,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div id="agent-chart" className="h-68">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AgentChart;