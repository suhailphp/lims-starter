import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useEffect, useRef, useState } from "react";
import ChartErrorBoundary from "../../../components/error-boundary/ChartErrorBoundary";

const StorageChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<any>(null);
  const series = [
    {
      name: "Storage",
      data: [30, 34, 50, 60, 56, 49, 60, 50, 40, 50, 40, 60],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 120, // 🔥 small widget style
      sparkline: {
        enabled: true, // 🔥 removes all axes/labels (like your config)
      },
      toolbar: { show: false },
    },

    stroke: {
      curve: "straight", // tension: 0
      width: 2,
      colors: ["#7A13F0"],
    },

    fill: {
      type: "solid",
      opacity: 1,
      colors: ["#DED1FF"], // 🔥 area color
    },

    markers: {
      size: 0, // no points
    },

    grid: {
      show: false, // no grid lines
    },

    xaxis: {
      categories: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      min: 0,
      max: 80,
      show: false,
    },

    tooltip: {
      enabled: false,
      x: { show: false },
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
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
      <div ref={chartRef} className="h-16!">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </ChartErrorBoundary>
  );
};

export default StorageChart;