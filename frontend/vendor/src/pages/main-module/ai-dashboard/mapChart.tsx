import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import worldJson from "../../../utils/json/world.json";

// register map
echarts.registerMap("world", worldJson as any);

const MapChart = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "World Data",
        type: "map",
        map: "world",
        roam: false,
        emphasis: {
          label: {
            show: false,
          },
        },
        data: [
          { name: "Canada", value: 4569 },
          { name: "Malaysia", value: 2459 },
          { name: "Portugal", value: 1452 },
        ],
      },
    ],
  };

  return <ReactECharts key="map" option={option} id="chart-container"/>;
};

export default MapChart;