
import {TempData} from "@/types";

const API_URL = "https://pogodynka.jessicapawlowskaonly.fans"; 



export async function fetchTemp(scale: "hours" | "days" | "months"): Promise<TempData> {
  const response = await fetch(`${API_URL}/temperature/${scale}`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
}