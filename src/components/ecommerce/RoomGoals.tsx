
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon,  GroupIcon, Temperature } from "@/icons";
import { fetchTemp } from "@/utils/api";
import { DataPoint, RoomType} from "@/types";



export const RoomGoals = async ({ room }: { room: RoomType }) => {
  let tempDataArray: DataPoint[] | null = null;
  let tempData: DataPoint | null = null;
  const goalTemperature = 20; 
  const roomKind = room === "room1" ? "Living Room" : room === "room2" ? "Bedroom" : room === "room3" ? "Kitchen" : room === "room4" ? "Bathroom" : "";
  
  try{
    tempDataArray = await fetchTemp({
      sensorType: "temperature",
      room: room,
      scale: "hour",
      limit: 1,
    });
    tempData = tempDataArray[0];
    console.log("Temperature Data:", tempData);
  } catch (error) {
    console.error("Error fetching temperature data:", error);
  }
  const tempDifference = tempData?.average != null 
    ?  (tempData.average - goalTemperature).toFixed(1)
    : null;
  const isTempHigh = tempDifference != null && parseFloat(tempDifference) >= 0;
  return (
    

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Temperature className="icon-fill text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {roomKind}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {tempData?.average?.toFixed(1) ?? "N/A"} °C
            </h4>
          </div>
          {isTempHigh ? (<Badge color="success">
            <ArrowUpIcon />
            {tempDifference} °C
          </Badge>
           ) : (<Badge color="error">
            <ArrowDownIcon className="text-error-500" />
             {tempDifference} °C
          </Badge>)}
          
        </div>
      </div>
 

     
   
  );
};
