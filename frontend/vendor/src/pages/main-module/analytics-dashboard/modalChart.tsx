import  { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const ModalChart = () => {

  // 🔥 Pattern creator (same as your original)
  const createPattern = (bgColor: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 10;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 10, 10);

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(10, 0);
    ctx.stroke();

    return {
      type: "pattern",
      image: canvas,
      repeat: "repeat",
    };
  };

  const option = useMemo(() => ({
    grid: {
      left: "-2%",
      right: "-2%",
      top: 10,
      bottom: 30,
      containLabel: false,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "#fff",
      borderColor: "#E5E7EB",
      borderWidth: 1,
      textStyle: { color: "#111" },
    },

    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
      boundaryGap: true,
    },

    yAxis: {
      show: false,
    },

    series: [
      {
        name: "GPT",
        type: "bar",
        barCategoryGap: "10%",
        itemStyle: {
          borderRadius: 8,
          color: createPattern("#8B5CF6"),
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 8,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(122,19,240,0.1)" },
              { offset: 0.6, color: "rgba(217,127,6,0)" },
              { offset: 1, color: "rgba(217,127,6,0)" },
            ],
          },
        },
        data: [5000, 4000, 8000, 7000, 4000, 3000, 5000],
        label: {
          show: true,
          position: "top",
          distance: -30,
          color: "#fff",
          fontWeight: "bold",
          formatter: (params: any) => `${params.value / 1000}k`,
        },
      },

      {
        name: "Llama 3",
        type: "bar",
        barGap: "10%",
        itemStyle: {
          borderRadius: 8,
          color: createPattern("#10B981"),
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 8,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0,13,102,0.1)" },
              { offset: 0.6, color: "rgba(217,127,6,0)" },
              { offset: 1, color: "rgba(217,127,6,0)" },
            ],
          },
        },
        data: [3100, 2500, 3100, 3100, 3100, 3100, 3100],
        label: {
          show: true,
          position: "top",
          distance: -30,
          color: "#fff",
          fontWeight: "bold",
          formatter: (params: any) => `${params.value / 1000}k`,
        },
      },

      {
        name: "Mistral Large",
        type: "bar",
        barGap: "10%",
        itemStyle: {
          borderRadius: 8,
          color: createPattern("#F59E0B"),
        },
        showBackground: true,
        backgroundStyle: {
          borderRadius: 8,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(217,127,6,0.1)" },
              { offset: 0.6, color: "rgba(217,127,6,0)" },
              { offset: 1, color: "rgba(217,127,6,0)" },
            ],
          },
        },
        data: [3000, 3000, 3000, 4000, 3000, 7000, 8000],
        label: {
          show: true,
          position: "top",
          distance: -30,
          color: "#fff",
          fontWeight: "bold",
          formatter: (params: any) => `${params.value / 1000}k`,
        },
      },
    ],

    media: [
      {
        query: { maxWidth: 600 },
        option: {
          series: [
            { label: { show: false } },
            { label: { show: false } },
            { label: { show: false } },
          ],
        },
      },
    ],
  }), []);

  return (
    <div id="model-chart" style={{ height: 280 }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default ModalChart;