import { Board, BoardPost } from "../types/board";

export const BOARDS: Board[] = [
  {
    id: "quantum",
    title: "Quantum Kidz Board",
    type: "QUANTUM",
  },
  {
    id: "baner",
    title: "Baner Branch Board",
    type: "BRANCH",
  },
  {
    id: "bhukum",
    title: "Bhukum Branch Board",
    type: "BRANCH",
  },
  {
    id: "punawale1",
    title: "Punawale 1 Board",
    type: "BRANCH",
  },
  {
    id: "punawale2",
    title: "Punawale 2 Board",
    type: "BRANCH",
  },
];

export const POSTS: BoardPost[] = [
  {
    id: "1",
    boardId: "baner",
    author: "Quantum Kidz",
    title: "Sports Day",
    content: "Sports Day will be conducted on Friday.",
    createdAt: "Today",
  },
  {
    id: "2",
    boardId: "baner",
    author: "Quantum Kidz",
    title: "Yellow Day Celebration",
    content: "Students had a wonderful Yellow Day.",
    createdAt: "Yesterday",
  },
];