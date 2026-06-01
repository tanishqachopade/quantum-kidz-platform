const API_URL = "http://localhost:5000";

export async function getBranches() {
  const response = await fetch(`${API_URL}/branches`);
  return response.json();
}

export async function createBranch(name: string) {
  const response = await fetch(`${API_URL}/branches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}