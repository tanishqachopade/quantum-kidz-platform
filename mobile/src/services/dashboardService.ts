import { API_URL } from "../config/api";

export async function getDashboardStats() {
  const response = await fetch(
    `${API_URL}/dashboard/stats`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch dashboard stats"
    );
  }

  return response.json();
}