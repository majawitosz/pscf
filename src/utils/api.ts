
import {DataPoint, AirQResponse, fetchTempParams} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchTemp({sensorType, room, scale, limit}: fetchTempParams): Promise<DataPoint[] > {
  const response = await fetch(`${API_URL}/${sensorType}/${room}/${scale}/${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
}

export async function fetchAirQ(): Promise<AirQResponse> {
  const response = await fetch(`${API_URL}/air_q_recom`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
}