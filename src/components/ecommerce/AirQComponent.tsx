
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon,  Fan, Temperature } from "@/icons";
import { DataPoint, RoomType} from "@/types";
import {fetchAirQ} from "@/utils/api";
import { AirQResponse } from "@/types";

export const AirQComponent = async () => {
   let airQData: AirQResponse | null = null;
    try {
      airQData = await fetchAirQ();
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
    let airOk: boolean = airQData?.recommendations[0].includes(" good") ? true : false;
 
  return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex flex-row items-center justify-between ">
           <h3 className="text-title-sm font-bold text-gray-800 dark:text-white/90">
                  Air Quality & CO₂
            </h3>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <Fan className={`icon-fill text-gray-800 size-6 dark:text-white/90 ${airOk ? "" : "animate-spin"}`}/>
            </div>
           
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
          
            <h4 className="mt-2 font-medium text-gray-800 text-base  dark:text-white/90">
              {airQData?.recommendations[0]} <br />{airQData?.recommendations[1]}
            </h4>
          </div>
          {airOk ? (<Badge color="success">
             OK
          </Badge>
           ) : (<Badge color="error">
             BAD
          </Badge>)}
          
        </div>
      </div>
 

     
   
  );
};
