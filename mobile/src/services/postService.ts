import { API_URL } from "../config/api";

export async function getBoardPosts(
  boardId: string
) {
  const response = await fetch(
    `${API_URL}/boards/${boardId}/posts`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch posts"
    );
  }

  return response.json();
}

export async function createPost(
  title: string,
  content: string,
  boardId: string
) {
  const response = await fetch(
    `${API_URL}/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        boardId,
      }),
    }
  );

  return response.json();
}


export async function updatePost(
  id: string,
  title: string,
  content: string
) {
  const response = await fetch(
    `${API_URL}/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update post"
    );
  }

  return response.json();
}

export async function deletePost(
  id: string
) {
  const response = await fetch(
    `${API_URL}/posts/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete post"
    );
  }

  return response.json();
}