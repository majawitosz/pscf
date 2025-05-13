
import {DataPoint} from "@/types";

const API_URL = "https://pogodynka.jessicapawlowskaonly.fans"; 

interface fetchTempParams {
  sensorType: "temperature" | "humidity" | "pressure" | "co2" | "iaq";
  room: "room1" | "room2" | "room3" | "room4" ;
  scale: "hour" | "day" | "month";
  limit: number;
}

export async function fetchTemp({sensorType, room, scale, limit}: fetchTempParams): Promise<DataPoint[]> {
  const response = await fetch(`${API_URL}/${sensorType}/${room}/${scale}/${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
}