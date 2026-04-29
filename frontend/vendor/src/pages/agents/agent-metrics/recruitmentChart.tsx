import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const RecruitmentChart: React.FC = () => {
  const totalSegments = 25;
  const filledSegments = 10;

  const dataArray = Array(totalSegments).fill(1);

  const colors = dataArray.map((_, i) =>
    i < filledSegments ? '#5711F6' : '#F3F4F6'
  );

  const data = {
    datasets: [
      {
        data: dataArray,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 12,
        spacing: 60,          // ✅ fixed
        cutout: '60%',
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,   // ✅ important
    rotation: -110,                // ✅ half circle
    circumference: 220,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div >
      <Doughnut id="recruitment" className="w-full h-50! m-auto!" data={data} options={options} />
    </div>
  );
};

export default RecruitmentChart;