import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ChartErrorBoundary from "../../../components/error-boundary/ChartErrorBoundary";

const AnalyticsChart: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<any>(null);
  const series = [
    {
      name: "Interaction",
      data: [8000, 28000, 18000, 39000, 32000, 38000, 18000, 27000, 20000, 34000]
    },
    {
      name: "Resolved",
      data: [5000, 22000, 15000, 29000, 22000, 28000, 12000, 17000, 14000, 28000]
    }
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 320,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false }
    },

    responsive: [
      {
        breakpoint: 3000,
        options: { chart: { height: 320 } }
      },
      {
        breakpoint: 1400,
        options: { chart: { height: 320 } }
      }
    ],

    colors: ['#10B981', '#A855F7'],

    dataLabels: { enabled: false },

    stroke: {
      curve: 'smooth',
      width: 2
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },

    grid: {
      show: true,
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 0, right: 0, bottom: -10 }
    },

    xaxis: {
      categories: ['Mon', '', 'Tue', '', 'Wed', '', 'Thu', '', 'Fri', '', 'Sat', '', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#64748b', fontSize: '12px' },
        offsetX: -3
      }
    },

    yaxis: {
      min: 0,
      max: 40000,
      tickAmount: 4,
      labels: {
        style: { colors: '#64748b', fontSize: '12px' },
        formatter: (val: number) => val === 0 ? '0' : `${val / 1000}k`,
        offsetX: -12
      }
    },

    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
      custom: function ({ series, dataPointIndex }) {
        return `
          <div style="padding:10px;">
            <div>Interaction: <strong>${series[0][dataPointIndex]}</strong></div>
            <div>Resolved: <strong>${series[1][dataPointIndex]}</strong></div>
          </div>
        `;
      }
    },

    legend: { show: false }
  };

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
      <div ref={chartRef} id="analytics-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={320}
        />
      </div>
    </ChartErrorBoundary>
  );
};

export default AnalyticsChart;