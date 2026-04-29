import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useEffect, useRef, useState } from 'react';
import ChartErrorBoundary from "../../../components/error-boundary/ChartErrorBoundary";

const AccuracyChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<any>(null);
  const options : ApexOptions= {
    chart: {
      width: 110,
      height: 54,
      type: 'bar',
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    dataLabels: { enabled: false },
    colors: ['#155DFC'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusWhenStacked: 'all',
        borderRadiusApplication: 'around',
        colors: {
          backgroundBarOpacity: 0.5,
          backgroundBarRadius: 4,
        },
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: true },
  };

  const series = [
    {
      name: 'Accuracy',
      data: [20, 40, 30, 70, 60, 60, 60],
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  if (!isMounted) return null;

  return (
    <ChartErrorBoundary>
      <div ref={chartRef}>
        <Chart id="accuracy-chart"  options={options} series={series} type="bar" width={110} height={54} />
      </div>
    </ChartErrorBoundary>
  );
};

export default AccuracyChart;