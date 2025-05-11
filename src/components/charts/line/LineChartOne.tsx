"use client";
import React, { useEffect, useState } from "react";

import { ApexOptions } from "apexcharts";
import { fetchTemp } from "@/utils/api";
import {TempData} from "@/types";
//import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


export default function LineChartOne() {

  const [series, setSeries] = useState([
    {
      name: "Temperature (°C)",
      data: [] as number[],
    },
  ]);

  // Stan do przechowywania kategorii osi X (daty/czas)
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: TempData = await fetchTemp();
        // Aktualizacja serii danych
        setSeries((prevSeries) => [
          {
            name: "Temperature (°C)",
            data: [...prevSeries[0].data, data.temperature],
          },
        ]);
        // Aktualizacja kategorii osi X (formatowanie timestamp)
        setCategories((prevCategories) => [
          ...prevCategories,
          new Date(data.timestamp).toLocaleTimeString(), // Format: HH:MM:SS
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Pobierz dane przy pierwszym renderowaniu
    loadData();

    // Opcjonalnie: cykliczne pobieranie danych co np. 10 sekund
    const interval = setInterval(loadData, 10000); // 10 sekund
    return () => clearInterval(interval); // Czyszczenie interwału przy odmontowaniu
  }, []);
  
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
      enabled: true, // Enable tooltip
      x: {
        format: "dd MMM yyyy", // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
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
        "Oct",
        "Nov",
        "Dec",
      ],
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
      },
      title: {
        text: "", // Remove y-axis title
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px]">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
}
