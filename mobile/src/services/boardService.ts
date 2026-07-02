import { API_URL } from "../config/api";

export async function getBoards() {
  const response = await fetch(`${API_URL}/boards`);

  if (!response.ok) {
    throw new Error("Failed to fetch boards");
  }

  return response.json();
}