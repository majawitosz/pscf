export type ValueTypeHeader = "Temperature (°C)" | "Humidity (%)" | "Pressure (hPa)" | "CO2 (ppm)" | "IAQ (IAQ)" | ""
export type RoomType = "room1" | "room2" | "room3" | "room4" ;
export type SensorType = "temperature" | "humidity" | "pressure" | "co2" | "iaq";


//api
export type fetchTempParams = {
  sensorType: SensorType;
  room: RoomType;
  scale: "hour" | "day" | "month";
  limit: number;
}

export interface DataPoint {
  timestamp: number;
  average: number;
}

export interface AirQResponse {
  recommendations: string[];
}


// Props
export interface LineChartProps {
  sensorType: SensorType;
  room: RoomType ;
  limit: number;
}



//room 1 - LivingRoom
//room 2 - Bedrrom
//room 3 - Kitchen
//room 4 - Bathroom

