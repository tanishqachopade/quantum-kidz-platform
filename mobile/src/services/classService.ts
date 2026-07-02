import { API_URL } from "../config/api";

export async function createClass(
  branchId: string,
  type: string
) {
  const response = await fetch(`${API_URL}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      branchId,
      type,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function deleteClass(id: string) {
  const response = await fetch(
    `${API_URL}/classes/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}