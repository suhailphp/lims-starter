import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { useEffect, useRef, useState } from 'react';
import ChartErrorBoundary from "../../../components/error-boundary/ChartErrorBoundary";

const RequestChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<any>(null);
  const options :  ApexOptions = {
    chart: {
      type: 'bar',
      width: 106,
      height: 30,
      stacked: true,
      stackType: '100%',
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%',
      },
    },
    colors: ['#7A13F0', '#E5E7EB'],
    fill: {
      type: 'pattern',
      opacity: 1,
      pattern: {
        style: 'verticalLines',
        width: 6,
        strokeWidth: 4,
      },
    },
    tooltip: { enabled: true },
    xaxis: {
      categories: ['Last Month'],
    },
  };

  const series = [
    { name: 'Request', data: [50] },
    { name: 'Remaining', data: [50] },
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
        <Chart id="request-chart" options={options} series={series} type="bar" width={106} height={30} />
      </div>
    </ChartErrorBoundary>
  );
};

export default RequestChart;