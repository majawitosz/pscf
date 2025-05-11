"use client";
import React, { useEffect, useState } from "react";

import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import dynamic from "next/dynamic";
import { fetchTemp } from "@/utils/api";
import {TempData} from "@/types";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const [series, setSeries] = useState([
      {
        name: "Temperature (°C)",
        data: [] as number[],
      },
    ]);
  

    const [categories, setCategories] = useState<string[]>([]);
    const [scale, setScale] = useState<"hours" | "days" | "months">("hours");

const formatTimestamp = (timestamp: number, scale: "hours" | "days" | "months") => {
  const date = new Date(timestamp); 
  switch (scale) {
    case "hours":
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, 
      }); 
    case "days":
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
      });
    case "months":
      return date.toLocaleDateString([], {
        month: "short",
        year: "numeric",
      }); 
    default:
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); 
  }
};
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const data: TempData = await fetchTemp(scale);
          setSeries((prevSeries) => [
            {
              name: "Temperature (°C)",
              data: [...prevSeries[0].data, data.temperature],
            },
          ]);
          const timestamp = data.timestamp * 1000; 
          setCategories((prevCategories) => [
            ...prevCategories,
            formatTimestamp(timestamp, scale),
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      loadData();
      
    }, [scale]);

    const handleScaleChange = (newScale: "hours" | "days" | "months") => {
    setScale(newScale);
    setCategories([]);
    setSeries([{ name: "Temperature (°C)", data: [] }]);
  };

  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"], // Define line colors
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
tooltip: {
      enabled: true,
      x: {
        format: scale === "hours" ? "HH:mm" : scale === "days" ? "dd MMM" : "MMM yyyy",
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: categories,
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
        formatter: (value: number) => `${value}°C`,
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "",
        },
      },
    },
  };

 
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Temperature
          </h3>
          {/* <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p> */}
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab onScaleChange={handleScaleChange} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
