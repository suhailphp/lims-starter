import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Path } from "../../../routes/path";
import { Link } from "react-router-dom";

const ApexChart = () => {
      useEffect(() => {
              const handleClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
            
                // Toggle Code / Preview
                const btn = target.closest('[data-toggle="code"]');
                if (btn) {
                  const card = btn.closest(".preview-card");
                  const preview = card?.querySelector(".preview-content");
                  const code = card?.querySelector(".code");
                  const text = btn.querySelector(".code-btn");
            
                  if (preview && code && text) {
                    preview.classList.toggle("hidden");
                    code.classList.toggle("hidden");
            
                    text.textContent =
                      text.textContent?.trim() === "Show Code"
                        ? "Show Preview"
                        : "Show Code";
                  }
                }
            
                // Copy Code
                const copyBtn = target.closest("[data-copy]");
                if (copyBtn) {
                  const code = copyBtn.closest("pre")?.querySelector("code");
            
                  if (code) {
                    navigator.clipboard.writeText(code.innerText).then(() => {
                      const span = copyBtn.querySelector("span");
                      if (!span) return;
            
                      const oldText = span.textContent;
                      span.textContent = "Copied!";
                      setTimeout(() => {
                        span.textContent = oldText || "Copy";
                      }, 1500);
                    });
                  }
                }
              };
            
              document.addEventListener("click", handleClick);
            
              return () => {
                document.removeEventListener("click", handleClick);
              };
            }, []);
  const [sline] = useState<any>({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      borderWidth: 1,
      borderColor: "#000",
    },
    colors: ["var(--color-primary)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    title: {
      text: "Product Trends by Month",
      align: "left",
      style: {
        color: "var(--color-default)",
      },
    },
    grid: {
      borderColor: "var(--color-border-color)",
      row: {
        opacity: 0.5,
      },
      padding: {
        left: -5,
        right: 0,
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "var(--color-default)",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "var(--color-default)",
        },
      },
    },
  });
  const [sLineArea] = useState<any>({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary)", "var(--color-warning)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    grid: {
      borderColor: "var(--color-border-color)",
      padding: {
        left: -5,
        right: -15,
      },
    },
    series: [
      {
        name: "Income",
        data: [40, 56, 28, 50, 42, 50, 60],
      },
      {
        name: "Expense",
        data: [20, 36, 20, 40, 25, 40, 30],
      },
    ],

    xaxis: {
      labels: {
        style: {
          colors: "var(--color-default)",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T05:35:00",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        offsetX: -15,
        style: {
          colors: "var(--color-default)",
        },
      },
    },
    legend: {
      labels: {
        colors: "var(--color-default)",
      },
    },
  });
  const [sCol] = useState<any>({
    chart: {
      height: 290,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5,
        endingShape: "rounded", // This rounds the top edges of the bars
      },
    },
    colors: [
      "var(--color-primary-500)",
      "var(--color-success-500)",
      "var(--color-warning-500)",
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    series: [
      {
        name: "Inprogress",
        data: [19, 65, 19, 19, 19, 19, 19],
      },
      {
        name: "Active",
        data: [89, 45, 89, 46, 61, 25, 79],
      },
      {
        name: "Completed",
        data: [39, 39, 39, 80, 48, 48, 48],
      },
    ],
    xaxis: {
      categories: [
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan",
      ],
      labels: {
        style: {
          colors: "var(--color-default)",
          fontSize: "12px",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "var(--color-default)",
          fontSize: "14px",
        },
      },
    },
    grid: {
      borderColor: "var(--color-border-color)",
      strokeDashArray: 5,
      padding: {
        left: -8,
        right: -15,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return "" + val + "%";
        },
      },
    },
    legend: {
      labels: {
        colors: "var(--color-default)",
      },
    },
  });
  const [sColStacked] = useState<any>({
    chart: {
      height: 290,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    grid: {
      borderColor: "var(--color-border-color)",
      padding: {
        left: -5,
        right: -15,
      },
    },
    colors: [
      "var(--color-primary-500)",
      "var(--color-success-500)",
      "var(--color-warning-500)",
      "var(--color-pink-500)",
    ],
    series: [
      {
        name: "Laptops",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Cosmetics",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Medical Devices",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "Software",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "var(--color-default)",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "var(--color-default)",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
    },
    legend: {
      labels: {
        colors: "var(--color-default)",
      },
    },
    fill: {
      opacity: 1,
    },
  });
  const [sBar] = useState<any>({
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary-600)"],
    grid: {
      borderColor: "var(--color-border-color)",
      padding: {
        left: 0,
        right: -15,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    xaxis: {
      labels: {
        style: {
          colors: "var(--color-default)",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: {
          colors: "var(--color-default)",
        },
      },
    },
  });
  const [options] = useState<any>({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    colors: ["var(--color-primary-600)", "var(--color-success-600)"],
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    stroke: {
      width: [0, 4],
    },
    grid: {
      borderColor: "var(--color-border-color)",
      padding: {
        left: -5,
        right: -15,
      },
    },
    title: {
      text: "Traffic Sources",
      style: {
        color: "var(--color-default)",
      },
    },
    legend: {
      labels: {
        colors: "var(--color-default)",
      },
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "var(--color-default)",
        },
      },
      axisBorder: {
        color: ["var(--color-border-color)"],
      },
      axisTicks: {
        color: ["var(--color-border-color)"],
      },
    },
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
        labels: {
          offsetX: -15,
          style: {
            colors: "var(--color-default)",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
        labels: {
          offsetX: -15,
          style: {
            colors: "var(--color-default)",
          },
        },
      },
    ],
  });
  const [donutChart] = useState<any>({
    chart: {
      height: 330,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "var(--color-default)",
      },
    },
    colors: [
      "var(--color-primary-600)",
      "var(--color-success-600)",
      "var(--color-warning-600)",
      "var(--color-pink-600)",
    ],
    labels: ["Laptops", "Cosmetics", "Medical Devices", "Software"],
    series: [44, 55, 41, 17],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [radialChart] = useState<any>({
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "var(--color-primary-600)",
      "var(--color-success-600)",
      "var(--color-warning-600)",
      "var(--color-pink-600)",
    ],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: "var(--color-title)",
          },
          value: {
            fontSize: "16px",
            color: "var(--color-default)",
          },
          total: {
            show: true,
            label: "Total",
            color: "var(--color-default)",
            formatter: function (_w:any) {
              return 249;
            },
          },
        },
      },
    },
    series: [44, 55, 67, 83],
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
  });
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
        <div className="my-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to={Path.dashboard}
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  <i className="icon icon-house" />
                  Home
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Apex Chart
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Apex Simple</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="s-line" className="chart-set preview-content">
            <ReactApexChart
              options={sline}
              series={sline.series}
              type="line"
              height={350}
            />
          </div>
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm dark:bg-white dark:text-gray-500  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{
`<ReactApexChart
  options={sline}
  series={sline.series}
  type="line"
  height={350}
/>`}{"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Area Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="s-line-area" className="chart-set preview-content">
            
            <ReactApexChart
                    options={sLineArea}
                    series={sLineArea.series}
                    type="area"
                    height={350}
                  /></div>
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
{"\n"}{`<ReactApexChart
  options={sLineArea}
  series={sLineArea.series}
  type="area"
  height={350}
/>`}
              {"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Column Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="s-col" className="chart-set preview-content">
             <ReactApexChart
                    options={sCol}
                    series={sCol.series}
                    type="bar"
                    height={290}
                  /></div> 
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{`
<ReactApexChart
  options={sCol}
  series={sCol.series}
  type="bar"
  height={290}
/>`}{"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Column Stacked Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="s-col-stacked" className="chart-set preview-content">
            <ReactApexChart
                    options={sColStacked}
                    series={sColStacked.series}
                    type="bar"
                    height={290}
                  /></div> 
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{`
<ReactApexChart
  options={sColStacked}
  series={sColStacked.series}
  type="bar"
  height={290}
/>`}
              {"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Bar Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="s-bar" className="chart-set preview-content">
             <ReactApexChart
                    options={sBar}
                    series={sBar.series}
                    type="bar"
                    height={350}
                  /></div>
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{`
<ReactApexChart
  options={sBar}
  series={sBar.series}
  type="bar"
  height={350}
/>`}{"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Mixed Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="mixed-chart" className="chart-set preview-content">
            <ReactApexChart
                    options={options}
                    series={options.series}
                    type="line"
                    height={350}
                  /></div> 
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{`
<ReactApexChart
  options={options}
  series={options.series}
  type="line"
  height={350}
/>`}
              {"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Donut Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="donut-chart" className="chart-set preview-content">
             <ReactApexChart
                    options={donutChart}
                    series={donutChart.series}
                    type="donut"
                    height={350}
                  /></div> 
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{`<ReactApexChart
  options={donutChart}
  series={donutChart.series}
  type="donut"
  height={350}
/>`}
              {"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
        <div className="preview-card bg-white rounded-md border border-border-color p-5 pb-0">
          <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
            <h5>Radial Chart</h5>
            <button
              type="button"
              data-toggle="code"
              className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
            >
              <i className="icon icon-eye" />
              <span className="code-btn">Show Code</span>
            </button>
          </div>
          <div id="radial-chart" className="chart-set preview-content">
            <ReactApexChart
                    options={radialChart}
                    series={radialChart.series}
                    type="radialBar"
                    height={350}
                  /></div>
          <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
            <button
              type="button"
              data-copy=""
              className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1 dark:bg-gray-100"
            >
              <i className="icon icon-copy" />
              <span>Copy</span>
            </button>
            {"\n"}
            <code className="language-html block w-full max-h-[250px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
              {"\n"}{
`<ReactApexChart
  options={radialChart}
  series={radialChart.series}
  type="radialBar"
  height={350}
/>`}
              {"\n"}
            </code>
            {"\n"}
          </pre>
        </div>{" "}
        {/* end card */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default ApexChart;
