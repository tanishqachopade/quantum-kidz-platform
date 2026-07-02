import { API_URL } from "../config/api";

export async function getPendingUsers() {
  const response = await fetch(
    `${API_URL}/pending-users`
  );

  return response.json();
}

export async function approveUser(
  userId: string
) {
  const response = await fetch(
    `${API_URL}/approve-user/${userId}`,
    {
      method: "PUT",
    }
  );

  return response.json();
}

export async function getPendingBranchHeads() {
  const response = await fetch(
    `${API_URL}/pending-branch-heads`
  );

  return response.json();
}