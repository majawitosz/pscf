import React, { useState } from "react";

const ChartTab: React.FC<{ onScaleChange: (scale: "hours" | "days" | "months") => void }> = ({ onScaleChange }) => {
  const [selected, setSelected] = useState<"hours" | "days" | "months">("hours");

  const getButtonClass = (option: "hours" | "days" | "months") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const handleSelection = (option: "hours" | "days" | "months") => {
    setSelected(option);
    onScaleChange(option); // Wywołanie callbacku przy zmianie skali
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => handleSelection("hours")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "hours"
        )}`}
      >
        Hours
      </button>
      <button
        onClick={() => handleSelection("days")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "days"
        )}`}
      >
        Days
      </button>
      <button
        onClick={() => handleSelection("months")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "months"
        )}`}
      >
        Months
      </button>
    </div>
  );
};

export default ChartTab;