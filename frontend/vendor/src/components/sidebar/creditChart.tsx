import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ChartErrorBoundary from "../error-boundary/ChartErrorBoundary";

const CreditChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const chartRef = useRef<any>(null);
  const series = [
    { name: "Credit", data: [90] },
    { name: "Remaining", data: [10] },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 20,
      stacked: true,
      stackType: "100%",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100%",
      },
    },
    colors: ["#9614EB", "#E5E7EB"],
    fill: {
      type: "pattern",
      opacity: 1,
      pattern: {
        style: "verticalLines",
        width: 6,
        strokeWidth: 4,
      },
    },
    tooltip: { enabled: true },
    xaxis: {
      categories: ["Usage"],
    },
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      // Cleanup chart on unmount
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
        <Chart options={options} series={series} type="bar" height={20} />
      </div>
    </ChartErrorBoundary>
  );
};

export default CreditChart;