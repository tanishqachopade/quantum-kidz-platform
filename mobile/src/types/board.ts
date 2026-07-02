export interface Board {
  id: string;
  title: string;
  type: "QUANTUM" | "BRANCH" | "CLASS";
}

export interface BoardPost {
  id: string;
  boardId: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
}