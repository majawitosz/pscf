import React, { useState } from "react";

const ChartTab: React.FC<{ onScaleChange: (scale: "hour" | "day" | "month") => void }> = ({ onScaleChange }) => {
  const [selected, setSelected] = useState<"hour" | "day" | "month">("hour");

  const getButtonClass = (option: "hour" | "day" | "month") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const handleSelection = (option: "hour" | "day" | "month") => {
    setSelected(option);
    onScaleChange(option); // Wywołanie callbacku przy zmianie skali
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => handleSelection("hour")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "hour"
        )}`}
      >
        Hours
      </button>
      <button
        onClick={() => handleSelection("day")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "day"
        )}`}
      >
        Days
      </button>
      <button
        onClick={() => handleSelection("month")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "month"
        )}`}
      >
        Months
      </button>
    </div>
  );
};

export default ChartTab;