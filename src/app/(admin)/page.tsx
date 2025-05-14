import type { Metadata } from "next";
import { RoomGoals } from "@/components/ecommerce/RoomGoals";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import {fetchAirQ} from "@/utils/api";
import { AirQResponse } from "@/types";
import { AirQComponent } from "@/components/ecommerce/AirQComponent";

export const metadata: Metadata = {
  title:
    "HomePage | Dashboard "
};

export default async function Page() {
  // let airQData: AirQResponse | null = null;

  // try {
  //   airQData = await fetchAirQ();

  // } catch (error) {
  //   console.error("Error fetching air quality data:", error);
  // }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      
        <RoomGoals room ="room1"/>
        <RoomGoals  room ="room2"/>
        <RoomGoals  room ="room3"/>
        <RoomGoals  room ="room4"/>
        <AirQComponent />
          
         {/* <ComponentCard title= "Air Quality & CO₂" className=" ">
        {airQData?.recommendations[0]} <br />{airQData?.recommendations[1]}
        </ComponentCard> */}
 
     
    </div>
  );
}
